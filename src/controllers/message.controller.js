import {
  getMessagesServices,
  addMessageServices,
} from "../services/message.service.js";

const getMessages = async () => {
  const messages = await getMessagesServices();
  return messages;
};

const addMessages = async (message) => {
  const result = await addMessageServices(message);
  return result;
};

export { getMessages, addMessages };
