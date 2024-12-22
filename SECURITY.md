# Política de Segurança

## 🔒 Reportando Vulnerabilidades

Se você descobrir uma vulnerabilidade de segurança no MoraHub, por favor nos avise imediatamente enviando um email para [contato@morahub.com.br](mailto:contato@morahub.com.br). Pedimos que:

1. **NÃO** crie uma Issue pública
2. **NÃO** explore a vulnerabilidade
3. Forneça detalhes suficientes para reproduzir o problema

## ⚡ Processo de Disclosure

1. Envie o report por email
2. Nossa equipe confirmará o recebimento em até 24 horas
3. Investigaremos e manteremos você atualizado
4. Após a correção, você será creditado (se desejar)

## 🛡️ Práticas de Segurança

- Todos os dados sensíveis são criptografados
- Autenticação via Supabase Auth
- Row Level Security no banco de dados
- Sanitização de inputs
- Headers de segurança via Helmet
- CORS configurado adequadamente

## 📋 Checklist de Segurança

- [ ] Validação de entrada em todos os endpoints
- [ ] Sanitização de saída para prevenir XSS
- [ ] Rate limiting em APIs sensíveis
- [ ] Logs de auditoria para ações críticas
- [ ] Backup regular dos dados
- [ ] Monitoramento de dependências via Dependabot
