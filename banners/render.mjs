import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = new URL('.', import.meta.url).pathname;
const bin = process.env.CHROME || 'chromium';

const crumb = repo => repo ? `gabela<span class="dot">-</span>io / <b>${repo}</b>` : `github.com/<b>gabela<span class="dot">-</span>io</b>`;

const banners = {
  org: {
    crumb: crumb(), kicker: 'Open source · Administración digital', name: 'gabela', fs: 124,
    head: 'Las herramientas que la administración digital debería ofrecer, <em>pero no ofrece.</em>',
    form: 'Modelo 000 · Proyectos', tag: 'Abierto',
    rows: [['llave', 'Cl@ve PIN y Cl@ve Móvil'], ['puntoBOE', 'Validador BOE en el navegador'],
           ['boeidl', 'DSL para diseños de registro'], ['website', 'Documentación no oficial AEAT']],
  },
  llave: {
    crumb: crumb('llave'), kicker: 'Cl@ve PIN · Cl@ve Móvil', name: 'llave',
    head: 'Tu identidad digital ante la administración, <em>en abierto.</em>',
    form: 'Ficha técnica', tag: 'MIT',
    rows: [['Núcleo', 'Rust <small>· llave-core</small>'], ['Clientes', 'CLI · Flutter'],
           ['Plataformas', 'Win · Linux · macOS · Android · iOS'], ['Credenciales', 'Keyring del sistema']],
  },
  puntoBOE: {
    crumb: crumb('puntoBOE'), kicker: 'Validador de ficheros BOE', name: 'puntoBOE', fs: 104,
    head: 'Valida tus declaraciones antes de presentarlas. <em>Sin enviarlas a nadie.</em>',
    form: 'Ficha técnica', tag: '100% local',
    rows: [['Ejecución', 'Navegador <small>· WebAssembly</small>'], ['Modelos', '720 <small>· más en camino</small>'],
           ['Stack', 'Rust · Leptos'], ['Tus datos', 'No salen de tu equipo']],
  },
  boeidl: {
    crumb: crumb('boeidl'), kicker: 'Diseños de registro AEAT', name: 'boeidl',
    head: 'Los diseños de registro de la AEAT, <em>por fin legibles.</em>',
    form: 'Ficha técnica', tag: 'Alpha',
    rows: [['Entrada', 'Ficheros <small>.boe</small>'], ['Salida', 'Código Rust'],
           ['Genera', 'Serializa · deserializa · valida'], ['Modelos', '130 <small>· pago fraccionado</small>']],
  },
  website: {
    crumb: crumb('website'), kicker: 'Documentación', name: 'website',
    head: 'Lo que la administración no explica, <em>explicado.</em>',
    form: 'Ficha técnica', tag: 'No oficial',
    rows: [['Secciones', 'Por qué · Contratación pública'], ['Formato', 'Markdown <small>· abierto a PRs</small>'],
           ['Motor', 'Docusaurus'], ['Publicado en', 'GitHub Pages']],
  },
};

const only = process.argv.slice(2);
mkdirSync(join(dir, 'out'), { recursive: true });
for (const [key, cfg] of Object.entries(banners)) {
  if (only.length && !only.includes(key)) continue;
  for (const theme of ['light', 'dark']) {
    const out = join(dir, 'out', `${key}-${theme}.png`);
    const url = `file://${dir}banner.html#${encodeURIComponent(JSON.stringify({ ...cfg, theme }))}`;
    execFileSync(bin, ['--headless', '--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=2',
      '--window-size=1280,400', '--virtual-time-budget=2000', `--screenshot=${out}`, url], { stdio: 'ignore' });
    console.log(out);
  }
}
