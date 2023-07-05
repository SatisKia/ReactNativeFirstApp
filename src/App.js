import './Global.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppState, BackHandler, Button, Dimensions, StatusBar, Text, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import CalcFunctionService from './service/CalcFunctionService';
import CalcNumberService from './service/CalcNumberService';
import Modal from "react-native-modal";
import MyFunction from './Function';
import MyLoading from './Loading';
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
  global.calc.setLoadingStyles();
  global.calc.setNumberStyles();
  global.calc.setFunctionStyles();
  global.calc.setOptionStyles();
  const size = global.app.size;

  // サービス
  global.calcNumberService = new MyCalcNumberService();
  global.calcFunctionService = new MyCalcFunctionService();

  const [ modalShowFlag, setModalShowFlag ] = useState(false);

  useEffect(() => {
    // アプリの状態
    const handleAppStateChange = (appState) => {
      if (appState == 'background') {
        console.log("handleAppStateChange background");
      } else if (appState == 'active') {
        console.log("handleAppStateChange active");
      }
    };
    const appStateHandler = AppState.addEventListener('change', handleAppStateChange );

    // 端末の「戻る」ボタン
    const backAction = () => {
      console.log("backAction");
      setModalShowFlag(true);
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      appStateHandler.remove();
      backHandler.remove();
    };
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000000' : '#FFFFFF'}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Loading'>
        <Stack.Screen name='Loading' component={MyLoading} />
        <Stack.Screen name='Number' component={MyNumber} />
        <Stack.Screen name='Function' component={MyFunction} />
        <Stack.Screen name='Option' component={MyOption} />
      </Stack.Navigator>
      <Modal
        isVisible={modalShowFlag}
        backdropColor="#000000"
        backdropOpacity={0.5}
        onBackdropPress={() => { setModalShowFlag(false); }}
      >
        <View style={{
          width: '96%',
          top: '50%',
          left: '2%',
          right: 'auto',
          bottom: 'auto',
          transform: [
            { translateY: -global.app.viewHeight / 2 },
          ],
          borderRadius: size(4),
          paddingTop: size(20),
          paddingBottom: size(10),
          alignItems: 'center',
          backgroundColor: "#ffffff",
        }}>
          <Text style={{ fontSize: size(15), fontWeight: 'bold' }}>アプリ終了</Text>
          <Text />
          <Text style={{ fontSize: size(15) }}>アプリを終了してもよろしいですか？</Text>
          <Text />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: size(100), padding: size(10) }}>
              <Button
                title="いいえ"
                titleStyle={{ fontSize: size(15) }}
                onPress={() => { setModalShowFlag(false); }}
              />
            </View>
            <View style={{ width: size(100), padding: size(10) }}>
              <Button
                title="はい"
                titleStyle={{ fontSize: size(15) }}
                onPress={() => { BackHandler.exitApp(); }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </NavigationContainer>
  );
}

export default App;
