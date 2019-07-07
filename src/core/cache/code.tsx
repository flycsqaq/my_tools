import { ScrollConfig } from '@state/scroll';

export const getScroll = (): ScrollConfig => {
    let config: any = window.localStorage.getItem('scroll');
    if (config !== null) {
        config = JSON.parse(config);
    } else {
        config = {};
    }
    return config;
};

export const saveScroll = (scroll: ScrollConfig) => {
    return window.localStorage.setItem('scroll', JSON.stringify(scroll));
};
