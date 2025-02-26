import { Table, TableColumnsType, Tag, Modal, Grid, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "../../redux/features/order/orderApi";
import { Button } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import Title from "antd/es/typography/Title";
import { useAppSelector } from "../../redux/hook";
const { useBreakpoint } = Grid;

export type TTableData = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type TOrderItem = {
  _id: string;
  user: string;
  createdAt: string;
  totalPrice: number;
  status: string[];
};

const Order = () => {
  const screens = useBreakpoint();
  const getButtonSize = () => {
    if (screens.xs) return "small";
    if (screens.sm || screens.md) return "middle";
    return "large";
  };

  const [open, setOpen] = useState(false);

  const { user } = useAppSelector((state) => state.user);
  const { data: ordersData } = useGetAllOrdersQuery(undefined);
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  const [deleteOrder, { isLoading }] = useDeleteOrderMutation();

  const isAdmin = user?.role === "admin";
  // Admin Dropdown Actions
  const getAdminActions = (orderId: string, status: string) => [
    {
      key: "Delivered",
      label: "Delivered",
      onClick: () => handleMarkAsDelivered(orderId),
      disabled: status === "Delivered",
    },
    {
      key: "Cancel",
      label: "Cancel",
      onClick: () => handleCancelOrder(orderId),
    },
  ];

  const ordersTableData = ordersData?.data.map((item: TOrderItem) => ({
    key: item._id,
    orderId: item._id,
    date: item.createdAt,
    totalAmount: item.totalPrice,
    status: item.status[0],
  }));

  const handleMarkAsDelivered = async (orderId: string) => {
    try {
      await updateOrder({ orderId, status: "Delivered" }).unwrap();
      toast.success("Order marked as Delivered!");
    } catch {
      toast.error("Failed to update order status.");
    }
  };

  const handleCancelOrder = async (orderId: string) => {
   
    if (orderId) {
      try {
        await deleteOrder(orderId);
        toast.success("Order cancelled successfully!");
      } catch {
        toast.error("Failed to cancel the order.");
      } finally {
        setOpen(false);
      }
    }
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "_id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "geekblue";
        if (status === "Pending") color = "orange";
        if (status === "Completed") color = "green";
        if (status === "Cancelled") color = "volcano";

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <>
          {isAdmin ? (
            <Dropdown
              menu={{ items: getAdminActions(item.orderId, item.status) }}
            >
              <Button type="default" loading={isUpdating}>
                Change Status <DownOutlined />
              </Button>
            </Dropdown>
          ) : (
            <>
              <Button
                type="default"
                onClick={() => setOpen(true)}
                size={getButtonSize()}
              >
                Cancel Order
              </Button>
              <Modal
                title="Confirm"
                open={open}
                onOk={() => handleCancelOrder(item.orderId)}
                onCancel={() => setOpen(false)}
                okText="OK"
                cancelText="No, Keep Order"
                confirmLoading={isLoading}
              >
                <p>Are you sure you want to cancel this order?</p>
              </Modal>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <Title level={2}>Order History</Title>
      </div>
      <Table
        columns={columns}
        dataSource={ordersTableData}
        scroll={{ x: true }}
      />
    </>
  );
};

export default Order;
