import { Row, Col } from "antd";
import ProductCard, { TProduct } from "../../component/ProductCard";
import { useGetAllProductsQuery } from "../../redux/features/products/products.api";

const Shop = () => {
  const { data: allProducts } = useGetAllProductsQuery(undefined);

  return (
    <div style={{ padding: "16px" }}>
      <Row gutter={[24, 24]}>
        {allProducts?.data?.result.map((product: TProduct) => (
          <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Shop;
