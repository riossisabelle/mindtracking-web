"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Send } from "lucide-react";

interface Message {
    id: string;
    content: string;
    sender: "user" | "athena";
    timestamp: Date;
}

export default function Athena() {
    const { theme } = useTheme();
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const chatCarouselRef = useRef<HTMLDivElement>(null);

    // Mensagens sugeridas
    const suggestedMessages = [
        "O que posso fazer para me sentir melhor hoje?",
        "Estou me sentindo muito sobrecarregado hoje...",
        "Estou precisando de algo para me animar",
        "Como posso melhorar minha rotina de sono?",
        "Quais exercícios posso fazer para relaxar?",
        "Como lidar com a ansiedade no trabalho?"
    ];

    // Respostas simuladas da Athena
    const athenaResponses = {
        "O que posso fazer para me sentir melhor hoje?": "Que bom que você está buscando se sentir melhor! 😊 Algumas coisas que podem ajudar: fazer uma caminhada ao ar livre, praticar respiração profunda, ouvir uma música que você gosta, ou até mesmo fazer algo pequeno que te dê prazer. O que mais ressoa com você neste momento?",
        "Estou me sentindo muito sobrecarregado hoje...": "Entendo como é difícil quando nos sentimos sobrecarregados. 💙 É importante reconhecer esses sentimentos. Que tal tentarmos dividir suas tarefas em pequenos passos? Às vezes, organizar as prioridades e fazer uma coisa de cada vez pode aliviar essa sensação. O que está pesando mais em sua mente hoje?",
        "Estou precisando de algo para me animar": "Compreendo perfeitamente! ✨ Às vezes precisamos de um empurrãozinho para levantar o astral. Algumas ideias: assistir algo engraçado, conversar com alguém querido, fazer uma atividade criativa, ou praticar gratidão listando 3 coisas boas do seu dia. O que costuma funcionar para você?",
        "Como posso melhorar minha rotina de sono?": "O sono é fundamental para nosso bem-estar! 🌙 Algumas dicas que podem ajudar: estabelecer um horário regular para dormir e acordar, evitar telas 1 hora antes de dormir, criar um ambiente escuro e fresco, e talvez uma rotina relaxante como leitura ou meditação. Como está sua rotina atual de sono?",
        "Quais exercícios posso fazer para relaxar?": "Exercícios de relaxamento são ótimos para o bem-estar! 🧘‍♀️ Você pode tentar: respiração 4-7-8 (inspire por 4, segure por 7, expire por 8), relaxamento muscular progressivo, meditação guiada, yoga suave, ou apenas uma caminhada tranquila. Já tentou alguma dessas técnicas antes?",
        "Como lidar com a ansiedade no trabalho?": "A ansiedade no trabalho é muito comum, você não está sozinho(a). 💪 Algumas estratégias: fazer pausas regulares, praticar respiração consciente, organizar tarefas por prioridade, conversar com colegas de confiança, e lembrar que você já superou desafios antes. O que mais te deixa ansioso(a) no ambiente de trabalho?",
        "default": "Obrigada por compartilhar isso comigo. Estou aqui para te ouvir e apoiar. Como posso ajudar você a lidar com essa situação? Lembre-se de que cada passo, mesmo pequeno, é importante em sua jornada de bem-estar. 💙"
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Função para scroll horizontal com arrastar
    const setupHorizontalScroll = (element: HTMLDivElement | null) => {
        if (!element) return;
        
        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        const handleMouseDown = (e: MouseEvent) => {
            isDown = true;
            element.style.cursor = 'grabbing';
            startX = e.pageX - element.offsetLeft;
            scrollLeft = element.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            element.style.cursor = 'grab';
        };

        const handleMouseUp = () => {
            isDown = false;
            element.style.cursor = 'grab';
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - element.offsetLeft;
            const walk = (x - startX) * 2; // Velocidade do scroll
            element.scrollLeft = scrollLeft - walk;
        };

        element.addEventListener('mousedown', handleMouseDown);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mouseup', handleMouseUp);
        element.addEventListener('mousemove', handleMouseMove);
        element.style.cursor = 'grab';

        // Cleanup function
        return () => {
            element.removeEventListener('mousedown', handleMouseDown);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('mouseup', handleMouseUp);
            element.removeEventListener('mousemove', handleMouseMove);
        };
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Setup scroll apenas para carrossel do chat (quando há mensagens)
        if (messages.length > 0) {
            const cleanupChatCarousel = setupHorizontalScroll(chatCarouselRef.current);
            return cleanupChatCarousel;
        }
    }, [messages.length]); // Re-setup quando mensagens mudam

    const simulateAthenaResponse = (userMessage: string) => {
        setIsTyping(true);
        
        setTimeout(() => {
            const response = athenaResponses[userMessage as keyof typeof athenaResponses] || athenaResponses.default;
            
            const athenaMessage: Message = {
                id: Date.now().toString() + "_athena",
                content: response,
                sender: "athena",
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, athenaMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSuggestedMessageClick = (message: string) => {
        setInputValue(message);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const userMessage: Message = {
                id: Date.now().toString(),
                content: inputValue.trim(),
                sender: "user",
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, userMessage]);
            simulateAthenaResponse(inputValue.trim());
            setInputValue("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className={`w-full h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            {/* Área das Mensagens - Scroll Independente */}
            <div className="flex-1 mt-10 overflow-hidden pt-20 lg:pt-4">
                <div className="h-full overflow-y-auto p-2 sm:p-4" ref={chatContainerRef}>
                {messages.length === 0 ? (
                    /* Tela Inicial */
                    <div className="flex flex-col lg:flex-row items-center justify-center h-full gap-4 lg:gap-8 px-4">
                        {/* Lado esquerdo - Imagem */}
                        <div className="flex-shrink-0 order-1 lg:order-none">
                            <Image 
                                src="/images/AthenaAcenando.png" 
                                alt="Athena" 
                                width={200} 
                                height={150} 
                                className="hidden md:flex md:w-36"
                            />
                        </div>
                        
                        {/* Lado direito - Conteúdo */}
                        <div className="flex-1 max-w-2xl order-2 lg:order-none text-center lg:text-left">
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">Bem-vindo(a) ao Chat com Athena!</h2>
                            <p className="text-sm sm:text-base mb-2 sm:mb-3">Eu sou a Athena, uma IA criada para ajudar você a refletir sobre seu bem-estar emocional e hábitos de vida.</p>
                            <p className="text-sm sm:text-base mb-4 sm:mb-6">Podemos conversar sobre seus sentimentos, desafios, metas e juntos podemos dar os primeiros passos para uma vida mais leve.</p>
                            
                            {/* Mensagens Sugeridas */}
                            <div>
                                <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3">Sugestões para começar:</h3>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center lg:justify-start">
                                    {suggestedMessages.map((message, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestedMessageClick(message)}
                                            className={`
                                                px-2 py-1.5 sm:px-3 sm:py-2 rounded-full border-2 text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105
                                                ${theme === "dark" 
                                                    ? "border-blue-500 text-slate-50 hover:bg-blue-500 hover:text-white" 
                                                    : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                                                }
                                            `}
                                        >
                                            {message}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Chat com Mensagens */
                    <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 px-2 sm:px-0">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`
                                        max-w-[85%] sm:max-w-xs lg:max-w-md px-2.5 py-2 sm:px-3 sm:py-2 rounded-2xl
                                        ${message.sender === "user"
                                            ? "bg-blue-600 text-white"
                                            : theme === "dark"
                                                ? "bg-gray-700 text-white"
                                                : "bg-gray-100 text-gray-900"
                                        }
                                    `}
                                >
                                    {message.sender === "athena" && (
                                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                                            <span className="text-xs font-semibold">Athena</span>
                                        </div>
                                    )}
                                    <p className="text-xs sm:text-sm leading-relaxed">{message.content}</p>
                                    <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                        {message.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        
                        {/* Indicador de digitação */}
                        {isTyping && (
                            <div className="flex justify-start px-2 sm:px-0">
                                <div className={`px-2.5 py-2 sm:px-3 sm:py-2 rounded-2xl ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                                        <span className="text-xs font-semibold">Athena</span>
                                    </div>
                                    <div className="flex space-x-1">
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>
            </div>

            {/* Input de Mensagem - Fixo na parte inferior */}
            <div className={`flex-shrink-0 p-2 sm:p-4 pb-4 lg:pb-4 `}>
                <div className="max-w-4xl mx-auto">
                    {/* Carrossel de mensagens sugeridas durante o chat */}
                    {messages.length > 0 && (
                        <div className="mb-2 sm:mb-3">
                            <div 
                                ref={chatCarouselRef}
                                className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-2 select-none"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {suggestedMessages.map((message, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestedMessageClick(message)}
                                        className={`
                                            flex-shrink-0 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border text-xs font-medium transition-all duration-200 hover:scale-105 pointer-events-auto
                                            ${theme === "dark" 
                                                ? "border-blue-500 text-slate-50 hover:bg-blue-500 hover:text-white" 
                                                : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                                            }
                                        `}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    >
                                        {message}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="relative">
                        <input 
                            className={`
                                w-full font-semibold px-3 py-2.5 pr-12 sm:px-5 sm:py-3 sm:pr-14 rounded-4xl border-2 border-blue-600 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base
                                ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
                            `}
                            type="text" 
                            placeholder="Compartilhe o que está acontecendo agora..."
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 sm:p-2.5 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!inputValue.trim() || isTyping}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    
                    <p className={`text-center text-xs mt-1.5 sm:mt-2 px-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        A Athena está aqui para conversar e orientar, mas nada substitui o cuidado de um psicólogo ou psiquiatra.
                    </p>
                </div>
            </div>
        </div>
    );
}