import { gotham } from "@/fonts/gotham";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={gotham.variable}>{children}</body>
    </html>
  );
}
