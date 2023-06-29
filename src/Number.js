import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CalcNumberService from './service/CalcNumberService';
import { StackNavigator } from '@react-navigation/native';

const numberStyles = StyleSheet.create({
  body: {
    width: 320,
    height: 506,
  },

  divLog1: {
    width: 320,
    height: 20,
    lineHeight: 20,
//    textAlign: 'left', // textAlignはText側で指定する
    backgroundColor: '#E0E0E0',
  },
  spanLog1: {
    textAlign: 'left', // textAlignはText側で指定する
    fontSize: 17,
    color: '#000000',
  },
  divLog2: {
    width: 320,
    height: 50,
    lineHeight: 50,
//    textAlign: 'right', // textAlignはText側で指定する
    backgroundColor: '#E0E0E0',
  },
  spanLog2: {
    textAlign: 'right', // textAlignはText側で指定する
    fontSize: 29,
    color: '#000000',
  },
  spanLog2Italic: {
    fontSize: 29,
    fontStyle: 'italic',
    color: '#000000',
  },
  divRow: {
//    display: 'flex',
    flexDirection: 'row', // React Nativeで要素を横並びにする方法
  },

  button1: {
    width: 80,
    height: 54,
    lineHeight: 54,
//    textAlign: 'center',
    alignItems: 'center', // 横方向
//    verticalAlign: 'middle',
    justifyContent: 'center', // 縦方向
  },
  button2: {
    width: 80,
    height: 72,
    lineHeight: 72,
//    textAlign: 'center',
    alignItems: 'center', // 横方向
//    verticalAlign: 'middle',
    justifyContent: 'center', // 縦方向
  },
  button3: {
    width: 80,
    height: 74,
    lineHeight: 74,
//    textAlign: 'center',
    alignItems: 'center', // 横方向
//    verticalAlign: 'middle',
    justifyContent: 'center', // 縦方向
  },

  divColorBlue: {
    backgroundColor: '#C0C0FF',
  },
  divColorRed: {
    backgroundColor: '#FFA0A0',
  },
  divColorWhite: {
    backgroundColor: '#FFFFFF',
  },

  spanColorBlack: {
    color: '#000000',
  },
  spanColorWhite: {
    color: '#FFFFFF',
  },
  spanColorRed: {
    color: '#FF8080',
  },

  spanFont25: {
    fontSize: 25,
  },
  spanFont32: {
    fontSize: 32,
  },
  spanFont40: {
    fontSize: 40,
  },
});

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
    this.componentA.setDispStr( this.valueToString( value, 15 ) );
  }
  setDispEntry( entry ){
    this.componentA.setDispStr( entry );
  }
  clearDispLog(){
    this.componentA.setDispLog( "" );
  }
  setDispLog( value, opType ){
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
    this.componentA.setDispLog( this.componentA.state.dispLog + " " + this.valueToString( value, 10 ) + " =" );
  }
  setDispAnswer( value ){
    this.componentA.setDispAnswer( this.valueToString( value, 10 ) );
  }
  setDispMemory( value ){
    this.componentA.setDispMemory( this.valueToString( value, 10 ) );
  }
  memoryRecalled( flag ){
    this.componentA.setMrcButtonText( flag ? "MC" : "MR" );
  }
  errorChanged( flag ){
    this.componentB.setErrorFlag( flag );
  }
}

class MyNumberA extends React.Component {
  constructor(props) {
    console.log("MyNumberA constructor");
    super(props);

    props.setMyNumberA( this );

    // 状態管理
    this.state = {
      dispStr: "0",
      dispLog: "",
      dispAnswer: "0",
      dispMemory: "0",
      mrcButtonText: "MR",
      memoryRecalled: global.calc.memoryRecalled,
    };
    this.setDispStr = this.setDispStr.bind(this);
    this.setDispLog = this.setDispLog.bind(this);
    this.setDispAnswer = this.setDispAnswer.bind(this);
    this.setDispMemory = this.setDispMemory.bind(this);
    this.setMrcButtonText = this.setMrcButtonText.bind(this);
    this.setMemoryRecalled = this.setMemoryRecalled.bind(this);

    // 操作
    this.onButtonMAdd = this.onButtonMAdd.bind(this);
    this.onButtonMSub = this.onButtonMSub.bind(this);
    this.onButtonMRC = this.onButtonMRC.bind(this);
    this.onButtonFunction = this.onButtonFunction.bind(this);
  }

