import { ReactNode } from "react";
import { Form, FormProps } from "antd";

interface MainFormProps extends FormProps {
    children?: ReactNode;
}

const MainForm = (props: MainFormProps) => {
    return (
        <Form scrollToFirstError={true} layout="vertical" {...props}>
            {props.children}
        </Form>
    );
};

export default MainForm;
