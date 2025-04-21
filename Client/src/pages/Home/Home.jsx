import "./Home.css";
import { useState, useEffect } from "react";
import { Row, Col, Flex, Radio, Button, Divider } from "antd";
import Echarts from "echarts-for-react";
import { FaFileLines } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FiBox } from "react-icons/fi";
import { FaBoxArchive } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa6";
import { HiChartPie } from "react-icons/hi";
import UserCard from "../../components/UserCard/UserCard";
import axios from "../../utils/axios";
import VirtualList from "../../components/VirtualList/VirtualList";
import LazyImage from "../../../utils/LazyImage";

const ListItem = (data) => {
    const user = data["user"];

    return (
        <div
            style={{
                padding: 10,
                display: "flex",
                gap: 10,
                // backgroundColor: "whitesmoke",
                boxSize: "border-box",
                border: "1px solid #333"
            }}
        >
            <div
                style={{
                    display: "flex",
                    // justifyContent: "center",
                    paddingLeft: 20,
                    alignItems: "center",
                    flex: 1
                }}
            >
                <LazyImage
                    src={user.imageURL}
                    alt="用户头像"
                    width="30px"
                    height="30px"
                    style={{ borderRadius: "50%", border: "1px solid black" }}
                />
            </div>
            <div
                style={{
                    ddisplay: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                }}
                fontSize={12}
            >
                {user.username}
            </div>
            <div
                style={{
                    ddisplay: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                }}
                fontSize={12}
            >
                {user.address}
            </div>
            <div
                style={{
                    ddisplay: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                }}
                fontSize={12}
            >
                {user.phoneNumber}
            </div>
            <div
                style={{
                    ddisplay: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                }}
                fontSize={12}
            >
                {user.email}
            </div>
            <div
                style={{
                    ddisplay: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                }}
                fontSize={12}
            >
                {user._id}
            </div>
        </div>
    )
};

