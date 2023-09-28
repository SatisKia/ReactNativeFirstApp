import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

global.calc.setNumberStyles = () => {
  const height = global.app.getContentHeight() - 20 - 50 - 20; // 計算結果等の表示欄の高さを引いた分
  const buttonHeight1 = Math.floor(height * 3 / 23);
  const buttonHeight2 = Math.floor(height * 4 / 23);
  const remainder = height - buttonHeight1 - buttonHeight2 * 5;
  const buttonHeight3 = buttonHeight2 + remainder;
  const size = global.app.size;
  global.calc.numberStyles = StyleSheet.create({
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

    divLogColor: {
      backgroundColor: '#E0E0E0',
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

    divLogColorT: {
      backgroundColor: '#E0E0E07F',
    },
    divColorBlueT: {
      backgroundColor: '#C0C0FF7F',
    },
    divColorRedT: {
      backgroundColor: '#FFA0A07F',
    },
    divColorWhiteT: {
      backgroundColor: '#FFFFFF7F',
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
        <TouchableOpacity activeOpacity={1.0} style={[global.calc.numberStyles.divLog1, global.app.imageFlag ? global.calc.numberStyles.divLogColorT : global.calc.numberStyles.divLogColor]} onPress={() => { this.props.navigation.navigate("Option", { returnScreen: "Number" }); }}>
          <Text style={global.calc.numberStyles.spanLog1}>{this.state.dispLog}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1.0} style={[global.calc.numberStyles.divLog2, global.app.imageFlag ? global.calc.numberStyles.divLogColorT : global.calc.numberStyles.divLogColor]} onPress={() => { this.props.navigation.navigate("Option", { returnScreen: "Number" }); }}>
          <Text style={global.calc.italicFlag ? global.calc.numberStyles.spanLog2Italic : global.calc.numberStyles.spanLog2}>{dispStr}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1.0} style={[global.calc.numberStyles.divLog1, global.app.imageFlag ? global.calc.numberStyles.divLogColorT : global.calc.numberStyles.divLogColor]} onPress={() => { this.props.navigation.navigate("Option", { returnScreen: "Number" }); }}>
          <Text style={global.calc.numberStyles.spanLog1}>A = {this.state.dispAnswer}&nbsp;&nbsp;M = {this.state.dispMemory}</Text>
        </TouchableOpacity>
        <View style={global.calc.numberStyles.divRow}>
          <TouchableOpacity style={[global.calc.numberStyles.button1, global.app.imageFlag ? global.calc.numberStyles.divColorBlueT : global.calc.numberStyles.divColorBlue]} onPress={this.onButtonMAdd}>
            <Text style={[global.calc.numberStyles.spanFont25, global.calc.numberStyles.spanColorBlack]}>M+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button1, global.app.imageFlag ? global.calc.numberStyles.divColorBlueT : global.calc.numberStyles.divColorBlue]} onPress={this.onButtonMSub}>
            <Text style={[global.calc.numberStyles.spanFont25, global.calc.numberStyles.spanColorBlack]}>M-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button1, global.app.imageFlag ? global.calc.numberStyles.divColorBlueT : global.calc.numberStyles.divColorBlue]} onPress={this.onButtonMRC}>
            <Text style={[global.calc.numberStyles.spanFont25, global.calc.memoryRecalled ? global.calc.numberStyles.spanColorRed : global.calc.numberStyles.spanColorBlack]}>{this.state.mrcButtonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button1, global.app.imageFlag ? global.calc.numberStyles.divColorRedT : global.calc.numberStyles.divColorRed]} onPress={this.onButtonFunction}>
            <Text style={[global.calc.numberStyles.spanFont25, global.calc.numberStyles.spanColorWhite]}>FNC</Text>
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

    const classNameDivCe = [ global.calc.numberStyles.button2, global.calc.errorFlag ?
      (global.app.imageFlag ? global.calc.numberStyles.divColorRedT   : global.calc.numberStyles.divColorRed  ) :
      (global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite)
    ];
    const classNameSpanCe = [ global.calc.numberStyles.spanFont32, global.calc.errorFlag ?
      global.calc.numberStyles.spanColorWhite :
      global.calc.numberStyles.spanColorRed
    ];

    return (
      <View>
        <View style={global.calc.numberStyles.divRow}>
          <TouchableOpacity style={classNameDivCe} onPress={this.onButtonCE}>
            <Text style={classNameSpanCe}>CE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={classNameDivCe} onPress={this.onButtonC}>
            <Text style={classNameSpanCe}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button2, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButtonDEL}>
            <Text style={[global.calc.numberStyles.spanFont32, global.calc.numberStyles.spanColorBlack]}>DEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button2, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButtonDiv}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>÷</Text>
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
        <View style={global.calc.numberStyles.divRow}>
          <TouchableOpacity style={[global.calc.numberStyles.button2, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButton7}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button2, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButton8}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button2, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButton9}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button2, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButtonMul}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>×</Text>
          </TouchableOpacity>
        </View>
        <View style={global.calc.numberStyles.divRow}>
          <TouchableOpacity style={[global.calc.numberStyles.button2, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButton4}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button2, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButton5}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button2, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButton6}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button2, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButtonSub}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={global.calc.numberStyles.divRow}>
          <TouchableOpacity style={[global.calc.numberStyles.button2, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButton1}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button2, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButton2}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button2, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButton3}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button2, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButtonAdd}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={global.calc.numberStyles.divRow}>
          <TouchableOpacity style={[global.calc.numberStyles.button3, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButtonNegative}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button3, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButton0}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button3, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButtonPoint}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorBlack]}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[global.calc.numberStyles.button3, global.app.imageFlag ? global.calc.numberStyles.divColorWhiteT : global.calc.numberStyles.divColorWhite]} onPress={this.onButtonEqual}>
            <Text style={[global.calc.numberStyles.spanFont40, global.calc.numberStyles.spanColorRed]}>=</Text>
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

    this.state = {
      imageFlag: global.app.imageFlag,
      imageCropUrl: global.app.imageCropUrl
    };

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
      <ImageBackground fadeDuration={0} source={{ uri: global.app.imageFlag ? global.app.imageCropUrl : "" }} style={global.calc.numberStyles.body}>
        <MyNumberA navigation={this.props.navigation} setMyNumberA={this.setMyNumberA} />
        <MyNumberB navigation={this.props.navigation} setMyNumberB={this.setMyNumberB} />
        <MyNumberC />
      </ImageBackground>
    );
  }

  componentDidMount() {
    console.log("MyNumber componentDidMount");

    global.calcNumberService.initWithComponent(this.myNumberA, this.myNumberB);

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
console.log("MyNumber focus");
      if (this.state.imageFlag != global.app.imageFlag || this.state.imageCropUrl != global.app.imageCropUrl) {
        this.setState({ imageFlag: global.app.imageFlag, imageCropUrl: global.app.imageCropUrl });
      }
    });
  }

  componentWillUnmount() {
    console.log("MyNumber componentWillUnmount");

    this._unsubscribe();
  }
}

export default MyNumber;