  // 状態変更用コールバック関数
  setDispStr( dispStr ){
    this.setState({ dispStr: dispStr });
  }
  setDispLog( dispLog ){
    this.setState({ dispLog: dispLog });
  }
  setDispAnswer( dispAnswer ){
    this.setState({ dispAnswer: dispAnswer });
  }
  setDispMemory( dispMemory ){
    this.setState({ dispMemory: dispMemory });
  }
  setMrcButtonText( mrcButtonText ){
    this.setState({ mrcButtonText: mrcButtonText });
  }
  setMemoryRecalled( memoryRecalled ){
    this.setState({ memoryRecalled: memoryRecalled });
  }

  // 操作
  onButtonNumber( func ){
    if( !global.calc.errorFlag ){
      func();
    }
  }
  onButtonMAdd(){ this.onButtonNumber( () => {
    global.calcNumberService.addMemory();
  } ); }
  onButtonMSub(){ this.onButtonNumber( () => {
    global.calcNumberService.subMemory();
  } ); }
  onButtonMRC(){ this.onButtonNumber( () => {
    if( global.calc.memoryRecalled ){
      global.calcNumberService.clearMemory();
    } else {
      global.calcNumberService.recallMemory();
    }
  } ); }
  onButtonFunction(){ this.onButtonNumber( () => {
    global.calcNumberService.setOp( global.calc.opTypeSet );
    global.calcFunctionService.init();
    this.props.navigation.navigate("Function");
  } ); }

  render() {
    console.log("MyNumberA render");

    // 桁区切り
    let dispStr = this.state.dispStr;
    if (global.calc.separatorType == global.calc.separatorTypeDash) {
      dispStr = global.calcNumberService.sepString(dispStr, "'");
    } else if (global.calc.separatorType == global.calc.separatorTypeComma) {
      dispStr = global.calcNumberService.sepString(dispStr, ",");
    }

    return (
      <View>
        <TouchableOpacity style={numberStyles.divLog1} onPress={() => { this.props.navigation.navigate("Option", { returnScreen: "Number" }); }}>
          <Text style={numberStyles.spanLog1}>{this.state.dispLog}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={numberStyles.divLog2} onPress={() => { this.props.navigation.navigate("Option", { returnScreen: "Number" }); }}>
          <Text style={global.calc.italicFlag ? numberStyles.spanLog2Italic : numberStyles.spanLog2}>{dispStr}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={numberStyles.divLog1} onPress={() => { this.props.navigation.navigate("Option", { returnScreen: "Number" }); }}>
          <Text style={numberStyles.spanLog1}>A = {this.state.dispAnswer}&nbsp;&nbsp;M = {this.state.dispMemory}</Text>
        </TouchableOpacity>
        <View style={numberStyles.divRow}>
          <TouchableOpacity style={[numberStyles.button1, numberStyles.divColorBlue]} onPress={this.onButtonMAdd}>
            <Text style={[numberStyles.spanFont25, numberStyles.spanColorBlack]}>M+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button1, numberStyles.divColorBlue]} onPress={this.onButtonMSub}>
            <Text style={[numberStyles.spanFont25, numberStyles.spanColorBlack]}>M-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button1, numberStyles.divColorBlue]} onPress={this.onButtonMRC}>
            <Text style={[numberStyles.spanFont25, global.calc.memoryRecalled ? numberStyles.spanColorRed : numberStyles.spanColorBlack]}>{this.state.mrcButtonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button1, numberStyles.divColorRed]} onPress={this.onButtonFunction}>
            <Text style={[numberStyles.spanFont25, numberStyles.spanColorWhite]}>FNC</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  componentDidMount() {
    console.log("MyNumberA componentDidMount");
  }

  componentWillUnmount() {
    console.log("MyNumberA componentWillUnmount");
  }
}

