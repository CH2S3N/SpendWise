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

export interface Category {
    id: number;
    name: string;
    type: "Essential" | "Non_Essential";
}

export interface Goal {
    id: number;
    name: string;
    amount: number;
}

export interface User {
    id: number;
    userName: string;
    budget_Amount: number;
}