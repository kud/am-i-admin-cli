#!/usr/bin/env node
import { $ } from "zx"
import chalk from "chalk"

$.verbose = false

const checkAdminStatus = async (rawOutput = false) => {
  const USER = process.env.USER || process.env.USERNAME

  try {
    const adminGroupInfo = await $`dscl . -read /Groups/admin GroupMembership`

    if (adminGroupInfo.stdout.includes(USER)) {
      if (rawOutput) {
        console.log("true")
      } else {
        console.log(
          `${chalk.green("✓")} ${chalk.bold(
            USER,
          )}, you are an admin on this computer. 👑`,
        )
      }
    } else if (rawOutput) {
      console.log("false")
    } else {
      console.log(
        `${chalk.red("✗")} ${chalk.bold(
          USER,
        )}, you are sadly not an admin on this computer. 🥹`,
      )
    }
  } catch (err) {
    console.error("An error occurred:", err.message)
  }
}

const args = process.argv.slice(2)
const rawOutput = args.includes("--raw")
checkAdminStatus(rawOutput)
