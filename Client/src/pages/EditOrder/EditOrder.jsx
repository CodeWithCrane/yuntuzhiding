import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Flex, Input, DatePicker, message, Select, InputNumber } from "antd";
import axios from "../../utils/axios";
import moment from "moment";

const { RangePicker } = DatePicker;

const EditOrder = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({ user: "", phoneNumber: "", address: "", cost: 0, deliveryTime: new Date(), handler: "" });
    const [id, setId] = useState("");

    const handleChange = (e) => {
        setOrderData({
            ...orderData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const urlSearchParams = new URLSearchParams(location.search);
            const id = urlSearchParams.get("id");
            const res = await axios.put(`/order/${id}`, order);
            if (res.status === 200) {
                message.success("更新成功");
                navigate("/orders");
            }
        } catch (error) {
            console.log(error.message);
            message.error(error.message);
        }
    };

    useEffect(() => {
        try {
            setLoading(true);
            const urlSearchParams = new URLSearchParams(location.search);
            const id = urlSearchParams.get("id");
            const getOrder = async () => {
                const res = await axios.get(`/order/${id}`);
                console.log(res);
                setLoading(false);
                setOrder(res.data);
            };
            getOrder();
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    return (
        <div style={{padding: 24}}>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <Form
                        name="order"
                        form={form}
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 6 }}
                    >
                        <Form.Item name="user" label="客户名称" rules={[{ required: true }]}>
                            <Input id="user" defaultValue={order.user} onChange={handleChange}></Input>
                        </Form.Item>
                        <Form.Item name="phoneNumber" label="联系方式" rules={[{ required: true }]}>
                            <Input id="phoneNumber" defaultValue={order.phoneNumber} onChange={handleChange}></Input>
                        </Form.Item>
                        <Form.Item name="address" label="收货地址" rules={[{ required: true }]}>
                            <Input id="address" defaultValue={order.address} onChange={handleChange}></Input>
                        </Form.Item>
                        <Form.Item name="cost" label="应付金额" rules={[{ required: true }]}>
                            <InputNumber defaultValue={order.cost} onChange={(value) => {
                                setOrderData({
                                    ...orderData,
                                    cost: value
                                })
                            }}></InputNumber>
                        </Form.Item>
                        <Form.Item name="deliveryState" label="物流状态" rules={[{ required: true }]}>
                            <Select id="deliveryState" defaultValue={order.deliveryState} onSelect={(value) => setOrder({ ...order, deliveryState: value })}>
                                <Option value="待出库">待出库</Option>
                                <Option value="已发货">已发货</Option>
                                <Option value="配送中">配送中</Option>
                                <Option value="已签收">已签收</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="orderState" label="订单状态" rules={[{ required: true }]}>
                            <Select id="orderState" defaultValue={order.orderState} onSelect={(value) => setOrder({ ...order, orderState: value })}>
                                <Option value="已完成">已完成</Option>
                                <Option value="待处理">待处理</Option>
                                <Option value="已作废">已作废</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="deliveryTime" label="收货时间" rules={[{ required: true }]}>
                            <DatePicker defaultValue={moment(order.deliveryTime)} placeholder="请选择" disabled />
                        </Form.Item>
                        <Form.Item name="handler" label="处理人" rules={[{ required: true }]} >
                            <Input id="handler" defaultValue={order.handler} onChange={handleChange}></Input>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 8, offset: 2 }} style={{ marginTop: 20 }}>
                            <Flex align="center" gap={20}>
                                <Button type="default" onClick={() => navigate("/orders")}>取消</Button>
                                <Button type="primary" onClick={handleSubmit}>提交</Button>
                            </Flex>
                        </Form.Item>
                    </Form>
                )
            }
        </div>
    );
};

export default EditOrder;