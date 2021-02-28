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
  const getMinutes = (time: number): number => Math.floor(time / 60);
  const getSeconds = (time: number): string => ('0' + (time % 60)).slice(-2);

  return (
    <View style={styles.container}>
      <SectionList
        sections={histories}
        renderItem={({ item, index, section }) => {
          const listItem = (
            <View style={styles.menuDetails}>
              <View>
                <Text style={styles.menuTitle}>Time</Text>
                <Text style={styles.menuBody}>
                  {getMinutes(item.time)}:{getSeconds(item.time)}
                </Text>
              </View>
              <View>
                <Text style={styles.menuTitle}>Distance</Text>
                <Text style={styles.menuBody}>
                  {item.distance === 0 ? '--' : item.distance} km
                </Text>
              </View>
              <View>
                <Text style={styles.menuTitle}>Calories</Text>
                <Text style={styles.menuBody}>
                  {item.calories === 0 ? '--' : item.calories}
                </Text>
              </View>
            </View>
          );

          if (index === 0) {
            return <View style={itemStartStyle}>{listItem}</View>;
          } else if (index === section.data.length - 1) {
            return <View style={itemEndStyle}>{listItem}</View>;
          } else {
            return <View style={styles.item}>{listItem}</View>;
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
  menuDetails: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  menuTitle: { fontWeight: 'bold', fontSize: 14, color: '#c6c6c6' },
  menuBody: { fontWeight: 'bold', fontSize: 21, color: '#0E0F0F' },
  menuSeparator: {
    borderRightWidth: 1,
    borderRightColor: '#efefef',
  },
});

export default HistoryScreen;
