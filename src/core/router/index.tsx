import { lazy, LazyExoticComponent } from 'react';

interface RouterType {
    path: string;
    component: LazyExoticComponent<any>;
    name: string;
    isComplete: boolean;
}

interface Router {
    title: string;
    icon?: string;
    pages: RouterType[];
}

const Home = lazy(() => import('../../containers/Home'));
const Random = lazy(() => import('../../containers/Random'));
const Article = lazy(() => import('../../containers/article'));
const LazyLoad = lazy(() => import('../../containers/LazyLoad'));

const router: Router[] = [
    {
        title: 'BLOG',
        icon: 'read',
        pages: [
            {
                path: '/blog/eventloop',
                component: Article,
                name: '解析Eventloop',
                isComplete: true
            }
        ]
    },
    {
        title: 'TOOLS',
        icon: 'tool',
        pages: [
            {
                path: '/tools/random',
                component: Random,
                name: '随机数生成',
                isComplete: true
            },
            {
                path: '/tools/lazyload',
                component: LazyLoad,
                name: '懒加载',
                isComplete: true
            }
        ]
    },
    {
        title: 'QUESTION',
        icon: 'question',
        pages: [
            {
                path: '/question/webpack',
                component: Article,
                name: 'webpack',
                isComplete: true
            },
            {
                path: '/question/react',
                component: Article,
                name: 'react',
                isComplete: true
            }
        ]
    }
];

export default router;
