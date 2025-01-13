import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from "@/constants/colors";

interface CustomModalProps {
  isOpen: boolean;
  title: string
  onClose: () => void;
  children: React.ReactNode;
}

const MainModal: React.FC<CustomModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal visible={isOpen} transparent={true} animationType="fade">
            {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
 
});

export default MainModal;
