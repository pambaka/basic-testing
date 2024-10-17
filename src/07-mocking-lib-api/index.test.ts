import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  return {
    throttle: (fn: (relativePath: string) => Promise<unknown>) => fn,
  };
});

const data = 'Some data';
const axiosClient = { get: () => ({ data }) };
jest.mock('axios', () => {
  return {
    create: () => {
      return axiosClient;
    },
  };
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('users');

    expect(spy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = 'Some path';

    const spy = jest.spyOn(axiosClient, 'get');

    await throttledGetDataFromApi(relativePath);

    expect(spy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const responseData = await throttledGetDataFromApi('');
    expect(responseData).toBe(data);
  });
});
