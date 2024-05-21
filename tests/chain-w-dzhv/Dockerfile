FROM denoland/deno:alpine-1.43.1
WORKDIR /dzhv
COPY . .
WORKDIR /dzhv/tests/chain-w-dzhv
RUN \
    deno cache setup.ts \
    && deno cache test.ts