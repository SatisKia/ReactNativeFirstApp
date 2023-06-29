import { CheckBox } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const optionStyles = StyleSheet.create({
  body: {
    width: 320,
    height: 506,
    textAlign: 'left',
  },

  divReturn: {
    width: 320,
    height: 40,
    lineHeight: 40,
//    textAlign: 'center', // textAlignはText側で指定する
//    verticalAlign: 'middle',
    justifyContent: 'center', // 縦方向
    backgroundColor: '#2196F3',
  },
  spanReturn: {
    textAlign: 'center', // textAlignはText側で指定する
    fontSize: 16,
    color: '#FFFFFF',
  },
  divOption: {
    width: 300,
    padding: 10,
  },
  spanOption: {
    fontSize: 15,
    color: '#000000',
  },
  divSpace: {
    height: 10,
  },

  checkbox1: {
    borderWidth: 0,
    backgroundColor: '#FFFFFF',
  },
  checkbox1Label: {
    fontSize: 15,
  },

  radio1Label: {
    fontSize: 15,
    textAlign: 'left',
    paddingLeft: 5,
  },
});

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
      <View style={optionStyles.body}>
        <TouchableOpacity style={optionStyles.divReturn} onPress={() => { this.props.navigation.navigate(this.returnScreen); }}>
          <Text style={optionStyles.spanReturn}>{strBack}</Text>
        </TouchableOpacity>
        <View style={optionStyles.divOption}>
          <CheckBox
            title={strItalic}
            checked={italicFlag}
            onPress={this.handleChangeItalic}
            containerStyle={optionStyles.checkbox1}
            textStyle={optionStyles.checkbox1Label}
          />
          <View style={optionStyles.divSpace}></View>
          <View>
            <Text style={optionStyles.spanOption}>{strSeparator}:</Text>
          </View>
          <RadioButton.Group>
            <RadioButton.Item
              value="first"
              label={strSeparatorNone}
              status={separatorType === global.calc.separatorTypeNone ? 'checked' : 'unchecked'}
              onPress={this.handleChangeSeparatorTypeNone}
              labelStyle={optionStyles.radio1Label}
              position='leading'
            />
            <RadioButton.Item
              value="second"
              label={strSeparatorUpper}
              status={separatorType === global.calc.separatorTypeDash ? 'checked' : 'unchecked'}
              onPress={this.handleChangeSeparatorTypeDash}
              labelStyle={optionStyles.radio1Label}
              position='leading'
            />
            <RadioButton.Item
              value="third"
              label={strSeparatorLower}
              status={separatorType === global.calc.separatorTypeComma ? 'checked' : 'unchecked'}
              onPress={this.handleChangeSeparatorTypeComma}
              labelStyle={optionStyles.radio1Label}
              position='leading'
            />
          </RadioButton.Group>
        </View>
      </View>
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
