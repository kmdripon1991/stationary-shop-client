import { Row, Col } from "antd";
import ProductCard, { TProduct } from "../../component/ProductCard";
import { useGetAllProductsQuery } from "../../redux/features/products/products.api";

const Shop = () => {
  const { data: productsData } = useGetAllProductsQuery(undefined);
  console.log(productsData?.data?.result);

  return (
    <div style={{ padding: "16px" }}>
      <Row gutter={[24, 24]}>
        {productsData?.data?.result.map((product: TProduct) => (
          <Col
            key={product._id}
            xs={24} // 1 card per row on extra small devices (mobile)
            sm={12} // 2 cards per row on small devices (tablet)
            md={8} // 3 cards per row on medium devices (small laptops)
            lg={6} // 4 cards per row on large devices (desktops)
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Shop;
