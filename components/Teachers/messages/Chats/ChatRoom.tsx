import { Avatar, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { chats } from './chatsData'
import { GrAttachment } from 'react-icons/gr'
import { BsEmojiSmile } from 'react-icons/bs'
import { BiSend } from 'react-icons/bi'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { getAccessToken } from 'utils/getTokens'


// const headers = {
//     Authorization: "Bearer " + getAccessToken()
// }
// const client = new W3CWebSocket('wss://sea-lion-app-43ury.ondigitalocean.app/chat/websocket/'
// )

const ChatRoom = () => {

    // useEffect(() => {
    //         client.onopen = () => {
    //             console.log('Websocet client connected')
    //         };
    //         // client.onmessage = (message) => {
    //         //     const dataFromServer = JSON.parse(message.data);
    //         //     console.log('got reply! ', dataFromServer)
    //         // }
    //    }, [])
    
    //    const handleClick = (value:any) => {
    //     client.send(JSON.stringify({
    //         type: "chat.message",
    //         msg: value,
    //     }))
    //    }


    return (
        <div className=''>
            <div className={styles.header}>
                <Avatar src='' alt='' />
                <p className='font-light text-sm'>Olamide Simon</p>
            </div>
            <div className={styles.chatContainer}>
                {chats.sort((a, b) => a.date - b.date).map((chat, index) => (
                    <div key={index}>
                        <p className={`${styles.chats} ${chat.name === 'me' ? 'ml-auto rounded-bl-lg': 'rounded-br-lg'}`}>{chat.chat}</p>
                        <p className='text-[7px]'>{}</p>
                    </div>
                ))}
            </div>
            <div className={styles.messageInputContainer}>
                <div className={styles.inputContainer}>
                    <IconButton>
                        <GrAttachment size={20} />
                    </IconButton>
                    <form onSubmit={() => {}} className='w-full'>
                        <input 
                            placeholder='Send Message...'
                            className={styles.input}
                        />
                        <button hidden type='submit'></button>
                    </form>
                    <div className='flex space-x-5'>
                        <IconButton>
                            <BsEmojiSmile size={20} />
                        </IconButton>
                        <IconButton>
                            <BiSend size={20} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom

const styles = {
    header: 'flex items-center space-x-2 border-b-2 p-2',
    chatContainer: 'h-80 space-y-1 p-5 px-5 overflow-y-auto',
    chats: 'bg-[#fff3cc] p-3 text-xs w-fit rounded-t-lg',
    messageInputContainer: 'bg-white w-full rounded-b-xl',
    inputContainer: 'flex items-center space-x-2 text-slate-400 p-4 px-7',
    input: 'w-full p-1 outline-none bg-transparent',
}