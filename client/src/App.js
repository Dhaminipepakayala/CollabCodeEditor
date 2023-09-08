import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Form from './pages/form';
import Editor from './pages/editor';
import { io } from "socket.io-client";


const App = () => {
const socket = io.connect("http://localhost:5000")

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Form />}></Route>
      <Route path='/editor/:roomId' element={<Editor socket={socket} />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;