"use client";
import { Col, DatePicker, Form } from "antd";
import { InputCommonProps } from "../../../../types/commonTypes";
import { NamePath } from "antd/es/form/interface";
import Defaults from "../../../../constant/Defaults";
import dayjs, { Dayjs } from "dayjs";

const { Item } = Form;

interface Props<T> extends InputCommonProps<T> {
  format?: string;
  start?: Dayjs;
  end?: Dayjs;
}

export default function InDatePicker<T>({
  name,
  bPoint,
  label,
  rules,
  format,
  size,
  readOnly,
  disabled,
  start,
  end,
}: Props<T>) {
  // Function to disable dates based on `start` and `end` props
  const disabledDate = (current: Dayjs | null): boolean => {
    if (!current) return false;

    // If both `start` and `end` are provided, restrict selection to the range
    if (start && end) {
      return (
        current.isBefore(start.startOf("day")) ||
        current.isAfter(end.endOf("day"))
      );
    }

    // If only `start` is provided, disable dates before `start`
    if (start) {
      return current.isBefore(start.startOf("day"));
    }

    // If only `end` is provided, disable dates after `end`
    if (end) {
      return current.isAfter(end.endOf("day"));
    }

    // If neither `start` nor `end` is provided, allow all dates
    return false; // Allow all dates
  };

  return (
    <Col
      xs={bPoint?.xs || 24}
      sm={bPoint?.sm || bPoint?.xs || 12}
      md={bPoint?.md || bPoint?.xs || bPoint?.sm || 12}
      lg={bPoint?.lg || bPoint?.xs || bPoint?.sm || bPoint?.md || 6}
      xl={
        bPoint?.xl || bPoint?.xs || bPoint?.sm || bPoint?.md || bPoint?.lg || 6
      }
      xxl={
        bPoint?.xxl || bPoint?.xs || bPoint?.sm || bPoint?.md || bPoint?.lg || 6
      }
    >
      <Item<T> name={name as NamePath} label={label} rules={rules}>
        <DatePicker
          size={size || Defaults.inputFields}
          format={format}
          style={{ width: "100%" }}
          readOnly={readOnly}
          disabled={disabled}
          disabledDate={disabledDate}
        />
      </Item>
    </Col>
  );
}
