import { store } from '@/redux/store';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { SessionProvider } from "next-auth/react"
import Navbar from '@/components/UI/Navbar';


export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}