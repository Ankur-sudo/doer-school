"use client";
import {
  Col,
  Form,
  GetProp,
  Modal,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { InputCommonProps } from "../../../../types/commonTypes";
import { NamePath } from "antd/es/form/interface";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useState } from "react";

const { Item } = Form;

interface Props<T> extends InputCommonProps<T> {
  maxCount?: number; // Prop to determine if multiple files are allowed
  accept?: string; // Prop to specify accepted file types
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function InImageWithCrop<T>({
  name,
  bPoint,
  label,
  placeholder,
  rules,
  size,
  readOnly,
  disabled,
  maxCount = 1, // Default is single file upload
  accept, // Optional file type acceptance
}: Props<T>) {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    if (!file.url && file.originFileObj) {
      file.url = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    setPreviewImage(file.url || "");
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
    setPreviewVisible(true);
  };

  const handleCancel = () => setPreviewVisible(false);

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
      <Form.Item
        label={label}
        rules={rules}
        name={name as NamePath}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <ImgCrop rotationSlider>
          <Upload
            listType="picture-circle"
            maxCount={maxCount}
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            accept={accept} // Accepts specific file types (e.g., "image/*, .pdf")
            disabled={readOnly || disabled}
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </ImgCrop>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Form.Item>
    </Col>
  );
}
