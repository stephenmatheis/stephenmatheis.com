---
title: Wish middleware runs last to first
type: technique
topic: go
added: 2026-07-28
tags: [go, ssh, wish]
---

`wish.WithMiddleware` composes its arguments from first to last, so the last argument is the outermost wrapper and runs first. Read the list as innermost to outermost:

```go
wish.WithMiddleware(
    interactive,                         // innermost
    comment.Middleware("Bye."),
    elapsed.Middleware(),
    logging.StructuredMiddleware(),
    scp.Middleware(scpHandler, scpHandler),
    git.Middleware(repoDir, hooks),
    ratelimiter.Middleware(limiter),     // outermost, sees every connection
)
```

A rate limiter belongs last so it runs before anything else.

`comment` and `elapsed` write to the session after the inner handler returns. That's fine for a shell or exec session, but it corrupts the git and scp wire protocols. Keep `git.Middleware` and `scp.Middleware` later in the list than anything that writes after the handler, so they handle their sessions without being wrapped by it.

`activeterm.Middleware` can't be global either. It ends any session without a PTY, which breaks exec, scp and git.
