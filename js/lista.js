onload = function() {
    let pegar = JSON.parse(localStorage.getItem('item'))

    if (pegar == null){
        return false
    }

    if (pegar != null){
        addLi(pegar)
    }
}

function setarTarefa() {
    let tarefa = document.getElementById('tarefa').value

    if(tarefa == '') { 
        return alert('Nenhuma tarefa foi digitada, digite novamente!')
    }

    if(tarefa != '') {
        let value = JSON.parse(localStorage.getItem('item')) || []

        let flag = false

        value.forEach(element => {
            if(element == tarefa){
                flag = true
            }
        })

        if(flag == true){
            alert('Essa tarefa já existe! Digite outra.')
        }

        if(flag != true){
            value.push(tarefa)

            localStorage.setItem('item', JSON.stringify(value))

            addLi(value)
        }
    }
}

function addLi(array){
    let novali = ''

     array.forEach(element => {
        novali += `<li class="linha"><input value="${element}" disabled id="input" type="text"><button onclick="editar(this)" id="editar_button"><img src="./img/edit.png" alt="" class="imagem"></button><button onclick="removerLi(this)" id="removerLi"> <img src="./img/delete.png" alt=""></button></li>

        `
        });

    ul.innerHTML = novali
}

function remover() {
    let escolha = window.confirm('Tem certeza?')

    if (escolha != true){
        return false
    }
    
    if (escolha == true){
        localStorage.setItem('item', JSON.stringify([]))

        onload()
    }
    
}

function removerLi(valor){
    let escolha = window.confirm('Tem certeza?')

    if (escolha != true){
        return false
    }

    if (escolha == true){
        let pai = valor.parentNode

        let filho = pai.firstChild

        filho = filho.value

        let pegar = JSON.parse(localStorage.getItem('item'))

        pegar.forEach((element, indice) => {
            if (element == filho){
                pegar.splice(indice, 1)
                let bloco = document.getElementById('div_buscar')
                bloco.innerHTML = ''
            }
        })

        alert('removido com sucesso!')

        localStorage.setItem('item', JSON.stringify(pegar))

        onload()
    }
}

function pesquisar() {
    let pegar = JSON.parse(localStorage.getItem('item'))

    let valor = document.getElementById('buscar').value

    let bloco = document.getElementById('div_buscar')

    bloco.innerHTML = ''

    if((valor == '' && pegar.length != 0) || (valor == '' && pegar.length == 0)){
        bloco.innerHTML = `<h2>Nenhum valor foi digitado!</h2>`
    }

    if(pegar.length == 0 && valor != ''){
        bloco.innerHTML = `<h2>Sua agenda está vazia!</h2>`
    }

    if (pegar.length != 0 && valor != ''){
        let naoAchei = pegar.find(element => {
            return  element == valor
        })

        if(naoAchei == undefined){
            bloco.innerHTML = `<h2>Não encontramos nada referente a sua pesquisa</h2><img src="./img/undraw_empty_xct9.svg" alt="" class="injectable">`
        }

        if(naoAchei != undefined){
            pegar.forEach((element) => {
                if(valor == element){
                    bloco.innerHTML = `<ul id="lista2"><li><input value="${element}" disabled id="input" type="text"><button onclick="editar(this)" id="editar_button"><img src="./img/edit.png" alt="" class="imagem"></button><button onclick="removerLi(this)" id="removerLi"> <img src="./img/delete.png" alt=""></button></li></ul>`
                }
            })
        }
    }  
}

var valor_anterior = ""

function editar(botao){
    let pai = botao.parentNode
    let filho = pai.firstChild

    valor_anterior = filho.value

    filho.disabled = false

    filho = filho.value

    botao.removeAttribute('onclick')
    botao.setAttribute('onclick', "salvar(this)")
    botao.style.backgroundColor = 'rgb(85, 226, 92)'
}

function salvar(botao){
    let flag = false

    let pegar = JSON.parse(localStorage.getItem('item'))

    let pai = botao.parentNode
    let filho = pai.firstChild

    pegar.forEach(element => {
        if(element == filho.value){
            flag = true
        }
    })

    if(flag == true){
        alert('Essa tarefa já existe! Digite outra.')
    }

    if(flag != true){
        filho.disabled = true

        filho = filho.value
        
        pegar.forEach((element, indice) => {
            if(element == valor_anterior){
                pegar[indice] = filho
                localStorage.setItem('item', JSON.stringify(pegar))
                
            }
        });

        botao.removeAttribute('onclick')
        botao.setAttribute('onclick', "editar(this)")
        botao.style.backgroundColor = 'rgb(248, 248, 98)'

        onload()
    }
}