class MyNumberB extends React.Component {
  constructor(props) {
    console.log("MyNumberB constructor");
    super(props);

    props.setMyNumberB( this );

    // 状態管理
    this.state = {
      errorFlag: global.calc.errorFlag,
    };
    this.setErrorFlag = this.setErrorFlag.bind(this);

    // 操作
    this.onButtonCE = this.onButtonCE.bind(this);
    this.onButtonC = this.onButtonC.bind(this);
    this.onButtonDEL = this.onButtonDEL.bind(this);
    this.onButtonDiv = this.onButtonDiv.bind(this);
  }

  // 状態変更用コールバック関数
  setErrorFlag( errorFlag ){
    this.setState({ errorFlag: errorFlag });
  }

  // 操作
  onButtonNumber( func ){
    if( !global.calc.errorFlag ){
      func();
    }
  }
  onButtonClear( allFlag ){
    global.calcNumberService.clearEntry( allFlag );
  }
  onButtonCE(){
    this.onButtonClear( false );
  }
  onButtonC(){
    this.onButtonClear( true );
  }
  onButtonDEL(){
    if( !global.calc.errorFlag && global.calc.entryFlag ){
      global.calcNumberService.delEntry();
    }
  }
  onButtonDiv(){ this.onButtonNumber( () => {
    global.calcNumberService.setOp( global.calc.opTypeDiv );
  } ); }

  render() {
    console.log("MyNumberB render");

    const classNameDivCe = [ numberStyles.button2, global.calc.errorFlag ? numberStyles.divColorRed : numberStyles.divColorWhite ];
    const classNameSpanCe = [ numberStyles.spanFont32, global.calc.errorFlag ? numberStyles.spanColorWhite : numberStyles.spanColorRed ];

    return (
      <View>
        <View style={numberStyles.divRow}>
          <TouchableOpacity style={classNameDivCe} onPress={this.onButtonCE}>
            <Text style={classNameSpanCe}>CE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={classNameDivCe} onPress={this.onButtonC}>
            <Text style={classNameSpanCe}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button2, numberStyles.divColorWhite]} onPress={this.onButtonDEL}>
            <Text style={[numberStyles.spanFont32, numberStyles.spanColorBlack]}>DEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button2, numberStyles.divColorWhite]} onPress={this.onButtonDiv}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>÷</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  componentDidMount() {
    console.log("MyNumberB componentDidMount");
  }

  componentWillUnmount() {
    console.log("MyNumberB componentWillUnmount");
  }
}

class MyNumberC extends React.Component {
  constructor(props) {
    console.log("MyNumberC constructor");
    super(props);

    // 操作
    this.onButtonMul = this.onButtonMul.bind(this);
    this.onButtonSub = this.onButtonSub.bind(this);
    this.onButtonAdd = this.onButtonAdd.bind(this);
    this.onButton0 = this.onButton0.bind(this);
    this.onButton1 = this.onButton1.bind(this);
    this.onButton2 = this.onButton2.bind(this);
    this.onButton3 = this.onButton3.bind(this);
    this.onButton4 = this.onButton4.bind(this);
    this.onButton5 = this.onButton5.bind(this);
    this.onButton6 = this.onButton6.bind(this);
    this.onButton7 = this.onButton7.bind(this);
    this.onButton8 = this.onButton8.bind(this);
    this.onButton9 = this.onButton9.bind(this);
    this.onButtonPoint = this.onButtonPoint.bind(this);
    this.onButtonNegative = this.onButtonNegative.bind(this);
    this.onButtonEqual = this.onButtonEqual.bind(this);
  }

