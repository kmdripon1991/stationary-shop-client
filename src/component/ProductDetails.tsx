import { Button, Card, Col, Row, Typography, Image, Divider } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { addToCart } from "../redux/features/cartSlice";
import { useGetSingleProductQuery } from "../redux/features/products/products.api";
import { selectCurrentUser } from "../redux/features/auth/authSlice";

const { Title, Text } = Typography;

const ProductDetails = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { productId } = useParams();

  const { data: productData } = useGetSingleProductQuery(productId);


  const cartData = {
    _id: productData?.data?._id,
    name: productData?.data?.name,
    price: productData?.data?.price,
    model: productData?.data.model,
    quantity: 1,
    imageUrl: productData?.data?.image,
  };

  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(addToCart(cartData));
      navigate("/user/carts");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]} align="stretch">
        {/* Left Side: Image */}
        <Col xs={24} sm={24} md={12} lg={10} style={{ display: "flex" }}>
          <Image
            width="100%"
            alt="product"
            src={productData?.data?.image}
            style={{
              borderRadius: "8px",
              objectFit: "cover",
              height: "100%",
              minHeight: "300px",
            }}
            preview={false}
          />
        </Col>

        {/* Right Side: Product Details Card */}
        <Col xs={24} sm={24} md={12} lg={14} style={{ display: "flex" }}>
          <Card
            title={productData?.data.name}
            bordered={false}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Title level={4} style={{ fontSize: "18px" }}>
              Description
            </Title>
            <Text style={{ fontSize: "14px" }}>
              {productData?.data.description}
            </Text>

            <Title level={4} style={{ fontSize: "18px" }}>
              Price
            </Title>
            <Text strong style={{ fontSize: "16px" }}>
              ${productData?.data.price}
            </Text>

            <Title level={4} style={{ fontSize: "18px" }}>
              Stock
            </Title>
            <Text style={{ fontSize: "14px" }}>
              {productData?.data.quantity} items available
            </Text>
            <Divider />

            {/* Add to Cart Button */}
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              style={{ marginTop: "auto" }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
