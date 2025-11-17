import React, { memo, ReactNode, useCallback, useMemo, useState } from "react";
import { FormOutlined, ReloadOutlined } from "@ant-design/icons";
import { Popover, Tooltip } from "antd";
import clsx from "clsx";

export interface IconButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const IconButton = memo(({ icon, label, onClick }: IconButtonProps) => (
    <div
        onClick={onClick}
        className="cursor-pointer py-2 hover:bg-gray-200 active:bg-gray-300 font-medium px-2 rounded-lg gap-2 justify-start!"
    >
        {icon}
        {label}
    </div>
));

export interface ConversationHeaderProps<TConversationView extends string = string> {
    conversationView: TConversationView;
    onChangeConversationView: (conversationView: TConversationView) => void;
    conversationViewOptions: { value: TConversationView; label: string; icon: ReactNode }[];
    onReload: () => void;
    onCreateConversation: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export const ConversationHeader = <TConversationView extends string = string>({
    conversationView,
    onChangeConversationView,
    conversationViewOptions,
    onReload,
    onCreateConversation,
    className,
    style
}: ConversationHeaderProps<TConversationView>) => {
    const [openPopupSetting, setOpenPopupSetting] = useState(false);

    const conversationViewActive = useMemo(
        () => conversationViewOptions.find(({ value }) => value === conversationView),
        [conversationView, conversationViewOptions]
    );

    const availableViews = useMemo(
        () => conversationViewOptions.filter(({ value }) => value !== conversationView),
        [conversationView, conversationViewOptions]
    );

    const handleChangeView = useCallback(
        (item: TConversationView) => onChangeConversationView(item),
        [onChangeConversationView]
    );

    return (
        <div className={clsx("px-4.5 py-4.5 flex gap-3.5 items-center", className)} style={style}>
            <span className="font-bold text-2xl flex-1">{conversationViewActive?.label}</span>
            <Tooltip color="var(--primary)" placement="top" title="Tạo cuộc trò chuyện mới">
                <div
                    onClick={onCreateConversation}
                    className="bg-gray-200 rounded-full size-[30px] cursor-pointer hover:bg-gray-300 active:bg-slate-400"
                >
                    <FormOutlined className="text-lg" />
                </div>
            </Tooltip>
            <Tooltip color="var(--primary)" placement="top" title="Reload">
                <div
                    onClick={onReload}
                    className="bg-gray-200 rounded-full size-[30px] cursor-pointer hover:bg-gray-300 active:bg-slate-400"
                >
                    <ReloadOutlined className="text-lg" />
                </div>
            </Tooltip>
            <Popover
                open={openPopupSetting}
                onOpenChange={(visible) => setOpenPopupSetting(visible)}
                content={
                    <div className="p-2 select-none">
                        {availableViews.map(({ value, label, icon }) => (
                            <IconButton key={value} icon={icon} onClick={() => handleChangeView(value)} label={label} />
                        ))}
                    </div>
                }
                placement="bottomRight"
                overlayInnerStyle={{ padding: 0, borderRadius: "6px" }}
                trigger="click"
            >
                <div className="bg-gray-200 rounded-full size-[30px] cursor-pointer hover:bg-gray-300 text-center active:bg-slate-400 select-none">
                    <div className="text-2xl font-bold bottom-2 leading-0 -mt-1">...</div>
                </div>
            </Popover>
        </div>
    );
};

export default ConversationHeader;
