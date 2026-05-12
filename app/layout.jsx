import "./globals.css";

export const metadata = {
  title: "Trend Effect",
  description: "Infinite falling word image effect built with Next.js"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
