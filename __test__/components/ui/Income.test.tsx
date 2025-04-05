import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import AddIncome from '@/components/ui/addIncome';
import UpdateIncome from '@/components/ui/UpdateIncome';
import { Alert } from 'react-native';
import { Income } from '@/types';

// Mock the UseTransactionService hook to prevent actual API calls
jest.mock('@/hooks/editData/TransactionService', () => ({
  UseTransactionService: jest.fn(() => ({
    insertGoal: jest.fn(),
    updateIncome: jest.fn(),
   
  })),
}));

jest.spyOn(console, 'error').mockImplementation((message) => {
  if (message.includes('act(...)')) return;
  console.error(message);
});


const mockIncome: Income = {
  id: 1,
  incomeCategoryId: 101,
  amount: 5000,
  description: "Monthly Salary",
  frequency: "Monthly",
  type: "Salary",
  interval: 1,
  intervalInput: 1,
  subtype: "All",
};

describe("Add Income Component", () => {

  it('should update description text and capitalize first letter of each word', () => {
    const { getByPlaceholderText } = render(<AddIncome setIsAddingIncome={jest.fn()} />);
    const descriptionInput = getByPlaceholderText('Provide an Item Description');
    fireEvent.changeText(descriptionInput, 'test description');
    expect(descriptionInput.props.value).toBe('Test Description');
  });

  it("should allow to enter amount", () => {
    const { getByPlaceholderText } = render(<AddIncome setIsAddingIncome={jest.fn()} />);
    
    const amountInput = getByPlaceholderText("Enter Amount");
    
    fireEvent.changeText(amountInput, "0123abc");
    expect(amountInput.props.value).toBe("123"); 
  });

  it('should update segmented control value of Category when an option is selected', async () => {
    const { getByTestId } = render(<AddIncome setIsAddingIncome={jest.fn()} />);
    const segmentedControl = getByTestId('income-segmented-control');

    fireEvent.press(segmentedControl, { nativeEvent: { selectedSegmentIndex: 0 } });

    expect(segmentedControl.props.selectedIndex).toBe(0);
  });
  it('should update segmented control value of Frequency when an option is selected', async () => {
    const { getByTestId } = render(<AddIncome setIsAddingIncome={jest.fn()} />);
    const segmentedControl = getByTestId('income-recurrence-segmented-control');

    fireEvent.press(segmentedControl, { nativeEvent: { selectedSegmentIndex: 0 } });

    expect(segmentedControl.props.selectedIndex).toBe(0);
  });
  
});
describe("Update Income Component", () => {

  it('should update description text and capitalize first letter of each word', () => {
    const { getByPlaceholderText } = render(<UpdateIncome setIsUpdatingIncome={jest.fn()} setIsModalVisible={function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.');
    } } currentIncome={mockIncome} />);
    const descriptionInput = getByPlaceholderText('Provide an Item Description');
    fireEvent.changeText(descriptionInput, 'test description');
    expect(descriptionInput.props.value).toBe('Test Description');
  });

  it("should allow to enter amount", () => {
    const { getByPlaceholderText } = render(<UpdateIncome setIsUpdatingIncome={jest.fn()} setIsModalVisible={function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.');
    } } currentIncome={mockIncome} />);
    
    const amountInput = getByPlaceholderText("Enter Amount");
    
    fireEvent.changeText(amountInput, "0123abc");
    expect(amountInput.props.value).toBe("123"); 
  });

  it('should update segmented control value of Category when an option is selected', async () => {
    const { getByTestId } = render(<UpdateIncome setIsUpdatingIncome={jest.fn()} setIsModalVisible={function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.');
    } } currentIncome={mockIncome} />);
    const segmentedControl = getByTestId('income-segmented-control');

    fireEvent.press(segmentedControl, { nativeEvent: { selectedSegmentIndex: 0 } });

    expect(segmentedControl.props.selectedIndex).toBe(1);
  });
  it('should update segmented control value of Frequency when an option is selected', async () => {
    const { getByTestId } = render(<UpdateIncome setIsUpdatingIncome={jest.fn()} setIsModalVisible={function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.');
    } } currentIncome={mockIncome} />);
    const segmentedControl = getByTestId('income-recurrence-segmented-control');

    fireEvent.press(segmentedControl, { nativeEvent: { selectedSegmentIndex: 0 } });

    expect(segmentedControl.props.selectedIndex).toBe(3);
  });
  
});


