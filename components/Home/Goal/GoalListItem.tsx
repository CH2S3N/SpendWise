import { Goal } from "@/types";
import { Text, View, StyleSheet } from "react-native";


interface GoalListItemProps{
    goal: Goal;
}

export default function GoalListItem({goal}: GoalListItemProps) {
    return (
        <View style={styles.container}>     
            <View style={styles.content}>
                <Text style={styles.text}>{goal.name.charAt(0).toUpperCase() + goal.name.slice(1)}</Text>  
            </View>      
            <View style={styles.content1}>
                <Text>{goal.amount}</Text> 
            </View>
            <View style={styles.content1}>
                <Text>{goal.currentAmount}</Text> 
            </View>
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
    content:{
        flex: 1
    },
    content1:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

