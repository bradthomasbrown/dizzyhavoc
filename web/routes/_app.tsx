import Footer from '../components/common/Footer.tsx';
import NavBar from '../islands/common/navbar.tsx';
import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DizzyHavoc (DZHV)</title>
        <link rel="stylesheet" href="/styles.css" />
        <style>@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')</style>
      </head>
      <body class="bg-[#f2f2f2] dark:bg-[#101010]">
        <NavBar/>
        <Component/>
        <Footer/>
      </body>
    </html>
  );
}
