import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'  // para agarrar toda la app con la session de google
import { RecoilRoot } from 'recoil'  // para utilizar recoil para estados globales

function MyApp({ Component, pageProps: {session, ...pageProps} }) {  // le paso aa la pageProps, la session ademas la copia de las pageProps
  return (
    <SessionProvider session={session}> 
      <RecoilRoot>

      <Component {...pageProps} />
      </RecoilRoot>

    </SessionProvider>

  )
}

export default MyApp
