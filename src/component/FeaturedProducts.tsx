import { Button, Row, Col, Card } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";

// Sample data (Replace with real product data)
const featuredProducts = [
  {
    id: 1,
    name: "Product 1",
    image: "https://picsum.photos/200/300",
    price: "$10",
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://picsum.photos/200/300",
    price: "$20",
  },
  {
    id: 3,
    name: "Product 3",
    image: "https://picsum.photos/200/300",
    price: "$30",
  },
  {
    id: 4,
    name: "Product 4",
    image: "https://picsum.photos/200/300",
    price: "$40",
  },
  {
    id: 5,
    name: "Product 5",
    image: "https://picsum.photos/200/300",
    price: "$50",
  },
  {
    id: 6,
    name: "Product 6",
    image: "https://picsum.photos/200/300",
    price: "$60",
  },
];

const FeaturedProducts = () => {
  return (
    <div style={{ padding: "40px 40px", textAlign: "center" }}>
      {/* <h2>Featured Products</h2> */}
      <Title level={2}>Featured Products</Title>
      <Row gutter={16} justify="center">
        {featuredProducts.slice(0, 4).map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.image} />}
            >
              <Card.Meta title={product.name} description={product.price} />
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{ marginTop: "20px" }}>
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
