import { Button, Card, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../component/form/PHForm";
import PHInput from "../../component/form/PHInput";
import PHSelect from "../../component/form/PHSelect";
import { useAddProductMutation } from "../../redux/features/products/products.api";
import { uploadToCloudinary } from "../../utils/uploadCloudinary";

const categoryOptions = [
  { value: "Writing", label: "Writing" },
  { value: "Office Supplies", label: "Office Supplies" },
  { value: "Art Supplies", label: "Art Supplies" },
  { value: "Educational", label: "Educational" },
  { value: "Technology", label: "Technology" },
];

const CreateStudent = () => {
  const [addProduct] = useAddProductMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let imageUrl = "";
    if (data.image) {
      imageUrl = await uploadToCloudinary(data.image);
    }

    const productData = {
      ...data,
      image: imageUrl,
    };
    await addProduct(productData).unwrap();
  };
  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={16}>
        <Card title="Product Information" bordered={false}>
          <PHForm onSubmit={onSubmit}>
            <Row gutter={[24, 24]}>
              {/* Product Basic Info */}
              <Col xs={24} sm={12} md={8}>
                <PHInput
                  type="text"
                  name="name"
                  label="Product Name"
                  // placeholder="Enter product name"
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <PHInput
                  type="text"
                  name="brand"
                  label="Brand Name"
                  // placeholder="Enter brand name"
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <PHInput
                  type="text"
                  name="model"
                  label="Model"
                  // placeholder="Enter model"
                />
              </Col>

              {/* Product Pricing & Category */}
              <Col xs={24} sm={12} md={8}>
                <PHInput
                  type="number"
                  name="price"
                  label="Price"
                  // placeholder="Enter price"
                  // prefix="$"
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <PHSelect
                  options={categoryOptions}
                  name="category"
                  label="Category"
                  // placeholder="Select category"
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <PHInput
                  type="number"
                  name="quantity"
                  label="Quantity"
                  // placeholder="Enter quantity"
                />
              </Col>

              {/* File Upload */}
              <Col xs={24}>
                <Controller
                  name="image"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Form.Item label="Image">
                      <Input
                        type="file"
                        value={value?.fileNme}
                        {...field}
                        onChange={(e) => onChange(e.target.files?.[0])}
                      />
                    </Form.Item>
                  )}
                ></Controller>
              </Col>
            </Row>

            {/* Product Description */}
            <Divider orientation="left" style={{ marginTop: 32 }}>
              Product Description
            </Divider>
            <Row gutter={[24, 24]}>
              <Col xs={24}>
                <Controller
                  name="description"
                  rules={{
                    required: "Description is required",
                    minLength: {
                      value: 50,
                      message: "Minimum 50 characters required",
                    },
                    maxLength: {
                      value: 2000,
                      message: "Maximum 2000 characters allowed",
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <Form.Item
                      validateStatus={error ? "error" : ""}
                      help={error?.message}
                    >
                      <Input.TextArea
                        {...field}
                        rows={6}
                        showCount
                        maxLength={2000}
                        placeholder="Enter detailed product description including features, specifications, and benefits..."
                        style={{ resize: "vertical", minHeight: "150px" }}
                        className="custom-textarea"
                      />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>

            {/* Submit Button */}
            <Row justify="center" style={{ marginTop: 32 }}>
              <Col>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  style={{ background: "#001529" }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </PHForm>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateStudent;
