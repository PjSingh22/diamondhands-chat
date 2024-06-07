"use client";
import React, { useState, useEffect} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from './input'

export default function ChatInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [text, setText] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const commands = ['/mute', '/ban', '/title', '/description'];

  useEffect(() => {
    const fetchUsers = async (query:string) => {
      const response = await fetch(`https://665621609f970b3b36c4625e.mockapi.io/users?page=1&limit=3&search=${query}`);
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    };

    const atIndex = text.indexOf('@');
    if (atIndex !== -1) {
      const query = text.slice(atIndex + 1);
      fetchUsers(query);
    } else {
      setUsers([]);
    }
  }, [text]);

  const usersElement = () => {
    return (
      <div className="user-toolbar toolbar">
        {users.map((user) => (
          <div
            key={user.id}
            className="user"
            onClick={() => {
              setText(text.replace(/@\w*$/, `@${user.username} `));
              if (users.length === 1) setUsers([]);
            }
          }
          >
            {user.username}
          </div>
        ))}
      </div>
    );
  }

  const commandsElement = () => {
    if (commands.includes(text.split(' ')[0].toLowerCase())) {
      return null;
    }
    return (
      <div className="command-toolbar toolbar">
        {commands.map((command) => (
          <div
            key={command}
            className="command"
            onClick={() => {
              setText(command + ' ')
              // close command toolbar
            }
          }
          >
            {command}
          </div>
        ))}
      </div>
    );
  }

  const commandToolbar = () => {
    if (text.startsWith("@")) return usersElement();

    if (text.startsWith('/') && !text.includes('@') ) return commandsElement();

    if (text.includes('@') && users.length > 0) return usersElement();

    return null;
  };

  return (
    <div>
      {commandToolbar()}
      <Input type='text' id='chat-input' className='chat-input' placeholder={"Enter Text Here..."} value={text} onChange={e => setText(e.target.value)} />
    </div>
  )
}
