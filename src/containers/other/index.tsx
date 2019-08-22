import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Divider } from 'antd';

interface Api {
    context: string; 
    id: number; 
    visitId: string; 
    hisPtId: string; 
    regId: number; 
    recorder: {
        name: string; 
        id: number
    }; 
    cardNo: string; 
    patientName: string; 
    sex: number; 
    recordTime: string; 
    formId: number; 
    score: number;
    age?: string;
    dept?: string;
    record: string[]
}

interface Data extends Api {
    recorderName: string;
    seq: number;
}

const api: Api[] = [
    {
        context: "0602040000", 
        id: 8, 
        visitId: "6668542", 
        hisPtId: "0002607105", 
        regId: 5, 
        recorder: {
            name: "超级管理员", 
            id: 1
        }, 
        cardNo: "0002607105", 
        patientName: "童华娅", 
        sex: 2, 
        recordTime: "2019-08-15 10:33:47", 
        formId: 1, 
        score: 12,
        record: [
            '',
            '骨痛病',
            '(显示治疗项目)',
            '(显示手法)'
        ]
    },
    {
        context: "^脊椎病,骨痹病^温针 1 次",
        id: 41, 
        visitId: "6677934", 
        hisPtId: "0002450053", 
        regId: 17, 
        recorder: {
            name: "超级管理员", 
            id: 1
        }, 
        cardNo: "0002450053", 
        patientName: "宋娟", 
        age: "40岁", 
        sex: 2, 
        recordTime: "2019-08-22 15:13:32", 
        formId: 3, 
        score: 0, 
        dept: "针灸科门诊",
        record: [
            '',
            '骨痛病',
            '(显示治疗项目)',
            '(显示手法)'
        ]
    }
]
const changeData = (arr: Api[]): Data[] => {
    return arr.map((item, index) => ({
        ...item,
        recorderName: item.recorder.name,
        seq: index + 1
    }))
}

const dataSource = changeData(api)

const columns = [
    {
        title: '序号',
        dataIndex: 'seq',
        key: 'seq',
        align: 'center'
    },
    {
        title: '记录时间',
        dataIndex: 'recordTime',
        key: 'recordTime',
        align: 'center'
    },
    {
        title: '记录者',
        dataIndex: 'recorderName',
        key: 'recorderName',
        align: 'center'
    },
]

const centerStyle = {
    display: 'flex', 
    justifyContent: 'center'
}

const borderStyle = {
    border: '1px solid #C0C0C0',
    minHeight: 100,
    marginBottom: 20,
    padding: 5,
}
const rightStyle = {
    display: 'flex', 
    justifyContent: 'flex-end'
}

const rowHeight = '1.3em'

const borderBottomStyle = {
    // ...centerStyle,
    height: rowHeight,
    borderBottom: '1px solid'
}

export default () => {
    // const [id, setId] = useState(dataSource[0].id)
    const id = dataSource[0].id
    // const showData = dataSource.find(item => item.id = id) as Data
    const [showData, setShowData] = useState(dataSource.find(item => item.id === id) as Data)
    // useEffect(() => {
    //     setShowData()
    // }, [id])
    return (
        <Row style={{padding: 10}}>
            <Col span={15} style={{...centerStyle, boxShadow: '3px -3px 3px #888888 inset', padding: '10px 0', border: '1px solid #707070'}}>
                <Col span={22}>
                    <Row style={centerStyle}>
                        <Col span={12}>
                            <Row style={{...centerStyle, fontSize: 25}}>南京市中医院</Row>
                            <Row style={{...centerStyle, fontSize: 22}}>南京市中医院大学附属南京中医院</Row>
                            <Row style={{...centerStyle, fontSize: 18}}>治疗记录单</Row>
                        </Col>
                    </Row>
                    <Row style={{height: rowHeight}}>
                        <Col span={4}>
                            <Col span={9}>
                                门诊号：
                            </Col>
                            <Col span={12} style={borderBottomStyle}>
                                {showData.visitId}
                            </Col>
                        </Col>
                        <Col span={4}>
                            <Col span={7}>
                                姓名：
                            </Col>
                            <Col span={12} style={borderBottomStyle}>                          
                                {showData.patientName}
                            </Col>
                        </Col>
                        <Col span={4}>
                            <Col span={7}>
                                性别：
                            </Col>
                            <Col span={12} style={borderBottomStyle}>
                                {showData.sex === 1 ? '男' : '女'}
                            </Col>
                        </Col>
                        <Col span={4}>
                            <Col span={7}>
                                年龄：
                            </Col>
                            <Col span={12} style={borderBottomStyle}>
                                {showData.age}
                            </Col>
                        </Col>
                        <Col span={4}>
                            <Col span={11}>
                                就诊卡号：
                            </Col>
                            <Col span={12} style={borderBottomStyle}>
                                {showData.cardNo}
                            </Col>
                        </Col>
                        <Col span={4}>
                            <Col span={7}>
                                科室：
                            </Col>
                            <Col span={12} style={borderBottomStyle}>
                                {showData.dept}
                            </Col>
                        </Col>
                    </Row>
                    <Divider style={{margin: '10px 0'}} />
                    <Row>
                        诊断：
                        {showData.record[1]}
                    </Row>
                    <Row>
                        治疗计划：
                    </Row>
                    <Row style={borderStyle}>
                        {showData.record[2]}
                    </Row>
                    <Row>
                        处方：
                    </Row>
                    <Row style={borderStyle}>
                        {showData.record[3]}
                    </Row>
                    <Row>
                        疗程：
                    </Row>
                    <Row style={borderStyle}>
                        {showData.record[4]}
                    </Row>
                    <Row>
                        健康教育：
                    </Row>
                    <Row style={borderStyle}>
                        {showData.record[5]}
                    </Row>
                    <Row>
                        备注：
                    </Row>
                    <Row style={borderStyle}>
                        {showData.record[6]}
                    </Row>
                    <Row style={rightStyle}>
                        <Col>
                            医生签名：
                        </Col>
                        <Col span={1}>
                        </Col>
                        <Col>
                            {showData.recorderName}
                        </Col>
                    </Row>
                    <Row style={rightStyle}>
                        <Col>
                            清单时间：
                        </Col>
                        <Col span={1}>
                        </Col>
                        <Col>
                            {showData.recordTime}
                        </Col>
                    </Row>
                </Col>
            </Col>
            <Col span={1} />
            <Col span={8}>
                <Table 
                    onRow={record => {
                        return {
                            onClick: () => {
                                setShowData(dataSource.find(item => item.id === record.id) as Data)
                                console.log(showData)
                            }
                        }
                    }} 
                    dataSource={dataSource} 
                    pagination={false} 
                    bordered 
                    columns={columns}
                />
            </Col>
        </Row>
    )
}