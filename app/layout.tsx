import "./globals.css";

export const metadata = {
  title: "SmartLine",
  description: "Real-time wait times anywhere"
};

export default function RootLayout({ children }) {
  return (
    <html lang="he">
      <body>

        {/* Google Maps API */}
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=visualization`}
          async
        ></script>

        {children}
      </body>
    </html>
  );
}
