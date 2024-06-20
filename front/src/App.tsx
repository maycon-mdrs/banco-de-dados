import { Route, Routes, Navigate } from 'react-router-dom';
import { PrivateRoutes } from '@/pages/privateRoutes';

import { HomePage } from '@/pages/Home/HomePage';
import { LoginPage } from '@/pages/Login/LoginPage';
import { CadastroPage } from '@/pages/Login/CadastroPage';

function App() {

  return (
    <Routes>
      {/* <Route element={<PrivateRoutes />}>
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path='/home' element={<HomePage />} />
      </Route> */}
      <Route path='/home' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/cadastro' element={<CadastroPage />} />
    </Routes>
  )
}

export default App
