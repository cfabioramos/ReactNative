import React from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, View, Button } from 'react-native';
import { Constants } from "react-native-unimodules";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: "pink",
    textAlign: "center",
    borderWidth: 0.5,
    borderColor:'black',
  },
  text: {
    fontSize: 42,
    fontWeight: "bold"
  },
});

function ContactInformation({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        <Text style={styles.text}>
            Contact Information
        </Text>
      </View>
      <ScrollView>
        <Text>121, Clear Water Bay Road</Text>
        <Text>Clear Water Bay, Kowloon</Text>
        <Text>HONG KONG</Text>
        <Text>Tel: +852 1234 5678</Text>
        <Text>Fax: +852 8765 4321</Text>
        <Text>Email:confusion@food.net</Text>
      </ScrollView>
      <Button onPress={() => navigation.navigate("Home")} title="Go to Home" />
    </SafeAreaView>
  );
}

export default ContactInformation;
