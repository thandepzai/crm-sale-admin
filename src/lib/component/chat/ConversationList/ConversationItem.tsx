import { EllipsisOutlined } from "@ant-design/icons";
import formatTimeAgo from "@module/chat-v2/config/util/formatTimeAgo";
import { Popover, Tooltip } from "antd";
import { memo, MouseEvent, useState } from "react";
import clsx from "clsx";

export interface ConversationItemData {
    id: string | number;
    title?: string;
    user?: { name?: string; avatar?: string };
    browser?: { name?: string };
    lastMessagePreview?: string;
    lastMessageAt?: string;
    unreadCount?: number;
}

export interface ConversationItemAction {
    type: "tooltip" | "popover";
    title?: string;
    icon?: React.ReactNode;
    color?: string;
    onClick: (data: ConversationItemData, e: MouseEvent) => void;
}

export interface ConversationItemProps {
    data: ConversationItemData;
    isActive?: boolean;
    onClick: (data: ConversationItemData) => void;
    actions?: ConversationItemAction[];
    className?: string;
}

const ConversationItem = memo(({ data, isActive, onClick, actions = [], className }: ConversationItemProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { title, user, browser, lastMessagePreview, lastMessageAt, unreadCount } = data;

    const displayName = title ?? user?.name ?? browser?.name ?? "Ẩn danh";
    const avatarSrc = user?.avatar ?? "/images/logo-128.png";

    const actionsTooltip = actions.filter((action) => action.type === "tooltip");
    const actionsPopup = actions.filter((actions) => actions.type === "popover");

    return (
        <div
            className={clsx(
                "px-4.5 h-20 py-3 flex gap-4 items-center cursor-pointer hover:bg-gray-200 group select-none",
                isActive && "!bg-blue-100",
                className
            )}
            onClick={() => onClick(data)}
        >
            <img src={avatarSrc} alt={displayName} className="size-[48px] rounded-full object-cover" />

            <div className="flex-1 min-w-0">
                <div className="text-lg mb-1 flex items-center gap-2">
                    <div
                        className="flex-1 h-[24.5px] text-secondary font-medium line-clamp-1"
                        style={{ wordBreak: "break-all" }}
                    >
                        {displayName}
                    </div>

                    <div className="text-sm flex items-center gap-1 whitespace-nowrap">
                        {lastMessageAt && (
                            <div className="text-gray-500 -mb-1 group-hover:hidden">{formatTimeAgo(lastMessageAt)}</div>
                        )}

                        {actionsTooltip.map((act, i) => (
                            <Tooltip key={i} color={act.color ?? "var(--primary)"} placement="top" title={act.title}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        act.onClick(data, e);
                                    }}
                                    className="group-hover:!flex !hidden size-7 flex-center rounded-md hover:bg-gray-300 active:bg-gray-100"
                                >
                                    {act.icon}
                                </button>
                            </Tooltip>
                        ))}

                        {actionsPopup.length !== 0 && (
                            <Popover
                                open={menuOpen}
                                onOpenChange={setMenuOpen}
                                trigger="click"
                                placement="bottom"
                                overlayInnerStyle={{ padding: 0, borderRadius: 8 }}
                                content={
                                    <div className="p-2 select-none">
                                        {actionsPopup.map((action) => (
                                            <div
                                                key={action.title + JSON.stringify(action.icon)}
                                                className="w-[210px] px-3.5 h-10 flex items-center !justify-start gap-2 rounded-md font-medium cursor-pointer hover:bg-gray-100"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setMenuOpen(false);
                                                    action.onClick(data, e);
                                                }}
                                            >
                                                {action.icon}
                                                {action.title}
                                            </div>
                                        ))}
                                    </div>
                                }
                            >
                                <button
                                    onClick={(e) => e.stopPropagation()}
                                    className="group-hover:!flex !hidden size-7 flex-center hover:bg-gray-300 active:bg-gray-100 rounded-md"
                                >
                                    <EllipsisOutlined className="text-lg" />
                                </button>
                            </Popover>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2 min-w-0">
                    <div
                        className={clsx("line-clamp-1 text-gray-700", !!unreadCount && "font-medium")}
                        style={{ wordBreak: "break-all" }}
                    >
                        {lastMessagePreview ?? ""}
                    </div>
                    {!!unreadCount && (
                        <div
                            className={clsx(
                                "p-1 bg-slate-500 text-sm rounded-full flex-center text-white leading-[12.25px]",
                                unreadCount > 5 ? "min-w-8" : "min-w-6"
                            )}
                        >
                            {unreadCount > 5 ? "5+" : unreadCount}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export default ConversationItem;
