import type { ProColumns } from "@ant-design/pro-components";
import { useState } from "react";
import {
  EditableProTable,
  PageContainer,
  ProCard,
  ProLayout,
} from "@ant-design/pro-components";
import { Typography, Input } from "antd";
import I18nInput from "./components/I18nInput";
import { useMenusList } from "./hooks";
import { IFbiNavItem } from "./type";
import { v4 } from "uuid";
import { Form } from "antd";

const columns: ProColumns<IFbiNavItem>[] = [
  {
    title: "唯一标识",
    dataIndex: "key",
    width: 360,
    editable: false,
    formItemProps: {
      required: true,
    },
  },
  {
    title: "菜单名称",
    dataIndex: "label",
    width: 140,
    formItemProps: {
      required: true,
    },
    render: (value) => {
      if (typeof value === "string") return value;
      return value?.default;
    },
    renderFormItem: () => {
      return <I18nInput />;
    },
  },
  {
    title: "权限点",
    dataIndex: "authKey",
    width: 140,
  },
  {
    title: "默认图标",
    dataIndex: "icon",
    width: 150,
  },
  {
    title: "激活图标",
    dataIndex: "icon",
    width: 150,
  },
  {
    title: "跳转地址",
    dataIndex: "url",
    width: 200,
  },
  {
    title: "是否打开新页面",
    dataIndex: "open",
    valueType: "switch",
    width: 140,
    initialValue: false,
  },
  {
    title: "启用",
    dataIndex: "enable",
    valueType: "switch",
    width: 100,
    initialValue: true,
  },
  {
    title: "操作",
    valueType: "option",
    width: 200,
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.key);
        }}
      >
        编辑
      </a>,
      <a key="delete" onClick={() => {}}>
        删除
      </a>,
    ],
  },
];

export default function App() {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  // const { menus, append } = useMenusList([]);
  const [menus, setMenus] = useState<readonly IFbiNavItem[]>([]);
  const [form] = Form.useForm<{
    label: string | { i18nKey?: string; default: string };
  }>();

  const labelValue = Form.useWatch("label", form);
  // const mapMenuList = (list: IFbiNavItem[]) => {
  //   return list.map((item) => {
  //     if (item.children) {
  //       item.children = mapMenuList(item.children);
  //     }
  //     return {
  //       path: item.url,
  //       icon: item.icon,
  //       name: item.label,
  //       key: item.key,
  //       children: item.children,
  //     };
  //   });
  // };

  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        siderWidth={216}
        bgLayoutImgList={[
          {
            src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
            left: 85,
            bottom: 100,
            height: "303px",
          },
          {
            src: "https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png",
            bottom: -68,
            right: -45,
            height: "303px",
          },
          {
            src: "https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png",
            bottom: 0,
            left: 0,
            width: "331px",
          },
        ]}
        location={{}}
        actionsRender={() => {
          return [];
        }}
      >
        <PageContainer>
          <ProCard>
            <EditableProTable
              rowKey={"key"}
              headerTitle={"菜单配置"}
              columns={columns}
              value={menus}
              onChange={setMenus}
              recordCreatorProps={{
                newRecordType: "dataSource",
                record: () => ({ key: v4() }),
              }}
              editable={{
                type: "multiple",
                editableKeys,
                onSave: async (rowKey, data, row) => {
                  console.log(rowKey, data, row);
                },
                onChange: setEditableRowKeys,
              }}
              expandable={{
                defaultExpandAllRows: true,
              }}
            />
          </ProCard>
          <ProCard>
            <Form form={form} layout="vertical" autoComplete="off">
              <Form.Item label="菜单名称" name="label">
                <I18nInput />
                {/* <Input /> */}
              </Form.Item>
            </Form>
            <Typography>
              <pre>菜单名称：{JSON.stringify(labelValue, null, 2)}</pre>
            </Typography>
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
}
