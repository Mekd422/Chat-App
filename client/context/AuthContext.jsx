import { createContext, useEffect, useState } from "react"
import toast from 'react-hot-toast'
import axios from 'axios'
import {io} from 'socket.io-client'

const backendurl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendurl;

export const AuthContext = createContext();
export const AuthProvider = ({children})=>{
    const [token, settoken] = useState(localStorage.getItem("token"));
    const [authuser, setauthuser] = useState(null);
    const [onlineusers, setonlineusers] = useState([]);
    const [socket, setsocket] = useState(null);

    //check if the user is authenticated and if so, set the user data and connect the socket

    const checkAuth = async () => {
        try {
            const {data} = await axios.get('/api/auth/check');
            if(data.success){
                setauthuser(data.user)
                connectSocket(data.user);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    // login function to handle user authentication and socket connection
const login = async(state, credentials)=>{
    try {
        const {data} = await axios.post(`/api/auth/${state}`, credentials);
        if(data.success){
            setauthuser(data.userData);
            connectSocket(data.userData);
            axios.defaults.headers.common['token'] = data.token;
            settoken(data.token);
            localStorage.setItem('token', data.token)
            toast.success(data.message);
        }else{
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
}

// logout function to handle user logout and socket disconnection

const logout = async () => {
    localStorage.removeItem("token");
    setauthuser(null);
    settoken(null);
    setonlineusers([]);
    axios.defaults.headers.common['token'] = null;
    toast.success("logged out successfully");
    socket.disconnect();

}

// update profile function to handle user profile updates

const updateprofile = async (body) => {
    try {
        const {data} = await axios.put('/api/auth/update-profile', body);
        if(data.success){
            setauthuser(data.user);
            toast.success('profile updated successfully')
        }
    } catch (error) {
        toast.error(error.message);
    }
}

// connect socket function to handle socket connection and online users updates

const connectSocket = (userData)=>{
    if(!userData || socket?.connected) return;
    const newSocket = io(backendurl, {
        query: {
            userId: userData._id
        }
    });
    newSocket.connect();
    setsocket(newSocket);

    newSocket.on("getonlineusers", (userIds)=>{
        setonlineusers(userIds);
    })
}

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common["token"] = token;
        }

        checkAuth();
    },[token])

    const value = {
        axios,
        authuser,
        onlineusers,
        socket,
        token,
        login,
        logout,
        updateprofile
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}