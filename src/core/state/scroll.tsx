import { useState, Dispatch } from 'react';
import { getScroll, saveScroll } from '@cache/code';
import { createContainer } from 'unstated-next';

export interface ScrollConfig {
    [x: string]: number;
}

const scrollConfigContainer = () => {
    const [scrollConfig, changeScrollConfig]: [ScrollConfig, Dispatch<ScrollConfig>] = useState(getScroll());
    const changeScroll = (type: string, number: number) => {
        const scroll = { ...scrollConfig };
        scroll[type] = number;
        changeScrollConfig(scroll);
        saveScroll(scroll);
    };
    return {
        scrollConfig,
        changeScroll
    };
};
export const ScrollConfigContainer = createContainer(scrollConfigContainer);
