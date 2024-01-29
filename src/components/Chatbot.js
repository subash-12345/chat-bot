import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import { analyze } from './Utils';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      user:false,
      message: "hi, may I have your name",
    },
  ]);
  const [text, setText] = useState("");

  const onSend = () => {
    let list;

    if (messages.length > 2) {
      const reply = analyze(text); // Call the analyze function with the 'text' parameter
      list = [...messages, {user:true, message: text },{user:false,message:reply}];
    } else {
      list = [
        ...messages,
        {
          user:true,message: `hi, ${text}`
        },
        {
         user:false, message: "How can I help you?"
        },
      ];
    }

    setMessages(list);
    setText("");

    setTimeout(() => {
      document.querySelector('#copyright').scrollIntoView();
    }, 1);
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        <img
          src="https://img.freepik.com/free-vector/chatbot-conversation-vectorart_78370-4107.jpg?w=740&t=st=1706429097~exp=1706429697~hmac=d0454c1f4cff64194b0e9aff3927af147dcca252b26aa99ddd5d53f326fc177a"
          alt="logo"
          height={200}
          width={200}
        />

        <h2 className='text-primary'>Chatbot</h2>
      </div>
      <div className='chat-message'>
        {messages.length > 0 && messages.map((data, index) => ( <div key={index} className='data'><ChatMessage {...data} /></div>))}

        <div className='d-flex mt-2'>
          <input type='search' className='form-control' value={text} onChange={(e) => setText(e.target.value)} />

          <Button type="button" className="btn btn-primary ms-3" onClick={onSend}>Send</Button>
        </div>
        <div className='cpy' id='copyright' className='ms-5 mt-3' onClick={onSend}>copyright reserved Tamil skillhub</div>
      </div>
    </div>
  );
}