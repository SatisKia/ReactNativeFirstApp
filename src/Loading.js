import { StyleSheet, View } from 'react-native';
import React from 'react';

global.calc.setLoadingStyles = () => {
  const size = global.app.size;
  global.calc.loadingStyles = StyleSheet.create({
    body: {
      width: size(320),
      height: global.app.viewHeight,
    },
  });
};

class MyLoading extends React.Component {
  constructor(props) {
    console.log("MyLoading constructor");
    super(props);
  }

  render() {
    console.log("MyLoading render");
    return (
      <View style={global.calc.loadingStyles.body}>
      </View>
    );
  }

  componentDidMount() {
    console.log("MyLoading componentDidMount");

    // グローバルデータ
    global.calc.init().then(() => {
      this.props.navigation.navigate("Number");
    });
  }

  componentWillUnmount() {
    console.log("MyLoading componentWillUnmount");
  }
}

export default MyLoading;
