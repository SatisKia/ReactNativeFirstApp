import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';

global.calc.setLoadingStyles = () => {
  const size = global.app.size;
  global.calc.loadingStyles = StyleSheet.create({
    body: {
      width: size(320),
      height: global.app.viewHeight,
      justifyContent: 'center',
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
        <ActivityIndicator size="large" color="#999999" />
      </View>
    );
  }

  componentDidMount() {
    console.log("MyLoading componentDidMount");

    // グローバルデータ
    global.app.init().then(() => {
      global.calc.init().then(() => {
        this.props.navigation.navigate("Number");
      });
    });
  }

  componentWillUnmount() {
    console.log("MyLoading componentWillUnmount");
  }
}

export default MyLoading;
