import { Layout, Row, Col, Typography, Divider } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text } = Typography;

const SSFooter = () => {
  return (
    <Footer
      style={{
        backgroundColor: "#001529",
        color: "#fff",
        padding: "40px 20px",
      }}
    >
      <Row gutter={[32, 32]} justify="center">
        {/* About Section */}
        <Col xs={24} sm={12} md={8}>
          <Title level={4} style={{ color: "#fff" }}>
            About Us
          </Title>
          <Text style={{ color: "#ccc" }}>
            We provide high-quality stationery products for all your needs, from
            office supplies to creative tools.
          </Text>
        </Col>

        {/* Quick Links */}
        <Col xs={24} sm={12} md={8}>
          <Title level={4} style={{ color: "#fff" }}>
            Quick Links
          </Title>
          <ul style={{ listStyle: "none", padding: 0, color: "#ccc" }}>
            <li>
              <a href="/about" style={{ color: "#ccc" }}>
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" style={{ color: "#ccc" }}>
                Contact Us
              </a>
            </li>
            <li>
              <a href="/privacy" style={{ color: "#ccc" }}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/faq" style={{ color: "#ccc" }}>
                FAQs
              </a>
            </li>
          </ul>
        </Col>

        {/* Follow Us */}
        <Col xs={24} sm={12} md={8}>
          <Title level={4} style={{ color: "#fff" }}>
            Follow Us
          </Title>
          <div>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlined
                style={{ fontSize: "24px", marginRight: "15px", color: "#fff" }}
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterOutlined
                style={{ fontSize: "24px", marginRight: "15px", color: "#fff" }}
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined style={{ fontSize: "24px", color: "#fff" }} />
            </a>
          </div>
        </Col>
      </Row>

      <Divider style={{ backgroundColor: "#444" }} />

      {/* Footer Bottom */}
      <Row justify="center">
        <Col>
          <Text style={{ color: "#ccc" }}>
            © {new Date().getFullYear()} Your Stationery Shop. All Rights
            Reserved.
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default SSFooter;
