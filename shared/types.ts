export type ChatMessage = {
    text: string;
    username: string;
    timestamp: string;
};

export type UserProps = {
    username: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export type ChatProps = {
    messages: ChatMessage[];
    message: string;
    onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    chatEndRef: React.RefObject<HTMLDivElement | null>;
    formatTime: (iso: string) => string;
}