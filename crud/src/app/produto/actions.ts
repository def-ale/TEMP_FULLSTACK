'use server'

import { abrirBd } from "@/lib/db"
import { Produto } from "@/types/Produto";
import { revalidatePath } from 'next/cache'

export async function listarProdutos() : Promise<Produto[]> {
    const db = await abrirBd();
    const produtos: Produto[] = await db.all('SELECT * FROM produto');
    await db.close();
    return produtos;
}

export async function inserirProduto(formData: FormData) {
    const db = await abrirBd();
    
    try {
        await db.run(
            'INSERT INTO produto (id, nome, codigo, preco) VALUES (?, ?, ?, ?)',
            [
                crypto.randomUUID(),
                formData.get('nome'),
                Number(formData.get('codigo')),
                Number(formData.get('preco'))
            ]
        );
        revalidatePath('/produto');
        return { success: true };
    } catch (error) {
        return { success: false, error };
    } finally {
        await db.close();
    }
}

export async function alterarProduto(id: string, formData: FormData) {
    const db = await abrirBd();
    
    try {
        await db.run(
            'UPDATE produto SET nome = ?, codigo = ?, preco = ? WHERE id = ?',
            [
                formData.get('nome'),
                Number(formData.get('codigo')),
                Number(formData.get('preco')),
                id
            ]
        );
        revalidatePath('/produto');
        return { success: true };
    } catch (error) {
        return { success: false, error };
    } finally {
        await db.close();
    }
}

export async function excluirProduto(id: string) {
    const db = await abrirBd();
    
    try {
        await db.run('DELETE FROM produto WHERE id = ?', [id])
        revalidatePath('/produto');
        return { success: true };
    } catch (error) {
        return { success: false, error };
    } finally {
        await db.close()
    }
}

export async function getProduto(id: string) : Promise<Produto | undefined> {
    const db = await abrirBd();
    try {
        const produto : Produto | undefined = await db.get('SELECT * FROM produto WHERE id = ?', [id]);
        return produto;
    } finally {
        await db.close();
    }
}
