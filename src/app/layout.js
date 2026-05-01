import { gotham } from "@/fonts/gotham";
import "./globals.css";
import Footer from "./footer";

const metadata = {
  title: "GROTESK | OFFICIAL WEBSITE",
  description: "GROTESK | OFFICIAL WEBSITE",
};

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>GROTESK | OFFICIAL WEBSITE</title>
      </head>
      <body className={gotham.variable}>
        {children}
        <div style={{ position: "relative", zIndex: 1000 }}>
          <Footer />
        </div>
      </body>
    </html>
  );
}
