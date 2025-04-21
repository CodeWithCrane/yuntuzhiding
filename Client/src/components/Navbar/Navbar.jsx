import "./Navbar.css";
import { Button, Layout, Dropdown, Divider, theme } from "antd";
const { Header } = Layout;
import { HiOutlineMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { FaArrowCircleRight } from "react-icons/fa";

const Navbar = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();

    const menuItems = [
        {
            key: "login",
            label: "切换账号",
            icon: <MdAccountCircle style={{fontSize: "20px"}} />
        },
        {
            key: "login",
            label: "退出登录",
            icon: <FaArrowCircleRight style={{fontSize: "18px"}} />
        }
    ];

    const handleClick = ({key}) => {
        navigate(`${key}`);
    };

    return (
        <Header
            className="navbar"
            style={{
                padding: 0,
                // background: colorBgContainer,
                background: "white",
                display: "flex",
                justifyContent: "space-between"
            }}
        >
            <Button
                type="text"
                icon={<HiOutlineMenu />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: "32px",
                    width: 64,
                    height: 64,
                    marginLeft: "16px"
                }}
            />
            <Dropdown 
                menu={{items: menuItems, onClick: handleClick}}
                placement="bottomCenter">
                <div className="profile">
                    <img src="../../../src/assets/user.jpg" alt="用户" />
                </div>
            </Dropdown>
        </Header>
    );
};

export default Navbar;