import type { Metadata } from 'next';
import {
  StylexThemeProvider,
  ConfirmProvider,
  Toaster,
} from '@repo/stylex-ui'

import './globals.css';

export const metadata: Metadata = {
  title: 'Admin Portal',
  description: 'Admin portal for managing users',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StylexThemeProvider defaultBrand='emerald' defaultMode="light">
          <ConfirmProvider>
            {children}
            <Toaster position="bottom-right" />
          </ConfirmProvider>
        </StylexThemeProvider>
      </body>
    </html>
  );
}
