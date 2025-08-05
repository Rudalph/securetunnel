import { Space_Grotesk } from "next/font/google";
import "./globals.css";


const spacegrotesk = Space_Grotesk({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Secure Tunnel",
  description: "Communication sealed with digital signatures",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={spacegrotesk.className}
      >
        {children}
      </body>
    </html>
  );
}
