---
title: oxfmt ignores unknown keys in its config
type: tip
topic: tooling
added: 2026-10-08
tags: [oxc, tooling]
---

`.oxfmtrc.json` accepts keys it doesn't recognize without any warning. Lint settings put there by mistake, like `plugins` and `rules`, do nothing. The formatter runs normally, the JSON schema shows no error in the editor, and oxlint keeps reporting the rule.

Lint configuration belongs in `.oxlintrc.json`:

```json
{
    "plugins": ["jsx-a11y"],
    "rules": {
        "jsx-a11y/no-autofocus": "off"
    }
}
```

When a rule override seems to have no effect, check which file it's in first.

Seen with oxfmt 0.65.0.
