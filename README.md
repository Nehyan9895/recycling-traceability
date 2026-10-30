# Recycling traceability prototype

An interactive prototype of the batch traceability system for our e-waste and battery recycling plant. It follows one batch from the weighbridge to the EPR filing:

1. **Weigh-in** – weighbridge reading captured directly
2. **Tagging** – one batch code follows the material everywhere
3. **Dismantling** – each material weighed, mass balance checked
4. **Data destruction** – drives logged by serial and shredded, certificate issued
5. **Sales** – registered buyers only, e-invoice per sale
6. **EPR filing** – checks passed, filing pack ready for the CPCB portal

All figures are sample data. Names in brackets are placeholders.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:4321/recycling-traceability/

## Edit the content

- Company name, batch details, materials, buyers: `src/data/batch.ts`
- Page layout: `src/pages/index.astro`
- Animation and timing: `src/scripts/demo.ts`
- Colours and type: `src/styles/global.css`

## Deploy

Pushing to `main` builds and deploys to GitHub Pages through `.github/workflows/deploy.yml`.
