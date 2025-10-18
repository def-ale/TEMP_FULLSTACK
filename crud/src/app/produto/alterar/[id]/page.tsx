'use client'

import { Produto } from "@/types/Produto"
import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { alterarProduto, getProduto } from '../../actions'

export default function AlterarProduto(props: PageProps<'/produto/alterar/[id]'>) {
    const router = useRouter();
    const [produto, setProduto] = useState<Produto | undefined>(undefined);
    const { id } = use(props.params);

    useEffect(() => {
        getProduto(id).then(data => setProduto(data));
    }, [id])

    if (!produto) return <div>Carregando...</div>;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        alterarProduto(id, formData)
            .then(result => {
                if (result.success) {
                    router.push('/produto')
                } else {
                    console.error('Erro ao alterar produto:', result.error)
                }
            });
    }

    return (
        <div>
            <h1 className="text-3xl mb-2">Alterar Produto</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="codigo" className="block mb-2 text-sm font-medium">Código</label>
                        <input 
                            type="number"
                            id="codigo"
                            name="codigo"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                            defaultValue={produto.codigo}
                        />
                    </div>
                    <div>
                        <label htmlFor="nome" className="block mb-2 text-sm font-medium">Nome</label>
                        <input 
                            type="text"
                            id="nome"
                            name="nome"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                            defaultValue={produto.nome}
                        />
                    </div>
                    <div>
                        <label htmlFor="preco" className="block mb-2 text-sm font-medium">Preço</label>
                        <input 
                            type="number"
                            step="0.01"
                            id="preco"
                            name="preco"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                            defaultValue={produto.preco}
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <button type="submit" className="text-white bg-blue-700 rounded-lg px-5 py-2.5">Salvar</button>
                    <Link href="/produto" className="text-black bg-gray-300 rounded-lg px-5 py-2.5">Cancelar</Link>
                </div>
            </form>
        </div>
    )
}