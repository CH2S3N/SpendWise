import { Income } from "@/types";
import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
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
     const { incomeCategories, incomes } = useSelector(
          (state: RootState) => state.data
        );
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdatingIncome, setIsUpdatingIncome] = React.useState<boolean>(false);
    const [currentIncome, setCurrentIncome] = useState<Income | null>(null);
  
  const [tappedTransactionId, setTappedTransactionId] = useState<number | null>(null);

    return (
        <View style={styles.maincontainer}>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.contentSection}>
                  {incomes.map((income) => {
                      const isExpanded = tappedTransactionId === income.id;

                      return (
                          <TouchableOpacity
                              key={income.id}
                              style={styles.item}
                              onPress={() => setTappedTransactionId(isExpanded ? null : income.id)}
                          >
                              <Card
                                  content={
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
                                                  <View style={styles.card}>
                                                      <View style={styles.header}>
                                                          <View style={styles.description}>
                                                              <Text style={styles.title}>
                                                                  {income.description.charAt(0).toUpperCase() + income.description.slice(1)}
                                                              </Text>
                                                          </View>
                                                          <View style={styles.item}>
                                                              <Text style={styles.amount}>₱ {Math.round(income.amount / income.interval)}</Text>
                                                              <Text style={styles.label}>Budget per Occurrence</Text>
                                                          </View>
                                                      </View>
                                                      <View style={styles.details}>
                                                          <View style={styles.row}>
                                                              <Text style={styles.label}>
                                                                  <FontAwesome6 name="bag-shopping" size={18} color={colors.green} /> Expense Type:
                                                              </Text>
                                                              <Text style={styles.value}>{income.type}</Text>
                                                          </View>
                                                          <View style={styles.row}>
                                                              <Text style={styles.label}>
                                                                  <FontAwesome6 name="calendar-alt" size={18} color={colors.green} /> Recurrence:
                                                              </Text>
                                                              <Text style={styles.value}>{income.frequency}/{income.subtype}</Text>
                                                          </View>
                                                          <View style={styles.row}>
                                                              <Text style={styles.label}>
                                                                  <FontAwesome6 name="calendar-day" size={18} color={colors.green} /> Occurrence:
                                                              </Text>
                                                              <Text style={styles.value}>{income.interval} time(s) per month</Text>
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
                                                              <TouchableOpacity onPress={() => deleteIncome(income.id)}>
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
                                  }
                              />
                          </TouchableOpacity>
                      );
                  })}
              </View>
            </View>
          </ScrollView>



          <Modal isOpen={isModalVisible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
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
        flex: 1,
        paddingHorizontal: 5
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
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
        color: "#666",
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