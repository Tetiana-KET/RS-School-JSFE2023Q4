import type { User } from '../interfaces';
import { ChatModel } from '../models/ChatModel';
import type { ChatPage } from '../pages/chatPage/ChatPage';
import type { WebSocketAPI } from '../services/WebSocketAPI';
import { getUserFromSessionStorage } from '../utils/commonUtils';
import { eventGetUsersBus, eventExternalUserBus, eventNewUserAuthBus, eventBus } from '../utils/eventBus';

export class ChatController {
  public chatModel: ChatModel;
  private webSocketAPI: WebSocketAPI;
  public chatPage: ChatPage;

  constructor(webSocketAPI: WebSocketAPI, chatPage: ChatPage) {
    this.webSocketAPI = webSocketAPI;
    this.chatPage = chatPage;
    this.chatModel = new ChatModel();

    eventGetUsersBus.subscribe('USER_ACTIVE_data', responseData => {
      this.chatModel.updateActiveUsers(responseData.payload.users);
      const asideUsersList = document.getElementById('asideUsersList');
      if (asideUsersList) {
        this.chatModel.removeCurrentUserFromUsersList();
        this.chatPage.renderUsers(this.chatModel.activeUsers, asideUsersList);
      }
    });
    eventGetUsersBus.subscribe('USER_INACTIVE_data', responseData => {
      this.chatModel.updateInactiveUsers(responseData.payload.users);
      const asideUsersList = document.getElementById('asideUsersList');
      if (asideUsersList) {
        this.chatPage.renderUsers(this.chatModel.inactiveUsers, asideUsersList);
      }
    });
    eventExternalUserBus.subscribe('USER_EXTERNAL_LOGIN', responseData => {
      const { user } = responseData.payload;
      if (user) {
        this.chatPage.displayUpdatedStatus(user);
        this.chatModel.updateUserStatusArrays(user);
      }
    });
    eventExternalUserBus.subscribe('USER_EXTERNAL_LOGOUT', responseData => {
      const { user } = responseData.payload;
      if (user) {
        this.chatPage.displayUpdatedStatus(user);
        this.chatModel.updateUserStatusArrays(user);
      }
    });
    eventNewUserAuthBus.subscribe('newUserAuth', this.callDrawNewUser.bind(this));
    eventBus.subscribe('successLogin', this.setCurUser.bind(this));
  }

  // private setListeners(): void {

  // }

  private callDrawNewUser(UserToUpdate: User): void {
    if (UserToUpdate.login !== this.chatModel.currentUser?.login) {
      const asideUsersList = document.getElementById('asideUsersList');
      if (asideUsersList) {
        this.chatPage.drawNewLoggedUser(UserToUpdate, asideUsersList);
      }
    }
  }

  private setCurUser(): void {
    const user = getUserFromSessionStorage();
    if (user) {
      this.chatModel.setCurrentUser(user);
    }
  }

  public start(): void {
    this.setCurUser();
    this.webSocketAPI.start();
  }
}
