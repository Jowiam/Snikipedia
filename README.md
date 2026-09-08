# Snikipedia

Statisk humoristisk feltencyklopedi laget for GitHub Pages.

## Publisering på GitHub Pages

1. Last opp **innholdet i denne mappen** til roten av GitHub-repositoryet.
2. Gå til **Settings → Pages**.
3. Velg **Deploy from a branch**.
4. Velg branch **main** og mappe **/(root)**.
5. Lagre.

Hvis repositoryet heter `Snikipedia`, vil adressen normalt være:

`https://DITT-BRUKERNAVN.github.io/Snikipedia/`

## Legg til en ny artikkel

### 1. Kopier artikkelmalen

Kopier:

`templates/article-template.html`

til for eksempel:

`articles/kaffekjelen.html`

### 2. Rediger artikkelen

Bytt ut:
- `ARTIKKELTITTEL`
- beskrivelse
- seksjoner
- innhold
- referanser

### 3. Registrer artikkelen i `articles.js`

Legg til et nytt objekt i `window.SNIKI_ARTICLES`:

```js
{
  title: "Kaffekjelen",
  path: "articles/kaffekjelen.html",
  category: "Utstyr",
  excerpt: "Kort beskrivelse som vises på forsiden.",
  tags: ["kaffe", "utstyr", "felt"],
  updated: "8. september 2026"
}
```

Det er alt. Artikkelen vil da automatisk bli:
- synlig på forsiden
- synlig i «Alle artikler»
- søkbar

## Viktige filer

- `index.html` – forsiden
- `articles/index.html` – artikkeloversikt
- `articles.js` – listen over alle artikler
- `site.css` – felles design
- `site.js` – navigasjon, søk og artikkelkort
- `templates/article-template.html` – mal for nye artikler
- `404.html` – feilsiden

## Endre design

Farger, bredder, skrifttyper og mobiloppsett ligger i `site.css`.

## Merk

Snikipedia er en parodi/intern humor-side og er ikke tilknyttet Wikipedia eller Wikimedia Foundation.


## Utvidet innhold

Denne versjonen inneholder 35 registrerte sider/artikler totalt, inkludert 30 nye
Snikipedia-artikler med interne krysslenker.

Sentrale innganger:
- `articles/liste-over-hendelser-som-burde-vaert-unngatt.html`
- `articles/bang-metoden.html`
- `articles/snikendes-risikomatrise.html`
- `articles/snikendes-kommandostruktur.html`
- `articles/fuglvatnet-ekspedisjonen.html`
- `articles/tekstilkatastrofer-i-snikendes-historie.html`



## Brage-biografi

Ny personartikkel:
`articles/brage-dabakk.html`

Tilhørende bilde:
`assets/brage-arkivbilde.jpg`

Artikkelen er registrert i `articles.js` og vises derfor automatisk på
forsiden, i artikkeloversikten og i søket.
