import { Category, Goal, Transaction } from "@/types";
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Modal } from "@/components/Modal";
import GoalsDetails from "./GoalsDetailsInProgress";
import UpdateGoal from "@/components/ui/UpdateGoal";
import InProgress from "./GoalsDetailsInProgress";
import CustomModal from "@/components/Modal/CustomModal";


export default function InProgressList({
    goals,
    deleteGoal,
    updateGoal
}: {
    goals: Goal[];
    deleteGoal: (id: number) => void;
    updateGoal(goal: Goal): Promise<void>;
}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdatingGoal, setIsUpdatingGoal] = React.useState<boolean>(false);
    const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);

    return (
        <View style={styles.maincontainer}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.section}>
                        {goals.map((goal) => {
                            return (
                                <View key={goal.id} style={styles.item}>
                                    <TouchableOpacity 
                                        onPress={() => {
                                            setCurrentGoal(goal);
                                            setIsModalVisible(true)
                                        }}
                                        onLongPress={() => deleteGoal(goal.id)}
                                    >
                                        <InProgress goal={goal}/>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}   
                    </View>

                    <CustomModal isOpen={isModalVisible} >
                    {currentGoal && (
                                <UpdateGoal setIsModalVisible={setIsModalVisible} updateGoal={updateGoal} setIsUpdatingGoal={setIsUpdatingGoal}
                                currentGoal={currentGoal}
                                />
                            )}
                    </CustomModal>
                </View>
            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    maincontainer: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 5
    },

    section: {
      
       flex: 1
    },
    item: {
       paddingBottom: 5
    },
    modal: {
        flex: 1,
        
    }
})