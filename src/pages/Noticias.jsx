import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import './Noticias.css';

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
