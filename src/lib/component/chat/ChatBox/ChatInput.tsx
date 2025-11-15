import { useRef, useState, useCallback, useEffect } from "react";
import { CloseOutlined, FileImageOutlined, SendOutlined } from "@ant-design/icons";
import clsx from "clsx";
import PopupEmoji from "./PopupEmoji";
import { Emoji } from "@module/chat/domain/dto/emoji";
import { useDebound } from "@lib/hook/useDebound";
import { errorHandler } from "@module/_core/infras/util/exceptionHandler";

export interface ChatInputProps {
    onSendMessage: (message: string, file?: File) => void;
    onUploadImage?: (file: File) => Promise<string>;
    editMode?: boolean;
    onCancelEdit?: () => void;
    placeholder?: string;
    disabled?: boolean;
    onClearFile?: () => void;
    initialMessage?: string;
    onTypingStart?: () => void;
    onTypingStop?: () => void;
    className?: string;
}

const ChatInput = ({
    onSendMessage,
    onUploadImage,
    editMode = false,
    onCancelEdit,
    placeholder = "Nhập tin nhắn...",
    disabled = false,
    onClearFile,
    initialMessage = "",
    onTypingStart,
    onTypingStop,
    className
}: ChatInputProps) => {
    const [message, setMessage] = useState(initialMessage);
    const [filePreviewUrl, setFilePreviewUrl] = useState<string>();
    const [file, setFile] = useState<File>();
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const isTypingRef = useRef(false);

    const debound = useDebound();

    useEffect(() => {
        setMessage(initialMessage || "");
        setTimeout(updateHeightInput, 0);
    }, [initialMessage]);

    const updateHeightInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    };

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setMessage(value);
        updateHeightInput();

        if (!isTypingRef.current) {
            isTypingRef.current = true;
            onTypingStart?.();
        }

        debound(() => {
            isTypingRef.current = false;
            onTypingStop?.();
        }, 1000);
    }, []);

    const handleSend = useCallback(() => {
        if (!message.trim() && !file) return;

        onSendMessage(message.trim(), file);
        setMessage("");
        setFile(undefined);
        setFilePreviewUrl(undefined);
        updateHeightInput();
    }, [message, file, onSendMessage]);

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFile(file);
        const previewUrl = URL.createObjectURL(file);
        setFilePreviewUrl(previewUrl);

        if (onUploadImage) {
            try {
                setIsUploadingImage(true);
                await onUploadImage(file);
            } catch (error) {
                errorHandler(error);
                handleClearFile();
            } finally {
                setIsUploadingImage(false);
            }
        }
    };

    const handleClearFile = () => {
        setFile(undefined);
        setFilePreviewUrl(undefined);
        if (imageRef.current) imageRef.current.value = "";
        onClearFile?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleAddEmojiInTextarea = (emoji: Emoji) => {
        if (textareaRef.current) {
            const emojiNative = emoji.native;
            const textarea = textareaRef.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const newValue = message.slice(0, start) + emojiNative + message.slice(end);
            setMessage(newValue);
            setTimeout(() => {
                textarea.setSelectionRange(start + emojiNative.length, start + emojiNative.length);
                textarea.focus();
                updateHeightInput();
            }, 0);
        }
    };

    return (
        <div className={clsx("bg-white border-t", className)}>
            {editMode && (
                <div className="px-4 py-3.5 flex justify-between items-center border-b">
                    <span className="text-lg font-medium">Chỉnh sửa tin nhắn</span>
                    <button
                        onClick={onCancelEdit}
                        className="rounded-full size-8 hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center"
                    >
                        <CloseOutlined className="text-lg" />
                    </button>
                </div>
            )}

            <div className={clsx("flex px-4 py-3 items-center", disabled && "pointer-events-none opacity-60")}>
                <div className="flex-1">
                    {filePreviewUrl && (
                        <div className="relative mb-2 inline-block">
                            <img
                                src={filePreviewUrl}
                                alt="preview"
                                className={clsx(
                                    "h-40 object-cover rounded-lg border transition-all",
                                    isUploadingImage && "opacity-60 animate-pulse"
                                )}
                            />
                            {!isUploadingImage && (
                                <button
                                    onClick={handleClearFile}
                                    className="absolute top-1 left-1 bg-slate-100 hover:bg-slate-200 rounded-full p-1"
                                >
                                    <CloseOutlined className="text-md" />
                                </button>
                            )}
                            {isUploadingImage && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-lg">
                                    <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </div>
                    )}
                    <div className="gap-2.5 w-full flex items-center py-2">
                        <div>
                            <PopupEmoji onEmojiSelect={handleAddEmojiInTextarea} />
                        </div>
                        <div onClick={() => imageRef.current?.click()} className="cursor-pointer">
                            <FileImageOutlined className="text-[20px]" />
                            <input ref={imageRef} onChange={handleUploadImage} type="file" className="w-0 h-0" />
                        </div>
                    </div>

                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        rows={1}
                        style={{ resize: "none" }}
                        className="w-full text-lg text-gray-600 border-none outline-none p-0 scrollbar-y-light max-h-[200px]"
                    />
                </div>

                <button
                    onClick={handleSend}
                    className="ml-3 rounded-md size-9 flex items-center justify-center hover:bg-slate-200 active:bg-slate-300"
                >
                    <SendOutlined className="text-2xl text-slate-500 group-hover:text-slate-600" />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
