import { colors } from "@/constants/colors";
import { StyleSheet } from 'react-native';


const styles= StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',
  },

  image: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Income & Expense Button
  btnContainer: {
    alignItems: 'center',
    justifyContent:'center',
    width: '100%',
    flexDirection: 'row',
  },
  btnIncome: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06D001',
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    padding: 10,

    marginHorizontal: 5
  },
  regen: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light,
    borderRadius: 15,
    elevation: 5,
    borderWidth:1,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    padding: 15,
    marginHorizontal: 5,
    marginBottom: 10
  },
  topbtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    borderRadius: 15,
    elevation: 5,
    borderWidth:1,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10
  },
  btnExpense: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    padding: 10,
    marginHorizontal: 5
  },
  btnTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.dark,
    textShadowColor: 'black', 
    textShadowOffset: { width: .5, height: .5 }, 
    textShadowRadius: .5, 
  },
  
 

  // Goals & Budget Plan Container
  container1: {
    columnGap: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15
  },

  // Modal Container
  modalcontent:{
    flex:10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    
  },


  item: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    flexGrow: 1,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    padding: 10
  },
  btn: {
  },
  
  
  btn2: {
    
    borderRadius: 45,
    marginBottom: 5,
    backgroundColor:colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: colors.light,
    textAlign: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  cardStyle:{
     flex: 1, 
     marginHorizontal: 10, 
     marginBottom: 10, 
     borderWidth:1
  },
  modalcontainer:{
    margin:0,
    flex:1,
    backgroundColor: colors.background,
  },
  modalheader:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
    
  },

  modalAddContent:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
  },
  icon:{
    paddingRight: 10
  },
  title:{
    fontSize: 20,
    fontWeight:'bold'
  },
  title2:{
    fontSize: 20,
    fontWeight:'bold',
    paddingHorizontal: 10
  },
  btnshow:{
    width: '95%',
    justifyContent: 'center',
    alignItems: 'flex-end',
},
genBudget:{
  paddingTop: 10,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},
noData:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
noDataTxt:{
  fontSize: 30,
  fontWeight: 'bold',
  color: colors.dark,
  opacity: 0.5
},
overviewBtn: {
},
disabledButton: {
  color: colors.dark,
  opacity: 0.3
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
  borderWidth:1,
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
welcomeModalContent: {
  width: '80%',
  borderWidth:1,
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
modalTitle: {
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 20,
  paddingTop: 10,
  paddingBottom: 15,
},
modalSubTitle: {
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 15,
  paddingTop: 10,
},
})

export default styles;