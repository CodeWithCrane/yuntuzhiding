import { Layout, Menu } from "antd";
const { Sider } = Layout;
import {
    AiOutlineHome,
    AiOutlineUser,
    AiOutlineTransaction,
    AiOutlinePieChart
} from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuFileText } from "react-icons/lu";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const menuItems = [
    {
        key: "",
        icon: <AiOutlineHome style={{ width: "25px", height: "25px", marginRight: "10px" }} />,
        label: "主页"
    },
    {
        key: "users",
        icon: <AiOutlineUser style={{ width: "25px", height: "25px", marginRight: "10px" }} />,
        label: "用户"
    },
    {
        key: "commodities",
        icon: <HiOutlineShoppingBag style={{ width: "25px", height: "25px", marginRight: "10px" }} />,
        label: "商品"
    },
    {
        key: "orders",
        icon: <LuFileText style={{ width: "25px", height: "25px", marginRight: "10px" }} />,
        label: "订单"
    },
    {
        key: "charts",
        icon: <AiOutlinePieChart style={{ width: "25px", height: "25px", marginRight: "10px" }} />,
        label: "报表",
        children: [
            {
                key: "order-statistics",
                label: "订单统计"
            },
            {
                key: "commodity-sales",
                label: "商品销售"
            }
        ]
    }
];

const Sidebar = ({ collapsed }) => {
    const navigate = useNavigate();

    return (
        <Sider
            className="sidebar"
            trigger={null}
            collapsible
            collapsed={collapsed}
        >
            <div className="logo">
                <img src="../../../src/assets/dinghuo.svg" alt="" />
                {!collapsed && <span>易订宝</span>}
            </div>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={menuItems}
                onClick={({key}) => navigate(`${key}`)}
            />
        </Sider>
    );
};

export default Sidebar;