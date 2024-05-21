import { Client, Databases, Query } from "appwrite";
import { v4 as uuidV4 } from "uuid";
import config from "../config/config";

class DataBaseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createNote({ title, content, userId }) {
    const noteId = uuidV4();
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        noteId,
        {
          title,
          content,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite database service :: createNote :: error: ", error);
      throw new Error(error);
    }
  }

  // async getNotes() {
  //   try {
  //     return await this.databases.listDocuments(
  //       config.appwriteDatabaseId,
  //       config.appwriteCollectionId
  //     );
  //   } catch (error) {
  //     console.log("Appwrite database service :: getNotes :: error: ", error);
  //     throw new Error(error);
  //   }
  // }

  async getNote(noteId) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        noteId
      );
    } catch (error) {
      console.log("Appwrite database service :: getNote :: error: ", error);
      throw new Error(error);
    }
  }

  async updateNote(noteId, { title, content }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        noteId,
        {
          title,
          content,
        }
      );
    } catch (error) {
      console.log("Appwrite database service :: updateNote :: error: ", error);
      throw new Error(error);
    }
  }

  async deleteNote(noteId) {
    try {
      return await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        noteId
      );
    } catch (error) {
      console.log("Appwrite database service :: deleteNote :: error: ", error);
      throw new Error(error);
    }
  }

  async getNotesByUserId(userId) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.log(
        "Appwrite database service :: getNotesByUserId :: error: ",
        error
      );
      throw new Error(error);
    }
  }
}

const databaseService = new DataBaseService();
export default databaseService;
