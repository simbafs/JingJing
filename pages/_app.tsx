import '../styles/style.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>晶晶體產生器</title>
				<meta name="description" content="晶晶體產生器 JingJing Generator" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
