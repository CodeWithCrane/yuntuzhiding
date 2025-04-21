import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Input, Flex, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "../../utils/axios";

const EditUser = () => {
    const [user, setUser] = useState({ username: "", email: "", phoneNumber: "", password: "", imageURL: "", address: "" });
    const [imageURL, setImageURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);
    const userId = urlParams.get("id");
    const [form] = Form.useForm();
    const uploadRef = useRef(null);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        });
        console.log(user);
    };

    const handleUpload = async (event) => {
        try {
            const image = event.target.files[0];
            if (!image) {
                return ;
            }
            setUploadLoading(true);
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataURL = event.target.result;
                setUploadLoading(false);
                setImageURL(reader.result);
                setUser({
                    ...user,
                    imageURL: reader.result
                });
            };
            await reader.readAsDataURL(image);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = async () => {
        try {
            const updateUser = async () => {
                const res = await axios.put(`/user/${userId}`, user);
                if (res.status === 200) {
                    message.success("更新成功");
                    navigate("/users");
                }
            };
            updateUser();
        } catch (error) {
            console.log(error);
            message.error(error.messsage);
        }
    };

    useEffect(() => {
        setLoading(true);
        try {
            const getUser = async () => {
                const res = await axios.put(`/user/${userId}`);
                setUser(res.data);
                setLoading(false);
            };
            getUser();
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    console.log(user);
    return (
        <div style={{padding: 24}}>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <Form
                        name="Edit User"
                        form={form}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8 }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="用户编号"
                            label="用户编号"
                        >
                            <Input id="id" defaultValue={user._id} value={user.id} disabled onChange={handleChange}></Input>
                        </Form.Item>
                        <Form.Item
                            name="用户名"
                            label="用户名"
                        >
                            <Input id="username" defaultValue={user.username} value={user.username} onChange={handleChange} ></Input>
                        </Form.Item>
                        <Form.Item
                            name="头像"
                            label="头像"
                        >
                            {/* 是onChange不是onClick, 这个bug找了两个多小时 */}
                            <input type="file" ref={uploadRef} onChange={handleUpload} style={{ display: "none" }} />
                            <div style={{ border: "1px solid #333", borderRadius: 5, width: 80, height: 80, marginBottom: 10, flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => uploadRef.current.click()}>
                                {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
                                <div style={{ marginTop: 8, fontWeight: 400 }}>Uploading</div>
                            </div>
                            {
                                imageURL && <div style={{ border: "1px solid #333", borderRadius: 5, width: 80, height: 80 }}>
                                    <img src={imageURL} alt="头像" style={{ width: "100%", height: "100%", borderRadius: 8, objectFit: "cover" }} />
                                </div>
                            }
                        </Form.Item>
                        <Form.Item
                            name="邮箱"
                            label="邮箱"
                        >
                            <Input id="email" defaultValue={user.email} onChange={handleChange} ></Input>
                        </Form.Item>
                        <Form.Item
                            name="密码"
                            label="密码"
                        >
                            <Input id="password" type="password" defaultValue={user.password} onChange={handleChange} ></Input>
                        </Form.Item>
                        <Form.Item
                            name="电话号码"
                            label="电话号码"
                        >
                            <Input id="phoneNumber" defaultValue={user.phoneNumber} onChange={handleChange} ></Input>
                        </Form.Item>
                        <Form.Item
                            name="地址"
                            label="请输入地址"
                        >
                            <Input id="address" defaultValue={user.address} onChange={handleChange} ></Input>
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 8, offset: 4 }}
                        >
                            <Flex justify="space-between" align="center">
                                <Button type="default" onClick={() => navigate("/users")}>取消</Button>
                                <Button type="primary" htmlType="submit">提交</Button>
                            </Flex>
                        </Form.Item>
                    </Form>
                )
            }
        </div>
    );
};

export default EditUser;