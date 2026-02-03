import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import AppLayout from './layouts/AppLayout'
import NotFound from './pages/NotFound'
import ProtectedLayout from './layouts/ProtectedLayout'
import AuthLayout from './layouts/AuthLayout'

function AppRoutes() {
  return (
    <BrowserRouter>
		<Routes>
			{/* Public routes */}
			<Route element={<AuthLayout />}>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Route>

			{/* Protected routes */}
			<Route element={<ProtectedLayout />}>
				<Route element={<AppLayout />}>
					<Route path="/chat/:userId" element={<Chat />} />
					<Route path="/profile" element={<Profile />} />
				</Route>
			</Route>

			<Route path="/" element={<Navigate to="/login" replace />} />

			<Route path='*' element={<NotFound />} />
		</Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
