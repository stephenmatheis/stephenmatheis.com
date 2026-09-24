#!/usr/bin/env bash
#
# Captures a screenshot of each version's homepage into public/shots/v<n>.png.
#
# The onion, cams, and scrub views show these instead of loading 42 live sites
# at once. They're a snapshot, so they go stale when a version's branch gets
# new commits. Rerun this to refresh them.
#
# Usage:
#
#   npm run screenshots              # every version
#   npm run screenshots -- 14 22     # just v14 and v22
#
# Uses headless Chrome. Set CHROME to a browser binary to use a different one.

set -uo pipefail

# Run from the repo root, wherever this was called from, so the paths below work.
cd "$(dirname "$0")/.."

output_directory="public/shots"

# 1280 × 800 matches the size the views show versions at (see fitted-frame.tsx),
# so a screenshot and its live site line up exactly.
window_size="1280,800"

# Headless Chrome decides the page is done after this much "virtual" time:
# long enough for web fonts and intro animations to settle.
settle_milliseconds=6000

# Some pages never settle (endless animations, open connections). Anything
# still running after this long gets stopped, and counted as a failure.
timeout_seconds=25

find_chrome() {
    if [ -n "${CHROME:-}" ]; then
        echo "$CHROME"
        return
    fi

    local mac_chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

    if [ -x "$mac_chrome" ]; then
        echo "$mac_chrome"
        return
    fi

    for name in google-chrome chromium chromium-browser; do
        if command -v "$name" >/dev/null; then
            command -v "$name"
            return
        fi
    done
}

chrome=$(find_chrome)

if [ -z "$chrome" ]; then
    echo "Couldn't find Chrome. Set CHROME to the path of a Chrome or Chromium binary." >&2
    exit 1
fi

# Which versions to capture: the numbers given on the command line, or every
# `number: N,` entry in versions.ts, so new versions are picked up on their own.
if [ "$#" -gt 0 ]; then
    numbers="$*"
else
    numbers=$(grep -oE '^ +number: [0-9]+,' app/versions.ts | grep -oE '[0-9]+')
fi

mkdir -p "$output_directory"

failures=""

for number in $numbers; do
    final_file="$output_directory/v$number.png"

    # Capture into a temporary file first, and only replace the real one if the
    # capture worked. A failed or half-written capture never overwrites a good
    # screenshot. It still has to end in .png: Chrome picks the image format
    # from the extension and refuses anything it doesn't recognize.
    temporary_file="$output_directory/.v$number.tmp.png"

    rm -f "$temporary_file"

    # Chrome runs in the background so the watchdog can stop it if it hangs.
    #
    # There's deliberately no --user-data-dir flag: with a custom profile
    # directory, headless Chrome writes the screenshot and then never exits.
    # That's also why captures run one at a time instead of in parallel,
    # since parallel runs would each need their own profile.
    "$chrome" \
        --headless=new \
        --disable-gpu \
        --hide-scrollbars \
        --window-size="$window_size" \
        --virtual-time-budget="$settle_milliseconds" \
        --screenshot="$temporary_file" \
        "https://v$number.stephenmatheis.com/" \
        >/dev/null 2>&1 &
    chrome_process=$!

    ( sleep "$timeout_seconds" && kill "$chrome_process" 2>/dev/null ) &
    watchdog_process=$!

    wait "$chrome_process" 2>/dev/null

    # Chrome finished (or was stopped), so the watchdog isn't needed anymore.
    # Its "Terminated" message is noise, so it's silenced.
    kill "$watchdog_process" 2>/dev/null
    wait "$watchdog_process" 2>/dev/null

    if [ -s "$temporary_file" ]; then
        mv "$temporary_file" "$final_file"
        echo "v$number ✓"
    else
        rm -f "$temporary_file"
        failures="$failures v$number"
        echo "v$number ✗"
    fi
done

if [ -n "$failures" ]; then
    echo "Failed:$failures" >&2
    exit 1
fi
