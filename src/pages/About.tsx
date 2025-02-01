import { Typography, Row, Col, Card, Image } from "antd";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{ padding: "24px" }}>
      {/* Page Header */}
      <Row justify="center" style={{ marginBottom: "24px" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <Title level={2}>About Our Stationery Shop</Title>
          <Paragraph>
            Welcome to <strong>Creative Pens & Papers</strong>, your one-stop
            destination for all things stationery!
          </Paragraph>
        </Col>
      </Row>

      {/* Mission Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} md={12}>
          <Image
            src="https://picsum.photos/600/400" // Replace with your shop image
            alt="Our Shop"
            style={{ borderRadius: "8px" }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Card title="Our Mission" bordered={false}>
            <Paragraph>
              At <strong>Creative Pens & Papers</strong>, our mission is to
              inspire creativity and productivity by providing high-quality
              stationery products that cater to students, professionals, and
              artists alike. We believe that the right tools can make all the
              difference in bringing ideas to life.
            </Paragraph>
            <Paragraph>
              Whether you're looking for elegant notebooks, vibrant markers, or
              eco-friendly pens, we've got you covered. Our carefully curated
              collection is designed to meet your every need.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Values Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} md={12}>
          <Card title="Our Values" bordered={false}>
            <Paragraph>
              <strong>Quality:</strong> We source our products from trusted
              brands to ensure durability and functionality.
            </Paragraph>
            <Paragraph>
              <strong>Sustainability:</strong> We are committed to offering
              eco-friendly options to reduce our environmental footprint.
            </Paragraph>
            <Paragraph>
              <strong>Creativity:</strong> We believe in the power of stationery
              to spark imagination and innovation.
            </Paragraph>
            <Paragraph>
              <strong>Customer Satisfaction:</strong> Your happiness is our
              priority. We strive to provide exceptional service and support.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Image
            src="https://picsum.photos/600/400" // Replace with your shop image
            alt="Our Values"
            style={{ borderRadius: "8px" }}
          />
        </Col>
      </Row>

      {/* Why Choose Us Section */}
      <Row justify="center" style={{ marginBottom: "24px" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <Title level={3}>Why Choose Us?</Title>
          <Paragraph>
            We stand out because of our dedication to quality, sustainability,
            and customer satisfaction. Our team is passionate about stationery
            and is always here to help you find the perfect tools for your
            needs.
          </Paragraph>
        </Col>
      </Row>

      {/* Team Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <Title level={3}>Meet Our Team</Title>
          <Paragraph>
            Our team is made up of stationery enthusiasts who are always excited
            to help you discover new products and ideas.
          </Paragraph>
        </Col>
        <Col xs={24} md={8}>
          <Card
            cover={
              <Image
                src="https://picsum.photos/600/400" // Replace with team member image
                alt="Team Member"
              />
            }
          >
            <Card.Meta title="John Doe" description="Founder & CEO" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            cover={
              <Image
                src="https://picsum.photos/600/400" // Replace with team member image
                alt="Team Member"
              />
            }
          >
            <Card.Meta title="Jane Smith" description="Product Curator" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            cover={
              <Image
                src="https://picsum.photos/600/400" // Replace with team member image
                alt="Team Member"
              />
            }
          >
            <Card.Meta title="Emily Brown" description="Customer Support" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;
