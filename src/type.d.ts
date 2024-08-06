export interface IFbiNavItem {
  /** 唯一标识 */
  key: string;
  /** 菜单名称 */
  label: string | { i18nKey?: string; default: string };
  /** 权限点 */
  authKey?: string;
  /** 跳转链接 */
  url?: string;
  /** 是否打开新窗口 */
  open?: boolean;
  /** 图标 */
  icon?: string | { active: string; default: string };
  /** 查询模式是否展示 */
  switchSearch?: boolean;
  /** 是否启用 */
  enable?: boolean;
  children?: IFbiNavItem[];
}
