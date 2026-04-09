import "./globals.css";

export const metadata = {
  title: "AI Visual Workflow Editor",
  description: "Designed for orchestrating skills and agents in a drag & drop canvas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased flex flex-col h-screen w-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
