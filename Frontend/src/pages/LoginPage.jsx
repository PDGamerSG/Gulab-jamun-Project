import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Auth.css";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!username.trim() || !password.trim()) {
            setError("Please enter both username and password.");
            return;
        }

        const success = login(username, password);
        if (success) {
            navigate("/dashboard");
        } else {
            setError("Invalid credentials. Try admin / admin123");
        }
    }

    return (
        <div className="login-page">
            <div className="login-bg" />
            <div className="login-blob login-blob-1" />
            <div className="login-blob login-blob-2" />

            <div className="login-card animate-in">
                <div className="login-header">
                    <div className="login-logo">
                        <span className="logo-dot" />
                        Gulabjamun
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Sign in to access your dashboard</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>

                    {error && <div className="login-error">{error}</div>}

                    <button type="submit" className="login-submit">
                        Sign In
                    </button>
                </form>

                <button
                    className="login-back"
                    onClick={() => navigate("/")}
                >
                    ← Back to Start
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
