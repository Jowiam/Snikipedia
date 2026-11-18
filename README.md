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

## Forslag til endringer og godkjenning

Sidene har nå knappen «Rediger / foreslå endring» og egne knapper ved
seksjonsoverskriftene. Brukeren skriver vanlig tekst i en dialogboks.
Originalteksten kan vises som referanse. Ingen artikkelfiler endres fra boksen.

Innsending bruker GitHub Issues i `Jowiam/Snikipedia`, uten server eller
hemmelige tilgangsnøkler i nettsiden. Brukeren velger «Åpne forslag i GitHub»,
logger inn og bekrefter innsendingen der. Før dette finnes ingen innsendt sak.
Forslag får prefikset `[Endringsforslag]`, sideadresse, filsti, seksjon,
foreslått tekst og eventuell begrunnelse. Forslagets synlighet følger
repositoryets tilgangsinnstillinger.

Som eier må du ha **Settings → General → Features → Issues** aktivert i
GitHub-repositoryet. Denne innstillingen er ikke endret eller verifisert lokalt.

Slik vurderer du forslag:

1. Åpne https://github.com/Jowiam/Snikipedia/issues og les den nye saken.
2. Godkjenn ved å kommentere i saken og oppdatere den oppgitte HTML-filen
   med teksten du vil publisere. Du kan redigere filen i GitHub med blyantknappen
   og lagre en commit, eller gjøre endringen lokalt og pushe den.
3. Når endringen er publisert via GitHub Pages, lukk saken som fullført.
4. Ved avslag: forklar kort hvorfor og lukk saken uten å endre artikkelen.

Godkjenning og publisering er manuell. En kommentar eller lukking av en sak
oppdaterer ikke teksten automatisk. Bruk GitHubs «Watch»-innstillinger dersom
du ønsker varsling om nye saker.

En nedlastingsknapp gir en komplett tekstfil som reserve dersom forslaget er
for langt til en GitHub-lenke eller brukeren ikke kan sende det med en gang.
Nedlasting sender ikke teksten til redaktøren. Utkastet beholdes når dialogen
lukkes, men lagres ikke ved lasting av siden på nytt.

Funksjonen ligger i `assets/suggestions.js` og `assets/suggestions.css`.
`site.js` laster den for felles sidemal, også på Bang-sekken og Chiappa-siden.
Ved flytting til et annet repository, endre køadressen i
`assets/suggestions.js`.

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
