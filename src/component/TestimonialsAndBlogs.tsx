import { Row, Col, Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

// Sample data (Replace with real data)
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    feedback:
      "Amazing products! The quality is top-notch and delivery was fast.",
  },
  {
    id: 2,
    name: "Jane Smith",
    feedback: "Great service and a wide range of products to choose from.",
  },
  {
    id: 3,
    name: "Sam Wilson",
    feedback:
      "Highly recommend! Excellent customer support and affordable prices.",
  },
];

const blogs = [
  {
    id: 1,
    title: "Top 5 Stationery Products You Must Have",
    description:
      "Discover the essential stationery items for your workspace or study area.",
    image: "https://picsum.photos/300/200",
  },
  {
    id: 2,
    title: "How to Organize Your Desk Like a Pro",
    description:
      "Tips and tricks for keeping your workspace clean and productive.",
    image: "https://picsum.photos/300/200",
  },
  {
    id: 3,
    title: "The Benefits of Using Quality Notebooks",
    description:
      "Explore why investing in high-quality notebooks can make a difference.",
    image: "https://picsum.photos/300/200",
  },
];

const TestimonialsAndBlogs = () => {
  return (
    <div style={{ padding: "40px 40px", textAlign: "center" }}>
      {/* Testimonials Section */}
      <div style={{ marginBottom: "40px" }}>
        <Title level={2}>What Our Customers Say</Title>
        <Row gutter={[16, 16]} justify="center">
          {testimonials.map((testimonial) => (
            <Col key={testimonial.id} xs={24} sm={12} md={8}>
              <Card bordered hoverable>
                <Paragraph>
                  <i>"{testimonial.feedback}"</i>
                </Paragraph>
                <Title level={5}>- {testimonial.name}</Title>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Blogs Section */}
      <div>
        <Title level={2}>Our Latest Blogs</Title>
        <Row gutter={[16, 16]} justify="center">
          {blogs.map((blog) => (
            <Col key={blog.id} xs={24} sm={12} md={8}>
              <Card hoverable cover={<img alt={blog.title} src={blog.image} />}>
                <Card.Meta title={blog.title} description={blog.description} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default TestimonialsAndBlogs;
