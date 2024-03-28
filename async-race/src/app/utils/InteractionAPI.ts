import { CarOptions, CreatedCarOptions, GarageInterface } from '../interfaces/car.interface';

const serverUrl: string = 'http://localhost:3000';
const path = {
  garage: '/garage',
  engine: '/engine',
  winners: '/winners',
};

// garage cars
type GetCarsResponse = Promise<[Promise<GarageInterface>, number]>;

export const getCars = async (page: number, limit: number): GetCarsResponse => {
  const response: Response = await fetch(`${serverUrl}${path.garage}?_page=${page}&_limit=${limit}`);
  const cars = await response.json();
  const total: number = Number(response.headers.get('X-Total-Count'));
  return [cars, total];
};

export const createCar = async (carData: CreatedCarOptions): Promise<void> => {
  try {
    const response = await fetch(`${serverUrl}${path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      throw new Error('Failed to update server state');
    }
  } catch (error) {
    console.error('Error updating server state:', error);
  }
};

export const deleteCar = async (thisId: number): Promise<void> => {
  const id = thisId;
  try {
    const response = await fetch(`${serverUrl}${path.garage}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      console.error('Failed to delete car. Status:', response.status);
    }
  } catch (error) {
    console.error('Error updating server state:', error);
  }
};

export const updateCar = async (carData: CarOptions): Promise<void> => {
  const { id } = carData;
  try {
    const response = await fetch(`${serverUrl}${path.garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      throw new Error('Failed to update server state');
    }
  } catch (error) {
    console.error('Error updating server state:', error);
  }
};
