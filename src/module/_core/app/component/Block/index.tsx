import { ReactNode } from "react";

interface BlockProps {
    heading?: ReactNode;
    headingIcon?: ReactNode;
    children?: ReactNode;
    className?: string;
    haederActions?: ReactNode;
}

const Block = ({ heading = null, headingIcon = null, children, className = "", haederActions = null }: BlockProps) => {
    return (
        <div className={`${className} block`}>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    {headingIcon ? (
                        <div className="text-lg text-[#9f9f9f] w-6 mr-2 flex items-center">{headingIcon}</div>
                    ) : null}
                    <h2 className="block-heading">{heading}</h2>
                </div>
                {haederActions}
            </div>
            {children}
        </div>
    );
};

export default Block;
