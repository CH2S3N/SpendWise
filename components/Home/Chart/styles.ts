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
    item1: {
    justifyContent: 'center',
    alignItems: 'center',
    },
    legendItem: {
    flexDirection: 'row',
    marginBottom: 5,
    },
    colorBox: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderRadius: 2,
    },
    text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.dark,
    },
    total: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    },
    placeholderText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.dark,
    opacity: 0.5,
    },
});

export default styles