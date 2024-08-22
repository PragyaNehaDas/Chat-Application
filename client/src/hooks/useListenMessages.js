import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificatonSound from "../assets/sounds/notification.mp3"

const useListenMessages = () => {
    const {socket} = useSocketContext()
    const {messages, setMessages} = useConversation()

//  console.log(messages);
    useEffect(()=>{
        socket?.on("newMessage", (newMessage) =>{
            const sound = new Audio(notificatonSound)
            sound.play()
            setMessages([...messages, newMessage])
        })

        return ()=> socket?.off("newMessage")
    }, [socket, setMessages, messages])
};

export default useListenMessages;
