import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import Card from './Card';

export default function PopUpMenu() {
    return (
      <MenuProvider>
        <Card content={
          <Menu>
            <MenuTrigger style={styles.button}
            text="Open menu" />
            <MenuOptions>
              <MenuOption onSelect={() => alert(` You clicked on Save`)} text="Save" />
              <MenuOption onSelect={() => alert(`You Clicked on Delete`)}>
                <Text style={{ color: 'red' }}>Delete</Text>
              </MenuOption>
              <MenuOption
                onSelect={() => alert(`Not called`)}
                disabled={true}
                text="Disabled"
              />
            </MenuOptions>
          </Menu>
        }/>
          
      </MenuProvider>
    );
  
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    bottom: 1, 
    left: 20,
  },
  button:{
  backgroundColor: 'lightblue',
  padding: 15,
  borderRadius: 5,
  textAlign: 'center',
  display: 'flex',
  fontSize: 16,
  margin: 4,
  }
});