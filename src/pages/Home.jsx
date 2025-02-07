import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { supabase } from "../supabase/supabase";
import "./home.css";
import img from "./img1.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [promocoes, setPromocoes] = useState([]);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const { data, error } = await supabase.from("produtos").select("*");
        if (error) throw error;

        // Filtrando promoções considerando diferentes formatos (true, 'true', 1)
        const promoProdutos = data.filter(
          (produto) => produto.promo === true || produto.promo === 1 || produto.promo === "true"
        );
        setPromocoes(promoProdutos);

        // Produtos que NÃO estão em promoção
        const produtosSemPromocao = data.filter(
          (produto) => !(produto.promo === true || produto.promo === 1 || produto.promo === "true")
        );
        setProdutos(produtosSemPromocao);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProdutos();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="home">
      <img className="imagem1" src={img} alt="Banner" />
      <h1 id="txthome">ÓCULOS</h1>

      <Slider {...settings} className="carousel">
        {produtos.map((produto) => (
          <div key={produto.id} className="card">
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="imagem-produto"
            />
            <div className="info">
              <p className="nome-produto">{produto.nome}</p>
              <p className="preco-produto">R$ {produto.preco}</p>
            </div>
          </div>
        ))}
      </Slider>

      <h1 id="txthome">PROMOÇÕES</h1>

      <Slider {...settings} className="carousel">
        {promocoes.length > 0 ? (
          promocoes.map((promo) => (
            <div key={promo.id} className="card promo-card">
              <img
                src={promo.imagem}
                alt={promo.nome}
                className="imagem-produto"
              />
              <div className="info">
                <p className="nome-produto">{promo.nome}</p>
                <p className="preco-produto">R$ {promo.preco}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma promoção disponível no momento.</p>
        )}
      </Slider>
    </div>
  );
}

export default Home;
