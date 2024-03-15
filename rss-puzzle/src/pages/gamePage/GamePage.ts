import { Component } from '../../components';
import { Footer } from '../../components/footer/Footer';
import { GameHeader } from '../../components/gameHeader/GameHeader';
import { fetchWordData, shuffleWords } from '../../utils/commonUtils';
import { Data } from '../../interfaces/Data.interface';
import classes from './GamePage.module.css';

import bg from '../../assets/bg.jpg';
import { GameButtonsBlock } from '../../components/gameButtonsBlock/GameButtonsBlock';
import {
  calculateCharWidth,
  createWordCards,
  clickHandlerToWordCards,
  verifySentenceAssembly,
} from '../../utils/wordCardsHandlers';
import { checkLocalStoragePropertyFlag } from '../../utils/localStorage';

export class GamePage extends Component {
  private gamePageContainer: Component;
  public header: Component;
  private mainContent: Component<HTMLDivElement>;
  public gameWrap: Component<HTMLDivElement>;
  private gameSourceDataBlock: Component<HTMLDivElement>;
  private gameButtonsBlock: Component;
  private footer: Component;
  public fetchedWordData: Data | null = null;
  public currentLevel: number = 1;
  public currentRound: number = 0;
  public sentencesForRound: string[] = [];
  public currentSentenceIndex: number = 0;
  private currentSentenceCards: HTMLElement[];
  public currentSentence: string;
  public translationWrap: Component<HTMLDivElement>;
  public isTranslateEnabled: boolean = false;

  constructor() {
    super({ tagName: 'div', classNames: [classes.gamePageBg] });
    this.currentSentenceCards = [];
    this.currentSentence = '';
    this.isTranslateEnabled = this.checkIsTranslateEnabled();

    this.getNode().style.backgroundImage = `url(${bg})`;
    this.getNode().style.backgroundSize = 'cover';
    this.getNode().style.backgroundRepeat = 'no-repeat';
    this.getNode().style.backgroundPosition = 'center';
    // gamePageContainer
    this.gamePageContainer = new Component({
      tagName: 'div',
      classNames: [classes.gamePageContainer],
    });
    this.append(this.gamePageContainer);
    // header
    this.header = new GameHeader(this);
    this.gamePageContainer.append(this.header);

    // main content wrapper
    this.mainContent = new Component({
      tagName: 'main',
      classNames: [classes.mainContentWrapper],
    });
    this.gamePageContainer.append(this.mainContent);

    // translation wrap
    this.translationWrap = new Component({
      tagName: 'div',
      classNames: [classes.translationWrap],
    });
    this.mainContent.append(this.translationWrap);
    // game wrapper
    this.gameWrap = new Component({
      tagName: 'div',
      classNames: [classes.gameWrap],
    });
    this.mainContent.append(this.gameWrap);
    // Add lines for sentences
    for (let i = 1; i <= 10; i++) {
      const sentenceLine = document.createElement('div');
      sentenceLine.classList.add(classes.sentenceLine);
      this.gameWrap.getNode().appendChild(sentenceLine);
    }
    // game source data block
    this.gameSourceDataBlock = new Component({
      tagName: 'div',
      classNames: [classes.gameSourceDataBlock],
    });
    this.mainContent.append(this.gameSourceDataBlock);
    //buttons
    this.gameButtonsBlock = new GameButtonsBlock(this);
    this.mainContent.append(this.gameButtonsBlock);

    // Footer
    this.footer = new Footer();
    this.gamePageContainer.append(this.footer);
    // fetch data
    this.fetchWordData();

    // event listener for window resize
    window.addEventListener('resize', () => {
      if (this.currentSentenceCards.length) {
        this.setCardsWidth(this.currentSentenceCards);
      }
    });
  }

