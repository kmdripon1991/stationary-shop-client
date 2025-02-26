import { Button, Card, Col, Row } from "antd";
import PHForm from "../component/form/PHForm";
import PHInput from "../component/form/PHInput";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "../redux/hook";
import { Typography } from "antd";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const defaultValues = {
    email: "user@example.com",
    password: "ripon123",
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(`Bearer ${res.data.token}`) as TUser;

      dispatch(setUser({ user: user, token: res.data.token }));
      toast.success("User logged in successfully");
      const redirectPath = location.state?.from || `/${user.role}/dashboard`;
    
      if (user.role === "admin") {
        navigate(redirectPath);
      }
      if (user.role === "user") {
        navigate(redirectPath);
      }
    } catch {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f2f5 0%, #d6e4ff 100%)",
        padding: "20px",
      }}
    >
      <Col xs={24} sm={20} md={16} lg={8} xl={6}>
        <Card
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            Login
          </Title>
          <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <PHInput name="email" label="Email:" type="email" />
            <PHInput name="password" label="Password:" type="password" />
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{ marginTop: "16px" }}
            >
              Login
            </Button>
          </PHForm>
          <Row justify="space-between" style={{ marginTop: "16px" }}>
            <Col>
              <Button type="link" style={{ padding: 0 }}>
                Forgot Password?
              </Button>
            </Col>
            <Col>
              <Link to="/signup">
                <Button type="link" style={{ padding: 0 }}>
                  Sign Up
                </Button>
              </Link>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
