import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

global.calc.setFunctionStyles = () => {
  const height = global.app.getContentHeight() - 20 - 50 - 20; // 計算結果等の表示欄の高さを引いた分
  const buttonHeight1 = height * 3 / 23;
  const buttonHeight2 = height * 4 / 23;
  const remainder = height - buttonHeight1 - buttonHeight2 * 5;
  const buttonHeight3 = buttonHeight2 + remainder;
  const size = global.app.size;
  global.calc.functionStyles = StyleSheet.create({
    body: {
      width: size(320),
      height: global.app.viewHeight,
    },

    divLog1: {
      width: size(320),
      height: size(20),
      lineHeight: size(20),
      //text-align: 'left',
      alignItems: 'flex-start', // 横方向アライメント
      backgroundColor: '#E0E0E0',
    },
    spanLog1: {
      fontSize: size(17),
      color: '#000000',
    },
    divLog2: {
      width: size(320),
      height: size(50),
      lineHeight: size(50),
      //text-align: 'right',
      alignItems: 'flex-end', // 横方向アライメント
      backgroundColor: '#E0E0E0',
    },
    spanLog2: {
      fontSize: size(29),
      color: '#000000',
    },
    spanLog2Italic: {
      fontSize: size(29),
      fontStyle: 'italic',
      color: '#000000',
    },
    divRow: {
      //display: 'flex',
      flexDirection: 'row', // React Nativeで要素を横並びにする方法
    },

    button1: {
      width: size(80),
      height: size(buttonHeight1),
      lineHeight: size(buttonHeight1),
      //text-align: 'center',
      alignItems: 'center', // 横方向アライメント
      //vertical-align: 'middle',
      justifyContent: 'center', // 縦方向アライメント
    },
    button2: {
      width: size(80),
      height: size(buttonHeight2),
      lineHeight: size(buttonHeight2),
      //text-align: 'center',
      alignItems: 'center', // 横方向アライメント
      //vertical-align: 'middle',
      justifyContent: 'center', // 縦方向アライメント
    },
    button3: {
      width: size(80),
      height: size(buttonHeight3),
      lineHeight: size(buttonHeight3),
      //text-align: 'center',
      alignItems: 'center', // 横方向アライメント
      //vertical-align: 'middle',
      justifyContent: 'center', // 縦方向アライメント
    },
    func1: {
      width: size(107),
    },
    func2: {
      width: size(106),
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
      fontSize: size(25),
    },
    spanFont32: {
      fontSize: size(32),
    },
    spanFont40: {
      fontSize: size(40),
    },
  });
};

class MyFunctionA extends React.Component {
  constructor(props) {
    console.log("MyFunctionA constructor");
    super(props);

    props.setMyFunctionA( this );

    // 状態管理
    this.state = {
      dispStr: "0",
      dispAngle: "RAD",
      dispMemory: "0",
      mrcButtonText: "MR",
      memoryRecalled: global.calc.memoryRecalled,
    };
    this.setDispStr = this.setDispStr.bind(this);
    this.setDispAngle = this.setDispAngle.bind(this);
    this.setDispMemory = this.setDispMemory.bind(this);
    this.setMrcButtonText = this.setMrcButtonText.bind(this);
    this.setMemoryRecalled = this.setMemoryRecalled.bind(this);

    // 操作
    this.onButtonMAdd = this.onButtonMAdd.bind(this);
    this.onButtonMSub = this.onButtonMSub.bind(this);
    this.onButtonMRC = this.onButtonMRC.bind(this);
    this.onButtonNumber = this.onButtonNumber.bind(this);
  }