  private fetchWordData() {
    fetchWordData(this.currentLevel)
      .then(data => {
        this.fetchedWordData = data;
        this.handleFetchedData();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // handle fetched data
  private handleFetchedData() {
    if (this.fetchedWordData) {
      this.sentencesForRound = this.fetchedWordData.rounds[this.currentRound].words.map(word => word.textExample);
      this.displaySentence();
      //display translation if enabled
      if (this.isTranslateEnabled) {
        this.translationWrap.getNode().setAttribute('data-active', 'true');
        this.header.getNode().querySelector('#translateHint')!.setAttribute('active-hint', 'true');
        this.displayTranslation();
      }
    }
  }

  // display current sentence in the game source data block
  public displaySentence() {
    this.currentSentenceCards.length = 0;
    this.gameSourceDataBlock.getNode().innerHTML = '';

    this.currentSentence = this.sentencesForRound[this.currentSentenceIndex];
    const shuffledWords = shuffleWords(this.currentSentence);
    const wordCards = createWordCards(shuffledWords);

    this.setCardsWidth(wordCards);

    wordCards.forEach(wordCard => {
      wordCard.classList.add(classes.wordCard);
      wordCards.forEach((wordCard, index) => {
        setTimeout(
          () => {
            wordCard.style.visibility = 'visible';
            wordCard.style.opacity = '1';
          },
          (index + 1) * 100
        );
      });
      this.gameSourceDataBlock.getNode().append(wordCard);
    });
    this.addClickHandlersToWordCards(wordCards);
    this.currentSentenceCards.push(...wordCards);
  }

  public checkIsTranslateEnabled(): boolean {
    return checkLocalStoragePropertyFlag('userData', 'translateEnabled') === true;
  }

  public displayTranslation() {
    if (!this.translationWrap.getNode().getAttribute('data-active')) {
      this.translationWrap.getNode().setAttribute('data-active', 'true');
    }
    const translation =
      this.fetchedWordData?.rounds[this.currentRound].words[this.currentSentenceIndex].textExampleTranslate;
    this.translationWrap.setTextContent(`${translation}`);
  }

  private addClickHandlersToWordCards(wordCards: HTMLElement[]) {
    clickHandlerToWordCards(
      wordCards,
      this.gameWrap,
      `${classes.gameSourceDataBlock}`,
      `${classes.sentenceLine}`,
      this.currentSentenceIndex,
      `${classes.selected}`,
      this.currentSentence,
      this.gameButtonsBlock,
      this
    );
  }

  private setCardsWidth(wordCards: HTMLElement[]): void {
    const currentSentence = this.sentencesForRound[this.currentSentenceIndex];
    const parent = this.gameSourceDataBlock;
    const charWidth = calculateCharWidth(currentSentence, parent);

    for (let i = 0; i < wordCards.length; i += 1) {
      wordCards[i].style.width = `${wordCards[i].textContent!.length * charWidth}px`;
    }
  }

  public autoCompleteSentence(): void {
    const sentenceLine = this.gameWrap.getNode().children[this.currentSentenceIndex];
    const sourceWordCards = Array.from(this.gameSourceDataBlock.getNode().children) as HTMLElement[];
    const resultWordCards = Array.from(sentenceLine.children) as HTMLElement[];
    const correctOrderWords = this.currentSentence.split(' ');
    const continueButton = this.gameButtonsBlock.getNode().lastChild?.lastChild as HTMLButtonElement;
    const checkButton = this.gameButtonsBlock.getNode().lastChild?.firstChild as HTMLButtonElement;
    const isCorrect = verifySentenceAssembly(this.currentSentence, sentenceLine);

    if (sourceWordCards.length) {
      sourceWordCards.forEach((wordCard, index) => {
        wordCard.style.visibility = 'hidden';
        wordCard.style.opacity = '0';
        setTimeout(
          () => {
            wordCard.remove();
            sentenceLine.append(wordCard);
            resultWordCards.push(wordCard);
            wordCard.style.visibility = 'visible';
            wordCard.style.opacity = '1';

            correctOrderWords.forEach((word, index) => {
              resultWordCards.forEach(card => {
                if (card.getAttribute('data-value') === word) {
                  card.style.order = `${index}`;
                  card.style.transition = 'order 5s';
                }
              });
            });
          },
          (index + 1) * 100
        );
      });

      this.displayTranslation();
    } else if (!isCorrect) {
      correctOrderWords.forEach((word, index) => {
        resultWordCards.forEach(card => {
          card.classList.remove(`${classes.wrongOrder}`);
          if (card.getAttribute('data-value') === word) {
            card.style.order = `${index}`;
            card.style.transition = 'order 5s';
          }
        });
      });
    }
    setTimeout(() => {
      continueButton.removeAttribute('disabled');
      continueButton.removeAttribute('invisible');
      checkButton.setAttribute('invisible', 'true');
    }, 1000);
  }
}
