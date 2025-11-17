import { InfoCircleOutlined, LeftOutlined } from "@ant-design/icons";
import clsx from "clsx";

export interface ChatHeaderProps {
    name: string;
    avatar?: string;
    backChat: () => void;
    showInfo: () => void;
    className?: string;
}
const ChatHeader = ({ name, avatar, backChat, showInfo, className }: ChatHeaderProps) => {
    return (
        <div className={clsx("h-[70px] bg-white border-b flex gap-4 items-center px-5 select-none", className)}>
            <div
                onClick={backChat}
                className="size-8 hover:bg-gray-100 rounded-lg cursor-pointer active:bg-gray-200 tabxx:hidden!"
            >
                <LeftOutlined className="font-bold text-xl" />
            </div>
            <img src={avatar ?? "/images/logo-128.png"} alt="" className="size-11 rounded-full" />
            <span className="text-xl font-bold flex-1">{name}</span>
            <div
                onClick={showInfo}
                className="size-9 rounded-full flex-center hover:bg-gray-200 active:bg-gray-300 cursor-pointer"
            >
                <InfoCircleOutlined className="text-2xl" />
            </div>
        </div>
    );
};

export default ChatHeader;
