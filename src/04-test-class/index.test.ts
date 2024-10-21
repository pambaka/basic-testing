import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash', () => {
  return {
    random: jest.fn(),
  };
});

const initialBalance = 111;
const account = getBankAccount(initialBalance);
const anotherAccount = getBankAccount(0);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const currentBalance = account.getBalance();

    expect(() => account.withdraw(currentBalance + 1)).toThrowError(
      new InsufficientFundsError(account.getBalance()).message,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const currentBalance = account.getBalance();

    expect(() =>
      account.transfer(currentBalance + 1, anotherAccount),
    ).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const currentBalance = account.getBalance();

    expect(() => account.transfer(currentBalance - 1, account)).toThrowError();
  });

  test('should deposit money', () => {
    const moneyToAdd = 1; // it works with negative values too :)
    const currentBalance = account.getBalance();

    account.deposit(moneyToAdd);
    expect(account.getBalance()).toBe(currentBalance + moneyToAdd);
  });

  test('should withdraw money', () => {
    const currentBalance = account.getBalance();
    const moneyToWithdraw = 1;

    account.withdraw(moneyToWithdraw);
    expect(account.getBalance()).toBe(currentBalance - moneyToWithdraw);
  });

  test('should transfer money', () => {
    const currentBalance = account.getBalance();
    const anotherAccountBalance = anotherAccount.getBalance();

    account.transfer(currentBalance - 1, anotherAccount);
    expect(account.getBalance()).toBe(1);
    expect(anotherAccount.getBalance()).toBe(
      anotherAccountBalance + currentBalance - 1,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 5;

    (random as jest.Mock).mockImplementation(() => balance);

    expect(account.fetchBalance()).resolves.toBe(balance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 88;

    (random as jest.Mock).mockImplementation(() => balance);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock)
      .mockImplementationOnce(() => 11)
      .mockImplementation(() => 0);

    expect(account.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError().message,
    );
  });
});
