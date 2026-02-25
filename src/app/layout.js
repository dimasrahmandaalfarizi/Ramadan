import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import BottomNav from '@/components/BottomNav';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'MyRamadhan - Pendamping Ibadah',
  description:
    "Aplikasi pendamping ibadah Ramadhan lengkap dengan Al-Qur'an, Tracker, Jurnal, dan Jadwal Sholat secara offline.",
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/myramadhan-app-logo-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MyRamadhan',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F7FB' },
    { media: '(prefers-color-scheme: dark)', color: '#050C1A' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang='id' className='light' suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${plusJakarta.variable} ${plusJakarta.className} min-h-screen antialiased`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
        <BottomNav />
        {children}
      </body>
    </html>
  );
}
