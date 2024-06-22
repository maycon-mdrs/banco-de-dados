import { Route, Routes, Navigate } from 'react-router-dom';
import { PrivateRoutes } from '@/pages/privateRoutes';

import { HomePage } from '@/pages/Home/HomePage';
import { LoginPage } from '@/pages/Login/LoginPage';
import { CadastroPage } from '@/pages/Login/CadastroPage';
import { LocacaoPage } from '@/pages/Locacao/LocacaoPage';
import { MyLocacao } from '@/pages/Locacao/MyLocacao';
import { AdminPage } from '@/pages/Admin/AdminPage';
import { GrupoCarrosPage } from '@/pages/Admin/GrupoCarrosPage';
import { ReservaPage } from './pages/Admin/ReservasPage';

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
      <Route path='/locacao' element={<LocacaoPage />} />
      <Route path='/minhas_locacoes' element={<MyLocacao />} />
      <Route path='/admin/carros' element={<AdminPage />} />
      <Route path='/admin/grupo_carros' element={<GrupoCarrosPage />} />
      <Route path='/admin/reservas' element={<ReservaPage />} />
    </Routes>
  )
}

export default App
