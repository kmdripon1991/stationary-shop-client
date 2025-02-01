import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import NavbarItems from "./NavbarItems";
import SSFooter from "../Footer";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      {/* <Layout style={{ height: "100vh" }}> */}
      <NavbarItems />

      <Content style={{ padding: "0 48px", width: "100%" }}>
        {/* Content */}

        <Outlet />
      </Content>
      <SSFooter />
    </Layout>
  );
};

export default MainLayout;
