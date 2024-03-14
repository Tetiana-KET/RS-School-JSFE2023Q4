// Footer.ts
import { GamePage } from '../../pages/gamePage/GamePage';
import { verifyWordOrder } from '../../utils/wordCardsHandlers';
import { Component } from '../Component';
import classes from './GameButtonsBlock.module.css';

export class GameButtonsBlock extends Component {
  private checkButton: Component<HTMLButtonElement>;
  private continueButton: Component<HTMLButtonElement>;
  private autoCompleteButton: Component<HTMLButtonElement>;
  private checkButtonWrap: Component<HTMLDivElement>;
  private completeButtonWrap: Component<HTMLDivElement>;
  private gamePageInstance: GamePage;

  constructor(gamePageInstance: GamePage) {
    super({ tagName: 'div', classNames: [classes.gameButtonsBlock] });

    this.gamePageInstance = gamePageInstance;

    //auto-complete Button Wrap
    this.completeButtonWrap = new Component({
      tagName: 'div',
      classNames: [classes.completeButtonWrap],
    });
    this.append(this.completeButtonWrap);

    //check-continue Button Wrap
    this.checkButtonWrap = new Component({
      tagName: 'div',
      classNames: [classes.checkButtonWrap],
    });
    this.append(this.checkButtonWrap);

    //auto complete button
    this.autoCompleteButton = new Component<HTMLButtonElement>({
      tagName: 'button',
      classNames: [classes.button, classes.autoCompleteButton],
      text: 'Auto-complete',
      attributes: { type: 'button' },
    });
    this.completeButtonWrap.append(this.autoCompleteButton);

    //Check button
    this.checkButton = new Component({
      tagName: 'button',
      text: `Check`,
      classNames: [classes.button, classes.checkButton],
      attributes: { type: 'button', disabled: true },
    });
    this.checkButtonWrap.append(this.checkButton);

    //continue button
    this.continueButton = new Component<HTMLButtonElement>({
      tagName: 'button',
      classNames: [classes.button],
      text: 'Continue',
      attributes: { type: 'button', disabled: true, invisible: 'true' },
    });
    this.checkButtonWrap.append(this.continueButton);

    // Event listener for logout button
    this.checkButton.getNode().addEventListener('click', this.handleCheckButtonClick.bind(this));
    this.continueButton.getNode().addEventListener('click', this.handleContinueButtonClick.bind(this));
  }

  private handleCheckButtonClick() {
    const index = this.gamePageInstance.currentSentenceIndex;
    const sentenceLine = Array.from(this.gamePageInstance.gameWrap.getNode().children)[index];
    verifyWordOrder(this.gamePageInstance.currentSentence, sentenceLine);
  }

  private handleContinueButtonClick() {
    this.gamePageInstance.currentSentenceIndex += 1;
    if (this.gamePageInstance.currentSentenceIndex < this.gamePageInstance.sentencesForRound.length) {
      this.continueButton.setAttribute('disabled', 'disabled');
      this.continueButton.setAttribute('invisible', 'true');
      this.checkButton.removeAttribute('invisible');
      this.gamePageInstance.displaySentence();
    }
  }
}
