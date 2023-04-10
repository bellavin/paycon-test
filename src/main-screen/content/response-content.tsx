import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants';

interface Props {
  data: [];
}

function ResponseContent({data}: Props): JSX.Element {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.list}>
        {data.map((item: any) => {
          const {id, name, price} = item;
          return (
            <View key={id} style={styles.item}>
              <Text>{name}</Text>
              <Text>{price}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 8,
    backgroundColor: Colors.lightgray,
    borderRadius: 8,
    lineHeight: 8,
  },
  list: {},
  item: {
    flexDirection: 'row',
  },
});

export default ResponseContent;
