import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const servies = axios.create({
    baseURL: isDev ? "http://rap2.taobao.org:38080/app/mock/247569" : ''   
})

servies.interceptors.request.use((config) => {
    config.data = Object.assign({}, config.data, {
        // authToken: window.localStorage.getItem("authToken")
        authToken: 'sasadadad'
    })
    return config
})

servies.interceptors.response.use((resp) => {
    if(resp.status === 200){
        return resp.data
    }else{
        
    }
})


export const getAtricle = (offset, limited) => {
    return servies.post('/api/fw/List',{offset, limited})
}

export const deleteAtricle = (id) => {
    return servies.delete('api/fw/delete',{id})
}

export const editAtricle = (id) => {
    return servies.post('api/fw/edit')
}

export const editOkAtricle = (data) => {
    console.log(data)
    return servies.post('api/fw/editOk',data)
}