async function carregarProdutos() {
  const res = await fetch("/api/ofertas");
  const data = await res.json();
  const produtos = data.produtos;

  const container = document.getElementById('produtos-container');
  container.innerHTML = "";

  produtos.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>De: R$ ${(produto.preco * 1.1).toFixed(2)}</p>
      <p>Por: R$ ${produto.preco} (-${produto.desconto}%)</p>
    `;
    container.appendChild(card);
  });
}

window.onload = carregarProdutos;