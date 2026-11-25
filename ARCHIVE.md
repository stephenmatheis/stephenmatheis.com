# Archive Version

To archive the live version:

1. Push `main` to a new branch named `vNN/name`.
2. In Vercel, add `vN.stephenmatheis.com` as a domain for that branch.
3. In `scripts/readme.mts`, move live into the archive object array, give it a name, then increment live's number.
4. Run `npm run readme`.

```sh
    npm run dev
    npm run build
    npm run readme
```
