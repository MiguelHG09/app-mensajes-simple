import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Stack } from 'expo-router';

export default function App() {
  const [mensaje, setMensaje] = useState('');
  const [estado, setEstado] = useState('Listo para enviar a Marai');

  const enviarMensaje = async () => {
    if (mensaje.trim() === '') return;
    setEstado('Enviando...');
    Keyboard.dismiss();

    try {
      const response = await fetch('https://api.marai.app/enviar-mensaje', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: mensaje }),
      });

      const data = await response.json();
      if (data.status === 'éxito') {
        setEstado('✅ ¡Mensaje entregado al servidor!');
        setMensaje('');
      } else {
        setEstado('❌ Error en respuesta del servidor.');
      }
    } catch (error) {
      setEstado('❌ Error de conexión. Revisa el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Esto configura el título en la barra superior de tu nueva estructura */}
      <Stack.Screen options={{ title: 'MMessenger de prueba' }} />
      
      <Text style={styles.titulo}>Testeo de App</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Escribe un mensaje para el servidor:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Hola Raspberry Pi..."
          value={mensaje}
          onChangeText={setMensaje}
          multiline={true}
        />
        <TouchableOpacity style={styles.boton} onPress={enviarMensaje}>
          <Text style={styles.textoBoton}>Enviar Mensaje</Text>
        </TouchableOpacity>
        <Text style={styles.estado}>{estado}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#333' },
  card: { width: '100%', backgroundColor: 'white', padding: 20, borderRadius: 15, elevation: 5 },
  label: { fontSize: 16, color: '#666', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 15, fontSize: 16, minHeight: 100, textAlignVertical: 'top', marginBottom: 20, backgroundColor: '#fafafa' },
  boton: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center' },
  textoBoton: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  estado: { marginTop: 20, textAlign: 'center', fontSize: 14, color: '#555', fontStyle: 'italic' }
});