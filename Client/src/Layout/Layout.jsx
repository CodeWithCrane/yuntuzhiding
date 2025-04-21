import { useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Outlet } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { Layout, Button, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
import Sidebar from "../components/Sidebar/Sidebar";
import { AiFillAccountBook } from "react-icons/ai";
import Navbar from "../components/Navbar/Navbar";
//把html的widh和高度设置为100%而不是100vw和100vh就解决了水平滚动条跳的问题

const LayoutOfManagement = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className="layout" style={{minWidth: "100%", minHeight: "100%"}}>
            <Sidebar collapsed={collapsed} />
            <Layout>
                <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content
                    style={{
                        margin: 24,
                        marginBottom: 16,
                        marginLeft: 16,
                        // padding: 24,
                        // minHeight: "90vh",
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutOfManagement;