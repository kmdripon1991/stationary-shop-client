import { Button, Card, Col, Row, Typography, Image, Divider } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { addToCart } from "../redux/features/cartSlice";
import { useGetSingleProductQuery } from "../redux/features/products/products.api";

const { Title, Text } = Typography;

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const productDummy = {
    name: "Wireless Headphones",
    description:
      "High-quality wireless headphones with noise-cancellation feature and long battery life.",
    price: 129.99,
    stock: 25,
  };

  const { data: productData } = useGetSingleProductQuery(productId);

  console.log(productData?.data);

  const cartData = {
    _id: productData?.data?._id,
    name: productData?.data?.name,
    price: productData?.data?.price,
    model: productData?.data.model,
    quantity: 1,
    imageUrl: productData?.data?.image,
  };
  console.log("product details cart data", cartData);

  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart(cartData));
    navigate("/carts");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={16} style={{ display: "flex", alignItems: "stretch" }}>
        <Col
          xs={24}
          sm={12}
          md={8}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {/* Product Image */}
          <Image
            width="100%"
            alt={productDummy.name}
            src="https://picsum.photos/300/300"
            style={{
              borderRadius: "8px",
              objectFit: "cover",
              height: "100%",
            }}
          />
        </Col>
        <Col
          xs={24}
          sm={12}
          md={16}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Card
            title={productDummy.name}
            bordered={false}
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <Title level={4} style={{ fontSize: "18px" }}>
              Description
            </Title>
            <Text style={{ fontSize: "14px" }}>{productDummy.description}</Text>
            <Divider />
            <Title level={4} style={{ fontSize: "18px" }}>
              Price
            </Title>
            <Text strong style={{ fontSize: "16px" }}>
              ${productDummy.price}
            </Text>
            <Divider />
            <Title level={4} style={{ fontSize: "18px" }}>
              Stock
            </Title>
            <Text style={{ fontSize: "14px" }}>
              {productDummy.stock} items available
            </Text>
            <Divider />
            {/* Add to Cart Button */}

            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              style={{ marginTop: "20px" }}
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
