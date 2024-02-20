import React from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from './theme/ThemeContext'; 

const App = () => {
  const queryClient = new QueryClient();
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider> 
          <QueryClientProvider client={queryClient}>
            <AppNavigator />
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
