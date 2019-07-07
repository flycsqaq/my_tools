import React from 'react';
import Markdown from '@components/Markdown';
import eventloop from '../../../docs/article/eventloop.md';
import webpack from '../../../docs/question/webpack.md';
import react from '../../../docs/question/react.md';

interface Props {
    children: JSX.Element;
    location: {
        pathname: string;
    };
}
interface ArticleMap {
    [x: string]: {
        md: string;
        name: string;
    };
}

const Article = (props: Props) => {
    const articleMap: ArticleMap = {
        '/blog/eventloop': {
            md: eventloop,
            name: 'eventloop'
        },
        '/question/webpack': {
            md: webpack,
            name: 'webpack'
        },
        '/question/react': {
            md: react,
            name: 'react'
        }
    };
    const getProps = (): { md: string; name: string } => {
        return articleMap[props.location.pathname];
    };
    return <Markdown {...getProps()} />;
};

export default Article;
