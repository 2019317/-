import React, { Component } from 'react'
import { Route,Switch,Redirect } from 'react-router-dom'
import { adminRouter } from './routes'
import zhCN from 'antd/es/locale/zh_CN'
import { Frame } from './components'
import { ConfigProvider } from 'antd'


const menus = adminRouter.filter(route => route.isNav === true)
// const testHOC = (WrappedComponent) => {
//     return class HOCComponent extends Component{
//         render(){
//             return(
//                 <>
//                     <WrappedComponent />

//                     <div>这是一个</div>
//                 </>
//             )
//         }
//     }
// }

// @testHOC

class App extends Component {
    render() {
        return (
            <ConfigProvider locale={zhCN}>
            <Frame menus={menus}>
                <div>
                <Switch>
                    {
                        adminRouter.map((route)=>{
                            return (
                                    <Route 
                                        key={route.pathname} 
                                        path={route.pathname}
                                        exact={route.exact} 
                                        render={()=>{
                                            // console.log(route.component)
                                                return <route.component {...this.props} />
                                            }
                                        } />)
                            })
                    }
                    <Redirect to={adminRouter[0].pathname} from='/admin' exact />
                    <Redirect to='/404' />
                </Switch>
            </div>
            </Frame>
            </ConfigProvider>
        )
    }
}

export default App
