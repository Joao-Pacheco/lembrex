import Home from './view/home/home';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView>
      <Home />
    </GestureHandlerRootView>
  );
}
