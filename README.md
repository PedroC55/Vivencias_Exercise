# Pedidos disponíveis

Ecrã onde um profissional vê os pedidos de reparação disponíveis, filtra por cidade e aceita os que lhe interessam.
Feito com React + TypeScript + Vite.

## Como correr

Requer Node 18+.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # verifica tipos e gera a build de produção
```

## O que está implementado

- Lista de pedidos com serviço, cidade, data e hora, duração e valor (ordenados por data; os urgentes têm etiqueta).
- Filtro por cidade (as cidades vêm dos dados, não estão fixas no código).
- Botão "Aceitar": o pedido sai da lista.
- Mensagem quando não há pedidos (distingue "nenhum pedido" de "nenhum pedido nesta cidade").
- Carregamento simulado de 1 segundo com indicador, e mensagem de erro se o carregamento falhar.

## Estrutura

- `src/data/jobs.ts` – dados de exemplo.
- `src/api/jobs.ts` – `fetchJobs()`, simula a API com 1s de atraso. É o único sítio a mudar quando houver servidor.
- `src/format.ts` – formatação de datas (fuso de Lisboa), duração e preço (cêntimos → euros).
- `src/components/JobCard.tsx` – um pedido.
- `src/App.tsx` – estado (pedidos, filtro, aceites) e composição do ecrã.
