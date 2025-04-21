import "./Orders.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Input, Flex, message, Modal, Drawer, Dropdown, Space, DatePicker, Checkbox } from "antd";
import { PiNotePencil } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { PlusOutlined, DownOutlined } from "@ant-design/icons";
import { FaRegRectangleList } from "react-icons/fa6";
import moment from "moment";
import timezone from "moment-timezone";
import axios from "../../utils/axios";

const { RangePicker } = DatePicker;
const { Search } = Input;

const Orders = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState("全部订单");
    const [orders, setOrders] = useState([]);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [keyword, setKeyword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({ orderId: true, createdAt: true, updatedAt: true, user: true, phoneNumber: true, address: true, deliveryTime: true, cost: true, deliveryState: true, orderState: true, handler: true, account: true });
    const [selectedColumns, setSelectedColumns] = useState({ orderId: true, createdAt: true, updatedAt: true, user: true, phoneNumber: true, address: true, deliveryTime: true, cost: true, deliveryState: true, orderState: true, handler: true, account: true });

    const menuItems = [
        {
            key: "全部订单",
            label: <span onClick={() => {
                setState("全部订单");
                searchByOrderState("全部订单");
            }}>全部订单</span>
        },
        {
            key: "已完成",
            label: <span onClick={() => {
                setState("已完成");
                searchByOrderState("已完成");             
            }}>已完成</span>
        },
        {
            key: "待处理",
            label: <span onClick={() => {
                setState("待处理");
                searchByOrderState("待处理");
            }}>待处理</span>
        },
        {
            key: "已作废",
            label: <span onClick={() => {
                setState("已作废");
                searchByOrderState("已作废");
            }}>已作废</span>
        }
    ];

    const columns = [
        {
            key: "订单编号",
            title: "订单编号",
            width: 200,
            dataIndex: "orderId"
        },
        {
            width: 120,
            key: "创建时间",
            title: "创建时间",
            dataIndex: "createdAt",
            render: (text) => moment(text).format("YYYY/MM/DD")
        },
        {
            width: 120,
            key: "更新时间",
            title: "更新时间",
            dataIndex: "updatedAt",
            render: (text) => moment(text).format("YYYY/MM/DD")
        },
        {
            key: "客户名称",
            title: "客户名称",
            dataIndex: "user"
        },
        {
            width: 120,
            key: "联系方式",
            title: "联系方式",
            dataIndex: "phoneNumber"
        },
        {
            key: "收货地址",
            title: "收货地址",
            dataIndex: "address"
        },
        {
            key: "收货时间",
            title: "收货时间",
            dataIndex: "deliveryTime",
            width: 120,
            render: (text) => moment(text).format("YYYY/MM/DD")
        },
        {
            key: "金额",
            title: "金额",
            dataIndex: "cost"
        },
        {
            key: "物流状态",
            title: "物流状态",
            dataIndex: "deliveryState"
        },
        {
            key: "订单状态",
            title: "订单状态",
            dataIndex: "orderState"
        },
        {
            key: "处理人",
            title: "处理人",
            dataIndex: "handler"
        },
        {
            key: "订单数量",
            title: "订单数量",
            dataIndex: "account"
        },
        {
            key: "操作",
            title: <Button type="text" icon={<FaRegRectangleList />} style={{ fontSize: "1.5rem" }} onClick={() => setIsDrawerOpen(!isDrawerOpen)}></Button>,
            width: 100,
            fixed: "right",
            render: (text, record) => <Flex align="center">
                <Button type="text" icon={<PiNotePencil />} style={{ color: "green" }} onClick={() => navigate(`/order/edit?id=${record._id}`)}></Button>
                <Button type="text" icon={<RiDeleteBin5Line />} style={{ color: "red" }} onClick={() => {
                    setIsModalOpen(!isModalOpen);
                    setDeleteId(record._id);
                }}></Button>
            </Flex>
        }
    ];

    const handlePick = async () => {
        // try {
        //     console.log("hello world");
        // } catch (error) {
        //     console.log(error);
        // }
    };

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/order/${deleteId}`);
            console.log(res);
            if (res.status === 200) {
                message.success("删除成功");
                setIsModalOpen(false);
                setOrders(orders.filter((order) => order._id !== deleteId));
                return;
            }
        } catch (error) {
            console.log(error);
            console.log(error.message);
            message.error("删除失败");
        }
    };

    const handleCheck = async (e) => {
        setSelectedColumns({
            ...selectedColumns,
            [e.target.id]: e.target.checked
        })
    };

    const handleCancel = () => {
        setSelectedColumns({
            ...visibleColumns
        });
        setIsDrawerOpen(false);
    };

    const handleConfirm = () => {
        setVisibleColumns({
            ...selectedColumns
        });
        setIsDrawerOpen(false);
    };

    const searchByKeyword = async () => {
        try {
            const res = await axios.get(`/searchOrderByKeyword?keyword=${keyword}`);
            console.log(res.data);
            if (res.status === 200) {
                setOrders(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const searchByOrderState = async (orderState) => {
        try {
            const res = await axios.get(`/searchOrderByOrderState?orderState=${orderState}`);
            console.log(res.data);
            if (res.status === 200) {
                setOrders(res.data);
            }
        } catch (error) {
            console.log(error,message);
        }
    };

    const searchByTime = async ({start, end}) => {
        try {
            console.log(start.toLocaleString(), end.toLocaleString());
            const res = await axios.post("/searchOrderByTime", {
                start,
                end
            });
            if (res.status === 200) {
                setOrders(res.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        try {
            const getOrders = async () => {
                setLoading(true);
                const res = await axios.get("/orders");
                console.log(res.data);
                setLoading(false);
                setOrders(res.data);
            };
            getOrders();
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    const modalFooter = (
        <Flex justify="space-between" aling="center" style={{ width: 200, marginTop: 20 }}>
            <Button type="default" onClick={() => setIsModalOpen(false)}>取消</Button>
            <Button type="primary" onClick={handleDelete} danger>确定</Button>
        </Flex>
    );

    return (
        <div style={{padding: 24}}>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <Flex justify="space-between" align="center" style={{ marginBottom: 20 }}>
                            <Flex align="center" gap={20}>
                                <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            {state}
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                                {/* <DatePicker
                        onChange={(date, dateString) => console.log(date.toDate().toLocaleString("zh-CN", { year: 'numeric', month: '2-digit', day: '2-digit' }))}
                    /> */}
                                <RangePicker
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                    onChange={(value, dateString) => {
                                        console.log('Selected Time: ', value);
                                        console.log('Formatted Selected Time: ', dateString);
                                        console.log(moment(value[0]).format("YYYY-MM-DD HH:MM"));
                                        setStartTime(value[0]);
                                        setEndTime(value[1]);
                                        searchByTime({start: value[0], end: value[1]})
                                    }}
                                    onOk={() => console.log("hello world")}
                                />
                                <Search
                                    placeholder="请输入"
                                    icon={<IoSearchOutline />}
                                    enterButton
                                    style={{ width: 200 }}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onSearch={searchByKeyword}
                                />
                            </Flex>
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate("/order/add")}>新增</Button>
                        </Flex >
                        <Table
                            columns={columns.filter(({ key, dataIndex }) => visibleColumns[dataIndex] || key === "操作")}
                            dataSource={orders}
                            scroll={{ x: 1500 }}
                            pagination={{ pageSize: 8 }}
                        />
                        <Modal
                            width={250}
                            closable={false}
                            centered
                            footer={modalFooter}
                            open={isModalOpen}
                            onCancel={() => setIsModalOpen(false)}
                        >
                            <span style={{ textAlign: "center" }}>确定删除这个商品吗？</span>
                        </Modal>
                        <Drawer
                            closable={false}
                            open={isDrawerOpen}
                            onClose={() => setIsDrawerOpen(false)}
                        >
                            <ul style={{}}>
                                <li>
                                    <Checkbox onChange={handleCheck} checked={selectedColumns.orderId} id="orderId">订单编号</Checkbox>
                                </li>
                                <li>
                                    <Checkbox onChange={handleCheck} checked={selectedColumns.createdAt} id="createdAt">创建时间</Checkbox>
                                </li>
                                <li>
                                    <Checkbox onChange={handleCheck} checked={selectedColumns.updatedAt} id="updatedAt">更新时间</Checkbox>
                                </li>
                                <li>
                                    <Checkbox onChange={handleCheck} checked={selectedColumns.user} id="user">用户名</Checkbox>
                                </li>
                                <li>
                                    <Checkbox onChange={handleCheck} checked={selectedColumns.phoneNumber} id="phoneNumber">电话号码</Checkbox>
                                </li>
                                <li>
                                    <Checkbox onChange={handleCheck} checked={selectedColumns.address} id="address">收货地址</Checkbox>
                                </li>
                                <li>
                                    <Checkbox onChange={handleCheck} checked={selectedColumns.deliveryTime} id="deliveryTime">收货时间</Checkbox>
                                </li>
                                <li>
                                    <Checkbox onChange={handleCheck} checked={selectedColumns.cost} id="cost">金额</Checkbox>
                                </li>
                                <li>
                                    <Checkbox onChange={handleCheck} checked={selectedColumns.deliveryState} id="deliveryState">物流状态</Checkbox>
                                </li>
                                <li>
                                    <Checkbox onChange={handleCheck} checked={selectedColumns.orderState} id="orderState">订单状态</Checkbox>
                                </li>
                                <li>
                                    <Checkbox onChange={handleCheck} checked={selectedColumns.handler} id="handler">处理人</Checkbox>
                                </li>
                                <li>
                                    <Checkbox onChange={handleCheck} checked={selectedColumns.account} id="account">订单数量</Checkbox>
                                </li>
                            </ul>
                            <Flex align="center" gap={20} style={{ marginTop: 20 }}>
                                <Button type="default" onClick={handleCancel}>取消</Button>
                                <Button type="primary" onClick={handleConfirm}>确认</Button>
                            </Flex>
                        </Drawer>
                    </div>
                )
            }
        </div>
    )
};

export default Orders;