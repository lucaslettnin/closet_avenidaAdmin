'use client'
import { Dispatch, SetStateAction, useEffect } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import Cookies from "js-cookie"
import { ProdutoI } from "@/utils/types/produtos"

interface listaCarroProps {
  produto: ProdutoI,
  produtos: ProdutoI[],
  setProdutos: Dispatch<SetStateAction<ProdutoI[]>>
}

function ItemCarro({ produto, produtos, setProdutos }: listaCarroProps) {

  async function excluirCarro() {

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos/${produto.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const produtos2 = produtos.filter(x => x.id != produto.id)
        setProdutos(produtos2)
        alert("Carro excluído com sucesso")
      } else {
        alert("Erro... Carro não foi excluído")
      }
    }
  }

  async function alterarDestaque() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/produtos/destacar/${produto.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
      },
    )

    if (response.status == 200) {
      const produtos2 = produtos.map(x => {
        if (x.id == produto.id) {
          return { ...x, destaque: !x.destaque }
        }
        return x
      })
      setProdutos(produtos2)
    }
  }

  return (
    <tr key={produto.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={produto.foto} alt="Foto"
          style={{width: 200}} />
      </th>
      <td className={`px-6 py-4 ${produto.destaque ? "font-extrabold" : ""}`}>
        {produto.modelo}
      </td>
      <td className={`px-6 py-4 ${produto.destaque ? "font-extrabold" : ""}`}>
        {produto.descricao}
      </td>
      <td className={`px-6 py-4 ${produto.destaque ? "font-extrabold" : ""}`}>
        {Number(produto.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirCarro} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}

export default ItemCarro