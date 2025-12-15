import { describe, it, vi, beforeEach } from "vitest";
import { expectLLM } from "../src";

vi.mock("../src/providers/openai", () => {
  return {
    runLLM: vi.fn()
  };
});

import { runLLM } from "../src/providers/openai";

beforeEach(() => {
  vi.clearAllMocks();


});

describe("PromptGuard assertions", () => {
    it("toContain passes when substring exists", async () => {
        (runLLM as any).mockResolvedValue({
            output: "hello pineapple world",
            tokens: 5
        });

        const result = await expectLLM({
            prompt: "Say the word pineapple"
        });

        result.toContain("pineapple");
    });


    it("toMatch passes when regex matches", async () => {
        (runLLM as any).mockResolvedValue({
            output: "The capital of France is Paris",
            tokens: 7
        });

        const result = await expectLLM({
            prompt: "The capital of France is Paris"
        });

        result.toMatch(/Paris/);
    });

    it("not.toContain passes when substring is absent", async () => {
        (runLLM as any).mockResolvedValue({
            output: "hello there",
            tokens: 3
        });

        const result = await expectLLM({
            prompt: "Respond with hello"
        });

        result.not.toContain("bye");
    });


    it("toMatchSnapshot creates and validates snapshot", async () => {
        (runLLM as any).mockResolvedValue({
            output: "hello pineapple world",
            tokens: 5
        });

        const result = await expectLLM({
            prompt: "Say snapshot test"
        });

        result.toMatchSnapshot();
    });
});