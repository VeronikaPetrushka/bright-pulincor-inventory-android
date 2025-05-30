import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PulincorRouteImports } from './PulincorInventory/merchandise/PulincorImports';

type RootStackParamList = {
  WelcomeToPulincor: undefined;
  PulincorWarehouse: undefined;
  PulincorSales: undefined;
  PulincorStatistic: undefined;
  PulincorSettings: undefined;
  PulincorArrivalsCreate: undefined;
  PulincorSalesCreate: undefined;
  PulincorArrivalDetails: undefined;
  PulincorSaleDetails: undefined;
  PulincorGame: undefined;
};

enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {

  return (
      <NavigationContainer>
          <Stack.Navigator
            initialRouteName={"WelcomeToPulincor"}
            screenOptions={{
              headerShown: false
            }}
          >    
              <Stack.Screen 
                    name="WelcomeToPulincor" 
                    component={PulincorRouteImports.WelcomeToPulincorRoute} 
              />
              <Stack.Screen 
                    name="PulincorWarehouse" 
                    component={PulincorRouteImports.PulincorWarehouseRoute} 
              />
              <Stack.Screen 
                    name="PulincorSales" 
                    component={PulincorRouteImports.PulincorSalesRoute} 
              />
              <Stack.Screen 
                    name="PulincorStatistic" 
                    component={PulincorRouteImports.PulincorStatisticRoute} 
              />
              <Stack.Screen 
                    name="PulincorSettings" 
                    component={PulincorRouteImports.PulincorSettingsRoute} 
              />
              <Stack.Screen 
                    name="PulincorArrivalsCreate" 
                    component={PulincorRouteImports.PulincorArrivalsCreateRoute} 
              />
              <Stack.Screen 
                    name="PulincorSalesCreate" 
                    component={PulincorRouteImports.PulincorSalesCreateRoute} 
              />
              <Stack.Screen 
                    name="PulincorArrivalDetails" 
                    component={PulincorRouteImports.PulincorArrivalDetailsRoute} 
              />
              <Stack.Screen 
                    name="PulincorSaleDetails" 
                    component={PulincorRouteImports.PulincorSaleDetailsRoute} 
              />
              <Stack.Screen 
                    name="PulincorGame" 
                    component={PulincorRouteImports.PulincorGameRoute} 
              />
          </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
