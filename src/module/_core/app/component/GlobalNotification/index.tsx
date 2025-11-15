"use client";
import { App } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import { useEffect } from "react";

let notificationInstance: NotificationInstance;

const GlobalNotification = () => {
    const { notification } = App.useApp();

    useEffect(() => {
        notificationInstance = notification;
    }, [notification]);

    return null;
};

export { GlobalNotification, notificationInstance };
