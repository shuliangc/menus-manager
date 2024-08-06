import type { FC } from "react";
import type { InputProps } from "antd/lib";
import { useEffect, useState } from "react";
import { GlobalOutlined } from "@otakus/icons";
import { Form, Input, Popover } from "antd";

export default function I18nInput({
  value,
  onChange,
  ...props
}: InputProps & {
  value: InputProps["value"] | { i18nKey: string; default: string };
}) {
  const [internalValue, setInternalValue] = useState(() => {
    if (typeof value === "string")
      return {
        i18nKey: "",
        default: value,
      };
    return {
      i18nKey: value?.i18nKey,
      default: value?.default,
    };
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (internalValue.i18nKey) {
      onChange?.(internalValue);
    } else {
      onChange?.(internalValue.default);
    }
  }, [internalValue, value]);

  return (
    <Popover
      open={open}
      placement="bottomRight"
      style={{ width: "100%" }}
      content={
        <Form>
          <Form.Item label={"I18nKey"}>
            <Input
              name="i18nKey"
              placeholder="OP平台的I18nKey"
              onChange={(e) =>
                setInternalValue((pre) => ({ ...pre, i18nKey: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label={"默认名"}>
            <Input
              name="default"
              value={internalValue?.default}
              onChange={(e) =>
                setInternalValue((pre) => ({ ...pre, default: e.target.value }))
              }
            />
          </Form.Item>
        </Form>
      }
    >
      <Input
        {...props}
        value={internalValue?.default}
        addonAfter={<GlobalOutlined onClick={() => setOpen((open) => !open)} />}
        onChange={(e) =>
          setInternalValue((pre) => ({ ...pre, default: e.target.value }))
        }
      />
    </Popover>
  );
}
