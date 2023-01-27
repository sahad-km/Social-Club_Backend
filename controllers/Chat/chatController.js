const chatModel = require("../../models/Chat/chat");
const messageModel = require("../../models/Chat/messageModel");

const createChat = async (req, res) => {
  // Check for existing chat
  const existingChat = await chatModel.findOne({
    members: { $all: [req.body.senderId, req.body.receiverId] },
  });
  if (existingChat) {
    // Return existing chat if found
    res.json({ chat: existingChat });
  } else {
    // Create new chat if none exists
    const newChat = new chatModel({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const result = await newChat.save();
      res.json({ result });
    } catch (err) {
      console.log(err);
    }
  }
};

const userChat = async (req, res) => {
  try {
    const chat = await chatModel.find({
      members: { $in: [req.params.id] },
    });
    res.json({ chat });
  } catch (err) {
    console.log(err);
  }
};

const findChat = async (req, res) => {
  try {
    const chat = await chatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.json({ chat });
  } catch (err) {
    console.log(err);
  }
};

const addMessage = async (req, res) => {
  const { senderId, text, chatId, type } = req.body;
  const message = new messageModel({
    chatId,
    senderId,
    text,
    type,
  });
  try {
    const result = await message.save();
    res.json({ result });
  } catch (err) {
    console.log(err);
  }
};

const getMessage = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await messageModel.find({ chatId });
    res.json({ result });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createChat, userChat, findChat, addMessage, getMessage };
