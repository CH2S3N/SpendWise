import { colors } from '@/constants/colors'
import { StyleSheet, Text, View } from 'react-native'



const styles = StyleSheet.create({
    mainContainer: {
    paddingVertical: 15,
    },
    container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    },
    item: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    legendItem: {
    flexDirection: 'row',
    marginBottom: 1,
    },
    colorBox: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderRadius: 2,
    },
    totalTxt: {
    fontWeight: 'bold',
    fontSize: 25,
    color: colors.dark,
    },
    legend: {
    flex: 1,
    width:'100%',
    alignItems: 'flex-start',
    },
    total: {
    flex: 1,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    },
    placeholderText: {
    position: 'absolute',
    marginTop: '50%',
    marginBottom: '50%',
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.gray,
    opacity: 1,
    textShadowColor: 'white', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 1, 
    },
});

export default styles