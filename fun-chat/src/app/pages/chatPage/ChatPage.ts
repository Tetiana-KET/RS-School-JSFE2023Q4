import { Component } from '../../components/Component';
import { UserLine } from '../../components/userLine/userLine';
import type { User } from '../../interfaces';
import { eventSearchInputChangedBus, eventUserSelectedBus } from '../../utils/eventBus';
import classes from './ChatPage.module.css';

export class ChatPage extends Component<'section'> {
  private aside: Component<'aside'>;
  private contactSearch: Component<'input'>;
  public usersList: Component<'ul'>;
  private dialogContainer: Component<'article'>;
  private dialogHeader: Component<'h3'>;
  private dialogHeaderUserName: Component<'span'>;
  private dialogHeaderUserStatus: Component<'span'>;

  private dialogBody: Component<'div'>;
  private dialogForm: Component<'form'>;
  private dialogInput: Component<'input'>;
  private dialogFormButton: Component<'button'>;

  constructor() {
    super('section', { className: `${classes.chatPage}`, id: 'chatPage' });

    this.aside = new Component('aside', { className: `${classes.chatPageAside}`, id: 'chatPageAside' });
    this.contactSearch = new Component('input', { className: `${classes.asideContactSearch}`, id: 'asideContactSearch' });
    this.usersList = new Component('ul', { className: `${classes.asideUsersList}`, id: 'asideUsersList' });
    this.dialogContainer = new Component('article', { className: `${classes.chatPageDialog}`, id: 'chatPageDialog' });
    this.dialogHeader = new Component('h3', { className: `${classes.dialogHeader}`, id: 'dialogHeader' });
    this.dialogHeaderUserName = new Component('span', { className: `${classes.dialogHeaderUserName}`, id: 'dialogUserName' });
    this.dialogHeaderUserStatus = new Component('span', { className: `${classes.dialogHeaderUserStatus}`, id: 'dialogUserStatus' });
    this.dialogBody = new Component('div', { className: `${classes.dialogBody}`, id: 'dialogBody' });
    this.dialogForm = new Component('form', { className: `${classes.dialogForm}`, id: 'dialogForm' });
    this.dialogInput = new Component('input', { className: `${classes.dialogInput}`, id: 'dialogInput' });
    this.dialogFormButton = new Component('button', { className: `${classes.dialogFormButton}`, text: 'Send', id: 'dialogFormButton' });
    this.handleSearchInputChange();
    this.handleSelectUserToChatWith();
    this.constructPage();
  }

  public handleSearchInputChange(): void {
    this.contactSearch.element.addEventListener('input', () => {
      const searchString = this.contactSearch.element.value.trim();
      eventSearchInputChangedBus.emit('searchInputChanged', searchString);
    });
  }

  public handleSelectUserToChatWith(): void {
    this.usersList.element.addEventListener('click', (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const selectedUserLineElement = e.target.closest('li');
        if (selectedUserLineElement) {
          const id = selectedUserLineElement.getAttribute('id') || '';
          eventUserSelectedBus.emit('userToChatWithSelected', selectedUserLineElement);
          this.displaySelectedUserInDialogue(id);
        }
      }
    });
  }

  private displaySelectedUserInDialogue(id: string): void {
    const name = document.getElementById(`userLineName_${id}`)?.innerText;
    const status = document.getElementById(`userLineStatus_${id}`)?.getAttribute('data-status');
    if (name && status) {
      this.setUserInfoToGialogHeader(name, status);
    }
  }

  private setUserInfoToGialogHeader(name: string, status: string): void {
    this.dialogHeaderUserName.element.textContent = name;
    this.dialogHeaderUserStatus.element.textContent = status === 'true' ? 'Online' : 'Offline';
  }

  private constructPage(): void {
    this.dialogFormButton.setAttribute('disabled', 'true');
    this.dialogInput.setAttribute('placeholder', 'Enter your message...');
    this.contactSearch.setAttribute('placeholder', 'Search...');
    this.aside.appendChildren([this.contactSearch, this.usersList]);
    this.dialogHeader.appendChildren([this.dialogHeaderUserName, this.dialogHeaderUserStatus]);
    this.dialogForm.appendChildren([this.dialogInput, this.dialogFormButton]);
    this.dialogContainer.appendChildren([this.dialogHeader, this.dialogBody, this.dialogForm]);
    this.appendChildren([this.aside, this.dialogContainer]);
  }

  public renderUsers(users: User[], root: HTMLElement): void {
    users.forEach(user => {
      const name = user.login;
      const isLogged = user.isLogined || false;
      const userLineElement = new UserLine(name, isLogged);
      root.append(userLineElement.element);
    });
  }

  public drawNewLoggedUser(user: User, root: HTMLElement): void {
    const name = user.login;
    const isLogged = user.isLogined || false;
    const userLineElement = new UserLine(name, isLogged);
    root.prepend(userLineElement.element);
  }

  public displayUpdatedStatus(user: User): void {
    const name = user.login;
    const isLogged = user.isLogined || false;
    const statusElement = document.getElementById(`userLineStatus_${name}`);
    if (statusElement) {
      statusElement.setAttribute('data-status', `${isLogged}`);
    }
  }
}
