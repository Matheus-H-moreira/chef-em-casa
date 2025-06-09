document.addEventListener('DOMContentLoaded', () => {
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
    if(btnCadastro) {
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
})