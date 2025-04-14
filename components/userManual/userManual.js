import { colors } from '@/constants/colors';
import { color } from '@rneui/base';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const UserManual = () => {
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.header}>USER MANUAL</Text>
            <Text style={styles.sectionContent}>  Welcome to <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.green}}>SpendWise!</Text> This manual will guide you through the features and functionalities of the app.</Text>
            <Text style={styles.sectionContent}>  Tap a title to expand it and see the instruction for each item. tap again to collapse it.</Text>
            <Text style={[styles.sectionContent, {color: colors.red}]}>(User Manual can be accessed again through the setting in the Wallet Page)</Text>
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => toggleSection('allocation')} activeOpacity={1}>
                        <Text style={styles.sectionTitle}>Allocation Setup</Text>

                        {expandedSection === 'allocation' && (
                            <>
                                <Text style={[styles.sectionContent, {borderWidth: 2, borderColor: 'green', padding: 5}]}>
                                    <Text style={{fontWeight: 'bold', color: 'green'}}>Remember:</Text> Expenses dont need to have an amount assigned to them. The app will automatically calculate the amount based on the user's transaction data. but if you want to set a specific amount for an expense, you can do so by setting it as a fixed expense when adding them.
                                </Text>
                                <Text style={styles.sectionContent}>
                                 This screen will appear the first time you open the app. You can also return to it by tapping the ‘Allocate’ button on the Transaction screen after your first allocation. Make sure to fill in all required information to enable the Allocate button.
                                </Text>
                                <Image source={require('../../assets/images/UserManual/AllocationSetup/AllocationMenu.jpg')} style={[styles.image, {height: 500}]} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>First pick a Budgeting Strategy for the allocation</Text>
                                <Image source={require('../../assets/images/UserManual/AllocationSetup/budStrat.jpg')} style={styles.image} />
                                <Image source={require('../../assets/images/UserManual/AllocationSetup/selectStrat.jpg')} style={styles.image} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>tap advance to show more detials for each Strategy (optional)</Text>
                                <Image source={require('../../assets/images/UserManual/AllocationSetup/advanceCat.jpg')} style={styles.image} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>to add an expense or incomes tap the "Add" button</Text>
                                <Image source={require('../../assets/images/UserManual/AllocationSetup/addTransactions.jpg')} style={[styles.image, {height: 500}]} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>To display Transaction Details and for editing transaction info before allocation tap the "Expense" or "Income" button</Text>
                                <Image source={require('../../assets/images/UserManual/AllocationSetup/TxBtn.jpg')} style={[styles.image, {height: 100}]} />
                                <Image source={require('../../assets/images/UserManual/AllocationSetup/IncomeE.jpg')} style={[styles.image, {height: 500}]} />
                                <Image source={require('../../assets/images/UserManual/AllocationSetup/ExpenseE.jpg')} style={[styles.image, {height: 500}]} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>Every Transaction that the user added can be edit or deleted. by expanding the transaction the user will see a button for update and delete an the lower right</Text>
                                <Image source={require('../../assets/images/UserManual/AllocationSetup/txDetails.jpg')} style={[styles.image, {height: 250}]} />
                                <Image source={require('../../assets/images/UserManual/AllocationSetup/updateTx.jpg')} style={[styles.image, {height: 500}]} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>After all required info has benn filled, proceed to allocate.</Text>
                                <Image source={require('../../assets/images/UserManual/AllocationSetup/allocation.jpg')} style={[styles.image, {height: 500}]} />
                                <Image source={require('../../assets/images/UserManual/AllocationSetup/allocComplete.jpg')} style={[styles.image, {height: 500}]} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>Budget allocation will be based on the user's transaction data. Users can modify their transactions afterward if they want to adjust the allocated budget</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity onPress={() => toggleSection('transactions')} activeOpacity={1}>
                        <Text style={styles.sectionTitle}>Transactions</Text>
                        {expandedSection === 'transactions' && (
                            <>
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>After the budget is set, you'll be taken to the home screen where you can explore and use different features.</Text>
                                <Image source={require('../../assets/images/UserManual/TransactionScreen/homeScreen.jpg')} style={[styles.image, {height: 500}]} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>Tap "SUMMARY" button to view the monthly budget plan generated by the app</Text>
                                <Image source={require('../../assets/images/UserManual/TransactionScreen/Summary.jpg')} style={[styles.image, {height: 500}]} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>If user likes to reallocate budget, tap the "ALLOCATE" button at the top left corner of the screen</Text>
                                <Image source={require('../../assets/images/UserManual/TransactionScreen/Allocate.jpg')} style={[styles.image, {height: 500}]} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>To view basic chart for user transaction, tap the "show more" within the OVERVIEW</Text>
                                <Image source={require('../../assets/images/UserManual/TransactionScreen/Statistic.jpg')} style={[styles.image, {height: 500}]} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>To update/change some expense information tap the edit icon within an expanded expense</Text>
                                <Image source={require('../../assets/images/UserManual/TransactionScreen/UpdateTx.jpg')} style={[styles.image, {height: 500}]} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>To delete expense tap the delete icon next to edit</Text>
                                <Image source={require('../../assets/images/UserManual/TransactionScreen/deleteM.jpg')} style={[styles.image, {height: 500}]} />
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity onPress={() => toggleSection('goals')}  activeOpacity={1}>
                        <Text style={styles.sectionTitle}>Goals</Text>
                        {expandedSection === 'goals' && (
                           <>
                                 <Text style={[styles.sectionContent, { textAlign: 'center' }]}>User can create financial goals here, where they can track thier progress for each goal added</Text>
                                <Image source={require('../../assets/images/UserManual/GoalScreen/goalScreen.jpg')} style={[styles.image, {height: 500}]} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>Tap "create a New Goal" button to add a goal</Text>
                                <Image source={require('../../assets/images/UserManual/GoalScreen/addG.jpg')} style={[styles.image, {height: 500}]} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>Expand a goal to access the edit/delete icon</Text>
                                <Image source={require('../../assets/images/UserManual/GoalScreen/updateG.jpg')} style={[styles.image, {height: 500}]} /> 
                                <Image source={require('../../assets/images/UserManual/GoalScreen/deleteG.jpg')} style={[styles.image, {height: 500}]} />
                           </>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity onPress={() => toggleSection('wallet')}  activeOpacity={1}>
                        <Text style={styles.sectionTitle}>Wallet</Text>
                        {expandedSection === 'wallet' && (
                            <>
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>Here, users can view, edit, or remove their income details, adjust settings, and update their profile.</Text>
                                <Image source={require('../../assets/images/UserManual/WalletScreen/WalletScreen.jpg')} style={[styles.image, {height: 500}]} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>Tap "ADD INCOME" button to add a income</Text>
                                <Image source={require('../../assets/images/UserManual/WalletScreen/addI.jpg')} style={[styles.image, {height: 500}]} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>Expand an income to display its info as well as access the edit/delete icon</Text>
                                <Image source={require('../../assets/images/UserManual/WalletScreen/updateI.jpg')} style={[styles.image, {height: 500}]} /> 
                                <Image source={require('../../assets/images/UserManual/WalletScreen/deleteI.jpg')} style={[styles.image, {height: 500}]} />
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>The settings is where other function and information is displayed</Text>
                                <Image source={require('../../assets/images/UserManual/WalletScreen/settings.jpg')} style={[styles.image, {height: 500}]} /> 
                                <Text style={[styles.sectionContent, { textAlign: 'center' }]}>The profile is where the user can change thier username</Text>
                                <Image source={require('../../assets/images/UserManual/WalletScreen/profile.jpg')} style={[styles.image, {height: 500}]} /> 
                            </>
                        )}
                    </TouchableOpacity>
                </View>
        </View>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: colors.green,
    },
    section: {
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 20,
    },
    sectionTitle: {
        width: '100%',
        color: colors.light,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: colors.green,
        borderRadius: 15,
        elevation: 5,
        borderWidth:1,
        shadowColor: "#000",
        shadowRadius: 8,
        shadowOffset: { height: 6, width: 0 },
        shadowOpacity: 0.15,
        paddingVertical: 15,
        marginBottom: 10,
    },
    sectionContent: {
        marginTop: 10,
        fontSize: 16,
        color: colors.dark,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
     
    },
});

export default UserManual;