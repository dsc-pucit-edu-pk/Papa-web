import GlobalContext from "@/store/GlobalContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContext>
      <Component {...pageProps} />
    </GlobalContext>
  );
}
