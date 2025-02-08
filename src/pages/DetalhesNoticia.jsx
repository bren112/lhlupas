import React, { useState } from 'react';
import { supabase } from '../supabase/supabase';

function DetalhesNoticia() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState(null);
  const [promocao, setPromocao] = useState(false);
  const [mensagem, setMensagem] = useState('');

  async function uploadImagem(file) {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('lupas')
      .upload(fileName, file);

    if (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      return null;
    }

    const { data: publicUrl } = supabase.storage
      .from('lupas')
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  }

  async function salvarProduto(e) {
    e.preventDefault();
    setMensagem('');

    if (!imagem) {
      setMensagem('Selecione uma imagem.');
      return;
    }

    const imagemUrl = await uploadImagem(imagem);
    if (!imagemUrl) return;

    const { error } = await supabase.from('produtos').insert([
      {
        nome,
        descricao,
        preco,
        imagem: imagemUrl,
        promocao,
      },
    ]);

    if (error) {
      console.error('Erro ao salvar produto:', error);
      setMensagem('Erro ao cadastrar produto.');
    } else {
      setMensagem('Produto cadastrado com sucesso!');
      setNome('');
      setDescricao('');
      setPreco('');
      setImagem(null);
      setPromocao(false);
    }
  }

  return (
    <div className="detalhes-noticia">
      <style>
        {`
          .detalhes-noticia {
            font-family: 'Arial', sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          }

          h2 {
            color: #333;
            text-align: center;
            margin-bottom: 20px;
          }

          input, textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
          }

          input[type="file"] {
            padding: 5px;
          }

          label {
            display: inline-block;
            margin-bottom: 10px;
          }

          button {
            background-color: #007bff;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
          }

          button:hover {
            background-color: #0056b3;
          }

          p {
            text-align: center;
            color: green;
            font-weight: bold;
          }
        `}
      </style>

      <h2>Adicionar Novo Produto</h2>
      <form onSubmit={salvarProduto}>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        ></textarea>
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          step="0.01"
          required
        />
        <input type="file" accept="image/*" onChange={(e) => setImagem(e.target.files[0])} required />
        <label>
          Está em promoção?
          <input type="checkbox" checked={promocao} onChange={() => setPromocao(!promocao)} />

        </label>
        <button type="submit">Salvar Produto</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default DetalhesNoticia;
