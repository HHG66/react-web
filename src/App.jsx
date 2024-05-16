import { BrowserRouter, HashRouter } from 'react-router-dom'
import AppRouter from '@/components/Router'
import './styles/index.less'
import '@/icon/index'
function App() {
  return (
    <BrowserRouter style={{ height: "100%", width: "100%" }}>
      {/* <AppRouter /> */}
      <AppRouter />
      {/* <Routes>
          <Route path='/' element={
             <Layouts/>
       </Routes> */}
    </BrowserRouter>
  );
}

export default App;
