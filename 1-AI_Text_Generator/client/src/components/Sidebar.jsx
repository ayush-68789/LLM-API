const Sidebar = ({
    conversations,
    onCreateConversation,
    onLoadConversation,
    onRenameConversation,
    onDeleteConversation,
}) => {
    return (
        <aside className="sidebar">
            <button onClick={onCreateConversation}>+ New Chat</button>

            <div className="conversation-list">
                {conversations.map((conversation) => (
                    <div className="conversation-item" key={conversation._id}>
                        <button
                            className="conversation-button"
                            onClick={() => onLoadConversation(conversation._id)}
                        >
                            {conversation.title}
                        </button>

                        <button
                            className="rename-button"
                            onClick={() => onRenameConversation(conversation)}
                        >
                            ✏️
                        </button>

                        <button
                            className="delete-button"
                            onClick={() =>
                                onDeleteConversation(conversation._id)
                            }
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
