const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generateRespone = async (prompt) => {
    const chatCompletion = await getGroqChatCompletion(prompt);
    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "");
}

const getGroqChatCompletion = async (prompt) => {
    return groq.chat.completions.create({
        messages: [
            {
                role: "system", 
                content : ""
            },
            {
                role: "user",
                content: prompt ,
            },
        ],
        model: "openai/gpt-oss-20b",
    });
}

module.exports = generateRespone ; 
