import { Goal } from "@/types";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import UpdateGoal from "@/components/ui/UpdateGoal";
import Accomplished from "./GoalsDetailsAccomplished";
import CustomModal from "@/components/Modal/CustomModal";


export default function AccomplishedList({
    goals,
    deleteGoal,
}: {
    goals: Goal[];
    deleteGoal: (id: number) => void;
}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdatingGoal, setIsUpdatingGoal] = React.useState<boolean>(false);
    const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);

    return (
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
                                        <Accomplished goal={goal}/>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}   
                    </View>

                    
                    
                    <CustomModal isOpen={isModalVisible}>
                            {currentGoal && (
                                <UpdateGoal setIsModalVisible={setIsModalVisible} setIsUpdatingGoal={setIsUpdatingGoal}
                                currentGoal={currentGoal}
                                />
                            )}
                    </CustomModal>
                </View>
            </ScrollView>
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
       paddingBottom: 5,
       marginBottom: 5

    },
    modal: {
        flex: 1,
        
    }
})