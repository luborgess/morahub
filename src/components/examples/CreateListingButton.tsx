import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

// Props do nosso botão
interface CreateListingButtonProps {
  className?: string
}

export function CreateListingButton({ className }: CreateListingButtonProps) {
  const navigate = useNavigate()
  const { user } = useAuth()

  // Função que será chamada ao clicar no botão
  const handleClick = () => {
    // Se não estiver logado, redireciona para login
    if (!user) {
      navigate('/auth/signin')
      return
    }

    // Verifica se o usuário tem permissão para criar anúncios
    if (!['RESIDENT', 'UFMG'].includes(user.type)) {
      alert('Apenas moradores e membros da UFMG podem criar anúncios')
      return
    }

    // Se passou nas verificações, redireciona para criar anúncio
    navigate('/listings/create')
  }

  return (
    <Button
      onClick={handleClick}
      className={className}
    >
      {!user ? 'Entre para criar anúncio' : 'Criar anúncio'}
    </Button>
  )
}

// Exemplo de uso:
/*
import { CreateListingButton } from '@/components/examples/CreateListingButton'

function MinhaLista() {
  return (
    <div>
      <h1>Anúncios</h1>
      <CreateListingButton className="mt-4" />
    </div>
  )
}
*/
