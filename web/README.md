# Website for DizzyHavoc. 

# Table of Contents
1. [Developer Environment Setup](#dev-env-setup)
2. [Project Structure](#project-structure)

## Developer Environment Setup
This project uses Deno Fresh. To setup:
- [install Deno]('https://docs.deno.com/runtime/manual/getting_started/installation')
- clone the repo with `git clone https://github.com/bradbrown-llc/dizzyhavoc-web.git`
- use `deno task start` (see deno.json for task details) inside the project to run a development server
- get familiar with [Fresh](https://fresh.deno.dev/docs/getting-started/create-a-project), Deno's preferred web framework

<!-- end dev setup list -->

## Project Structure

- `components/` non-interactive components
- `lib/`
    - `internal.ts`: helpful file to manage module load order, [described here](https://stackoverflow.com/a/76717884)
    - `ejra/`: [Ethereum JSON RPC API bindings for typescript](https://ethereum.org/en/developers/docs/apis/json-rpc/)
    - `schemas/`: [Zod](https://zod.dev/) schemas for validating and normalizing common EVM and EJRA objects, like blocks, transactions, or injected Web3 providers
    - `state/` dApp state [Preact signals](https://preactjs.com/guide/v10/signals/)
- `dev.ts`, `main.ts`, `fresh.gen.ts`, `deno.json`, `routes/`, `islands/`, `static/`: see [Fresh docs - Getting Started - Create a Project](https://fresh.deno.dev/docs/getting-started/create-a-project)