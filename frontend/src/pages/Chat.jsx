import React, {useState} from 'react'

const Chat = () => {
  const [ques,setQues] = useState("")
  const [ans,setAns] = useState("")
  const [ansColor, setAnsColor] = useState("green");

  const handleQues = async () => {
    const res = await fetch('/api/chat',{
      method:"POST",
      headers:{
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: ques
      })
    })
    const data = await res.json()
    if (data.success){
      setAnsColor("green")
      setAns(data.data)
    }
    else{
      setAnsColor("red")
      setAns(data.data)
    }
  }
  return (
    <div style={{border: '1px solid white',padding: '5px',margin: '25px'}}>
      <div style={{margin: '15px'}}>
        Enter a Question 
        <input style={{backgroundColor: 'black', border: '2px solid white',color:'white'}} onChange={(e)=>setQues(e.target.value)} type="text" name="" id="" />
      </div>
        <p style={{margin: '15px'}}>Answer: <span style={{color:ansColor}}>{ans}</span></p>
        <button onClick={()=>handleQues()} style={{margin: '15px'}}>Ask away -------{'>'}</button>
    </div>
  )
}

export default Chat