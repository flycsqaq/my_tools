import React, { useState, Fragment, Dispatch } from 'react';
import { Motion, StaggeredMotion, TransitionMotion, spring, PlainStyle } from 'react-motion';
import { Tabs, Button, Switch } from 'antd';

interface TabState {
    Component: () => JSX.Element;
    tabName: string;
}

interface HeightObj extends PlainStyle {
    h: number;
}

interface SizeObj {
    key: string;
    size: number;
}

export default () => {
    const MotionDemo = () => {
        const [size, setSize] = useState(100);
        const [state, setState] = useState(false);

        return (
            <Fragment>
                <Switch defaultChecked={state} onClick={() => setState(!state)} />
                是否开启动画
                <div className={'btn-group'}>
                    <Button onClick={() => setSize(size + 100)}>large</Button>
                    <Button onClick={() => setSize(size - 100)}>small</Button>
                </div>
                <Motion style={{ x: state ? spring(size) : size }}>
                    {interpolatingStyle => {
                        return (
                            <div
                                style={{
                                    backgroundColor: '#5fabca',
                                    width: interpolatingStyle.x,
                                    height: interpolatingStyle.x
                                }}
                            />
                        );
                    }}
                </Motion>
            </Fragment>
        );
    };

    // 依赖前一个组件的上一次的值
    const StaggeredMotionDemo = () => {
        const initStyle: HeightObj[] = [
            {
                h: 0
            },
            {
                h: 0
            },
            {
                h: 0
            }
        ];
        const [size, setSize]: [number, Dispatch<number>] = useState(100);
        return (
            <Fragment>
                <Button onClick={() => setSize(size === 0 ? 100 : 0)}>go!!</Button>
                <StaggeredMotion
                    defaultStyles={initStyle}
                    styles={(pre: PlainStyle[] | undefined) => {
                        if (!pre) return [];
                        return pre.map((_: any, i: number) => {
                            return i === 0 ? { h: spring(size) } : { h: spring(pre[i - 1].h) };
                        });
                    }}
                >
                    {(pre: HeightObj[]) => (
                        <div>
                            {pre.map((p: HeightObj, i: number) => (
                                <div
                                    key={i}
                                    style={{ width: p.h, height: p.h, borderRadius: '50%', backgroundColor: '#585858' }}
                                />
                            ))}
                        </div>
                    )}
                </StaggeredMotion>
            </Fragment>
        );
    };
    const TransitionMotionDemo = () => {
        const initialState: SizeObj[] = [
            {
                key: 'a',
                size: 100
            },
            {
                key: 'b',
                size: 200
            },
            {
                key: 'c',
                size: 300
            }
        ];
        const [state, setState] = useState(initialState);
        return (
            <TransitionMotion
                willLeave={() => ({ width: spring(0), height: spring(0) })}
                willEnter={() => ({ opacity: 0.5 })}
                styles={state.map(item => ({
                    key: item.key,
                    style: { width: item.size, height: item.size }
                }))}
            >
                {inter => (
                    <div>
                        {inter.map(config => {
                            return <div key={config.key} style={{ ...config.style, border: '1px solid' }} />;
                        })}
                    </div>
                )}
            </TransitionMotion>
        );
    };
    const tabs: TabState[] = [
        {
            tabName: 'motion',
            Component: MotionDemo
        },
        {
            tabName: 'staggeredMotion',
            Component: StaggeredMotionDemo
        },
        {
            tabName: 'transitionMotion',
            Component: TransitionMotionDemo
        }
    ];

    return (
        <Tabs defaultActiveKey={'transitionMotion'}>
            {tabs.map(tab => (
                <Tabs.TabPane tab={tab.tabName} key={tab.tabName}>
                    <tab.Component />
                </Tabs.TabPane>
            ))}
        </Tabs>
    );
};
