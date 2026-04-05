import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { PRODUCTS } from '../../../data/products';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen options={{ title: 'Помилка' }} />
        <Text style={styles.errorText}>Товар не знайдено</Text>
        <Button title="Повернутися до каталогу" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Stack.Screen options={{ title: product.title }} />

      <Image 
        source={{ uri: product.imageUrl }} 
        style={styles.image} 
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>{product.price} ₴</Text>
        </View>

        <View style={styles.badgeContainer}>
          <Text style={styles.categoryBadge}>{product.category}</Text>
          <Text style={[styles.stockBadge, product.inStock ? styles.inStock : styles.outOfStock]}>
            {product.inStock ? 'В наявності' : 'Немає в наявності'}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Опис товару</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        <View style={styles.footer}>
          <Button 
            title={product.inStock ? "Додати в кошик" : "Повідомити про появу"} 
            disabled={!product.inStock}
            onPress={() => alert('Додано в кошик!')} 
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 350,
  },
  content: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: '#007AFF',
  },
  badgeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 10,
  },
  categoryBadge: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 14,
    color: '#333',
    overflow: 'hidden',
  },
  stockBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 14,
    fontWeight: '600',
    overflow: 'hidden',
  },
  inStock: {
    backgroundColor: '#E5F8ED',
    color: '#34C759',
  },
  outOfStock: {
    backgroundColor: '#FFEBEE',
    color: '#FF3B30',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4C4C4E',
    marginBottom: 30,
  },
  footer: {
    marginTop: 10,
    paddingBottom: 30,
  }
});