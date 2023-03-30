import { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { useRouter } from 'next/router'

import classNames from 'classnames'
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use'

const poppins = Poppins({ subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })

export default function ThankYou() {
  const [showConfetti, setShowConfetti] = useState(false);

  const router = useRouter()
  const { width, height } = useWindowSize()

  const { name } = router.query

  useEffect(() => {
    setShowConfetti(true);
  }, [])

  return (
    <>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={300}
        colors={['#c667e0', '#252525', '#fada89', '#e7aaf8', '#467cd0']}
        run={showConfetti}
      />

      <Head>
        <title>Obrigado!</title>
        <meta name="description" content="E-book gratuito 17 sinais que o corpo dá antes de uma crise de ansiedade" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-1 flex-col bg-background gap-16 md:gap-0 px-8 md:px-0 pb-16 md:pb-0'>
        <section className='flex flex-1 flex-col md:min-h-screen items-center justify-center gap-10 pt-6 md:pt-0'>
          <div className='flex flex-col gap-4 md:gap-2 items-center justify-center'>
            <h1 className={classNames('font-extrabold text-2xl md:text-4xl text-black md:text-center md:w-[800px]', poppins.className)}>
              Sucesso, {name}!
            </h1>

            <h2 className={classNames('md:text-lg md:text-center text-zinc-500 text-center', poppins.className)}>
              Já deve ter chegado um e-mail com o link para baixar seu e-book. 💜
            </h2>
          </div>

          <Image
            className={'rounded-full'}
            src="/iheart.png"
            alt="iheart logo"
            width={150}
            height={150}
          />

          <p className={classNames('max-w-lg text-darkGray font-light leading-relaxed md:text-lg text-center', poppins.className)}>
            Se não receber, verifique sua caixa de spam ou entre em contato comigo pelo
            <a href="mailto:iheart.oficial.brasil@gmail.com" className="text-primary underline ml-1">
              e-mail da iHeart
            </a>
            .
          </p>
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