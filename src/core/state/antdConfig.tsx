import { useState, Dispatch } from 'react';
import { createContainer } from 'unstated-next';

interface AntdConfig {
    theme: 'dark' | 'light';
    [x: string]: any;
}

interface ConfigAction {
    theme: 'dark' | 'light';
    [x: string]: any;
}

function AntdesignConfig() {
    const initConfig: AntdConfig = {
        theme: 'dark',
        darkColor: '#001529',
        lightColor: '#fff'
    };
    const [antconfig, setConfig]: [AntdConfig, Dispatch<AntdConfig>] = useState(initConfig);
    const changeConfig = (action: ConfigAction) => {
        const configState = { ...antconfig };
        Object.keys(action).forEach((key: string) => {
            configState[key] = action[key];
        });
        return setConfig(configState);
    };
    return {
        antconfig,
        changeConfig
    };
}

export const AntdConfigContainer = createContainer(AntdesignConfig);
