document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('meuGrafico')
    if (canvas) {
        const ctx = canvas.getContext('2d')

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['30 minutos', '40 minutos', '60 minutos', '90 minutos', '120 minutos', '150 minutos'],
                datasets: [{
                    label: 'Tempo de preparo',
                    data: [1, 1, 1, 2, 2, 2],
                    backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
    }
    
    let dadosCadastro = JSON.parse(localStorage.getItem("dados_cadastro_usuario"))
    let dadosLogin = JSON.parse(sessionStorage.getItem("dados_login"))

    let logo = document.getElementById('logo')
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = 'index.html'
        })
    }

    let botaoCadastro = document.getElementById('botaoCadastro')
    if (botaoCadastro) {
        botaoCadastro.addEventListener('click', () => {
            window.location.href = 'cadastro_receitas.html'
        })
    }

    let botaoFavoritos = document.getElementById('botaoFavoritos')
    if (botaoFavoritos) {
        botaoFavoritos.addEventListener('click', () => {
            window.location.href = 'favoritos.html'
        })
    }

    let botaoLogin = document.getElementById('botaoLogin')
    if (botaoLogin) {
        botaoLogin.addEventListener('click', () => {
            window.location.href = 'login.html'
        })
    }

    let entrarBtn = document.getElementById('entrar')
    if (entrarBtn) {
        entrarBtn.addEventListener('click', () => {
            let login = document.getElementById('login').value.trim()
            if (!login) {
                alert("Preencha o campo do Login")
                return
            }

            let senha = document.getElementById('senha').value.trim()
            if (!senha) {
                alert("Preencha o campo da Senha")
                return
            }

            let dados_login = {
                login: login,
                senha: senha
            }

            sessionStorage.setItem('dados_login', JSON.stringify(dados_login))

            if (dadosCadastro == null) {
                alert("Nenhum cadastro identificado. Cadastre-se")
                return
            }

            if (dadosCadastro.login === dadosLogin.login && dadosCadastro.senha === dadosLogin.senha) {
                alert("Login válido")
                window.location.href = 'index.html'
            } else {
                alert("Login ou senha incorretos")
            }
        })
    }

    let btnCadastro = document.getElementById('botaoVoltarCadastro')
    if (btnCadastro) {
        btnCadastro.addEventListener('click', () => {
            window.location.href = 'cadastro_usuario.html'
        })
    }

    let menuBtn = document.getElementById('menu')
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            window.location.href = 'index.html'
        })
    }

    if (dadosCadastro && dadosLogin && dadosCadastro.login === dadosLogin.login && dadosCadastro.senha === dadosLogin.senha) {
        if (botaoLogin) {
            botaoLogin.innerText = "Conta"
            botaoLogin.id = "dadosConta"

            let dadosContaBtn = document.getElementById('dadosConta')
            if (dadosContaBtn) {
                dadosContaBtn.addEventListener('click', () => {
                    window.location.href = 'dados_conta.html'
                })
            }
        }
    }

    document.querySelectorAll('p').forEach(estrelas => {
        let estrelaVazia = estrelas.querySelector('.estrela_vazia')
        let estrelaCheia = estrelas.querySelector('.estrela_cheia')

        if (estrelaVazia && estrelaCheia) {
            estrelaVazia.addEventListener('click', () => {
                estrelaVazia.classList.add('esconder')
                estrelaCheia.classList.remove('esconder')
            })

            estrelaCheia.addEventListener('click', () => {
                estrelaCheia.classList.add('esconder')
                estrelaVazia.classList.remove('esconder')
            })
        }
    })

    if (dadosCadastro) {
        let loginEl = document.getElementById('login')
        if (loginEl) loginEl.innerText = dadosCadastro.login

        let nomeEl = document.getElementById('nome')
        if (nomeEl) nomeEl.innerText = dadosCadastro.nome

        let emailEl = document.getElementById('email')
        if (emailEl) emailEl.innerText = dadosCadastro.email

        let senhaEl = document.getElementById('senha')
        if (senhaEl) senhaEl.innerText = dadosCadastro.senha
    }

    let logoutBtn = document.getElementById('logout')
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('dados_login')
            window.location.href = 'index.html'
        })
    }

    let excluirBtn = document.getElementById('excluir')
    if (excluirBtn) {
        excluirBtn.addEventListener('click', () => {
            localStorage.removeItem('dados_cadastro_usuario')
            window.location.href = 'index.html'
        })
    }

    let cadastroFormBtn = document.getElementById('enviarCadastro')
    if (cadastroFormBtn && document.getElementById('login') && document.getElementById('nome') && document.getElementById('email') && document.getElementById('senha')) {
        cadastroFormBtn.addEventListener('click', event => {
            event.preventDefault()

            let login_cadastro = document.getElementById('login').value.trim()
            if (!login_cadastro) {
                alert("Preencha o campo de Login")
                return
            }

            let nome = document.getElementById('nome').value.trim()
            if (!nome) {
                alert("Preencha o campo de Nome")
                return
            }

            let email = document.getElementById('email').value.trim()
            if (!email) {
                alert("Preencha o campo do Email")
                return
            }

            const validarEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

            if (!validarEmail(email)) {
                alert("Email inválido")
                return
            }

            let senha_email = document.getElementById('senha').value.trim()
            if (!senha_email) {
                alert("Preencha o campo da Senha")
                return
            }

            let dados_cadastro_usuario = {
                login: login_cadastro,
                nome: nome,
                email: email,
                senha: senha_email
            }

            localStorage.setItem('dados_cadastro_usuario', JSON.stringify(dados_cadastro_usuario))
            alert("Usuário criado com sucesso")

            window.location.href = 'login.html'
        })
    }

    const cards = document.querySelectorAll('.box')

    cards.forEach((card) => {
        card.style.cursor = 'pointer'
        card.addEventListener('click', () => {
            const id = card.getAttribute('id')
            window.location.href = `detalhes.html?id=${id}`
        })
    })

    const imagensCarrossel = document.querySelectorAll('#carouselExampleAutoplaying .carousel-item img')

    imagensCarrossel.forEach((img) => {
        img.style.cursor = 'pointer'
        img.addEventListener('click', function () {
            const id = img.id;
            window.location.href = `detalhes.html?id=${id}`
        })
    })

    const params = new URLSearchParams(window.location.search)
    const idReceita = params.get('id')

    if (!idReceita) {
        return
    }

    fetch(`http://localhost:3000/receitas/${idReceita}`)
        .then(res => res.json())
        .then(dados => {
            document.getElementById('titulo').textContent = dados.titulo
            document.getElementById('imagem').src = dados.imagem
            document.getElementById('descricao').textContent = dados.descricao
            document.getElementById('categoria').textContent = dados.categoria
            document.getElementById('autor').textContent = dados.autor
            document.getElementById('data').textContent = dados.data
            document.getElementById('tempoPreparo').textContent = dados.tempoPreparo

            if (Array.isArray(dados.ingredientes)) {
                document.getElementById('ingredientes').innerHTML = dados.ingredientes.map(item => `<li>${item}</li>`).join('')
            } else {
                document.getElementById('ingredientes').textContent = dados.ingredientes
            }
        })
        .catch(err => console.error('Erro ao carregar dados: ', err))
})
