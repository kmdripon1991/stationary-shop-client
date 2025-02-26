import { Button, Card, Col, Row } from "antd";
import PHForm from "../component/form/PHForm";
import PHInput from "../component/form/PHInput";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSignupMutation } from "../redux/features/auth/authApi";

const { Title, Text } = Typography;

const Signup = () => {
  const navigate = useNavigate();

  const [signup] = useSignupMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      await signup(userInfo).unwrap();
      toast.success("User registered successfully");
      navigate("/login");
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            style={{
              borderRadius: "15px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Title
              level={2}
              style={{
                textAlign: "center",
                marginBottom: "24px",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Create Your Account
            </Title>
            <PHForm onSubmit={onSubmit}>
              <PHInput name="name" label="Name" type="text" />
              <PHInput name="email" label="Email" type="email" />
              <PHInput name="password" label="Password" type="password" />
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                style={{
                  marginTop: "24px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Button>
            </PHForm>
            <Row justify="center" style={{ marginTop: "16px" }}>
              <Col>
                <Text style={{ color: "#666" }}>Already have an account?</Text>
                <Link to="/login">
                  <Button
                    type="link"
                    style={{
                      padding: "0 4px",
                      color: "#667eea",
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </Button>
                </Link>
              </Col>
            </Row>
          </Card>
        </motion.div>
      </Col>
    </Row>
  );
};

export default Signup;
