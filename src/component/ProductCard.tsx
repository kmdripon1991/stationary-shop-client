import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
export type TProduct = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  model: string;
  category: string;
  description: string;
  quantity: number;
  image: string;
  inStock: boolean;
};
const ProductCard = ({ product }: { product: TProduct }) => {
  const { name, category, price, image } = product;
  const navigate = useNavigate();

  const handleViewDetails = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Card
      hoverable
      style={{
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      cover={
        <div
          style={{
            width: "100%",
            height: "220px", // Fixed height
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "#f5f5f5", // Fallback background color
          }}
        >
          <img
            alt={name}
            src={image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Full coverage without stretching
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          />
        </div>
      }
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <Meta
        title={
          <span
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              color: "#333",
            }}
          >
            {name}
          </span>
        }
        description={
          <>
            <div
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2, // Limits to 2 lines for a clean look
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "clamp(12px, 2vw, 14px)", // Responsive font size
                color: "#666",
              }}
            >
              {category}
            </div>
            <div
              style={{
                marginTop: "8px",
                fontWeight: "bold",
                fontSize: "clamp(14px, 2vw, 18px)", // Responsive font size
                color: "#ff4d4f",
              }}
            >
              ${price.toFixed(2)}
            </div>
          </>
        }
      />
      <Button
        type="primary"
        style={{
          marginTop: "12px",
          width: "100%",
          height: "40px",
          fontSize: "16px",
          fontWeight: "bold",
          background: "#001529", // Navbar color
          border: "none",
          borderRadius: "8px",
          transition: "background 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#002140")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#001529")}
        onClick={() => handleViewDetails(product._id)}
      >
        View Details
      </Button>
    </Card>
  );
};

export default ProductCard;
