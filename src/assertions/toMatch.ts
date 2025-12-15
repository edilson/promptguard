import type { LLMExecutionResult } from "../expectLLM";

export function toMatch(
    execution: LLMExecutionResult,
    regex: RegExp
) {
    if (!regex.test(execution.output)) {
        throw new Error(`Expected output to match ${regex}\n\nActual output:\n${execution.output}`);
    }
}