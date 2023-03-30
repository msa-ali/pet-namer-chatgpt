import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { animal } = req.body;
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `suggest three pet names for the following animal: ${animal} separated by comma`,
        temperature: 0.8,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      })
      res.status(200).json({ result: response.data.choices[0].text.trim().split(',') })
    } catch (error) {
    }
  }
  res.end();
}
