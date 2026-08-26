    const API_URL = import.meta.env.VITE_API_URL;

    // Get all conversations
    export const getConversations = async () => {
    const response = await fetch(`${API_URL}/conversations`);

    if (!response.ok) {
        throw new Error("Failed to fetch conversations");
    }

    const data = await response.json();

    return data.data;
};

// Create conversation
export const createConversation = async () => {
    const response = await fetch(`${API_URL}/conversations`, {
        method: "POST",
    });

    if (!response.ok) {
        throw new Error("Failed to create conversation");
    }

    const data = await response.json();

    return data.data;
};

// Get one conversation
export const getConversation = async (conversationId) => {
    const response = await fetch(`${API_URL}/conversations/${conversationId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch conversation");
    }

    const data = await response.json();

    console.log("API response:", data);

    return data.data;
};

// Send message
export const sendMessage = async (conversationId, message) => {
    const response = await fetch(
        `${API_URL}/conversations/${conversationId}/messages`,

        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                message: message,
            }),
        },
    );

    if (!response.ok) {
        throw new Error("Failed to send message");
    }

    const data = await response.json();

    return data.data.response;
};

export const renameConversation = async (conversationId, title) => {
    const response = await fetch(`${API_URL}/conversations/${conversationId}`, {
        method: "PATCH",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            title,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to rename conversation");
    }

    const data = await response.json();

    return data.data;
};

export const deleteConversation = async (conversationId) => {
    const response = await fetch(`${API_URL}/conversations/${conversationId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete conversation");
    }

    return await response.json();
};