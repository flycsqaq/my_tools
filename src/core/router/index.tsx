import { lazy, LazyExoticComponent } from 'react';

interface RouterType {
    path: string;
    component: LazyExoticComponent<any>;
    name: string;
}

interface Router {
    title: string;
    icon?: string;
    pages: RouterType[];
}

const Home = lazy(() => import('../../containers/Home'));
const Gif = lazy(() => import('../../containers/Gif'));
const Random = lazy(() => import('../../containers/Random'));
const Solve = lazy(() => import('../../containers/Random'));
const Video = lazy(() => import('../../containers/Video'));
const Watermark = lazy(() => import('../../containers/Watermark'));
const TransformUnit = lazy(() => import('../../containers/TransformUnit'));

const router: Router[] = [
    {
        title: 'Home',
        pages: [
            {
                path: '/',
                component: Home,
                name: 'Home'
            }
        ]
    },
    {
        title: '媒体处理',
        icon: 'picture',
        pages: [
            {
                path: '/gif',
                component: Gif,
                name: 'Gif转化'
            },
            {
                path: '/watermark',
                component: Watermark,
                name: '加水印'
            },
            {
                path: '/video',
                component: Video,
                name: '视频播放'
            }
        ]
    },
    {
        title: '工具',
        icon: 'tool',
        pages: [
            {
                path: '/random',
                component: Random,
                name: '随机事件'
            },
            {
                path: '/solve',
                component: Solve,
                name: '解方程'
            },
            {
                path: '/transformunit',
                component: TransformUnit,
                name: '单位转化'
            }
        ]
    }
];

export default router;
