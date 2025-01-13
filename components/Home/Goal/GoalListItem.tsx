import { Goal } from "@/types";
import { ScrollView, Text, View, StyleSheet } from "react-native";


interface GoalListItemProps{
    goal: Goal;
}

export default function GoalListItem({goal}: GoalListItemProps) {
    return (
        <View style={styles.container}>           
            <Text style={styles.text}>{goal.name.charAt(0).toUpperCase() + goal.name.slice(1)}</Text>  
            <Text>{goal.amount}</Text>  
        </View>

    )
};

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

