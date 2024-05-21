import { BrowserRouter, HashRouter } from 'react-router-dom'
import AppRouter from '@/components/Router'
import './styles/index.less'
function App() {
  return (
    <AppRouter />
    // <BrowserRouter style={{ height: "100%", width: "100%" }}>
    // <AppRouter />
    // </BrowserRouter>
  );
}

export default App;
