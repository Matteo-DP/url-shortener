import "../styles/globals.css"
import Layout from "../src/components/global/Layout"
import { AuthProvider } from "../src/contexts/AuthContext"

export default function MyApp({ Component, pageProps }) {
    return(
        <AuthProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    )
}