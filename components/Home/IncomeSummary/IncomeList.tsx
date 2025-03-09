import { Income } from "@/types";
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Modal as RNModal } from "react-native";
import { Modal } from "@/components/Modal";
import React, { useState } from "react";
import IncomeDetails from "./IncomeDetails";
import UpdateIncome from "@/components/ui/UpdateIncome";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { UseTransactionService } from "@/hooks/editData/TransactionService";
import { colors } from "@/constants/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import Card from "@/components/ui/Card";


export default function IncomeList() {

    const { deleteIncome } = UseTransactionService();
     const {  incomes } = useSelector(
          (state: RootState) => state.data
        );
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdatingIncome, setIsUpdatingIncome] = React.useState<boolean>(false);
    const [currentIncome, setCurrentIncome] = useState<Income | null>(null);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = React.useState(false);
    
  const [tappedTransactionId, setTappedTransactionId] = useState<number | null>(null);

    return (
        <View style={styles.maincontainer}>
            <View style={styles.container}>
              <View style={styles.contentSection}>
                  {incomes.map((income) => {
                        const isExpanded = tappedTransactionId === income.id;

                      return (
                          <TouchableOpacity
                              key={income.id}
                              style={[styles.card, isExpanded ? {backgroundColor: "#E7F0DC", } : { backgroundColor: "white", marginHorizontal: 20}]}
                              onPress={() => setTappedTransactionId(isExpanded ? null : income.id)}
                          >
                                <View style={styles.content}>
                                    {!isExpanded ? (
                                        <>
                                            <View style={styles.description}>
                                                <Text style={styles.title}>
                                                    {income.description.charAt(0).toUpperCase() + income.description.slice(1)}
                                                </Text>
                                            </View>
                                            <View style={styles.item}>
                                                <Text style={styles.amount}>₱ {income.amount * income.interval}</Text>
                                                <Text style={styles.label}>Budget per Month</Text>
                                            </View>
                                        </>
                                    ) : (
                                        <>
                                            <View style={{flex: 1}}>
                                                <View style={styles.header}>
                                                    <View style={styles.description}>
                                                        <Text style={styles.title}>
                                                            {income.description.charAt(0).toUpperCase() + income.description.slice(1)}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.item}>
                                                        <Text style={styles.amount}>₱ {Math.round(income.amount * income.interval)}</Text>
                                                        <Text style={styles.label}>Budget per Month</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.details}>
                                                    <View style={styles.row}>
                                                        <Text style={styles.label}>
                                                            <FontAwesome6 name="bag-shopping" size={18} color={colors.green} /> Income per Ocurrence:
                                                        </Text>
                                                        <Text style={[styles.value, {color: colors.green, fontSize:15}]}>₱ {income.amount}</Text>
                                                    </View>
                                                    <View style={styles.row}>
                                                        <Text style={styles.label}>
                                                            <FontAwesome6 name="bag-shopping" size={18} color={colors.green} /> Expense Type:
                                                        </Text>
                                                        <Text style={styles.value}>{income.type}</Text>
                                                    </View>
                                                    <View style={styles.row}>
                                                        <Text style={styles.label}>
                                                            <FontAwesome6 name="calendar-alt" size={18} color={colors.green} /> Recurrence Pattern:
                                                        </Text>
                                                        <Text style={styles.value}>{income.frequency}
                                                        { income.subtype === "Custom" ? (
                                                            null
                                                        ) : (
                                                            income.subtype
                                                        )}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.row}>
                                                        <Text style={styles.label}>
                                                            <FontAwesome6 name="calendar-alt" size={18} color={colors.green} /> Occurrence Count:
                                                        </Text>
                                                        <Text style={styles.value}>{income.interval} Times/s per Month</Text>
                                                    </View>
                                                    <View style={styles.row2}>
                                                        <TouchableOpacity onPress={() => {
                                                            setCurrentIncome(income);
                                                            setIsModalVisible(true);
                                                        }}>
                                                            <Text style={[styles.label, { marginRight: 20 }]}>
                                                                <FontAwesome6 name="edit" size={35} color={colors.green} />
                                                            </Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => setIsConfirmModalVisible(true)}>
                                                            <Text style={[styles.label, { marginRight: 20 }]}>
                                                                <FontAwesome6 name="square-xmark" size={35} color={colors.red} />
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </>
                                    )}
                                </View>
                          </TouchableOpacity>
                      );
                  })}
              </View>
            </View>


            {/* Confirmation Modal */}
            <RNModal
            visible={isConfirmModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsConfirmModalVisible(false)}
            >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
                <View style={{
                width: 300,
                padding: 20,
                backgroundColor: 'white',
                borderRadius: 10,
                alignItems: 'center',
                }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
                    Confirm Save
                </Text>
                <Text style={{ marginBottom: 20 }}>
                    Are you sure you want to delete this entry?
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Button title="Cancel" color={colors.red} onPress={() => setIsConfirmModalVisible(false)} />
                    <Button title="Confirm" color={colors.green} onPress={()=> {
                        if (tappedTransactionId !== null) {
                            deleteIncome(tappedTransactionId);
                            setIsConfirmModalVisible(false); // Close modal after deletion
                            }
                    }} />
                </View>
                </View>
            </View>
            </RNModal>

          <Modal isOpen={isModalVisible} transparent animationType="fade" onRequestClose={() => setIsModalVisible(false)}>
            <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <Text style={styles.title}>UPDATE INCOME</Text>
                    {currentIncome && (
                    <UpdateIncome
                      setIsModalVisible={setIsModalVisible}
                      setIsUpdatingIncome={setIsUpdatingIncome}
                      currentIncome={currentIncome}
                    />
                  )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      );
}

const styles=StyleSheet.create({
    maincontainer: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 5
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 5
    },

    contentSection: {
      
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
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowRadius: 8,
        shadowOffset: { height: 6, width: 0 },
        shadowOpacity: 0.15,
      },


    description: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    description2: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },

    card: {
        padding: 15,
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
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    title: {
        color: colors.dark,
        fontSize: 20,
        fontWeight: "bold",
    },
    amount: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "bold",
        color: colors.green,
    },
    details: {
        borderTopWidth: 1,
        borderColor: "#ddd",
        paddingTop: 10,
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    row2: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.dark
    },
    value: {
        fontSize: 14,
        fontWeight: "bold",
    },

    tableheader: {
        flex: 1,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingBottom: 5,  
    },

})