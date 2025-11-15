import { CloseOutlined, LogoutOutlined, RightOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { ElementRef, useRef, useState } from "react";
import ListMember, { ListMemberProps } from "./ListMember";
import DeleteConfirmModal, { DeleteConfirmModalProps } from "./DeleteConfirmModal";
import clsx from "clsx";

export interface ChatInfoPanelProps {
    show: boolean;
    onChangeShow: (type: boolean) => void;
    title: string;
    listMemberData: ListMemberProps;
    deleteConfirmModalData: DeleteConfirmModalProps;
    addUserToConversation: () => void;
    className?: string;
}
const ChatInfoPanel = ({
    show,
    onChangeShow,
    title,
    listMemberData,
    deleteConfirmModalData,
    addUserToConversation,
    className
}: ChatInfoPanelProps) => {
    const [showUsers, setShowUsers] = useState(false);

    const deleteConfirmModalRef = useRef<ElementRef<typeof DeleteConfirmModal>>(null);

    return (
        <div className={clsx("w-full tabxx:w-[360px] bg-white relative border-l", show ? "" : "hidden", className)}>
            <div onClick={() => onChangeShow(false)} className="absolute cursor-pointer top-2.5 left-3">
                <CloseOutlined className="hover:text-red-500 text-xl active:text-red-600" />
            </div>

            <div className="flex-center flex-col gap-2.5 mt-4.5 mb-3">
                <img src="/images/logo-128.png" alt="" className="size-[65px] rounded-full" />
                <div className="text-lg font-medium">{title}</div>
            </div>
            <div className="h-[calc(100vh-195px)] overflow-y-scroll scrollbar-y-light px-4.5">
                <div className="font-medium text-[#656C7B] mb-3">Thông tin về đoạn chat</div>
                <Collapse
                    bordered={false}
                    expandIcon={() => null}
                    onChange={() => setShowUsers(!showUsers)}
                    className="[&>div>.ant-collapse-header]:!p-0 [&>div>.ant-collapse-content]:!bg-white [&>div>div>.ant-collapse-content-box]:!p-0"
                    items={[
                        {
                            key: "1",
                            label: (
                                <div className="flex p-3.5 rounded-lg bg-[#F6F7F8] gap-2 !justify-between">
                                    <TeamOutlined className="text-[20px]" />
                                    <div className="flex-1 font-medium select-none">Thành viên trong đoạn chat</div>
                                    <RightOutlined
                                        className={clsx(
                                            "transition-transform duration-300 ease-in-out",
                                            showUsers ? "rotate-90" : ""
                                        )}
                                    />
                                </div>
                            ),
                            children: <ListMember {...listMemberData} />
                        }
                    ]}
                />
                <div className="font-medium text-[#656C7B] mb-2 my-3">Hành động khác</div>
                <div
                    onClick={addUserToConversation}
                    className="flex p-3.5 rounded-lg bg-[#F6F7F8] gap-2 !justify-between mb-3 cursor-pointer active:bg-[#eef0f5] select-none hover:bg-gray-100"
                >
                    <UserAddOutlined className="text-[20px]" />
                    <div className="flex-1 font-medium">Thêm thành viên mới</div>
                </div>
                <div
                    onClick={() => deleteConfirmModalRef.current?.openModal("leave")}
                    className="flex p-3.5 rounded-lg bg-[#F6F7F8] gap-2 !justify-between cursor-pointer active:bg-[#eef0f5] select-none hover:bg-gray-100"
                >
                    <LogoutOutlined className="text-[19px] text-red-500" />
                    <div className="flex-1 font-medium text-red-500">Rời nhóm</div>
                </div>
            </div>
            <DeleteConfirmModal ref={deleteConfirmModalRef} {...deleteConfirmModalData} />
        </div>
    );
};

export default ChatInfoPanel;
