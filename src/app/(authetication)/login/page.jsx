'use client'
import Image from "next/image"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";


export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [btnText, setBtnText] = useState('Entrar')
    const router = useRouter();

    const { setUserData } = useAuth();



    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();


    const sendLead = async () => {
        setBtnText('Entrando...')

        const data = {
            login: username,
            senha: password,
        }

        console.log(data)

        try {
            const response = await fetch('https://calculadora.institutoterrazul.org/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Post created:', data);
                setBtnText('logado com sucesso!')
                localStorage.setItem('user', JSON.stringify(data));
                setUserData(data);
                router.push('/dashboard');
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    return (
        <section className="flex items-center justify-center relative w-full shadow-lg isolate bg-[#fefefd]">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full">
                <div className='flex flex-col items-end justify-center py-40 px-10 relative lg:w-[55%] h-screen bg-[url(/login-bg.jpg)] bg-cover bg-no-repeat after:absolute after:bg-primary/[.20] after:top-0 after:bottom-0 after:right-0 after:left-0 after:z-20'>
                    <span className="text-3xl font-normal text-white text-end z-40">Bem vindo ao <span className="font-bold">sistema Banclima</span> </span>
                    <span className="text-xl font-normal text-white text-end z-40">Entre e acesse as informações sobre o total de emissoes evitadas.</span>
                </div>
                <div className=" flex-1 flex flex-col items-center text-start gap-10 w-full py-10 px-10 lg:px-20">
                    <img
                        className="w-[180px] h-[72px]"
                        src="/assets/logo.png"
                        alt=""
                    />
                    <h1 className="text-md lg:text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Faça seu login
                    </h1>

                    <div className="flex flex-col items-center justify-start gap-x-8 w-full lg:px-10 2xl:px-20">
                        <form onSubmit={handleSubmit(sendLead)} className="flex flex-col items-center justify-center w-full gap-6 2xl:px-8">
                            <input type="text" placeholder="Usuário" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={username} onChange={e => setUsername(e.target.value)} />
                            <input type="password" placeholder="Senha" name="" id="" className="bg-white w-full h-11 rounded-lg focus:outline-none border border-gray-700/45 p-3 py-4 text-black" value={password} onChange={e => setPassword(e.target.value)} />
                            <button type="submit" className=" w-full bg-[#019BD6] hover:bg-blue-400 rounded-lg p-3 text-lg font-bold text-white">{btnText}</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}