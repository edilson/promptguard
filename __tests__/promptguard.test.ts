import { describe, it } from "vitest";
import { expectLLM } from "../src";

describe("PromptGuard assertions", () => {
    it("toContain passes when substring exists", async () => {
        const result = await expectLLM({
            prompt: "Say the word pineapple"
        });

        result.toContain("pineapple");
    });


    it("toMatch passes when regex matches", async () => {
        const result = await expectLLM({
            prompt: "The capital of France is Paris"
        });

        result.toMatch(/Paris/);
    });

    it("not.toContain passes when substring is absent", async () => {
        const result = await expectLLM({
            prompt: "Respond with hello"
        });

        result.not.toContain("bye");
    });


    it("toMatchSnapshot creates and validates snapshot", async () => {
        const result = await expectLLM({
            prompt: "Say snapshot test"
        });

        result.toMatchSnapshot();
    });
});