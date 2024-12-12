'use client';
import { Dispatch, SetStateAction } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import Cookies from "js-cookie";
import { AvaliacaoI } from "@/utils/types/avaliacoes";

interface listaAvaliacaoProps {
  avaliacao: AvaliacaoI;
  avaliacoes: AvaliacaoI[];
  setAvaliacoes: Dispatch<SetStateAction<AvaliacaoI[]>>;
}

function ItemAvaliacao({ avaliacao, avaliacoes, setAvaliacoes }: listaAvaliacaoProps) {

  async function excluirAvaliacao() {
    if (confirm(`Confirma exclusão da avaliação "${avaliacao.comentario}"?`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacoes/${avaliacao.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + (Cookies.get("admin_logado_token") as string),
        },
      });

      if (response.status === 200) {
        const avaliacoesAtualizadas = avaliacoes.filter(x => x.id !== avaliacao.id);
        setAvaliacoes(avaliacoesAtualizadas);
        alert("Avaliação excluída com sucesso.");
      } else {
        alert("Erro... Avaliação não foi excluída.");
      }
    }
  }

  async function responderAvaliacao() {
    const resposta = prompt(`Resposta para avaliação: "${avaliacao.comentario}"`);

    if (!resposta || resposta.trim() === "") {
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/avaliacoes/${avaliacao.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + (Cookies.get("admin_logado_token") as string),
      },
      body: JSON.stringify({ resposta }),
    });

    if (response.status === 200) {
      const avaliacoesAtualizadas = avaliacoes.map(x => {
        if (x.id === avaliacao.id) {
          return { ...x, resposta };
        }
        return x;
      });
      setAvaliacoes(avaliacoesAtualizadas);
    }
  }

  return (
    <tr key={avaliacao.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={avaliacao.produto.foto} alt="Foto do Produto" style={{ width: 200 }} />
      </th>
      <td className="px-6 py-4">
        {avaliacao.produto.modelo}
      </td>
      <td className="px-6 py-4">
        {Number(avaliacao.produto.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        {avaliacao.cliente.nome}
      </td>
      <td className="px-6 py-4">
        {avaliacao.comentario}
      </td>
      <td className="px-6 py-4">
        {avaliacao.resposta}
      </td>
      <td className="px-6 py-4">
        {avaliacao.resposta ? (
          <img src="/ok.png" alt="Ok" style={{ width: 60 }} />
        ) : (
          <>
            <TiDeleteOutline
              className="text-3xl text-red-600 inline-block cursor-pointer"
              title="Excluir"
              onClick={excluirAvaliacao}
            />
            &nbsp;
            <FaRegEdit
              className="text-3xl text-yellow-600 inline-block cursor-pointer"
              title="Responder"
              onClick={responderAvaliacao}
            />
          </>
        )}
      </td>
    </tr>
  );
}

export default ItemAvaliacao;
