import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Typography, Input, InputNumber, Select, Flex, Row, Col, Divider, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "../../utils/axios";



const EditCommodity = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const commodityId = urlSearchParams.get("id");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: "", commodityNumber: "", category: "", address: "", unit: "", price: 0, inventory: 0, imageURL: "", description: "" });
    const [imageURL, setImageURL] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const uploadRef = useRef();

    useEffect(() => {
        try {
            const getCommodity = async () => {
                setLoading(true);
                const res = await axios.get(`/commodity/${commodityId}`);
                console.log(res.data);
                setLoading(false);
                setImageURL(res.data.imageURL);
                setFormData(res.data);
            };
            getCommodity();
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    const handleUpload = (e) => {
        const image = e.target.files[0];
        if (!image) {
            return;
        }
        setImageLoading(true);
        const reader = new FileReader();
        reader.onload = () => {
            const dataURL = reader.result;
            setImageLoading(false);
            setImageURL(dataURL);
            setFormData({
                ...formData,
                imageURL: dataURL
            })
        };
        reader.readAsDataURL(image);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            console.log("hello world");
            console.log(formData);
            const res = await axios.put(`/commodity/${commodityId}`, formData);
            if (res.status === 200) {
                message.success("更新成功");
                navigate("/commodities");
            }
        } catch (error) {
            console.log(error.message);
            message.error(error.message);
        }
    };

    return (
        <div style={{padding: 24}}>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div style={{ clear: "both" }}>
                        <h4 style={{ fontSize: "1.5rem", color: "#1296db" }}>基本信息</h4>
                        <Divider />
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Row>
                                <Col md={24} lg={12}>
                                    <Form.Item name="商品名称" label="商品名称" rules={[{ required: true, message: "请输入商品名称" }]}>
                                        <Input id="name" defaultValue={formData.name} onChange={handleChange}></Input>
                                    </Form.Item>
                                </Col>
                                <Col md={24} lg={12}>
                                    <Form.Item name="商品编号" label="商品编号" rules={[{ required: true, message: "请输入编号" }]}>
                                        <Input id="commodityNumber" defaultValue={formData.commodityNumber} onChange={handleChange}></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col md={24} lg={12}>
                                    <Form.Item name="种类" label="种类" rules={[{ required: true }]}>
                                        <Select defaultValue={formData.category} onChange={(value) => setFormData({ ...formData, category: value })}>
                                            <Option value="水果">水果</Option>
                                            <Option value="蔬菜">蔬菜</Option>
                                            <Option value="肉类">肉类</Option>
                                            <Option value="饮料">饮料</Option>
                                            <Option value="主食">主食</Option>
                                            <Option value="油脂">油脂</Option>
                                            <Option value="调料">调料</Option>
                                            <Option value="未知">未知</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col md={24} lg={12}>
                                    <Form.Item name="产地" label="产地" rules={[{ required: true }]}>
                                        <Input id="address" defaultValue={formData.address} onChange={handleChange}></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={24} lg={12}>
                                    <Form.Item name="计量单位" label="计量单位" rules={[{ required: true }]}>
                                        <Select defaultValue={formData.unit} onSelect={(value) => setFormData({ ...formData, unit: value })}>
                                            <Option value="斤">斤</Option>
                                            <Option value="千克">千克</Option>
                                            <Option value="件">件</Option>
                                            <Option value="个">个</Option>
                                            <Option value="瓶">瓶</Option>
                                            <Option value="盒">盒</Option>
                                            <Option value="箱">箱</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col md={24} lg={12}>
                                    <Form.Item name="价格" label="价格" rules={[{ required: true }]}>
                                        <InputNumber id="price" defaultValue={formData.price} onChange={(value) => setFormData({...formData, price: value})}></InputNumber>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={24} lg={12}>
                                    <Form.Item name="库存" label="库存" rules={[{ required: true }]}>
                                        <InputNumber id="inventory" defaultValue={formData.inventory} onChange={(value) => setFormData({...formData, inventory: value})}></InputNumber>
                                    </Form.Item>
                                </Col>
                                <Col md={24} lg={12}>
                                </Col>
                            </Row>
                        </Form>
                        <h4 style={{ fontSize: "1.5rem", color: "#1296db" }}>图片信息</h4>
                        <Divider />
                        <Row>
                            <Col offset={2}>
                                <input type="file" ref={uploadRef} style={{ display: "none" }} onChange={handleUpload} />
                                <div style={{ width: 100, height: 100, border: "1px solid #333", borderRadius: 5, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center", alignItems: "center", marginBottom: 10 }} onClick={() => uploadRef.current.click()}>
                                    {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
                                    <div>Upload</div>
                                </div>
                                {
                                    imageURL && <div style={{ width: 100, height: 100, border: "1px solid #333", borderRadius: 5 }}>
                                        <img src={imageURL} alt="商品图片" style={{ width: "100%", height: "100%", borderRadius: 5, objectFit: "cover" }} />
                                    </div>
                                }
                            </Col>
                        </Row>
                        <h4 style={{ fontSize: "1.5rem", color: "#1296db", marginTop: 10, marginBottom: 30 }}>商品描述</h4>
                        <ReactQuill
                            theme="snow"
                            required
                            onChange={(value) => setFormData({ ...formData, description: value })}
                            style={{ width: "60%", height: "400px", marginBottom: 75 }}
                        />
                        <Flex align="center" gap={40} style={{ marginBottom: 20 }}>
                            <Button type="primary" onClick={handleSubmit} >更新</Button>
                            <Button type="default" onClick={() => navigate("/commodities")}>取消</Button>
                        </Flex>
                    </div>
                )
            }
        </div>
    );
};

export default EditCommodity;