import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import NavbarItems from "./NavbarItems";
import SSFooter from "../Footer";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <NavbarItems />
      <Content>
        <Outlet />
      </Content>
      <SSFooter />
    </Layout>
  );
};

export default MainLayout;
