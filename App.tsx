import {
  // Alert,
  Clipboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const App = () => {
  const [randomBackground, setRandomBackground] = useState('#ffffff');
  const [shapeArr, setShapeArr] = useState([]);

  const generateHexString = () => {
    const hexRange = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexRange.charAt(Math.floor(Math.random() * hexRange.length));
    }
    return color;
  };

  const handlePress = () => {
    setRandomBackground(generateHexString());
    // console.warn(generateHexString());
    // setShapeArr(shapeArr.concat([generateHexString()]));
    let arr = [];
    for (let i = 0; i < 15; i++) {
      // console.log(generateHexString());
      arr.push(generateHexString());
    }
    setShapeArr(arr);
    // console.warn(shapeArr);
  };

  const showToast = msg => {
    // ToastAndroid.show('Color Copied To Clipboard!', ToastAndroid.SHORT);
    ToastAndroid.show(`Color: ${msg} - copied!`, ToastAndroid.SHORT);
  };

  const hanldeCopyToClipboard = value => {
    Clipboard.setString(value);
    // console.warn(value);
    // Alert.alert(`Color: ${copyColor} has been copied`);
    showToast(value);
  };
  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: randomBackground,
        minHeight: '100%',
      }}>
      <StatusBar backgroundColor={randomBackground} />
      <ScrollView>
        <Text style={styles.title}>Background-Changer</Text>

        <View style={styles.container}>
          {/* Shapes */}
          <View style={styles.shapeContainer}>
            {shapeArr.length > 0 &&
              shapeArr.map(item => {
                return (
                  <TouchableOpacity
                    style={[styles.shapes, {backgroundColor: item}]}
                    key={item}
                    onPress={() => hanldeCopyToClipboard(item)}>
                    <Text style={styles.actionText}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
          {/* Btn */}
          <TouchableOpacity
            style={[styles.btn, styles.elevated]}
            onPress={handlePress}>
            <Text style={styles.heading}>Press me</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 9,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  shapeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 11,
    flexWrap: 'wrap',
  },
  actionText: {textAlign: 'center', color: 'white', fontWeight: '700'},
  shapes: {
    height: 150,
    width: 127,
    borderRadius: 7,
    justifyContent: 'flex-end',
    paddingBottom: 8,
    elevation: 5,
  },
  btn: {
    backgroundColor: 'navy',
    padding: 20,
    borderRadius: 7,
  },
  elevated: {elevation: 5},
  title: {
    fontWeight: 'bold',
    fontSize: 27,
    paddingVertical: 11,
    textAlign: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
});
