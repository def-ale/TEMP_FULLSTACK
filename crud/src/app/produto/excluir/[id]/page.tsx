'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { excluirProduto, getProduto } from '../../actions'
import { Produto } from '@/types/Produto'

export default function ExcluirProduto(props: PageProps<'/produto/excluir/[id]'>) {
    const router = useRouter()
    const [produto, setProduto] = useState<Produto | undefined>(undefined)
    const { id } = use(props.params)

    useEffect(() => {
        getProduto(id).then(data => setProduto(data))
    }, [id])

    if (!produto) return <div>Carregando...</div>

    function handleExcluir() {
        excluirProduto(id)
            .then(result => {
                if (result.success) {
                    router.push('/produto')
                } else {
                    console.error('Erro ao excluir produto:', result.error)
                }
            })
    }

    return (
        <div>
            <h1 className="text-3xl mb-2">Excluir Produto</h1>
            <p className="mb-4">Tem certeza que deseja excluir o produto {produto.nome}?</p>
            <div className="flex gap-2">
                <button 
                    onClick={handleExcluir} 
                    className="text-white bg-red-700 rounded-lg px-5 py-2.5">
                    Excluir
                </button>
                <Link 
                    href="/produto" 
                    className="text-black bg-gray-300 rounded-lg px-5 py-2.5">
                    Cancelar
                </Link>
            </div>
        </div>
    )
}
