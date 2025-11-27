import React from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DashboardOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];
const SidebarMenu = () => {
  const items: MenuItem[] = [
    {key:'',label:'Dashboard',icon:<DashboardOutlined />},
    {
      key: "product",
      icon: <ProductOutlined />,
      label: "QL sản phẩm",
      children: [
        { key: "products/add", label: "Thêm mới sản phẩm" },
        { key: "products", label: "Danh sách sản phẩm" },
        { key: "products/properties", label: "Quản lý thuộc tính" },
      ],
    },
  ];
  const navigate = useNavigate();
  const handleClick = ({ key }: any) => {
    console.log(key);
    navigate(`/admin/${key}`);
  };
  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="dark"
      items={items}
      onClick={handleClick}
    />
  );
};

export default SidebarMenu;
