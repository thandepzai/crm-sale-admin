import { Tabs, TabsProps } from "antd";

interface TabsBlockProps {
    tabItems?: TabsProps["items"];
    tabsProps?: TabsProps;
    className?: string;
    tabsClassName?: string;
}

const TabsBlock = ({ tabItems = [], tabsProps = {}, className = "", tabsClassName = "" }: TabsBlockProps) => {
    return (
        <div className={`${className} pt-2 pb-6 block`}>
            <Tabs items={tabItems} className={tabsClassName} destroyInactiveTabPane={true} {...tabsProps} />
        </div>
    );
};

export default TabsBlock;
