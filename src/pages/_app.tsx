import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { NextPage } from "next";
import { FC, ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { AuthGuard } from "@/components";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

interface Props {
  children?: ReactNode;
}

const Noop: FC = ({ children }: Props) => <>{children}</>;

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = (Component as any).Layout || Noop;
  const requireAuth = (Component as any).requireAuth || false;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="">
          <Toaster
            position="top-center"
            reverseOrder={false}
            containerStyle={{}}
            toastOptions={{
              duration: 3000,
              style: {
                fontSize: 16,
              },
              error: {
                duration: 7000,
              },
            }}
          />
          <Layout pageProps={pageProps}>
            {requireAuth ? (
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </div>
      </PersistGate>
    </Provider>
  );
}
