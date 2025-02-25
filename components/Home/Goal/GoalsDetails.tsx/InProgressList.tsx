import { Goal } from "@/types";
import { Button, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";
import UpdateGoal from "@/components/ui/UpdateGoal";
import InProgress from "./GoalsDetailsInProgress";
import CustomModal from "@/components/Modal/CustomModal";
import { UseTransactionService } from "@/hooks/editData/TransactionService";
import { Modal } from "@/components/Modal";


export default function InProgressList({
    goals,
}: {
    goals: Goal[];
}) {

    const { deleteGoal } = UseTransactionService();

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
                                        <InProgress goal={goal} setIsModalVisible={setIsModalVisible} setCurrentGoal={setCurrentGoal}/>
                                </View>
                            )
                        })}   
                    </View>

                    <Modal isOpen={isModalVisible} transparent animationType="fade">
                    <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                        <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                            {currentGoal && (
                                <UpdateGoal setIsModalVisible={setIsModalVisible} setIsUpdatingGoal={setIsUpdatingGoal}
                                currentGoal={currentGoal}
                                />
                            )}
                            </View>
                        </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                    </Modal>
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
        
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      modalContent: {
        width: '80%',
        height: '80%',
      },
})