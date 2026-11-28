import { test } from "node:test"
import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import { chmodSync, mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { delimiter, join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const entry = join(dirname(fileURLToPath(import.meta.url)), "..", "index.js")

// Runs the CLI with a stubbed `dscl` first on PATH, so the tests are
// platform-neutral and never touch the network or the real directory service.
const run = ({ members, user = "alice", args = [] }) => {
  const bin = mkdtempSync(join(tmpdir(), "am-i-admin-"))
  const stub = join(bin, "dscl")
  writeFileSync(
    stub,
    members === null
      ? "#!/bin/sh\nexit 1\n"
      : `#!/bin/sh\necho "GroupMembership: ${members}"\n`,
  )
  chmodSync(stub, 0o755)
  return spawnSync(process.execPath, [entry, ...args], {
    encoding: "utf8",
    env: {
      ...process.env,
      USER: user,
      FORCE_COLOR: "0",
      PATH: `${bin}${delimiter}${process.env.PATH}`,
    },
  })
}

test("--raw prints true when the user is in the admin group", () => {
  const r = run({ members: "root alice", args: ["--raw"] })
  assert.equal(r.stdout.trim(), "true")
})

test("--raw prints false when the user is not in the admin group", () => {
  const r = run({ members: "root bob", args: ["--raw"] })
  assert.equal(r.stdout.trim(), "false")
})

test("default output tells an admin they are an admin", () => {
  const r = run({ members: "root alice" })
  assert.match(r.stdout, /alice, you are an admin on this computer/)
})

test("default output tells a non-admin they are not an admin", () => {
  const r = run({ members: "root bob" })
  assert.match(r.stdout, /alice, you are sadly not an admin/)
})

test("reports an error when dscl fails", () => {
  const r = run({ members: null })
  assert.match(r.stderr, /An error occurred/)
})
