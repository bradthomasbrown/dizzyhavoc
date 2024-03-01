import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>dizzyhavoc (DZHV)</title>
        <link rel="stylesheet" href="/styles.css" />
        <style>@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@1,300&display=swap')</style>
      </head>
      <body class="bg-[#DED5C6]">
        <Component />
      </body>
    </html>
  );
}
