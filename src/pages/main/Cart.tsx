import {
  Table,
  Button,
  Typography,
  Image,
  InputNumber,
  TableColumnsType,
  Card,
  Divider,
  Col,
  Row,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/features/cartSlice";
import { useAddOrderMutation } from "../../redux/features/order/orderApi";
import { useEffect } from "react";
import { toast } from "sonner";

const { Text, Title } = Typography;

export type TCartData = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | undefined;
  model: string;
};

const Cart = () => {
  const { items } = useAppSelector((state) => state.carts) as {
    items: TCartData[];
  };
  const dispatch = useAppDispatch();

  const handleQuantityChange = (value: number, record: TCartData) => {
    dispatch(updateQuantity({ id: record._id, quantity: value }));
  };

  const columns: TableColumnsType<TCartData> = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (text: string, item: TCartData) => {
        console.log(text, item);
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              // src={item.image}
              src="https://picsum.photos/300/300"
              alt={text}
              width={50}
            />
            <div style={{ marginLeft: 10 }}>
              <Text strong>{text}</Text>
              <br />
              <Text type="secondary">
                {item.model}
                {"abc"}
              </Text>
            </div>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <Text>${price.toFixed(2)}</Text>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number, item: TCartData) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleQuantityChange(value as number, item)}
        />
      ),
    },
    {
      title: "Remove",
      key: "remove",
      render: (item: TCartData) => (
        <Button
          onClick={() => dispatch(removeFromCart(item._id))}
          type="text"
          danger
          icon={<DeleteOutlined />}
        />
      ),
    },
  ];

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [addOrder, { isLoading, isSuccess, data, isError, error }] =
    useAddOrderMutation();

  const handleCheckout = async () => {
    const orderData = items.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    await addOrder(orderData);
  };

  const toastId = "cart";
  useEffect(() => {
    if (isLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        console.log(data.data);
        setTimeout(() => {
          window.location.href = data.data.payment.checkout_url;
        }, 1000);
      }
      console.log(data.data.payment.checkout_url);
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

  return (
    <Row gutter={16}>
      <Col span={16}>
        <Table
          columns={columns}
          dataSource={items}
          rowKey="_id"
          pagination={false}
          bordered
        />
      </Col>

      <Col span={8}>
        <Card className="w-80 shadow-md rounded-2xl p-4">
          <Title level={4}>Total</Title>
          <Row justify="space-between" style={{ marginBottom: "24px" }}>
            <Text>Total:</Text>
            <Text strong>${totalPrice.toFixed(2)}</Text>
          </Row>
          <Row justify="space-between" style={{ marginBottom: "24px" }}>
            <Text>Delivery:</Text>
            <Text strong>$00</Text>
          </Row>
          <Row justify="space-between" style={{ marginBottom: "24px" }}>
            <Text>Discount:</Text>
            <Text strong>-$00</Text>
          </Row>
          <Divider />
          <Row justify="space-between" style={{ marginBottom: "24px" }}>
            <Text strong>Subtotal</Text>
            <Text strong>${totalPrice.toFixed(2)}</Text>
          </Row>

          <Button
            block
            style={{
              backgroundColor: "#001529",
              borderColor: "#1890FF",
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>

          <Button
            block
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#001529",
              color: "#001529",
            }}
            onClick={() => dispatch(clearCart())}
          >
            Remove All
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
