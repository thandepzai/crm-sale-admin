import { Button, ButtonProps } from "antd";

interface MainButtonProps extends ButtonProps {}

const MainButton = (props: MainButtonProps) => {
  return (
    <Button
      {...props}
      className={`${props.className} text-white !py-2 !px-4 inline-flex items-center justify-center rounded-xl shadow-sm whitespace-nowrap duration-150 ease-out`}
    />
  );
};

export default MainButton;
