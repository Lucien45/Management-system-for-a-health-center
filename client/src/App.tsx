import { useState } from 'react'
import { ToastContainer } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import AuthRoute from './routes/AuthRoute';
import AppRoute from './routes/AppRoute';

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <BrowserRouter>
      {loading && <LoadingSpinner/>}
      <ToastContainer position='top-center'/>
      <Routes>
        <Route path='/*' element={<AuthRoute setLoading={setLoading}/>}/>
        <Route path='/admin/*' element={<AppRoute setLoading={setLoading}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
