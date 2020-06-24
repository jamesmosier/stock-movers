export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <p>
        <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
      </p>
    </>
  )
}
