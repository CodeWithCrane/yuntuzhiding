import "./Commodities.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Flex, Form, Table, Drawer, Modal, message, Input } from "antd";
import { PiNotePencil } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegRectangleList } from "react-icons/fa6";
import { PlusOutlined } from "@ant-design/icons";
import { IoSearchOutline } from "react-icons/io5";
import axios from "../../utils/axios";
import styled from "styled-components";
import LazyImage from "../../../utils/LazyImage";

const { Search } = Input;

const Commodities = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [commodities, setCommodities] = useState([]);
    const [commodityFilter, setCommodityFilter] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({ imageURL: true, name: true, commodityNumber: true, category: true, unit: true, price: true, address: true, inventory: true, createdAt: true, updatedAt: true });
    const [selectedColumns, setSelectedColumns] = useState({ imageURL: true, name: true, commodityNumber: true, category: true, unit: true, price: true, address: true, inventory: true, createdAt: true, updatedAt: true })
    const [deleteId, setDeleteId] = useState("");
    const [keyword, setKeyword] = useState("");

    const handleChange = (e) => {
        setSelectedColumns({
            ...selectedColumns,
            [e.target.id]: e.target.checked
        })
    };

    const handleConfirm = () => {
        setVisibleColumns({
            ...selectedColumns
        });
        setIsDrawerOpen(false);
    };

    const handleCancel = () => {
        setSelectedColumns({
            ...visibleColumns
        });
        setIsDrawerOpen(false);
    };

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/commodity/${deleteId}`);
            console.log(deleteId);
            if (res.status === 200) {
                setIsModalOpen(false);
                setCommodities(commodities.filter((commodity) => commodity.id !== deleteId));
                message.success("删除成功");
            }
        } catch (error) {
            console.log(error.message);
            message.error(error.message);
            setIsModalOpen(false);
        }
    };

    const handleSearch = async () => {
        try {
            console.log(keyword);
            const res = await axios.get(`/commodities/search?keyword=${keyword}`);
            console.log(`/commodities/search?keyword=${keyword}`);
            const data = res.data.map((commodity) => ({
                id: commodity._id,
                key: commodity._id,
                name: commodity.name,
                commodityNumber: commodity.commodityNumber,
                category: commodity.category,
                address: commodity.address,
                unit: commodity.unit,
                price: commodity.price,
                inventory: commodity.inventory,
                imageURL: commodity.imageURL,
                createdAt: new Date(commodity.createdAt).toLocaleString(),
                updatedAt: new Date(commodity.updatedAt).toLocaleString()
            }));
            console.log(data);
            setCommodities(data);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            key: "主图",
            title: "主图",
            dataIndex: "imageURL",
            render: (text) => <LazyImage src={text} alt="商品图片" width="30px" height="30px" style={{ borderRadius: 5, objectFit: "cover" }} />
        },
        {
            key: "商品名称",
            title: "商品名称",
            dataIndex: "name",
        },
        {
            key: "商品编号",
            title: "商品编号",
            dataIndex: "commodityNumber",
            // sorter: (a, b) => a.commodityNumber.length - b.commodityNumber.length,
        },
        {
            key: "种类",
            title: "种类",
            dataIndex: "category"
        },
        {
            key: "计量单位",
            title: "计量单位",
            dataIndex: "unit",
        },
        {
            key: "价格",
            title: "价格",
            dataIndex: "price",
            sorter: (a, b) => a.price - b.price
        },
        {
            key: "产地",
            title: "产地",
            dataIndex: "address"
        },
        {
            key: "库存",
            title: "库存",
            dataIndex: "inventory",
            sorter: (a, b) => a.inventory - b.inventory
        },
        {
            key: "新增时间",
            title: "新增时间",
            dataIndex: "createdAt",
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        },
        {
            key: "修改时间",
            title: "修改时间",
            dataIndex: "updatedAt",
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        },
        {
            key: "操作",
            width: 100,
            title: <Button type="text" icon={<FaRegRectangleList />} style={{ fontSize: "1.5rem" }} onClick={() => setIsDrawerOpen(!isDrawerOpen)}></Button>,
            fixed: "right",
            render: (text, record) => (<Flex align="center">
                <Button type="text" icon={<PiNotePencil />} style={{color: "green"}} onClick={() => navigate(`/commodity/edit?id=${record.key}`)}></Button>
                <Button type="text" icon={<RiDeleteBin5Line />} style={{color: "red"}} onClick={() => {
                    setIsModalOpen(true);
                    setDeleteId(record.id);
                }}></Button>
            </Flex>)
        },
    ];

    useEffect(() => {
        try {
            const getCommodities = async () => {
                setLoading(true);
                const res = await axios.get("/commodities");
                const data = res.data.map((commodity) => ({
                    id: commodity._id,
                    key: commodity._id,
                    name: commodity.name,
                    commodityNumber: commodity.commodityNumber,
                    category: commodity.category,
                    address: commodity.address,
                    unit: commodity.unit,
                    price: commodity.price,
                    inventory: commodity.inventory,
                    imageURL: commodity.imageURL,
                    createdAt: new Date(commodity.createdAt).toLocaleString(),
                    updatedAt: new Date(commodity.updatedAt).toLocaleString()
                }));
                setCommodities(data);
                setLoading(false);
            }
            getCommodities();
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
                        <Flex justify="space-between" align="center" style={{marginBottom: 20}}>
                            <Search
                                placeholder="请输入"
                                icons={<IoSearchOutline />}
                                enterButton
                                allowClear
                                style={{width: 200}}
                                onChange={(e) => setKeyword(e.target.value)}
                                onSearch={handleSearch}
                            />
                            <Button type="primary" icon={<PlusOutlined/>} onClick={() => navigate("/commodity/add")}>新增</Button>
                        </Flex>
                        <Table
                            columns={columns.filter(({ key, dataIndex }) => visibleColumns[dataIndex] === true || key === "操作")}
                            dataSource={commodities}
                            scroll={{ x: 1500 }}
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
                            title="选择显示字段"
                            closable={false}
                            open={isDrawerOpen}
                            onClose={() => setIsDrawerOpen(false)}
                        >
                            <ul>
                                <li>
                                    <Checkbox id="imageURL" onChange={handleChange} checked={selectedColumns.imageURL}>主图</Checkbox>
                                </li>
                                <li>
                                    <Checkbox id="name" onChange={handleChange} checked={selectedColumns.name}>商品名称</Checkbox>
                                </li>
                                <li>
                                    <Checkbox id="commodityNumber" onChange={handleChange} checked={selectedColumns.commodityNumber}>商品编号</Checkbox>
                                </li>
                                <li>
                                    <Checkbox id="category" onChange={handleChange} checked={selectedColumns.category}>种类</Checkbox>
                                </li>
                                <li>
                                    <Checkbox id="unit" onChange={handleChange} checked={selectedColumns.unit}>计量单位</Checkbox>
                                </li>
                                <li>
                                    <Checkbox id="price" onChange={handleChange} checked={selectedColumns.price}>价格</Checkbox>
                                </li>
                                <li>
                                    <Checkbox id="address" onChange={handleChange} checked={selectedColumns.address}>产地</Checkbox>
                                </li>
                                <li>
                                    <Checkbox id="inventory" onChange={handleChange} checked={selectedColumns.inventory}>库存</Checkbox>
                                </li>
                                <li>
                                    <Checkbox id="createdAt" onChange={handleChange} checked={selectedColumns.createdAt}>新增时间</Checkbox>
                                </li>
                                <li>
                                    <Checkbox id="updatedAt" onChange={handleChange} checked={selectedColumns.updatedAt}>修改时间</Checkbox>
                                </li>
                            </ul>
                            <Flex align="center" gap={20} style={{ marginTop: 20 }}>
                                <Button type="default" onClick={handleCancel}>取消</Button>
                                <Button type="primary" onClick={handleConfirm}>确定</Button>
                            </Flex>
                        </Drawer>
                    </div>
                )
            }
        </div>
    );
};

export default Commodities;