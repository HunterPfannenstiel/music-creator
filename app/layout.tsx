import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MUSIC",
  description: "Make some music today",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    //icon: "donutfav.png",
  },
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="modal"></div>
        {children}
      </body>
    </html>
  );
}
