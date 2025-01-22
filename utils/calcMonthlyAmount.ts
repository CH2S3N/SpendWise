



const calculateMonthlyAmount = (amount: number, frequency: string): number => {
    switch (frequency) {
        case "Daily":
            return amount * 30; // Approximate days in a month
        case "Weekly":
            return amount * 4; // Approximate weeks in a month
        case "Bi-Weekly":
            return amount * 2; // Bi-weekly occurs twice in a month
        case "Monthly":
            return amount; // Already a monthly value
        default:
            return amount; // Fallback in case of invalid frequency
    }
  };
export default calculateMonthlyAmount;