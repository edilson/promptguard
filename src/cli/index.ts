#!/usr/bin/env node
import { execa } from "execa";

await execa("vitest", ["run"], { stdio: "inherit" });