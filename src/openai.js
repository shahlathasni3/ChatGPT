const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: "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" });
const openai = new OpenAIApi(configuration);

export async function sendMsgToOpenAI(message) {
    const res = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        freequency_penalty: 0,
        presence_penalty: 0
    });
    return res.data.choices[0].text;
}
