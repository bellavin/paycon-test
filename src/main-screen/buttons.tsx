import React from 'react';
import {GestureResponderEvent, StyleSheet, Text, View} from 'react-native';
import Button from '../ui-kit/button';

interface Props {
  onApiButtonClick: (event: GestureResponderEvent) => void;
  onFileButtonClick: (event: GestureResponderEvent) => void;
}

function Buttons({onApiButtonClick, onFileButtonClick}: Props): JSX.Element {
  return (
    <View style={styles.list}>
      <View>
        <Button onPress={onApiButtonClick}>
          <Text style={styles.text}>Загрузить из API</Text>
        </Button>
      </View>
      <View style={styles.item}>
        <Button onPress={onFileButtonClick}>
          <Text style={styles.text}>Загрузить из файла</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
  },
  item: {
    marginTop: 8,
  },
  text: {
    color: 'white',
  },
});

export default Buttons;
