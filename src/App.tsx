import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RootLayout from './components/layout/RootLayout'
import { adminRoutes } from './routes/admin.routes'
import { authRoutes } from './routes/auth.routes'
import { RequireAuth } from './components/auth/RequireAuth'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Rotas de Autenticação */}
            {authRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}

            {/* Rotas Admin (Protegidas) */}
            <Route path="/admin/*" element={
              <RequireAuth allowedTypes={['ADMIN']}>
                <Routes>
                  {adminRoutes[0].children?.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    >
                      {route.children?.map((childRoute) => (
                        <Route
                          key={childRoute.path}
                          path={childRoute.path}
                          element={childRoute.element}
                        />
                      ))}
                    </Route>
                  ))}
                </Routes>
              </RequireAuth>
            } />
          </Routes>
        </RootLayout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App