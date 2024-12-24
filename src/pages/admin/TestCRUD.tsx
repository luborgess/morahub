import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CategoryService } from '@/services/CategoryService'
import { UserService } from '@/services/UserService'
import { ListingService } from '@/services/ListingService'
import { CategoryModel } from '@/models/Category'
import { UserModel } from '@/models/User'
import { ListingModel } from '@/models/Listing'

export function TestCRUD() {
  // Estados para Category
  const [categories, setCategories] = useState<CategoryModel[]>([])
  const [newCategory, setNewCategory] = useState({ name: '', icon: '' })
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel | null>(null)

  // Estados para User
  const [users, setUsers] = useState<UserModel[]>([])
  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    type: 'USER',
    commercial_name: '',
    bio: ''
  })
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null)

  // Estados para Listing
  const [listings, setListings] = useState<ListingModel[]>([])
  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    price: 0,
    type: 'SALE',
    category_id: '',
    user_id: ''
  })
  const [selectedListing, setSelectedListing] = useState<ListingModel | null>(null)

  // Estado para mensagens
  const [message, setMessage] = useState({ type: '', text: '' })

  // Carrega dados iniciais
  useEffect(() => {
    loadAll()
  }, [])

  const loadAll = async () => {
    try {
      const [categoriesData, usersData, listingsData] = await Promise.all([
        CategoryService.findAll(),
        UserService.findAll(),
        ListingService.findAll()
      ])
      setCategories(categoriesData)
      setUsers(usersData)
      setListings(listingsData)
    } catch (error) {
      showMessage('error', 'Erro ao carregar dados')
    }
  }

  // Funções auxiliares
  const showMessage = (type: string, text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  // CRUD Categorias
  const handleCreateCategory = async () => {
    try {
      await CategoryService.create(newCategory)
      showMessage('success', 'Categoria criada com sucesso')
      loadAll()
      setNewCategory({ name: '', icon: '' })
    } catch (error) {
      showMessage('error', 'Erro ao criar categoria')
    }
  }

  const handleUpdateCategory = async () => {
    if (!selectedCategory) return
    try {
      await CategoryService.update(selectedCategory.id, newCategory)
      showMessage('success', 'Categoria atualizada com sucesso')
      loadAll()
      setSelectedCategory(null)
      setNewCategory({ name: '', icon: '' })
    } catch (error) {
      showMessage('error', 'Erro ao atualizar categoria')
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      await CategoryService.delete(id)
      showMessage('success', 'Categoria deletada com sucesso')
      loadAll()
    } catch (error) {
      showMessage('error', 'Erro ao deletar categoria')
    }
  }

  // CRUD Usuários
  const handleCreateUser = async () => {
    try {
      await UserService.create(newUser)
      showMessage('success', 'Usuário criado com sucesso')
      loadAll()
      setNewUser({ email: '', name: '', type: 'USER', commercial_name: '', bio: '' })
    } catch (error) {
      showMessage('error', 'Erro ao criar usuário')
    }
  }

  const handleUpdateUser = async () => {
    if (!selectedUser) return
    try {
      await UserService.update(selectedUser.id, newUser)
      showMessage('success', 'Usuário atualizado com sucesso')
      loadAll()
      setSelectedUser(null)
      setNewUser({ email: '', name: '', type: 'USER', commercial_name: '', bio: '' })
    } catch (error) {
      showMessage('error', 'Erro ao atualizar usuário')
    }
  }

  const handleDeleteUser = async (id: string) => {
    try {
      await UserService.delete(id)
      showMessage('success', 'Usuário deletado com sucesso')
      loadAll()
    } catch (error) {
      showMessage('error', 'Erro ao deletar usuário')
    }
  }

  // CRUD Anúncios
  const handleCreateListing = async () => {
    try {
      await ListingService.create(newListing)
      showMessage('success', 'Anúncio criado com sucesso')
      loadAll()
      setNewListing({
        title: '',
        description: '',
        price: 0,
        type: 'SALE',
        category_id: '',
        user_id: ''
      })
    } catch (error) {
      showMessage('error', 'Erro ao criar anúncio')
    }
  }

  const handleUpdateListing = async () => {
    if (!selectedListing) return
    try {
      await ListingService.update(selectedListing.id, newListing)
      showMessage('success', 'Anúncio atualizado com sucesso')
      loadAll()
      setSelectedListing(null)
      setNewListing({
        title: '',
        description: '',
        price: 0,
        type: 'SALE',
        category_id: '',
        user_id: ''
      })
    } catch (error) {
      showMessage('error', 'Erro ao atualizar anúncio')
    }
  }

  const handleDeleteListing = async (id: string) => {
    try {
      await ListingService.delete(id)
      showMessage('success', 'Anúncio deletado com sucesso')
      loadAll()
    } catch (error) {
      showMessage('error', 'Erro ao deletar anúncio')
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      {message.text && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {/* Categorias */}
      <Card>
        <CardHeader>
          <CardTitle>Teste de Categorias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Ícone</Label>
              <Input
                value={newCategory.icon}
                onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateCategory}>Criar</Button>
              <Button onClick={handleUpdateCategory} disabled={!selectedCategory}>
                Atualizar
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Categorias Existentes:</h3>
            <div className="grid gap-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-2 border rounded">
                  <span>{category.name}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedCategory(category)
                        setNewCategory({ name: category.name, icon: category.icon })
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Deletar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usuários */}
      <Card>
        <CardHeader>
          <CardTitle>Teste de Usuários</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select
                value={newUser.type}
                onValueChange={(value) => setNewUser({ ...newUser, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">Usuário</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateUser}>Criar</Button>
              <Button onClick={handleUpdateUser} disabled={!selectedUser}>
                Atualizar
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Usuários Existentes:</h3>
            <div className="grid gap-2">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-2 border rounded">
                  <span>{user.name} ({user.email})</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedUser(user)
                        setNewUser({
                          email: user.email,
                          name: user.name,
                          type: user.type,
                          commercial_name: user.commercial_name || '',
                          bio: user.bio || ''
                        })
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Deletar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anúncios */}
      <Card>
        <CardHeader>
          <CardTitle>Teste de Anúncios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={newListing.title}
                onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Input
                value={newListing.description}
                onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Preço</Label>
              <Input
                type="number"
                value={newListing.price}
                onChange={(e) => setNewListing({ ...newListing, price: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select
                value={newListing.type}
                onValueChange={(value) => setNewListing({ ...newListing, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SALE">Venda</SelectItem>
                  <SelectItem value="RENT">Aluguel</SelectItem>
                  <SelectItem value="DONATION">Doação</SelectItem>
                  <SelectItem value="EXCHANGE">Troca</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select
                value={newListing.category_id}
                onValueChange={(value) => setNewListing({ ...newListing, category_id: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Usuário</Label>
              <Select
                value={newListing.user_id}
                onValueChange={(value) => setNewListing({ ...newListing, user_id: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateListing}>Criar</Button>
              <Button onClick={handleUpdateListing} disabled={!selectedListing}>
                Atualizar
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Anúncios Existentes:</h3>
            <div className="grid gap-2">
              {listings.map((listing) => (
                <div key={listing.id} className="flex items-center justify-between p-2 border rounded">
                  <span>{listing.title}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedListing(listing)
                        setNewListing({
                          title: listing.title,
                          description: listing.description,
                          price: listing.price,
                          type: listing.type,
                          category_id: listing.category_id,
                          user_id: listing.user_id
                        })
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteListing(listing.id)}
                    >
                      Deletar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
