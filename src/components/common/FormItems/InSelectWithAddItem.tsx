import { useEffect, useState } from "react";
import { Button, Col, Form, Input, message, Modal, Select } from "antd";
import { InputCommonProps } from "../../../../types/commonTypes";
import { NamePath } from "antd/es/form/interface"; // NamePath type import
import Defaults from "../../../../constant/Defaults";

const { Item } = Form;
const { Option } = Select;

interface Props<T> extends InputCommonProps<T> {
  name: NamePath; // Explicitly define as NamePath
  defaultValue?: string | number;
  values: { title: string; value: string }[];
  isAddButton?: boolean;
  addButtonText?: string;
}

export default function InSelectWithAddItem<T>({
  name,
  bPoint,
  label,
  placeholder,
  rules,
  defaultValue,
  values: initialValues,
  size,
  readOnly,
  disabled,
  isAddButton: addButton,
  addButtonText,
  form,
}: Props<T>) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [values, setValues] = useState(initialValues); // Local state for dynamic options

  // Update values whenever initialValues changes (to handle async data)
  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues]);

  const handleAddButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const addNewItem = () => {
    if (newTitle) {
      // Add new item to the local values state

      if (
        values.some(
          (item) =>
            item?.value.toLocaleLowerCase() === newTitle.toLocaleLowerCase()
        )
      ) {
        message.error("Relationship already exists");
        return;
      }

      const newItem = { title: newTitle, value: newTitle };
      setValues((prevValues) => [...prevValues, newItem]);

      // Use setFieldValue to update the specific field's value
      form?.setFieldValue(name, newTitle); // Single field update

      // Clear the input and close the modal
      setNewTitle("");
      setIsModalVisible(false);
    } else {
      message.error("Please enter a relationship");
    }
  };

  const handleChange = (value: string) => {
    form?.setFieldValue(name, value);
    form?.validateFields([name]); // Trigger validation for this field
  };

  return (
    <>
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
        <Item<T> name={name} label={label} rules={rules}>
          <Select
            size={size || Defaults.inputFields}
            defaultValue={defaultValue as string}
            placeholder={placeholder}
            disabled={disabled || readOnly}
            // value={form?.getFieldValue(name)}
            onChange={handleChange}
            dropdownRender={(menu) => (
              <div>
                {menu}
                {addButton && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "8px",
                      borderTop: "1px solid #f0f0f0",
                      marginTop: "10px",
                    }}
                  >
                    <Button type="link" onClick={handleAddButtonClick}>
                      {addButtonText || "Add New Item"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          >
            {values?.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Item>
      </Col>
      {/* Modal Component */}
      {addButton && (
        <Modal
          title="Add New Item"
          open={isModalVisible}
          onOk={addNewItem}
          onCancel={handleModalClose}
          className="!z-[9999]"
          footer={[
            <Button key="cancel" onClick={handleModalClose}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={addNewItem}>
              Submit
            </Button>,
          ]}
        >
          <Input
            placeholder="Enter value"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </Modal>
      )}
    </>
  );
}
