import Card from "@/components/ui/Card";
import { colors } from "@/constants/colors";
import { Income, IncomeCategory, Transaction } from "@/types";
import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface Props {
  income: Income;
  incomeCategoryInfo: IncomeCategory | undefined;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentIncome: React.Dispatch<React.SetStateAction<Income | null>>;
  deleteIncome: (id: number) => void;
}

export default function IncomeDetails({ income, incomeCategoryInfo, setIsModalVisible, setCurrentIncome, deleteIncome }: Props) {
    const [isTapped, setIsTapped] = useState(false);
  
  return (
    <Card
      content={
        <>

        <TouchableOpacity
                onPress={() => setIsTapped(prev => !prev)} 
        > 
            <View style={styles.container} >  
                {!isTapped ? (
                    <>
                        <View style={styles.description}>
                            <Text style={styles.title}> {income.description.charAt(0).toUpperCase() + income.description.slice(1)}</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.amount}>{income.amount * income.interval}</Text>
                            <Text style={styles.label}>Income per Month</Text>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.card} >
                            <View style={styles.header}>
                              <View style={styles.description}>
                                <Text style={styles.title}> {income.description.charAt(0).toUpperCase() + income.description.slice(1)}</Text>
                              </View>
                              <View style={styles.item}>
                                <Text style={styles.amount}>{income.amount}</Text>
                                <Text style={styles.label}>Income per Occurrence</Text>
                            </View>
                            </View>
                            <View style={styles.details}>
                                <View style={styles.row}>
                                    <Text style={styles.label}><FontAwesome6 name="wallet" size={18} color= {colors.green} /> Income Type:</Text>
                                    <Text style={styles.value}>{income.type}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}><FontAwesome6 name="calendar-alt" size={18} color= {colors.green} /> Recurrence:</Text>
                                    <Text style={styles.value}>{income.frequency}/{income.subtype}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}><FontAwesome6 name="calendar-day" size={18} color={colors.green} /> Occurence:</Text>
                                    <Text style={styles.value}>{income.interval} time(s) per month</Text>
                                </View>

                                <View style={styles.row2} >
                                    <TouchableOpacity onPress={() => {
                                        setCurrentIncome(income);
                                        setIsModalVisible(true)
                                        }} >
                                        <Text style={[styles.label, { marginRight: 20} ]}><FontAwesome6 name="edit" size={35} color={colors.green} /></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteIncome(income.id)} >
                                        <Text  style={[styles.label, { marginRight: 20} ]}><FontAwesome6 name="square-xmark" size={35} color={colors.red} /></Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </>
                )}
            </View>   
        </TouchableOpacity>
    </>
      }
    />
  );
}

const styles = StyleSheet.create({


    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
    item: {
        flex: 1,
        alignItems: 'center',
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
    modal: {
        flex: 1,   
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
})
