import '../styles/global.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Component {...pageProps} />
      <p>
        <a href="https://iexcloud.io" target="_blank" rel="noopener noreferrer">
          Data provided by IEX Cloud
        </a>
      </p>
    </div>
  )
}
