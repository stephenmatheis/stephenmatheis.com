---
title: git diff --no-index exits 1 when files differ
type: tip
topic: tooling
added: 2026-07-28
tags: [git, go]
---

`git diff --no-index` implies `--exit-code`. It exits 1 when the files differ and 0 when they match. Plain `git diff` exits 0 either way unless `--exit-code` is passed.

Diffing an untracked file against `/dev/null` always finds a difference, so a wrapper that treats any non-zero exit as an error fails every time. Treat exit code 1 as success:

```go
cmd := exec.Command("git", "diff", "--no-color", "--no-index", "--", "/dev/null", path)
out, err := cmd.CombinedOutput()

var exitErr *exec.ExitError
if errors.As(err, &exitErr) && exitErr.ExitCode() == 1 {
    return string(out), nil
}
if err != nil {
    return "", err
}
return string(out), nil
```

Real failures exit with a code above 1.
