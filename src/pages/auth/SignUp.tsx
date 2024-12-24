import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/examples/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function SignUp() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    commercial_name: '',
    celular: '',
    cpf: '',
    type: 'VISITOR',
    housing_id: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await signUp(formData)
      navigate('/')
    } catch (err) {
      setError('Erro ao criar conta. Verifique os dados e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Criar conta no MoraHub</CardTitle>
          <CardDescription>
            Preencha seus dados para criar uma nova conta
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha*</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome completo*</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="commercial_name">Nome comercial</Label>
              <Input
                id="commercial_name"
                type="text"
                value={formData.commercial_name}
                onChange={(e) => setFormData({ ...formData, commercial_name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="celular">Celular*</Label>
              <Input
                id="celular"
                type="tel"
                placeholder="(31) 99999-9999"
                value={formData.celular}
                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF*</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de usuário*</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VISITOR">Visitante</SelectItem>
                  <SelectItem value="UFMG">UFMG</SelectItem>
                  <SelectItem value="RESIDENT">Morador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.type === 'RESIDENT' && (
              <div className="space-y-2">
                <Label htmlFor="housing_id">Moradia*</Label>
                <Input
                  id="housing_id"
                  type="text"
                  value={formData.housing_id}
                  onChange={(e) => setFormData({ ...formData, housing_id: e.target.value })}
                  required={formData.type === 'RESIDENT'}
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Criando conta...' : 'Criar conta'}
            </Button>
            <button
              type="button"
              onClick={() => navigate('/auth/signin')}
              className="text-primary hover:underline"
            >
              Já tem uma conta? Entre aqui
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
