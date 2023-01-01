import '../styles/Home.module.css';
import '../styles/globals.css'
import '../styles/flexboxes.css'
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Component {...pageProps} />
    /*
    <SessionProvider session={session}>
      
    </SessionProvider>
  */
    )
}