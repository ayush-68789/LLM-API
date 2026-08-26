import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";

import {
    getConversations,
    createConversation,
    getConversation,
    sendMessage,
    renameConversation,
    deleteConversation,
} from "./services/ChatServices";
const App = () => {
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // Get all conversations
    const fetchConversations = async () => {
        try {
            const conversations = await getConversations();

            setConversations(conversations);
        } catch (error) {
            console.log(error);
        }
    };

    // Create new conversation
    const handleCreateConversation = async () => {
        try {
            const conversation = await createConversation();

            setConversations((prev) => [conversation, ...prev]);

            setCurrentConversation(conversation);

            setMessages([]);
        } catch (error) {
            console.log(error);
        }
    };

    // Load one conversation
    const handleLoadConversation = async (conversationId) => {
        try {
            const data = await getConversation(conversationId);
            console.log("Loaded conversation:", data) ;
            setCurrentConversation(data.conversation);
            setMessages(data.messages);
        } catch (error) {
            console.log(error);
        }
    };

    // Send message
    const handleSendMessage = async () => {
        if (!input.trim()) {
            return;
        }

        if (!currentConversation) {
            alert("Create a conversation first");
            return;
        }

        const userMessage = input;

        setInput("");
        setLoading(true);

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: userMessage,
            },
        ]);

        try {
            const response = await sendMessage(
                currentConversation._id,
                userMessage,
            );

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: response,
                },
            ]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch conversations when app loads
    useEffect(() => {
        fetchConversations();
    }, []);

    const handleRenameConversation = async (conversation) => {
        const newTitle = window.prompt(
            "Enter new conversation name:",
            conversation.title,
        );

        if (!newTitle || !newTitle.trim()) {
            return;
        }

        try {
            const updatedConversation = await renameConversation(
                conversation._id,
                newTitle,
            );

            setConversations((prev) =>
                prev.map((item) =>
                    item._id === updatedConversation._id
                        ? updatedConversation
                        : item,
                ),
            );

            // Update current conversation if it's open
            if (currentConversation?._id === updatedConversation._id) {
                setCurrentConversation(updatedConversation);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteConversation = async (conversationId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this conversation?",
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteConversation(conversationId);

            // Remove from sidebar
            setConversations((prev) =>
                prev.filter(
                    (conversation) => conversation._id !== conversationId,
                ),
            );

            // If currently open, clear it
            if (currentConversation?._id === conversationId) {
                setCurrentConversation(null);
                setMessages([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="app">
            {/* Sidebar */}

            <Sidebar
                conversations={conversations}
                onCreateConversation={handleCreateConversation}
                onLoadConversation={handleLoadConversation}
                onRenameConversation={handleRenameConversation}
                onDeleteConversation={handleDeleteConversation}
            />

            {/* Chat */}

            <main className="chat">
                <div className="chat-header">
                    {currentConversation
                        ? currentConversation.title
                        : "AI Chat"}
                </div>

                <div className="messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.role}`}>
                            {message.content}
                        </div>
                    ))}

                    {loading && (
                        <div className="message assistant">Thinking...</div>
                    )}
                </div>

                <div className="input-area">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSendMessage();
                            }
                        }}
                        placeholder="Ask something..."
                    />

                    <button onClick={handleSendMessage} disabled={loading}>
                        Send
                    </button>
                </div>
            </main>
        </div>
    );
};
export default App;
