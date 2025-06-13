document.addEventListener('DOMContentLoaded', function () {
    inicializarGrafico()
    configurarNavegacao()
    configurarLogin()
    configurarCadastro()
    dadosConta()
    configurarEstrelas()
    carregarDadosConta()
    configurarCards()
    configurarCarrossel()
    carregarReceitaPorId()
})

// --- GRÁFICO ---
function inicializarGrafico() {
    var canvas = document.getElementById('meuGrafico');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['30 minutos', '40 minutos', '60 minutos', '90 minutos', '120 minutos', '150 minutos'],
                datasets: [{
                    label: 'Tempo de preparo',
                    data: [1, 1, 1, 2, 2, 2],
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
        });
    }
}

// --- NAVEGAÇÃO ---
function configurarNavegacao() {
    var logo = document.getElementById('logo')
    if (logo) {
        logo.addEventListener('click', function () {
            window.location.href = 'index.html'
        })
    }

    var botaoCadastro = document.getElementById('botaoCadastro')
    if (botaoCadastro) {
        botaoCadastro.addEventListener('click', function () {
            window.location.href = 'cadastro_receitas.html'
        })
    }

    var botaoFavoritos = document.getElementById('botaoFavoritos')
    if (botaoFavoritos) {
        botaoFavoritos.addEventListener('click', function () {
            window.location.href = 'favoritos.html'
        })
    }

    var botaoLogin = document.getElementById('botaoLogin')
    if (botaoLogin) {
        botaoLogin.addEventListener('click', function () {
            window.location.href = 'login.html'
        })
    }

    var menuBtn = document.getElementById('menu')
    if (menuBtn) {
        menuBtn.addEventListener('click', function () {
            window.location.href = 'index.html'
        })
    }

    var btnCadastro = document.getElementById('botaoVoltarCadastro')
    if (btnCadastro) {
        btnCadastro.addEventListener('click', function () {
            window.location.href = 'cadastro_usuario.html'
        })
    }
}

// --- LOGIN ---
function configurarLogin() {
    var dadosCadastro = JSON.parse(localStorage.getItem("dados_cadastro_usuario"))
    var dadosLogin = JSON.parse(sessionStorage.getItem("dados_login"))

    var entrarBtn = document.getElementById('entrar')
    if (entrarBtn) {
        entrarBtn.addEventListener('click', function () {
            var login = document.getElementById('login').value.trim()
            if (!login) {
                alert("Preencha o campo do Login")
                return
            }

            var senha = document.getElementById('senha').value.trim()
            if (!senha) {
                alert("Preencha o campo da Senha")
                return
            }

            var dados_login = {
                login: login,
                senha: senha
            }

            sessionStorage.setItem('dados_login', JSON.stringify(dados_login))

            if (dadosCadastro == null) {
                alert("Nenhum cadastro identificado. Cadastre-se")
                return
            }

            if (dadosCadastro.login === dados_login.login && dadosCadastro.senha === dados_login.senha) {
                alert("Login válido")
                window.location.href = 'index.html'
            } else {
                alert("Login ou senha incorretos")
            }
        })
    }

    if (dadosCadastro && dadosLogin && dadosCadastro.login === dadosLogin.login && dadosCadastro.senha === dadosLogin.senha) {
        var botaoLogin = document.getElementById('botaoLogin')
        if (botaoLogin) {
            botaoLogin.innerText = "Conta"
            botaoLogin.id = "dadosConta"

            var novoBotaoConta = document.getElementById('dadosConta')
            if (novoBotaoConta) {
                novoBotaoConta.addEventListener('click', function () {
                    window.location.href = 'dados_conta.html'
                })
            }
        }
    }
}

