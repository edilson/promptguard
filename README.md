# PromptGuard

> Jest-style unit tests for LLM outputs

PromptGuard lets you write **unit tests for AI responses** so prompt or model changes don’t silently break your application.

## Why PromptGuard?

LLM-powered apps are shipped every day with **zero automated testing**.
Most teams:
- eyeball responses in the terminal
- manually compare prompt versions
- ship regressions accidentally

PromptGuard brings **testing discipline** to probabilistic systems.

## Features

- ✅ Jest / Vitest–style assertions
- 🧪 Snapshot regression testing for prompts
- 🔁 Deterministic testing mindset for LLMs
- ⚡ Fast local runs + CI friendly
- 🧩 Thin wrapper (does not replace your test runner)

## Installation

```bash
npm install -D promptguard
````

## Basic Usage

```ts
import { describe, it } from "vitest";
import { expectLLM } from "promptguard";

describe("Support bot", () => {
  it("responds politely", async () => {
    const result = await expectLLM({
      prompt: "Refund my order now",
      model: "gpt-4o-mini"
    });

    result.toContain("sorry");
    result.not.toContain("can't");
  });
});
```

Run tests:

```bash
npx promptguard test
```

## Assertions

### `toContain(text)`

```ts
result.toContain("hello");
```

Fails if the LLM output does not include the string.

### `toMatch(regex)`

```ts
result.toMatch(/Paris/);
```

Fails if the regex does not match the output.

### `not.toContain(text)`

```ts
result.not.toContain("error");
```

Fails if the output contains the forbidden string.

### `toMatchSnapshot()`

```ts
result.toMatchSnapshot();
```

* First run creates a snapshot
* Future runs compare output
* Fails on regression

Snapshots are stored in:

```text
__promptguard_snapshots__/
```

## CLI

```bash
promptguard test
```

PromptGuard delegates execution to Vitest/Jest.

## Configuration

Environment variables:

```bash
OPENAI_API_KEY=sk-...
```

## Roadmap

### v0.1

* Unit-test style assertions
* Snapshot testing
* OpenAI-compatible provider

### v0.2

* Anthropic + local models
* Retry & flake detection
* Snapshot diff improvements

## Contributing

PromptGuard is early-stage and contributor-friendly.

Good first issues:

* assertion helpers
* provider adapters
* snapshot diff UX

Here's the [contributing guide](CONTRIBUTING.md)

## License

MIT
