import { RouteObject } from 'react-router-dom'
import { ListCategories } from '@/pages/admin/categories/ListCategories'
import { CategoryForm } from '@/pages/admin/categories/CategoryForm'
import { TestCRUD } from '@/pages/admin/TestCRUD'

export const adminRoutes: RouteObject[] = [
  {
    path: '',
    children: [
      {
        path: 'test',
        element: <TestCRUD />
      },
      {
        path: 'categories',
        element: <ListCategories />
      },
      {
        path: 'categories/new',
        element: <CategoryForm />
      },
      {
        path: 'categories/edit/:id',
        element: <CategoryForm />
      }
    ]
  }
]
