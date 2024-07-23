import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';

const QRScreen = ({navigation, route}) => {
  const bmiData = route.params.bmiData;
  const [qrImage, setQRImage] = useState();
  const qrRef = useRef();
  useEffect(() => {
    console.log(bmiData);
    qrRef.current.toDataURL(data => {
      setQRImage('data:image/png;base64,' + data);
    });
  }, [qrRef]);
  const shareQR = async () => {
    const options = {
      title: 'BMI QR Code',
      url: qrImage,
    };
    try {
      await Share.open(options);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}>
      <QRCode value={bmiData} getRef={qrRef} size={350} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={shareQR}>
          <Text style={styles.buttonText}>Share QR</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    margin: 30,
  },
  button: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default QRScreen;
