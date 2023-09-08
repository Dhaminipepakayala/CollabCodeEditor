import React from 'react'
import { useState } from 'react'
import {v4} from 'uuid'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const formStyle = {
  width:'40%',
  textAlign:"center",
  margin:"auto",
  background:"white",
  marginTop:"12%",
  padding:"2% 2% 2% 2%",
  borderRadius:'20px',
  boxShadow:'1px  2.5px 10px black'
}
const inp = {
  width:'80%',
  height:30,
  padding:"2% 2% 2% 2%",
  margin:"2% 2% 2% 2%",
  borderRadius:10,
  background:"rgb(242, 230, 230)",
  border:'none',
  fontSize:'18px'
}
const btn = {
  borderRadius:30,
  width:'80%',
  padding:'2% 2% 2% 2%',
  margin:'2% 2% 2% 2%',
  background:'orange',
  fontSize:'18px'

}
const btn1 = {
  border:'none',
  background:'none',
  textDecoration:'underline',
  textDecorationColor:'blue',
  color:'blue',
  fontSize:'18px',
  cursor:'pointer'
}
const Form  = () => {
  const navigate=useNavigate();
  const [rid,setRid]=useState('')
  const [uname,setUname]=useState('');
  const [open,setOpen]=useState(false);
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(uname==='' || rid===''){
      if(uname==='')
    document.getElementById('name').innerHTML="Enter your name"
    if(rid==='')
    document.getElementById('invi').innerHTML="Paste your invitation code" 
    return ;
   }
   navigate(`editor/${rid}`,{
    state:{
        uname,
    },
   });
   
   
  }
  
  const createRoom = (e) => {
      e.preventDefault();
      setRid(v4())
      toast.success("Room created Successfully..")
      setOpen(!open)
  }
  const copyCode = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(rid);
    toast.success("Invitation code copied Successfully")
  }
  return (
    <>
    <div style={formStyle}> 
    <ToastContainer />
    <form>
      <h2>Paste your invitation code down below</h2>
      <input style={inp} type="text" name='id'  defaultValue={rid} placeholder="Enter Room id" 
      onChange={(e)=>{setRid(e.target.value);
        if(rid!=='')
      document.getElementById('invi').innerHTML=""}}/><br />
      <span style={{color:'red'}} id='invi'></span>
      <input style={inp} type="text" name='uname'  placeholder="Enter Guest name"
       onChange={(e)=>{setUname(e.target.value);
        if(uname!=='')
        document.getElementById('name').innerHTML=""
       }}/><br />
      <span style={{color:'red'}} id="name"></span>
      <input style={btn} type="submit" onClick={handleSubmit} value="Join"/><br />
      <h3>Don't have an invitation code ?? Create your<br />
      <button style={btn1} onClick={createRoom}>Own Room</button></h3> 
      <span onClick={copyCode} style={{color:'blue',textDecoration:'underline',fontSize:'18px',cursor:'pointer'}}>{rid}</span>
      {open ? <button style={{
        padding:'2% 2% 2% 2%',
        background:'green',
        color:'white',
        fontSize:'18px',
        borderRadius:10,
        marginLeft:'2%',
        cursor:'pointer'
        }} onClick={copyCode}>copy code</button> : ''}
      </form> 
      
      </div>
  
      </>
  )
}

export default Form 