import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';

function Noticias() {
  const [produtos, setProdutos] = useState([]);
  const [editandoProduto, setEditandoProduto] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [promocao, setPromocao] = useState(false);

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    const { data, error } = await supabase.from('produtos').select('*');
    if (error) {
      console.error('Erro ao buscar produtos:', error);
    } else {
      setProdutos(data);
    }
  }

  function editarProduto(produto) {
    setEditandoProduto(produto.id);
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setPreco(produto.preco);
    setPromocao(produto.promocao);
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    const { error } = await supabase
      .from('produtos')
      .update({ nome, descricao, preco, promocao })
      .eq('id', editandoProduto);

    if (error) {
      console.error('Erro ao atualizar produto:', error);
    } else {
      setEditandoProduto(null);
      setNome('');
      setDescricao('');
      setPreco('');
      setPromocao(false);
      buscarProdutos();
    }
  }

  async function excluirProduto(id) {
    const { error } = await supabase.from('produtos').delete().eq('id', id);
    if (error) {
      console.error('Erro ao excluir produto:', error);
    } else {
      buscarProdutos();
    }
  }

  return (
    <div className="noticias">
      <style>
        {`
          .noticias {
            font-family: 'Arial', sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #f4f4f4;
            border-radius: 8px;
          }

          h2 {
            color: #333;
            text-align: center;
            margin-bottom: 20px;
          }

          ul {
            list-style-type: none;
            padding: 0;
          }

          li {
            background-color: #fff;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          h3 {
            font-size: 1.2em;
            color: #444;
          }

          p {
            color: #666;
            margin: 5px 0;
          }

          button {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 8px 16px;
            font-size: 14px;
            cursor: pointer;
            border-radius: 4px;
            margin: 5px;
          }

          button:hover {
            background-color: #0056b3;
          }

          form {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            margin-top: 20px;
          }

          form h3 {
            color: #444;
            margin-bottom: 15px;
          }

          input, textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          input[type="checkbox"] {
            margin-right: 10px;
          }

          button[type="submit"] {
            background-color: #28a745;
            border: none;
          }

          button[type="submit"]:hover {
            background-color: #218838;
          }
        `}
      </style>

      <h2>Produtos</h2>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <p>Preço: R$ {produto.preco}</p>
            <p>{produto.promocao ? 'Em promoção!' : 'Preço normal'}</p>
            <button onClick={() => editarProduto(produto)}>Editar</button>
            <button onClick={() => excluirProduto(produto.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      {editandoProduto && (
        <form onSubmit={salvarEdicao}>
          <h3>Editar Produto</h3>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do Produto"
            required
          />
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
          ></textarea>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="Preço"
            step="0.01"
            required
          />
          <label>
            <input
              type="checkbox"
              checked={promocao}
              onChange={() => setPromocao(!promocao)}
            />
            Está em promoção?
          </label>
          <button type="submit">Salvar Alterações</button>
        </form>
      )}
    </div>
  );
}

export default Noticias;
