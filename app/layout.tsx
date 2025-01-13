import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';
import NavBar from "./components/NavBar";
import ConnectFooter from "./components/ConnectFooter";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

 export default function RootLayout(props: any) {
   const { children } = props;
   return (
     <html lang="en">
      <body>
          <AppRouterCacheProvider>
           <ThemeProvider theme={theme}>
              <NavBar/>
              {children}
              <ConnectFooter/>
           </ThemeProvider>
          </AppRouterCacheProvider>
       </body>
     </html>
   );
 }
