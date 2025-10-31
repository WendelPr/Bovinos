const formFiltro = document.getElementById("formFiltro");
const corpoTabela = document.getElementById("corpoTabela");
const botaGetAll = document.getElementById("botaoGetAll");

formFiltro.addEventListener("submit", (event) => {
    event.preventDefault();
    corpoTabela.innerHTML = "";

    const sexo = document.getElementById("sexo").value;
    const raca = document.getElementById("raca").value;
    const status = document.getElementById("status").value;

    //STATUS= STRING 
    //RACA = STRING ${idRecebido}`

    if (sexo == "Macho") {
        fetch(`http://localhost:5071/filtrar/bois/${status}/${raca}`)
            .then((response) => response.json())
            .then((listaBoisFiltrados) => {
                listaBoisFiltrados.forEach(boi => {
                    const linha = document.createElement("tr");

                    linha.innerHTML = `
                        <td>${boi.id}</td>
                        <td>${boi.nome}</td>
                        <td>${boi.dataNascimento}</td>
                        <td>${boi.raca}</td>
                        <td>${boi.peso}</td>
                        <td>${boi.origem}</td> 
                        <td>${boi.status}</td>
                    `;

                    corpoTabela.appendChild(linha);
                })
            })

    }
    if (sexo == "Fêmea") {
        
       fetch(`http://localhost:5071/filtrar/vacas/${status}/${raca}`)
            .then((response) => response.json())
            .then((listaBoisFiltrados) => {
                listaBoisFiltrados.forEach(boi => {
                    const linha = document.createElement("tr");

                    linha.innerHTML = `
                        <td>${boi.id}</td>
                        <td>${boi.nome}</td>
                        <td>${boi.dataNascimento}</td>
                        <td>${boi.raca}</td>
                        <td>${boi.peso}</td>
                        <td>${boi.origem}</td> 
                        <td>${boi.status}</td>
                    `;

                    corpoTabela.appendChild(linha);
                })
            })





    }



});


botaGetAll.addEventListener("click", (event) => {
    corpoTabela.innerHTML = "";

    fetch("http://localhost:5071/bois").
        then((response) => response.json())
        .then((listaBoisFiltrados) => {
            listaBoisFiltrados.forEach(boi => {
                const linha = document.createElement("tr");

                linha.innerHTML = `
                    <td>${boi.id}</td>
                    <td>${boi.nome}</td>
                    <td>${boi.dataNascimento}</td>
                    <td>${boi.raca}</td>
                    <td>${boi.peso}</td>
                    <td>${boi.origem}</td> 
                    <td>${boi.status}</td>
                    
                    `;

                corpoTabela.appendChild(linha);
            })
        })
    fetch("http://localhost:5071/vacas").
        then((response) => response.json())
        .then((listaBoisFiltrados) => {
            listaBoisFiltrados.forEach(boi => {
                const linha = document.createElement("tr");

                linha.innerHTML = `
                    <td>${boi.id}</td>
                    <td>${boi.nome}</td>
                    <td>${boi.dataNascimento}</td>
                    <td>${boi.raca}</td>
                    <td>${boi.peso}</td>
                    <td>${boi.origem}</td> 
                    <td>${boi.status}</td>
                    `;

                corpoTabela.appendChild(linha);
            })
        });
})





