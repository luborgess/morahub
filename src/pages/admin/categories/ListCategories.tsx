import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CategoryService } from '@/services/CategoryService'
import { CategoryModel } from '@/models/Category'
import { Button } from '@/components/ui/button'
import { RequireAuth } from '@/components/auth/RequireAuth'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'

export function ListCategories() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<CategoryModel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const data = await CategoryService.findAll()
      setCategories(data)
    } catch (err) {
      setError('Erro ao carregar categorias')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return

    try {
      const success = await CategoryService.delete(id)
      if (success) {
        setCategories(categories.filter(cat => cat.id !== id))
      } else {
        throw new Error('Erro ao excluir categoria')
      }
    } catch (err) {
      alert('Erro ao excluir categoria')
    }
  }

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>

  return (
    <RequireAuth allowedTypes={['ADMIN']}>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Categorias</h1>
          <Button onClick={() => navigate('/admin/categories/new')}>
            Nova Categoria
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  {category.isParentCategory() ? 'Principal' : 'Subcategoria'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => navigate(`/admin/categories/edit/${category.id}`)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </RequireAuth>
  )
}
