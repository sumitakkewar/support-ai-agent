import { useState } from 'react'
const baseURL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')

  const handleSend = async () => {
    const res = await fetch(`${baseURL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    })
    const data = await res.json()
    setResponse(data.reply)
  }

  return (
    <div>
      <h1>AI Support Chat Application</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
      <p>AI: {response}</p>
    </div>
  )
}

export default App
