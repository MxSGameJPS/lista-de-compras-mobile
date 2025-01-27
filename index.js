function adicionar() {
  let item = document.getElementById("input-item").value.trim();
  let quantidade = document.getElementById("input-quantidade").value.trim();
  let unidade = document.getElementById("unidade").value.trim();
  let categoria = document.getElementById("categoria").value.trim();

  // Validação para evitar campos vazios
  if (!item || !quantidade || !unidade || !categoria) {
    alert("Por favor, preencha todos os campos antes de adicionar um item!");
    return;
  }

  // Seleciona o container onde os itens serão adicionados
  let listaContainer = document.querySelector(".lista-container");

  // Cria o elemento da lista com a estrutura correta
  let novaLista = document.createElement("section");
  novaLista.classList.add("lista-compras");

  novaLista.innerHTML = `
    <input class="checkbox" type="checkbox" />
    <section class="lista-compras__itens">
      <span class="texto-verde">${quantidade} ${unidade}</span>
      <span class="item">${item}</span>
      <span class="imagen-produto">${categoria}</span>
    </section>
  `;

  // Adiciona a nova lista ao container
  listaContainer.appendChild(novaLista);

  // Evento para riscar o texto ao marcar o checkbox
  const checkbox = novaLista.querySelector(".checkbox");
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      novaLista.style.textDecoration = "line-through";
      novaLista.style.opacity = "0.6";
    } else {
      novaLista.style.textDecoration = "none";
      novaLista.style.opacity = "1";
    }
  });

  document.getElementById("input-item").value = "";
  document.getElementById("input-quantidade").value = "";
  document.getElementById("unidade").value = "";
  document.getElementById("categoria").value = "";
}


function limpar() {
  let lista = document.querySelector(".lista-container");
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
}

function salvar() {
  const doc = new jspdf.jsPDF(); // Cria uma nova instância do jsPDF

  // Seleciona todos os itens da lista
  const itens = document.querySelectorAll(".lista-compras");

  let yPosition = 10; // Posição vertical inicial no PDF

  itens.forEach((item, index) => {
    const quantidade = item.querySelector(".texto-verde").textContent;
    const nomeItem = item.querySelector(".item").textContent;
    const categoria = item.querySelector(".imagen-produto").textContent;

    // Adiciona o texto formatado ao PDF com uma pequena formatação
    doc.text(`${index + 1}. ${nomeItem} - ${quantidade} - ${categoria}`, 10, yPosition);
    yPosition += 10; // Move a posição para o próximo item
  });

  // Salva o PDF no dispositivo
  doc.save("lista-de-compras.pdf");
}



// service-worker.js

