import { Component } from '../../components';
import { Footer } from '../../components/footer/Footer';
import { GameHeader } from '../../components/gameHeader/GameHeader';
import { fetchImageData, fetchWordData } from '../../utils/commonUtils';
import { Data } from '../../interfaces/Data.interface';
import classes from './GamePage.module.css';

import bg from '../../assets/bg.jpg';
import { GameButtonBlock } from '../../components/gameButtonsBlock/GameButtonsBlock';
import {
  calculateCharWidth,
  createWordCards,
  clickHandlerToWordCards,
  verifySentenceAssembly,
  shuffleWords,
} from '../../utils/wordCardsHandlers';
import { checkLocalStoragePropertyFlag } from '../../utils/localStorage';
import { Header } from '../../components/header/Header';

export class GamePage extends Component {
  private gamePageContainer: Component;
  public mainHeader: Component;
  public header: Component;

  private mainContent: Component<HTMLDivElement>;
  public gameWrap: Component<HTMLDivElement>;
  public gameSourceDataBlock: Component<HTMLDivElement>;
  private gameButtonsBlock: Component;
  private footer: Component;

  public fetchedWordData: Data | null = null;
  public currentLevel: number = 1;
  public currentRound: number = 0;
  public sentencesForRound: string[] = [];
  public currentSentenceIndex: number = 0;
  private currentSentenceCards: HTMLElement[];
  public currentSentence: string;

  public audioExample: string | undefined;
  public translationWrap: Component<HTMLDivElement>;
  public isTranslateEnabled: boolean = true;
  public isPronounceEnabled: boolean = true;
  public isBgImageHintEnabled: boolean = true;
  private imageSource: string = '';
  private imageUrl: string = '';

