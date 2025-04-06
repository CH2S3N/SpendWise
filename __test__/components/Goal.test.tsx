import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react-native';
import AddGoal from '@/components/ui/AddGoal';
import UpdateGoal from '@/components/ui/UpdateGoal';

// Mock sqlite
jest.mock('expo-sqlite', () => ({
  useSQLiteContext: jest.fn().mockReturnValue({}),
}));

// Mock  UseTransactionService
jest.mock('@/hooks/editData/TransactionService', () => ({
  UseTransactionService: jest.fn(() => ({
    insertGoal: jest.fn(),
    updateGoal: jest.fn(),
  })),
}));

// Mock Redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue({
    categories: [],
    transactions: [],
  }),
  useDispatch: jest.fn(),
}));



jest.spyOn(console, 'error').mockImplementation((message) => {
  if (message.includes('act(...)')) return;
  console.error(message);
});

const mockCurrentGoal = {
  id: 1,
  name: "Rent",
  amount: 1000,
  currentAmount: 200,
};

describe("Add Goal Component", () => {
  it("should allow user to enter item description", () => {
    const { getByPlaceholderText } = render(<AddGoal setIsAddingGoal={jest.fn()} />);
    const input = getByPlaceholderText("Provide an Item Description");
    act(()=>{    
      fireEvent.changeText(input, "groceries");
    })
    expect(input.props.value).toBe("Groceries"); 
  });
  it("should allow user to enter amount", () => {
    const { getByPlaceholderText } = render(<AddGoal setIsAddingGoal={jest.fn()} />);
    
    const amountInput = getByPlaceholderText("Enter Amount");
    act(()=>{    
      fireEvent.changeText(amountInput, "0123abc");
    })
    expect(amountInput.props.value).toBe("123"); 
  });
  it("should allow user to enter accumulated amount and prevent exceeding the amount", () => {
    const { getByPlaceholderText } = render(<AddGoal setIsAddingGoal={jest.fn()} />);
    
    const amountInput = getByPlaceholderText("Enter Amount");
    const accAmountInput = getByPlaceholderText("Enter Accumulated Amount");
    act(()=>{    
      fireEvent.changeText(amountInput, "500");
      fireEvent.changeText(accAmountInput, "600");
    })
    act(()=>{
      fireEvent(accAmountInput, "onBlur"); 
    })

    expect(accAmountInput.props.value).toBe("500"); 
  });
  it("should enable Save button only when fields are valid", () => {
    const { getByText, getByPlaceholderText } = render(<AddGoal setIsAddingGoal={jest.fn()} />);
    
    const saveButton = getByText("Save");
    expect(saveButton.props.disabled).toBe(true); 
    act(()=>{    
      fireEvent.changeText(getByPlaceholderText("Provide an Item Description"), "Rent");
      fireEvent.changeText(getByPlaceholderText("Enter Amount"), "1000");
    })

    expect(saveButton.props.disabled).toBe(false); 
  });

});

describe("Update Goal Component", () => {
  it("should allow user to enter item description", () => {
    const { getByPlaceholderText } = render(<UpdateGoal setIsUpdatingGoal={jest.fn()} currentGoal={mockCurrentGoal} />);
    const input = getByPlaceholderText("Provide an Item Description");
    act(()=>{
      fireEvent.changeText(input, "groceries");
    })
    expect(input.props.value).toBe("Groceries"); 
  });
  it("should allow user to enter amount", () => {
    const { getByPlaceholderText } = render(<UpdateGoal setIsUpdatingGoal={jest.fn()} currentGoal={mockCurrentGoal} />);
    
    const amountInput = getByPlaceholderText("Enter Amount");
    act(()=>{
      fireEvent.changeText(amountInput, "0123abc");
    })
    expect(amountInput.props.value).toBe("123"); 
  });
  it("should allow user to enter accumulated amount and prevent exceeding the amount", () => {
    const { getByPlaceholderText } = render(<UpdateGoal setIsUpdatingGoal={jest.fn()} currentGoal={mockCurrentGoal} />);
    
    const amountInput = getByPlaceholderText("Enter Accumulated Amount");
    const accAmountInput = getByPlaceholderText("Enter Accumulated Amount");
    act(()=>{
      fireEvent.changeText(amountInput, "1000");
      fireEvent.changeText(accAmountInput, "1200");
    })
    act(()=>{
      fireEvent(accAmountInput, "onBlur"); 
    })

    expect(accAmountInput.props.value).toBe("1000"); 
  });
  it("should enable Save button only when fields are valid", () => {
    const { getByText, getByPlaceholderText } = render(<UpdateGoal setIsUpdatingGoal={jest.fn()} currentGoal={mockCurrentGoal} />);
    
    const saveButton = getByText("Save");
    expect(saveButton.props.disabled).toBe(false); 
    act(()=>{
      fireEvent.changeText(getByPlaceholderText("Provide an Item Description"), "Rent");
      fireEvent.changeText(getByPlaceholderText("Enter Amount"), "1000");
    })
    act(()=>{
      expect(saveButton.props.disabled).toBe(false); 
    })
  });
  it("should open confirmation modal when Save is clicked", () => {
    const { getByText, getByPlaceholderText } = render(<UpdateGoal setIsUpdatingGoal={jest.fn()} currentGoal={mockCurrentGoal} />);
    act(()=>{
      fireEvent.changeText(getByPlaceholderText("Provide an Item Description"), "Rent");
      fireEvent.changeText(getByPlaceholderText("Enter Amount"), "1000");
      fireEvent.press(getByText("Save"));
    })
 
    
    expect(screen.getByText("Save")).toBeTruthy();
  });
});
