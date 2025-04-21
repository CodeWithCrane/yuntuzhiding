import { Card, Flex, Button, Form, Input, message } from "antd";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "../../utils/axios";

const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({username: "", email: "", password: ""});

    const handleRegister = async () => {
        try {
            const res = await axios.post("/auth/register", registerData);
            console.log(res);
            if (res.status == 200) {
                message.success("注册成功");
                // navigate("/login");
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div style={{width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Card>
                <div className="logo">
                    <img src="../../../src/assets/dinghuo.svg" alt="" />
                    <span>易订宝</span>
                </div>
                <Form
                    name="register"
                    form={form}
                    size="large"
                    onFinish={handleRegister}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "请输入用户名" }]}
                        style={{ marginBottom: 12 }}
                    >
                        <Input 
                            prefix={<FaRegUser 
                            style={{ marginRight: "10px" }} />} 
                            placeholder="用户名"
                            onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                        ></Input>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: "请输入邮箱" }]}
                        style={{ marginBottom: 12 }}
                    >
                        <Input prefix={<HiOutlineMail style={{ marginRight: "10px" }} />} placeholder="邮箱" onChange={(e) => setRegisterData({...registerData, email: e.target.value})}></Input>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "请输入密码" }]}
                        style={{ marginBottom: 12 }}
                    >
                        <Input prefix={<HiOutlineLockClosed style={{ marginRight: "10px" }} />} type="password" placeholder="密码" onChange={(e) => setRegisterData({...registerData, password: e.target.value})}></Input>
                    </Form.Item>
                    <Form.Item style={{marginBottom: 0}}>
                        <Button type="primary" htmlType="submit" block>注册</Button>
                    </Form.Item>
                    <Form.Item >
                        <Flex justify="space-between" align="center" style={{fontSize: 12}}>
                            <span>已有账号!</span>
                            <a href="/login">登录</a>
                        </Flex>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Register;