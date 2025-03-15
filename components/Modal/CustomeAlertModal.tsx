import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CustomAlertProps = {
  visible: boolean;
  onClose: () => void;
  accumulatedAmount: number;
  amount: number;
};

const CustomAlert: React.FC<CustomAlertProps> = ({ visible, onClose, accumulatedAmount, amount }) => {
  const percentage = amount > 0 ? ((accumulatedAmount / amount) * 100).toFixed(0) : 0;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>🎯 Goal Updated Successfully!</Text>
          <Text style={styles.message}>
            You have saved <Text style={styles.highlight}>{percentage}%</Text> of your target amount! 
            ({accumulatedAmount} out of {amount})
          </Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert; 

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  highlight: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});