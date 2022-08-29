
import './App.css';
import {Route,Routes} from "react-router-dom";
import Login from './components/login/login';
import Home from './components/home/home';
import Header from './components/header/header';
import Register from './components/register/register';
import AddGroup from './components/group/addGroup';
import ViewGroup from './components/group/viewGroup';


function App() {
  return (
    // <div className="App">
      
    // </div>
    <div>
       <Header></Header>
<Routes>

  <Route path="/login" element={<Login></Login>}></Route>
  <Route path="/" element={<Home></Home>}></Route>
  <Route path="/register" element={<Register></Register>}></Route>
  <Route path="/addGroup" element={<AddGroup></AddGroup>}></Route>
  <Route path="/view/:id" element={<ViewGroup></ViewGroup>}></Route>
  

 

</Routes>
      </div>
  );
}

export default App;