  // 状態変更用コールバック関数
  setDispStr( dispStr ){
    this.setState({ dispStr: dispStr });
  }
  setDispAngle( dispAngle ){
    this.setState({ dispAngle: dispAngle });
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
  onButtonFunction( func ){
    if( !global.calc.errorFlag ){
      func();
    }
  }
  onButtonMAdd(){ this.onButtonFunction( () => {
    global.calcFunctionService.addMemory();
  } ); }
  onButtonMSub(){ this.onButtonFunction( () => {
    global.calcFunctionService.subMemory();
  } ); }
  onButtonMRC(){ this.onButtonFunction( () => {
    if( global.calc.memoryRecalled ){
      global.calcFunctionService.clearMemory();
    } else {
      global.calcFunctionService.recallMemory();
    }
  } ); }
  onButtonNumber(){ this.onButtonFunction( () => {
    global.calcFunctionService.setOp();
    global.calcNumberService.init();
    this.props.navigation.navigate("Number");
  } ); }

  render() {
    console.log("MyFunctionA render");

    // 桁区切り
    let dispStr = this.state.dispStr;
    if (global.calc.separatorType == global.calc.separatorTypeDash) {
      dispStr = global.calcFunctionService.sepString(dispStr, "'");
    } else if (global.calc.separatorType == global.calc.separatorTypeComma) {
      dispStr = global.calcFunctionService.sepString(dispStr, ",");
    }

    return (
      <View>
        <TouchableOpacity activeOpacity={1.0} style={global.calc.functionStyles.divLog1} onPress={() => { this.props.navigation.navigate("Option", { returnScreen: "Function" }); }}>
          <Text style={global.calc.functionStyles.spanLog1}>{this.state.dispAngle}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1.0} style={global.calc.functionStyles.divLog2} onPress={() => { this.props.navigation.navigate("Option", { returnScreen: "Function" }); }}>
          <Text style={global.calc.italicFlag ? global.calc.functionStyles.spanLog2Italic : global.calc.functionStyles.spanLog2}>{dispStr}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1.0} style={global.calc.functionStyles.divLog1} onPress={() => { this.props.navigation.navigate("Option", { returnScreen: "Function" }); }}>
          <Text style={global.calc.functionStyles.spanLog1}>M = {this.state.dispMemory}</Text>
        </TouchableOpacity>
        <View style={global.calc.functionStyles.divRow}>
          <TouchableOpacity style={[global.calc.functionStyles.button1, global.calc.functionStyles.divColorBlue]} onPress={this.onButtonMAdd}>
            <Text style={[global.calc.functionStyles.spanFont25, global.calc.functionStyles.spanColorBlack]}>M+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.functionStyles.button1, global.calc.functionStyles.divColorBlue]} onPress={this.onButtonMSub}>
            <Text style={[global.calc.functionStyles.spanFont25, global.calc.functionStyles.spanColorBlack]}>M-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.functionStyles.button1, global.calc.functionStyles.divColorBlue]} onPress={this.onButtonMRC}>
            <Text style={[global.calc.functionStyles.spanFont25, global.calc.memoryRecalled ? global.calc.functionStyles.spanColorRed : global.calc.functionStyles.spanColorBlack]}>{this.state.mrcButtonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.functionStyles.button1, global.calc.functionStyles.divColorRed]} onPress={this.onButtonNumber}>
            <Text style={[global.calc.functionStyles.spanFont25, global.calc.functionStyles.spanColorWhite]}>NUM</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  componentDidMount() {
    console.log("MyFunctionA componentDidMount");
  }

  componentWillUnmount() {
    console.log("MyFunctionA componentWillUnmount");
  }
}

class MyFunctionB extends React.Component {
  constructor(props) {
    console.log("MyFunctionB constructor");
    super(props);

    props.setMyFunctionB( this );

    // 状態管理
    this.state = {
      angleButtonText: "DEG",
      errorFlag: global.calc.errorFlag,
    };
    this.setAngleButtonText = this.setAngleButtonText.bind(this);
    this.setErrorFlag = this.setErrorFlag.bind(this);

    // 操作
    this.onButtonCE = this.onButtonCE.bind(this);
    this.onButtonC = this.onButtonC.bind(this);
    this.onButtonAngle = this.onButtonAngle.bind(this);
    this.onButtonSqrt = this.onButtonSqrt.bind(this);
  }

  // 状態変更用コールバック関数
  setAngleButtonText( angleButtonText ){
    this.setState({ angleButtonText: angleButtonText });
  }
  setErrorFlag( errorFlag ){
    this.setState({ errorFlag: errorFlag });
  }

  changeAngle(){
    if( global.calcFunctionService.angle() == global.calc.angleTypeRad ){
      global.calcFunctionService.setAngle( global.calc.angleTypeDeg );
    } else if( global.calcFunctionService.angle() == global.calc.angleTypeDeg ){
      global.calcFunctionService.setAngle( global.calc.angleTypeGrad );
    } else if( global.calcFunctionService.angle() == global.calc.angleTypeGrad ){
      global.calcFunctionService.setAngle( global.calc.angleTypeRad );
    }
  }

