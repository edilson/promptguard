export async function runLLM({
    prompt,
    model,
    temperature,
    maxTokens,
}: any) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            temperature: temperature,
            max_tokens: maxTokens,
        }),
    });

    if (!res.ok) {
        throw new Error(`OpenAI API error: ${res.statusText}`);
    }

    const json = await res.json();

    return {
        output: json.choices[0].message.content,
        tokens: json.usage?.total_tokens,
    };
}