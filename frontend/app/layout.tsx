import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';
import NavBar from "./components/NavBar";
import ConnectFooter from "./components/ConnectFooter";
import { CareLabelDataProvider } from './context/CareEditorContext';
import { AuthProvider } from './context/AuthContext';

 export default function RootLayout(props: any) {
   const { children } = props;
   return (
     <html lang="en">
      <body>
        <AuthProvider>
          <CareLabelDataProvider>
            <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <NavBar/>
                {children}
                <ConnectFooter/>
            </ThemeProvider>
            </AppRouterCacheProvider>
            </CareLabelDataProvider>
          </AuthProvider>
       </body>
     </html>
   );
 }
