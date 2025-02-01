import {
  Button,
  Card,
  Badge,
  Row,
  Col,
  Descriptions,
  Typography,
  Skeleton,
} from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import { useVerifyOrderQuery } from "../redux/features/order/orderApi";

const { Title } = Typography;

interface OrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

export default function OrderVerification() {
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  const { isLoading, data } = useVerifyOrderQuery(
    searchParams.get("order_id"),
    {
      refetchOnMountOrArgChange: true,
    }
  );
  console.log(data);

  const orderData: OrderData = data?.data?.[0];
  console.log(orderData);

  return isLoading ? (
    <Skeleton active />
  ) : (
    <div className="container mx-auto p-4">
      <Title level={2}>Order Verification</Title>
      <Row gutter={24}>
        <Col span={12}>
          <Card title="Order Details">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Order ID">
                {orderData?.order_id}
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                {orderData?.currency} {orderData?.amount?.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Badge
                  status={
                    orderData?.bank_status === "Success" ? "success" : "error"
                  }
                  text={orderData?.bank_status}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Date">
                {new Date(orderData?.date_time)?.toLocaleString()}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Payment Information">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Method">
                {orderData?.method}
              </Descriptions.Item>
              <Descriptions.Item label="Transaction ID">
                {orderData?.bank_trx_id}
              </Descriptions.Item>
              <Descriptions.Item label="Invoice No">
                {orderData?.invoice_no}
              </Descriptions.Item>
              <Descriptions.Item label="SP Code">
                {orderData?.sp_code}
              </Descriptions.Item>
              <Descriptions.Item label="SP Message">
                {orderData?.sp_message}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Row gutter={24} className="mt-6">
        <Col span={12}>
          <Card title="Customer Information">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Name">
                {orderData?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {orderData?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {orderData?.phone_no}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {orderData?.address}
              </Descriptions.Item>
              <Descriptions.Item label="City">
                {orderData?.city}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Verification Status">
            <div className="flex items-center gap-2">
              {orderData?.is_verify === 1 ? (
                <>
                  <CheckCircleOutlined
                    style={{ color: "green", fontSize: "24px" }}
                  />
                  <span>Verified</span>
                </>
              ) : (
                <>
                  <ExclamationCircleOutlined
                    style={{ color: "yellow", fontSize: "24px" }}
                  />
                  <span>Not Verified</span>
                </>
              )}
            </div>
            <div className="mt-4">
              <Link to="/my-orders">
                <Button type="primary" block>
                  View Orders
                </Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
