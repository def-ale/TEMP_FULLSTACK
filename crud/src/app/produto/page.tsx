import Link from "next/link"
import { Produto } from "@/types/Produto"
import { listarProdutos } from "./actions"

export default async function ListarProdutos() {
    const produtos: Produto[] = await listarProdutos();

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl mb-3">Produtos</h1>
            <Link href="/produto/inserir" className="flex text-white justify-center w-20 bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mb-2">Inserir</Link>
            
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">Código</th>
                        <th className="px-6 py-3">Nome</th>
                        <th className="px-6 py-3">Preço</th>
                        <th className="px-6 py-3">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id} className="bg-white border-b">
                            <td className="px-6 py-4">{produto.codigo}</td>
                            <td className="px-6 py-4">{produto.nome}</td>
                            <td className="px-6 py-4">R$ {produto.preco.toFixed(2)}</td>
                            <td className="px-6 py-4">
                                <Link href={`/produto/alterar/${produto.id}`} className="text-blue-600 hover:underline mr-3">Alterar</Link>
                                <Link href={`/produto/excluir/${produto.id}`} className="text-red-600 hover:underline">Excluir</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
