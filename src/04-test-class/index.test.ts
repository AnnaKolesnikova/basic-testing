// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

const initialBalance = 3000;
const newBankAccount: BankAccount = getBankAccount(initialBalance);
const transferAccount: BankAccount = getBankAccount(initialBalance);
const fetchedBalance = 200;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(newBankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => newBankAccount.withdraw(initialBalance + 5)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      newBankAccount.transfer(newBankAccount.getBalance() + 5, transferAccount),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      newBankAccount.transfer(newBankAccount.getBalance() - 5, newBankAccount),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const currentBalance = newBankAccount.getBalance();
    const depositAmount = 1000;
    expect(newBankAccount.deposit(depositAmount).getBalance()).toBe(
      currentBalance + depositAmount,
    );
  });

  test('should withdraw money', () => {
    const currentBalance = newBankAccount.getBalance();
    const withdrawnAmount = 100;
    expect(newBankAccount.withdraw(withdrawnAmount).getBalance()).toBe(
      currentBalance - withdrawnAmount,
    );
  });

  test('should transfer money', () => {
    const currentBalance = newBankAccount.getBalance();
    const transferAccountBalance = transferAccount.getBalance();
    const amountToTransfer = 50;
    expect(
      newBankAccount.transfer(amountToTransfer, transferAccount).getBalance(),
    ).toBe(currentBalance - amountToTransfer);
    expect(transferAccount.getBalance()).toBe(
      transferAccountBalance + amountToTransfer,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(fetchedBalance)
      .mockReturnValueOnce(1);
    const result = await newBankAccount.fetchBalance();
    expect(result).toBe(fetchedBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest
      .spyOn(newBankAccount, 'fetchBalance')
      .mockResolvedValueOnce(fetchedBalance);
    await newBankAccount.synchronizeBalance();
    expect(newBankAccount.getBalance()).toBe(fetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(newBankAccount, 'fetchBalance').mockResolvedValueOnce(null);
    const balanceSyncronize =
      newBankAccount.synchronizeBalance.bind(newBankAccount);
    expect(balanceSyncronize).rejects.toThrowError(SynchronizationFailedError);
  });
});
