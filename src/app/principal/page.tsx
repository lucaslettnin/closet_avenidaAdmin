'use client';

import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface AvaliacoesPorProdutoI {
  produto: string;
  numAvaliacoes: number;
}

interface GeralDadosI {
  clientes: number;
  produtos: number;
  avaliacoes: number;
}

// type DataRow = [string, number, string];

export default function Principal() {
  const [avaliacoesPorProduto, setAvaliacoesPorProduto] = useState<AvaliacoesPorProdutoI[]>([]);
  const [dados, setDados] = useState<GeralDadosI>({
    clientes: 0,
    produtos: 0,
    avaliacoes: 0,
  });

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch("http://localhost:3004/dashboard/gerais");
      const dados = await response.json();
      setDados(dados);
    }
    getDadosGerais();

    async function getDadosGrafico() {
      const response = await fetch("http://localhost:3004/dashboard/avaliacoesPorProduto");
      const dados = await response.json();
      setAvaliacoesPorProduto(dados);
    }
    getDadosGrafico();
  }, []);

  type DataRow = [string, number, { role: "style" } | string];

const data: DataRow[] = [
  ["Produto", 0, { role: "style" }], 
];

const cores = [
  "red",
  "blue",
  "violet",
  "green",
  "gold",
  "cyan",
  "chocolate",
  "purple",
];

avaliacoesPorProduto.forEach((avaliacao, index) => {
  data.push([avaliacao.produto, avaliacao.numAvaliacoes, cores[index % cores.length]]);
});

  

  return (
    <div className="container">
      <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-blue-600 border rounded p-6">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold">
            {dados.clientes}
          </span>
          <p className="font-bold mt-2 text-center">Nº Clientes</p>
        </div>
        <div className="border-red-600 border rounded p-6">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold">
            {dados.produtos}
          </span>
          <p className="font-bold mt-2 text-center">Nº Produtos</p>
        </div>
        <div className="border-green-600 border rounded p-6">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold">
            {dados.avaliacoes}
          </span>
          <p className="font-bold mt-2 text-center">Nº Avaliações</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-4">
        Gráfico: Nº de Avaliações por Produto
      </h2>
      <Chart chartType="ColumnChart" width="95%" height="380px" data={data} />
    </div>
  );
}
