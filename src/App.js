import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './openai';
import { useEffect, useRef, useState } from 'react';

function App() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi iam chatGpt",
      isBot: true,
    }
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);
  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      { text, isBot: false }
    ])
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  }

  return (
    <div className="App">
      <div className='sidebar'>
        <div className='upperside'>
          <div className='uppersideTop'><img src={gptLogo} alt='Logo' className='logo' /><span className='brand'>ChatGPT</span></div>
          <button className='midBtn'><img src={addBtn} alt='new chat' className='addBtn' />New Chat</button>
          <div className='upperSideBottom'>
            <button className='query'><img src={msgIcon} alt='Query' />What is Programming ?</button>
            <button className='query'><img src={msgIcon} alt='Query' />How to use an API ?</button>
          </div>
        </div>
        <div className='lowerside'>
          <div className='listItems'><img src={home} alt='' className='listitemsImg' />Home</div>
          <div className='listItems'><img src={saved} alt='' className='listitemsImg' />Saved</div>
          <div className='listItems'><img src={rocket} alt='' className='listitemsImg' />Upgrade to Pro</div>
        </div>
      </div>
      <div className='main'>
        <div className='chats'>
          {/* <div className='chat'>
            <img src={userIcon} alt='' className='chatimg' /><p className='txt'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
          </div>
          <div className='chat bot'>
            <img src={gptImgLogo} alt='' className='chatimg' /><p className='txt'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
          </div> */}
          {messages.map((message, i) =>
            <div key={i} className={message.isBot ? 'chat bot' : "chat"}>
              <img src={message.isBot ? gptImgLogo : userIcon} alt='' className='chatimg' /><p className='txt'>{message.text}</p>
            </div>
          )}
          <div ref={msgEnd}></div>
        </div>
        <div className='chatFooter'>
          <div className='inp'>
            <input type='text' placeholder='Send a Message' value={input} onChange={(e) => { setInput(e.target.value) }} /><button className='send' onClick={handleSend}><img src={sendBtn} alt='Send' /></button>
          </div>
          <p>
            ChatGPT may produce inaccurate information about people. ChatGpt August 20 version.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
