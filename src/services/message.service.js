import MessageManager from "../../db/dao/message.dao";
import messageSchema from "../../db/schemas/message.schema";

const messageDAO = new MessageManager("messages", messageSchema);

const getMessagesServices = async () => {
  try {
    let response = await messageDAO.getAllMessages();
    return response;
  } catch (error) {
    throw Error(error);
  }
};

const addMessageServices = async (message) => {
  try {
    let response = await messageDAO.createMessage(message);
    return response;
  } catch (error) {
    throw Error(error);
  }
};

export { getMessagesServices, addMessageServices };
