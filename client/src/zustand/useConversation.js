import { create } from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null, // Initialize selectedConversation state
    messages: [], // Initialize messages state
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }), // Function to set selectedConversation
    setMessages: (messages) => set({ messages }) // Function to set messages
}));

export default useConversation;
