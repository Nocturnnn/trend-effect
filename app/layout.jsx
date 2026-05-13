import "./globals.css";

const stripExtensionHydrationAttrs = `
(() => {
  const clean = () => {
    document
      .querySelectorAll("[bis_skin_checked]")
      .forEach((node) => node.removeAttribute("bis_skin_checked"));
  };

  clean();

  const observer = new MutationObserver(clean);
  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true
  });

  window.addEventListener(
    "load",
    () => {
      window.setTimeout(() => {
        clean();
        observer.disconnect();
      }, 1000);
    },
    { once: true }
  );
})();
`;

export const metadata = {
  title: "Trend Effect",
  description: "Infinite falling word image effect built with Next.js"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <script dangerouslySetInnerHTML={{ __html: stripExtensionHydrationAttrs }} />
      </body>
    </html>
  );
}
