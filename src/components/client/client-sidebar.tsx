"use client";
import {
  Box,
  Button,
  Collapsible,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  Icon,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaBook,
  FaBusinessTime,
  FaChartLine,
  FaChevronDown,
  FaChevronRight,
  FaCog,
  FaInbox,
  FaLinkedin,
  FaUserAlt,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { useMediaQuery } from "react-responsive";

export type ICollapsibleItem = {
  name: string;
  icon?: IconType;
  items: string[];
};

export type ICollapsibleListProps = {
  items: ICollapsibleItem[];
};

export const CollapsibleList: React.FC<ICollapsibleListProps> = ({
  items,
}) => {
  const [active, setActive] = useState<string>("");

  return (
    <Box>
      {items.map((item) => (
        <CollapsibleItem
          key={item.name}
          item={item}
          parentActive={active}
          setParentActive={setActive}
        />
      ))}
    </Box>
  );
};

export type ICollapsibleItemProps = {
  parentActive: string;
  setParentActive: React.Dispatch<React.SetStateAction<string>>;
  item: ICollapsibleItem;
};

export const CollapsibleItem: React.FC<ICollapsibleItemProps> = ({
  item,
  parentActive,
  setParentActive,
}) => {
  const [isActive, setActive] = useState<boolean>(parentActive === item.name);

  const toggleActive = () => {
    setParentActive(isActive ? "" : item.name);
  };

  useEffect(() => {
    setActive(parentActive === item.name);
  }, [parentActive]);

  if (item.items.length === 0) {
    return (
      <Box className="hover:cursor-pointer hover:underline py-3">
        {item.icon && (
          <Icon className="mr-2">
            <item.icon />
          </Icon>
        )}
        <Link href={`#`}>{item.name}</Link>
      </Box>
    );
  }

  return (
    <Collapsible.Root
      open={isActive}
      onOpenChange={toggleActive}
    >
      <Collapsible.Trigger className="flex items-center justify-between hover:cursor-pointer min-w-full py-3">
        <Box className="hover:underline">
          {item.icon && (
            <Icon className="mr-2">
              <item.icon />
            </Icon>
          )}
          {item.name}
        </Box>
        <Icon>{isActive ? <FaChevronDown /> : <FaChevronRight />}</Icon>
      </Collapsible.Trigger>
      <Collapsible.Content className="space-y-2 border-l-[1px] ml-1  border-gray-200">
        {item.items.map((subItem) => (
          <Box
            key={subItem}
            className="pl-4  hover:underline"
          >
            {/* todo add href */}
            <Link href={`#`}>{subItem}</Link>
          </Box>
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

const collapsibleItems: ICollapsibleItem[] = [
  {
    name: "Analytics",
    icon: FaChartLine,
    items: ["SDR1 Analytics", "SDR2 Analytics", "SDR3 Analytics"],
  },
  {
    name: "Scheduler",
    icon: FaBusinessTime,
    items: ["SDR1 Scheduler", "SDR2 Scheduler", "SDR3 Scheduler"],
  },
  {
    name: "Conversations",
    icon: FaInbox,
    items: [],
  },
  {
    name: "Resources",
    icon: FaBook,
    items: [],
  },
  {
    name: "LinkedIn Profile",
    icon: FaLinkedin,
    items: [],
  },
  {
    name: "CRM",
    icon: FaUsers,
    items: [],
  },
  {
    name: "Consulting",
    icon: FaUserAlt,
    items: [],
  },
  {
    name: "Onboarding",
    icon: FaUserPlus,
    items: [],
  },
  {
    name: "Settings",
    icon: FaCog,
    items: ["User Profile", "Billing"],
  },
];

export type IClientSidebarProps = {
  children?: React.ReactNode;
};

const ClientSidebar: React.FC<IClientSidebarProps> = (
  props: IClientSidebarProps
) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false);
    } else {
      setDrawerOpen(true);
    }
    console.log(isMobile);
  }, [isMobile]);
  return (
    <DrawerRoot
      open={drawerOpen}
      placement={"start"}
      trapFocus={false}
      preventScroll={false}
      modal={isMobile}
      onPointerDownOutside={() => {
        if (isMobile && drawerOpen) {
          setDrawerOpen(false);
        }
      }}
    >
      <div
        className="p-4 fixed md:ml-[20rem] h-full w-full md:w-[80vw] space-y-2 overflow-y-scroll"
        style={{
          // style the scroll to a thin line
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1)",
          // padding
          scrollMarginBottom: "1rem",
        }}
      >
        <Button
          className="hover:cursor-pointer md:hidden absolute top-4 right-4"
          onClick={() => {
            setDrawerOpen(!drawerOpen);
          }}
        >
          <Icon>
            <FaBars />
          </Icon>
        </Button>

        {props.children}
      </div>

      <DrawerContent className="bg-white shadow-none border-r-[1px] min-h-[100vh]">
        <DrawerHeader>
          <Image
            src="/images/pipelineaer_logo.png"
            alt="Example image"
            fit="contain"
            width={200}
          />
        </DrawerHeader>
        <DrawerBody>
          <CollapsibleList items={collapsibleItems} />
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

ClientSidebar.displayName = "ClientSidebar";

export default ClientSidebar;
