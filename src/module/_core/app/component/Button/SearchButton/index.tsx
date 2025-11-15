import React from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import strings from "module/_core/infras/constant/strings";

interface SearchButtonProps {
    className?: string;
}

const SearchButton = ({ className = "" }: SearchButtonProps) => {
    return (
        <Button type="primary" htmlType="submit" className={`${className} flex-center`}>
            <SearchOutlined className="text-md" />
            <span>{strings.search}</span>
        </Button>
    );
};

export default SearchButton;
