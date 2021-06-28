import './App.css';
import Todos from './components/Todos'
import Navbar from './components/Navbar'


function App() {
  return (
          <div className="container">
             <Navbar/>

               <Todos/>
          </div>
  );
}

export default App;
