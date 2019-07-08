import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import { ScrollConfigContainer } from '@state/scroll';
import * as styles from './scroll.sass';

interface Props {
    md: string;
    name: string;
}

const Markdown = (props: Props) => {
    const articleRef = useRef({} as any);
    const { scrollConfig, changeScroll } = ScrollConfigContainer.useContainer();
    const saveScrollConfig = () => {
        changeScroll(props.name, articleRef.current.scrollTop);
    };
    useEffect(() => {
        Array.from(document.querySelectorAll('pre code')).forEach(element => {
            hljs.highlightBlock(element);
        });
    }, []);
    useEffect(() => {
        const top = articleRef.current.getBoundingClientRect().top + scrollY;
        articleRef.current.style.height = `calc(100vh - ${top + 5}px)`;
        articleRef.current.scroll(0, scrollConfig[props.name]);
    }, []);
    return (
        <div
            ref={articleRef}
            style={{ overflowY: 'scroll' }}
            onScroll={() => saveScrollConfig()}
            className={'markdown-body ' + styles.fyScroll}
            dangerouslySetInnerHTML={{ __html: props.md }}
        />
    );
};

export default Markdown;
