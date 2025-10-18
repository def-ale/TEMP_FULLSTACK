import Aluno from "@/types/Aluno";

const baseUrl = 'http://localhost:3005/alunos';

export async function getAlunos() : Promise<Aluno[]> {
    const req = await fetch(`${baseUrl}`);
    const objeto = await req.json();
    return objeto as Aluno[];
}

export async function getAluno(id: string) : Promise<Aluno | null> {
    const req = await fetch(`${baseUrl}/${id}`);
    const objeto = await req.json();
    return objeto as Aluno;
}

export async function insertAluno(objeto: Aluno) {
    const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...objeto, id: undefined}),
    });
    return response;
}

export async function updateAluno(objeto: Aluno) {
    const response = await fetch(`${baseUrl}/${objeto.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objeto),
    });
    return response;
};

export async function deleteAluno(id: string) {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    });
    return response;
}
