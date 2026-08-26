const convo = require("../model/conversation.model");
const message = require("../model/message.model");

const generateResponse = require("./ai.service");

const createConvo = async () => {
    const conversation = await convo.create({});
    return conversation;
};

const sendMessage = async (convoId, userMessage) => {
    // find convo
    const conversation = await convo.findById(convoId);
    if (!conversation) {
        throw new Error("Conversation not found");
    }
    // store message in that convo
    const msg = await message.create({
        conversationId: convoId,
        role: "user",
        content: userMessage,
    });
    // get history convo
    const previousMessages = await message
        .find({ conversationId: convoId })
        .sort({ createdAt: 1 })
        .lean();

    const messages = [
        {
            role: "system",
            content: conversation.systemPrompt,
        },

        ...previousMessages.map((message) => ({
            role: message.role,
            content: message.content,
        })),
    ];
    const aiResponse = await generateResponse(messages);
    await message.create({
        conversationId: convoId,
        role: "assistant",
        content: aiResponse,
    });
    return aiResponse;
};

const getConversation = async (convoId) => {
    const conversation = await convo.findById(convoId);

    if (!conversation) {
        throw new Error("Conversation Not Found");
    }

    const msg = await message
        .find({
            conversationId: convoId,
        })
        .sort({
            createdAt: 1,
        })
        .lean();

    return {
        conversation,
        messages: msg,
    };
};

const getAllConversations = async () => {
    const conversations = await convo
        .find()
        .sort({
            updatedAt: -1,
        })
        .lean();

    return conversations;
};

const renameConversation = async(convoId , title) => {
    const conversation = await convo.findById(convoId);
    if (!conversation) {
        throw new Error("Conversation Not Found");
    }
    conversation.title = title;
    await conversation.save();
    return conversation;
}

const deleteConversation = async (convoId) => {
    const conversation = await convo.findById(convoId);
    if (!conversation) {
        throw new Error("Conversation Not Found");
    }
    // Delete conversation
    await convo.findByIdAndDelete(convoId);
    // Delete all messages belonging to it
    await message.deleteMany({
        conversationId: convoId,
    });

    return true;
};

module.exports = {
    createConvo,
    sendMessage,
    getConversation,
    getAllConversations,
    renameConversation,
    deleteConversation
};