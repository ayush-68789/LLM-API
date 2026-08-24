const express = require("express");

const {createConversation,sendMessage} = require("../controllers/ai.chat.controller");

const router = express.Router();

// Create conversation
router.post("/conversations", createConversation);

// Send message
router.post("/conversations/:convoId/messages", sendMessage);

module.exports = router;