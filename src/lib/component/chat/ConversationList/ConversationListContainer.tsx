import { useEffect, useRef } from "react";
import ThreeDotLoading from "@lib/component/Loading/ThreeDotLoading";
import { AppLoadingView } from "@module/_core/app/component/Loading/AppLoading";
import ConversationItem, { ConversationItemAction, ConversationItemData } from "./ConversationItem";
import clsx from "clsx";

export interface ConversationListContainerProps<TConversation extends ConversationItemData = ConversationItemData> {
    conversationId?: string;
    isPending: boolean;
    isFetching: boolean;
    conversations: TConversation[];
    onClickConversationItem: (conversation: TConversation) => void;
    onScrollEnd?: (afterDate: string) => void;
    className?: string;
    conversationItemActions: ConversationItemAction[];
    itemClassName?: string;
}

const ConversationListContainer = <TConversation extends ConversationItemData = ConversationItemData>({
    conversationId,
    isPending,
    isFetching,
    conversations,
    onScrollEnd,
    onClickConversationItem,
    conversationItemActions,
    className,
    itemClassName
}: ConversationListContainerProps<TConversation>) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !onScrollEnd) return;

        const handleScroll = () => {
            const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
            if (isBottom) {
                const lastDate = conversations.at(-1)?.lastMessageAt ?? "";
                onScrollEnd(lastDate);
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [conversations, onScrollEnd]);

    if (isPending) return <AppLoadingView title="Đang tải..." />;

    return (
        <div ref={containerRef} className={clsx("flex-1 overflow-y-scroll scrollbar-y-light", className)}>
            {conversations.map((conversation) => (
                <ConversationItem
                    key={conversation.id}
                    data={conversation}
                    isActive={conversation.id === conversationId}
                    onClick={onClickConversationItem as (conversation: ConversationItemData) => void}
                    actions={conversationItemActions}
                    className={itemClassName}
                />
            ))}

            {!conversations.length && !isFetching && (
                <div className="text-lg text-center mt-2">Không có cuộc trò chuyện nào</div>
            )}

            {isFetching && (
                <div className="flex-center py-1.5 gap-1">
                    <span className="font-medium text-primary">Đang tải</span>
                    <ThreeDotLoading color="#295779" size={1} />
                </div>
            )}
        </div>
    );
};

export default ConversationListContainer;
