import http from 'node:http'

// --Criação de usuário
// --Listagem de usuário
// --Edição de usuário
// --Remoção de usuário

// --Método Http
// --URL

// GET => Buscar um recurso no backend
// POST => Criar um recurso no backend
// PUT => Atualizar um recurso no backend
// PATCH => Atualizar uma informação específica no backend
// DELETE => Deletar um recurso no backend


// GET /user => Buscando um usuário no backend
// POST /user => Adicionando um usuário no backend

// Stateful - Stateless

// Cabeçalhos (Requisição/Resposta) => Metadados. Muito usado para passar informações para que o back e front
// Saiba lidar com aquilo da melhor forma

//Http Status Code

const users = []

const server = http.createServer((req, res) => {
    const { method, url, headers } = req

    if (method === 'GET' && url === '/user') {
        return res.setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/user') {
        users.push({
            id: 1,
            name: 'Joe Doe',
            email: 'joe@mail.com'
        })
        return res.writeHead(201).end(`User was just created!`)
    }

    return res.writeHead(404).end()
})

server.listen(3333) 