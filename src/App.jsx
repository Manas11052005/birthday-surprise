import { Routes, Route, Navigate } from 'react-router-dom'
import CreatorPage from './pages/CreatorPage.jsx'
import SharePage from './pages/SharePage.jsx'
import BirthdayPage from './pages/BirthdayPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CreatorPage />} />
      <Route path="/create" element={<CreatorPage />} />
      <Route path="/share/:id" element={<SharePage />} />
      <Route path="/birthday/:id" element={<BirthdayPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
