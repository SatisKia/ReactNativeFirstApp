import { CheckBox } from 'react-native-elements';
import { Provider as PaperProvider } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

global.calc.setOptionStyles = () => {
  const size = global.app.size;
  global.calc.optionStyles = StyleSheet.create({
    body: {
      width: size(320),
      height: global.app.viewHeight,
      textAlign: 'left',
    },

    divReturn: {
      width: size(320),
      height: size(40),
      lineHeight: size(40),
      //text-align: 'center',
      alignItems: 'center', // 横方向アライメント
      //vertical-align: 'middle',
      justifyContent: 'center', // 縦方向アライメント
      backgroundColor: '#2196F3',
    },
    spanReturn: {
      fontSize: size(16),
      color: '#FFFFFF',
    },
    divOption: {
      width: size(300),
      padding: size(10),
    },
    spanOption: {
      fontSize: size(15),
      color: '#000000',
    },
    divSpace: {
      height: size(10),
    },

    checkbox1: {
      borderWidth: 0,
      backgroundColor: '#FFFFFF',
    },
    checkbox1Label: {
      fontSize: size(15),
    },

    radio1Label: {
      fontSize: size(15),
      textAlign: 'left',
      paddingLeft: size(5),
    },
  });
};

class MyOption extends React.Component {
  constructor(props) {
    console.log("MyOption constructor");
    super(props);

    this.returnScreen = props.route.params.returnScreen;

    this.state = {
      italicFlag: global.calc.italicFlag,
      separatorType: global.calc.separatorType
    };

    this.handleChangeItalic = this.handleChangeItalic.bind(this);
    this.handleChangeSeparatorTypeNone = this.handleChangeSeparatorTypeNone.bind(this);
    this.handleChangeSeparatorTypeDash = this.handleChangeSeparatorTypeDash.bind(this);
    this.handleChangeSeparatorTypeComma = this.handleChangeSeparatorTypeComma.bind(this);
  }

  // イタリック
  handleChangeItalic(event) {
    console.log("handleChangeItalic");

    global.calc.italicFlag = !global.calc.italicFlag;
    global.calc.save(global.calc.saveItalicFlag);

    this.setState({ italicFlag: global.calc.italicFlag });
  }

  // 桁区切り
  handleChangeSeparatorTypeNone(event) {
    console.log("handleChangeSeparatorTypeNone");

    global.calc.separatorType = global.calc.separatorTypeNone;
    global.calc.save(global.calc.saveSeparatorType);

    this.setState({ separatorType: global.calc.separatorType });
  }
  handleChangeSeparatorTypeDash(event) {
    console.log("handleChangeSeparatorTypeDash");

    global.calc.separatorType = global.calc.separatorTypeDash;
    global.calc.save(global.calc.saveSeparatorType);

    this.setState({ separatorType: global.calc.separatorType });
  }
  handleChangeSeparatorTypeComma(event) {
    console.log("handleChangeSeparatorTypeComma");

    global.calc.separatorType = global.calc.separatorTypeComma;
    global.calc.save(global.calc.saveSeparatorType);

    this.setState({ separatorType: global.calc.separatorType });
  }

  render() {
    console.log("MyOption render");

    const isEnglish = global.calc.isEnglish();
    const strBack           = isEnglish ? "Return" : "戻る";
    const strItalic         = isEnglish ? "Display calculation results in italics" : "計算結果をイタリックに";
    const strSeparator      = isEnglish ? "Separator" : "桁区切り";
    const strSeparatorNone  = isEnglish ? "None" : "なし";
    const strSeparatorUpper = isEnglish ? "Upper" : "上部";
    const strSeparatorLower = isEnglish ? "Lower" : "下部";

    const { italicFlag, separatorType } = this.state;

    return (
      <PaperProvider
        settings={{
          rippleEffectEnabled: false
        }}
      >
        <View style={global.calc.optionStyles.body}>
          <TouchableOpacity style={global.calc.optionStyles.divReturn} onPress={() => {
            if (this.returnScreen == 'Number') {
              global.calcNumberService.init();
            }
            if (this.returnScreen == 'Function') {
              global.calcFunctionService.init();
            }
            this.props.navigation.navigate(this.returnScreen);
          }}>
            <Text style={global.calc.optionStyles.spanReturn}>{strBack}</Text>
          </TouchableOpacity>
          <View style={global.calc.optionStyles.divOption}>
            <CheckBox
              title={strItalic}
              checked={italicFlag}
              onPress={this.handleChangeItalic}
              containerStyle={global.calc.optionStyles.checkbox1}
              textStyle={global.calc.optionStyles.checkbox1Label}
              checkedColor="#2196F3"
              uncheckedColor="#E0E0E0"
              activeOpacity={1.0}
            />
            <View style={global.calc.optionStyles.divSpace}></View>
            <View>
              <Text style={global.calc.optionStyles.spanOption}>{strSeparator}:</Text>
            </View>
            <RadioButton.Group>
              <RadioButton.Item
                value="first"
                label={strSeparatorNone}
                status={separatorType === global.calc.separatorTypeNone ? 'checked' : 'unchecked'}
                onPress={this.handleChangeSeparatorTypeNone}
                color="#2196F3"
                uncheckedColor="#E0E0E0"
                labelStyle={global.calc.optionStyles.radio1Label}
                position='leading'
              />
              <RadioButton.Item
                value="second"
                label={strSeparatorUpper}
                status={separatorType === global.calc.separatorTypeDash ? 'checked' : 'unchecked'}
                onPress={this.handleChangeSeparatorTypeDash}
                color="#2196F3"
                uncheckedColor="#E0E0E0"
                labelStyle={global.calc.optionStyles.radio1Label}
                position='leading'
              />
              <RadioButton.Item
                value="third"
                label={strSeparatorLower}
                status={separatorType === global.calc.separatorTypeComma ? 'checked' : 'unchecked'}
                onPress={this.handleChangeSeparatorTypeComma}
                color="#2196F3"
                uncheckedColor="#E0E0E0"
                labelStyle={global.calc.optionStyles.radio1Label}
                position='leading'
              />
            </RadioButton.Group>
          </View>
        </View>
      </PaperProvider>
    );
  }

  componentDidMount() {
    console.log("MyOption componentDidMount");
  }

  componentWillUnmount() {
    console.log("MyOption componentWillUnmount");
  }
}

export default MyOption;
