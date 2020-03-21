import { Loading } from '../components'
// import Loadable from 'react-loadable'
import Loadable from '../views/loadable'
// import Dashboard from './Dashboard'
// import Settings from './Settings'
// import Login from './Login'
// import ArticleList from './Article'
// import ArticleEdit from './Article/Edit'
// import NotFount from './NotFount'

const Dashboard = Loadable({
    loader: ()=> import('./Dashboard'),
    loading:Loading
})
const Settings = Loadable({
    loader: ()=> import('./Settings'),
    loading:Loading
})
const Login = Loadable({
    loader: ()=> import('./Login'),
    loading:Loading
})
const NotFount = Loadable({
    loader: ()=> import('./NotFount'),
    loading:Loading
})
const ArticleList = Loadable({
    loader: ()=> import('./Article'),
    loading:Loading
})
const ArticleEdit = Loadable({
    loader: ()=> import('./Article/Edit'),
    loading:Loading
})
export {
    Dashboard,
    Settings,
    Login,
    ArticleList,
    ArticleEdit,
    NotFount
}
