import { useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { useRouter } from 'next/router'

import classNames from 'classnames'
import emailjs from '@emailjs/browser'

import Button from '@/components/Button'
import { EBOOK_URL, PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } from '@/consts'

const poppins = Poppins({ subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })

export default function Home() {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const router = useRouter()

  const scrollToFormSection = () => {
    const section = document.getElementById('formSection');
    section?.scrollIntoView({ behavior: 'smooth' });
  }

  const sendToFormspree = async ({ name, email }: { name: FormDataEntryValue | null, email: FormDataEntryValue | null }) => {
    try {
      await fetch('https://formspree.io/f/xyyanwno', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
        }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleSendMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsButtonEnabled(true)

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('name');
    const email = formData.get('email');

    const templateParams = {
      from_name: name,
      to_name: name,
      attachment: EBOOK_URL,
      to_email: email,
    }

    try {
      await sendToFormspree({ name, email })

      const response = await emailjs.send(
        SERVICE_ID as string,
        TEMPLATE_ID as string,
        templateParams, PUBLIC_KEY
      )

      if (response.status === 200) {
        console.log('SUCCESS!');

        router.push({
          pathname: '/thankyou',
          query: { name: name as string },
        })
      }
    } catch (error) {
      console.error(error)
    }

    setIsButtonEnabled(false)
  }

  return (
    <>
      <Head>
        <title>iHeart E-book Gratuito</title>
        <meta name="description" content="E-book gratuito 17 sinais que o corpo dá antes de uma crise de ansiedade" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-1 flex-col bg-background gap-16 md:gap-0 px-8 md:px-0 pb-16 md:pb-0'>
        <section className='flex flex-1 flex-col md:min-h-screen items-center justify-center gap-10 md:gap-16 pt-6 md:pt-0'>
          <div className='flex flex-col gap-4 md:gap-2 items-center justify-center'>
            <h1 className={classNames('font-extrabold text-2xl md:text-4xl text-black md:text-center md:w-[800px]', poppins.className)}>
              Identifique os sinais de ansiedade antes que seja tarde demais!
            </h1>

            <h2 className={classNames('md:text-lg md:text-center text-zinc-500', poppins.className)}>
              Descubra como controlar sua ansiedade e viver uma vida plena.
            </h2>
          </div>

          <div className='flex flex-col md:flex-row gap-5 md:gap-40 items-center'>
            <div className='flex flex-col gap-5 md:max-w-lg'>
              <h2 className={classNames('font-bold md:text-2xl text-zinc-900', poppins.className)}>
                O que você aprenderá com esse e-book:
              </h2>
              <ol className='flex flex-col gap-3 leading-relaxed'>
                <li className={classNames('text-darkGray font-light md:text-lg', poppins.className)}>
                  <span className='text-primary font-medium'>1.</span> Perceber uma certa irregularidade em seu sono antes de um transtorno de ansiedade.
                </li>
                <li className={classNames('text-darkGray font-light md:text-lg', poppins.className)}>
                  <span className='text-primary font-medium'>2.</span> Compreender como a ansiedade eleva a produção de hormônios e como isso afeta o sono.
                </li>
                <li className={classNames('text-darkGray font-light md:text-lg', poppins.className)}>
                  <span className='text-primary font-medium'>3.</span> Identificar se você está revivendo traumas e problemas do passado e como isso pode indicar a chegada de uma crise de ansiedade.
                </li>
                <li className={classNames('text-darkGray font-light md:text-lg', poppins.className)}>
                  <span className='text-primary font-medium'>4.</span> Reduzir os pensamentos pessimistas e a preocupação excessiva, que mantém seu corpo em estado de alerta.
                </li>
                <li className={classNames('text-darkGray font-light md:text-lg', poppins.className)}>
                  <span className='text-primary font-medium'>5.</span> Enfrentar a dificuldade de se concentrar em suas tarefas quando estiver em estado de constante alerta.
                </li>
              </ol>
            </div>

            <div className='flex'>
              <Image
                className={'rounded-md shadow-lg shadow-[#467cd0]'}
                src="/book.png"
                alt="e-book logo"
                width={300}
                height={100}
              />
            </div>
          </div>

          <Button
            text='Quero meu e-book gratuito agora!'
            onClick={scrollToFormSection}
            poppinsClassName={poppins.className}
          />
        </section>

        <section id="formSection" className='flex flex-1 flex-col min-h-screen items-center justify-center gap-10 md:gap-16'>
          <div className='flex flex-col gap-2 items-center justify-center'>
            <h1 className={classNames('font-extrabold text-2xl md:text-4xl text-black md:text-center md:w-[800px]', poppins.className)}>
              Mantenha sua ansiedade sob controle com nosso guia completo
            </h1>
            <h2 className={classNames('md:text-lg md:text-center text-zinc-500 md:w-[600px]', poppins.className)}>
              Inscreva-se agora para receber nosso guia gratuito
              e aprenda a lidar com a ansiedade em diferentes situações.
            </h2>
          </div>
          <div className='flex flex-col md:w-[380px] md:h-[300px] bg-secondary p-6 rounded-md'>
            <form action="#" onSubmit={handleSendMail} method="POST" className='flex flex-col gap-5'>
              <span className='flex flex-col gap-2'>
                <label htmlFor="name" className={classNames('font-semibold text-black', poppins.className)}>Seu nome</label>
                <input type="text" required minLength={3} name="name" id="name" className='rounded-md h-10 px-2' />
              </span>

              <span className='flex flex-col gap-2'>
                <label htmlFor="email" className={classNames('font-semibold text-black', poppins.className)}>Seu melhor e-mail</label>
                <input type="email" required name="email" id="email" className='rounded-md h-10 px-2' />
              </span>

              <Button
                type="submit"
                text='Quero meu e-book gratuito agora!'
                disabled={isButtonEnabled}
                onClick={scrollToFormSection}
                poppinsClassName={poppins.className}
              />
            </form>
          </div>
        </section>

        <section id="formSection" className='flex flex-1 flex-col md:min-h-screen items-center justify-center gap-6 md:gap-16'>
          <h1 className={classNames('font-extrabold text-2xl md:text-4xl text-black text-start md:text-center', poppins.className)}>
            Uma iniciativa <span className='text-primary'>iHeart</span>
          </h1>

          <div className='flex flex-col md:flex-row gap-8 md:gap-20 md:items-center'>
            <p className={classNames('max-w-lg text-darkGray font-light leading-relaxed md:text-lg', poppins.className)}>
              Oie! Eu sou a Ju. Sou formada na área da saúde e sempre me interessei por questões de saúde mental.
              <br />Sabe aqueles momentos em que parece que a vida está difícil demais?
              Eu já passei por isso também e sei o quanto pode ser difícil encontrar ajuda quando estamos lidando com
              ansiedade, medo ou outras emoções que nos atrapalham.
              <br /><br />Por isso, decidi compartilhar meus conhecimentos e experiências com vocês através do livro que estou divulgando.
              Quero que vocês saibam que não estão sozinhos e que é possível vencer a ansiedade,
              mesmo quando tudo parece desafiador.
              Vamos juntos nessa jornada de autocuidado e crescimento pessoal!
            </p>

            <div className='flex items-center justify-center'>
              <Image
                className={'relative rounded-full'}
                src="/ju.png"
                alt="iheart logo"
                width={300}
                height={300}
              />
            </div>
          </div>

          <Button
            type="submit"
            text='Quero meu e-book gratuito agora!'
            onClick={scrollToFormSection}
            poppinsClassName={poppins.className}
          />

        </section>
      </main>

      <footer className='flex bg-black h-11 items-center justify-center'>
        <p className={classNames('text-white text-center flex-1', poppins.className)}>
          © {new Date().getFullYear()} iHeart
        </p>

        <a href="https://www.instagram.com/iheartoficial/" target="_blank" rel="noreferrer" className='absolute right-0 '>
          <Image
            className='mr-6'
            src="/instagram-logo-fill.svg"
            alt="instagram logo"
            width={30}
            height={30}
          />
        </a>
      </footer>
    </>
  )
}
