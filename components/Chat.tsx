import React from 'react'
import { Input } from './ui/input'
import ChatInput from './ui/ChatInput'

export default function Chat() {
  return (
    <div id='chat' className='p-2'>
      <div id='chat-box' className=''>
        {/* add dummy messages */}
        <div className='chat-message'>
          <div className='chat-message-content'>
            <p className='user-name'>tommyBoy22:</p>
            <p className='user-msg'>Hey, how are you?</p>
          </div>
          <div className='chat-message-content'>
            <p className='user-name'>james:</p>
            <p className='user-msg'>LETS GOOO</p>
          </div>
          <div className='chat-message-content'>
            <p className='user-name'>ToTheMoon69:</p>
            <p className='user-msg'>Diamond handing since day 1!</p>
          </div>
          <div className='chat-message-content'>
            <p className='user-name'>DiamondApe:</p>
            <p className='user-msg'>I just bought 20,000 more shares</p>
          </div>
          <div className='chat-message-content'>
            <p className='user-name'>cantstopwontstop:</p>
            <p className='user-msg'>GAMESTOP IS GOING UP!</p>
          </div>
          {/* <div className='chat-message-content'>
            <p>tommyBoy22</p>
            <p>Hey, how are you?</p>
          </div> */}
        </div>
      </div>
      <ChatInput />
    </div>
  )
}
