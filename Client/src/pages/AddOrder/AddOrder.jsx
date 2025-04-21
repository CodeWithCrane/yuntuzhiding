import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Flex, Input, DatePicker, message, Select, InputNumber } from "antd";
import axios from "../../utils/axios";

const { RangePicker } = DatePicker;

const AddOrder = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [orderData, setOrderData] = useState({ user: "", phoneNumber: "", address: "", cost: 0, deliveryTime: new Date(), handler: "" });

    const handleChange = (e) => {
        setOrderData({
            ...orderData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post("/order", orderData);
            console.log(res);
            if (res.status === 200) {
                message.success("添加成功");
                navigate("/orders");
            }
        } catch (error) {
            console.log(error.message);
            message.error(error.message);
        }
    };

    return (
        <div style={{padding: 24}}>
            <Form
                name="order"
                form={form}
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 6 }}
            >
                <Form.Item name="user" label="客户名称" rules={[{ required: true }]}>
                    <Input id="user" placeholder="请输入用户" onChange={handleChange}></Input>
                </Form.Item>
                <Form.Item name="phoneNumber" label="联系方式" rules={[{ required: true }]}>
                    <Input id="phoneNumber" placeholder="请输入电话号码" onChange={handleChange}></Input>
                </Form.Item>
                <Form.Item name="address" label="收货地址" rules={[{ required: true }]}>
                    <Input id="address" placeholder="请输入收货地址" onChange={handleChange}></Input>
                </Form.Item>
                <Form.Item name="cost" label="应付金额" rules={[{ required: true }]}>
                    <InputNumber placeholder={0} onChange={(value) => {
                        setOrderData({
                            ...orderData,
                            cost: value
                        })
                    }}></InputNumber>
                </Form.Item>
                {/* <Form.Item name="deliveryState" label="物流状态" rules={[{required: true}]}>
                    <Input id="deliveryState" placeholder="请输入"></Input>
                </Form.Item>
                <Form.Item name="orderState" label="订单状态" rules={[{required: true}]}>
                    <Input id="orderState" placeholder="请选择"></Input>
                </Form.Item> */}
                <Form.Item name="deliveryTime" label="收货时间" rules={[{ required: true }]}>
                    <DatePicker placeholder="请选择" />
                </Form.Item>
                <Form.Item name="handler" label="处理人" rules={[{ required: true }]}>
                    <Input id="handler" placeholder="请输入" onChange={handleChange}></Input>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 8, offset: 2 }} style={{marginTop: 20}}>
                    <Flex align="center" gap={20}>
                        <Button type="default">取消</Button>
                        <Button type="primary" onClick={handleSubmit}>提交</Button>
                    </Flex>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddOrder;