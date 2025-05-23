import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from "react-navigation";
import { Platform } from 'react-native'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons';


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        //fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        // fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
},
    {
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={drawerConfig.tintColor}
            />
        },
        defaultNavigationOptions: defaultNavOptions
    });

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
},
    {
        //ovaj navigation ce raditi samo ako je ovaj OrdersNavigator
        //pozvan unutar drugog navigatora, a jeste ShopNavigator
        navigationOptions: {
            //postavljamo tacno ikonicu koju zelimo
            //voditi racuna da se importuje React zbog jsx-a
            drawerIcon: drawerConfig => <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                //drawerConfig.tintColor zna kada kliknemo na tu ikonicu
                //postavice sistemsku boju kao pozadinu
                color={drawerConfig.tintColor}
            />
        },
        defaultNavigationOptions: defaultNavOptions
    });

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProduct: EditProductScreen
},
    {
        //ovaj navigation ce raditi samo ako je ovaj OrdersNavigator
        //pozvan unutar drugog navigatora, a jeste ShopNavigator
        navigationOptions: {
            //postavljamo tacno ikonicu koju zelimo
            //voditi racuna da se importuje React zbog jsx-a
            drawerIcon: drawerConfig => <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                //drawerConfig.tintColor zna kada kliknemo na tu ikonicu
                //postavice sistemsku boju kao pozadinu
                color={drawerConfig.tintColor}
            />
        },
        defaultNavigationOptions: defaultNavOptions
    });

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(ShopNavigator);
