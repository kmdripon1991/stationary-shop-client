import { Card, Col, Row, Skeleton, Statistic, Table, Tooltip } from "antd";
import { useGetAllOrdersQuery } from "../redux/features/order/orderApi";
import { TOrderItem } from "../pages/main/Orders";
import { useGetAllProductsQuery } from "../redux/features/products/products.api";
import { TProduct } from "./ProductCard";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// Dummy data for table
const tableColumns = [
  { title: "Order ID", dataIndex: "orderId", key: "orderId" },
  { title: "Customer", dataIndex: "customer", key: "customer" },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  { title: "Status", dataIndex: "status", key: "status" },
];

const data = [
  { month: "Jan", Pens: 400, Notebooks: 300, Markers: 200 },
  { month: "Feb", Pens: 500, Notebooks: 400, Markers: 300 },
  { month: "Mar", Pens: 700, Notebooks: 500, Markers: 400 },
  { month: "Apr", Pens: 600, Notebooks: 450, Markers: 350 },
  { month: "May", Pens: 800, Notebooks: 600, Markers: 500 },
];

const dataPie = [
  { name: "Pens", value: 400 },
  { name: "Notebooks", value: 300 },
  { name: "Markers", value: 200 },
  { name: "Erasers", value: 150 },
  { name: "Glue Sticks", value: 100 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

const Dashboard = () => {
  const { data: allProducts } = useGetAllProductsQuery(undefined);
  const { data: allOrders, isLoading } = useGetAllOrdersQuery(undefined);

  const ordersData: TOrderItem[] = allOrders?.data || [];
  const totalPrice = ordersData.reduce(
    (acc: number, item: TOrderItem) => acc + item.totalPrice,
    0
  );

  const latestOrders = [...ordersData]
    .sort(
      (item1: TOrderItem, item2: TOrderItem) =>
        new Date(item1.createdAt).getTime() -
        new Date(item2.createdAt).getTime()
    )
    .slice(0, 5);
  const formattedOrdersData = latestOrders.map((orderItem) => ({
    key: orderItem._id,
    orderId: orderItem._id,
    customer: orderItem.user,
    amount: `$${orderItem.totalPrice}`,
    status: orderItem.status,
  }));

  //Orders Today
  const today = new Date().toISOString().split("T")[0];
  const todayOrders = ordersData.filter((order) =>
    order.createdAt.startsWith(today)
  );

  const todaySales = todayOrders.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  const productsData: TProduct[] = allProducts?.data.result || [];
  

  return (
    <>
      {/* Section 1: Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            {isLoading ? (
              <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
              <Statistic title="Total Sales" value={totalPrice.toFixed(2)} />
            )}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <Statistic title="Orders Today" value={todayOrders.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <Statistic title="Sales Today" value={todaySales} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <Statistic title="Inventory Items" value={productsData.length} />
          </Card>
        </Col>
      </Row>

      {/* Section 2: Charts */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12} lg={12}>
          <Card title="Sales Trend">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Pens" fill="#8884d8" />
                <Bar dataKey="Notebooks" fill="#82ca9d" />
                <Bar dataKey="Markers" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <Card title="Orders Trend">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={dataPie}
                  cx="45%"
                  cy="45%"
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                  labelLine={false}
                  label={{ fontSize: 12 }}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Section 3: Data Table */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24}>
          <Card title="Latest Orders">
            <Table
              columns={tableColumns}
              dataSource={formattedOrdersData}
              pagination={false}
              scroll={{ x: true }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
