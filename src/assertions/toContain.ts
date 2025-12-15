import type { LLMExecutionResult } from "../expectLLM";

export function toContain(
    execution: LLMExecutionResult,
    value: string
) {
    if (!execution.output.includes(value)) {
        throw new Error(`Expected output to contain "${value}"\n\nActual output:\n${execution.output}`);
    }
}