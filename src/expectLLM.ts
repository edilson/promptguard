import { runLLM } from "./providers/openai";
import { createAssertionAPI } from "./assertions";

export interface ExpectLLMOptions {
  prompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface LLMExecutionResult {
  output: string;
  latencyMs: number;
  tokens?: number;
}

export async function expectLLM(options: ExpectLLMOptions) {
  const start = Date.now();

  const result = await runLLM({
    prompt: options.prompt,
    model: options.model ?? "gpt-4o-mini",
    temperature: options.temperature ?? 0,
    maxTokens: options.maxTokens ?? 256
  });

  const latencyMs = Date.now() - start;

  const execution: LLMExecutionResult = {
    output: result.output,
    tokens: result.tokens,
    latencyMs
  };

  return createAssertionAPI(execution, options);
}
