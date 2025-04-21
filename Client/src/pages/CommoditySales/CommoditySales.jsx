import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Radio, Flex, Input, DatePicker } from "antd";
import Echarts from "echarts-for-react";
import dayjs from "dayjs";
import moment from "moment";

const { RangePicker } = DatePicker;

const CommoditySales = () => {
    const [value, setValue] = useState("本周");
    const [time, setTime] = useState([dayjs("2024/08/01", "YYYY-MM-DD"), dayjs("2024/08/31", "YYYY-MM-DD")]);
    const [option, setOption] = useState(null);

    const thisWeek = {
        title: {
            text: "商品销售"
        },
        tooltip: {
            trigger: "item"
        },
        series: [
            {
                name: "商品销售",
                type: "pie",
                data: [
                    { name: "蔬菜", value: 5000 },
                    { name: "肉类", value: 6000 },
                    { name: "饮料", value: 3000 },
                    { name: "水果", value: 2000 },
                    { name: "主食", value: 6000 },
                    // { name: "油脂", value: 2000 },
                    // { name: "调料", value: 1000 },
                    { name: "其他", value: 3000 }
                ]
            }
        ],
        legend: {
            orient: "vertical",
            top: "bottom",
            right: "right"
        }
    };

    const lastWeek = {
        title: {
            text: "商品销售"
        },
        tooltip: {
            trigger: "item"
        },
        series: [
            {
                name: "商品销售",
                type: "pie",
                data: [
                    { name: "蔬菜", value: 4000 },
                    { name: "肉类", value: 7000 },
                    { name: "饮料", value: 2000 },
                    { name: "水果", value: 2500 },
                    { name: "主食", value: 5000 },
                    // { name: "油脂", value: 2000 },
                    // { name: "调料", value: 1000 },
                    { name: "其他", value: 2000 }
                ]
            }
        ],
        legend: {
            orient: "vertical",
            top: "bottom",
            right: "right"
        }
    };

    const thisMonth = {
        title: {
            text: "商品销售"
        },
        tooltip: {
            trigger: "item"
        },
        series: [
            {
                name: "商品销售",
                type: "pie",
                data: [
                    { name: "蔬菜", value: 11000 },
                    { name: "肉类", value: 22000 },
                    { name: "饮料", value: 6000 },
                    { name: "水果", value: 4000 },
                    { name: "主食", value: 12000 },
                    // { name: "油脂", value: 2000 },
                    // { name: "调料", value: 1000 },
                    { name: "其他", value: 7000 }
                ]
            }
        ],
        legend: {
            orient: "vertical",
            top: "bottom",
            right: "right"
        }
    };

    const lastMonth = {
        title: {
            text: "商品销售"
        },
        tooltip: {
            trigger: "item"
        },
        series: [
            {
                name: "商品销售",
                type: "pie",
                data: [
                    { name: "蔬菜", value: 12000 },
                    { name: "肉类", value: 20000 },
                    { name: "饮料", value: 4000 },
                    { name: "水果", value: 5000 },
                    { name: "主食", value: 12000 },
                    // { name: "油脂", value: 2000 },
                    // { name: "调料", value: 1000 },
                    { name: "其他", value: 8000 }
                ]
            }
        ],
        legend: {
            orient: "vertical",
            top: "bottom",
            right: "right"
        }
    };

    return (
        <div style={{ padding: 24 }}>
            <Flex align="center" style={{ gap: 20, marginBottom: 32 }}>
                <Radio.Group buttonStyle="outline" defaultValue="本周" value={value} onChange={(e) => setValue(e.target.value)}>
                    <Radio.Button value="本周" onClick={() => setOption(thisWeek)}>本周</Radio.Button>
                    <Radio.Button value="上周" onClick={() => setOption(lastWeek)}>上周</Radio.Button>
                    <Radio.Button value="本月" onClick={() => setOption(thisMonth)}>本月</Radio.Button>
                    <Radio.Button value="上月" onClick={() => setOption(lastMonth)}>上月</Radio.Button>
                </Radio.Group>
                <RangePicker
                    format="YYYY-MM-DD"
                    value={time}
                />
            </Flex>
            <Echarts option={option || thisWeek} style={{ width: 1200, height: 600 }} />
        </div>
    );
};

export default CommoditySales;