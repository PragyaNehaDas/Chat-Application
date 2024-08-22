import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();

  return (
    <div className="py-2 flex flex-col max-h-[350px] overflow-y-auto">
      {conversations.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIndex={index === conversations.length - 1} // Make sure to use `conversations.length`
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
