import classes from './Garage.module.css';
import { Component } from '../../components/Component';
import { Pagination } from '../../components/pagination/Pagination';
import Car from '../carTrack/CarTrack';
import CarModelGenerator from '../../utils/carModelGenerator';
import { createFormWrapper } from './garage.templates';
import { CreatedCarOptions } from '../../interfaces/car.interface';
import { createCarsInGarage, togglePaginationBtnsState, updatePageTitle } from '../../utils/RenderingUI';
import {
  createCar,
  deleteCar,
  deleteWinner,
  resetRace,
  startCarEngine,
  startCarEngineAnimation,
  startRace,
  stopEngine,
  updateCar,
} from '../../utils/InteractionAPI';
import { createPageTitle } from '../../components/pageTitle';
import { eventBus } from '../../utils/eventBus';
import { disableCarBtns } from '../carTrack/CarButtonsToggler';

export default class GarageView extends Component {
  private formWrap: Component<HTMLDivElement>;
  private titleWrap: Component<HTMLDivElement>;
  private garageRaceContainer: Component<HTMLDivElement>;

  private CARS_LIMIT: number = 7;
  private currentPage: number = 1;
  private lastPage: number = 1;
  private paginationWrap: Pagination;
  private CarModelGenerator = new CarModelGenerator();

  constructor() {
    super({ tagName: 'section', classNames: [classes.garage], attributes: { id: 'garageSection' } });
    this.titleWrap = new Component({ tagName: 'div', classNames: [classes.titleWrapper] });
    this.garageRaceContainer = new Component({ tagName: 'div', classNames: [classes.garageRaceContainer] });
    this.formWrap = new Component({ tagName: 'div', classNames: [classes.settings] });
    this.formWrap.getNode().innerHTML = this.createFormWrapper();
    this.titleWrap.getNode().innerHTML = this.createGarageTitle(this.currentPage);
    this.paginationWrap = new Pagination({
      onFirstClick: this.onFirstClick,
      onPrevClick: this.onPrevClick,
      onNextClick: this.onNextClick,
      onLastClick: this.onLastClick,
      pageName: 'garage',
    });
    this.appendElements(this.formWrap, this.titleWrap, this.garageRaceContainer, this.paginationWrap);
    this.createGarageView(this.garageRaceContainer.getNode(), this.currentPage, this.CARS_LIMIT);
    this.generateBtnAddListener();
    this.raceButtonsAddEventListener();
    this.reserButtonsAddEventListener();
    this.setPaginationPageNum();
    this.togglePagination();
  }

  private setPaginationPageNum(): void {
    const pageNumElement = this.paginationWrap.getNode().querySelector(`#garagePageNum`) as HTMLElement;
    pageNumElement.textContent = this.currentPage.toString();
  }

  private createBtnAddListener(): void {
    // create NEW CAR
    const carNameInput = this.formWrap.getNode().querySelector('#create-car-name');
    carNameInput?.addEventListener('input', this.createCarNameInputHandler.bind(this));

    const createBtn = this.formWrap.getNode().querySelector(`.${classes.createBtn}`);
    createBtn?.addEventListener('click', this.createBtnClickHandler);
  }

  private updateBtnAddListener(): void {
    // UPDATE CAR
    this.formWrap.getNode().querySelector(`.${classes.updateBtn}`)?.addEventListener('click', this.updateBtnClickHandler.bind(this));
  }

  private generateBtnAddListener(): void {
    const generateBtn = this.formWrap.getNode().querySelector(`.${classes.generateBtn}`);
    generateBtn?.addEventListener('click', this.generateBtnClickHandler.bind(this));
  }

  private raceButtonsAddEventListener(): void {
    const startRaceBtn = this.formWrap.getNode().querySelector(`.${classes.raceBtn}`) as HTMLButtonElement;
    startRaceBtn.addEventListener('click', this.handleStartRaceBtnClick.bind(this));
  }

  private reserButtonsAddEventListener(): void {
    const resetRaceBtn = this.formWrap.getNode().querySelector(`.${classes.resetBtn}`) as HTMLButtonElement;
    resetRaceBtn.addEventListener('click', this.handleResetRaceBtnClick.bind(this));
  }

  private appendElements(
    formWrapper: Component<HTMLElement>,
    titleWrapper: Component<HTMLElement>,
    garageRaceComponent: Component<HTMLElement>,
    paginationWrapper: Component<HTMLElement>
  ): void {
    this.append(formWrapper);
    this.append(titleWrapper);
    this.append(garageRaceComponent);
    this.append(paginationWrapper);
  }

