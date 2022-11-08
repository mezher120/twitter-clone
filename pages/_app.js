import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'  // para agarrar toda la app con la session de google

function MyApp({ Component, pageProps: {session, ...pageProps} }) {  // le paso aa la pageProps, la session ademas la copia de las pageProps
  return (
    <SessionProvider session={session}> 

      <Component {...pageProps} />

    </SessionProvider>

  )
}

export default MyApp
