
const API_URL_BOIS = "http://localhost:5071/bois";
const API_URL_VACAS = "http://localhost:5071/vacas";


const formDelete = document.getElementById("formDelete");
const sexoDelete = document.getElementById("sexoDelete");
const idDelete = document.getElementById("idDelete");
const deleteFeedback = document.getElementById("deleteFeedback");

formDelete.addEventListener("submit", async (event) => {
    event.preventDefault();

    deleteFeedback.textContent = ""; 

    const sexo = sexoDelete.value;
    const id = idDelete.value;
    let url = "";

    if (sexo === "Macho") {
        url = `${API_URL_BOIS}/${id}`;
    } else if (sexo === "Fêmea") {
        url = `${API_URL_VACAS}/${id}`;
    } else {
        deleteFeedback.textContent = "Por favor, selecione o sexo.";
        deleteFeedback.className = "feedback-erro";
        return;
    }

    
    if (!confirm(`Tem certeza que deseja deletar o animal (Sexo: ${sexo}, ID: ${id})?`)) {
        return; 
    }

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (response.status === 404) {
            throw new Error("Animal não encontrado com este ID e Sexo.");
        }
        if (!response.ok) {
            throw new Error("Erro ao deletar o animal.");
        }

        deleteFeedback.textContent = "Animal deletado com sucesso!";
        deleteFeedback.className = "feedback-sucesso";
        formDelete.reset(); 

    } catch (error) {
        deleteFeedback.textContent = error.message;
        deleteFeedback.className = "feedback-erro";
    }
});