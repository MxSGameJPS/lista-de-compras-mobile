document.addEventListener("DOMContentLoaded", function () {
    const inputItem = document.getElementById("input-item");
    const inputQuantidade = document.getElementById("input-quantidade");
    const seletorUnidade = document.getElementById("menu-unidade");
    const seletorCategoria = document.getElementById("menu-categoria");
    const categoriaSeletor = document.getElementById("categoria-seletor");
    const adicionarItemBtn = document.getElementById("adicionar-item");
    const listaDeCompras = document.getElementById("lista-de-compras");
  
    let categoriaSelecionada = "Selecionar";
    let unidadeSelecionada = "Un";  // Definir a unidade inicial como "UN"
  
    // Função para exibir o estado geral
    function logEstadoGeral() {
      console.log({
        inputItem: inputItem.value,
        inputQuantidade: inputQuantidade.value,
        unidadeSelecionada: unidadeSelecionada,
        categoriaSelecionada: categoriaSelecionada
      });
    }

    // Funcionalidade de exibir/ocultar o menu de unidades
    const setaUnidade = document.querySelector(".seta");
    setaUnidade.addEventListener("click", function () {
      seletorUnidade.classList.toggle("menu-seletor--exibir");
    });
  
    // Funcionalidade de exibir/ocultar o menu de categoria
    const setaCategoria = document.querySelector(".seta2");
    setaCategoria.addEventListener("click", function () {
      seletorCategoria.classList.toggle("menu-seletor--exibir");
    });
  
    // Selecionando a unidade
    seletorUnidade.addEventListener("click", function (evento) {
      if (evento.target.tagName === "LI") { // Certifica-se de que o clique foi em um item da lista
        unidadeSelecionada = evento.target.innerText;
        console.log("Unidade selecionada:");  // Console log para acompanhar a unidade selecionada

        // Atualiza o texto exibido no campo de quantidade
        if (inputQuantidade.value.trim()) {
          inputQuantidade.value = `${inputQuantidade.value.trim()} ${unidadeSelecionada}`;
        } else {
          inputQuantidade.value = `0 ${unidadeSelecionada}`; // Se o campo estiver vazio, define a unidade com o valor inicial
        }

        seletorUnidade.classList.remove("menu-seletor--exibir");

        // Exibe o estado geral após selecionar a unidade
        logEstadoGeral();
      }
    });
  
    // Selecionando a categoria
    seletorCategoria.addEventListener("click", function (evento) {
      categoriaSelecionada = evento.target.innerText;
      categoriaSeletor.innerText = categoriaSelecionada;
      console.log("Categoria selecionada:", categoriaSelecionada);  // Console log para acompanhar a categoria selecionada
      seletorCategoria.classList.remove("menu-seletor--exibir");

      // Exibe o estado geral após selecionar a categoria
      logEstadoGeral();
    });
  
    // Função para adicionar item
    adicionarItemBtn.addEventListener("click", function () {
      const itemNome = inputItem.value.trim();
      let quantidade = inputQuantidade.value.trim();

      if (
        !itemNome ||
        !quantidade ||
        !unidadeSelecionada ||
        !categoriaSelecionada
      ) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
      }

      // Corrigir o valor de quantidade para separar a unidade do número (se houver)
      const [quantidadeNumero] = quantidade.split(" "); // Pega o número sem a unidade
      console.log("Quantidade e unidade para adicionar:", quantidadeNumero, unidadeSelecionada);  // Console log para ver a quantidade e unidade

      // Criação do item na lista
      const itemLista = document.createElement("li");
      itemLista.classList.add("item-lista");

      const itemNomeElemento = document.createElement("h3");
      itemNomeElemento.textContent = itemNome;

      const itemQuantidadeElemento = document.createElement("p");
      itemQuantidadeElemento.textContent = `${quantidadeNumero} ${unidadeSelecionada}`;  // Exibe a quantidade com a unidade selecionada

      const itemCategoriaElemento = document.createElement("p");
      itemCategoriaElemento.textContent = `Categoria: ${categoriaSelecionada}`;

      // Adiciona os elementos ao item
      itemLista.appendChild(itemNomeElemento);
      itemLista.appendChild(itemQuantidadeElemento);
      itemLista.appendChild(itemCategoriaElemento);

      // Adiciona o item à lista de compras
      listaDeCompras.appendChild(itemLista);

      // Limpa os campos após adicionar o item
      inputItem.value = "";
      inputQuantidade.value = "";
      unidadeSelecionada = "Un";  // Reseta para a unidade padrão
      categoriaSelecionada = "";
      categoriaSeletor.innerText = "Selecionar";

      console.log("Item adicionado:", itemNome, quantidade, categoriaSelecionada);  // Console log após adicionar o item

      // Exibe o estado geral após adicionar o item
      logEstadoGeral();
    });
  
    // Exibe o estado geral inicial
    logEstadoGeral();
  });
