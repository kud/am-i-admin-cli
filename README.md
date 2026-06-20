<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/npm/v/%40kud%2Fam-i-admin-cli?style=flat-square&color=CB3837)
![MIT](https://img.shields.io/badge/licence-MIT-22C55E?style=flat-square)

**A simple CLI tool to check if you're an admin on your macOS computer.**

<a href="https://kud.io/projects/am-i-admin-cli">Website</a> · <a href="https://kud.io/projects/am-i-admin-cli/docs">Documentation</a>

</div>

## Features

- **Instant verdict** — tells you in plain English whether your account holds admin privileges on the current Mac.
- **Raw mode** — pass `--raw` to get a bare `true` or `false`, ideal for scripting and conditional logic.
- **Coloured output** — green tick for admins, red cross for non-admins, so the result is obvious at a glance.
- **Zero config** — reads your username from the environment and queries the macOS directory service directly.
- **Lightweight** — single-file tool with minimal dependencies (`zx`, `chalk`).

## Install

```sh
npm install -g @kud/am-i-admin-cli
```

## Usage

```console
$ am-i-admin
✓ alice, you are an admin on this computer. 👑

$ am-i-admin --raw
true
```

## Development

```sh
git clone https://github.com/kud/am-i-admin-cli.git
cd am-i-admin-cli
npm install
node index.js
```

📚 **Full documentation → [am-i-admin-cli/docs](https://kud.io/projects/am-i-admin-cli/docs)**
