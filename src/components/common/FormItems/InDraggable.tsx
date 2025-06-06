"use client";
import { Col, Form, Modal } from "antd";
import { NamePath } from "antd/es/form/interface";
import Dragger from "antd/es/upload/Dragger";
import { useEffect, useState } from "react";
import { InputCommonProps } from "../../../../types/commonTypes";
import { UploadFile } from "antd/lib";
import getUrl from "@/utils/getUrl";

const { Item } = Form;

interface Props<T> extends InputCommonProps<T> {
  maxCount?: number;
  accept?: string;
  label: string;
  imgStyle?: object;
  defaultValue?: any;
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function InDraggable<T>({
  name,
  bPoint,
  label,
  placeholder,
  rules,
  size,
  readOnly,
  disabled,
  maxCount = 1,
  accept,
  imgStyle,
  defaultValue,
  form,
}: Props<T>) {
  const [fileList, setFileList] = useState<any[]>([]); // State to manage the file list
  const [previewVisible, setPreviewVisible] = useState(false); // Modal visibility state
  const [previewImage, setPreviewImage] = useState(""); // Image URL for the modal
  const [previewTitle, setPreviewTitle] = useState(""); // Title for the modal

  // Handle file changes
  const handleChange = async (info: any) => {
    let newFileList = [...info.fileList];

    // Restrict maxCount of files
    if (maxCount && newFileList.length > maxCount) {
      newFileList = newFileList.slice(-maxCount);
    }

    // Loop through the file list and set preview for files without a preview or URL
    newFileList = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        return file;
      })
    );

    setFileList(newFileList);

    // Set preview for the first image automatically (if desired)
    if (newFileList.length > 0) {
      const firstFile = newFileList[0];
      setPreviewImage(firstFile.url || firstFile.preview);
      setPreviewTitle(
        firstFile.name ||
          firstFile.url?.substring(firstFile.url.lastIndexOf("/") + 1)
      );
    }
  };

  // Handle image preview
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  // Helper to convert file to base64
  const getBase64 = (file: Blob) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    if (defaultValue?.length) {
      const imgList: UploadFile[] = defaultValue.map(
        (item: any, index: any) => ({
          uid: index + "_id",
          name: item?.filename,
          status: "done",
          url: getUrl({ path: item.path }),
        })
      );

      (async () => {
        if (!imgList[0].url && !imgList[0].preview) {
          imgList[0].preview = await getBase64(imgList[0].originFileObj!);
        }
        setPreviewImage(imgList[0].url! || imgList[0].preview!);
      })();

      form?.setFieldValue(name, imgList);
      setFileList(imgList);
    }
  }, [defaultValue]);

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
        rules={rules}
        name={name as NamePath}
        valuePropName="fileList"
        className="!bg-white"
        getValueFromEvent={normFile}
      >
        <Dragger
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          onPreview={handlePreview} // Add preview handler here
          maxCount={maxCount}
          accept={accept}
          className="!bg-white"
          disabled={readOnly || disabled}
          beforeUpload={() => false} // Prevent automatic upload
        >
          {fileList.length === 0 ? (
            <p className="ant-upload-drag-icon flex flex-col gap-2 justify-center items-center ">
              <svg
                width="70"
                height="60"
                viewBox="0 0 70 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.6364 14.7458L36.7287 14.7733L36.7327 14.7688C37.1703 14.8481 37.6045 14.586 37.7331 14.1519C38.9047 10.2152 42.5958 7.46504 46.7082 7.46504C47.1951 7.46504 47.59 7.07016 47.59 6.5833C47.59 6.09643 47.1951 5.70156 46.7082 5.70156C41.6541 5.70156 37.4069 9.06665 36.0432 13.6493C35.904 14.1162 36.1699 14.6067 36.6364 14.7458Z"
                  fill="#2196F3"
                  stroke="#FAFAFA"
                  stroke-width="0.3"
                />
                <path
                  d="M56.9522 42.4384H52.5618C52.1578 42.4384 51.8301 42.1107 51.8301 41.7067C51.8301 41.3027 52.1578 40.9749 52.5618 40.9749H56.9522C63.004 40.9749 67.9281 36.0509 67.9281 29.999C67.9281 23.9471 63.004 19.023 56.9522 19.023H56.8466C56.6344 19.023 56.4326 18.9311 56.2936 18.7706C56.1546 18.6101 56.0918 18.3974 56.1222 18.1873C56.1875 17.7315 56.2204 17.2737 56.2204 16.8279C56.2204 11.5829 51.9528 7.31531 46.7079 7.31531C44.6674 7.31531 42.7215 7.95296 41.0803 9.15978C40.7196 9.42478 40.2074 9.30718 39.9989 8.91047C35.3509 0.0596993 23.2107 -1.12887 16.9166 6.57053C14.2652 9.81417 13.2234 14.0336 14.0582 18.146C14.1502 18.6002 13.8026 19.0236 13.3411 19.0236H13.0479C6.996 19.0236 2.07193 23.9477 2.07193 29.9996C2.07193 36.0514 6.996 40.9755 13.0479 40.9755H17.4382C17.8422 40.9755 18.1699 41.3032 18.1699 41.7072C18.1699 42.1113 17.8422 42.439 17.4382 42.439H13.0479C6.1889 42.439 0.608398 36.8585 0.608398 29.9995C0.608398 23.3329 5.87995 17.8742 12.4735 17.5731C11.8541 13.3066 13.0385 9.00295 15.7835 5.64437C22.5222 -2.5996 35.4364 -1.67556 40.8955 7.51707C42.6371 6.42522 44.6299 5.85244 46.7076 5.85244C53.0622 5.85244 58.0976 11.261 57.657 17.58C64.1897 17.9463 69.3913 23.3763 69.3913 29.999C69.3913 36.8585 63.8108 42.4384 56.9518 42.4384L56.9522 42.4384Z"
                  fill="#2196F3"
                />
                <path
                  d="M16.4584 41.2935C16.4584 51.4634 24.7321 59.737 34.9019 59.737C45.0718 59.737 53.3454 51.4633 53.3454 41.2935C53.3454 31.1235 45.0718 22.85 34.9019 22.85C24.7319 22.85 16.4584 31.1237 16.4584 41.2935ZM18.2222 41.2935C18.2222 32.0966 25.7048 24.6138 34.9019 24.6138C44.0988 24.6138 51.5816 32.0964 51.5816 41.2935C51.5816 50.4904 44.0988 57.9732 34.9019 57.9732C25.705 57.9732 18.2222 50.4905 18.2222 41.2935Z"
                  fill="#2196F3"
                  stroke="#FAFAFA"
                  stroke-width="0.3"
                />
                <path
                  d="M34.5512 48.6577C34.5512 49.0363 34.8583 49.3434 35.2369 49.3434C35.6154 49.3434 35.9226 49.0367 35.9226 48.6577V34.7291C35.9226 34.3504 35.6155 34.0434 35.2369 34.0434C34.8582 34.0434 34.5512 34.3504 34.5512 34.7291V48.6577Z"
                  fill="#2196F3"
                  stroke="#0E3F66"
                  stroke-width="0.3"
                />
                <path
                  d="M35.2365 35.7001L31.4358 39.5008L35.2365 35.7001ZM35.2365 35.7001L39.0373 39.5009C39.171 39.6346 39.347 39.7017 39.5221 39.7017L35.2365 35.7001ZM30.466 39.5009C30.7338 39.7687 31.1681 39.7689 31.4357 39.5009L39.5222 39.7017C39.697 39.7017 39.8731 39.6352 40.0071 39.5009C40.2749 39.233 40.2749 38.799 40.007 38.5311L35.7214 34.2455C35.4536 33.9777 35.0192 33.9775 34.7516 34.2455C34.7516 34.2455 34.7515 34.2456 34.7515 34.2456L30.466 38.5311C30.1981 38.799 30.1981 39.233 30.466 39.5009Z"
                  fill="#2196F3"
                  stroke="#0E3F66"
                  stroke-width="0.3"
                />
              </svg>

              <p>Drag & drop files or Browse</p>
            </p>
          ) : (
            <p className="ant-upload-drag-icon flex justify-center items-center">
              <img
                alt="example"
                style={{ width: "100%", ...(imgStyle || {}) }}
                src={previewImage}
              />
            </p>
          )}
          {label ? (
            <div className="flex justify-center items-center">
              <p className="border p-2 bg-blue-500 text-white rounded-lg">
                {label}
              </p>
            </div>
          ) : (
            ""
          )}
          <small className="ant-upload-hint">
            Supported formats: JPEG, PNG, JPG
          </small>
        </Dragger>
      </Form.Item>

      {/* Image preview modal */}
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Col>
  );
}
