import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import "./home.css";
import banner from "./banner.png";
import { Link } from "react-router-dom";

function Home() {
  const [promocoes, setPromocoes] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtosAleatorios, setProdutosAleatorios] = useState([]);

  // Carrega as promoções
  useEffect(() => {
    async function fetchPromocoes() {
      try {
        const { data, error } = await supabase
          .from("produtos")
          .select("*")
          .eq("promocao", true);

        if (error) throw error;
        setPromocoes(data);
      } catch (error) {
        console.error("Erro ao buscar promoções:", error);
      }
    }

    fetchPromocoes();
  }, []);

  // Carregar produtos aleatórios
  useEffect(() => {
    async function fetchProdutosAleatorios() {
      try {
        const { data, error } = await supabase
          .from("produtos")
          .select("*");

        if (error) throw error;

        // Pegando 3 produtos aleatórios
        const produtosRandomicos = data.sort(() => Math.random() - 0.5).slice(0, 3);
        setProdutosAleatorios(produtosRandomicos);
      } catch (error) {
        console.error("Erro ao buscar produtos aleatórios:", error);
      }
    }

    fetchProdutosAleatorios();
  }, []);

  // Função para adicionar item ao carrinho
  const adicionarAoCarrinho = (produto) => {
    let itensCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    itensCarrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(itensCarrinho));
    setCarrinho(itensCarrinho);
  };

  // Função para remover item do carrinho
  const removerDoCarrinho = (id) => {
    let itensCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    itensCarrinho = itensCarrinho.filter((item) => item.id !== id);
    localStorage.setItem("carrinho", JSON.stringify(itensCarrinho));
    setCarrinho(itensCarrinho);
  };

  // Função para abrir o modal
  const abrirModalCarrinho = () => {
    setCarrinho(JSON.parse(localStorage.getItem("carrinho")) || []);
    setModalAberto(true);
  };

  // Função para fechar o modal
  const fecharModalCarrinho = () => {
    setModalAberto(false);
  };

  // Função para gerar a mensagem do carrinho
  const gerarMensagemWhatsApp = () => {
    let mensagem = "Itens do Carrinho:\n";
    carrinho.forEach((item) => {
      mensagem += `${item.nome} - R$ ${item.preco}\n`;
    });
    const mensagemCodificada = encodeURIComponent(mensagem);
    const numeroWhatsApp = "5519983057540"; // Altere para o número do WhatsApp da loja
    return `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
  };

  return (
    <div className="home">
      <header className="banner-container">
        <img className="banner" src={banner} alt="Banner" />
      </header>

      <section className="promocoes-section">
        <h2 className="titulo">🔥 PROMOÇÕES IMPERDÍVEIS 🔥</h2>
        <div className="produtos-scroll">
          {promocoes.length > 0 ? (
            promocoes.map((promo) => (
              <div key={promo.id} className="produto-card promocao-destaque">
                <div className="badge-promocao">Promoção!</div>
                <img
                  src={promo.imagem}
                  alt={promo.nome}
                  className="produto-imagem"
                />
                <div className="produto-info">
                  <h3>{promo.nome}</h3>
                  <p className="preco-promocao">R$ {promo.preco}</p>
                  <button
                    className="btn-comprar"
                    onClick={() => adicionarAoCarrinho(promo)}
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="aviso">Nenhuma promoção disponível no momento.</p>
          )}
        </div>
      </section>

      {/* Botão de Carrinho */}
      <button className="btn-carrinho" onClick={abrirModalCarrinho}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
        </svg>
      </button>

      {/* Modal do Carrinho */}
      {modalAberto && (
        <div className="modal-carrinho">
          <div className="modal-content">
            <h2>Itens no Carrinho</h2>
            <ul>
              {carrinho.length > 0 ? (
                carrinho.map((item, index) => (
                  <li key={index}>
                    <img src={item.imagem} alt={item.nome} width="50" />
                    <span>{item.nome}</span>
                    <span>R$ {item.preco}</span>
                    <button
                      className="btn-remover"
                      onClick={() => removerDoCarrinho(item.id)}
                    >
                      Remover
                    </button>
                  </li>
                ))
              ) : (
                <p>O carrinho está vazio.</p>
              )}
            </ul>
            <br />
            <a
              href={gerarMensagemWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              Comprar
            </a>
            <button className="btn-fechar" onClick={fecharModalCarrinho}>
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Exibindo Produtos Aleatórios */}
      <section className="produtos-section">
        <h2 id="centro" className="titulo">🎉 Algumas Lupas 🎉</h2>
        <div className="produtos-scroll">
          {produtosAleatorios.length > 0 ? (
            produtosAleatorios.map((produto) => (
              <div key={produto.id} className="produto-card">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="produto-imagem"
                />
                <div className="produto-info">
                  <h3>{produto.nome}</h3>
                  <p className="preco-produto">R$ {produto.preco}</p>
                  <button
                    className="btn-comprar"
                    onClick={() => adicionarAoCarrinho(produto)}
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Sem produtos aleatórios disponíveis.</p>
          )}
        </div>
      </section>

      <div className="vermais">
        <Link to="/lupas">
          <br />
          <br />
          <button>Ver Todas</button>
          <br />
          <br />
        </Link>
      </div>
    </div>
  );
}

export default Home;
