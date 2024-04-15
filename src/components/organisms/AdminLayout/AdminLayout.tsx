import React, { FC, useEffect, useMemo, useState } from "react";
import { AdminLayoutProps } from "./AdminLayout.types";
import { Dropdown, Layout, Menu, MenuProps, theme } from "antd";
import {
  DashboardOutlined,
  SettingOutlined,
  FieldTimeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UsergroupDeleteOutlined,
  UserOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const { Header, Sider, Content } = Layout;
export const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  // const { roleName, user } = useSelector(authSelector);

  const itemsMenu = useMemo(() => {
    const menu: {
      key: string;
      icon: JSX.Element;
      label: string;
      onClick: () => void;
      danger?: boolean;
    }[] = [
      {
        key: "1",
        icon: <DashboardOutlined size={30} className="" />,
        label: "Dashboard",
        onClick: () => {
          router.push("/admin");
        },
      },
      {
        key: "2",
        icon: <LinkOutlined />,
        label: "Link ",
        onClick: () => {
          router.push("/admin/Link");
        },
      },
      {
        key: "3",
        icon: <SettingOutlined />,
        label: "Setting",
        onClick: () => {
          router.push("/admin/Setting");
        },
      },
      // {
      //   key: "4",
      //   icon: <DollarCircleOutlined />,
      //   label: "Product Management",
      //   onClick: () => {
      //     router.push("/product-management");
      //   },
      // },
      // {
      //   key: "5",
      //   icon: <DollarCircleOutlined />,
      //   label: "Order Management",
      //   onClick: () => {
      //     router.push("/order-management");
      //   },
      // },
      // {
      //   key: "6",
      //   icon: <UploadOutlined />,
      //   label: "Requests",
      //   onClick: () => {
      //     router.push("/requests");
      //   },
      // },
      // {
      //   key: "7",
      //   icon: <UserOutlined />,
      //   label: "Roles",
      //   onClick: () => {
      //     router.push("/roles");
      //   },
      // },
    ];
    return menu;
  }, []);

  const openChangePassword = () => {};
  const openLogout = () => {};
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/account">Account</Link>,
    },
    {
      key: "2",
      label: <div onClick={openChangePassword}>Change password</div>,
    },
    {
      key: "3",
      label: <div onClick={openLogout}>Logout</div>,
    },
  ];

  const currentSelect = useMemo(() => {
    let select = "0";

    switch (router.pathname) {
      case "/admin":
        select = "1";
        break;
      case "/admin/Link":
        select = "2";
        break;
      case "/admin/Setting":
        select = "3";
        break;
      case "/product-management":
        select = "4";
        break;
      case "/order-management":
        select = "5";
        break;
      case "/requests":
        select = "6";
        break;
      case "/roles":
        select = "7";
        break;
      default:
        break;
    }
    return select;
  }, [router.pathname]);

  return (
    <Layout className="wrapper min-h-screen bg-blue-100">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="logo">
          <p className="text-white">Admin</p>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[currentSelect]}
          items={[...itemsMenu]}
          className="text-base"
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="ml-5">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </div>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            arrow
            className="avatar"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p
                style={{
                  marginRight: "10px",
                  fontFamily: "sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                {/* {user?.account?.userName} */}
              </p>
              <div className="w-[40px] h-[40px] overflow-hidden rounded-[40px]">
                {/* <Image 
                    src={`${process.env.NEXT_PUBLIC_API_URL}${userInfo?.profilePicture}`}
                    alt="Profile Picture"
                    width={40}
                    height={40}
                    style={{
                        resize:"both"
                    }}
                  /> */}
              </div>
            </div>
          </Dropdown>
        </Header>
        {/* <Content
          className="flex-1 mt-6 mb-6 ml-4 mr-4 p-6 bg-white"
          style={
            {
              // background: colorBgContainer,
            }
          }
        >
          {children}
        </Content> */}
        {children}
      </Layout>
    </Layout>
  );
};
