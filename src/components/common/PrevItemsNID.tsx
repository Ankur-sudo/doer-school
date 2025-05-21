"use client";
import { Col, Form, Upload, Modal } from "antd";
import { NamePath } from "antd/es/form/interface";
import { InboxOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Dragger from "antd/es/upload/Dragger";

const { Item } = Form;

interface Props {
    label: string;
    image: any[];
    bPoint?: BreakPoints;
}

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

export default function PrevItemsNID({ label, image, bPoint }: Props) {
    const [fileList, setFileList] = useState<any>(); // State to manage the file list
    const [previewImage, setPreviewImage] = useState(""); // Image URL for the modal
    const [previewTitle, setPreviewTitle] = useState(""); // Title for the modal

    // Handle file changes
    const handleChange = async (info: any) => {
        let newFileList = [...info];

        // Restrict maxCount of files
        if (1 && newFileList.length > 1) {
            newFileList = newFileList.slice(-1);
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

        setFileList(newFileList[0]);

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

    // Helper to convert file to base64
    const getBase64 = (file: Blob) =>
        new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    useEffect(() => {
        handleChange(image);
    }, [image]);

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
            <p className='ant-upload-drag-icon flex justify-center items-center w-full'>
                <img
                    alt='example'
                    style={{ width: "100%" }}
                    src={previewImage}
                />
            </p>
        </Col>
    );
}
