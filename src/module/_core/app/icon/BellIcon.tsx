import { IconProps } from "module/_core/app/config/type/icon";

export const BellIcon = ({
  className = "w-6 h-6",
  color = "#000000",
}: IconProps) => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.75a6.414 6.414 0 016.365 5.618l.824 6.593a2.333 2.333 0 01-2.316 2.622h-1.052l-.01.024a4.17 4.17 0 01-7.62 0l-.012-.024H5.126a2.332 2.332 0 01-2.314-2.622l.824-6.593A6.414 6.414 0 0110 1.75zm2.083 14.833H7.916a2.67 2.67 0 004.167 0z"
        fill={color}
      />
    </svg>
  );
};
