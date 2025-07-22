import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load fonts with better loading strategy
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

// Metadata with custom favicon paths
export const metadata: Metadata = {
  title: {
    default: "SecureSight ",
    template: "%s | SecureSight",
  },
  description:
    "Real-time 3D monitoring and incident tracking dashboard for security operations",
  keywords: [
    "security",
    "dashboard",
    "monitoring",
    "incident management",
    "3D visualization",
  ],
  icons: {
    icon: "/favicon/icons8-bullet-camera-ios-17-filled-32.png", // Main favicon
    shortcut: "/favicon/icons8-bullet-camera-ios-17-filled-16.png",
    apple: "/favicon/icons8-bullet-camera-ios-17-filled-70.png", // Or 72/96 as needed
  },
  themeColor: "#0d0d0d",
  openGraph: {
    type: "website",
    url: "https://securesight.example.com",
    title: "SecureSight Dashboard",
    description: "Real-time 3D monitoring and incident tracking dashboard",
    siteName: "SecureSight",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to font services for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Optional: Add explicit link tags for more sizes */}
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/icons8-bullet-camera-ios-17-filled-16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/icons8-bullet-camera-ios-17-filled-32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/favicon/icons8-bullet-camera-ios-17-filled-72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="96x96"
          href="/favicon/icons8-bullet-camera-ios-17-filled-96.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-br from-gray-900 to-black text-white antialiased`}
      >
        <main className="min-h-screen flex flex-col">{children}</main>

        {/* Optional global loading indicator */}
        <div
          id="global-loader"
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 opacity-0 pointer-events-none transition-opacity"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </body>
    </html>
  );
}
