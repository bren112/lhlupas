import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import "./todas.css";
import { Link } from "react-router-dom";
function Todas() {
  const [produtos, setProdutos] = useState([]);

  // Carrega todos os produtos
  useEffect(() => {
    async function fetchProdutos() {
      try {
        const { data, error } = await supabase.from("produtos").select("*");

        if (error) throw error;
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProdutos();
  }, []);

  // Função para adicionar item ao carrinho
  const adicionarAoCarrinho = (produto) => {
    let itensCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    itensCarrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(itensCarrinho));
  };

  return (
    <div className="todas-produtos">
      <Link to='/'>
        <button id="voltar">Voltar</button>
        </Link>
      <header className="header-todas">
        <br />
        <br />
        <h1 id="centro">Todos os Produtos 🔥</h1>
        <p id="centro" className="descricao">Encontre os melhores produtos para você!</p>
      </header>
      <br />

      <section className="produtos-lista">
        {produtos.length > 0 ? (
          <div className="fileiras">
            {produtos.map((produto) => (
              <div key={produto.id} className="produto-card">
                {produto.promocao && (
                  <div className="badge-promocao">Promoção!</div>
                )}
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="produto-imagem"
                />
                <div className="produto-info">
                  <h3>{produto.nome}</h3>
                  <p className="preco">R$ {produto.preco}</p>
                  {produto.promocao && (
                    <p className="preco-promocao">
                      {/* Por R$ {produto.preco_promocao} */}
                    </p>
                  )}
                  <button
                    className="btn-comprar"
                    onClick={() => adicionarAoCarrinho(produto)}
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Não há produtos disponíveis no momento.</p>
        )}
      </section>
    </div>
  );
}

export default Todas;
