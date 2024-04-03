'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export default function CadastrarCadastrador() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [btnText, setBtnText] = useState('Cadastrar');

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
        }
    }, []);

    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setLogin('');
        setTipoUsuario('');

        setBtnText('Cadastrar');
    }

    const submitForm = async () => {
        setBtnText('Cadastrando...');

        const data = {
            nome: name,
            email: email,
            tipoUsuario: tipoUsuario,
            login: login,
            senha: password
        }

        try {
            const response = await fetch('https://191.252.38.35:8443/api/usuarios/salvar?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const data = await response.json();
                setBtnText('Cadastrado!');
                // console.log('Post created:', data);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        setTimeout(() => {
            clearForm();
        }, 2000);
    }

    return (

        <div className="flex flex-col justify-start items-start p-10 w-full gap-8 bg-white rounded-xl">

            <h1 className="text-3xl font-bold text-gray-800">Cadastrar Usuário</h1>

            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center justify-center w-full gap-6 px-8">
                <div className="flex flex-row w-full gap-4">
                    <input type="text" placeholder="Nome" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="E-mail" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-row w-full gap-4">
                    <input type="text" placeholder="Usuário" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={login} onChange={(e) => setLogin(e.target.value)} />
                    <input type="password" placeholder="Senha" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)} className="bg-white w-1/2 h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 text-black">
                        <option value="" disabled selected>Tipo de usuário</option>
                        <option value="administradorGeral">Administrador Geral</option>
                        <option value="cadastrador">Cadastrador</option>
                        <option value="equipe">Equipe</option>
                    </select>
                </div>
                <div className="flex flex-row justify-end w-full gap-4">
                    <button type="submit" className="flex items-center justify-center bg-primary px-8 py-2 rounded-lg">{btnText}</button>
                </div>
            </form>
        </div>
    );
}