  // 操作
  onButtonNumber( func ){
    if( !global.calc.errorFlag ){
      func();
    }
  }
  onButtonMul(){ this.onButtonNumber( () => {
    global.calcNumberService.setOp( global.calc.opTypeMul );
  } ); }
  onButtonSub(){ this.onButtonNumber( () => {
    global.calcNumberService.setOp( global.calc.opTypeSub );
  } ); }
  onButtonAdd(){ this.onButtonNumber( () => {
    global.calcNumberService.setOp( global.calc.opTypeAdd );
  } ); }
  onButton0(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "0" );
  } ); }
  onButton1(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "1" );
  } ); }
  onButton2(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "2" );
  } ); }
  onButton3(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "3" );
  } ); }
  onButton4(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "4" );
  } ); }
  onButton5(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "5" );
  } ); }
  onButton6(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "6" );
  } ); }
  onButton7(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "7" );
  } ); }
  onButton8(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "8" );
  } ); }
  onButton9(){ this.onButtonNumber( () => {
    global.calcNumberService.addNumber( "9" );
  } ); }
  onButtonPoint(){ this.onButtonNumber( () => {
    global.calcNumberService.addPoint();
  } ); }
  onButtonNegative(){ this.onButtonNumber( () => {
    global.calcNumberService.negative();
  } ); }
  onButtonEqual(){ this.onButtonNumber( () => {
    global.calcNumberService.setOp( global.calc.opTypeSet );
  } ); }

  render() {
    console.log("MyNumberC render");
    return (
      <View>
        <View style={numberStyles.divRow}>
          <TouchableOpacity style={[numberStyles.button2, numberStyles.divColorWhite]} onPress={this.onButton7}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button2, numberStyles.divColorWhite]} onPress={this.onButton8}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button2, numberStyles.divColorWhite]} onPress={this.onButton9}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button2, numberStyles.divColorWhite]} onPress={this.onButtonMul}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>×</Text>
          </TouchableOpacity>
        </View>
        <View style={numberStyles.divRow}>
          <TouchableOpacity style={[numberStyles.button2, numberStyles.divColorWhite]} onPress={this.onButton4}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button2, numberStyles.divColorWhite]} onPress={this.onButton5}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button2, numberStyles.divColorWhite]} onPress={this.onButton6}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button2, numberStyles.divColorWhite]} onPress={this.onButtonSub}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={numberStyles.divRow}>
          <TouchableOpacity style={[numberStyles.button2, numberStyles.divColorWhite]} onPress={this.onButton1}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button2, numberStyles.divColorWhite]} onPress={this.onButton2}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button2, numberStyles.divColorWhite]} onPress={this.onButton3}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button2, numberStyles.divColorWhite]} onPress={this.onButtonAdd}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={numberStyles.divRow}>
          <TouchableOpacity style={[numberStyles.button3, numberStyles.divColorWhite]} onPress={this.onButtonNegative}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button3, numberStyles.divColorWhite]} onPress={this.onButton0}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button3, numberStyles.divColorWhite]} onPress={this.onButtonPoint}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorBlack]}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[numberStyles.button3, numberStyles.divColorWhite]} onPress={this.onButtonEqual}>
            <Text style={[numberStyles.spanFont40, numberStyles.spanColorRed]}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  componentDidMount() {
    console.log("MyNumberC componentDidMount");
  }

  componentWillUnmount() {
    console.log("MyNumberC componentWillUnmount");
  }
}

class MyNumber extends React.Component {
  constructor(props) {
    console.log("MyNumber constructor");
    super(props);

    // サービス
    global.calcNumberService = new MyCalcNumberService();

    this.setMyNumberA = this.setMyNumberA.bind(this);
    this.setMyNumberB = this.setMyNumberB.bind(this);
  }

  setMyNumberA( myNumberA ) {
    this.myNumberA = myNumberA;
  }
  setMyNumberB( myNumberB ) {
    this.myNumberB = myNumberB;
  }

  render() {
    console.log("MyNumber render");
    return (
      <View style={numberStyles.body}>
        <MyNumberA navigation={this.props.navigation} setMyNumberA={this.setMyNumberA} />
        <MyNumberB navigation={this.props.navigation} setMyNumberB={this.setMyNumberB} />
        <MyNumberC />
      </View>
    );
  }

  componentDidMount() {
    console.log("MyNumber componentDidMount");

    global.calcNumberService.initWithComponent(this.myNumberA, this.myNumberB);
  }

  componentWillUnmount() {
    console.log("MyNumber componentWillUnmount");
  }
}

export default MyNumber;
