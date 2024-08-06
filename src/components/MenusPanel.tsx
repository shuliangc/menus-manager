import type { FC } from "react";
import type { IMenuItem } from "../type";
import React from "react";
import { Menu, Button, Flex } from "@otakus/design";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@otakus/icons";
import Icon from "@otakus/icons";
import * as Icons from "@otakus/icons";
import { createFromIconfontCN } from "@otakus/icons";
import { useState } from "react";

const DemoIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_3980417_xi28tr8u0yd.js",
});

export default function MenusPanel({ menus }: { menus: IMenuItem[] }) {
  const mapItem = (list) =>
    list.map((menu) => ({
      label: menu.name,
      key: menu.id,
      icon: <Icon component={Icons[menu.icon]} />,
      ...(menu.children?.length && {
        children: mapItem(menu.children),
      }),
    }));
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => setCollapsed((collapsed) => !collapsed);

  return (
    <Flex style={{ height: "100%" }} justify="space-between" vertical>
      <Flex flex={1} style={{ overflowY: "auto" }}>
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          items={mapItem(menus)}
        ></Menu>
      </Flex>
      <Flex justify="flex-end" flex={"none"}>
        <Button type="text" size="large" onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </Flex>
    </Flex>
  );
}
