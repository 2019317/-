import React, { Component } from 'react'


const Loadable = ({
    loader,
    loading:Loading
}) =>{
return class LoadableComponent extends Component {
    state = {
        LoadedComponnet: null
    }
    componentDidMount() {
        // import('./Dashboard')
        loader()
            .then( resp => {
                this.setState({
                    LoadedComponnet: resp.default
                })
            })
    }
    render() {
        const{
            LoadedComponnet
        } = this.state
        return (
            LoadedComponnet
            ?
            <LoadedComponnet {...this.props} />
            :
            <Loading />
        )
    }
}}

export default Loadable
