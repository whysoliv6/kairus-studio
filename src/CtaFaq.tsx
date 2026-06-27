import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Quanto custa contratá-lo para um projeto de design de UI / UX?',
    a: 'Nossos preços estão diretamente relacionados ao escopo do projeto, cronograma, resultados e composição da equipe. Quando o escopo não está definido ou o projeto é muito dinâmico, preferimos nos envolver com base no tempo e esforço. Neste caso, para ter um orçamento mais realista, seria importante agendarmos um bate papo. Na sequência, te daremos uma proposta detalhada depois de aprender o máximo possível sobre o seu projeto. Todas as estimativas são calculadas com base no número de horas de trabalho ou por complexidade de demandas.',
  },
  {
    q: 'Qual processo devo esperar de seu estúdio de experiência do usuário?',
    a: 'Nosso processo de UI/UX Design é fundamentado na metodologia de Design Thinking, o que nos garante flexibilidade para nos adaptarmos a diversos tipos de projetos e modelos de colaboração. Embora cada desafio de interface seja único, seguimos sempre três etapas fundamentais: 1) Descoberta e Pesquisa; 2) Estratégia e Conceitos Digitais; 3) Design UI/UX.',
  },
  {
    q: 'Você pode nos ajudar a redesenhar nosso software empresarial / B2B?',
    a: 'Com certeza! Estamos prontos para o desafio. Temos vasta experiência no atendimento a empresas de diversos setores, focando na transformação digital de softwares de negócios.',
  },
  {
    q: 'Você trabalha com startups? Caso sim, como minha empresa em estágio inicial pode pagar por você?',
    a: 'Sim, trabalhamos! Como uma agência de design UX, fazemos parceria com pequenas e grandes startups. O que pode ser melhor do que ajudar fundadores a dar vida a ideias que o mundo nunca viu antes? Gostamos de projetos que desafiam nossas habilidades e processos. A maior conquista para nós é ver nossos clientes de startups crescerem de forma exponencial. Temos propostas especiais para startups.',
  },
]

export default function CtaFaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [btnHovered, setBtnHovered] = useState(false)

  const toggle = (i: number) =>
    setActiveIndex((prev) => (prev === i ? null : i))

  return (
    <section
      className="py-20 max-[900px]:py-[60px] bg-white text-neutral-900"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-[1100px] w-full mx-auto px-5">
        <div className="grid grid-cols-[1.6fr_1fr] gap-[30px] items-stretch max-[900px]:grid-cols-1 max-[900px]:gap-[60px]">

          {/* Left — Animated gradient CTA */}
          <div
            className="c5-animated-gradient rounded-[24px] py-20 px-10 text-white flex flex-col justify-center items-center text-center"
            style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)' }}
          >
            <h2
              className="font-normal leading-[1.1] mb-[15px]"
              style={{ fontSize: '3.5rem', letterSpacing: '-0.03em' }}
            >
              Preparado para<br />transformar o UX do seu negócio?
            </h2>

            <p className="text-[0.9rem] mb-[30px] font-normal opacity-85">
              Comece mais perto do resultado
            </p>

            <button
              className="bg-neutral-900 text-white font-semibold cursor-pointer border-none text-[0.95rem] transition-all duration-200 hover:-translate-y-0.5"
              style={{
                padding: '14px 32px',
                borderRadius: '12px',
                boxShadow: btnHovered
                  ? '0 14px 30px rgba(0,0,0,0.4)'
                  : '0 10px 20px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
            >
              com quem já fez o caminho antes.
            </button>
          </div>

          {/* Right — FAQ accordion */}
          <div className="flex flex-col justify-center gap-3">
            {faqs.map((faq, i) => {
              const isActive = activeIndex === i
              return (
                <div
                  key={i}
                  onClick={() => toggle(i)}
                  className="bg-white border rounded-[10px] py-[18px] px-5 cursor-pointer transition-all duration-200 hover:border-[#eaeaea]"
                  style={{
                    borderColor: isActive ? '#eaeaea' : '#f0f0f0',
                    boxShadow: isActive
                      ? '0 4px 12px rgba(0,0,0,0.04)'
                      : '0 2px 8px rgba(0,0,0,0.02)',
                  }}
                >
                  <div className="flex justify-between items-center font-normal text-[0.9rem] text-neutral-900">
                    <span className="pr-4">{faq.q}</span>
                    {isActive
                      ? <ChevronUp size={20} className="flex-shrink-0" />
                      : <ChevronDown size={20} className="flex-shrink-0" />
                    }
                  </div>
                  {isActive && (
                    <p className="mt-3 text-[0.9rem] text-[#666] leading-[1.6]">
                      {faq.a}
                    </p>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
