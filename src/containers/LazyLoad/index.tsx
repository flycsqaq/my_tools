import React, { useEffect, useState } from 'react';
import LazyLoad from './showPic';
import { loadImage } from './proxy';
import { Tabs } from 'antd';
import Markdown from '@components/Markdown';
import lazyLoad from '../../../docs/article/lazyLoad.md';

export default () => {
    const getImages = () => {
        const imgArr = [];
        for (let i = 1; i < 11; i++) {
            imgArr.push(require(`../../assets/images/lazy/Sylvanas${i}.jpg`));
        }
        return imgArr;
    };
    const imgs = getImages();
    const handleChangeProxy = (proxy: string) => {
        // task -> layout(dom) -> task 将task放在layout之后
        const newServer: any = loadImage();
        if (server !== null) {
            server.disconnect();
        }
        setTimeout(() => {
            newServer.popularEls();
            const Img = newServer[proxy];
            newServer.changeProxy(new Img());
            newServer.observes();
            if (server !== null) {
                server.disconnect();
                setServer(newServer);
            }
            setServer(server);
        }, 0);
        return newServer;
    };

    const [servername, setServername] = useState('ImageProxy');
    const [server, setServer] = useState(null as any);
    useEffect(() => {
        const serve = handleChangeProxy(servername);
        return () => {
            serve.disconnect();
        };
    }, [servername]);
    const handleChange = (x: string) => {
        if (x === 'code') return;
        setServername(x);
    };
    return (
        <Tabs defaultActiveKey={'ImageProxy'} onChange={x => handleChange(x)}>
            <Tabs.TabPane key={'ImageProxy'} tab={'普通懒加载'}>
                <LazyLoad imgs={imgs} />;
            </Tabs.TabPane>
            <Tabs.TabPane key={'ThrottlingProxy'} tab={'节流'}>
                <LazyLoad imgs={imgs} />;
            </Tabs.TabPane>
            <Tabs.TabPane key={'DebounceProxy'} tab={'防抖'}>
                <LazyLoad imgs={imgs} />;
            </Tabs.TabPane>
            <Tabs.TabPane key={'code'} tab={'代码分析'}>
                <Markdown name={'lazyLoad'} md={lazyLoad} />
            </Tabs.TabPane>
        </Tabs>
    );
};
