export interface Transaction {
    id: number;
    category_id: number;
    description: string;
    frequency: "Daily" | "Weekly" | "Bi-Weekly" | "Monthly";
    prioritization: "High" | "Medium" | "Low";
    isfixedamount: "Yes" | "No";
    amount: number;
    type: "Essential" | "Non_Essential";
}
export interface Income {
    id: number;
    incomeCategoryId: number;
    amount: number;
    description: string;
    frequency: "Daily" | "Weekly" | "Bi-Weekly" | "Monthly";
    type: "Allowance" | "Salary" | "Others",
}

export interface Category {
    id: number;
    name: string;
    type: "Essential" | "Non_Essential";
}
export interface IncomeCategory {
    id: number;
    name: string;
    type: "Allowance" | "Salary" | "Others";
}

export interface Goal {
    id: number;
    name: string;
    amount: number;
    currentAmount: number;
}

export interface User {
    id: number;
    budget_Amount: number;
    userName: string;
}