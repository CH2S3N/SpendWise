import { colors } from "@/constants/colors";
import { StyleSheet } from 'react-native';


const styles= StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 15,
    justifyContent: 'space-evenly',
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
    backgroundColor: colors.dark,
    borderRadius: 45,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    padding: 15,
    marginHorizontal: 5
  },
  btnExpense: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC2947',
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    padding: 10,
    marginHorizontal: 5
  },
  btnTxt:{
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
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
    alignItems: 'center',
    
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
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    
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
  
  modalcontainer:{
    flex:1,
    backgroundColor: colors.background,
    paddingHorizontal: 20
  },
  modalheader:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    
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
  }
})

export default styles;