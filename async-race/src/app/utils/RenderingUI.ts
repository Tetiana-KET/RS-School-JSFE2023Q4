import { GarageInterface } from '../interfaces/car.interface';

import { getCars } from './InteractionAPI';

export function updatePageTitle(carsCount: number, currentPage: number, pageName: string, lastPage: number = 1): void {
  const titleWrapper = document.querySelector(`#${pageName}CarsCount h2`);
  if (titleWrapper) {
    titleWrapper.innerHTML = `<h2>Cars in Garage: ( ${carsCount} )</h2>`;
  }
  const pageNumberWrapper = document.querySelector(`#${pageName}pageNumber`);
  if (pageNumberWrapper) {
    pageNumberWrapper.textContent = `Page: ( № ${currentPage} / ${lastPage})`;
  }
}

export async function createCarsInGarage(page: number, limit: number): Promise<[GarageInterface, number]> {
  const [cars, total] = await getCars(page, limit);
  const carsInGarage = await cars;
  const totalCars = total;
  return [carsInGarage, totalCars];
}

export function togglePaginationBtnsState(currentPage: number, lastPage: number): void {
  const firstPageBtn = document.querySelector('#firstPageBtn') as HTMLButtonElement;
  const prevBtn = document.querySelector('#prevBtn') as HTMLButtonElement;
  const nextBtn = document.querySelector('#nextBtn') as HTMLButtonElement;
  const lastPageBtn = document.querySelector('#lastPageBtn') as HTMLButtonElement;

  if (currentPage > 1) {
    firstPageBtn.removeAttribute('disabled');
    prevBtn.removeAttribute('disabled');
  } else {
    firstPageBtn.setAttribute('disabled', 'true');
    prevBtn.setAttribute('disabled', 'true');
  }

  if (currentPage < lastPage) {
    lastPageBtn.removeAttribute('disabled');
    nextBtn.removeAttribute('disabled');
  } else {
    lastPageBtn.setAttribute('disabled', 'true');
    nextBtn.setAttribute('disabled', 'true');
  }
}