  // 操作
  onButtonFunction( func ){
    if( !global.calc.errorFlag ){
      func();
    }
  }
  onButtonClear( allFlag ){
    global.calcFunctionService.clearEntry( allFlag );
  }
  onButtonCE(){
    this.onButtonClear( false );
  }
  onButtonC(){
    this.onButtonClear( true );
  }
  onButtonAngle(){ this.onButtonFunction( () => {
    this.changeAngle();
  } ); }
  onButtonSqrt(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcSqrt();
    global.calcFunctionService.setOp();
  } ); }

  render() {
    console.log("MyFunctionB render");

    const styleDivCe = [ global.calc.functionStyles.button2, global.calc.errorFlag ? global.calc.functionStyles.divColorRed : global.calc.functionStyles.divColorWhite ];
    const styleSpanCe = [ global.calc.functionStyles.spanFont32, global.calc.errorFlag ? global.calc.functionStyles.spanColorWhite : global.calc.functionStyles.spanColorRed ];

    return (
      <View>
        <View style={global.calc.functionStyles.divRow}>
          <TouchableOpacity style={styleDivCe} onPress={this.onButtonCE}>
            <Text style={styleSpanCe}>CE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleDivCe} onPress={this.onButtonC}>
            <Text style={styleSpanCe}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.functionStyles.button2, global.calc.functionStyles.divColorWhite]} onPress={this.onButtonAngle}>
            <Text style={[global.calc.functionStyles.spanFont25, global.calc.functionStyles.spanColorBlack]}>{this.state.angleButtonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.functionStyles.button2, global.calc.functionStyles.divColorWhite]} onPress={this.onButtonSqrt}>
            <Text style={[global.calc.functionStyles.spanFont40, global.calc.functionStyles.spanColorBlack]}>√</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  componentDidMount() {
    console.log("MyFunctionB componentDidMount");
  }

  componentWillUnmount() {
    console.log("MyFunctionB componentWillUnmount");
  }
}

class MyFunctionC extends React.Component {
  constructor(props) {
    console.log("MyFunctionC constructor");
    super(props);

    // 操作
    this.onButtonSin = this.onButtonSin.bind(this);
    this.onButtonCos = this.onButtonCos.bind(this);
    this.onButtonTan = this.onButtonTan.bind(this);
    this.onButtonArcSin = this.onButtonArcSin.bind(this);
    this.onButtonArcCos = this.onButtonArcCos.bind(this);
    this.onButtonArcTan = this.onButtonArcTan.bind(this);
    this.onButtonLog = this.onButtonLog.bind(this);
    this.onButtonLog10 = this.onButtonLog10.bind(this);
    this.onButtonSqr = this.onButtonSqr.bind(this);
    this.onButtonExp = this.onButtonExp.bind(this);
    this.onButtonExp10 = this.onButtonExp10.bind(this);
    this.onButtonInt = this.onButtonInt.bind(this);
  }

