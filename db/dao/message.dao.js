import { mongoose } from "../db.js";

class MessageManager {
  constructor(collection, schema) {
    this.productCollection = mongoose.model(collection, schema);
  }

  async getAllMessages() {
    try {
      let messages = await this.productCollection.find().lean();
      return messages;
    } catch (error) {
      throw Error(error);
    }
  }

  async createMessage(message) {
    try {
      let result = await this.productCollection.create(message);
      return result;
    } catch (error) {
      throw Error(error);
    }
  }
}

export default MessageManager;
