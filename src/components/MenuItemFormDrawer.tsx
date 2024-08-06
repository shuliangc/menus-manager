import React, { useMemo, useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
} from "@otakus/design";
import * as OtakusIcons from "@otakus/icons";
import { IMenuItem } from "../type";

const { Option } = Select;

const App: React.FC<{
  record?: IMenuItem;
  onChange: (data: IMenuItem) => void;
}> = ({ record, onChange }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const title = useMemo(() => {
    return record?.id ? "修改" : "新增";
  }, [record]);

  const showDrawer = () => {
    setOpen(true);
    console.log(record);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="link" onClick={showDrawer}>
        修改
      </Button>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => {
                form.validateFields().then((values) => {
                  form.resetFields();
                  onChange(values);
                  onClose();
                });
              }}
              type="primary"
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={record?.id ? record : {}}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="菜单名称" required>
                <Input placeholder="请输入菜单名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {record?.id && (
                <Form.Item name="id" label="唯一标识" required>
                  <Input
                    style={{ width: "100%" }}
                    placeholder="请输入唯一标识"
                    disabled
                  />
                </Form.Item>
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="icon" label="图标">
                <Select placeholder="请选择图标">
                  {Object.keys(OtakusIcons).map((key) => (
                    <Option value={key}>{key}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="permission" label="权限点">
                <Input
                  style={{ width: "100%" }}
                  placeholder="请输入op系统配置的权限点"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="state" label="状态">
                <Switch
                  checkedChildren="启用"
                  unCheckedChildren="禁用"
                ></Switch>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default App;