  // 操作
  onButtonFunction( func ){
    if( !global.calc.errorFlag ){
      func();
    }
  }
  onButtonSin(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcSin();
    global.calcFunctionService.setOp();
  } ); }
  onButtonCos(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcCos();
    global.calcFunctionService.setOp();
  } ); }
  onButtonTan(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcTan();
    global.calcFunctionService.setOp();
  } ); }
  onButtonArcSin(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcArcSin();
    global.calcFunctionService.setOp();
  } ); }
  onButtonArcCos(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcArcCos();
    global.calcFunctionService.setOp();
  } ); }
  onButtonArcTan(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcArcTan();
    global.calcFunctionService.setOp();
  } ); }
  onButtonLog(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcLog();
    global.calcFunctionService.setOp();
  } ); }
  onButtonLog10(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcLog10();
    global.calcFunctionService.setOp();
  } ); }
  onButtonSqr(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcSqr();
    global.calcFunctionService.setOp();
  } ); }
  onButtonExp(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcExp();
    global.calcFunctionService.setOp();
  } ); }
  onButtonExp10(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcExp10();
    global.calcFunctionService.setOp();
  } ); }
  onButtonInt(){ this.onButtonFunction( () => {
    global.calcFunctionService.funcInt();
    global.calcFunctionService.setOp();
  } ); }

  render() {
    console.log("MyFunctionC render");
    return (
      <View>
        <View style={global.calc.functionStyles.divRow}>
          <TouchableOpacity style={[global.calc.functionStyles.button2, global.calc.functionStyles.func1, global.calc.functionStyles.divColorWhite]} onPress={this.onButtonSin}>
            <Text style={[global.calc.functionStyles.spanFont32, global.calc.functionStyles.spanColorBlack]}>sin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.functionStyles.button2, global.calc.functionStyles.func1, global.calc.functionStyles.divColorWhite]} onPress={this.onButtonCos}>
            <Text style={[global.calc.functionStyles.spanFont32, global.calc.functionStyles.spanColorBlack]}>cos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.functionStyles.button2, global.calc.functionStyles.func2, global.calc.functionStyles.divColorWhite]} onPress={this.onButtonTan}>
            <Text style={[global.calc.functionStyles.spanFont32, global.calc.functionStyles.spanColorBlack]}>tan</Text>
          </TouchableOpacity>
        </View>
        <View style={global.calc.functionStyles.divRow}>
          <TouchableOpacity style={[global.calc.functionStyles.button2, global.calc.functionStyles.func1, global.calc.functionStyles.divColorWhite]} onPress={this.onButtonArcSin}>
            <Text style={[global.calc.functionStyles.spanFont32, global.calc.functionStyles.spanColorBlack]}>asin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.functionStyles.button2, global.calc.functionStyles.func1, global.calc.functionStyles.divColorWhite]} onPress={this.onButtonArcCos}>
            <Text style={[global.calc.functionStyles.spanFont32, global.calc.functionStyles.spanColorBlack]}>acos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.functionStyles.button2, global.calc.functionStyles.func2, global.calc.functionStyles.divColorWhite]} onPress={this.onButtonArcTan}>
            <Text style={[global.calc.functionStyles.spanFont32, global.calc.functionStyles.spanColorBlack]}>atan</Text>
          </TouchableOpacity>
        </View>
        <View style={global.calc.functionStyles.divRow}>
          <TouchableOpacity style={[global.calc.functionStyles.button2, global.calc.functionStyles.func1, global.calc.functionStyles.divColorWhite]} onPress={this.onButtonLog}>
            <Text style={[global.calc.functionStyles.spanFont32, global.calc.functionStyles.spanColorBlack]}>ln</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.functionStyles.button2, global.calc.functionStyles.func1, global.calc.functionStyles.divColorWhite]} onPress={this.onButtonLog10}>
            <Text style={[global.calc.functionStyles.spanFont32, global.calc.functionStyles.spanColorBlack]}>log</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.functionStyles.button2, global.calc.functionStyles.func2, global.calc.functionStyles.divColorWhite]} onPress={this.onButtonSqr}>
            <Text style={[global.calc.functionStyles.spanFont32, global.calc.functionStyles.spanColorBlack]}>sqr</Text>
          </TouchableOpacity>
        </View>
        <View style={global.calc.functionStyles.divRow}>
          <TouchableOpacity style={[global.calc.functionStyles.button3, global.calc.functionStyles.func1, global.calc.functionStyles.divColorWhite]} onPress={this.onButtonExp}>
            <Text style={[global.calc.functionStyles.spanFont32, global.calc.functionStyles.spanColorBlack]}>exp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.functionStyles.button3, global.calc.functionStyles.func1, global.calc.functionStyles.divColorWhite]} onPress={this.onButtonExp10}>
            <Text style={[global.calc.functionStyles.spanFont32, global.calc.functionStyles.spanColorBlack]}>exp10</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.functionStyles.button3, global.calc.functionStyles.func2, global.calc.functionStyles.divColorWhite]} onPress={this.onButtonInt}>
            <Text style={[global.calc.functionStyles.spanFont32, global.calc.functionStyles.spanColorBlack]}>int</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  componentDidMount() {
    console.log("MyFunctionC componentDidMount");
  }

  componentWillUnmount() {
    console.log("MyFunctionC componentWillUnmount");
  }
}

class MyFunction extends React.Component {
  constructor(props) {
    console.log("MyFunction constructor");
    super(props);

    this.setMyFunctionA = this.setMyFunctionA.bind(this);
    this.setMyFunctionB = this.setMyFunctionB.bind(this);
  }

  setMyFunctionA( myFunctionA ) {
    this.myFunctionA = myFunctionA;
  }
  setMyFunctionB( myFunctionB ) {
    this.myFunctionB = myFunctionB;
  }

  render() {
    console.log("MyFunction render");
    return (
      <View style={global.calc.functionStyles.body}>
        <MyFunctionA navigation={this.props.navigation} setMyFunctionA={this.setMyFunctionA} />
        <MyFunctionB navigation={this.props.navigation} setMyFunctionB={this.setMyFunctionB} />
        <MyFunctionC />
      </View>
    );
  }

  componentDidMount() {
    console.log("MyFunction componentDidMount");

    global.calcFunctionService.initWithComponent(this.myFunctionA, this.myFunctionB);
  }

  componentWillUnmount() {
    console.log("MyFunction componentWillUnmount");
  }
}

export default MyFunction;
