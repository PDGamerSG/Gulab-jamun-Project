import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "admin123";

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => sessionStorage.getItem("gulabjamun_auth") === "true"
    );

    function login(username, password) {
        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem("gulabjamun_auth", "true");
            return true;
        }
        return false;
    }

    function logout() {
        setIsAuthenticated(false);
        sessionStorage.removeItem("gulabjamun_auth");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
