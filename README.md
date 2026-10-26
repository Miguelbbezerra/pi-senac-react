# Sistema de Podologia — Front

Frontend de um sistema para clínica de podologia, feito em equipe no Projeto
Integrador do Senac (2024). A clínica cadastra pacientes e podólogos, agenda os
atendimentos e registra a ficha de anamnese de cada paciente.

**Stack:** React 18 · TypeScript · Material UI · styled-components · Axios ·
React Router · IMask

## Telas

- **Login**, com rota privada: as páginas internas exigem token válido.
- **Pacientes:** listagem com busca, cadastro, edição e exclusão.
- **Podólogos:** mesmo fluxo de cadastro.
- **Agendamentos:** marcação de horário ligando paciente e podólogo, com busca e
  edição.
- **Ficha de anamnese:** histórico de saúde do paciente, preenchido e consultado por
  modal.
- **Perfil:** dados do usuário logado e troca de senha.
- **Página de divulgação** da clínica, pública.

Os campos de CPF e telefone usam máscara (IMask), e o layout é responsivo, com menu
lateral recolhível no celular.

## Minha parte no projeto

O projeto foi feito em equipe com [@JhonataProf](https://github.com/JhonataProf).
Os meus commits foram principalmente em:

- **Login:** refatoração da tela e feedback de erro com snackbar.
- **Rota privada** e validação do token.
- **Ficha de anamnese:** tela e modal de visualização.
- **Tabelas e modais** de pacientes, podólogos e agendamentos (cadastro, edição e
  exclusão).
- **Perfil**, com a troca de senha.
- **Responsividade e máscaras de input.**
- **Página de divulgação.**
- **Deploy na Azure:** workflow do GitHub Actions publicando no Azure Static Web
  Apps a cada push na `main`.

## Rodando

```bash
npm install
npm start        # http://localhost:3000
```

O front consome a API do projeto, publicada na época em
`api-pi-senac.azurewebsites.net` (Node + TypeScript + MySQL).
