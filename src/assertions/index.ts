import { toContain } from "./toContain";
import { toMatch } from "./toMatch";
import { toMatchSnapshot } from "./snapshot";
import type { LLMExecutionResult } from "../expectLLM";

export function createAssertionAPI(
    execution: LLMExecutionResult,
    context: any
) {
    return {
        toContain: (value: string) => toContain(execution, value),
        toMatch: (regex: RegExp) => toMatch(execution, regex),
        toMatchSnapshot: () => toMatchSnapshot(execution, context),

        not: {
            toContain: (value: string) => {
                if (execution.output.includes(value)) {
                    throw new Error(`Expected output NOT to contain: ${value}`);
                }
            }
        }
    };
}