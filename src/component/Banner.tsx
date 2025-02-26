import { Button } from "antd";
import { Link } from "react-router-dom";

interface BannerProps {
  backgroundImage: string;
  title: string;
  description: string;
}

const Banner = ({ backgroundImage, title, description }: BannerProps) => {
  return (
    <div
      style={{
        position: "relative",
        height: "400px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 20px",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "800px",
          textAlign: "center",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>{title}</h1>
        <p style={{ fontSize: "18px", marginBottom: "30px" }}>{description}</p>
        <Link to="/shop">
          <Button type="primary" size="large" style={{ fontSize: "16px" }}>
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
