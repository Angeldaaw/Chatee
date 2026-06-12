import type { UserProps } from "../../../shared/types";

export default function LoginPrompt({username, onChange, onSubmit}: UserProps) {
    return (
        <form onSubmit={onSubmit} className="login-form">
            <h2 className="chat-title">Ingresa tu nombre</h2>
            <input
                type="text"
                placeholder="Ej. Karla"
                value={username}
                onChange={onChange}
                className="chat-input"
            />
            <button type="submit" className="chat-button">Entrar al chat</button>
        </form>
    );
}
