import { Layout, Menu, Card, Row, Col, Table, Statistic, Avatar } from "antd";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const UserDashboard = () => {
  // Dummy data for Recent Orders table
  const tableColumns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
  ];

  const tableData = [
    {
      key: 1,
      orderId: "ORD1234",
      date: "2023-01-10",
      status: "Delivered",
      amount: "$250",
    },
    {
      key: 2,
      orderId: "ORD1235",
      date: "2023-01-11",
      status: "Pending",
      amount: "$100",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider style={{ background: "#fff" }} width={220}>
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "18px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          User Dashboard
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          style={{ borderRight: 0 }}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
            My Orders
          </Menu.Item>
          <Menu.Item key="profile" icon={<ProfileOutlined />}>
            My Profile
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>
            Welcome, User!
          </div>
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<ProfileOutlined />}
          />
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: "80vh" }}>
            {/* Statistics Cards */}
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card>
                  <Statistic title="Total Orders" value={123} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Pending Orders" value={5} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Delivered Orders" value={118} />
                </Card>
              </Col>
            </Row>

            {/* Chart Section */}
            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
              <Col span={24}>
                <Card title="Order Trend">
                  <div
                    style={{
                      height: 200,
                      background: "#f0f2f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Chart Placeholder
                  </div>
                </Card>
              </Col>
            </Row>

            {/* Recent Orders Table */}
            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
              <Col span={24}>
                <Card title="Recent Orders">
                  <Table
                    columns={tableColumns}
                    dataSource={tableData}
                    pagination={false}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;
