const convo = require('../model/conversation.model') ;
const message = require('../model/message.model') ;

const generateResponse = require('./ai.service') ;

const createConvo = async () => {
    const conversation = await convo.create({}) ;
    return conversation ;
}

const sendMessage = async (convoId, userMessage) => {
    // find convo
    const conversation = await convo.findById(convoId) ;
    if(!conversation)
    {
        throw new Error("Conversation not found");
    }
    // store message in that convo
    const msg = await message.create({
        conversationId : convoId ,
        role : 'user',
        content : userMessage
    })
    // get history convo
    const previousMessages = await message.find({conversationId : convoId}).sort({createdAt : 1}).lean() ;

    const Messages = [
        {
            role : 'system', 
            content : conversation.systemPrompt
        } ,
        ...previousMessages.map((Messages) => ({
            role: Messages.role,
            content: Messages.content
        }))
    ]
    const aiResponse = await generateResponse(Messages) ;
    await message.create({
        conversationId: convoId,
        role: "assistant",
        content: aiResponse,
    });
    return aiResponse ;
}

module.exports = {createConvo, sendMessage} ;