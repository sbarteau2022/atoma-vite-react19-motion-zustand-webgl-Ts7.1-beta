import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteChrome } from './components/SiteChrome'
import { GovernorProvider } from './governor'
import { LabShell } from './lab/LabShell'
import { About } from './pages/About'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { Console } from './pages/Console'
import { Home } from './pages/Home'
import { AllTogether } from './pages/AllTogether'
import { ChatMiddle } from './pages/ChatMiddle'
import { Privacy, Terms } from './pages/Legal'
import { NotFound } from './pages/NotFound'
import { Updates } from './pages/Updates'
import { Waitlist } from './pages/Waitlist'

export default function App() {
  return (
    <GovernorProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SiteChrome />}>
            <Route index element={<Home />} />
            <Route path="all" element={<AllTogether />} />
            <Route path="chat-middle" element={<ChatMiddle />} />
            <Route path="about" element={<About />} />
            <Route path="updates" element={<Updates />} />
            <Route path="changelog" element={<Navigate to="/updates" replace />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="waitlist" element={<Waitlist />} />
            <Route path="contact" element={<Navigate to="/waitlist" replace />} />
            <Route path="app" element={<LabShell />} />
            <Route path="console" element={<Console />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GovernorProvider>
  )
}
