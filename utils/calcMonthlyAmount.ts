const calculateMonthlyAmount = (amount: number, frequency: string): number => {
    switch (frequency) {
        case "Daily":
            return amount * 28; 
        case "Weekly":
            return amount * 4; 
        case "Bi-Weekly":
            return amount * 2; 
        case "Monthly":
        default:
            return amount; 
    }
  };
export default calculateMonthlyAmount;