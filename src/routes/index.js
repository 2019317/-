import {
    Dashboard,
    Settings,
    Login,
    ArticleList,
    ArticleEdit,
    NotFount
} from '../views'

export const mainRouter =  [{
    pathname:'/login',
    component: Login,
},
{
    pathname:'/404',
    component: NotFount
}
]

export const adminRouter = [{
    pathname: '/admin/doshboard',
    component: Dashboard,
    title: '仪表盘',
    isNav: true
},
{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
},
{
    pathname: '/admin/article',
    component: ArticleList,
    title: '文章列表',
    isNav: true,
    exact: true
},
{
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    isNav: true
}
]