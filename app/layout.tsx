import "./globals.css";

export const metadata = {
  title: "SmartLine",
  description: "Real-time wait times anywhere"
};

export default function RootLayout({ children }) {
  return (
    <html lang="he">
      <body>{children}</body>
    </html>
  );
}
