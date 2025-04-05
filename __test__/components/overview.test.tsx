import React from 'react';
import { render } from '@testing-library/react-native';
import { useSelector } from 'react-redux';
import Overview from '@/components/Home/Chart/Overview';

// Mock Redux
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
      useDispatch: jest.fn(),
}));

describe('Overview component', () => {
    it('should render not split expense', () => {
      // Mock data for the state
      const mockState = {
        data: {
          incomes: [
            {
              id: 1,
              incomeCategoryId: 1,
              amount: 1000,
              description: 'Salary',
              frequency: 'Monthly',
              type: 'Salary',
              interval: 1,
              intervalInput: 1,
              subtype: 'All',
            },
          ],
          transactions: [
            {
              id: 1,
              category_id: 1,
              description: 'Rent',
              frequency: 'Monthly',
              prioritization: 'High',
              isfixedamount: 'Yes',
              amount: 500,
              type: 'Essential',
              interval: 1,
              intervalInput: 1,
              subtype: 'All',
            },
            {
              id: 2,
              category_id: 1,
              description: 'Rent',
              frequency: 'Monthly',
              prioritization: 'High',
              isfixedamount: 'Yes',
              amount: 500,
              type: 'Non_Essential',
              interval: 1,
              intervalInput: 1,
              subtype: 'All',
            },
          ],
          budgetStratSplit: false,
        },
      };
  
      // Mock the useSelector hook to return the mock state
      (useSelector as unknown as jest.Mock<any, any>).mockReturnValue(mockState.data);
      const { getByText } = render(<Overview />);

      // Test income, expense, and savings rendering
      expect(getByText('Income')).toBeTruthy();
      expect(getByText('Expenses')).toBeTruthy();
      expect(getByText('Savings')).toBeTruthy();
    });

    it('should render split expense', () => {
      // Mock data for the state
      const mockState = {
        data: {
          incomes: [
            {
              id: 1,
              incomeCategoryId: 1,
              amount: 1000,
              description: 'Salary',
              frequency: 'Monthly',
              type: 'Salary',
              interval: 1,
              intervalInput: 1,
              subtype: 'All',
            },
          ],
          transactions: [
            {
              id: 1,
              category_id: 1,
              description: 'Rent',
              frequency: 'Monthly',
              prioritization: 'High',
              isfixedamount: 'Yes',
              amount: 500,
              type: 'Essential',
              interval: 1,
              intervalInput: 1,
              subtype: 'All',
            },
            {
              id: 2,
              category_id: 1,
              description: 'Rent',
              frequency: 'Monthly',
              prioritization: 'High',
              isfixedamount: 'Yes',
              amount: 500,
              type: 'Non_Essential',
              interval: 1,
              intervalInput: 1,
              subtype: 'All',
            },
          ],
          budgetStratSplit: true,
        },
      };
  
      // Mock the useSelector hook to return the mock state
      (useSelector as unknown as jest.Mock<any, any>).mockReturnValue(mockState.data);
      const { getByText } = render(<Overview />);
      
      // Test income, expense, and savings rendering
      expect(getByText('Income')).toBeTruthy();
      expect(getByText('Expenses (Wants)')).toBeTruthy();
      expect(getByText('Expenses (Needs)')).toBeTruthy();
      expect(getByText('Savings')).toBeTruthy();
    });

    it('should render no data message when there is no income and no transactions', () => {
        // Mock data for the state with no income and no transactions
        const mockState = {
          data: {
            incomes: [],
            transactions: [],
            budgetStratSplit: true,
          },
        };
      
        // Mock the useSelector hook to return the mock state
        (useSelector as unknown as jest.Mock<any, any>).mockReturnValue(mockState.data);
        const { getByText } = render(<Overview />);
        // Test "No Transaction Data" message
        expect(getByText('No Transaction Data')).toBeTruthy();
    });
      
  });
