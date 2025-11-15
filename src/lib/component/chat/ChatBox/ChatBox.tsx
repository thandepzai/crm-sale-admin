import clsx from "clsx";
import ChatHeader, { ChatHeaderProps } from "./ChatHeader";
import ChatInput, { ChatInputProps } from "./ChatInput";
import MessageList, { MessageListProps } from "./MessageList";

export interface ChatBoxProps {
    chatHeaderData: ChatHeaderProps;
    messageListData: MessageListProps;
    chatInputData: ChatInputProps;
    className?: string;
}
const ChatBox = ({ chatHeaderData, messageListData, chatInputData, className }: ChatBoxProps) => {
    return (
        <div className={clsx("flex-1 flex flex-col relative", className)}>
            <ChatHeader {...chatHeaderData} />
            <MessageList {...messageListData} />
            <ChatInput {...chatInputData} />
        </div>
    );
};

export default ChatBox;
