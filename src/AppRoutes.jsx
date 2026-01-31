import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import AppLayout from './layouts/AppLayout'
import NotFound from './pages/NotFound'
import ProtectedLayout from './layouts/ProtectedLayout'

function AppRoutes() {
  return (
    <BrowserRouter>
		<Routes>
			{/* Public routes */}
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />

			{/* Protected routes */}
			<Route element={<ProtectedLayout />}>
				<Route element={<AppLayout />}>
					<Route path="/chat/:userId" element={<Chat />} />
					<Route path="/profile" element={<Profile />} />
				</Route>
			</Route>

			<Route path='*' element={<NotFound />} />
		</Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
