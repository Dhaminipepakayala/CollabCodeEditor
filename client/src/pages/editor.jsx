import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import {javascript} from "@codemirror/lang-javascript";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Users from '../components/Users';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './style.css'



const Editor = ({ socket }) => {
  console.log(socket)
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [users,setUsers] = useState([]);
  const [code, setCode] = useState("console.log('hello world')");
  

  useEffect(() => {
    location.state && location.state.uname ? socket.emit("when a user joins", { roomId, username: location.state.uname }) : navigate("/", { replace: true })

    socket.on("updating client list", ({ userslist }) => {
      setUsers(userslist)
    })

    socket.on("on code change", ({ code }) => {
      setCode(code)
    })

    socket.on("new member joined", ({ username }) => {
      toast.success(`${username} joined`,{
        toastId: 'join1',
    })
    })

    socket.on("member left", ({ username }) => {
      toast.success(`${username} left`,{
        toastId: 'left1',
    })
    })
  }, [socket, location.state, roomId, navigate])

const  handleChange = (newValue) => {
  socket.emit("syncing the code", { socketId: socket.id, code: newValue })

  socket.emit("on code change", { roomId, code: newValue })
}
const copyRid = (roomId) => {
  try {
    navigator.clipboard.writeText(roomId);
    toast.success('Room ID copied')
  } catch (exp) {
    console.error(exp)
  }

}
const leave = (roomId) => {
  socket.emit("leave room", { roomId })
    navigate('/', { replace: true })
}
  return (
    <div style={{display:'flex',position:'relative'}}>
      <ToastContainer />
      <div style={{width:'18%',backgroundColor:'black',psition:'fxed',overflow:'hidden'}}>
        <div className="users">
      <h2 style={{color:'white'}}>Connected Users:</h2>
      {users.map((client,ind)=>{
        return(
          <Users key={ind} uname={client} />
        )
      })}
      </div>
      <div style={{position:'fixed',bottom:0,padding:'2% 2% 2% 2%'}}>
     <button className="btn1" onClick={() => copyRid(roomId)}>copy Room Id</button><br /><br />
     <button className="btn2" onClick={() => leave(roomId)}> Leave Room</button><br />
     </div>
      </div>
      <div style={{width:'82%',height:'100vh',float:'right',overflowY:'scroll' }}>
<CodeMirror  
height='100vh'
value={code}
onChange={handleChange}
  extensions={[javascript({ jsx: true })]}  />
  </div>
    </div>
  
  )
}

export default Editor