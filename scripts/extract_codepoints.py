#!/usr/bin/env python3
"""
Pick a font file via TUI and write app/codepoints.json.

Sources searched:
  1. <project>/app/fonts/   (woff, woff2, otf, ttf)
  2. ~/Library/Fonts/       (otf, ttf)

Keys:
  ↑ / ↓       navigate
  type        filter list
  Backspace   erase filter
  Enter       select
  Esc / q     quit
"""

import curses
import json
import sys
from pathlib import Path
from fontTools.ttLib import TTFont

EXTS = {".woff", ".woff2", ".otf", ".ttf"}

PROJECT_ROOT  = Path(__file__).resolve().parent.parent
CODEPOINTS_DIR = PROJECT_ROOT / "app" / "codepoints"

SEARCH_DIRS = [
    (PROJECT_ROOT / "app" / "fonts", "project"),
    (Path.home() / "Library" / "Fonts",          "system"),
]


def find_fonts():
    fonts = []
    for directory, label in SEARCH_DIRS:
        if not directory.exists():
            continue
        for path in sorted(directory.iterdir()):
            if path.suffix.lower() in EXTS:
                fonts.append((path, label))
    return fonts


def pick_font(stdscr, fonts):
    curses.curs_set(0)
    curses.use_default_colors()
    curses.init_pair(1, curses.COLOR_BLACK, curses.COLOR_WHITE)   # selected
    curses.init_pair(2, curses.COLOR_CYAN,  -1)                   # label tag
    curses.init_pair(3, curses.COLOR_WHITE, -1)                   # dim

    query   = ""
    cursor  = 0
    scroll  = 0

    while True:
        filtered = [
            (p, lbl) for p, lbl in fonts
            if query.lower() in p.name.lower()
        ]

        h, w = stdscr.getmaxyx()
        list_h = h - 4   # rows available for font list

        # clamp cursor
        cursor = max(0, min(cursor, len(filtered) - 1))
        if cursor < scroll:
            scroll = cursor
        elif cursor >= scroll + list_h:
            scroll = cursor - list_h + 1

        stdscr.erase()

        # header
        title = " Select a font — Enter to confirm, Esc/q to quit "
        stdscr.addstr(0, 0, title[:w], curses.A_BOLD)
        stdscr.addstr(1, 0, f" Filter: {query}_"[:w])
        stdscr.addstr(2, 0, "─" * w)

        # list
        for i, (path, lbl) in enumerate(filtered[scroll:scroll + list_h]):
            row = 3 + i
            idx = scroll + i
            name = f" [{lbl}] {path.name} "
            attr = curses.color_pair(1) if idx == cursor else 0
            stdscr.addstr(row, 0, name[:w], attr)

        if not filtered:
            stdscr.addstr(3, 0, "  (no matches)"[:w], curses.color_pair(3))

        stdscr.refresh()

        key = stdscr.get_wch()

        if key == curses.KEY_UP:
            cursor = max(0, cursor - 1)
        elif key == curses.KEY_DOWN:
            cursor = min(len(filtered) - 1, cursor + 1)
        elif key in ("\n", "\r", curses.KEY_ENTER):
            if filtered:
                return filtered[cursor][0]
        elif key in ("\x1b", "q"):
            return None
        elif key in (curses.KEY_BACKSPACE, "\x7f", "\b"):
            query = query[:-1]
            cursor = 0
            scroll = 0
        elif isinstance(key, str) and key.isprintable():
            query += key
            cursor = 0
            scroll = 0


def main():
    fonts = find_fonts()
    if not fonts:
        print("No font files found.", file=sys.stderr)
        sys.exit(1)

    chosen = curses.wrapper(pick_font, fonts)
    if chosen is None:
        print("Cancelled.")
        sys.exit(0)

    out = CODEPOINTS_DIR / f"{chosen.stem}.json"

    if out.exists():
        print(f"Already exists: {out}")
        sys.exit(0)

    print(f"Loading {chosen.name} …")
    font   = TTFont(str(chosen))
    cmap   = font.getBestCmap()
    points = sorted(cmap.keys())

    CODEPOINTS_DIR.mkdir(parents=True, exist_ok=True)
    json.dump(points, out.open("w"))

    print(f"{len(points)} codepoints → {out}")


if __name__ == "__main__":
    main()
