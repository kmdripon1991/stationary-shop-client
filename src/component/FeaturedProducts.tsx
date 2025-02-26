import { Button, Row, Col, Card } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { useSearchProductsQuery } from "../redux/features/products/products.api";
import { TProduct } from "./ProductCard";

const FeaturedProducts = () => {
  const { data: products } = useSearchProductsQuery({
    category: "Writing",
  });
  const featuredProducts = products?.data?.result;
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <Title level={2} style={{ marginBottom: "24px" }}>
        Featured Products
      </Title>
      <Row gutter={[16, 16]} justify="center">
        {featuredProducts?.slice(0, 4).map((product: TProduct) => (
          <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.image}
                  style={{
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
              }
              style={{
                width: "100%",
                borderRadius: "8px",
              }}
            >
              <Card.Meta
                title={product.name}
                description={`$${product.price}`}
                style={{ textAlign: "left" }}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{ marginTop: "24px" }}>
        <Link to="/all-products">
          <Button type="primary" size="large">
            View All
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
