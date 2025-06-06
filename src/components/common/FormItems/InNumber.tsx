"use client";
import { Col, Form, Input, InputNumber } from "antd";
import { InputCommonProps } from "../../../../types/commonTypes";
import { NamePath } from "antd/es/form/interface";
import Defaults from "../../../../constant/Defaults";
const { Item } = Form;

interface Props<T> extends InputCommonProps<T> {
    min?: number;
    max?: number;
    defaultValue?: number;
    step?: number;
}

export default function InNumber<T>({
    name,
    bPoint,
    label,
    placeholder,
    rules,
    min,
    max,
    defaultValue,
    size,
    disabled,
    readOnly,
}: Props<T>) {
    return (
        <Col
            xs={bPoint?.xs || 24}
            sm={bPoint?.sm || bPoint?.xs || 12}
            md={bPoint?.md || bPoint?.xs || bPoint?.sm || 12}
            lg={bPoint?.lg || bPoint?.xs || bPoint?.sm || bPoint?.md || 6}
            xl={
                bPoint?.xl ||
                bPoint?.xs ||
                bPoint?.sm ||
                bPoint?.md ||
                bPoint?.lg ||
                6
            }
            xxl={
                bPoint?.xxl ||
                bPoint?.xs ||
                bPoint?.sm ||
                bPoint?.md ||
                bPoint?.lg ||
                6
            }
        >
            <Item<T> name={name as NamePath} label={label} rules={rules}>
                <InputNumber
                    size={size || Defaults.inputFields}
                    min={min}
                    max={max}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    style={{ width: "100%" }}
                    readOnly={readOnly}
                    disabled={disabled}
                />
            </Item>
        </Col>
    );
}
