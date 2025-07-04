import { Children, createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";


export const ChatContext = createContext();

export const ChatProvider = ({children})=>{
    const [messages, setmessages] = useState([]);
    const [users, setusers] = useState([]);
    const [selecteduser, setselecteduser] = useState(null);
    const [unseenmessages, setunseenmessages] = useState({});

    const {socket, axios} = useContext(AuthContext);

    //function to get all users for sidebar

    const getUsers = async () => {
        try {
            const {data} = await axios.get('/api/messages/users');
            if (data.success){
                setusers(data.users);
                setunseenmessages(data.unseenmessages)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // function to get messages for selected users

    const getMessages = async (userId) => {
        try {
            const {data} = await axios.get(`/api/messages/${userId}`)
            if (data.success){
                setmessages(data.messages)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to send message to selected user

    const sendMessage = async (messageData) => {
        try {
            const {data} = await axios.post(`/api/messages/send/${selecteduser._id}`, messageData);
            if (data.success){
                setmessages((prevMessages)=>[...prevMessages, data.newMessage])
            }else{
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to subscribe to messages for selected user
    const subscribeToMessages = async () => {
        if(!socket) return;

        socket.on("newMessage", (newMessage)=>{
            if(selecteduser && newMessage.senderId === selecteduser._id){
                newMessage.seen = true;
                setmessages((prevMessages)=>[...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            }else{
                setunseenmessages((prevUnseenMessages)=>({
                    ...prevUnseenMessages, [newMessage.senderId] : prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] +  1 : 1

                }))
            }
        })
    }

    // function to unsubscribe from messages

    const unsubscribeFromMessages =  () => {
        if (socket) socket.off("newMessage");
    }

    useEffect(()=>{
        subscribeToMessages();
        return ()=> unsubscribeFromMessages();

    }, [socket, selecteduser])

    const value = {

        messages, 
        users,
        selecteduser,
        unseenmessages,
        getUsers,
        getMessages,
        sendMessage,
        setselecteduser,
        setunseenmessages
    }
    return <ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>
}