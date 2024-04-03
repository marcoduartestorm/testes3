import { useEffect, useState } from "react";

export default function AvoidedEmission() {
    const [totalEmissionsAvoided, setTotalEmissionsAvoided] = useState([])

    useEffect(() => {
        getAvoidedEmissions()
    }, [])

    const emissions = [
        {
            title: 'Emissões de água Evitadas',
            value: totalEmissionsAvoided[0]?.emissoesEvitadas,
            color: 'bg-red-500'
        },
        {
            title: 'Emissões de energia Evitadas',
            value: totalEmissionsAvoided[1]?.emissoesEvitadas,
            color: 'bg-blue-400'
        },
        {
            title: 'Emissões de resíduos Evitadas',
            value: totalEmissionsAvoided[2]?.emissoesEvitadas,
            color: 'bg-green-500'
        },
        {
            title: 'Emissões de gás Evitadas',
            value: totalEmissionsAvoided[3]?.emissoesEvitadas,
            color: 'bg-gray-500'
        },
    ]

    const getAvoidedEmissions = async () => {
        const data = "projeto 1"

        try {
            const response = await fetch('https://191.252.38.35:8443/api/emissoesMensal/listarEmissoesEvitadasEspecificoPorProjeto?login=terrazul&senha=1234567', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('emissões evitadas:', data);
                setTotalEmissionsAvoided(data);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    return (
        <div className="flex flex-row w-[calc(100%/2-20px)] gap-4">
            {emissions.map((emission, i) => (
                <article key={i} className="relative flex flex-col items-start justify-center w-[calc(100%/4-10px)] pb-2 gap-4 bg-white rounded-xl">
                    <div className={`absolute top-0 ${emission.color} w-full h-4 rounded-tl-xl rounded-tr-xl`}></div>
                    <div className="relative flex flex-col items-start pt-6 px-4 justify-center gap-4">
                        <span className="text-sm font-normal text-black">{emission.title}</span>
                        <div className="flex flex-row gap-4">
                            <span className="text-lg font-medium text-black">{emission?.value} kg CO2 e</span>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}