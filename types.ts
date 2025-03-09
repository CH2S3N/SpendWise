export interface Transaction {
    id: number;
    category_id: number;
    description: string;
    frequency: "Daily" | "Weekly" | "Bi-Weekly" | "Monthly";
    prioritization: "High" | "Medium" | "Low";
    isfixedamount: "Yes" | "No";
    amount: number;
    type: "Essential" | "Non_Essential";
    interval: number;
    intervalInput: number;
    subtype: "Weekends" | "Weekdays" | "All" | "Custom"
}
export interface Income {
    id: number;
    incomeCategoryId: number;
    amount: number;
    description: string;
    frequency: "Daily" | "Weekly" | "Bi-Weekly" | "Monthly";
    type: "Allowance" | "Salary" | "Others";
    interval: number;
    intervalInput: number;
    subtype: "Weekends" | "Weekdays" | "All" | "Custom"
}
export interface Category {
    map(arg0: (category: any) => any): import("react").ReactNode;
    id: number;
    name: string;
    description: string;
    proportion: number;
    initialProp: number;
}
export interface Goal {
    id: number;
    name: string;
    amount: number;
    currentAmount: number;
}
export interface VarDataState {
    id: number;
    name: string;
    value: "True" | " Fales"
}

export interface User {
    id: number;
    userName: string;
    hasData: "True" | "False";
}