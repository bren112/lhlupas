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
          <input type="checkbox" checked={promocao} onChange={() => setPromocao(!promocao)} />
          Está em promoção?
        </label>
        <button type="submit">Salvar Produto</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default DetalhesNoticia;
