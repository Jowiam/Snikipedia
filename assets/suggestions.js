(function () {
  'use strict';
  const root = new URL('../', document.currentScript.src);
  const queue = 'https://github.com/Jowiam/Snikipedia/issues';
  const sheet = document.createElement('link');
  sheet.rel = 'stylesheet';
  sheet.href = new URL('assets/suggestions.css', root).href;
  document.head.append(sheet);

  const title = document.querySelector('h1')?.textContent.trim() || document.title;
  const path = decodeURIComponent(location.pathname).startsWith(root.pathname)
    ? decodeURIComponent(location.pathname).slice(root.pathname.length) || 'index.html'
    : location.pathname;
  const article = document.querySelector('main h1')?.closest('article') || document.querySelector('main');
  if (!article) return;

  const panel = document.createElement('section');
  panel.className = 'suggestion-panel';
  panel.innerHTML = `
    <h2>Bidra til denne siden</h2>
    <p>Har du en rettelse eller en bedre historie? Send et forslag til redaktøren. Teksten på siden endres først etter redaktørens vurdering og oppdatering.</p>
    <button type="button" class="suggestion-button" data-open-suggestion>Foreslå endring</button>
    <a class="suggestion-queue" href="${queue}" target="_blank" rel="noopener noreferrer">Se forslag til vurdering på GitHub</a>`;
  article.append(panel);

  const dialog = document.createElement('dialog');
  dialog.className = 'suggestion-dialog';
  dialog.setAttribute('aria-labelledby', 'suggestion-title');
  dialog.innerHTML = `
    <form>
      <h2 id="suggestion-title">Foreslå endring</h2>
      <p class="suggestion-context"></p>
      <p>Skriv vanlig tekst. Forslaget åpnes hos GitHub, der du logger inn og trykker <strong>Create / Submit new issue</strong> for å sende det. Forslaget blir synlig for dem som har tilgang til repositoryet.</p>
      <label for="suggestion-section">Hvilken del av siden gjelder det?</label>
      <input id="suggestion-section" name="section" maxlength="100" placeholder="For eksempel: Marsjen eller innledningen">
      <details class="suggestion-original"><summary>Vis teksten som står på siden</summary><pre></pre></details>
      <label for="suggestion-text">Din foreslåtte tekst eller endring</label>
      <textarea id="suggestion-text" name="text" rows="10" maxlength="6000" required placeholder="Skriv teksten slik du ønsker at den skal stå, eller forklar hva som bør endres."></textarea>
      <label for="suggestion-reason">Begrunnelse eller kilde (valgfritt)</label>
      <textarea id="suggestion-reason" name="reason" rows="3" maxlength="1000"></textarea>
      <p class="suggestion-status" role="status" aria-live="polite"></p>
      <div class="suggestion-actions">
        <button type="submit" class="suggestion-button">Åpne forslag i GitHub</button>
        <button type="button" data-download>Last ned forslaget</button>
        <button type="button" data-close>Lukk</button>
      </div>
      <p class="suggestion-help">Ingenting sendes når du bare skriver her. Nedlasting lagrer en tekstfil som du kan ta vare på selv. Teksten beholdes mens boksen lukkes, men forsvinner hvis du laster siden på nytt.</p>
    </form>`;
  document.body.append(dialog);
  const form = dialog.querySelector('form');
  const section = form.elements.section;
  const text = form.elements.text;
  const reason = form.elements.reason;
  const status = dialog.querySelector('[role="status"]');
  dialog.querySelector('.suggestion-context').textContent = `Side: ${title}`;

  let opener;
  function openEditor(heading) {
    opener = document.activeElement;
    const clone = article.cloneNode(true);
    clone.querySelectorAll('.suggestion-panel, .suggestion-edit, .suggestion-page-edit, script, style').forEach(el => el.remove());
    dialog.querySelector('pre').textContent = clone.innerText || clone.textContent;
    if (heading) section.value = heading.textContent.trim();
    status.textContent = '';
    dialog.showModal();
    text.focus();
  }
  panel.querySelector('[data-open-suggestion]').addEventListener('click', () => openEditor());
  const h1 = document.querySelector('main h1');
  if (h1) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'suggestion-button suggestion-page-edit';
    button.textContent = 'Rediger / foreslå endring';
    button.addEventListener('click', () => openEditor());
    h1.after(button);
  }
  article.querySelectorAll('h2').forEach(heading => {
    if (heading.closest('.suggestion-panel')) return;
    heading.querySelectorAll('.fake-edit').forEach(el => el.remove());
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'suggestion-edit';
    button.textContent = 'foreslå endring';
    button.addEventListener('click', () => {
      const cleanHeading = heading.cloneNode(true);
      cleanHeading.querySelector('button').remove();
      openEditor(cleanHeading);
    });
    heading.append(button);
  });
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => opener?.focus());

  function proposal() {
    return [
      `Endringsforslag: ${title}`,
      `Fil: ${path}`,
      `Side: ${new URL(path, root).href}`,
      `Del av siden: ${section.value.trim() || 'Hele siden'}`,
      '', 'FORESLÅTT ENDRING', text.value.trim(),
      '', 'BEGRUNNELSE / KILDE', reason.value.trim() || 'Ikke oppgitt',
      '', 'Til redaktøren: Forslaget er ikke publisert. Vurder innholdet før artikkelfilen oppdateres.'
    ].join('\n');
  }
  function validate() {
    text.setCustomValidity(text.value.trim() ? '' : 'Skriv et endringsforslag først.');
    return form.reportValidity();
  }
  text.addEventListener('input', () => text.setCustomValidity(''));
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!validate()) return;
    const target = new URL(`${queue}/new`);
    target.searchParams.set('title', `[Endringsforslag] ${title}`);
    target.searchParams.set('body', proposal());
    // GitHub limits issue URLs. Keep long proposals available as a complete file.
    if (target.href.length > 7500) {
      status.textContent = 'Forslaget er for langt til en GitHub-lenke. Last det ned som tekstfil, åpne forslagslisten og opprett en ny sak der du limer inn teksten.';
      return;
    }
    window.open(target.href, '_blank', 'noopener,noreferrer');
    status.textContent = 'Forsøkte å åpne GitHub i en ny fane. Forslaget er ikke sendt før du bekrefter det der. Hvis fanen ikke åpnet seg, kan du laste ned teksten og bruke lenken til forslagslisten.';
  });
  dialog.querySelector('[data-download]').addEventListener('click', () => {
    if (!validate()) return;
    const blob = URL.createObjectURL(new Blob([proposal()], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = blob;
    link.download = 'snikipedia-endringsforslag.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(blob), 1000);
    status.textContent = 'Tekstfilen er klargjort for nedlasting. Den er ikke sendt til redaktøren.';
  });
})();
