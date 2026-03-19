import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppChat from "./components/WhatsAppChat";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from 'next-themes';
import Script from 'next/script';

// Avoid fetching Google Fonts at runtime in dev (network flakiness can crash the server).
// Use an empty placeholder class; keep font setup in CSS or add local fonts if needed.
const cairo = { className: '' };

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  title: process.env.NEXT_PUBLIC_COMPANY_NAME || "Najm Rush Contracting",
  description: process.env.NEXT_PUBLIC_COMPANY_DESCRIPTION || "شركة نجم راش للمقاولات",
  manifest: '/manifest.json',
  keywords: ["مقاولات", "بناء", "تشييد", "نجم راش", "السعودية", "تصميم داخلي", "ترميم", "هندسة"],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className="scroll-smooth">
      <body className={`${cairo.className} min-h-screen flex flex-col relative`} style={{ backgroundImage: "url('/images/about.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
            <ErrorBoundary>
              <Navbar />
              <main className="flex-grow pt-20 md:pt-24">{children}</main>
              <Footer />
              <WhatsAppChat />
            </ErrorBoundary>
          </ThemeProvider>
        </div>

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}