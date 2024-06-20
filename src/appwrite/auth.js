import { Client, Account, ID } from "appwrite";
import config from "../config/config";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, userName }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        userName
      );
      if (userAccount) {
        return await this.login({ email, password });
      } else {
        return null;
      }
    } catch (error) {
      console.error("AuthService :: createAccount :: error: ", error);
      throw new Error(error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("AuthService :: login :: error: ", error);
      throw new Error(error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("AuthService :: getCurrentUser :: error: ", error);
      throw new Error(error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error("AuthService :: logout :: error: ", error);
      throw new Error(error);
    }
  }
}

const authService = new AuthService();
export default authService;
