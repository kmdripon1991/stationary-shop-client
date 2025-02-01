import { Table, Tag, Space } from "antd";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";

const Order = () => {
  const { data: ordersData } = useGetAllOrdersQuery(undefined);
  console.log(ordersData?.data);
  // Define the columns for the table
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      // render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "geekblue";
        if (status === "Delivered") color = "green";
        if (status === "Cancelled") color = "volcano";
        return (
          <Tag color={color} key={status}>
            {/* {status.toUpperCase()} */}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>View Details</a>
          <a>Cancel Order</a>
        </Space>
      ),
    },
  ];

  // Sample data (replace with actual data from props or API)
  const data = ordersData?.data || [
    {
      key: "1",
      orderId: "ORD123456",
      date: "2023-10-01",
      totalAmount: 99.99,
      status: "Delivered",
    },
    {
      key: "2",
      orderId: "ORD123457",
      date: "2023-10-05",
      totalAmount: 149.99,
      status: "Processing",
    },
    {
      key: "3",
      orderId: "ORD123458",
      date: "2023-10-10",
      totalAmount: 199.99,
      status: "Cancelled",
    },
  ];

  return (
    <div>
      <h2>Order History</h2>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Order;
