const formBuscar = document.getElementById("formBusca");
const idBusca = document.getElementById("idBusca");
const formAtualizar = document.getElementById("formAtualizar");

const idCampo = document.getElementById("animalId");
const nomeCampo = document.getElementById("nome");
const dataNascimentoCampo = document.getElementById("dataNascimento");
const pesoCampo = document.getElementById("peso");
const racaCampo = document.getElementById("raca");
const origemCampo = document.getElementById("origem");
const statusCampo = document.getElementById("status");
const obsCampo = document.getElementById("obs");

let sexoAnimalBuscado = null;

formBuscar.addEventListener("submit", (event) => {
    event.preventDefault();
    const sexo = document.getElementById("sexo").value;
    const idDigitado = idBusca.value;
    formAtualizar.style.display = 'none';

    if (sexo == "Macho") {
        fetch(`http://localhost:5071/bois/${idDigitado}`)
            .then((response) => {
                if (!response.ok) {
                    alert("Boi não encontrado com este ID.");
                    throw new Error("Animal não encontrado");
                }
                return response.json();
            })
            .then((boiRecebido) => {
                idCampo.value = boiRecebido.id;
                nomeCampo.value = boiRecebido.nome;
                dataNascimentoCampo.value = boiRecebido.dataNascimento.split('T')[0];
                pesoCampo.value = boiRecebido.peso;
                racaCampo.value = boiRecebido.raca;
                origemCampo.value = boiRecebido.origem;
                statusCampo.value = boiRecebido.status;
                obsCampo.value = boiRecebido.obs;
                sexoAnimalBuscado = "Macho";
                formAtualizar.style.display = 'block';
            })
            .catch(error => {
                console.error("Erro ao buscar boi:", error);
            });
    }

    if (sexo == "Fêmea") {
        fetch(`http://localhost:5071/vacas/${idDigitado}`)
            .then((response) => {
                if (!response.ok) {
                    alert("Vaca não encontrada com este ID.");
                    throw new Error("Animal não encontrado");
                }
                return response.json();
            })
            .then((vacaRecebida) => {
                idCampo.value = vacaRecebida.id;
                nomeCampo.value = vacaRecebida.nome;
                dataNascimentoCampo.value = vacaRecebida.dataNascimento.split('T')[0];
                pesoCampo.value = vacaRecebida.peso;
                racaCampo.value = vacaRecebida.raca;
                origemCampo.value = vacaRecebida.origem;
                statusCampo.value = vacaRecebida.status;
                obsCampo.value = vacaRecebida.obs;
                sexoAnimalBuscado = "Fêmea";
                formAtualizar.style.display = 'block';
            })
            .catch(error => {
                console.error("Erro ao buscar vaca:", error);
            });
    }
});

formAtualizar.addEventListener("submit", (event) => {
    event.preventDefault();

    const id = idCampo.value;
    
    // URL corrigida para usar "/put/"
    const url = (sexoAnimalBuscado == "Macho")
        ? `http://localhost:5071/bois/put/${id}`
        : `http://localhost:5071/vacas/put/${id}`;

    const animalAtualizado = {
        id: parseInt(id),
        nome: nomeCampo.value,
        dataNascimento: dataNascimentoCampo.value,
        peso: parseFloat(pesoCampo.value),
        raca: racaCampo.value,
        origem: origemCampo.value,
        status: statusCampo.value,
        observacoes: obsCampo.value,
        sexo: sexoAnimalBuscado
    };

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalAtualizado)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Falha ao atualizar animal.");
            }
            return response.json();
        })
        .then(() => {
            alert("Animal atualizado com sucesso!");
            formAtualizar.style.display = 'none';
            formBuscar.reset();
        })
        .catch(error => {
            console.error("Erro ao atualizar:", error);
            alert("Erro ao atualizar animal.");
        });
});