FROM denoland/deno:alpine-1.43.1
WORKDIR /kanta
COPY . .
WORKDIR /kanta/tests/resolver/kanta
RUN deno cache serve.ts