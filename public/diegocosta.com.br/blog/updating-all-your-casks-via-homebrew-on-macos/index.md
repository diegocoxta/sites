---
title: Updating all your casks via Homebrew on macOS
date: 2020-01-18T23:12:03.284Z
summary: A simple way to force an update to your applications installed via Homebrew.
language: English
expanded: true
tags:
  - terminal
  - macos
  - homebrew
  - caskroom
  - til
  - english
---

I'm addicted to maintaining all my programs updated, and the best way to do this in macOS is with the help of dependency managers like [Homebrew](https://brew.sh/index_pt-br), when using it to install our software you can write small scripts to automate this process.

In Homebrew the command to update all software is `brew upgrade --cask` but it's not always successful to find updates for all applications, to fix this problem we must execute this upgrade command for every installed software.

Here's the tip! To avoid having to run `upgrade` to each item manually, run this command in your terminal:

```js
brew list --cask | xargs brew upgrade --cask
```
