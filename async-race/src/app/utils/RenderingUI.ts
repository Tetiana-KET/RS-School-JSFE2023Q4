import { GarageInterface } from '../interfaces/car.interface';

import { getCars } from './InteractionAPI';

export function updateGarageTitle(carsCount: number): void {
  const titleWrapper = document.querySelector(`#carsCount h2`);
  if (titleWrapper) {
    titleWrapper.innerHTML = `<h2>Cars in Garage: ( ${carsCount} )</h2>`;
  }
}

export async function createCarsInGarage(garageContainer: HTMLElement, page: number, limit: number): Promise<GarageInterface> {
  const [cars] = await getCars(page, limit);
  const carsInGarage = await cars;
  return carsInGarage;
}
