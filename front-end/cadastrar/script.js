const boiUrl = "http://localhost:5071/bois";
const vacaUrl = "http://localhost:5071/vacas";
const sexo = document.getElementById('sexo');

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAnimal");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
            
    const animal = {
      nome: document.getElementById("nome").value,
      dataNascimento: document.getElementById("dataNascimento").value,
      peso: document.getElementById("peso").value,
      raca: document.getElementById("raca").value,
      origem: document.getElementById("origem").value,
      status: document.getElementById("status").value,
      observacao: document.getElementById("obs").value
    };

    if (sexo.value === "Macho") {
        
    try {
      const response = await fetch(boiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(animal)
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Erro ao cadastrar o boi");
      }

      const data = await response.json();
      alert(`✅ Boi cadastrado com sucesso! ID: ${data.id}`);
      form.reset();
    } catch (error) {
      alert("❌ " + error.message);
      console.error("Erro ao cadastrar boi:", error);

    }}

    if (sexo.value === "Fêmea") {
        
    try {
      const response = await fetch(vacaUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(animal)
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Erro ao cadastrar a vaca");
      }

      const data = await response.json();
      alert(`✅ Vaca cadastrada com sucesso! ID: ${data.id}`);
      form.reset();
    } catch (error) {
      alert("❌ " + error.message);
      console.error("Erro ao cadastrar vaca:", error);

    }}
})});