export default function () {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get("/users");
            console.log(res.data.slice(0, 10));
            setUsers(res.data.slice(0, 10));
        };
        fetchUser();
    }, []);

    const orderOption = {
        // title: {
        //     text: "近期订单统计"
        // },
        tooltip: {

        },
        xAxis: {
            type: "category",
            data: ["2024/8/19", "2024/8/20", "2024/8/21", "2024/8/22", "2024/8/23", "2024/8/24", "2024/8/25"],
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                name: "订单总数",
                data: [210, 220, 300, 190, 310, 400, 520],
                type: "bar"
            }
        ],
        legend: {
            orient: "vertical",
            top: "bottom",
            right: "right"
        }
    };

    const commodityOption = {
        radius: 150,
        tooltip: {
            trigger: "item"
        },
        series: [
            {
                name: "销售分布",
                type: "pie",
                data: [
                    { name: "肉类", value: 6000 },
                    { name: "蔬菜", value: 4000 },
                    { name: "主食", value: 5000 },
                    { name: "饮料", value: 2000 },
                    { name: "水果", value: 3000 },
                    { name: "其他", value: 2000 },
                ],
                radius: "100px"
            }
        ],
        legend: {
            orient: "vertical",
            top: "bottom",
            right: "right"
        }
    };

    return (
        <div style={{ width: "100%", height: "100%", backgroundColor: "whitesmoke", padding: 24 }}>
            <Row>
                <Col xs={24} lg={11} style={{ padding: 24, marginRight: 24, marginBottom: 24, backgroundColor: "white", borderRadius: 10 }}>
                    <h2 style={{ color: "#333", marginBottom: 24 }}>今日概况</h2>
                    <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                        <Flex align="center" gap={36} >
                            <div className="icon" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 40, height: 40, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem", color: "white", backgroundColor: "#3b86ee", borderRadius: "50%" }}>
                                    <FaFileLines />
                                </div>
                                <div>订单数量</div>
                            </div>
                            <div style={{ color: "gray", fontSize: "1.2rem", fontWeight: "bold" }}>{Number(218).toLocaleString()}</div>
                        </Flex>
                        <Flex align="center" gap={36}>
                            <div className="icon" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 40, height: 40, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem", color: "white", backgroundColor: "#28c659", borderRadius: "50%" }}>
                                    <FaUser />
                                </div>
                                <div>用户数量</div>
                            </div>
                            <div style={{ color: "gray", fontSize: "1.2rem", fontWeight: "bold" }}>{Number(60).toLocaleString()}</div>
                        </Flex>
                        <Flex align="center" gap={36}>
                            <div className="icon" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 40, height: 40, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem", color: "white", backgroundColor: "#eac62a", borderRadius: "50%" }}>
                                    <RiShoppingBag4Fill />
                                </div>
                                <div>商品数量</div>
                            </div>
                            <div style={{ color: "gray", fontSize: "1.2rem", fontWeight: "bold" }}>{Number(1280).toLocaleString()}</div>
                        </Flex>
                        <Flex align="center" gap={36}>
                            <div className="icon" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 40, height: 40, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem", color: "white", backgroundColor: "#ea7b2a", borderRadius: "50%" }}>
                                    <FiBox />
                                </div>
                                <div>库存预警</div>
                            </div>
                            <div style={{ color: "gray", fontSize: "1.2rem", fontWeight: "bold" }}>{Number(6).toLocaleString()}</div>
                        </Flex>
                        <Flex align="center" gap={36}>
                            <div className="icon" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 40, height: 40, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem", color: "white", backgroundColor: "green", borderRadius: "50%" }}>
                                    <FaFileLines />
                                </div>
                                <div>订单完成率</div>
                            </div>
                            <div style={{ color: "gray", fontSize: "1.2rem", fontWeight: "bold" }}>{40}%</div>
                        </Flex>
                        <Flex align="center" gap={36}>
                            <div className="icon" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 40, height: 40, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem", color: "white", backgroundColor: "#ec0e02", borderRadius: "50%" }}>
                                    <FaTruck />
                                </div>
                                <div>发货完成率</div>
                            </div>
                            <div style={{ color: "gray", fontSize: "1.2rem", fontWeight: "bold" }}>{60}%</div>
                        </Flex>
                    </div>
                </Col>
                <Col xs={24} lg={11} style={{ padding: 24, backgroundColor: "white", borderRadius: 10, marginBottom: 24 }}>
                    <h2 style={{ marginBottom: 24 }}>核心功能</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 20 }}>
                        <div>
                            <div className="icon" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <FaUser style={{ fontSize: "2rem", marginBottom: 4 }} />
                                <div style={{ fontSize: "12px" }}>用户管理</div>
                            </div>
                        </div>
                        <div>
                            <div className="icon" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <FaFileLines style={{ fontSize: "2rem", marginBottom: 4 }} />
                                <div style={{ fontSize: "12px" }}>订单管理</div>
                            </div>
                        </div>
                        <div>
                            <div className="icon" style={{ display: "flex", flexDirection: "column", justifyContent: "centr", alignItems: "center" }}>
                                <RiShoppingBag4Fill style={{ fontSize: "2rem", marginBottom: 4 }} />
                                <div style={{ fontSize: "12px" }}>商品管理</div>
                            </div>
                        </div>
                        <div>
                            <div className="icon" style={{ display: "flex", flexDirection: "column", justifyContent: "centr", alignItems: "center" }}>
                                <HiChartPie style={{ fontSize: "2rem", marginBottom: 4 }} />
                                <div style={{ fontSize: "12px" }}>报表管理</div>
                            </div>
                        </div>
                        <div>
                            <div className="icon" style={{ display: "flex", flexDirection: "column", justifyContent: "centr", alignItems: "center" }}>
                                <FaBoxArchive style={{ fontSize: "2rem", marginBottom: 4 }} />
                                <div style={{ fontSize: "12px" }}>库存管理</div>
                            </div>
                        </div>
                        <div>
                            <div className="icon" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <FaTruck style={{ fontSize: "2rem", marginBottom: 4 }} />
                                <div style={{ fontSize: "12px" }}>物流管理</div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={24} xl={11} style={{ padding: 24, backgroundColor: "white", borderRadius: 10, marginRight: 24, marginBottom: 24 }}>
                    <h2 style={{ marginBottom: 24 }}>近期订单统计</h2>
                    <Echarts option={orderOption} style={{ width: 400, height: 300 }} />
                </Col>
                <Col xs={24} xl={11} style={{ backgroundColor: "white", borderRadius: 10, padding: 24, marginBottom: 24 }}>
                    <h2 style={{ marginBottom: 24 }}>近期商品销售</h2>
                    <Echarts option={commodityOption} style={{ width: 400, height: 400 }} />
                </Col>
            </Row>
            {/* <Row>
                <Col xs={24} xl={22} style={{ padding: 24, backgroundColor: "white", borderRadius: 10 }}>
                    <h2 style={{ marginBottom: 24 }}>最近用户</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,  minmax(200px, 1fr))", gap: 20 }}>
                        {
                            users.map((user) => <UserCard key={user._id} user={user} />)
                        }
                    </div>
                </Col>
            </Row> */}
            <Row>
                <Col xs={24} xl={22} style={{ padding: 24, backgroundColor: "white", borderRadius: 10, position: "relative" }}>
                    <VirtualList
                        style={{
                            borderRadius: "6px"
                        }}
                        data={users}
                        width={"100%"}
                        height={300}
                        count={users.length}
                        itemHeight={80}
                        overscan={2}
                        render={(user) => <ListItem key={user._id} user={user} />}
                    />
                </Col>
            </Row>
        </div>
    );
};