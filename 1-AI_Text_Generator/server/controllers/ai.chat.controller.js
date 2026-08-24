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

module.exports = {createConversation , sendMessage} ;