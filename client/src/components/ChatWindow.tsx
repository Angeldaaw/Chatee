import { GetColorFromUsername } from "../utils/getColorFromUsername";
import type { ChatProps } from "../../../shared/types";

export default function ChatWindow({
        messages,
        message,
        onMessageChange,
        onSubmit,
        chatEndRef,
        formatTime
    }: ChatProps) {

        return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <h2 className="chat-title">ChaTee</h2>
        <div className="chat-box">
          {messages.map((msg, idx) => (
            <div key={idx} className="chat-message">
              <strong style={{ color: GetColorFromUsername(msg.username) }}>
                {msg.username}
              </strong>
              <span className="chat-time">
                ({formatTime(msg.timestamp)})
              </span>
              : {msg.text}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>
        <form onSubmit={onSubmit} className="chat-form">
          <input
            type="text"
            className="chat-input"
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={onMessageChange}
          />
          <button type="submit" className="chat-button">Enviar</button>
        </form>
      </div>
    </div>
  );

}