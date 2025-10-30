const formVacas = document.getElementById('formVacas');

document.addEventListener("DOMContentLoaded", () => {

    fetch("http://localhost:5071/vacas").
    then((response) => response.json())
    .then((data) => {

        data.forEach(vaca => {

            const dadosVaca = document.createElement('div');
            dadosVaca.innerHTML = `
            ID: ${vaca.id}<br>
            Nome: ${vaca.nome}<br>
            Data de Nascimento: ${vaca.dataNascimento}<br>
            Peso: ${vaca.peso}<br>
            Raça: ${vaca.raca}<br>
            Origem: ${vaca.origem}<br>
            Status: ${vaca.status}<br>
            Observação: ${vaca.observacoes}<br>
            -----------------------------------------
            `;
            formVacas.appendChild(dadosVaca);
        });
    })
});