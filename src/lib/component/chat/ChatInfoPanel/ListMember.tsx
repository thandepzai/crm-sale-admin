import { Popconfirm } from "antd";
import { LogoutOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import ThreeDotLoading from "@lib/component/Loading/ThreeDotLoading";
import clsx from "clsx";

export interface ListMemberProps {
    meId: string | number;
    members: { id: number | string; name: string }[];
    isLoading?: boolean;
    openModal: (action: "leave" | "kick", id?: string | number) => void;
    className?: string;
    itemClass?: string;
}

const ListMember = ({ meId, members, isLoading, openModal, className, itemClass }: ListMemberProps) => {
    const [memberIdPopupSetting, setMemberIdPopupSetting] = useState<string | number>();

    if (!members?.length && !isLoading)
        return <div className="text-center py-3 text-gray-400">Không có thành viên nào</div>;

    return (
        <div className={className}>
            {members.map(({ id, name }) => (
                <div
                    key={id}
                    className={clsx(
                        "flex gap-3.5 cursor-pointer items-center rounded-lg py-3 px-3.5 hover:bg-gray-50 active:bg-gray-100",
                        itemClass
                    )}
                >
                    <img src="/images/logo-128.png" alt="" className="size-[36px] rounded-full" />
                    <div className="flex-1 font-medium text-[15px]">{name}</div>

                    <Popconfirm
                        open={memberIdPopupSetting === id}
                        onOpenChange={() => setMemberIdPopupSetting(memberIdPopupSetting === id ? undefined : id)}
                        title={
                            <div className="p-2 select-none">
                                {meId === id ? (
                                    <div
                                        onClick={() => {
                                            openModal("leave");
                                            setMemberIdPopupSetting(undefined);
                                        }}
                                        className="cursor-pointer py-2 hover:bg-gray-200 active:bg-gray-300 font-medium px-2 rounded-lg gap-2 !justify-start text-red-500"
                                    >
                                        <LogoutOutlined className="text-lg text-red-500" />
                                        <div className="flex-1 font-medium text-red-500">Rời nhóm</div>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => {
                                            openModal("kick", id);
                                            setMemberIdPopupSetting(undefined);
                                        }}
                                        className="cursor-pointer py-2 hover:bg-gray-200 active:bg-gray-300 font-medium px-2 rounded-lg gap-2 !justify-start text-red-500"
                                    >
                                        <UserDeleteOutlined className="text-lg text-red-500" />
                                        Xoá thành viên
                                    </div>
                                )}
                            </div>
                        }
                        icon={null}
                        showCancel={false}
                        okButtonProps={{ style: { display: "none" } }}
                        placement="bottomRight"
                        overlayInnerStyle={{ padding: 0, borderRadius: "6px" }}
                    >
                        <div className="rounded-full size-[36px] cursor-pointer hover:bg-gray-100 text-center active:bg-slate-200 select-none">
                            <div className="text-3xl font-bold bottom-2 leading-0 -mt-1">...</div>
                        </div>
                    </Popconfirm>
                </div>
            ))}

            {isLoading && (
                <div className="flex-center py-1.5 gap-1">
                    <span className="font-medium text-primary">Đang tải</span>
                    <ThreeDotLoading color="#295779" size={1} />
                </div>
            )}
        </div>
    );
};

export default ListMember;
