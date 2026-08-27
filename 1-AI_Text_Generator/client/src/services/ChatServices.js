const API_URL = import.meta.env.VITE_API_URL;

export const getConversations = async () => {
    console.log("API_URL:", API_URL);

    const url = `${API_URL}/api/chat/conversations`;
    console.log("Fetching:", url);

    const response = await fetch(url);

    console.log("Status:", response.status);
    console.log("Content-Type:", response.headers.get("content-type"));

    if (!response.ok) {
        const text = await response.text();
        console.log("Server response:", text);
        throw new Error("Failed to fetch conversations");
    }

    const data = await response.json();

    return data.data;
};
// Create conversation
export const createConversation = async () => {
    const response = await fetch(`${API_URL}/api/chat/conversations`, {
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
    const response = await fetch(`${API_URL}/api/chat/conversations/${conversationId}`);

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
        `${API_URL}/api/chat/conversations/${conversationId}/messages`,

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
    const response = await fetch(`${API_URL}/api/chat/conversations/${conversationId}`, {
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
    const response = await fetch(`${API_URL}/api/chat/conversations/${conversationId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete conversation");
    }

    return await response.json();
};