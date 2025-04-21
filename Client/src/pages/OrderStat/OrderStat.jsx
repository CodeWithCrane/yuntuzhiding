import { Button, Form, Select, Input, Radio, Flex, DatePicker, Divider } from "antd";
import { useState, useEffect, useRef } from "react";
import moment from "moment";
import dayjs from "dayjs";
import Echarts from "echarts-for-react";

const { RangePicker } = DatePicker;

const OrderStat = () => {
    const [radioValue, setRadioValue] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [time, setTime] = useState([dayjs("2024/08/01", "YYYY-MM-DD"), dayjs("2024/08/31", "YYYY-MM-DD")]);
    const [option, setOption] = useState();

    const thisWeek = {
        // title: {
        //     text: "本周"
        // },
        tooltip: {
            formatter: (params) => `<div>
                <div>${params.name}</div>
                <div style="display: flex; align-items: center;">
                    <div style="display: inline-block; width: 10px; height: 10px; background-color: ${params.color}; border-radius: 50%; margin-right: 5px"></div>
                    <span>${params.seriesName}</span>
                    <span style="display: inline-block; margin-left: 10px; font-weight: bold;">${params.value.toLocaleString()}</span>
                </div>
            </div>`
        },
        xAxis: {
            type: "category",
            data: ["2024/8/19", "2024/8/20", "2024/8/21", "2024/8/22", "2024/8/23", "2024/8/24", "2024/8/25"],
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                name: "订单数量",
                data: [220, 300, 220, 330, 380, 600, 700],
                type: "line"
            }
        ],
        legend: {
            orient: "vertical",
            top: "center",
            right: "10px"
        }
    };

    const lastWeek = {
        tooltip: {
            formatter: (params) => `<div>
                <div>${params.name}</div>
                <div style="display: flex; align-items: center;">
                    <div style="display: inline-block; width: 10px; height: 10px; background-color: ${params.color}; border-radius: 50%; margin-right: 5px"></div>
                    <span>${params.seriesName}</span>
                    <span style="display: inline-block; margin-left: 10px; font-weight: bold;">${params.value.toLocaleString()}</span>
                </div>
            </div>`
        },
        xAxis: {
            type: "category",
            data: ["2024/8/19", "2024/8/20", "2024/8/21", "2024/8/22", "2024/8/23", "2024/8/24", "2024/8/25"],
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                name: "订单数量",
                data: [200, 210, 300, 300, 410, 420, 450],
                type: "line"
            }
        ],
        legend: {
            orient: "vertical",
            top: "center",
            right: "10px"
        }
    };
    
    const thisMonth = {
        tooltip: {
            formatter: (params) => `<div>
                <div>${params.name}</div>
                <div style="display: flex; align-items: center;">
                    <div style="display: inline-block; width: 10px; height: 10px; background-color: ${params.color}; border-radius: 50%; margin-right: 5px"></div>
                    <span>${params.seriesName}</span>
                    <span style="display: inline-block; margin-left: 10px; font-weight: bold;">${params.value.toLocaleString()}</span>
                </div>
            </div>`
        },
        xAxis: {
            type: "category",
            data: [
                "2024/8/1", "2024/8/2", "2024/8/3", "2024/8/4", "2024/8/5",
                "2024/8/6", "2024/8/7", "2024/8/8", "2024/8/9", "2024/8/10",
                "2024/8/11", "2024/8/12", "2024/8/13", "2024/8/14", "2024/8/15",
                "2024/8/16", "2024/8/17", "2024/8/18", "2024/8/19", "2024/8/20",
                "2024/8/21", "2024/8/22", "2024/8/23", "2024/8/24", "2024/8/25",
                "2024/8/26", "2024/8/27", "2024/8/28", "2024/8/29", "2024/8/30", "2024/8/31"
            ],
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                name: "订单数量",
                data: [446, 399, 300, 576, 388, 334, 610, 257, 405, 203, 383, 443, 540, 608, 240, 354, 520, 610, 555, 490, 457, 273, 200, 500, 398, 512, 506, 494, 310, 458, 490],
                type: "line"
            }
        ],
        legend: {
            orient: "vertical",
            top: "center",
            right: "10px"
        }
    };

    const lastMonth = {
        tooltip: {
            formatter: (params) => `<div>
                <div>${params.name}</div>
                <div style="display: flex; align-items: center;">
                    <div style="display: inline-block; width: 10px; height: 10px; background-color: ${params.color}; border-radius: 50%; margin-right: 5px"></div>
                    <span>${params.seriesName}</span>
                    <span style="display: inline-block; margin-left: 10px; font-weight: bold;">${params.value.toLocaleString()}</span>
                </div>
            </div>`
        },
        xAxis: {
            type: "category",
            data: [
                "2024/8/1", "2024/8/2", "2024/8/3", "2024/8/4", "2024/8/5",
                "2024/8/6", "2024/8/7", "2024/8/8", "2024/8/9", "2024/8/10",
                "2024/8/11", "2024/8/12", "2024/8/13", "2024/8/14", "2024/8/15",
                "2024/8/16", "2024/8/17", "2024/8/18", "2024/8/19", "2024/8/20",
                "2024/8/21", "2024/8/22", "2024/8/23", "2024/8/24", "2024/8/25",
                "2024/8/26", "2024/8/27", "2024/8/28", "2024/8/29", "2024/8/30", "2024/8/31"
            ],
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                name: "订单数量",
                data: [266, 342, 209, 432, 347, 389, 610, 356, 393, 257, 470, 616, 370, 216, 592, 235, 477, 267, 235, 444, 459, 603, 321, 295, 318, 253, 556, 472, 450, 423, 388],
                type: "line",
                // symbolSize: 5,
            }
        ],
        legend: {
            orient: "vertical",
            top: "center",
            right: "10px"
        }
    };

    return (
        <div style={{padding: 24}}>
            <Flex align="center" gap={20} style={{ marginBottom: 20 }}>
                <Radio.Group buttonStyle="outline" defaultValue="本周" onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
                    <Radio.Button value="本周" onClick={() => setOption(thisWeek)}>本周</Radio.Button>
                    <Radio.Button value="上周" onClick={() => setOption(lastWeek)}>上周</Radio.Button>
                    <Radio.Button value="本月" onClick={() => setOption(thisMonth)}>本月</Radio.Button>
                    <Radio.Button value="上月" onClick={() => setOption(lastMonth)}>上月</Radio.Button>
                </Radio.Group>
                <RangePicker
                    // showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD"
                    // defaultValue={[moment("2024-8-1", "YYYY-MM-DD"), moment("2024-8-31", "YYYY-MM-DD")]}
                    value={time}
                    onChange={(value, dateString) => {
                        setStartTime(value[0]);
                        setEndTime(value[1]);
                        setTime(value);
                        console.log(value);
                    }}
                    onOk={() => console.log(time)}
                />
            </Flex>
            {/* <div style={{ border: "1px solid #d9d9d9", borderRadius: 5 }}> */}
            <div>
                <Flex align="center" style={{ height: 80, marginBottom: 32, backgroundColor: "whitesmoke" }}>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontWeight: 400, fontSize: "1rem", color: "gray" }}>
                        <div>订货单</div>
                        <div style={{ marginTop: 10, color: "black", fontWeight: 500 }}>{0}</div>
                    </div>
                    <Divider type="vertical" style={{ height: 50 }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontWeight: 400, fontSize: "1rem", color: "gray" }}>
                        <div>退货单</div>
                        <div style={{ marginTop: 10, color: "black", fontWeight: 500 }}>{0}</div>
                    </div>
                    <Divider type="vertical" style={{ height: 50 }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontWeight: 400, fontSize: "1rem", color: "gray" }}>
                        <div>订货用户</div>
                        <div style={{ marginTop: 10, color: "black", fontWeight: 500 }}>{0}</div>
                    </div>
                    <Divider type="vertical" style={{ height: 50 }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontWeight: 400, fontSize: "1rem", color: "gray" }}>
                        <div>退货用户</div>
                        <div style={{ marginTop: 10, color: "black", fontWeight: 500 }}>{0}</div>
                    </div>
                    <Divider type="vertical" style={{ height: 50 }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontWeight: 400, fontSize: "1rem", color: "gray" }}>
                        <div>订货金额</div>
                        <div style={{ marginTop: 10, color: "black", fontWeight: 500 }}>¥0.00</div>
                    </div>
                    <Divider type="vertical" style={{ height: 50 }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontWeight: 400, fontSize: "1rem", color: "gray" }}>
                        <div>退货金额</div>
                        <div style={{ marginTop: 10, color: "black", fontWeight: 500 }}>¥0.00</div>
                    </div>
                    <Divider type="vertical" style={{ height: 50 }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontWeight: 400, fontSize: "1rem", color: "gray" }}>
                        <div>金额合计</div>
                        <div style={{ marginTop: 10, color: "black", fontWeight: 500 }}>¥0.00</div>
                    </div>
                </Flex>
                <Echarts option={option || thisWeek} style={{ width: 1200, height: 600 }} />
            </div>
        </div>
    );
};

export default OrderStat;