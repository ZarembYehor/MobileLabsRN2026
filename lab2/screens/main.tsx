import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { news } from '../data/news';
import NewsItem from '../components/news';

export default function Main() {
  const PAGE_SIZE = 3; 
  const [refreshing, setRefresh] = useState(false);
  const [displayedNews, setDisplayedNews] = useState(news.slice(0, PAGE_SIZE));
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setDisplayedNews(news.slice(0, PAGE_SIZE)); 
      setRefresh(false);
    }, 1000);
  };

  const loadMoreData = () => {
    if (loadingMore || displayedNews.length >= news.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      const currentLength = displayedNews.length;
      const nextBatch = news.slice(currentLength, currentLength + PAGE_SIZE);
      setDisplayedNews([...displayedNews, ...nextBatch]);
      setLoadingMore(false);
    }, 1500);
  };

  const renderListFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    if (displayedNews.length >= news.length) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>До суду не звертайтесь БУДЬ ЛАСКА.</Text>
        </View>
      );
    }
    return <View style={{ height: 20 }} />;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="auto" />
      <FlatList
        data={displayedNews}
        style={{ width: '100%' }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NewsItem news={item}/>}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.title}>Новини Малого Сейнт-Джеймса</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.line}/>}
        ListFooterComponent={renderListFooter}
        contentContainerStyle={styles.listContent}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={10}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    alignItems: 'center', 
    paddingBottom: 20,
  },
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  line: {
    width: 300,
    backgroundColor: 'black',
    height: 2,
    marginVertical: 10,
  }, 
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    width: '100%',
  },
  footer: {
    alignItems: 'center',
    padding: 30,
    width: '100%',
  },
  footerText: {
    color: '#666', 
    fontSize: 14,
    fontStyle: 'italic',
  }
});