"use client";

import { readAllNotificationByUserIdAction } from "@/app/actions/notification/read-all-notification-by-user-id.action";
import { updateAllNotificationByIdsToReadAction } from "@/app/actions/notification/update-all-notification-by-ids-to-read.action";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Status } from "@/components/ui/status";
import { toaster } from "@/components/ui/toaster";
import { INotificationModel } from "@/lib/notification/entities/notification.model";
import { IconButton } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

export type INotification = Pick<
  INotificationModel,
  "message" | "createdAt" | "read" | "id"
>;

const NotificationMenu: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  const [notifications, setNotifications] = useState<INotification[]>([
    {
      message: "Your order has been shipped",
      createdAt: new Date(),
      read: false,
      id: "1",
    },
    {
      message: "Your order has been shipped",
      createdAt: new Date(),
      read: false,
      id: "2",
    },
    {
      message: "Your order has been shipped",
      createdAt: new Date(),
      read: false,
      id: "3",
    },
    {
      message: "Your order has been shipped",
      createdAt: new Date(),
      read: false,
      id: "4",
    },
    {
      message: "Your order has been shipped",
      createdAt: new Date(),
      read: false,
      id: "5",
    },
  ]);

  const [hasUnread, setHasUnread] = useState(
    notifications.some((notification) => !notification.read)
  );

  useEffect(() => {
    setHasUnread(notifications.some((notification) => !notification.read));
  }, [notifications]);

  const readAllNotificationsByUserId = useCallback(async () => {
    const result = await readAllNotificationByUserIdAction();
    if (result.data) {
      setNotifications((prev) => [
        ...prev,
        ...result.data.filter((n) => !prev.map((pn) => pn.id).includes(n.id)),
      ]);
    }
  }, []);

  useEffect(() => {
    readAllNotificationsByUserId();
  }, [readAllNotificationsByUserId]);

  const updateAllNotificationIsUnread = async () => {
    const unreadNotifications = notifications.filter(
      (notification) => !notification.read
    );
    const notificationIds = unreadNotifications.map(
      (notification) => notification.id
    );

    if (notificationIds.length === 0) {
      return;
    }

    const setRead = (notification: INotification, read: boolean) => {
      setNotifications(
        notifications.map((n) =>
          n.id === notification.id ? { ...n, read } : n
        )
      );
    };

    unreadNotifications.forEach((n) => setRead(n, true));

    const result = await updateAllNotificationByIdsToReadAction(
      notificationIds
    );

    if (result.error) {
      toaster.create({
        description: result.error,
      });
      unreadNotifications.forEach((n) => setRead(n, false));
    } else {
      setNotifications(
        notifications.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    }
  };

  return (
    <MenuRoot
      onExitComplete={() => {
        updateAllNotificationIsUnread();
      }}
    >
      <MenuTrigger asChild>
        <IconButton
          variant={"ghost"}
          aria-label="Notifications"
        >
          {hasUnread && (
            <Status
              value="error"
              className="absolute right-1 top-1"
            />
          )}
          <FaBell />
        </IconButton>
      </MenuTrigger>
      <MenuContent className="space-y-2 w-64 p-4 max-h-64 overflow-y-auto">
        {!notifications.length && (
          <MenuItem
            className="flex flex-row items-center justify-between space-x-4 rounded-lg p-2"
            value="No new notifications"
          >
            <div className="flex flex-col">
              <p>You have no notifications.</p>
            </div>
          </MenuItem>
        )}
        {notifications.map((notification, index) => (
          <MenuItem
            key={index}
            value={notification.id}
            className="flex flex-row items-center justify-between space-x-4 rounded-lg p-2"
          >
            <div className="flex flex-col">
              <p>{notification.message}</p>
              <p className="text-xs text-gray-400">
                {formatDistanceToNow(notification.createdAt, {
                  addSuffix: true,
                })}
              </p>
            </div>
            {!notification.read && <Status />}
          </MenuItem>
        ))}
        {props.children}
      </MenuContent>
    </MenuRoot>
  );
};

export default NotificationMenu;
