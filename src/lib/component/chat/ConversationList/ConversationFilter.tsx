import { useState, useCallback } from "react";
import clsx from "clsx";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

export interface ConversationFilterProps<TTagKey extends string = string> {
    onSearch?: (value: string) => void;
    tags?: { label: string; value: TTagKey }[];
    selectedTag?: TTagKey;
    onSelectTag?: (value: TTagKey) => void;
    className?: string;
}

const ConversationFilter = <TTagKey extends string = string>({
    onSearch,
    tags,
    selectedTag,
    onSelectTag,
    className
}: ConversationFilterProps<TTagKey>) => {
    const [inputSearch, setInputSearch] = useState("");

    const handleSearch = useCallback(() => {
        onSearch?.(inputSearch.trim());
    }, [inputSearch, onSearch]);

    return (
        <div className={clsx("px-4.5 pb-4.5", className)}>
            <div className="w-full pb-4.5 relative">
                <div
                    onClick={handleSearch}
                    className="absolute left-0 w-[37px] h-[37px] flex-center group cursor-pointer"
                >
                    <SearchOutlined className="text-gray-400 text-lg group-hover:text-primary" />
                </div>

                <input
                    type="text"
                    value={inputSearch}
                    className="w-full rounded-lg bg-[#F0F3F7] border-none !ring-0 px-[37px] py-[8px] font-medium placeholder:text-[#B4C3D1]"
                    placeholder="Tìm kiếm"
                    onChange={(e) => setInputSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />

                <div
                    className="absolute right-0 top-0 w-[37px] h-[37px] flex-center group cursor-pointer"
                    onClick={() => {
                        setInputSearch("");
                        onSearch?.("");
                    }}
                >
                    <CloseOutlined className="text-gray-400 text-md group-hover:text-primary" />
                </div>
            </div>

            {tags?.length ? (
                <div className="flex gap-3 flex-wrap">
                    {tags.map((tag) => (
                        <div
                            key={tag.value}
                            className={clsx(
                                "py-[5px] px-[12px] bg-[#F6F7F8] rounded-lg cursor-pointer hover:bg-slate-200 transition-colors",
                                selectedTag === tag.value ? "text-[#155E94] font-medium" : "text-[#979797]"
                            )}
                            onClick={() => onSelectTag?.(tag.value)}
                        >
                            {tag.label}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default ConversationFilter;
