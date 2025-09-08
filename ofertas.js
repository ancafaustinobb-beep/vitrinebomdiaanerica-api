export default function handler(req, res) {
  const produtos = [
    {
      nome: "Notebook Gamer 15\"",
      preco: 4500,
      imagem: "https://m.media-amazon.com/images/I/41Zbbl4P+LL._AC_SX679_.jpg",
      desconto: 10
    },
    {
      nome: "Smartphone XYZ",
      preco: 2500,
      imagem: "https://m.media-amazon.com/images/I/41Zbbl4P+LL._AC_SX679_.jpg",
      desconto: 5
    },
    {
      nome: "Monitor 27\" 144Hz",
      preco: 1200,
      imagem: "https://m.media-amazon.com/images/I/41Zbbl4P+LL._AC_SX679_.jpg",
      desconto: 15
    }
  ];

  res.status(200).json({ status: "ok", produtos });
}
