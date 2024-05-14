import "@/styles/globals.css"
import { DM_Sans, Public_Sans, Montserrat, Poppins, Sora } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import localFont from 'next/font/local'
import "@/components/globals.css";

import { cn } from "@/lib/utils"
import LayoutDesign from "@/components/sketches/layout_design";

import { cookies, headers } from 'next/headers'

const theseasons = localFont({
  src: "../../components/theseasonsfont/regular.otf",
  display: 'swap',
  variable: "--font-theseasons"
})

const dmsans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dmsans',
});

const publicsans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-publicsans',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-montserrat',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-poppins',
});

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  let font_string = 
  `
    ${dmsans.variable}
    ${publicsans.variable}
    ${montserrat.variable}  
    ${poppins.variable}
    ${sora.variable}
    ${theseasons.variable}
  `

  let user = JSON.parse(headers().get("userinfo"));

  if (user.role != "Guest") {
    if (user.picUrl[0] == "/") {
      user.picUrl = process.env.SELFADDR + "/_next/image?url=" + user.picUrl + "&w=1920&q=100";
    }
  }
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={"min-h-screen relative bg-background font-sans antialiased" + font_string}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <LayoutDesign user={user}>
          { children }
            </LayoutDesign>
        </ThemeProvider>
      </body>
    </html>
  )
}
