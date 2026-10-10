import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  const [novoItem, setNovoItem] = useState('');
  const [itens, setItens] = useState([]);
  const proximoId = useRef(1);

  function adicionarItem() {
    const nome = novoItem.trim();
    if (!nome) return;
    const item = { id: String(proximoId.current++), nome };
    // Cria um novo array, sem modificar o estado e sem usar .push().
    setItens((listaAtual) => [...listaAtual, item]);
    setNovoItem('');
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7F5" />
      <View style={styles.header}>
        <Text style={styles.eyebrow}>MINHAS COMPRAS</Text>
        <Text style={styles.title}>Lista de compras</Text>
        <Text style={styles.subtitle}>Tudo o que você precisa, em um só lugar.</Text>
      </View>
      <Text style={styles.label}>Novo item</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Ex.: Arroz" placeholderTextColor="#79877F" value={novoItem} onChangeText={setNovoItem} onSubmitEditing={adicionarItem} returnKeyType="done" accessibilityLabel="Novo item da lista de compras" />
        <Pressable onPress={adicionarItem} disabled={!novoItem.trim()} accessibilityRole="button" style={({ pressed }) => [styles.button, !novoItem.trim() && styles.disabled, pressed && styles.pressed]}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </Pressable>
      </View>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Sua lista</Text>
        <Text style={styles.count}>{itens.length} {itens.length === 1 ? 'item' : 'itens'}</Text>
      </View>
      <FlatList data={itens} keyExtractor={(item) => item.id} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.list} renderItem={({ item, index }) => (
        <View style={styles.item}>
          <View style={styles.number}><Text style={styles.numberText}>{index + 1}</Text></View>
          <Text style={styles.itemText}>{item.nome}</Text>
        </View>
      )} ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Sua lista está vazia</Text>
          <Text style={styles.emptyText}>Digite um item acima e toque em Adicionar.</Text>
        </View>
      } />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F5', paddingHorizontal: 24, paddingTop: 64 },
  header: { marginBottom: 32 },
  eyebrow: { color: '#287451', fontSize: 12, fontWeight: '700', letterSpacing: 2, marginBottom: 12 },
  title: { color: '#173B2B', fontSize: 30, fontWeight: '800', marginBottom: 10 },
  subtitle: { color: '#687B70', fontSize: 15, lineHeight: 22 },
  label: { color: '#173B2B', fontSize: 14, fontWeight: '600', marginBottom: 10 },
  form: { flexDirection: 'row', gap: 10, marginBottom: 32 },
  input: { flex: 1, minWidth: 0, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#D7E3DC', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 15, fontSize: 16, color: '#173B2B' },
  button: { backgroundColor: '#287451', paddingHorizontal: 16, justifyContent: 'center', borderRadius: 12 },
  buttonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  disabled: { opacity: 0.55 }, pressed: { opacity: 0.8 },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  listTitle: { color: '#173B2B', fontSize: 20, fontWeight: '700' },
  count: { color: '#287451', backgroundColor: '#E3EEE7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, fontSize: 13, fontWeight: '600' },
  list: { paddingBottom: 32 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: '#E2EAE5' },
  number: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#E3EEE7', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  numberText: { color: '#287451', fontWeight: '700' },
  itemText: { flex: 1, color: '#173B2B', fontSize: 17 },
  empty: { paddingVertical: 44, paddingHorizontal: 20, borderWidth: 1, borderStyle: 'dashed', borderColor: '#C8D9CF', borderRadius: 16, alignItems: 'center' },
  emptyTitle: { color: '#173B2B', fontSize: 18, fontWeight: '600', marginBottom: 10 },
  emptyText: { color: '#687B70', fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
