import { RouteObject } from 'react-router-dom'
import { ListingsList } from '@/pages/listings/ListingsList'
import { ListingForm } from '@/pages/listings/ListingForm'
import { ListingDetails } from '@/pages/listings/ListingDetails'
import { RequireAuth } from '@/components/auth/RequireAuth'

export const listingsRoutes: RouteObject[] = [
  {
    path: '/listings',
    children: [
      {
        path: '',
        element: <ListingsList />
      },
      {
        path: 'new',
        element: (
          <RequireAuth>
            <ListingForm />
          </RequireAuth>
        )
      },
      {
        path: 'edit/:id',
        element: (
          <RequireAuth>
            <ListingForm />
          </RequireAuth>
        )
      },
      {
        path: ':id',
        element: <ListingDetails />
      }
    ]
  }
]
