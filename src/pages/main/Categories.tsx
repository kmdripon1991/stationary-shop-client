import { Row, Col } from "antd";
import ProductCard, { TProduct } from "../../component/ProductCard";
import { useSearchProductsQuery } from "../../redux/features/products/products.api";
import { useParams } from "react-router-dom";

const Categories = () => {
  const { category } = useParams();
  const formattedCategory = category ? category.replace(/-/g, " ") : undefined;
  const { data: filteredProducts } = useSearchProductsQuery({
    category: formattedCategory,
  });


  return (
    <div style={{ padding: "16px" }}>
      <Row gutter={[24, 24]}>
        {filteredProducts?.data?.result.map((product: TProduct) => (
          <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Categories;
