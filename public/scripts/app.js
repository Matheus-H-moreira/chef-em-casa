document.getElementById('logo').addEventListener('click', () => {
    window.location.href = 'index.html'
})

document.getElementById('botaoCadastro').addEventListener('click', () => {
    window.location.href = 'cadastro_receitas.html'
})

document.getElementById('botaoFavoritos').addEventListener('click', () => {
    window.location.href = 'favoritos.html'
})

document.getElementById('botaoLogin').addEventListener('click', () => {
    window.location.href = 'login.html'
})

const dadosCadastro = JSON.parse(localStorage.getItem("dados_cadastro_usuario"))
const dadosLogin = JSON.parse(sessionStorage.getItem("dados_login"))

