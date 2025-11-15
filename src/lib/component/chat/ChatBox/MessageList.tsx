import ThreeDotLoading from "@lib/component/Loading/ThreeDotLoading";
import MessageItem, { MessageItemProps } from "./MessageItem";
import { AppLoadingIcon } from "@module/_core/app/component/Loading/AppLoading";
import ErrorEmpty from "@module/_core/app/component/Empty/ErrorEmpty";
import { useEffect, useRef } from "react";
import clsx from "clsx";

export interface MessageListProps {
    conversationId: string | number;
    isPending: boolean;
    isFetching: boolean;
    isError: boolean;
    isTyping: boolean;
    messages: MessageItemProps[];
    onLoadMore?: (oldestMessageId?: string) => void;
    typingAvatarUrl?: string;
    className?: string;
}
const MessageList = ({
    conversationId,
    isPending,
    isFetching,
    isError,
    isTyping,
    messages,
    onLoadMore,
    typingAvatarUrl = "/images/logo-128.png",
    className
}: MessageListProps) => {
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!chatContainerRef.current || !onLoadMore) return;
        const chatEl = chatContainerRef.current;

        const handleScroll = () => {
            if (chatEl.scrollTop <= 0 && messages.length > 0 && !isPending) {
                const oldestMessage = messages[0];
                onLoadMore(oldestMessage?.id);
            }
        };

        chatEl.addEventListener("scroll", handleScroll);
        return () => chatEl.removeEventListener("scroll", handleScroll);
    }, [messages, isPending, onLoadMore]);

    return (
        <div
            key={conversationId}
            ref={chatContainerRef}
            className={clsx("flex-1 overflow-y-scroll scrollbar-y-light flex-col-reverse", className)}
        >
            {isPending ? (
                <div className="w-full h-full flex-center">
                    <AppLoadingIcon title="Đang tải tin nhắn..." />
                </div>
            ) : (
                <div className="overflow-hidden">
                    {isFetching && (
                        <div className="flex-center py-1.5">
                            <ThreeDotLoading color="#295779" size={1} />
                        </div>
                    )}
                    {messages.map((message) => (
                        <MessageItem key={message.id} {...message} />
                    ))}
                    {isError && <ErrorEmpty />}
                </div>
            )}
            {isTyping && (
                <div className="px-4.5 my-4 w-3/4 flex gap-3">
                    <img src={typingAvatarUrl} alt="typing-avatar" className="size-10 rounded-full" />
                    <div className="flex-1 p-3.5 rounded-lg bg-white shadow">
                        <ThreeDotLoading color="#295779" size={1} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageList;
