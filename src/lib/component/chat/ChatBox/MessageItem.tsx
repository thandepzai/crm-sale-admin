import { memo } from "react";
import clsx from "clsx";

export interface MessageItemProps {
    id: string;
    text?: string;
    imageUrl?: string;
    isMine?: boolean;
    isEdited?: boolean;
    senderName?: string;
    senderImage?: string;
    createdAt?: string | Date;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    className?: string;
}

const MessageItem = ({
    id,
    text,
    imageUrl,
    isMine = false,
    isEdited = false,
    senderName,
    senderImage,
    createdAt,
    onEdit,
    onDelete,
    className
}: MessageItemProps) => {
    return (
        <div className={clsx("flex w-full mb-3", isMine ? "justify-end" : "justify-start", className)}>
            <div
                className={clsx(
                    "max-w-[70%] rounded-2xl px-4 py-2 shadow-sm relative",
                    isMine ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                )}
            >
                {!isMine && senderName && <div className="text-sm font-medium mb-0.5 text-gray-500">{senderName}</div>}
                {text && <div className="whitespace-pre-wrap">{text}</div>}
                {imageUrl && (
                    <img src={imageUrl} alt="message-attachment" className="rounded-lg mt-2 max-h-60 object-cover" />
                )}
                <div className="text-xs text-gray-400 mt-1 flex justify-end items-center gap-1">
                    {isEdited && <span>(đã chỉnh sửa)</span>}
                    {createdAt && (
                        <span>
                            {typeof createdAt === "string" ? createdAt : new Date(createdAt).toLocaleTimeString()}
                        </span>
                    )}
                </div>
                {isMine && (
                    <div className="absolute top-1 right-2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
                        {onEdit && (
                            <button onClick={() => onEdit(id)} className="text-xs text-white/70 hover:text-white">
                                Sửa
                            </button>
                        )}
                        {onDelete && (
                            <button onClick={() => onDelete(id)} className="text-xs text-white/70 hover:text-white">
                                Xóa
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(MessageItem);
