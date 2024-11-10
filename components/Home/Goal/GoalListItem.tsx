import { Goal } from "@/types";
import { ScrollView, Text, View, StyleSheet } from "react-native";


interface GoalListItemProps{
    goal: Goal;
}

export default function GoalListItem({goal}: GoalListItemProps) {
    return (
        <View>           
            <Text>{goal.name} amount: {goal.amount}</Text>  
        </View>

    )
}


