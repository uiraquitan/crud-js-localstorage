// Cria a constante com a abertura da modal
const openModal = () => document.getElementById('modal')
    .classList.add('active');

// Cria a constante com o fechamento da modal
const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
}

//============================================
// Constantes para evitar repetição de codigo
//============================================

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbCliente')) ?? [];
const setLocalStorage = (cliente) => localStorage.setItem('dbCliente', JSON.stringify(cliente))

//============================================
// CRUD LOCAL STORAGE
//============================================



// Ler DADOS 
const readCliente = () => getLocalStorage();


// Atualizar DADOS 
const deleteCliente = (index) => {
    const dbCliente = getLocalStorage();
    dbCliente.splice(index, 1);
    setLocalStorage(dbCliente);
}

// Atualizar DADOS 
const updateCliente = (index, cliente) => {
    const dbCliente = getLocalStorage();
    dbCliente[index] = cliente;
    setLocalStorage(dbCliente);
}


// CRIANDO DADOS 
const createCliente = (cliente) => {

    // Recebe no local Storage do navegadoe os dasos vindo de um parâmetro
    const dbCliente = getLocalStorage();

    // Armazena dentro da Variavel dbStorage
    dbCliente.push(cliente);

    // Adiciona no local Storage do navegadoe os dasos vindo de um parâmetro
    setLocalStorage(dbCliente);

}


//============================================
// Funcções auxiliares separadas
//============================================

// verificando campos se esta vazio
function isValueFiels() {
    return document.getElementById('form').reportValidity();
}

// limpando os campos do html

function clearFields() {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
}

//============================================
// Trabalhando com o HTML
//============================================


const createRow = (cliente, indice) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td>${cliente.celular}</td>
        <td>${cliente.cidade}</td>
        <td>
            <button type="button" class="button green" id="editar-${indice}">Editar</button>
            <button type="button" class="button red" id="excluir-${indice}">Excluir</button>
        </td>
    `;

    document.querySelector('#tableClient>tbody').appendChild(newRow);
}



//Limpando a tablea
const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr');
    rows.forEach(rows => rows.parentNode.removeChild(rows));
}

//lendo todos os dados da tablea
const updatedtable = () => {
    const clienteTable = readCliente();
    clearTable();
    clienteTable.forEach(createRow);
}

// atualizando a tabela


// Salvando o cliente
const saveCliente = () => {
    if (isValueFiels()) {
        const newCliente = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {

            createCliente(newCliente);
            updatedtable();
            closeModal();

        } else {
            updateCliente(index, newCliente);
            updatedtable();
            closeModal();
        }
    }
}

const fillField = (dados) => {
    document.getElementById('nome').value = dados.nome
    document.getElementById('email').value = dados.email
    document.getElementById('celular').value = dados.celular
    document.getElementById('cidade').value = dados.nome
    document.getElementById('nome').dataset.index = dados.index
}

// mostrando a modal preenchida editando Cliente 
const editCliente = (index) => {
    const cliente = readCliente()[index];
    cliente.index = index;
    fillField(cliente);
    openModal()
}

// Exluindo ou editando a tabela
const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [cliente, indice] = event.target.id.split('-');
        if (cliente == "editar") {
            editCliente(indice);
        } else {
            deleteCliente(indice);
            updatedtable();
        }
    }
}

updatedtable()
//============================================
// Eventos
//============================================


// botão editar e exlcuir
document.querySelector("#tableClient>tbody")
    .addEventListener('click', editDelete);

// botão salvar
document.getElementById('salvar')
    .addEventListener('click', saveCliente);

// Eventos abrir modal
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal);

// Eventos fechar modal
document.getElementById('modalClose')
    .addEventListener('click', closeModal)

// Eventos fechar modal
document.getElementById('cancelar')
    .addEventListener('click', closeModal)