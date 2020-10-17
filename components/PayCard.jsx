import React from 'react'
import { Image, StyleSheet, View, Dimensions, Alert } from 'react-native'
import AppButton from '../common/AppButton'
import AppText from '../common/AppText'

// {
//   id: 4,
//   refId: '1100',
//   status: 'qwerty',
//   orderDate: new Date().toLocaleDateString(),
//   receivedDate: new Date().toLocaleDateString(),
//   price: 12500
// }



export default function PayCard({
  // refId,
  // status,
  // orderDate,
  // receivedDate,
  // price,
  itemName,
  itemPhoto,
  orderId,
  orderDate,
  status,
  price,
  receivedDate,
  reqId,
  onPress
 }) {
  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/login/usernameIcon.png')} style={styles.img} /> */}

      <Image
        style={styles.img}
        source={itemPhoto ? { uri: itemPhoto } : null }
      />

      <View style={styles.details}>

        <AppText >Req ID: {reqId}</AppText>
        <AppText>Order ID: {orderId}</AppText>
        <AppText>Item Name: {itemName}</AppText>
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

    marginTop: 50,
    width: 100,
    height: 100,
    borderRadius:25
  },
  details: {
    marginTop: 5,
    marginLeft: 20,
    width: 280
  }
})
