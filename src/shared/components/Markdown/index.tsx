import React, { useEffect } from 'react';
import hljs from 'highlight.js';
import { ScrollConfigContainer } from '@state/scroll';

interface Props {
    md: string;
    name: string;
}

const Markdown = (props: Props) => {
    const { scrollConfig, changeScroll } = ScrollConfigContainer.useContainer();
    useEffect(() => {
        const scroll = scrollConfig;
        Array.from(document.querySelectorAll('pre code')).forEach(block => {
            hljs.highlightBlock(block);
        });
        window.scrollTo(0, scroll[props.name] || 0);
        const saveScrollConfig = changeScroll;
        return () => {
            saveScrollConfig(props.name, window.scrollY);
        };
    }, []);
    return <div className={'markdown-body'} dangerouslySetInnerHTML={{ __html: props.md }} />;
};

export default Markdown;