  private async createGarageView(garageContainer: HTMLElement, currentPage: number, CARS_LIMIT: number): Promise<void> {
    const [carsInGarage, total] = await createCarsInGarage(currentPage, CARS_LIMIT);
    this.createBtnAddListener();
    this.updateBtnAddListener();
    const container = garageContainer;
    container.innerHTML = '';

    carsInGarage.forEach(carData => {
      const car = new Car({ ...carData, onDeleteClick: this.onDeleteCar, onStartClick: this.onStartCar, onStopClick: this.onStopCar });
      const carElement = car.getElement();
      container?.append(carElement);
    });
    this.lastPage = this.updateLastPage(total);
    updatePageTitle(total, currentPage, 'garage', this.lastPage);
    this.togglePagination();
  }

  private updateLastPage(totalCars: number): number {
    return Math.ceil(totalCars / this.CARS_LIMIT);
  }

  private onDeleteCar = async (input: { id: number }): Promise<void> => {
    await deleteCar(input.id);
    eventBus.emit('carDeleted', { carId: input.id });
    await deleteWinner(input.id);
    await this.createGarageView(this.garageRaceContainer.getNode(), this.currentPage, this.CARS_LIMIT);
  };

  private onStartCar = async (input: { id: number }): Promise<void> => {
    this.disableAllButtons();
    const trackLength = document.querySelector(`#car${input.id}`)?.clientWidth || 0;
    const { velocity, distance } = await startCarEngine(input.id);
    disableCarBtns(input.id);
    startCarEngineAnimation(distance, velocity, input.id, trackLength);
  };

  private onStopCar = async (input: { id: number }): Promise<void> => {
    disableCarBtns(input.id);
    const carElement = document.querySelector(`#car${input.id} #carIconWrap${input.id}`) as HTMLDivElement;
    try {
      await stopEngine(input.id).then(() => {
        carElement.setAttribute('engine', 'stopped');
      });
    } catch {
      throw new Error();
    }
    carElement.style.transform = `translateX(${0}px)`;
    carElement.setAttribute('returned', 'true');
  };

  private togglePagination(): void {
    const nextBtn = this.paginationWrap.getNode().querySelector('#garageNextBtn') as HTMLButtonElement;
    const lastBtn = this.paginationWrap.getNode().querySelector('#garageLastPageBtn') as HTMLButtonElement;
    if (this.lastPage === 1) {
      nextBtn.setAttribute('disabled', 'true');
      lastBtn.setAttribute('disabled', 'true');
    } else if (this.lastPage > 1) {
      nextBtn.removeAttribute('disabled');
      lastBtn.removeAttribute('disabled');
    }
  }

  // click first page pagination button
  private onFirstClick = async (): Promise<void> => {
    this.currentPage = 1;
    await this.createGarageView(this.garageRaceContainer.getNode(), this.currentPage, this.CARS_LIMIT);
    this.setPaginationPageNum();
    togglePaginationBtnsState(this.currentPage, this.lastPage, 'garage');
    this.enableAllButtons();
    const resetRaceBtn = document.querySelector(`#resetRaceBtn`) as HTMLButtonElement;
    resetRaceBtn.setAttribute('disabled', 'true');
  };

  // click prev page pagination button
  private onPrevClick = async (): Promise<void> => {
    this.currentPage -= 1;
    await this.createGarageView(this.garageRaceContainer.getNode(), this.currentPage, this.CARS_LIMIT);
    this.setPaginationPageNum();
    togglePaginationBtnsState(this.currentPage, this.lastPage, 'garage');
    this.enableAllButtons();
    const resetRaceBtn = document.querySelector(`#resetRaceBtn`) as HTMLButtonElement;
    resetRaceBtn.setAttribute('disabled', 'true');
  };

  // click next page pagination button
  private onNextClick = async (): Promise<void> => {
    this.currentPage += 1;
    await this.createGarageView(this.garageRaceContainer.getNode(), this.currentPage, this.CARS_LIMIT);
    this.setPaginationPageNum();
    togglePaginationBtnsState(this.currentPage, this.lastPage, 'garage');
    this.enableAllButtons();
    const resetRaceBtn = document.querySelector(`#resetRaceBtn`) as HTMLButtonElement;
    resetRaceBtn.setAttribute('disabled', 'true');
  };

  // click last page pagination button
  private onLastClick = async (): Promise<void> => {
    this.currentPage = this.lastPage;
    await this.createGarageView(this.garageRaceContainer.getNode(), this.currentPage, this.CARS_LIMIT);
    this.setPaginationPageNum();
    togglePaginationBtnsState(this.currentPage, this.lastPage, 'garage');
    this.enableAllButtons();
    const resetRaceBtn = document.querySelector(`#resetRaceBtn`) as HTMLButtonElement;
    resetRaceBtn.setAttribute('disabled', 'true');
  };

  // Create Name
  private createCarNameInputHandler(): void {
    const createButton = this.children[0].getNode().querySelector(`.${classes.createBtn}`) as HTMLButtonElement;
    const input = this.children[0].getNode().querySelector('#create-car-name') as HTMLInputElement;
    createButton.disabled = input.value.length < 3;
  }

