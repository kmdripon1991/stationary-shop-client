import { Carousel } from "antd";
import Banner from "../../../component/Banner";
import FeaturedProducts from "../../../component/FeaturedProducts";
import TestimonialsAndBlogs from "../../../component/TestimonialsAndBlogs";

const Home = () => {
  return (
    <>
      <Carousel autoplay>
        <Banner
          backgroundImage="https://i.ibb.co.com/K6CsM53/DALL-E-2025-01-26-23-54-09-A-vibrant-and-inviting-banner-image-for-a-stationary-shop-The-scene-inclu.webp"
          title="Special Discount on All Items!"
          description="Shop now and save big on your stationery needs."
        />
        <Banner
          backgroundImage="https://i.ibb.co.com/g94pxdR/DALL-E-2025-01-27-00-19-05-A-vibrant-banner-image-for-a-stationary-shop-showcasing-New-Arrivals-in-S.webp"
          title="New Arrivals in Stationery!"
          description="Explore our latest collection of notebooks, pens, and more."
        />
        <Banner
          backgroundImage="https://i.ibb.co.com/F8H9gqm/DALLE-2025-01-27-00-20-33-A-festive-and-vibrant-banner-image-for-a-stationery-shop-promoting-a-Holid.png"
          title="Holiday Sale – Up to 50% Off!"
          description="Get your stationery at unbeatable prices during the holiday sale!"
        />
      </Carousel>
      <FeaturedProducts />
      <TestimonialsAndBlogs />
    </>
  );
};

export default Home;
