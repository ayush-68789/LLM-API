const express = require("express");

const {createConversation,sendMessage, getConversation, getAllConversations, renameConversation, deleteConversation} = require("../controllers/ai.chat.controller");

const router = express.Router();

// Create conversation
router.post("/conversations", createConversation);

// Send message
router.post("/conversations/:convoId/messages", sendMessage);

//Get Conversation
router.get('/conversations/:convoId', getConversation) ;
router.get("/conversations", getAllConversations);

router.patch("/conversations/:convoId", renameConversation);
router.delete("/conversations/:convoId", deleteConversation);

module.exports = router;