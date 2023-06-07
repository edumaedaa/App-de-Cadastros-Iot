import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from './App';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, QuerySnapshot, addDoc, onSnapshot, doc, updateDoc, deleteDoc, Firestore } from 'firebase/firestore';
import { Alert } from 'react-native';

  // ================== CONFIGURAÇÃO DO MOCK ==================
  jest.mock('firebase/auth', () => {
    const originalModule = jest.requireActual('firebase/auth');
    const mockedModule = {
      ...originalModule,
      getAuth: jest.fn(() => mockedModule),
      createUserWithEmailAndPassword: jest.fn(),
      signInWithEmailAndPassword: jest.fn(),
    };

    return {
      __esModule: true,
      ...mockedModule,
    };
  });

  // ================== TESTE PARA VÊ SE TÁ RENDERIZANDO NORMAL O APP ==================
  test('renders', async () => {
    render(<App />);
  
  });
  
  // ================== LOGIN DE USUARIO CORRETO ==================
  test('handles sign-in', async () => {
    const { getByTestId } = render(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const signInButton = getByTestId('sign-in-button');

    fireEvent.changeText(emailInput, 'example@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'example@example.com',
        'password'
      );
    });
  });

  // ================== LOGIN DE USUARIO DE FORMA INCORRETA SENHA COM MENOS DE 6 DÍGITOS ==================
  test('handles sign-in', async () => {
    const { getByTestId } = render(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const signInButton = getByTestId('sign-in-button');
    
    fireEvent.changeText(emailInput, 'example@example.com');
    fireEvent.changeText(passwordInput, '123');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'example@example.com',
        '123'
      );
    });
  });

  // ================== CADASTRO DE USUARIO ==================
  test('handles sign-up', async () => {
    const createUserWithEmailAndPasswordMock = jest.spyOn(getAuth(), 'createUserWithEmailAndPassword');
    createUserWithEmailAndPasswordMock.mockResolvedValueOnce({});

    const { getByTestId } = render(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const signUpButton = getByTestId('sign-up-button');

    fireEvent.changeText(emailInput, 'example@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(signUpButton);

    await waitFor(() => {

      expect(createUserWithEmailAndPasswordMock).toHaveBeenCalledWith(
        expect.anything(),
        'example@example.com',
        'password'
      );
    });

  });


  // ================== TESTE PARA ADICIONAR DISPOSITIVOS ==================
  // AQUI ELE ADICIONA OS DISPOSITIVOS CORRETAMENTE PORÉM ELE FALA QUE FALHOU MESMO TENDO DADO CERTO
  // VAI ENTENDER KSKSKKS
 
  test('handles add device', async () => {
   
    const originalAddDoc = Firestore.prototype.addDoc;
    Firestore.prototype.addDoc = jest.fn();

    const { getByTestId } = render(<App />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const signInButton = getByTestId('sign-in-button');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(signInButton);

    await waitFor(() => expect(getByTestId('logout-button')).toBeTruthy());

    const deviceNameInput = getByTestId('device-name');
    const deviceTypeInput = getByTestId('device-type');
    const deviceLocationInput = getByTestId('device-loc');
    const deviceTemperatureInput = getByTestId('device-temp');
    const addDeviceButton = getByTestId('device-btn');

    fireEvent.changeText(deviceNameInput, 'Device 1');
    fireEvent.changeText(deviceTypeInput, 'Type 1');
    fireEvent.changeText(deviceLocationInput, 'Location 1');
    fireEvent.changeText(deviceTemperatureInput, '25');
    fireEvent.press(addDeviceButton);

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Device 1',
          type: 'Type 1',
          location: 'Location 1',
          temperature: '25',
          status: true,
        })
      );
    });

    Firestore.prototype.addDoc = originalAddDoc;
  });

  // ================== TESTE PARA DELETAR DISPOSITIVOS ==================

  test('handles device deletion', async () => {
    
    const handleDeleteDeviceMock = jest.fn();
  
    const alertMock = jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      
      if (buttons[1].text == 'Excluir') {
        buttons[1].onPress();
      }
    });
  
    // Renderiza o componente App
    const { getByTestId } = render(<App />);
  
    // Obtém os elementos de input e botão de login
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const signInButton = getByTestId('sign-in-button');
  
    // Preenche os campos de login e faz login
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(signInButton);

    await waitFor(() => expect(getByTestId('logout-button')).toBeTruthy());
      
  
    alertMock.mockRestore();
  });
  
  
  
  
  