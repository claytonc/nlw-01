import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Image, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import PickerSelect from 'react-native-picker-select';
import ServiceIBGEAPI from '../../services/ibge-services'

interface Picker {
    label: string;
    value: string;
}

interface UFResponse {
  sigla: string;
}

const Home: React.FC = () => {

  const navigation = useNavigation();
  const [ufs, setUFs] = useState<Picker[]>([]);
  const [cities, setCities] = useState<Picker[]>([]);
  const [selectedUF, setSelectedUF] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    ServiceIBGEAPI.searchUF().then((res) => {
      res.sort();
      const array: Picker[] = res.map((uf: UFResponse) => ({ label: uf.sigla, value: uf.sigla }));
      setUFs(array);
    });
  }, []);

  useEffect(() => {
    ServiceIBGEAPI.searchCityUF(selectedUF).then((res) => {
      const array: Picker[] = res.map(city => ({ label: city.nome, value: city.nome }));
      setCities(array);
    });
  }, [selectedUF]);


  function handleNavigateToPoints() {
      navigation.navigate('Points', {
        uf: selectedUF,
        city: selectedCity,
      });
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1}} behavior={Platform.OS === 'ios' ? 'padding': undefined}>
      <ImageBackground
          source={require('../../assets/home-background.png')}
          style={styles.container}
          imageStyle={{width: 274, height: 368}}
          >

          <View style={styles.main}>
              <Image source={require('../../assets/logo.png')} />
              <View>
                <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
              </View>
          </View>

          <View style={styles.footer}>
              <PickerSelect
                items={ufs}
                value={selectedUF}
                onValueChange={(value) => setSelectedUF(value)}
                placeholder={{ label: "Escolha um estado", value: null }}
              />

              <PickerSelect
                disabled={selectedUF === ''}
                items={cities}
                value={selectedCity}
                onValueChange={(value) => setSelectedCity(value)}
                placeholder={{ label: selectedUF === '' ? "Escolha um estado" : "Escolha uma cidade", value: null }}
              />

            <RectButton style={styles.button} onPress={ handleNavigateToPoints }>
                <View style={styles.buttonIcon}>
                    <Text>
                        <Icon name="arrow-right" color="#FFF" size={24} />
                    </Text>
                </View>
                <Text style={styles.buttonText}>
                    Entrar
                </Text>
            </RectButton>
          </View>

      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },

    main: {
      flex: 1,
      justifyContent: 'center',
    },

    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },

    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },

    footer: {},

    select: {},

    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },

    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },

    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },

    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home;
