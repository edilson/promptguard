import fs from "fs";
import path from "path";
import type { LLMExecutionResult } from "../expectLLM";

const SNAP_DIR = "__promptguard_snapshots__";

export function toMatchSnapshot(
    execution: LLMExecutionResult,
    context: { prompt: string; model?: string }
) {
    if (!fs.existsSync(SNAP_DIR)) {
        fs.mkdirSync(SNAP_DIR);
    }

    const filename = Buffer.from(context.prompt)
        .toString("base64")
        .slice(0, 16);

    const filePath = path.join(SNAP_DIR, `${filename}.json`);

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(
        filePath,
        JSON.stringify({ output: execution.output }, null, 2));
        return;
    }

    const snapshot = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (snapshot.output !== execution.output) {
        throw new Error(`Snapshot mismatch\n\nExpected:\n${snapshot.output}\n\nReceived:\n${execution.output}`);
    }
}