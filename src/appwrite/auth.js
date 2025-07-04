import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId); 
    this.account = new Account(this.client);
  }

  // Signup + Login
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        // Immediately create a session
        return await this.login({ email, password });
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // Only login, returns session object
  async login({ email, password }) {
    try {
      const session = await this.account.createEmailSession(email, password);
      console.log("Session created:", session);
      return session;
    } catch (error) {
      throw error;
    }
  }

  // Gets logged-in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite :: getCurrentUser :: error", error);
      return null;
    }
  }

  // Logout
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error("Appwrite :: logout :: error", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
