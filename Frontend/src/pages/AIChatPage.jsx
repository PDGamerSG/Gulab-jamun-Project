import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../AIChat.css";

const QUICK_ASKS = [
    "Revenue trends",
    "Customer insights",
    "Delivery performance",
    "Product analysis",
    "How to improve?",
    "Dataset overview",
];

const IconBot = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" /></svg>
);
const IconMessageCircle = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
);
const IconSend = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
);

function AIChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function sendMessage(text) {
        const userMsg = text || input.trim();
        if (!userMsg) return;

        setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:8000/ai-chat", {
                message: userMsg,
            });
            setMessages((prev) => [
                ...prev,
                { role: "bot", text: res.data.response },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    text: "Sorry, I couldn't connect to the server. Please make sure the backend is running.",
                },
            ]);
        }

        setLoading(false);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className="chat-page">
            <div className="chat-header animate-in">
                <h1>
                    <span style={{ display: "inline-flex", verticalAlign: "middle", marginRight: 6, color: "var(--accent-primary)" }}><IconBot size={28} /></span> Jamun AI
                </h1>
                <p>
                    Ask me anything about your retail data — revenue, customers,
                    deliveries, and more
                </p>
            </div>

            <div className="chat-quick-asks animate-in" style={{ animationDelay: "0.1s" }}>
                {QUICK_ASKS.map((q) => (
                    <button
                        key={q}
                        className="quick-ask-btn"
                        onClick={() => sendMessage(q)}
                        disabled={loading}
                    >
                        {q}
                    </button>
                ))}
            </div>

            <div className="chat-messages">
                {messages.length === 0 && !loading && (
                    <div className="chat-welcome animate-in">
                        <span className="welcome-icon" style={{ color: "var(--accent-primary)" }}><IconMessageCircle size={32} /></span>
                        <h3>Start a Conversation</h3>
                        <p>
                            Click a quick question above or type your own to get
                            real-time insights from your dataset.
                        </p>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div key={i} className={`chat-bubble ${msg.role}`}>
                        <span className="bubble-label">
                            {msg.role === "user" ? "You" : "AI Assistant"}
                        </span>
                        {msg.role === "bot" ? (
                            <pre>{msg.text}</pre>
                        ) : (
                            msg.text
                        )}
                    </div>
                ))}

                {loading && (
                    <div className="chat-typing">
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            <div className="chat-input-bar">
                <input
                    type="text"
                    placeholder="Ask about your data..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                />
                <button
                    className="chat-send-btn"
                    onClick={() => sendMessage()}
                    disabled={loading || !input.trim()}
                >
                    <IconSend /> Send
                </button>
            </div>
        </div>
    );
}

export default AIChatPage;
