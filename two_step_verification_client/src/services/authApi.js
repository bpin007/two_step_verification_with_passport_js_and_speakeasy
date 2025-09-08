import api from "./api";

export const registerApi = async({username,password})=>{
    return await api.post('/register',{username,password})
}

export const loginApi = async({username,password})=>{
    return await api.post('/login',{username,password},{
        withCredentials:true
    })
}

export const authStatusApi = async()=>{
    return await api.get('/status',{
        withCredentials:true
    })
}

export const logoutApi = async()=>{
    return await api.post('/logout',{},{
        withCredentials:true
    })
}
export const setup2FAApi = async()=>{
    return await api.post('/2fa/setup',{
        
    },{
        withCredentials:true
    })
}

export const verify2FAApi = async({token})=>{
    return await api.post('/2fa/verify',{
        token
    },{
        withCredentials:true
    })
}
export const reset2FAApi = async()=>{
    return await api.post('/2fa/reset',{},{
        withCredentials:true
    })
}

export const logoutUser = async()=>{
    return await api.post('/logout',{},{
        withCredentials:true
    })
}