// --- CADASTRO ---
function configurarCadastro() {
    var cadastroFormBtn = document.getElementById('enviarCadastro')

    if (
        cadastroFormBtn &&
        document.getElementById('login') &&
        document.getElementById('nome') &&
        document.getElementById('email') &&
        document.getElementById('senha')
    ) {
        cadastroFormBtn.addEventListener('click', function (event) {
            event.preventDefault()

            var login_cadastro = document.getElementById('login').value.trim()
            if (!login_cadastro) {
                alert("Preencha o campo de Login")
                return
            }

            var nome = document.getElementById('nome').value.trim()
            if (!nome) {
                alert("Preencha o campo de Nome")
                return
            }

            var email = document.getElementById('email').value.trim()
            if (!email) {
                alert("Preencha o campo do Email")
                return
            }

            var validarEmail = function (email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            }

            if (!validarEmail(email)) {
                alert("Email inválido")
                return
            }

            var senha_email = document.getElementById('senha').value.trim()
            if (!senha_email) {
                alert("Preencha o campo da Senha")
                return
            }

            var dados_cadastro_usuario = {
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
}

// --- CARREGAR DADOS CONTA ---
function dadosConta() {
    var logoutBtn = document.getElementById('logout')
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            sessionStorage.removeItem('dados_login')
            window.location.href = 'index.html'
        })
    }

    var excluirBtn = document.getElementById('excluir')
    if (excluirBtn) {
        excluirBtn.addEventListener('click', function () {
            localStorage.removeItem('dados_cadastro_usuario')
            window.location.href = 'index.html'
        })
    }

    var dadosCadastro = JSON.parse(localStorage.getItem("dados_cadastro_usuario"))

    if (dadosCadastro) {
        var loginEl = document.getElementById('login')
        if (loginEl) loginEl.innerText = dadosCadastro.login

        var nomeEl = document.getElementById('nome')
        if (nomeEl) nomeEl.innerText = dadosCadastro.nome

        var emailEl = document.getElementById('email')
        if (emailEl) emailEl.innerText = dadosCadastro.email

        var senhaEl = document.getElementById('senha')
        if (senhaEl) senhaEl.innerText = dadosCadastro.senha
    }
}

// --- ESTRELAS ---
function configurarEstrelas() {
    document.querySelectorAll('p').forEach(function (paragrafo) {
        var estrelaVazia = paragrafo.querySelector('.estrela_vazia')
        var estrelaCheia = paragrafo.querySelector('.estrela_cheia')

        if (estrelaVazia && estrelaCheia) {
            estrelaVazia.addEventListener('click', function () {
                estrelaVazia.classList.add('esconder')
                estrelaCheia.classList.remove('esconder')
            })

            estrelaCheia.addEventListener('click', function () {
                estrelaCheia.classList.add('esconder')
                estrelaVazia.classList.remove('esconder')
            })
        }
    })
}

// --- DADOS DA CONTA ---
function carregarDadosConta() {
    var dadosCadastro = JSON.parse(localStorage.getItem("dados_cadastro_usuario"))

    if (dadosCadastro) {
        var loginEl = document.getElementById('spanLogin')
        if (loginEl) loginEl.innerText = dadosCadastro.login

        var nomeEl = document.getElementById('spanNome')
        if (nomeEl) nomeEl.innerText = dadosCadastro.nome

        var emailEl = document.getElementById('spanEmail')
        if (emailEl) emailEl.innerText = dadosCadastro.email

        var senhaEl = document.getElementById('spanSenha')
        if (senhaEl) senhaEl.innerText = dadosCadastro.senha
    }
}

// --- CARDS ---
function configurarCards() {
    var cards = document.querySelectorAll('.foto_box')
    cards.forEach(function (card) {
        card.style.cursor = 'pointer'
        card.addEventListener('click', function () {
            var id = card.getAttribute('id')
            window.location.href = 'detalhes.html?id=' + id
        })
    })
}

// --- CARROSSEL ---
function configurarCarrossel() {
    var imagensCarrossel = document.querySelectorAll('#carouselExampleAutoplaying .carousel-item img')
    imagensCarrossel.forEach(function (img) {
        img.style.cursor = 'pointer'
        img.addEventListener('click', function () {
            var id = img.id
            window.location.href = 'detalhes.html?id=' + id
        })
    })
}

// --- DETALHES DA RECEITA ---
function carregarReceitaPorId() {
    var params = new URLSearchParams(window.location.search)
    var idReceita = params.get('id')

    if (!idReceita) {
        return
    }

    fetch('http://localhost:3000/receitas/' + idReceita)
        .then(function (res) {
            return res.json()
        })
        .then(function (dados) {
            document.getElementById('titulo').textContent = dados.titulo
            document.getElementById('imagem').src = dados.imagem
            document.getElementById('descricao').textContent = dados.descricao
            document.getElementById('categoria').textContent = dados.categoria
            document.getElementById('autor').textContent = dados.autor
            document.getElementById('data').textContent = dados.data
            document.getElementById('tempoPreparo').textContent = dados.tempoPreparo

            if (Array.isArray(dados.ingredientes)) {
                document.getElementById('ingredientes').innerHTML = dados.ingredientes.map(function (item) {
                    return '<li>' + item + '</li>'
                }).join('')
            } else {
                document.getElementById('ingredientes').textContent = dados.ingredientes
            }
        })
        .catch(function (err) {
            console.error('Erro ao carregar dados: ', err)
        })
}