import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({navigation}) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [optimalWeight, setOptimalWeight] = useState();
  const [fitness, setFitness] = useState('');

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = Number(height) / 100;
      const weightInKg = Number(weight);
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      const weightRange = [
        (18.5 * heightInMeters * heightInMeters).toFixed(1),
        (25 * heightInMeters * heightInMeters).toFixed(1),
      ];
      /***************************************************** Determine the Fitness Category here ****************************************************************/
      const catogery = 'Normal';
      /**********************************************************************************************************************************************************/
      setBMI(parseFloat(bmiValue.toFixed(2)));
      setFitness(catogery);
      setOptimalWeight(weightRange);
    } else {
      Alert.alert('Error', 'Please enter both height and weight.');
    }
  };

  const handleGenerateQR = () => {
    if (height && weight && bmi) {
      const data = `Your BMI Data\n Height: ${height}\n Weight: ${weight}\n Body Mass Index(BMI): ${bmi}\n Fitness: ${fitness}\n Healthy weight for the height: ${optimalWeight[0]}kg - ${optimalWeight[1]}kg`;
      navigation.navigate('QRCode', {bmiData: data});
    } else {
      Alert.alert('Error', 'Please calculate BMI first.');
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter height (cm)"
          placeholderTextColor="#a0a0a0"
          keyboardType="numeric"
          value={height}
          onChangeText={text => {
            setHeight(text);
            setBMI(null);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter weight (kg)"
          placeholderTextColor="#a0a0a0"
          keyboardType="numeric"
          value={weight}
          onChangeText={text => {
            setWeight(text);
            setBMI(null);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGenerateQR}>
          <Text style={styles.buttonText}>Generate QR</Text>
        </TouchableOpacity>
      </View>
      {bmi !== null && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultText}>Height: {height} cm</Text>
          <Text style={styles.resultText}>Weight: {weight} kg</Text>
          <Text style={styles.resultText}>
            Healthy Weight: {optimalWeight[0]} kg - {optimalWeight[1]} kg
          </Text>
          <Text style={styles.bmiText}>BMI: {bmi}</Text>
          <Text style={styles.bmiText}>Fitness: {fitness}</Text>
        </View>
      )}
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
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
  resultsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
  },
  resultText: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
  },
  bmiText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#feca57',
    marginTop: 10,
  },
});

export default HomeScreen;
