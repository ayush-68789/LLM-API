const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generateResponse = async (message) => {
    const chatCompletion = await getGroqChatCompletion(message);
    // Print the completion returned by the LLM.
    return chatCompletion.choices[0]?.message?.content || "" ;
}

const getGroqChatCompletion = async (message) => {
    return groq.chat.completions.create({
        messages : message,
        model: "openai/gpt-oss-20b",
    });
}

module.exports = generateResponse ; 
