const chatService = require('../services/chat.service') ;

const createConversation = async (req ,res) => {
    try {
        const convo = await chatService.createConvo() ;
        return res.status(201).json({
            success: true,
            data: convo
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to create conversation"
        });
    }
}

const sendMessage = async (req ,res) => {
    try {
        const { convoId } = req.params;
        const { message } = req.body;

        // Check message
        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        // Call chat service
        const response = await chatService.sendMessage(convoId, message);

        return res.status(200).json({
            success: true,
            data: {
                response: response,
            },
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const getConversation = async (req, res) => {
    try{
        const {convoId} = req.params ;
        const data = await chatService.getConversation(convoId) ;
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const getAllConversations = async (req, res) => {
    try {
        const conversations = await chatService.getAllConversations();

        return res.status(200).json({
            success: true,
            data: conversations,
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const renameConversation = async (req, res) => {
    try {
        const { convoId } = req.params;
        const { title } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        const conversation = await chatService.renameConversation(
            convoId,
            title.trim(),
        );

        return res.status(200).json({
            success: true,
            data: conversation,
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const deleteConversation = async (req, res) => {
    try {
        const { convoId } = req.params;

        await chatService.deleteConversation(convoId);

        return res.status(200).json({
            success: true,
            message: "Conversation deleted successfully",
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {createConversation , sendMessage, getConversation, getAllConversations ,renameConversation , deleteConversation} ;