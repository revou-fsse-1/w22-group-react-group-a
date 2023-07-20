import { AppProps } from "next/app";
import PrivateRoute from "@/components/PrivateRoute";
import "tailwindcss/tailwind.css";
import '@/styles/globals.css'


const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <PrivateRoute>
      <Component {...pageProps} />
    </PrivateRoute>
  );
};

export default App;
