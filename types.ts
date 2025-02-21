export interface Transaction {
    id: number;
    category_id: number;
    recurrence_id: number;
    description: string;
    frequency: "Daily" | "Weekly" | "Bi-Weekly" | "Monthly";
    prioritization: "High" | "Medium" | "Low";
    isfixedamount: "Yes" | "No";
    amount: number;
    type: "Essential" | "Non_Essential";
    interval: number;
    subtype: "Weekends" | "Weekdays" | "All" | "Custom"
}
export interface Recurrence {
    id: number;
    name: string;
}
export interface Income {
    id: number;
    incomeCategoryId: number;
    amount: number;
    description: string;
    frequency: "Daily" | "Weekly" | "Bi-Weekly" | "Monthly";
    type: "Allowance" | "Salary" | "Others";
    interval: number;
    subtype: "Weekends" | "Weekdays" | "All" | "Custom"
}

export interface Category {
    map(arg0: (category: any) => any): import("react").ReactNode;
    id: number;
    name: string;
    type: "Essential" | "Non_Essential";
    proportion: number;
    initialProp: number;
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
    userName: string;
}