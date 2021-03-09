import React, { useState, useEffect, useCallback } from 'react'
import { View, ScrollView, Text, Platform, TextInput, StyleSheet } from 'react-native'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import * as productsActions from '../../store/actions/products'

const EditProductScreen = (props) => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const dispatch = useDispatch();

    // da se ne bi rekreirala funkcija submitHandler zbog useEffect-a 
    // koristimo useCallback i [dispatch, prodId, title, description, imageUrl, price]
    //moramo da prosledimo ove vrednosti u uglastim zagradama
    //jer kada dodajemo novi proizvod, ako ne stavimo nece ga dodati
    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(productsActions.updateProduct(prodId, title, description, imageUrl));
        } else {
            //moramo da stavimo + ispred price
            //jer je to number, a mi u state-u imamo ''
            dispatch(productsActions.createProduct(title, description, imageUrl, +price));
        }
        props.navigation.goBack();
    }, [dispatch, prodId, title, description, imageUrl, price]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)} />
                </View>
                {editedProduct ? null : (<View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)} />
                </View>)}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)} />
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'EditProduct' : 'AddProduct',
        headerRight: (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title='Save'
                iconName={Platform.OS === 'android' ? "md-checkmark" : "ios-checkmark"}
                onPress={submitFn}
            />
        </HeaderButtons>)
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen
