import { IconButton } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiPlus } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { HiDotsVertical } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import ChatRoom from './Chats/ChatRoom';
import MessagesLists from './MessagesLists/MessagesLists';
import MessagesModal from './MessagesModal';

const Messages = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { conversations } = useSelector((state: RootState) => state.messages);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [allMessages, setAllMessages] = useState<number>(0);

  useEffect(() => {
    const unread = conversations?.filter((conversation) => !conversation.message.is_read);
    console.log(unread);
    setUnreadMessages(unread?.length);
    setAllMessages(conversations?.length);
  }, [conversations]);

  return (
    <>
      {/* Large view */}
      {modalOpen && <MessagesModal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      <div className={styles.container}>
        <div
          className="px-3 py-4 flex items-center justify-end hover:bg-gray-100 gap-x-2 max-w-fit ml-auto cursor-pointer"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <span className="w-[25px] h-[25px] rounded-full flex justify-center items-center border border-black text-[20px] cursor-pointer">
            <BiPlus />
          </span>
          Add New Chats
        </div>

        <div className={styles.containerBody}>
          <div className="space-y-10">
            <ul className={styles.informationBox}>
              <li className={styles.boxList}>
                <p>All Messages</p>
                <p className="text-center text-slate-400">{allMessages}</p>
              </li>
              <li className={styles.boxList}>
                <p>Important Messages</p>
                <p className={styles.important}>4</p>
              </li>
              <li className={styles.boxList}>
                <p>Unread Messages</p>
                <p className="text-center">{unreadMessages}</p>
              </li>
              <li className={styles.boxList}>
                <p>Drafts</p>
                <p className="text-center">3</p>
              </li>
            </ul>

            <div className={styles.searchBox}>
              <div className={styles.inputContainer}>
                <AiOutlineSearch size={20} />
                <input className={styles.searchBoxInput} placeholder="Search messages" />
              </div>
              <div>
                <MessagesLists />
              </div>
            </div>
          </div>

          <div className={styles.chatroom}>
            <ChatRoom />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      {/* <div className='md:hidden bg-[#a5a091] h-screen'>
                <div className="bg-[#8D887C] py-5 pl-5 pr-4 flex items-center justify-between">
                    <p className='text-[20px]'>Messages</p>
                    <div className='flex space-x-1'>
                        <IconButton>
                            <AiOutlineSearch size={25} />
                        </IconButton>
                        <IconButton>
                            <HiDotsVertical size={25} />
                        </IconButton>
                    </div>
                </div>

                <div className='py-3'>
                    <MessagesLists />
                </div>

                <div className='fixed bottom-10 right-5'>
                        <FiPlus size={45} color='white' className='bg-yellow-400 rounded-full' />
                    </IconButton>
                </div>
            </div> */}
    </>
  );
};

export default Messages;

const styles = {
  container: 'bg-[#E5E5E5]  block px-5 md:px-20 py-5 h-screen',
  containerBody: 'flex justify-start p-5 space-x-32',
  informationBox: 'bg-white p-5 text-xs font-light w-60 rounded-lg shadow-lg',
  boxList: 'flex justify-between p-2 items-center',
  important:
    'bg-red-500 rounded-full p-[3px] text-[9px] w-4 h-4 flex justify-center items-center text-white font-semibold',
  searchBox: 'bg-white rounded-lg pb-1 text-slate-800 shadow-lg',
  inputContainer: 'bg-gray-300 flex p-2 rounded-t-lg items-center px-2',
  searchBoxInput: 'outline-none bg-transparent pl-2 p-1 text-sm placeholder:text-slate-700',
  chatroom: 'w-[528px] bg-slate-50 rounded-xl shadow pt-3',
};
