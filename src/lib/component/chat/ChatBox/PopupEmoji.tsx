import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import EmojiPicker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Emoji } from "@module/chat/domain/dto/emoji";
import { Popover } from "antd";

export interface PopupEmojiProps {
    onEmojiSelect: (emoji: Emoji) => void;
}

const PopupEmoji = ({ onEmojiSelect }: PopupEmojiProps) => {
    return (
        <Popover
            title={
                <EmojiPicker
                    data={data}
                    onEmojiSelect={(emoji: Emoji) => onEmojiSelect(emoji)}
                    emojiButtonSize={36}
                    navPosition="top"
                />
            }
            trigger="click"
            overlayInnerStyle={{ padding: 0 }}
        >
            <SmileOutlined className="text-[20px]" />
        </Popover>
    );
};

export default PopupEmoji;
