import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import CartItem from './CartItem'
import Colors from '../../constants/Colors'

const OrderItem = (props) => {
    const [showDetails, setShowDetails] = useState(false);
    //ako je dole showDetails true, <View></View> je uvek true jer je objekat
    //vratice <View></View>

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title={showDetails ? "Hide Details" : "Show Details"} onPress={() => {
                setShowDetails(prevState => !prevState)
            }}>
            </Button>
            {showDetails && <View style={styles.detailItems}>
                {props.items.map(cartItem => <CartItem
                    key={cartItem.productId}
                    quantity={cartItem.quantity}
                    amount={cartItem.sum}
                    title={cartItem.productTitle}
                />)}
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        //elavation only works for android because 
        //shadow won't work for android
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        // fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        // fontFamily: 'open-sans-bold',
        fontSize: 16,
        color: '#888'
    },
    detailItems:{
        width: '100%'
    }
});

export default OrderItem
