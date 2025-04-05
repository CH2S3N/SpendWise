import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react-native';
import AddExpense from '@/components/ui/AddExpense';
import UpdateExpense from '@/components/ui/UpdateExpense';
import { Transaction } from '@/types';

// Mock sqlite
jest.mock('expo-sqlite', () => ({
  useSQLiteContext: jest.fn().mockReturnValue({}),
}));
// Mock transaction Service
jest.mock('@/hooks/editData/TransactionService', () => ({
  UseTransactionService: jest.fn().mockReturnValue({
    insertTransaction: jest.fn(),
    updateTransaction: jest.fn(),

  }),
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
const mockState:Transaction = {
  id: 1,
  category_id: 1,
  description: 'Rent',
  frequency: "Monthly" as "Monthly" | "Daily" | "Weekly" | "Bi-Weekly",
  prioritization: "High" as "High" | "Medium" | "Low",
  isfixedamount: 'Yes' as "Yes" | "No",
  amount: 5000,
  type: "Essential" as"Essential" | "Non_Essential",
  interval: 1,
  intervalInput: 1,
  subtype: "Custom" as "All" | "Weekends" | "Weekdays" | "Custom",
};
describe('Add Expense Component', () => {
  // Description input Testing
  it('should update description text and capitalize first letter of each word', () => {
    render(<AddExpense setIsAddingTransaction={jest.fn()} />);
    const descriptionInput = screen.getByPlaceholderText('Provide an entry description');
    fireEvent.changeText(descriptionInput, 'tryExpense');
    expect(descriptionInput.props.value).toBe('Tryexpense');
    });
  // Amount input Testing
  it("should allow to enter amount and accpet only whole numbers", () => {
      const { getByTestId } = render(<AddExpense setIsAddingTransaction={jest.fn()} />);
      const amountInput = getByTestId("amount");
      fireEvent.changeText(amountInput, "0123abc");
      expect(amountInput.props.value).toBe("123"); 
    });

  // Recurrence input Testing
  it("should render SegmentedControl with correct initial selection", () => {
    const { getByTestId } = render(<AddExpense setIsAddingTransaction={jest.fn()} />);
    const segmentControl = getByTestId("recurrence-segment-control");

    expect(segmentControl).toBeTruthy();
    expect(segmentControl.props.selectedIndex).toBe(0);
  });
  it("should update selected index when a new option is selected", async () => {
    const { getByTestId } = render(<AddExpense setIsAddingTransaction={jest.fn()} />);
    const segmentControl = getByTestId("recurrence-segment-control");

    fireEvent(segmentControl, "onChange", { nativeEvent: { selectedSegmentIndex: 1 } });

    await waitFor(() => expect(segmentControl.props.selectedIndex).toBe(1)); 
  });
  it("should switch to 'Bi-Weekly' correctly", async () => {
    const { getByTestId } = render(<AddExpense setIsAddingTransaction={jest.fn()} />);
    const segmentControl = getByTestId("recurrence-segment-control");

    fireEvent(segmentControl, "onChange", { nativeEvent: { selectedSegmentIndex: 2 } });

    await waitFor(() => expect(segmentControl.props.selectedIndex).toBe(2)); 
  });
  it("should switch to 'Monthly' correctly", async () => {
    const { getByTestId } = render(<AddExpense setIsAddingTransaction={jest.fn()} />);
    const segmentControl = getByTestId("recurrence-segment-control");

    fireEvent(segmentControl, "onChange", { nativeEvent: { selectedSegmentIndex: 3 } });

    await waitFor(() => expect(segmentControl.props.selectedIndex).toBe(3));
  });

  // Category Segmented control
  it("should render SegmentedControl with 'Needs' selected by default", () => {
    const { getByTestId } =render(<AddExpense setIsAddingTransaction={jest.fn()} />);
    const segmentControl = getByTestId("category-segment-control");

    expect(segmentControl).toBeTruthy();
    expect(segmentControl.props.selectedIndex).toBe(0); 
  });
  it("should switch to 'Wants' when selected", async () => {
    const { getByTestId } =render(<AddExpense setIsAddingTransaction={jest.fn()} />);
    const segmentControl = getByTestId("category-segment-control");

    fireEvent(segmentControl, "onChange", { nativeEvent: { selectedSegmentIndex: 1 } });

    await waitFor(() => expect(segmentControl.props.selectedIndex).toBe(1)); 
  }); 
  it("should switch back to 'Needs' when selected", async () => {
    const { getByTestId } =render(<AddExpense setIsAddingTransaction={jest.fn()} />);
    const segmentControl = getByTestId("category-segment-control");

    // Switch to "Wants" 
    fireEvent(segmentControl, "onChange", { nativeEvent: { selectedSegmentIndex: 1 } });
    await waitFor(() => expect(segmentControl.props.selectedIndex).toBe(1));

    // Switch to "Needs"
    fireEvent(segmentControl, "onChange", { nativeEvent: { selectedSegmentIndex: 0 } });
    await waitFor(() => expect(segmentControl.props.selectedIndex).toBe(0));
  });

});
describe('Update Expense Component', () => {
  // Description input Testing
  it('should update description text and capitalize first letter of each word', () => {
    render(<UpdateExpense setIsUpdatingTransaction={jest.fn()} setIsModalVisible={function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.');
    } } currentTransaction={mockState} />);
    const descriptionInput = screen.getByPlaceholderText('Provide an entry description');
    fireEvent.changeText(descriptionInput, 'tryExpense');
    expect(descriptionInput.props.value).toBe('Tryexpense');
    });
  // Amount input Testing
  it("should allow to enter amount and accpet only whole numbers", () => {  
    const { getByTestId } = render(<UpdateExpense setIsUpdatingTransaction={jest.fn()} setIsModalVisible={function (value: React.SetStateAction<boolean>): void {
        throw new Error('Function not implemented.');
      } } currentTransaction={mockState} />);
      const amountInput = getByTestId("amount");
      fireEvent.changeText(amountInput, "0123abc");

      expect(amountInput.props.value).toBe("123"); 
    });

  // Recurrence input Testing
  it("should render SegmentedControl with correct initial selection", () => {
    const { getByTestId } = render(<UpdateExpense setIsUpdatingTransaction={jest.fn()} setIsModalVisible={function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.');
    } } currentTransaction={mockState} />);
    const segmentControl = getByTestId("recurrence-segment-control");

    expect(segmentControl).toBeTruthy();
    expect(segmentControl.props.selectedIndex).toBe(3);
  });  
  it("should update selected index when a new option is selected", async () => {
    const { getByTestId } = render(<UpdateExpense setIsUpdatingTransaction={jest.fn()} setIsModalVisible={function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.');
    } } currentTransaction={mockState} />);
    const segmentControl = getByTestId("recurrence-segment-control");

    fireEvent(segmentControl, "onChange", { nativeEvent: { selectedSegmentIndex: 1 } });

    await waitFor(() => expect(segmentControl.props.selectedIndex).toBe(1)); 
  });
  it("should switch to 'Bi-Weekly' correctly", async () => {
    const { getByTestId } = render(<UpdateExpense setIsUpdatingTransaction={jest.fn()} setIsModalVisible={function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.');
    } } currentTransaction={mockState} />);
    const segmentControl = getByTestId("recurrence-segment-control");

    fireEvent(segmentControl, "onChange", { nativeEvent: { selectedSegmentIndex: 2 } });

    await waitFor(() => expect(segmentControl.props.selectedIndex).toBe(2)); 
  });
  it("should switch to 'Monthly' correctly", async () => {
    const { getByTestId } = render(<UpdateExpense setIsUpdatingTransaction={jest.fn()} setIsModalVisible={function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.');
    } } currentTransaction={mockState} />);
    const segmentControl = getByTestId("recurrence-segment-control");


    fireEvent(segmentControl, "onChange", { nativeEvent: { selectedSegmentIndex: 3 } });
    await waitFor(() => expect(segmentControl.props.selectedIndex).toBe(3));
  });

  // Category Segmented control
  it("should render SegmentedControl with 'Needs' selected by default", () => {
    const { getByTestId } =render(<UpdateExpense setIsUpdatingTransaction={jest.fn()} setIsModalVisible={function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.');
    } } currentTransaction={mockState} />);
    const segmentControl = getByTestId("category-segment-control");

    expect(segmentControl).toBeTruthy();
    expect(segmentControl.props.selectedIndex).toBe(0); 
  });
  it("should switch to 'Wants' when selected", async () => {
    const { getByTestId } =render(<UpdateExpense setIsUpdatingTransaction={jest.fn()} setIsModalVisible={function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.');
    } } currentTransaction={mockState} />);
    const segmentControl = getByTestId("category-segment-control");

    fireEvent(segmentControl, "onChange", { nativeEvent: { selectedSegmentIndex: 1 } });

    await waitFor(() => expect(segmentControl.props.selectedIndex).toBe(1)); 
  }); 
  it("should switch back to 'Needs' when selected", async () => {
    const { getByTestId } =render(<UpdateExpense setIsUpdatingTransaction={jest.fn()} setIsModalVisible={function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.');
    } } currentTransaction={mockState} />);
    const segmentControl = getByTestId("category-segment-control");

    // Switch to "Wants" 

    fireEvent(segmentControl, "onChange", { nativeEvent: { selectedSegmentIndex: 1 } });
    await waitFor(() => expect(segmentControl.props.selectedIndex).toBe(1));

    // Switch to "Needs"
    fireEvent(segmentControl, "onChange", { nativeEvent: { selectedSegmentIndex: 0 } });
    await waitFor(() => expect(segmentControl.props.selectedIndex).toBe(0));
  });

});

