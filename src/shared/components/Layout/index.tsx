import React, { useState, useEffect, Fragment, Dispatch } from 'react';
import { Layout, Button, Icon, Input, Menu } from 'antd';
import { Motion, spring } from 'react-motion';
import * as styles from '@/index.sass';
import router from '@router/index';
import { Link } from 'react-router-dom';
import { AntdConfigContainer } from '@state/antdConfig';
import { SumIcon, MoonIcon } from '@ant/icon';

const { Sider, Header, Content } = Layout;
const { Search } = Input;
const { SubMenu } = Menu;

interface Props {
    children: JSX.Element;
    location?: {
        pathname: string;
    };
}

interface OpenAction {
    title?: string[];
    path?: string[];
}

const AppLayout = (props: Props) => {
    const [status, setStatus] = useState(true);

    const { antconfig, changeConfig } = AntdConfigContainer.useContainer();
    const headerStyles = {
        height: '64px',
        backgroundColor: antconfig[`${antconfig.theme}Color`],
        justifyContent: 'space-between'
    };
    // 根据loaction获取pathname
    const pathname = () => {
        return (props.location && props.location.pathname) || router[0].pages[0].path;
    };
    // 获取title
    const title = () => {
        const name = pathname();
        return (
            router.find(routeGroup => {
                return routeGroup.pages.some(route => route.path === name);
            }) || router[0]
        ).title;
    };

    // 控制侧边栏菜单的开关
    const [open, setOpen]: [string[][], Dispatch<string[][]>] = useState([[pathname()], [title()]]);

    // 调用setOpen
    const openAction = (action: OpenAction) => {
        const state = open.slice();
        if (action.title) {
            state[1] = action.title;
        }
        if (action.path) {
            state[0] = action.path;
        }
        setOpen(state);
    };

    // 打开多个title
    const addOpenTitle = (key: string) => {
        return Array.from(new Set(open[1].slice().concat(key)));
    };

    // setState是异步的,在同一周期内会对多个 setState 进行批处理.
    useEffect(() => {
        openAction({
            title: addOpenTitle(title()),
            path: [pathname()]
        });
    }, [pathname()]);

    const search = (value: string) => {
        console.log(value);
    };

    // console.log(props.children)
    // useEffect(() => {
    //     // console.log(props.children);
    // }, [pathname()]);
    return (
        <div>
            <Motion style={{ x: spring(status ? 200 : 0) }}>
                {({ x }) => (
                    <Fragment>
                        <Layout
                            style={{
                                position: 'fixed',
                                height: '100vh',
                                color: 'white',
                                width: x,
                                overflowX: 'hidden'
                            }}
                        >
                            <Sider theme={antconfig.theme}>
                                <div
                                    style={{
                                        height: '64px',
                                        padding: '0 10px'
                                    }}
                                    className={styles.center}
                                >
                                    <Search placeholder="search" onSearch={value => search(value)} />
                                </div>
                                <Menu
                                    theme={antconfig.theme}
                                    onClick={x => openAction({ path: [x.key] })}
                                    onOpenChange={x => openAction({ title: x })}
                                    openKeys={open[1]}
                                    selectedKeys={open[0]}
                                    mode="inline"
                                >
                                    {router.map(routeGroup => (
                                        <SubMenu
                                            key={routeGroup.title}
                                            title={
                                                <span>
                                                    {routeGroup.icon ? <Icon type={routeGroup.icon} /> : null}
                                                    <span>{routeGroup.title}</span>
                                                </span>
                                            }
                                        >
                                            {routeGroup.pages.map(page => (
                                                <Menu.Item key={page.path}>
                                                    <Link to={page.path}>
                                                        {page.name}
                                                        {page.isComplete ? null : ' (x)'}
                                                    </Link>
                                                </Menu.Item>
                                            ))}
                                        </SubMenu>
                                    ))}
                                </Menu>
                            </Sider>
                        </Layout>
                        <Layout style={{ marginLeft: x }}>
                            <Header style={headerStyles} className={styles.alignCenter}>
                                <Button onClick={() => setStatus(!status)}>
                                    <Icon
                                        onClick={() => setStatus(!status)}
                                        style={{
                                            transform: `rotate(${180 - x * 0.45}deg)`
                                        }}
                                        type="bars"
                                    />
                                </Button>
                                {antconfig.theme === 'dark' ? (
                                    <MoonIcon
                                        onClick={() => changeConfig({ theme: 'light' })}
                                        className={styles.pointer}
                                    />
                                ) : (
                                    <SumIcon
                                        onClick={() => changeConfig({ theme: 'dark' })}
                                        className={styles.pointer}
                                    />
                                )}
                            </Header>
                            <Content
                                style={{
                                    minHeight: 'calc(100vh - 64px)',
                                    padding: '5px'
                                }}
                            >
                                {props.children}
                            </Content>
                        </Layout>
                    </Fragment>
                )}
            </Motion>
        </div>
    );
};

export default AppLayout;
