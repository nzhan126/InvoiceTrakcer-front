import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NewInvoiceForm from './components/NewInvoiceForm'
import InvoiceList from './components/InvoiceList'

function App() {
  const [count, setCount] = useState(0)

  const [invoiceData, setInvoiceData] = useState({});



  return (
    <>
      <div>
        <NewInvoiceForm />
      </div>
      <InvoiceList />
    </>
  )
}

export default App
