import './Global.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import MyFunction from './Function';
import MyNumber from './Number';
import MyOption from './Option';

const navTheme = {
  colors: {
    background: '#FFFFFF',
  },
};

const Stack = createNativeStackNavigator();

function App() {
  console.log("function App");

  // グローバルデータ
  global.calc.init();

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000000' : '#FFFFFF'}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Number'>
        <Stack.Screen name='Number' component={MyNumber} />
        <Stack.Screen name='Function' component={MyFunction} />
        <Stack.Screen name='Option' component={MyOption} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
