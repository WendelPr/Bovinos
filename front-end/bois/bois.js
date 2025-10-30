const formBoi = document.getElementById('formBoi');

document.addEventListener("DOMContentLoaded", () => {

    fetch("http://localhost:5071/bois").
    then((response) => response.json())
    .then((data) => {

        data.forEach(boi => {

            const dadosBoi = document.createElement('div');
            dadosBoi.innerHTML = `
            ID: ${boi.id}<br>
            Nome: ${boi.nome}<br>
            Data de Nascimento: ${boi.dataNascimento}<br>
            Peso: ${boi.peso}<br>
            Raça: ${boi.raca}<br>
            Origem: ${boi.origem}<br>
            Status: ${boi.status}<br>
            Observação: ${boi.observacoes}<br>
            -----------------------------------------
            `;
            formBoi.appendChild(dadosBoi);
        });
    })
});

