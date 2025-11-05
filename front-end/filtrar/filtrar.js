const formFiltro = document.getElementById("formFiltro");
const corpoTabela = document.getElementById("corpoTabela");
const botaGetAll = document.getElementById("botaoGetAll");

formFiltro.addEventListener("submit", (event) => {
  event.preventDefault();
  corpoTabela.innerHTML = "";

  let sexo = document.getElementById("sexo").value;
  let raca = document.getElementById("raca").value;
  let status = document.getElementById("status").value;

  raca = raca === "" ? "todos" : raca;
  status = status === "Todos" || status === "" ? "todos" : status;

  const urls = [];

  if (sexo === "Macho") {
    urls.push(`http://localhost:5071/filtrar/bois/${status}/${raca}`);
  }
  if (sexo === "Fêmea") {
    urls.push(`http://localhost:5071/filtrar/vacas/${status}/${raca}`);
  }

  urls.forEach((url) => {
    fetch(url)
      .then((response) => response.json())
      .then((listaBoisFiltrados) => {
        listaBoisFiltrados.forEach((animal) => {
          const linha = document.createElement("tr");

          linha.innerHTML = `
                        <td>${animal.id}</td>
                        <td>${animal.nome}</td>
                        <td>${animal.dataNascimento}</td>
                        <td>${animal.raca || "-"}</td>
                        <td>${animal.peso}</td>
                        <td>${animal.origem}</td> 
                        <td>${animal.status}</td>
                    `;

          corpoTabela.appendChild(linha);
        });
      });
  });
});

botaGetAll.addEventListener("click", () => {
  corpoTabela.innerHTML = "";

  fetch("http://localhost:5071/bois")
    .then((response) => response.json())
    .then((listaBoisFiltrados) => {
      listaBoisFiltrados.forEach((boi) => {
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
      });
    });

  fetch("http://localhost:5071/vacas")
    .then((response) => response.json())
    .then((listaBoisFiltrados) => {
      listaBoisFiltrados.forEach((vacas) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
                    <td>${vacas.id}</td>
                    <td>${vacas.nome}</td>
                    <td>${vacas.dataNascimento}</td>
                    <td>${vacas.raca}</td>
                    <td>${vacas.peso}</td>
                    <td>${vacas.origem}</td> 
                    <td>${vacas.status}</td>
                    `;

        corpoTabela.appendChild(linha);
      });
    });
});
