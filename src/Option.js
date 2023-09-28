import { CheckBox, Slider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Provider as PaperProvider } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import { Image, ImageBackground, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';

import MyImageUtil from './service/ImageUtil';

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
      backgroundColor: '#FFFFFF00',
    },
    checkbox1Label: {
      fontSize: size(15),
      fontWeight: 'normal',
      color: '#000000',
    },

    radio1Label: {
      fontSize: size(15),
      textAlign: 'left',
      paddingLeft: size(5),
    },

    divSpaceH: {
      width: size(10),
    },
    input1: {
      fontSize: size(18),
      width: size(300),
      padding: size(5),
      borderBottomWidth: 1,
      borderBottomColor: '#000000',
    },
    input2: {
      width: size(300),
      height: size(40),
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
      separatorType: global.calc.separatorType,
      imageFlag: global.app.imageFlag,
      imageUrl: global.app.imageUrl,
      imageX: global.app.imageX,
      imageY: global.app.imageY,
      imageCropUrl: global.app.imageCropUrl
    };

    this.back = this.back.bind(this);
    this.handleChangeItalic = this.handleChangeItalic.bind(this);
    this.handleChangeSeparatorTypeNone = this.handleChangeSeparatorTypeNone.bind(this);
    this.handleChangeSeparatorTypeDash = this.handleChangeSeparatorTypeDash.bind(this);
    this.handleChangeSeparatorTypeComma = this.handleChangeSeparatorTypeComma.bind(this);
    this.handleChangeImageUrl = this.handleChangeImageUrl.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.handleChangeImageX = this.handleChangeImageX.bind(this);
    this.handleChangeImageY = this.handleChangeImageY.bind(this);
  }

  // 戻る
  back() {
    console.log("back");

    global.app.save().then(() => {
      if (this.returnScreen == 'Number') {
        global.calcNumberService.init();
      }
      if (this.returnScreen == 'Function') {
        global.calcFunctionService.init();
      }
//      this.props.navigation.navigate(this.returnScreen);
      this.props.navigation.goBack();
    });
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

  // 画像URL
  handleChangeImageUrl(text) {
    global.app.imageFlag = false;
    global.app.imageUrl = text;
    global.app.reload();

    this.setState({
      imageFlag: global.app.imageFlag,
      imageUrl: global.app.imageUrl,
      imageX: global.app.imageX,
      imageY: global.app.imageY
    });
  }

  // 画像を読み込む
  async loadImage() {
    console.log("loadImage");

    global.app.imageFlag = true;

    let imageUtil = new MyImageUtil();
    imageUtil.fetchImage(
      global.app.imageUrl,
      (uri) => {
        if (global.app.imageTempUrl) {
          imageUtil.unlinkImage(global.app.imageTempUrl);
        }
        global.app.imageTempUrl = uri;
        imageUtil.cropImage(
          global.app.imageTempUrl,
          global.app.imageX,
          global.app.imageY,
          global.app.viewWidth,
          global.app.viewHeight,
          false,
          (uri) => {
            if (global.app.imageCropUrl) {
              imageUtil.unlinkImage(global.app.imageCropUrl);
            }

            global.app.imageCropUrl = uri;
            global.app.save();

            this.setState({ imageFlag: global.app.imageFlag, imageCropUrl: global.app.imageCropUrl });
          }
        );
      }
    );
  }

  // 画像を設定解除
  removeImage() {
    console.log("removeImage");

    global.app.imageFlag = false;
    global.app.save();

    this.setState({ imageFlag: global.app.imageFlag });
  }

  // 水平方向の配置
  handleChangeImageX(value) {
    global.app.imageX = value;
    console.log("handleChangeImageX " + global.app.imageX);

    if (global.app.imageFlag) {
      let imageUtil = new MyImageUtil();
      imageUtil.cropImage(
        global.app.imageTempUrl,
        global.app.imageX,
        global.app.imageY,
        global.app.viewWidth,
        global.app.viewHeight,
        false,
        (uri) => {
          if (global.app.imageCropUrl) {
            imageUtil.unlinkImage(global.app.imageCropUrl);
          }
          global.app.imageCropUrl = uri;
//          Image.prefetch(global.app.imageCropUrl).then(() => {
//            this.setState({ imageX: global.app.imageX, imageCropUrl: global.app.imageCropUrl });
//          });
          this.changeImageX = true;
        }
      );
    } else {
      this.setState({ imageX: global.app.imageX });
    }
  }

  // 垂直方向の配置
  handleChangeImageY(value) {
    global.app.imageY = value;
    console.log("handleChangeImageY " + global.app.imageY);

    if (global.app.imageFlag) {
      let imageUtil = new MyImageUtil();
      imageUtil.cropImage(
        global.app.imageTempUrl,
        global.app.imageX,
        global.app.imageY,
        global.app.viewWidth,
        global.app.viewHeight,
        false,
        (uri) => {
          if (global.app.imageCropUrl) {
            imageUtil.unlinkImage(global.app.imageCropUrl);
          }
          global.app.imageCropUrl = uri;
//          Image.prefetch(global.app.imageCropUrl).then(() => {
//            this.setState({ imageY: global.app.imageY, imageCropUrl: global.app.imageCropUrl });
//          });
          this.changeImageY = true;
        }
      );
    } else {
      this.setState({ imageY: global.app.imageY });
    }
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
    const strImageUrl       = isEnglish ? "Image URL" : "画像URL";
    const strLoadImage      = isEnglish ? "Load image" : "画像を読み込む";
    const strRemoveImage    = isEnglish ? "Remove image" : "画像を設定解除";
    const strImageX         = isEnglish ? "Horizontal alignment" : "水平方向の配置";
    const strImageY         = isEnglish ? "Vertical alignment" : "垂直方向の配置";

    const { italicFlag, separatorType, imageFlag, imageUrl, imageX, imageY, imageCropUrl } = this.state;

    const size = global.app.size;
    return (
      <PaperProvider settings={{ rippleEffectEnabled: false }}>
        <ImageBackground fadeDuration={0} source={{ uri: imageFlag ? imageCropUrl : "" }} style={global.calc.optionStyles.body}>
          <TouchableOpacity style={global.calc.optionStyles.divReturn} onPress={this.back}>
            <Text style={global.calc.optionStyles.spanReturn}>{strBack}</Text>
          </TouchableOpacity>
<KeyboardAwareScrollView enableOnAndroid={true}>
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
            <View style={global.calc.optionStyles.divSpace}></View>
            <View>
              <Text style={global.calc.optionStyles.spanOption}>{strImageUrl}:</Text>
            </View>
            <TextInput
              style={global.calc.optionStyles.input1}
              value={imageUrl}
              secureTextEntry={false}
              keyboardType='default'
              onChangeText={this.handleChangeImageUrl}
            />
            <View style={global.calc.optionStyles.divSpace}></View>
            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{ width: '45%', marginVertical: size(5) }}>
                <Button onPress={this.loadImage} title={strLoadImage} />
              </View>
              <View style={global.calc.optionStyles.divSpaceH}></View>
              <View style={{ width: '45%', marginVertical: size(5) }}>
                <Button onPress={this.removeImage} title={strRemoveImage} />
              </View>
            </View>
            <View style={global.calc.optionStyles.divSpace}></View>
            <View>
              <Text style={global.calc.optionStyles.spanOption}>{strImageX}:</Text>
            </View>
            <Slider
              style={global.calc.optionStyles.input2}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={imageX}
              onValueChange={this.handleChangeImageX}
              thumbStyle={{ width: size(20), height: size(20) }}
              thumbTintColor='#2196F3'
            />
            <View>
              <Text style={global.calc.optionStyles.spanOption}>{strImageY}:</Text>
            </View>
            <Slider
              style={global.calc.optionStyles.input2}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={imageY}
              onValueChange={this.handleChangeImageY}
              thumbStyle={{ width: size(20), height: size(20) }}
              thumbTintColor='#2196F3'
            />
          </View>
</KeyboardAwareScrollView>
        </ImageBackground>
      </PaperProvider>
    );
  }

  componentDidMount() {
    console.log("MyOption componentDidMount");

    this.changeImageX = false;
    this.changeImageY = false;
    this.changeImageIntervalId = setInterval(() => {
      if (this.changeImageX) {
        this.setState({ imageX: global.app.imageX, imageCropUrl: global.app.imageCropUrl });
        this.changeImageX = false;
      }
      if (this.changeImageY) {
        this.setState({ imageY: global.app.imageY, imageCropUrl: global.app.imageCropUrl });
        this.changeImageY = false;
      }
    }, 500);
  }

  componentWillUnmount() {
    console.log("MyOption componentWillUnmount");

    clearInterval(this.changeImageIntervalId);
  }
}

export default MyOption;
