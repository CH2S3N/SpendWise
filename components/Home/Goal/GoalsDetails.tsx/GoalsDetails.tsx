import Card from "@/components/ui/Card";
import { Goal } from "@/types";
import { Text, View, StyleSheet } from "react-native";


interface Props{
    goal: Goal;
}

export default function GoalsDetails({ goal }: Props) {
    return (
        <Card content={
            <View style={styles.container}>  
                <View style={styles.description}>
                    <Text style={styles.text}>{goal.name}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.text}>{goal.amount}</Text>
                </View>
            </View>
        }/>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
    item: {
        flex: 1,
        alignItems: 'center'
    },
    description: {
        flex: 1,
        alignItems: 'flex-start'
    }
})