  constructor() {
    super({ tagName: 'div', classNames: [classes.gamePageBg] });
    this.currentSentenceCards = [];
    this.currentSentence = '';
    this.isTranslateEnabled = this.checkIsTranslateEnabled();
    this.isPronounceEnabled = this.checkIsPronounceEnabled();
    this.isBgImageHintEnabled = this.checkIsBgImageHintEnabled();

    this.getNode().style.backgroundImage = `url(${bg})`;
    this.getNode().style.backgroundRepeat = 'no-repeat';
    this.getNode().style.backgroundPosition = 'center';

    // gamePageContainer
    this.gamePageContainer = new Component({
      tagName: 'div',
      classNames: [classes.gamePageContainer],
    });
    this.append(this.gamePageContainer);

    // header
    this.mainHeader = new Header();
    this.gamePageContainer.append(this.mainHeader);
    this.mainHeader.getNode().style.background = 'rgba(3, 6, 25, 0.7)';
    const userGreetingElement = this.mainHeader.getNode().querySelector('#userGreeting') as HTMLElement | null;
    if (userGreetingElement) {
      userGreetingElement.style.visibility = 'hidden';
    }

    // main content wrapper
    this.mainContent = new Component({
      tagName: 'main',
      classNames: [classes.mainContentWrapper],
    });
    this.gamePageContainer.append(this.mainContent);

    // Game header
    this.header = new GameHeader(this);
    this.mainContent.append(this.header);

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
    this.gameButtonsBlock = new GameButtonBlock(this);
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
        this.displaySentence();
        this.getImageForRound();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // handle fetched data
  private handleFetchedData() {
    if (this.fetchedWordData) {
      this.sentencesForRound = this.fetchedWordData.rounds[this.currentRound].words.map(word => word.textExample);
      this.audioExample =
        this.fetchedWordData?.rounds[this.currentRound]?.words[this.currentSentenceIndex]?.audioExample;
      this.imageSource = this.fetchedWordData.rounds[this.currentRound].levelData.imageSrc;

      //display translation if enabled
      if (this.isTranslateEnabled) {
        this.translationWrap.getNode().setAttribute('data-active', 'true');
        this.header.getNode().querySelector('#translateHint')!.setAttribute('active-hint', 'true');
        this.displayTranslation();
      }

      //display pronounce button if enabled
      if (this.isPronounceEnabled) {
        this.header.getNode().querySelector('#playSoundButton')!.removeAttribute('disabled');
        this.header.getNode().querySelector('#pronunciationHint')!.setAttribute('active-hint', 'true');
      } else {
        this.header.getNode().querySelector('#playSoundButton')!.setAttribute('disabled', 'true');
      }
    }
  }

  // display current sentence in the game source data block
  public displaySentence() {
    this.currentSentenceCards.length = 0;
    this.gameSourceDataBlock.getNode().innerHTML = '';

    this.currentSentence = this.sentencesForRound[this.currentSentenceIndex];

    const wordCards = createWordCards(
      this.currentSentence,
      classes.gameWrap,
      this.sentencesForRound.length,
      this.currentSentenceIndex,
      this.imageUrl,
      this.gameSourceDataBlock
    );

    this.setCardsWidth(wordCards);

    const shuffledWordCards = shuffleWords(wordCards);

    shuffledWordCards.forEach(wordCard => {
      wordCard.classList.add(classes.wordCard);
      shuffledWordCards.forEach((wordCard, index) => {
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

    //display bg image button if enabled
    if (this.isBgImageHintEnabled) {
      this.header.getNode().querySelector('#bgImageHint')!.setAttribute('active-hint', 'true');
      this.gameWrap.getNode()!.removeAttribute('bg-image-disabled');
      Array.from(this.gameSourceDataBlock.getNode().children).forEach(child => {
        child.removeAttribute('bg-image-disabled');
      });
    } else {
      this.header.getNode().querySelector('#bgImageHint')!.removeAttribute('active-hint');
      this.gameWrap.getNode()!.setAttribute('bg-image-disabled', 'true');
      Array.from(this.gameSourceDataBlock.getNode().children).forEach(child => {
        child.setAttribute('bg-image-disabled', 'true');
      });
    }
  }

  public checkIsTranslateEnabled(): boolean {
    return checkLocalStoragePropertyFlag('userData', 'translateEnabled') === true;
  }

  public checkIsPronounceEnabled(): boolean {
    return checkLocalStoragePropertyFlag('userData', 'pronounceEnabled') === true;
  }

  public checkIsBgImageHintEnabled(): boolean {
    return checkLocalStoragePropertyFlag('userData', 'bgImageHintEnabled') === true;
  }

  public displayTranslation() {
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
    const correctOrderWords = this.currentSentenceCards;
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
                if (
                  card.getAttribute('data-index') === index.toString() &&
                  card.getAttribute('data-value') === word.getAttribute('data-value')
                ) {
                  card.style.order = `${index}`;
                  card.style.transition = 'order 5s';
                  if (card.getAttribute('bg-image-disabled')) {
                    card.removeAttribute('bg-image-disabled');
                  }
                }
              });
            });
          },
          (index + 1) * 100
        );
      });
      this.translationWrap.getNode().setAttribute('data-active', 'true');
      this.displayTranslation();
    } else if (!isCorrect) {
      correctOrderWords.forEach((word, index) => {
        resultWordCards.forEach(card => {
          card.classList.remove(`${classes.wrongOrder}`);
          if (
            card.getAttribute('data-index') === index.toString() &&
            card.getAttribute('data-value') === word.getAttribute('data-value')
          ) {
            card.style.order = `${index}`;
            card.style.transition = 'order 5s';
            if (card.getAttribute('bg-image-disabled')) {
              card.removeAttribute('bg-image-disabled');
            }
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

  public async getImageForRound() {
    try {
      const image = await fetchImageData(this.imageSource);
      // Set the background image
      this.gameWrap.getNode().style.backgroundImage = `url(${image.src})`;
      const elements = Array.from(this.gameSourceDataBlock.getNode().children) as HTMLElement[];
      elements.forEach(element => {
        element.style.backgroundImage = `url(${image.src})`;
      });
      this.imageUrl = `url(${image.src})`;
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }
}