  // click create button
  private createBtnClickHandler = async (): Promise<void> => {
    const nameInput = this.children[0].getNode().querySelector(`#create-car-name`) as HTMLInputElement;
    const carName = nameInput.value;
    const colorInput = this.children[0].getNode().querySelector(`#create-car-color`) as HTMLInputElement;
    const carColor = colorInput.value;
    try {
      await createCar({ name: carName, color: carColor });
    } catch {
      throw new Error();
    }
    this.createGarageView(this.garageRaceContainer.getNode(), this.currentPage, this.CARS_LIMIT);
    nameInput.value = '';
    colorInput.value = '#ffffff';
    const createButton = this.children[0].getNode().querySelector(`.${classes.createBtn}`) as HTMLButtonElement;
    createButton.disabled = true;
  };

  // click update button
  private async updateBtnClickHandler(): Promise<void> {
    const nameInput = this.children[0].getNode().querySelector(`#update-car-name`) as HTMLInputElement;
    const carName = nameInput.value;
    const colorInput = this.children[0].getNode().querySelector(`#update-car-color`) as HTMLInputElement;
    const carColor = colorInput.value;
    const CarId = Number(nameInput.getAttribute('car-id'));
    try {
      await updateCar({ id: CarId, name: carName, color: carColor });
    } catch {
      throw new Error();
    }
    this.createGarageView(this.garageRaceContainer.getNode(), this.currentPage, this.CARS_LIMIT);
    nameInput.value = '';
    colorInput.value = '#ffffff';
    const updateBtn = document.querySelector(`#updateBtn`) as HTMLButtonElement;
    updateBtn.disabled = true;
  }

  private disableAllButtons(): void {
    const startRaceBtn = this.formWrap.getNode().querySelector(`#startRaceBtn`) as HTMLButtonElement;
    const resetRaceBtn = this.formWrap.getNode().querySelector(`#resetRaceBtn`) as HTMLButtonElement;
    const generateCarsBtn = this.formWrap.getNode().querySelector(`#generateCarsBtn`) as HTMLButtonElement;

    resetRaceBtn.setAttribute('disabled', 'true');
    generateCarsBtn.setAttribute('disabled', 'true');
    startRaceBtn.setAttribute('disabled', 'true');
  }

  private enableAllButtons(): void {
    const startRaceBtn = this.formWrap.getNode().querySelector(`#startRaceBtn`) as HTMLButtonElement;
    const resetRaceBtn = this.formWrap.getNode().querySelector(`#resetRaceBtn`) as HTMLButtonElement;
    const generateCarsBtn = this.formWrap.getNode().querySelector(`#generateCarsBtn`) as HTMLButtonElement;

    resetRaceBtn.removeAttribute('disabled');
    generateCarsBtn.removeAttribute('disabled');
    startRaceBtn.removeAttribute('disabled');
  }

  // CLICK START RACE
  private async handleStartRaceBtnClick(): Promise<void> {
    this.disableAllButtons();
    const cars = Array.from(this.garageRaceContainer.getNode().children);
    try {
      await startRace(cars).then(() => {
        const resetRaceBtn = this.formWrap.getNode().querySelector(`#resetRaceBtn`) as HTMLButtonElement;
        resetRaceBtn.removeAttribute('disabled');
      });
    } catch (error) {
      console.error('Error starting race:', error);
    }
  }

  // click RESET
  private async handleResetRaceBtnClick(): Promise<void> {
    this.disableAllButtons();
    const cars = Array.from(this.garageRaceContainer.getNode().children);
    await resetRace(cars, this.onStopCar).then(() => {
      const startRaceBtn = this.formWrap.getNode().querySelector(`#startRaceBtn`) as HTMLButtonElement;
      const generateCarsBtn = this.formWrap.getNode().querySelector(`#generateCarsBtn`) as HTMLButtonElement;
      startRaceBtn.removeAttribute('disabled');
      generateCarsBtn.removeAttribute('disabled');
    });
  }

  // click generate button
  private generateBtnClickHandler(): void {
    this.hundredCarGeneration();
    this.createGarageView(this.garageRaceContainer.getNode(), this.currentPage, this.CARS_LIMIT);
  }

  private async hundredCarGeneration(): Promise<void> {
    const carsInfoArray = [...Array(100)].map(() => this.CarModelGenerator.generateRandomCar());
    const promises = carsInfoArray.map((carInfo: CreatedCarOptions) => createCar(carInfo));
    await Promise.all(promises);
  }

  private createFormWrapper(): string {
    return createFormWrapper(classes);
  }

  private createGarageTitle(page: number): string {
    return createPageTitle(page, classes, 'garage');
  }
}