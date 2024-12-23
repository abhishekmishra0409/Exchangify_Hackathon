import React from 'react'

const WhySectionCards = () => {
    const cards = [
        {
            title: "Exchange Expertise",
            content: "Trade your skills and services with ease. Whether you're a coder or a graphic designer, Xchangify makes collaboration seamless and mutually beneficial."
        },
        {
            title: "Collaboration",
            content: "Join forces with like-minded individuals to bring your ideas to life. Through teamwork and shared passion, unlock endless possibilities and achieve goals that matter."
        },
        {
            title: "Personalized Growth",
            content: "Empower your journey with tailored opportunities designed just for you. Discover pathways that align with your aspirations, turning your vision into reality and accelerating your personal and professional growth."
        }
    ]

    return (
        <div className="flex justify-center items-center gap-8">
            {cards.map((card, index) => (
                <div key={index} className="w-[370px] h-[320px] bg-[#ffffff] border-[0.5px] border-gray-100 rounded-lg p-6 flex flex-col justify-start  items-center text-center space-y-4 drop-shadow-xl">
                    <h2 className="text-2xl font-semibold ">{card.title}</h2>
                    <div className='text-gray-500 pt-9'>
                    <p>{card.content}</p>
                    </div>  
                </div>
            ))}
        </div>
    )
}

export default WhySectionCards