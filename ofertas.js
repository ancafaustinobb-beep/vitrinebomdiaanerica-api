
Adicionar função serverless e arquivos do projeto

import { default as AmazonPaapi } from "amazon-paapi";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const persona = {
    maxPreco: 5000,
    categorias: ["Eletrônicos", "Smartphones", "Notebooks"],
    minAvaliacao: 4
  };

  const client = new AmazonPaapi({
    accessKey: process.env.AMAZON_ACCESS_KEY,
    secretKey: process.env.AMAZON_SECRET_KEY,
    partnerTag: process.env.AMAZON_PARTNER_TAG,
    country: "BR"
  });

  try {
    const response = await client.getDeals({ category: "All" });

    const produtosFiltrados = response.items.filter(item =>
      item.price.amount <= persona.maxPreco &&
      persona.categorias.includes(item.category) &&
      item.customerReviews.rating >= persona.minAvaliacao
    );

    const jsonFinal = produtosFiltrados.map(prod => ({
      titulo: prod.title,
      imagem: prod.images.primary.medium,
      preco: `R$ ${prod.price.displayAmount}`,
      precoAntigo: prod.listPrice ? `R$ ${prod.listPrice.displayAmount}` : null,
      link: prod.detailPageURL
    }));

    res.status(200).json(jsonFinal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar ofertas da Amazon" });
  }
}
