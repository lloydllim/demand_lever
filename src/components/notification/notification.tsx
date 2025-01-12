import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Status } from "@/components/ui/status";
import { IconButton } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

export type INotification = {
  message: string;
  createdAt: Date;
  read: boolean;
};

export type INotificationMenuProps = {
  userId: string;
};

const mockNotifications: INotification[] = [
  {
    message: "Welcome to the platform",
    createdAt: new Date(),
    read: false,
  },
  {
    message: "You have a new message",
    createdAt: new Date(),
    read: false,
  },
  {
    message: "You have a new friend request",
    createdAt: new Date(),
    read: true,
  },
];

export const NotificationMenu: React.FC<INotificationMenuProps> = (props) => {
  const [notifications, setNotifications] =
    useState<INotification[]>(mockNotifications);

  const [hasUnread, setHasUnread] = useState(
    notifications.some((notification) => !notification.read)
  );

  useEffect(() => {
    setHasUnread(notifications.some((notification) => !notification.read));
  }, [notifications]);

  return (
    <MenuRoot
      onExitComplete={() => {
        setNotifications(
          notifications.map((notification: INotification) => ({
            ...notification,
            read: true,
          }))
        );
      }}
    >
      <MenuTrigger>
        <IconButton
          variant={"ghost"}
          aria-label="Notifications"
          className={`${hasUnread ? "text-red-400" : ""}`}
        >
          <FaBell />
        </IconButton>
      </MenuTrigger>
      <MenuContent className="space-y-2 max-w-xs p-4">
        {notifications.map((notification, index) => (
          <MenuItem
            key={index}
            value={notification.message}
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
      </MenuContent>
    </MenuRoot>
  );
};
