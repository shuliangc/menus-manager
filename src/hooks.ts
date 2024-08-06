import type { IFbiNavItem } from "./type";
import { useState } from "react";
import { v4 } from "uuid";

export const useMenusList = (initialMenus: IFbiNavItem[]) => {
  const [menus, setMenus] = useState<IFbiNavItem[]>(initialMenus || []);

  const append = (menu: IFbiNavItem) => setMenus((pre) => [...pre, menu]);

  const inertAfter = (menu: IFbiNavItem, target: IFbiNavItem) => {};

  return {
    menus,
    append
  };
};
