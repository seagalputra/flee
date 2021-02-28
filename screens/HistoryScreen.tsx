import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons';

const HistoryScreen = ({ navigation }: any) => {
  const toHome = () => navigation.navigate('Home');

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          paddingTop: 24,
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 24,
        }}>
        <TouchableOpacity onPress={toHome}>
          <Ionicon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#0E0F0F',
            marginLeft: 16,
          }}>
          Running History
        </Text>
      </View>
      <SectionList
        sections={[
          { title: 'D', data: ['Devin', 'Dan', 'Dominic'] },
          {
            title: 'J',
            data: [
              'Jackson',
              'James',
              'Jillian',
              'Jimmy',
              'Joel',
              'John',
              'Julie',
            ],
          },
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
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
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default HistoryScreen;