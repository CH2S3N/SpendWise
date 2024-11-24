import { Category, Transaction } from "@/types";
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TransactionDetails from "./TransactionDetails";
import { useState } from "react";
import { Modal } from "@/components/Modal";
import Card from "@/components/ui/Card";


export default function NonEssential({
    transactions,
    categories,
    deleteTransaction
}: {
    categories: Category[];
    transactions: Transaction[];
    deleteTransaction: (id: number) => void;
}) {
    const [isModalVisible, setModalVisible] = useState(false);

    const nonEssentialTransactions = transactions.filter(
        (transaction) => categories.find((category) => category.id === transaction.category_id)?.type === "Non_Essential"
    );
  
    
    return (
        <View style={styles.maincontainer}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.section}>
                        {nonEssentialTransactions.map((transaction) => {
                            const categoryForCurrentItem = categories.find(
                                (category) => category.id === transaction.category_id
                            )
                            return (
                                     <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <View key={transaction.id} style={styles.item}>
                                        <TransactionDetails 
                                        transaction={transaction} 
                                        categoryInfo={categoryForCurrentItem}

                                        />
                                </View>
                                    </TouchableOpacity>
                            )
                        })}   
                    </View>


                    <Modal isOpen={isModalVisible} transparent={true}>
                        <View style={styles.modal}>
                            <Text>Test</Text>
                            <Button 
                                title='Back' 
                                color= 'black'
                                onPress={() => setModalVisible(false)}
                               
                            />
                        </View>
                            
                    </Modal>
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