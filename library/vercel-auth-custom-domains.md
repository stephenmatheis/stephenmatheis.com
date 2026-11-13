---
title: Vercel Authentication covers branch custom domains
type: tip
topic: tooling
added: 2026-09-23
tags: [vercel]
---

A custom domain assigned to a git branch serves preview deployments, not production. Vercel Authentication's "All Deployments Except Custom Domains" setting (`all_except_custom_domains`) therefore still puts those domains behind a Vercel login.

The exemption only covers custom domains pointing at production.

To make a branch domain public, turn Vercel Authentication off for the project. That makes every preview of the project public, including its `*.vercel.app` URLs.
