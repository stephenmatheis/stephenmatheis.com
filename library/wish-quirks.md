---
title: Wish behaviors that differ from what the names suggest
type: note
topic: go
added: 2026-07-28
tags: [go, ssh, wish]
---

`comment.Middleware` prints when the session ends, not when it starts. It calls the next handler, then writes the comment. For a message before login, use `wish.WithBanner` or `wish.WithBannerHandler`.

`scp.Middleware` speaks the legacy SCP protocol. OpenSSH 9 and later use SFTP for `scp` by default, so clients need `-O`:

```sh
scp -O -P 2323 localhost:welcome.txt .
```

`git.Middleware` creates a repo on push (`git.EnsureRepo` runs for `git-receive-pack`), but `git-upload-pack` fails with "invalid repo" when the repo isn't on disk. Fetch and clone need a bare repo seeded at startup:

```sh
git init -q --bare -b main repos/hello.git
git -C seed-work push -q "$PWD/repos/hello.git" main
```
