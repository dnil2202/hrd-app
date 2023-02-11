import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import LoginPages from './Pages/LoginPages';
import DashboardPages from './Pages/DashboardPages';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPages/>}/>
        <Route path='/dashboard' element={<DashboardPages/>}/>
      </Routes>
    </div>
  );
}

export default App;
