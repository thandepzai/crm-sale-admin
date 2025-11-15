import { IconProps } from "module/_core/app/config/type/icon";

export const ChevronsIcon = ({
  className = "w-6 h-6",
  color = "#000000",
}: IconProps) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.47 5.47a.75.75 0 111.06 1.06L7.06 12l5.47 5.47a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6zm4 2a.75.75 0 111.06 1.06L13.06 12l3.47 3.47a.75.75 0 11-1.06 1.06l-4-4a.75.75 0 010-1.06l4-4z"
        fill={color}
      />
    </svg>
  );
};
