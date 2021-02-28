import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import useHistoryApi, { History } from '../hooks/useHistoryApi';

const HistoryScreen = () => {
  const histories: History[] = useHistoryApi();

  const itemStartStyle = {
    ...styles.item,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  };

  const itemEndStyle = {
    ...styles.item,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 16,
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={histories}
        renderItem={({ item, index, section }) => {
          if (index === 0) {
            return <Text style={itemStartStyle}>{item}</Text>;
          } else if (index === section.data.length - 1) {
            return <Text style={itemEndStyle}>{item}</Text>;
          } else {
            return <Text style={styles.item}>{item}</Text>;
          }
        }}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => `${item}-${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    marginTop: 8,
    marginBottom: 16,
    marginHorizontal: 16,
    fontSize: 21,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    fontSize: 18,
    marginLeft: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default HistoryScreen;
