import { Goal } from "@/types";
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import React, { useState } from "react";
import UpdateGoal from "@/components/ui/UpdateGoal";
import { UseTransactionService } from "@/hooks/editData/TransactionService";
import { Modal } from "@/components/Modal";
import { ProgressBar } from "react-native-paper";
import { colors } from "@/constants/colors";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { FontAwesome6 } from "@expo/vector-icons";
import ConfirmModal from "@/components/Modal/ConfirmModal";


export default function AccomplishedList() {

    const { goals } = useSelector(
        (state: RootState) => state.data
      );

    const { deleteGoal } = UseTransactionService();

    const [isUpdatingGoal, setIsUpdatingGoal] = React.useState<boolean>(false);
    const [isDeletionModal, setisDeletionModal] = React.useState<boolean>(false);
    const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);
    const [tappedTransactionId, setTappedTransactionId] = useState<number | null>(null);


    

    return (
        <View style={detailStyles.container}>
            {goals.map((goal) => {
                const isExpanded = tappedTransactionId === goal.id;
                const accumulatedAmount = goal.currentAmount;
                if (accumulatedAmount !== goal.amount) {
                    return null;
                }
                const progress = goal.amount > 0 ? goal.currentAmount / goal.amount : 0;
                const progressPercentage = (progress * 100).toFixed(0);

                return (
                    <View key={goal.id} style={[detailStyles.card, isExpanded ? {backgroundColor: colors.lightBlue, } : { backgroundColor: colors.light, marginHorizontal:20}]}>
                        <TouchableOpacity     
                                
                        onPress={() =>{
                                setTappedTransactionId(isExpanded ? null : goal.id);
                                setCurrentGoal(goal)   
                            }}
                        >
                            <View style={detailStyles.content}>
                                {!isExpanded ? (
                                    <>
                                        <View style={detailStyles.row}>
                                            <Text style={detailStyles.title}> {goal.name.charAt(0).toUpperCase() + goal.name.slice(1)} </Text>
                                            <Text style={[detailStyles.value, ]}>₱ {goal.amount}</Text>
                                        </View>
                                        <View style={detailStyles.row}>
                                            <Text style={detailStyles.text}>Accumulated Amount: <Text  style={detailStyles.value}>₱ {goal.currentAmount}</Text> </Text>
                                            <Text style={[detailStyles.text, {color: colors.blue}]}>{progressPercentage}%</Text>
                                        </View>
                                        <ProgressBar progress={progress} theme={{ colors: { primary: colors.blue } }} />

                                    </>
                                ) : (
                                    <>
                                        <View style={detailStyles.row}>
                                            <Text style={detailStyles.title}> {goal.name.charAt(0).toUpperCase() + goal.name.slice(1)} </Text>
                                            <Text style={[detailStyles.value, ]}>₱ {goal.amount}</Text>
                                        </View>
                                        <View style={detailStyles.row}>
                                        <Text style={detailStyles.text}>Accumulated Amount: <Text  style={detailStyles.value}>₱ {goal.currentAmount}</Text> </Text>
                                        <Text style={[detailStyles.value,]}>{progressPercentage}%</Text>
                                        </View>
                                        <ProgressBar progress={progress} theme={{ colors: { primary: colors.blue } }} />

                                        <View style={[detailStyles.row, {justifyContent: "flex-end", paddingTop: 20, alignItems: "center"}]}>
                                            <TouchableOpacity onPress={() => {
                                                setIsUpdatingGoal(true)

                                            }}>
                                                <Text style={[[detailStyles.label], { marginRight: 20 }]}>
                                                    <FontAwesome6 name="edit" size={35} color={colors.blue} />
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() =>{
                                                setisDeletionModal(true)
                                            }}>
                                                <Text style={[[detailStyles.label], { marginRight: 20 }]}>
                                                    <FontAwesome6 name="square-xmark" size={35} color={colors.blue} />
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>

                                )}
                            </View>
                        </TouchableOpacity>                        
                    </View>
                )
            })}   

            <Modal isOpen={isUpdatingGoal} transparent animationType="fade" onRequestClose={() => setIsUpdatingGoal(false)}>
                <TouchableWithoutFeedback onPress={() => setIsUpdatingGoal(false)}>
                    <View style={detailStyles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={detailStyles.modalContent}>
                        {currentGoal && (
                            <UpdateGoal  setIsUpdatingGoal={setIsUpdatingGoal}
                            currentGoal={currentGoal}
                            />
                        )}
                        </View>
                    </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>




            {/* Confirmation Deletion  Modal */}
            <ConfirmModal
            visible={isDeletionModal} 
            title={'Confirm Deletion'} 
            message={'Are you sure you want to delete this entry?'} 
            onConfirm={()=> {
                if (tappedTransactionId !== null) {
                    deleteGoal(tappedTransactionId);
                    setisDeletionModal(false); // Close modal after deletion
                    }
            }} 
            onCancel={() => setisDeletionModal(false)}      
            />
        </View>

        
    )
}


const detailStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 5
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingBottom: 10
    },
    row: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingBottom: 5
    },
    text: {
        fontSize: 15,
    },
    value: {
        color: colors.blue,
        fontWeight: "bold",
        fontSize: 15,
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
    card: {
        padding: 15,
        paddingBottom: 5,
        borderRadius: 15,
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: "#000",
        shadowRadius: 8,
        shadowOffset: { height: 6, width: 0 },
        shadowOpacity: 0.15,
        flex: 1,
        marginBottom: 10
    },

    title: {
        color: colors.dark,
        fontSize: 20,
        fontWeight: "bold",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.dark,
    },
});