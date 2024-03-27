import { GarageInterface } from '../interfaces/car.interface';

const serverUrl: string = 'http://localhost:3000';
const path = {
  garage: '/garage',
  engine: '/engine',
  winners: '/winners',
};

export const CARS_LIMIT = 7;
export const currentPage = 1;

// garage cars
type GetCarsResponse = Promise<[Promise<GarageInterface>, number]>;

export const getCars = async (page: number, limit: number): GetCarsResponse => {
  const response: Response = await fetch(`${serverUrl}${path.garage}?_page=${page}&_limit=${limit}`);
  const cars = await response.json();
  const total: number = Number(response.headers.get('X-Total-Count'));
  console.log(`response `, response);
  return [cars, total];
};