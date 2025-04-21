import axios from "../../utils/axios";
import LazyImage from "../../../utils/LazyImage";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Flex, Input, message, Modal } from "antd";
import { PiNotePencil } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

const { Search } = Input;

const User = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [deleteId, setDeleteId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const handleDelete = async () => {
        try {
            await axios.delete(`/user/${deleteId}`);
            setIsModalOpen(false);
            setUsers(users.filter(user => user.id !== deleteId));
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSearch = async () => {
        try {
            const res = await axios.get(`/users/search?keyword=${keyword}`);
            console.log(res);
            setUsers(res.data.map((user) => ({
                key: user._id,
                id: user._id,
                username: user.username,
                email: user.email,
                imageURL: user.imageURL,
                phoneNumber: user.phoneNumber,
                address: user.address,
                createdAt: new Date(user.createdAt).toLocaleString()
            })));
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        try {
            const getUsers = async () => {
                const res = await axios.get("/users");
                const { data } = res;
                setUsers(data.map((user) => ({
                    key: user._id,
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    imageURL: user.imageURL,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                    createdAt: new Date(user.createdAt).toLocaleString()
                })));
            };
            getUsers();
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    const columns = [
        {
            key: "用户名",
            title: "用户名",
            dataIndex: "username"
        },
        {
            key: "头像",
            title: "头像",
            dataIndex: "imageURL",
            render: (text, record) => (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <LazyImage src={text} alt="头像" width="30px" height="30px" style={{ borderRadius: "100%" }} />
                </div>
            )
        },
        {
            key: "用户编码",
            title: "用户编码",
            dataIndex: "id"
        },
        {
            key: "注册日期",
            title: "注册日期",
            dataIndex: "createdAt"
        },
        {
            key: "电话号码",
            title: "电话号码",
            dataIndex: "phoneNumber"
        },
        {
            key: "邮箱",
            title: "邮箱",
            dataIndex: "email"
        },
        {
            key: "地址",
            title: "地址",
            dataIndex: "address"
        },
        {
            key: "操作",
            title: "操作",
            render: (text, record) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button type="text" icon={<PiNotePencil />} onClick={() => navigate(`/user/edit?id=${record.id}`)} style={{ color: "green" }}></Button>
                    <Button type="text" icon={<RiDeleteBin5Line />} danger onClick={() => {
                        setIsModalOpen(true);
                        setDeleteId(record.id);
                    }}></Button>
                </div>
            )
        }
    ];

    const modalFooter = () => (
        <Flex justify="space-between" align="center" style={{ marginTop: 15 }}>
            <Button type="default" onClick={() => setIsModalOpen(false)}>取消</Button>
            <Button type="primary" danger onClick={handleDelete}>确定</Button>
        </Flex>
    );

    return (
        <div style={{padding: 24}}>
            <Flex justify="space-between" align="middle" style={{ marginBottom: 20 }}>
                <Search
                    placeholder="请输入"
                    icon={<IoSearchOutline />}
                    allowClear
                    enterButton
                    style={{ width: 200 }}
                    onChange={(e) => setKeyword(e.target.value)}
                    onSearch={handleSearch}
                />
                <Button type="primary" icon={<FaPlus />} onClick={() => navigate("/user/add")} >新增</Button>
            </Flex>
            <Table
                columns={columns}
                dataSource={users}
                pagination={{ pageSize: 8 }}
                style={{ maxHeight: "80vh", overflow: "auto" }}
            />
            <Modal
                closable={false}
                width={220}
                centered
                open={isModalOpen}
                // onCancel={() => setIsModalOpen(false)}
                // onOk={() => handleConfirm()}
                footer={modalFooter}
            >
                <span style={{ fontWeight: 600 }}>确定删除用户吗？</span>
            </Modal>
        </div>
    );
};

export default User;