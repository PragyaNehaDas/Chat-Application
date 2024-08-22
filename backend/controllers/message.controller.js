const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { getReceiverSocketId, io } = require("../socket/socket");

// const sendMessage = async (req, res, next) => {
//     try {
//         const { message } = req.body;
//         const receiverId = req.params.id; // receiverId from the route parameter
//         const senderId = req.user.id; // senderId from the authenticated user

//         // Validate senderId and receiverId
//         if (!senderId || !receiverId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Sender ID or Receiver ID is missing",
//             });
//         }

//         // Find or create conversation
//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] },
//         });

//         if (!conversation) {
//             conversation = await Conversation.create({
//                 participants: [senderId, receiverId],
//                 messages: [],
//             });
//         }

//         // Create and save new message
//         const newMessage = new Message({
//             senderId,  // Ensure senderId is provided
//             receiverId,
//             message,
//         });

//         await newMessage.save();

//         // Add message to conversation
//         conversation.messages.push(newMessage._id);
//         await conversation.save();

//         //socket io functionality
//         const receiverSocketId = getReceiverSocketId(receiverId)

//         if(receiverSocketId){
//             io.to(receiverId).emit("newMessage", newMessage) //to send event to a specific user/client we use io.to().emit() method
//         }

//         // Respond with the new message
//         res.status(201).json(newMessage);
//     } catch (error) {
//         next(error);
//     }
// };

const sendMessage = async (req, res, next) => {
    try {
        const { message } = req.body;
        const receiverId = req.params.id; // receiverId from the route parameter
        const senderId = req.user.id; // senderId from the authenticated user

        // Validate senderId and receiverId
        if (!senderId || !receiverId) {
            return res.status(400).json({
                success: false,
                message: "Sender ID or Receiver ID is missing",
            });
        }

        // Find or create conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [],
            });
        }

        // Create and save new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        await newMessage.save();

        // Add message to conversation
        conversation.messages.push(newMessage._id);
        await conversation.save();

        // Socket.io functionality
        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // Respond with the new message
        res.status(201).json(newMessage);
    } catch (error) {
        next(error);
    }
};


const getMessage = async(req, res, next) =>{
    try {
        const {id: userToMessage} = req.params
        const senderId = req.user.id

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToMessage]}
        }).populate("messages")

        if(!conversation){
            return res.status(200).json([])        
        }

        const messages = conversation.messages


        res.status(200).json(messages)
    } catch (error) {
        next(error)
    }
}

module.exports = { sendMessage, getMessage };
