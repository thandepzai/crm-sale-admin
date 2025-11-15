import strings from "module/_core/infras/constant/strings";
import { notificationInstance } from "@module/_core/app/component/GlobalNotification";

interface NotificationProps {
  description?: string;
  message?: string;
  duration?: number;
}

export const displaySuccessNoti = ({
  description = "Thành công!",
  message = strings.success,
  duration = 4,
}: NotificationProps) => {
  notificationInstance.success({
    message,
    description,
    duration,
    className: "shadow-lg rounded-lg",
  });
};

export const displayErrorNoti = ({
  description = "Có lỗi xảy ra.",
  message = strings.error,
  duration = 4,
}: NotificationProps) => {
  notificationInstance.error({
    message,
    description,
    duration,
    className: "shadow-lg rounded-lg",
  });
};

export const displayWarningNoti = ({
  description = "Cảnh báo!",
  message = strings.warning,
  duration = 4,
}: NotificationProps) => {
  notificationInstance.warning({
    message,
    description,
    duration,
    className: "shadow-lg rounded-lg",
  });
};
