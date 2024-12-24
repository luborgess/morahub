import { RouteObject } from 'react-router-dom'
import { SignIn } from '@/pages/auth/SignIn'
import { SignUp } from '@/pages/auth/SignUp'

export const authRoutes: RouteObject[] = [
  {
    path: '/auth',
    children: [
      {
        path: 'signin',
        element: <SignIn />
      },
      {
        path: 'signup',
        element: <SignUp />
      }
    ]
  }
]
