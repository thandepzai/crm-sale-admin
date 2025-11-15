import { Button, Modal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

interface DeleteConfirmModalModalHandler {
    openModal: (type: "kick" | "leave", userId?: number) => void;
    closeModal: () => void;
}

export interface DeleteConfirmModalProps {
    id?: string | number;
    onKick: () => void;
    onLeave: () => void;
    isLoading: boolean;
}
const DeleteConfirmModal = forwardRef<DeleteConfirmModalModalHandler, DeleteConfirmModalProps>(
    ({ id, onKick, onLeave, isLoading }, ref) => {
        const [type, setType] = useState<"kick" | "leave">();
        const [userId, setUserId] = useState<number>();

        useImperativeHandle(ref, () => ({
            openModal: (type, userId) => {
                setType(type);
                setUserId(userId);
            },
            closeModal: closeModal
        }));

        const onOk = () => {
            if (!type || !id) return;
            if (type === "kick") {
                if (!userId) return;
                onKick();
            } else onLeave();
        };

        const closeModal = () => {
            setType(undefined);
            setUserId(undefined);
        };

        return (
            <Modal centered open={!!type} closable={false} footer={null} style={{ textAlign: "center" }}>
                <div className="font-bold text-2xl text-red-500 mb-2">
                    {type === "kick" ? "Xóa khỏi đoạn chat?" : "Rời khỏi đoạn chat"}
                </div>
                {type === "kick" ? (
                    <div className="text-[#656C7B]">
                        Bạn có chắc chắn muốn xóa người này khỏi cuộc trò chuyện không? Họ sẽ không thể gửi hay nhận tin
                        nhắn mới nữa.
                    </div>
                ) : (
                    <div className="text-[#656C7B]">Bạn sẽ không nhận được tin nhắn từ cuộc trò chuyện này nữa.</div>
                )}
                <div className="flex gap-4.5 justify-center w-full mt-4.5">
                    <button
                        onClick={closeModal}
                        className="w-[120px] h-[40px] flex-center border rounded-lg text-black font-medium hover:bg-gray-200"
                    >
                        Huỷ
                    </button>
                    <Button
                        onClick={onOk}
                        className="w-[120px] h-[40px] flex-center bg-red-500 !text-white rounded-lg font-medium hover:!bg-red-400 !border-none"
                        loading={isLoading}
                    >
                        Xác nhận
                    </Button>
                </div>
            </Modal>
        );
    }
);

export default DeleteConfirmModal;
