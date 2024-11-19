import { colors } from "@/constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

export default function AddButton({
    setIsAddingTransaction,
}: {
    setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
      <View style={{ 
        position: 'absolute', 
        bottom: 1, 
        left: 20,
        }}>
        <TouchableOpacity
            onPress={() => setIsAddingTransaction(true)}
            activeOpacity={0.5}
            
        >
            <AntDesign name="pluscircle" size={60} color={colors.dark} />
        </TouchableOpacity>
      </View>
    )
}

