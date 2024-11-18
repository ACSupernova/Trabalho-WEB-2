import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../Supabase';

const TelaRegistro: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false); // Adicionado para controle de carregamento
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    try {
      setLoading(true); // Inicia o carregamento
      console.log('Iniciando o registro...');

      const { user, error } = await supabase.auth.signUp({
        email,
        password: senha,
      });

      if (error) {
        console.error('Erro durante o registro:', error.message);
        Alert.alert('Erro', error.message);
      } else {
        console.log('Usuário registrado com sucesso:', user);
        Alert.alert('Sucesso', 'Usuário registrado com sucesso! Verifique seu e-mail para confirmar a conta.');
        router.push('/'); // Navega para a tela de login
      }
    } catch (err) {
      console.error('Erro desconhecido durante o registro:', err);
      Alert.alert('Erro', 'Algo deu errado durante o registro.');
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.buttonRegistrar}
        onPress={handleRegister}
        disabled={loading} // Desabilita o botão durante o carregamento
      >
        <Text style={styles.buttonText}>{loading ? 'Registrando...' : 'Registrar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonVoltar} onPress={() => router.push('/')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonRegistrar: {
    backgroundColor: '#f1b214',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonVoltar: {
    backgroundColor: '#2d2563',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TelaRegistro;
