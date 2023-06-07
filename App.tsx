import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, QuerySnapshot, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCTvP5aEQA5TVFnuQOdk8t66J51D7oF6W8",
  authDomain: "projeto-iot-f41b2.firebaseapp.com",
  projectId: "projeto-iot-f41b2",
  storageBucket: "projeto-iot-f41b2.appspot.com",
  messagingSenderId: "406835368645",
  appId: "1:406835368645:web:ecacad274a0bb0982cd6ac",
  measurementId: "G-G6YWJQCJTP"
}

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [deviceLocation, setDeviceLocation] = useState('');
  const [deviceTemperature, setDeviceTemperature] = useState('');
  const [deviceList, setDeviceList] = useState<{ id: string; name: string; type: string; location: string; temperature: string; status: boolean; }[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const querySnapshot: QuerySnapshot = await collection(db, 'devices').get();
        const devices: { id: string; name: string; type: string; location: string; temperature: string; status: boolean; }[] = [];
        querySnapshot.forEach((doc) => {
          devices.push({ id: doc.id, ...doc.data() });
        });
        setDeviceList(devices);
      } catch (error) {
        console.error('Erro ao buscar dispositivos:', error);
      }
    };

    const unsubscribe = onSnapshot(collection(db, 'devices'), (snapshot) => {
      const devices = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDeviceList(devices);
    });

    fetchDevices();

    return () => unsubscribe();
  }, []);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };
  
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuário logado com sucesso!');
      setLoggedIn(true);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  // ADICIONA UM DISPOSITIVO
  const handleAddDevice = async () => {
    console.log('Nome do dispositivo:', deviceName);
    console.log('Tipo do dispositivo:', deviceType);
    console.log('Localização do dispositivo:', deviceLocation);
    console.log('Temperatura do dispositivo:', deviceTemperature);

    if (!deviceName || !deviceType || !deviceLocation || !deviceTemperature) {
      console.error('Por favor, preencha todos os campos do dispositivo');
      return;
    }

    const newDevice = {
      name: deviceName,
      type: deviceType,
      location: deviceLocation,
      temperature: deviceTemperature,
      status: true, // Dispositivo é ativado por padrão
    };

    try {
      await addDoc(collection(db, 'devices'), newDevice);
      console.log('Dispositivo adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar dispositivo:', error);
    }

    setDeviceName('');
    setDeviceType('');
    setDeviceLocation('');
    setDeviceTemperature('');
  };

  // ATUALIZA O STATUS DO DISPOSITIVO
  const handleToggleStatus = async (deviceId: string, currentStatus: boolean) => {
    try {
      const deviceRef = doc(db, 'devices', deviceId);
      await updateDoc(deviceRef, { status: !currentStatus });
      console.log('Status do dispositivo atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o status do dispositivo:', error);
    }
  };

  // DELETE O DISPOSITIVO 
  const handleDeleteDevice = async (deviceId: string) => {
    try {
      await deleteDoc(doc(db, 'devices', deviceId));
      console.log('Dispositivo excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir dispositivo:', error);
    }
  };

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  if (loggedIn) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setLoggedIn(false)} style={styles.logoutButton} testID='logout-button'>
              <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Nome do dispositivo"
            value={deviceName}
            onChangeText={(text) => setDeviceName(text)}
            testID='device-name'
          />
          <TextInput
            style={styles.input}
            placeholder="Tipo do dispositivo"
            secureTextEntry={false}
            value={deviceType}
            onChangeText={(text) => setDeviceType(text)}
            testID='device-type'

          />
          <TextInput
            style={styles.input}
            placeholder="Localização do dispositivo"
            value={deviceLocation}
            onChangeText={(text) => setDeviceLocation(text)}
            testID='device-loc'

          />
          <TextInput
            style={styles.input}
            placeholder="Temperatura do dispositivo"
            value={deviceTemperature}
            onChangeText={(text) => setDeviceTemperature(text)}
            testID='device-temp'

          />
          <Button title="Adicionar dispositivo" onPress={handleAddDevice} testID='device-btn'/>

          <FlatList
            data={deviceList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.deviceItem}>
                <Text>{item.name}</Text>
                <Text>{item.type}</Text>
                <Text>{item.location}</Text>
                <Text>{item.temperature}</Text>
                <Text>Status: {item.status ? 'Ativado' : 'Desativado'}</Text>
                <Button
                  title={item.status ? 'Desativar' : 'Ativar'}
                  onPress={() => handleToggleStatus(item.id, item.status)}
                />
                <Button testID='delete-device-btn'
                  title="Excluir"
                  onPress={() => {
                    Alert.alert(
                      'Confirmação',
                      'Tem certeza que deseja excluir este dispositivo?',
                      [
                        {
                          text: 'Cancelar',
                          style: 'cancel',
                        },
                        {
                          text: 'Excluir',
                          style: 'destructive',
                          onPress: () => handleDeleteDevice(item.id),
                          
                        },
                      ]
                      
                    );
                  }}
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          testID='email-input'
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          testID='password-input'
        />
        <Button title="Cadastrar" onPress={handleSignUp} testID='sign-up-button' />
        <Button title="Login" onPress={handleSignIn} testID='sign-in-button'/>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  deviceItem: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  deviceInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  deviceStatus: {
    fontSize: 14,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#2196f3',
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  toggleButton: {
    backgroundColor: '#f9a825',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#e53935',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  backButton: {
    marginBottom: 10,
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonIcon: {
    marginRight: 5,
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default App;
