import { RouteObject } from 'react-router-dom'
import { ListCategories } from '@/pages/admin/categories/ListCategories'
import { CategoryForm } from '@/pages/admin/categories/CategoryForm'

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    children: [
      {
        path: 'categories',
        children: [
          {
            path: '',
            element: <ListCategories />
          },
          {
            path: 'new',
            element: <CategoryForm />
          },
          {
            path: 'edit/:id',
            element: <CategoryForm />
          }
        ]
      }
    ]
  }
]
