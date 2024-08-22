import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import {TiMessages} from "react-icons/ti"

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="md:min-w-[700px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2 flex items-center">
            <span className="label text-gray-900 font-bold">To: </span>
            <span className="text-2xl font-bold text-white mb-1">
              {selectedConversation?.username}
            </span>
          </div>

          <Messages />

          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg ms:text-xl text-slate-800 font-semibold flex flex-col items-center gap-2">
        <p>Welcome </p>

        <p>Select a chat to start messaging</p>

        <TiMessages className="text-3xl md:text-6xl"/>
      </div>
    </div>
  );
};

export default MessageContainer;
