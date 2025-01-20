import { colors } from "@/constants/colors";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // MainContainer
  container:{
    flex: 1,
  },
  btncontainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer:{
    flex:1,
  },
  card:{
    flex: 1,
  },


  // Buttons
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark,
    borderRadius: 45,
    elevation: 5,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10
  },


  // Modals
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
  modalContainer:{
    flex:1,
    paddingHorizontal: 20
  },
  modalheader:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center', 
  },
  modalcontent:{
    flex:10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  content:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  
  txt:{
    color: colors.light,
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  icon:{
    paddingRight: 10
  },
  title:{
    fontSize: 20,
    fontWeight:'bold'
  },
  titleheader:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    
  }
})

export default styles;