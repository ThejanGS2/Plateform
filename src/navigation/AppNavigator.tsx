import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '@/features/onboarding/screens/SplashScreen';
import OnboardingScreen from '@/features/onboarding/screens/OnboardingScreen';
import LoginScreen from '@/features/auth/screens/LoginScreen';
import SignUpScreen from '@/features/auth/screens/SignUpScreen';
import VerificationScreen from '@/features/auth/screens/VerificationScreen';
import ForgotPasswordScreen from '@/features/auth/screens/ForgotPasswordScreen';
import ResetPasswordScreen from '@/features/auth/screens/ResetPasswordScreen';
import LocationScreen from '@/features/home/screens/LocationScreen';
import HomeScreen from '@/features/home/screens/HomeScreen';
import CategoriesScreen from '@/features/home/screens/CategoriesScreen';
import CategoryDetailsScreen from '@/features/home/screens/CategoryDetailsScreen';
import FoodDetailsScreen from '@/features/home/screens/FoodDetailsScreen';
import OrderTrackerScreen from '@/features/orders/screens/OrderTrackerScreen';
import RateFoodScreen from '@/features/orders/screens/RateFoodScreen';
import OrderHistoryScreen from '@/features/orders/screens/OrderHistoryScreen';
import ProfileScreen from '@/features/profile/screens/ProfileScreen';
import AddNewAddressScreen from '@/features/profile/screens/AddNewAddressScreen';
import AddCardScreen from '@/features/profile/screens/AddCardScreen';
import PaymentSuccessScreen from '@/features/profile/screens/PaymentSuccessScreen';
import EditAddressScreen from '@/features/profile/screens/EditAddressScreen';
import PaymentBreakdownScreen from '@/features/cart/screens/PaymentBreakdownScreen';
import AdminHomeScreen from '@/features/admin/screens/AdminHomeScreen';
import ChefHomeScreen from '@/features/chef/screens/ChefHomeScreen';
import ChefOrdersScreen from '@/features/chef/screens/ChefOrdersScreen';
import ChefNotificationsScreen from '@/features/chef/screens/ChefNotificationsScreen';
import ChefFoodListScreen from '@/features/chef/screens/ChefFoodListScreen';
import ChefFoodDetailsScreen from '@/features/chef/screens/ChefFoodDetailsScreen';
import ChefProfileScreen from '@/features/chef/screens/ChefProfileScreen';
import DriverHomeScreen from '@/features/driver/screens/DriverHomeScreen';

// Sub-screens
import PersonalInfoScreen from '@/features/profile/screens/PersonalInfoScreen';
import AddressesScreen from '@/features/profile/screens/AddressesScreen';
import CartScreen from '@/features/cart/screens/CartScreen';
import FavouriteScreen from '@/features/home/screens/FavouriteScreen';
import NotificationsScreen from '@/features/profile/screens/NotificationsScreen';
import PaymentMethodScreen from '@/features/profile/screens/PaymentMethodScreen';
import FAQsScreen from '@/features/profile/screens/FAQsScreen';
import UserReviewsScreen from '@/features/profile/screens/UserReviewsScreen';
import SettingsScreen from '@/features/profile/screens/SettingsScreen';

import { useStore } from '@/store/useStore';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { token, user, currentAddress, justLoggedIn } = useStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!token ? (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </>
      ) : (
        <>
          {/* Main App Stack after Login */}
          {user?.role === 'admin' ? (
            <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
          ) : user?.role === 'chef' ? (
            <>
              <Stack.Screen name="ChefHome" component={ChefHomeScreen} />
              <Stack.Screen name="ChefOrders" component={ChefOrdersScreen} />
              <Stack.Screen name="ChefNotifications" component={ChefNotificationsScreen} />
              <Stack.Screen name="ChefFoodList" component={ChefFoodListScreen} />
              <Stack.Screen name="ChefFoodDetails" component={ChefFoodDetailsScreen} />
              <Stack.Screen name="ChefProfile" component={ChefProfileScreen} />
            </>
          ) : user?.role === 'driver' ? (
            <Stack.Screen name="DriverHome" component={DriverHomeScreen} />
          ) : (
            <>
              {justLoggedIn ? (
                <>
                  <Stack.Screen name="Location" component={LocationScreen} />
                  <Stack.Screen name="Home" component={HomeScreen} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Location" component={LocationScreen} />
                </>
              )}
            </>
          )}

          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen} />
          <Stack.Screen name="FoodDetails" component={FoodDetailsScreen} />
          <Stack.Screen name="OrderTracker" component={OrderTrackerScreen} />
          <Stack.Screen name="RateFood" component={RateFoodScreen} />
          <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="AddNewAddress" component={AddNewAddressScreen} />
          <Stack.Screen name="EditAddress" component={EditAddressScreen} />
          <Stack.Screen name="AddCard" component={AddCardScreen} />
          <Stack.Screen name="PaymentBreakdown" component={PaymentBreakdownScreen} />
          
          {/* Profile menu screens */}
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
          <Stack.Screen name="Addresses" component={AddressesScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Favourite" component={FavouriteScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
          <Stack.Screen name="FAQs" component={FAQsScreen} />
          <Stack.Screen name="UserReviews" component={UserReviewsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
