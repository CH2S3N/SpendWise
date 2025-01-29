import Card from "@/components/ui/Card";
import { Goal } from "@/types";
import { Text, View, StyleSheet } from "react-native";
import * as React from "react";
import { ProgressBar } from "react-native-paper";
import { colors } from "@/constants/colors";

interface Props {
    goal: Goal;
}

export default function InProgress({ goal }: Props) {
    const accumulatedAmount = goal.currentAmount;
    const progress = accumulatedAmount / goal.amount;
    const progressPercentage = (progress * 100).toFixed(2);


    if (accumulatedAmount == goal.amount) {
        return null;
    }
    return (
        <Card
            content={
                <View>
                    <View style={styles.container}>
                        <View style={styles.description}>
                            <Text style={styles.text}>{goal.name.charAt(0).toUpperCase() + goal.name.slice(1)}</Text>
                            <Text >{accumulatedAmount}</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.text}>
                                 {goal.amount}
                            </Text>
                            <Text>
                                {progressPercentage}%
                            </Text>
                        </View>
                    </View>
                    <ProgressBar progress={progress} theme={{ colors: { primary: colors.dark } }} />
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    item: {
        flex: 1,
        alignItems: "center",
    },
    description: {
        flex: 1,
        alignItems: "flex-start",
    },
    button: {
        marginTop: 10,
        paddingVertical: 5, 
        paddingHorizontal: 15,
        backgroundColor: colors.dark,
        borderRadius: 5,
        alignItems: "center",
        alignSelf: "center", 
    },
    buttonText: {
        color: "#fff",
        fontSize: 14, 
    },
});
