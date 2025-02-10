import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '@/components/Containers/MainContainer';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import Essential from './Essentials';
import NonEssential from './NonEssentials';
import { Divider } from '@rneui/base';
import { Modal } from '@/components/Modal';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import AddExpense from '@/components/ui/AddExpense';


export default function SummaryInfo() {
  const { categories, transactions } = useSelector(
    (state: RootState) => state.data
  );
 
    const [isAddingTransaction, setIsAddingTransaction] = useState(false);
    const [isUpdatingTransaction, setIsUpdatingTransaction] = React.useState<boolean>(false);

  return (
    <MainContainer>
      <Divider/>
      <View style={styles.container}>
          <View style={styles.section}> 
            <View style={styles.tableheader}>
                <Text style={styles.title}>Essentials</Text>
            </View>
            <View style={styles.tablecontent}>
              <Essential
                categories={categories}
                transactions={transactions}
              />
            </View>
          </View>
          <Divider/>
          <View style={styles.section}> 
            <View style={styles.tableheader}>
                <Text style={styles.title}>Discretionary</Text>
            </View>
            <View style={styles.tablecontent}>
              <NonEssential
                categories={categories}
                transactions={transactions}
              />
            </View>
          </View>
          <Divider/>

                    {/* Add Transaction Button */}
          <View style={styles.btn}>
            <TouchableOpacity
                onPress={() => setIsAddingTransaction(true)}
                activeOpacity={0.5}
              >
                <AntDesign name="pluscircle" size={60} color={colors.dark} />
              </TouchableOpacity>
          </View>
      </View>
     

           {/* Add Transaction */}
           <Modal isOpen={isAddingTransaction} transparent={true} >
             <View style={styles.modalAddContent}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize:20, paddingTop: 10}}>Add an Expense</Text>
                 <AddExpense setIsAddingTransaction={setIsAddingTransaction} setIsUpdatingTransaction={setIsUpdatingTransaction} />
             </View>
           </Modal>
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    gap: 10,
  },
  header: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  tableheader: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingBottom: 5
  
  },

  headertotal: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent:'center',
    paddingHorizontal: 5,
  },
  text: {
    fontWeight: 'bold'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25
  },
  tablecontent: {
    flex: 10,
    flexDirection: 'row',
  },
  footer: {
    flex: 1,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
    
  },
  modalAddContent:{
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
  },
})
