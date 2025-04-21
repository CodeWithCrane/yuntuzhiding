import { Button, Input, Card, Form, Flex, Checkbox } from "antd";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi";
import axios from "../../utils/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({username: "", password: ""});

    const handleLogin = async () => {
        try {
            const res = await axios.post("/auth/login", loginData);
            if (res.status === 200) {
                console.log("登录成功");
                console.log(res);
                navigate("/");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card>
                <div className="logo">
                    <img src="../../../src/assets/dinghuo.svg" alt="logo" />
                    <span>易订宝</span>
                </div>
                <Form
                    name="login"
                    form={form}
                    size="large"
                    onFinish={handleLogin}
                >
                    <Form.Item
                        name="用户名"
                        rules={[{ required: true, message: "请输入用户名" }]}
                        style={{marginBottom: 12}}
                    >
                        <Input prefix={<FaRegUser style={{marginRight: 10}} />} placeholder="用户名" onChange={(e) => setLoginData({...loginData, username: e.target.value})}></Input>
                    </Form.Item>
                    <Form.Item
                        name="密码"
                        rules={[{ required: true, message: "请输入密码" }]}
                        style={{marginBottom: 5}}
                    >
                        <Input type="password" prefix={<HiOutlineLockClosed style={{marginRight: 10}} />} placeholder="密码" onChange={(e) => setLoginData({...loginData, password: e.target.value})}></Input>
                    </Form.Item>
                    <Form.Item style={{marginBottom: 0}}>
                        <Flex justify="space-between" align="center" style={{fontSize: 12, padding: "0 2px"}}>
                            <Checkbox style={{fontSize: 12}}>记住密码</Checkbox>
                            <a href="">忘记密码</a>
                        </Flex>
                    </Form.Item>
                    <Form.Item style={{marginBottom: 0}}>
                        <Button type="primary" htmlType="submit" block>登录</Button>
                    </Form.Item>
                    <Form.Item>
                    <Flex justify="space-between" align="center" style={{fontSize: 12}}>
                            <span>没有账号?</span>
                            <a href="/register">注册</a>
                        </Flex>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;