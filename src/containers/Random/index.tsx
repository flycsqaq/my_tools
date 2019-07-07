import React, { useState, Dispatch } from 'react';
import { Form, Card, Button, InputNumber, Switch, Typography, Tabs } from 'antd';
import AntdForm from '@components/Form';
import { DutyChain, uniqueAndReplenish, Execute, getBatchRandomNum } from './plugins';
import * as styles from '@/index.sass';
import random from '../../../docs/article/random.md';
import Markdown from '@components/Markdown';

interface Props {
    form: any;
}

interface RandomNumberFormItem {
    label: string;
    value: number;
    tag: string;
    validator?: (r: any, value: any, callback: Function) => void;
}

type RandomNumberForm = RandomNumberFormItem[];

export default AntdForm((props: Props) => {
    // 表单初始化
    const initValues: RandomNumberForm = [
        {
            label: '最小值(min)',
            value: 0,
            tag: 'min',
            validator: (r: any, value: any, callback: Function) => {
                const { max, min } = props.form.getFieldsValue();
                if (max <= min) {
                    callback('min无法大于min');
                    return;
                }
                callback();
            }
        },
        {
            label: '最大值(max)',
            value: 100,
            tag: 'max',
            validator: (r: any, value: any, callback: Function) => {
                const { max, min } = props.form.getFieldsValue();
                if (max <= min) {
                    callback('max无法小于min');
                    return;
                }
                callback();
            }
        },
        {
            label: '随机数数量(counter)',
            value: 10,
            tag: 'counter',
            validator: (r: any, value: any, callback: Function) => {
                const { max, min, unique, counter } = props.form.getFieldsValue();
                if (!unique && max - min < counter) {
                    callback('在非重复模式下,请保证max - min >= counter');
                    return;
                }
                callback();
            }
        }
    ];

    const [randomNums, setRandomNums]: [number[], Dispatch<number[]>] = useState([] as number[]);

    // 职责链模式
    const removeDuplicates = new DutyChain({ execute: uniqueAndReplenish as Execute, next: null });
    const batch = new DutyChain({ execute: getBatchRandomNum as Execute, next: null });

    // 生成随机数
    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err: any, values: any) => {
            const { max, min, counter, unique } = values;
            if (!err) {
                if (unique) {
                    batch.next = null;
                } else {
                    batch.next = removeDuplicates;
                }
                setRandomNums(batch.delivery([], { min, max, counter }));
            }
        });
    };

    // 排序
    const [sortTag, setSortTag]: [boolean, Dispatch<boolean>] = useState(true);
    const handleSort = () => {
        if (randomNums.length === 0) return;
        const s: boolean = sortTag;
        const arr: number[] = randomNums.slice().sort((l, r) => {
            return s ? l - r : r - l;
        });
        setSortTag(!sortTag);
        setRandomNums(arr);
    };

    const { getFieldDecorator } = props.form;

    // Form样式
    const formItemLayout = {
        labelCol: {
            sm: { span: 4 },
            md: { span: 6 }
        },
        wrapperCol: {
            sm: { span: 24 },
            md: { span: 16 }
        }
    };

    const [mode, setMode]: [boolean, Dispatch<any>] = useState(true);
    return (
        <Tabs defaultActiveKey={'b'}>
            <Tabs.TabPane key={'a'} tab={'工具'}>
                <Typography>
                    <Typography.Title level={2} style={{ textAlign: 'center' }}>
                        随机数生成
                    </Typography.Title>
                </Typography>
                <Form onSubmit={e => handleSubmit(e)} {...formItemLayout}>
                    {initValues.map((init, index) => (
                        <Form.Item key={index} label={init.label}>
                            {getFieldDecorator(init.tag, {
                                rules: [
                                    {
                                        validator: init.validator,
                                        type: 'number'
                                    }
                                ],
                                initialValue: init.value
                            })(<InputNumber style={{ width: '100%' }} />)}
                        </Form.Item>
                    ))}
                    <Form.Item key={'switch'} label={'能否重复'}>
                        {getFieldDecorator('unique', {
                            initialValue: false
                        })(<Switch />)}
                    </Form.Item>
                    <div className={styles.center}>
                        <Button htmlType="submit">随机数生成</Button>
                    </div>
                </Form>
                <Button onClick={() => handleSort()}>排序</Button>
                <Card title="随机数">
                    {randomNums.map((num: number, index: number) => (
                        <Card.Grid key={index} style={{ textAlign: 'center', width: '20%' }}>
                            {num}
                        </Card.Grid>
                    ))}
                </Card>
            </Tabs.TabPane>
            <Tabs.TabPane key={'b'} tab={'代码分析'}>
                <Markdown name={'random'} md={random} />
            </Tabs.TabPane>
        </Tabs>
    );
});
