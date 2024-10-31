import { AppProvider } from '@toolpad/core';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';

export const NAVIGATION = [
  {
    segment: 'appreciation',
    title: 'Appreciation',
    icon: <FavoriteIcon />,
  },  
];

export const BRANDING = {
  title: '',
  logo: <Image
    src="https://tvo.me/wp-content/uploads/2022/07/TVO-ME_Primary_Logo_RGB.svg"
    alt="TVO logo"
    height={38}
    width={150}
  />
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppProvider navigation={NAVIGATION} branding={BRANDING}>
            {children}
          </AppProvider>
        </AppRouterCacheProvider>     
      </body>
    </html>
  );
}
