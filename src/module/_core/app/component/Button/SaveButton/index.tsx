import React from "react";
import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import strings from "module/_core/infras/constant/strings";

interface SaveButtonProps {
    className?: string;
    text?: string;
    disabled?: boolean;
    loading?: boolean;
}

const SaveButton = ({ className = "", text, disabled, loading }: SaveButtonProps) => {
    return (
        <Button
            type="primary"
            htmlType="submit"
            disabled={disabled}
            loading={loading}
            className={`${className} flex-center py-1.5`}
        >
            <SaveOutlined />
            <span className="mb-px">{text ?? strings.save}</span>
        </Button>
    );
};

export default SaveButton;
