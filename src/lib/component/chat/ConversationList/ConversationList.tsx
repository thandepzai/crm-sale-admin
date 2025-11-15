import clsx from "clsx";
import ConversationHeader, { ConversationHeaderProps } from "./ConversationHeader";
import ConversationListContainer, { ConversationListContainerProps } from "./ConversationListContainer";
import ConversationFilter, { ConversationFilterProps } from "./ConversationFilter";
import { ConversationItemData } from "./ConversationItem";

export interface ConversationListProps<
    TConversationView extends string = string,
    TTagKey extends string = string,
    TConversation extends ConversationItemData = ConversationItemData
> {
    conversationHeaderData: ConversationHeaderProps<TConversationView>;
    conversationFilterData: ConversationFilterProps<TTagKey>;
    conversationListContainerData: ConversationListContainerProps<TConversation>;
    className?: string;
}

const ConversationList = <
    TConversationView extends string = string,
    TTagKey extends string = string,
    TConversation extends ConversationItemData = ConversationItemData
>({
    conversationHeaderData,
    conversationFilterData,
    conversationListContainerData,
    className
}: ConversationListProps<TConversationView, TTagKey, TConversation>) => {
    return (
        <div className={clsx("w-full tabxx:w-[380px] border-r bg-white flex flex-col", className)}>
            <ConversationHeader<TConversationView> {...conversationHeaderData} />
            <ConversationFilter<TTagKey> {...conversationFilterData} />
            <ConversationListContainer<TConversation> {...conversationListContainerData} />
        </div>
    );
};

export default ConversationList;
