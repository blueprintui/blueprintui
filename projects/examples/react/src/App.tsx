import { useState } from 'react'

function App() {
  const [showAlert, setShowAlert] = useState(true)

  return (
<div bp-layout="block gap:md">
  <bp-button onClick={() => setShowAlert(!showAlert)}>hello there</bp-button>

  <bp-alert-group status="success" hidden={!showAlert}>
    <bp-alert closable onclose={() => setShowAlert(false)}>General Kenobi...</bp-alert>
  </bp-alert-group>
</div>
  )
}

export default App
