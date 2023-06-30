import './Global.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CalcFunctionService from './service/CalcFunctionService';
import CalcNumberService from './service/CalcNumberService';
import MyFunction from './Function';
import MyNumber from './Number';
import MyOption from './Option';

const navTheme = {
  colors: {
    background: '#FFFFFF',
  },
};

const Stack = createNativeStackNavigator();

class MyCalcNumberService extends CalcNumberService {
  initWithComponent( componentA, componentB ){
    this.componentA = componentA;
    this.componentB = componentB;

    super.init();
  }
  init(){
    super.init();
  }

  setDispError( type ){
    if( this.componentA == undefined ) return;
    if( type == global.calc.errorTypeDivideByZero ){
      this.componentA.setDispStr( "Divide by zero" );
    } else if( type == global.calc.errorTypePositiveInfinity ){
      this.componentA.setDispStr( "Infinity" );
    } else if( type == global.calc.errorTypeNegativeInfinity ){
      this.componentA.setDispStr( "-Infinity" );
    } else if( type == global.calc.errorTypeNotANumber ){
      this.componentA.setDispStr( "NaN" );
    }
  }
  setDispResult( value ){
    if( this.componentA == undefined ) return;
    this.componentA.setDispStr( this.valueToString( value, 15 ) );
  }
  setDispEntry( entry ){
    if( this.componentA == undefined ) return;
    this.componentA.setDispStr( entry );
  }
  clearDispLog(){
    if( this.componentA == undefined ) return;
    this.componentA.setDispLog( "" );
  }
  setDispLog( value, opType ){
    if( this.componentA == undefined ) return;
    if( opType == global.calc.opTypeDiv ){
      this.componentA.setDispLog( this.valueToString( value, 10 ) + " ÷" );
    }
    if( opType == global.calc.opTypeMul ){
      this.componentA.setDispLog( this.valueToString( value, 10 ) + " ×" );
    }
    if( opType == global.calc.opTypeSub ){
      this.componentA.setDispLog( this.valueToString( value, 10 ) + " -" );
    }
    if( opType == global.calc.opTypeAdd ){
      this.componentA.setDispLog( this.valueToString( value, 10 ) + " +" );
    }
  }
  addDispLog( value ){
    if( this.componentA == undefined ) return;
    this.componentA.setDispLog( this.componentA.state.dispLog + " " + this.valueToString( value, 10 ) + " =" );
  }
  setDispAnswer( value ){
    if( this.componentA == undefined ) return;
    this.componentA.setDispAnswer( this.valueToString( value, 10 ) );
  }
  setDispMemory( value ){
    if( this.componentA == undefined ) return;
    this.componentA.setDispMemory( this.valueToString( value, 10 ) );
  }
  memoryRecalled( flag ){
    if( this.componentA == undefined ) return;
    this.componentA.setMrcButtonText( flag ? "MC" : "MR" );
  }
  errorChanged( flag ){
    if( this.componentB == undefined ) return;
    this.componentB.setErrorFlag( flag );
  }
}

class MyCalcFunctionService extends CalcFunctionService {
  initWithComponent( componentA, componentB ){
    this.componentA = componentA;
    this.componentB = componentB;

    super.init();
  }
  init(){
    super.init();
  }

  setDispError( type ){
    if( this.componentA == undefined ) return;
    if( type == global.calc.errorTypeDivideByZero ){
      this.componentA.setDispStr( "Divide by zero" );
    } else if( type == global.calc.errorTypePositiveInfinity ){
      this.componentA.setDispStr( "Infinity" );
    } else if( type == global.calc.errorTypeNegativeInfinity ){
      this.componentA.setDispStr( "-Infinity" );
    } else if( type == global.calc.errorTypeNotANumber ){
      this.componentA.setDispStr( "NaN" );
    }
  }
  setDispResult( value ){
    if( this.componentA == undefined ) return;
    this.componentA.setDispStr( this.valueToString( value, 15 ) );
  }
  setDispEntry( entry ){
    if( this.componentA == undefined ) return;
    this.componentA.setDispStr( entry );
  }
  setDispMemory( value ){
    if( this.componentA == undefined ) return;
    this.componentA.setDispMemory( this.valueToString( value, 10 ) );
  }
  memoryRecalled( flag ){
    if( this.componentA == undefined ) return;
    this.componentA.setMrcButtonText( flag ? "MC" : "MR" );
  }
  errorChanged( flag ){
    if( this.componentB == undefined ) return;
    this.componentB.setErrorFlag( flag );
  }

  angleChanged( type ){
    if( this.componentA == undefined || this.componentB == undefined ) return;
    if( type == global.calc.angleTypeRad ){
      this.componentA.setDispAngle( "RAD" );
      this.componentB.setAngleButtonText( "DEG" );
    } else if( type == global.calc.angleTypeDeg ){
      this.componentA.setDispAngle( "DEG" );
      this.componentB.setAngleButtonText( "GRAD" );
    } else if( type == global.calc.angleTypeGrad ){
      this.componentA.setDispAngle( "GRAD" );
      this.componentB.setAngleButtonText( "RAD" );
    }
  }
}

function App() {
  console.log("function App");

  // viewサイズ
  const window = Dimensions.get('window');
  global.app.viewWidth = window.width;
  global.app.viewHeight = window.height - StatusBar.currentHeight;
  global.calc.setNumberStyles();
  global.calc.setFunctionStyles();
  global.calc.setOptionStyles();

  // グローバルデータとサービス
  global.calc.init();
  global.calcNumberService = new MyCalcNumberService();
  global.calcFunctionService = new MyCalcFunctionService();

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
