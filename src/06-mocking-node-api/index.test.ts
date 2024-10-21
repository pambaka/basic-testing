import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1111;

    const spy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);
    expect(spy).toBeCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 1212);

    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 100;

    const spy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);
    expect(spy).toBeCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 111;
    const times = 10;

    doStuffByInterval(callback, interval);

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(times * interval);
    expect(callback).toBeCalledTimes(times);
  });
});

jest.mock('path', () => {
  return {
    join: jest.fn(),
  };
});

jest.mock('fs', () => {
  return {
    existsSync: jest.fn(),
  };
});

jest.mock('fs/promises', () => {
  return {
    readFile: jest.fn(),
  };
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'Some file name';

  test('should call join with pathToFile', async () => {
    (path.join as jest.Mock).mockImplementation(jest.fn);

    const spy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);
    expect(spy).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockImplementation(() => false);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'This is an existing file content';

    (existsSync as jest.Mock).mockImplementation(() => true);
    (readFile as jest.Mock).mockImplementation(() => fileContent);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(fileContent);
  });
});
