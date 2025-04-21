import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Flex, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "../../utils/axios";

const AddUser = () => {
    const [user, setUser] = useState({ username: "", email: "", password: "", phoneNumber: "", address: "", imageURL: "" });
    const [imageURL, setImageURL] = useState("");
    const [uploadLoading, setUploadLoading] = useState(false);
    const navigate = useNavigate();
    const uploadRef = useRef(null);
    const [form] = Form.useForm();


    const handleUpload = async (e) => {
        try {
            const image = e.target.files[0];
            if (!image) {
                return;
            }
            const reader = new FileReader();
            setUploadLoading(true);
            reader.onload = () => {
                const dataURL = reader.result;
                setUploadLoading(false);
                setImageURL(dataURL);
                setUser({
                    ...user,
                    imageURL: reader.result
                });
            };
            reader.readAsDataURL(image);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            console.log(user);
            const res = await axios.post("user", user);
            console.log(res.data);
            if (res.status === 200) {
                navigate("/users");
                message.success("添加成功");
            }
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }
    };

    return (
        <div style={{ padding: 24 }}>
            <Form
                name="Add User"
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 8 }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="用户名"
                    label="用户名"
                    rules={[{ required: true, message: "请输入用户名" }]}
                >
                    <Input id="username" placeholder="请输入用户名" onChange={handleChange}></Input>
                </Form.Item>
                <Form.Item onClick={handleChange}
                    name="头像"
                    label="上传"
                >
                    <input ref={uploadRef} type="file" onChange={handleUpload} style={{ display: "none" }} />
                    <div style={{ width: 80, height: 80, border: "1px solid #333", borderRadius: 5, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 15 }} onClick={() => uploadRef.current.click()}>
                        {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ fontWeight: 400 }}>Uploading</div>
                    </div>
                    {
                        imageURL && <div style={{ width: 80, height: 80, border: "1px solid #333", borderRadius: 8 }}>
                            <img src={imageURL} alt="头像" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
                        </div>
                    }
                </Form.Item>
                <Form.Item
                    name="邮箱"
                    label="邮箱"
                    rules={[{ required: true, message: "请输入邮箱" }]}
                >
                    <Input id="email" placeholder="请输入邮箱" onChange={handleChange}></Input>
                </Form.Item>
                <Form.Item
                    name="密码"
                    label="密码"
                    rules={[{ required: true, message: "请输入密码" }]}
                >
                    <Input id="password" type="password" placeholder="请输入密码" onChange={handleChange}></Input>
                </Form.Item>
                <Form.Item
                    name="电话号码"
                    label="电话号码"
                    rules={[{ required: true, message: "请输入电话号码" }]}
                >
                    <Input id="phoneNumber" placeholder="请输入电话号码" onChange={handleChange}></Input>
                </Form.Item>
                <Form.Item
                    name="地址"
                    label="地址"
                    rules={[{ required: true, message: "请输入地址" }]}
                >
                    <Input id="address" placeholder="请输入地址" onChange={handleChange}></Input>
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 8, offset: 4 }}
                >
                    <Flex justify="space-between" align="center">
                        <Button type="default" onClick={() => navigate("/users")}>取消</Button>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Flex>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddUser;