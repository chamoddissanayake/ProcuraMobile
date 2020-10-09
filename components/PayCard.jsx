import React from 'react'
import { Image, StyleSheet, View, Dimensions } from 'react-native'
import AppButton from '../common/AppButton'
import AppText from '../common/AppText'

export default function PayCard({
  refId,
  status,
  orderDate,
  receivedDate,
  price,
  onPress }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/login/usernameIcon.png')} style={styles.img} />
      <View style={styles.details}>
        <AppText>Ref ID: {refId}</AppText>
        <AppText>Status: {status}</AppText>
        <AppText>Order Date: {orderDate}</AppText>
        <AppText>Received Date: {receivedDate}</AppText>
        <AppText>Price: {price}</AppText>
        {onPress && <AppButton title="Pay" icon='card' color='primary' style={{ width: 200 }} iconColor='light' opacity onPress={onPress} />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    width: Dimensions.get('window').width - 40,
    padding: 10,
    borderRadius: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  img: {
    marginTop: 5,
    width: 100,
    height: 120,
  },
  details: {
    marginTop: 5,
    marginLeft: 20,
    width: 280
  }
})
