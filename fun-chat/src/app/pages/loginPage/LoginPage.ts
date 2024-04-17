import { Component } from '../../components/Component';

import { LoginController } from '../../controllers/loginController';
import type { User } from '../../interfaces';
import { eventBus } from '../../utils/eventBus';
import classes from './LoginPage.module.css';

export class LoginPage extends Component<'section'> {
  private controller: LoginController;
  private form: Component<'form'>;
  private passwordInput: Component<'input'>;
  private loginInput: Component<'input'>;
  private loginButton: Component<'button'>;
  private infoButton: Component<'button'>;
  private loginLabel: Component<'label'>;
  private passwordLabel: Component<'label'>;
  private loginTooltip: Component<'span'>;
  private passwordTooltip: Component<'span'>;
  private formTitle: Component<'h2'>;
  private errorMessage: Component<'p'>;

  private isLoginValid = false;
  private isPasswordValid = false;

  constructor() {
    super('section', { className: `${classes.loginPage}`, id: 'loginPage' });
    this.controller = new LoginController();

    this.form = new Component('form', { className: `${classes.loginForm}`, id: 'loginForm' });
    this.formTitle = new Component('h2', { className: `${classes.loginFormTitle}`, text: 'login', id: 'loginForm' });
    this.loginTooltip = new Component('span', { text: 'Requires both upper and lower case letters' });
    this.passwordTooltip = new Component('span', { text: 'Requires upper and lower case letters and digits' });
    this.loginInput = new Component('input', { id: 'loginInput', className: classes.loginFormInput });
    this.passwordInput = new Component('input', { id: 'passwordInput', className: classes.loginFormInput });
    this.loginLabel = new Component('label', { text: 'Login', className: classes.loginFormLabel });
    this.passwordLabel = new Component('label', { text: 'Password', className: classes.loginFormLabel });
    this.loginButton = new Component('button', { className: classes.formButton, text: 'Log in', id: 'loginBtn' })
      .setAttribute('type', 'submit')
      .setAttribute('disabled', 'true');
    this.infoButton = new Component('button', { className: classes.formButton, text: 'About', id: 'infoButton' }).setAttribute('type', 'button');
    this.errorMessage = new Component('p', { className: classes.errorMessage });

    this.setFormElements();
    this.setEventListenerToForm();
    this.setInputsProperties();
    this.appendChild(this.form);

    eventBus.subscribe('authError', event => {
      this.drawErrorMessage(event);
    });
    this.infoButton.element.addEventListener('click', this.onAboutBtnClick.bind(this));
    eventBus.subscribe('aboutBtnClicked', this.disableBtn.bind(this));
    eventBus.subscribe('backButtonClicked', this.enableBtn.bind(this));
  }

  private setEventListenerToForm(): void {
    this.loginInput.element.addEventListener('input', this.inputLoginOnChange.bind(this));
    this.passwordInput.element.addEventListener('input', this.inputPasswordOnChange.bind(this));
    this.form.element.addEventListener('submit', event => {
      event.preventDefault();
      this.onFormSubmit();
    });
  }

  private onAboutBtnClick(event: MouseEvent): void {
    window.location.hash = '#about';
    eventBus.emit('aboutBtnClicked', event);
  }

  private disableBtn(): void {
    this.infoButton.element.disabled = true;
  }

  private enableBtn(): void {
    this.infoButton.element.disabled = false;
  }

  private setInputsProperties(): void {
    this.passwordTooltip.element.classList.add(classes.inputTooltip, classes.inputTooltipPassword);
    this.loginTooltip.element.classList.add(classes.inputTooltip, classes.inputTooltipName);

    this.loginInput
      .setAttribute('type', 'text')
      .setAttribute('required', 'true')
      .setAttribute('name', 'loginForm')
      .setAttribute('placeholder', 'Login, min length 4 symbols')
      .setAttribute('minlength', '4');

    this.passwordInput
      .setAttribute('type', 'password')
      .setAttribute('required', 'true')
      .setAttribute('name', 'loginForm')
      .setAttribute('placeholder', 'Password, min length 6 symbols')
      .setAttribute('minlength', '8');
  }

  private setFormElements(): void {
    this.loginLabel.appendChild(this.loginTooltip);
    this.passwordLabel.appendChild(this.passwordTooltip);
    this.form.appendChildren([
      this.formTitle,
      this.loginLabel,
      this.loginInput,
      this.passwordLabel,
      this.passwordInput,
      this.loginButton,
      this.infoButton,
    ]);
  }

  private inputLoginOnChange(): boolean {
    const userNameInputValue = this.loginInput.element.value.trim();
    this.isLoginValid = this.controller.validateUserName(userNameInputValue);
    this.loginButton.element.disabled = !this.loginBtnIsDisabled();
    this.loginTooltip.element.style.opacity = this.isLoginValid ? '0' : '1';
    this.loginTooltip.element.style.visibility = this.isLoginValid ? 'hidden' : 'visible';
    return this.isLoginValid;
  }

  private inputPasswordOnChange(): boolean {
    const userPasswordValue = this.passwordInput.element.value.trim();
    this.isPasswordValid = this.controller.validatePassword(userPasswordValue);
    this.loginButton.element.disabled = !this.loginBtnIsDisabled();
    this.passwordTooltip.element.style.opacity = this.isPasswordValid ? '0' : '1';
    this.passwordTooltip.element.style.visibility = this.isPasswordValid ? 'hidden' : 'visible';
    return this.isPasswordValid;
  }

  private loginBtnIsDisabled(): boolean {
    return this.isPasswordValid && this.isLoginValid;
  }

  private onFormSubmit(): void {
    const userData: User = {
      login: this.getLogin(),
      password: this.getPassword(),
    };
    this.controller.handleFormSubmit(userData);
  }

  protected getLogin(): string {
    return this.loginInput.element.value;
  }

  protected getPassword(): string {
    return this.passwordInput.element.value;
  }

  private drawErrorMessage(message: Event): void {
    this.errorMessage.element.textContent = `${message}`;
    this.form.appendChild(this.errorMessage);
    setTimeout(() => {
      this.errorMessage.destroy();
      this.passwordInput.element.value = '';
    }, 2000);
  }
}
