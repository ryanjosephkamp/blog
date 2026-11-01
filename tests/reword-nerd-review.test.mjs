import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const articleRelativePath = "articles/reword-nerd.md";
const demosRelativeDirectory = "assets/reword-nerd-demos";
const demosSourceDirectory = "tools/reword-nerd-demos";
const demoScript = `<script type="module" src="{{ '/${demosRelativeDirectory}/demos.js' | relative_url }}"></script>`;
const gifRelativePath = "assets/media/reword-nerd/2026-10-31/reword-nerd-demo.gif";
const expectedGif = {
  bytes: 3_478_877,
  sha256: "d61c17b2777561786f6d50c7905212cc5f41896461d01e6cfc61289b287e8a44",
};
const retiredMedia = ["assets/media/reword-nerd/2026-08-14-r1", "assets/images/reword-nerd-icon.gif"];

// Newest first, in the order both indexes list them.
const publishedArticles = [
  {
    path: "articles/english-openlist.md",
    href: "/articles/english-openlist/",
    title: "The English OpenList: a word list that keeps itself up to date",
    date: "2026-11-01",
  },
  {
    path: "articles/ars-magna.md",
    href: "/articles/ars-magna/",
    title: "Ars Magna: every anagram, exactly",
    date: "2026-10-31",
  },
  {
    path: "articles/reword-nerd.md",
    href: "/articles/reword-nerd/",
    title: "reword_nerd: Rewrite anything with the model you already use",
    date: "2026-10-31",
  },
  {
    path: "articles/aqrobat.md",
    href: "/articles/aqrobat/",
    title: "Aqrobat: QR codes, in character",
    date: "2026-10-31",
  },
  {
    path: "articles/amordle.md",
    href: "/articles/amordle/",
    title: "Amordle: the Lichess of Wordle",
    date: "2026-08-17",
  },
  {
    path: "articles/s26-airp.md",
    href: "/articles/s26-airp/",
    title: "Spring 2026 AI Research Prototype Portfolio",
    date: "2026-06-24",
  },
];

const essaySections = [
  "why-i-built-it",
  "what-reword-nerd-does",
  "hand-it-off",
  "the-method",
  "projects",
  "bring-it-back",
  "no-model",
  "images",
  "how-it-compares",
  "privacy",
  "use-it",
];

const demos = ["handoff", "project", "changes", "image"];

const projectLinks = [
  ["reword_nerd", "https://ryanjosephkamp.github.io/reword-nerd/"],
  ["Rewrite text", "https://ryanjosephkamp.github.io/reword-nerd/app/"],
  ["Regenerate images", "https://ryanjosephkamp.github.io/reword-nerd/app/?mode=images"],
  ["Release 0.9 notes", "https://ryanjosephkamp.github.io/reword-nerd/updates/v0-9-0/"],
  ["Updates", "https://ryanjosephkamp.github.io/reword-nerd/updates/"],
  ["reword_nerd on GitHub", "https://github.com/ryanjosephkamp/reword-nerd"],
];

const expectedLightTheme = {
  "--page": "#ffffff",
  "--ink": "#111111",
  "--muted": "#3f3f3f",
  "--faint": "#525252",
  "--line": "#dddddd",
  "--line-strong": "#8c8c8c",
  "--accent": "#0b4f9c",
  "--accent-soft": "#f4f7fb",
  "--paper": "#ffffff",
  "--node-0": "#111111",
  "--node-1": "#444444",
  "--node-2": "#626262",
  "--node-3": "#2d2d2d",
  "--node-4": "#737373",
  "--node-5": "#505050",
  "--node-6": "#858585",
};

const expectedDarkTheme = {
  "--page": "#101010",
  "--ink": "#f2f2f2",
  "--muted": "#d0d0d0",
  "--faint": "#b9b9b9",
  "--line": "#363636",
  "--line-strong": "#8d8d8d",
  "--accent": "#b8ccff",
  "--accent-soft": "#171717",
  "--paper": "#101010",
  "--node-0": "#f2f2f2",
  "--node-1": "#d6d6d6",
  "--node-2": "#bfbfbf",
  "--node-3": "#e7e7e7",
  "--node-4": "#a8a8a8",
  "--node-5": "#cccccc",
  "--node-6": "#999999",
};

function absolutePath(relativePath) {
  return join(repositoryRoot, relativePath);
}

function readRequired(relativePath) {
  const path = absolutePath(relativePath);
  assert.ok(existsSync(path), `Missing required file: ${relativePath}`);
  return readFileSync(path, "utf8");
}

function frontMatter(document) {
  const match = document.match(/^---\n([\s\S]*?)\n---\n/);
  assert.ok(match, "Article must begin with YAML front matter");
  return match[1].split("\n");
}

function frontMatterValues(document) {
  const values = {};
  let listKey;
  for (const line of frontMatter(document)) {
    if (listKey && line.startsWith("  - ")) {
      values[listKey].push(line.slice(4).trim());
      continue;
    }
    const separator = line.indexOf(":");
    assert.ok(separator > 0, `Invalid front-matter line: ${line}`);
    const key = line.slice(0, separator);
    const rawValue = line.slice(separator + 1).trim();
    listKey = rawValue === "" ? key : undefined;
    if (rawValue === "") values[key] = [];
    else if (rawValue === "true") values[key] = true;
    else if (rawValue === "false") values[key] = false;
    else values[key] = rawValue.replace(/^"|"$/g, "");
  }
  return values;
}

function traceEffectiveLayout(layout, page) {
  let html = layout.replace(
    /{% if page\.storage_free %}([\s\S]*?){% endif %}/g,
    page.storage_free ? "$1" : "",
  );
  html = html.replace(
    /{% unless page\.storage_free %}([\s\S]*?){% endunless %}/g,
    page.storage_free ? "" : "$1",
  );
  html = html.replace(
    /{% if page\.scripts %}([\s\S]*?){% endif %}/g,
    page.scripts ? "$1" : "",
  );

  return {
    html,
    scriptSources: [...html.matchAll(/<script\s+src="([^"]+)"[^>]*><\/script>/g)].map(
      ([, source]) => source,
    ),
    themeControls: [...html.matchAll(/<fieldset class="theme-switcher"[\s\S]*?<\/fieldset>/g)],
  };
}

function themeProperties(block) {
  const declarations = Object.fromEntries(
    [...block.matchAll(/(--[a-z0-9-]+):\s*([^;]+);/g)].map(([, name, value]) => [
      name,
      value.trim(),
    ]),
  );
  return Object.fromEntries(
    Object.keys(expectedLightTheme).map((name) => {
      assert.ok(declarations[name], `Missing theme property ${name}`);
      return [name, declarations[name]];
    }),
  );
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function bundleScripts() {
  return readdirSync(absolutePath(demosRelativeDirectory)).filter((file) => file.endsWith(".js"));
}

test("publishes the reword_nerd post's front matter without indexing directives", () => {
  const article = readRequired(articleRelativePath);
  assert.deepEqual(frontMatter(article), [
    'title: "reword_nerd: Rewrite anything with the model you already use"',
    'description: "A browser workbench that hands documents, projects, and images to the AI model you already use, in one paste, and brings the result back for review."',
    "permalink: /articles/reword-nerd/",
    "date: 2026-10-31",
    "storage_free: true",
    "styles:",
    `  - /${demosRelativeDirectory}/demos.css`,
  ]);

  assert.doesNotMatch(
    article,
    /film-review__notice|Review-only link|unlisted|not access control/i,
  );

  const layout = readRequired("_layouts/default.html");
  assert.match(
    layout,
    /{% if page\.robots %}\s*<meta\s+name="robots"\s+content="{{ page\.robots \| escape }}"\s*\/>\s*{% endif %}/,
  );
  assert.equal((layout.match(/name="robots"/g) ?? []).length, 1);
});

test("lists every published post exactly once in both indexes, newest first", () => {
  for (const indexPath of ["index.md", "articles/index.md"]) {
    const index = readRequired(indexPath);
    assert.equal(
      (index.match(/<li>/g) ?? []).length,
      publishedArticles.length,
      `${indexPath} must list ${publishedArticles.length} posts`,
    );

    let previousIndex = -1;
    for (const { href, title } of publishedArticles) {
      assert.equal(
        (index.match(new RegExp(escapeRegExp(href), "g")) ?? []).length,
        1,
        `${indexPath} must link ${href} exactly once`,
      );
      assert.match(
        index,
        new RegExp(escapeRegExp(`<a href="{{ '${href}' | relative_url }}">${title}</a>`)),
      );
      const position = index.indexOf(href);
      assert.ok(position > previousIndex, `${indexPath} must show the newest post first`);
      previousIndex = position;
    }
  }

  const config = readRequired("_config.yml");
  assert.match(config, /^exclude:\n(?:  - .+\n)*  - tests\/$/m);
  assert.equal(existsSync(absolutePath("robots.txt")), false);
});

test("renders one semantic publication date near the top of every current article", () => {
  const include = readRequired("_includes/article-date.html");
  assert.equal(
    include.trim(),
    '<p class="article-date">Published <time datetime="{{ page.date | date: \'%Y-%m-%d\' }}">{{ page.date | date: "%Y-%m-%d" }}</time></p>',
  );

  for (const articleContract of publishedArticles) {
    const article = readRequired(articleContract.path);
    const titleIndex = Math.max(
      article.indexOf(`<h1>${articleContract.title}</h1>`),
      article.indexOf(`# ${articleContract.title}`),
    );
    assert.ok(titleIndex >= 0, `${articleContract.path} title is missing`);
    assert.ok(
      frontMatter(article).includes(`date: ${articleContract.date}`),
      `${articleContract.path} date drifted`,
    );
    assert.equal(
      (article.match(/{% include article-date\.html %}/g) ?? []).length,
      1,
      `${articleContract.path} must render one date`,
    );
    assert.ok(
      article.indexOf("{% include article-date.html %}") > titleIndex,
      `${articleContract.path} date must follow its title`,
    );
    assert.ok(
      article.indexOf("{% include article-date.html %}") < article.indexOf("article-subtitle"),
      `${articleContract.path} date must precede its subtitle`,
    );
  }

  const css = readRequired("assets/css/site.css");
  assert.match(
    css,
    /\.article-date\s*{[\s\S]*?color: var\(--faint\);[\s\S]*?font-size:[\s\S]*?}/,
  );
  assert.match(
    css,
    /\.article-list \.article-date\s*{\s*margin: 0 0 0\.3rem;/,
    "Index dates must not inherit the article header's negative top margin",
  );
});

test("shows matching semantic publication dates in both public post indexes", () => {
  for (const indexPath of ["index.md", "articles/index.md"]) {
    const index = readRequired(indexPath);
    const entries = [...index.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(([, entry]) => entry);
    assert.equal(entries.length, publishedArticles.length);

    for (const [position, articleContract] of publishedArticles.entries()) {
      const entry = entries[position];
      assert.match(entry, new RegExp(escapeRegExp(articleContract.href)));
      assert.match(entry, new RegExp(escapeRegExp(articleContract.title)));
      assert.match(
        entry,
        new RegExp(
          `<p class="article-date">Published <time datetime="${articleContract.date}">${articleContract.date}<\\/time><\\/p>`,
        ),
      );
    }
  }
});

test("requires the same publication-date field and placement in every post template", () => {
  for (const templatePath of [
    "templates/standard-article-template.md",
    "templates/project-portfolio-article-template.md",
    "templates/technical-note-template.md",
  ]) {
    const template = readRequired(templatePath);
    assert.match(template, /^date: "\[YYYY-MM-DD\]"$/m, `${templatePath} must request a date`);
    assert.equal(
      (template.match(/{% include article-date\.html %}/g) ?? []).length,
      1,
      `${templatePath} must render one date`,
    );
    assert.ok(
      template.indexOf("{% include article-date.html %}") > template.indexOf("# ["),
      `${templatePath} date must follow its title`,
    );
  }
});

test("opens with the app's demo GIF and keeps the original introduction", () => {
  const article = readRequired(articleRelativePath);
  const gifPath = absolutePath(gifRelativePath);
  assert.ok(existsSync(gifPath), `Missing required file: ${gifRelativePath}`);
  assert.equal(statSync(gifPath).size, expectedGif.bytes, "GIF byte count drifted");
  assert.equal(sha256(gifPath), expectedGif.sha256, "GIF SHA-256 drifted");

  const figure = article.match(
    /<figure class="film-review__film film-review__gif">([\s\S]*?)<\/figure>/,
  )?.[1];
  assert.ok(figure, "Missing the demo GIF figure");
  assert.match(
    figure,
    new RegExp(
      `<img\\s+src="${escapeRegExp(`{{ '/${gifRelativePath}' | relative_url }}`)}"\\s+alt="[^"]+"\\s+width="960"\\s+height="600"`,
    ),
  );
  assert.match(figure, /<figcaption>[^<]*no model was called\.<\/figcaption>/);

  assert.match(
    article,
    /<p class="article-subtitle">A browser workbench that hands your documents, projects, and images to the AI model you already use, in one paste<\/p>/,
  );
  const figureIndex = article.indexOf('<figure class="film-review__film film-review__gif">');
  assert.ok(article.indexOf('<p class="article-subtitle">') < figureIndex);
  assert.ok(
    figureIndex < article.indexOf("On the human side of this pipeline"),
    "The GIF must come before the introduction",
  );
  assert.match(
    article,
    /<ol class="film-review__challenges">[\s\S]*?<li>Preparing and submitting everything to the model, i\.e\., context\/prompt engineering\.<\/li>[\s\S]*?<li>Evaluating the performance of the model and correcting its mistakes\.<\/li>[\s\S]*?<\/ol>/,
  );
  assert.match(article, /<strong>reword_nerd solves that problem\.<\/strong>/);
  assert.match(
    article,
    /<strong>Documents, OCR, source images,\s+and generated prompts still require human review\.<\/strong>/,
  );
  assert.doesNotMatch(article, /ReWord Nerd/);
});

test("keeps the essay sections in order, each with a heading and prose", () => {
  const article = readRequired(articleRelativePath);
  const essayBlocks = [
    ...article.matchAll(
      /<section class="film-review__essay" aria-labelledby="([^"]+)">([\s\S]*?)<\/section>/g,
    ),
  ];
  assert.deepEqual(
    essayBlocks.map(([, id]) => id),
    essaySections,
  );

  for (const [, id, contents] of essayBlocks) {
    assert.match(contents, new RegExp(`<h2 id="${escapeRegExp(id)}">[^<]+<\\/h2>`));
    assert.ok(
      (contents.match(/<p(?:\s[^>]*)?>/g) ?? []).length >= 2,
      `${id} must contain at least two paragraphs`,
    );
  }

  const allIds = [...article.matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id);
  assert.equal(new Set(allIds).size, allIds.length, "Article IDs must be unique");
  assert.ok(
    article.indexOf('aria-labelledby="why-i-built-it"') > article.indexOf("film-review__challenges"),
    "The personal introduction must precede the essay",
  );
});

test("mounts four live demos from one self-contained module bundle", () => {
  const article = readRequired(articleRelativePath);
  assert.deepEqual(
    [...article.matchAll(/<div class="rn-demo-slot" data-rn-demo="([a-z]+)"><\/div>/g)].map(
      ([, demo]) => demo,
    ),
    demos,
  );
  assert.deepEqual(
    [...article.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/g)].map(([tag]) => tag),
    [demoScript],
    "The demo bundle must be the article's only script",
  );
  assert.ok(article.trim().endsWith(demoScript), "The demo script must load after the article");

  const scripts = bundleScripts();
  assert.ok(scripts.includes("demos.js"), "Missing the built demo entry");
  assert.ok(existsSync(absolutePath(`${demosRelativeDirectory}/demos.css`)));
  assert.match(
    readRequired(`${demosRelativeDirectory}/demos.js`).split("\n")[0],
    /built from reword-nerd [0-9a-f]{7,40} by tools\/reword-nerd-demos\. Rebuild; don't edit\./,
  );

  const referenced = new Set(["demos.js"]);
  for (const file of scripts) {
    const code = readRequired(`${demosRelativeDirectory}/${file}`);
    assert.doesNotMatch(code, /\b(?:from|import)\s*\(?\s*["']https?:/, `${file} must not load remote code`);
    for (const [, target] of code.matchAll(/\b(?:from\s*|import\s*\(\s*)["']\.\/([^"']+)["']/g)) {
      assert.ok(scripts.includes(target), `${file} imports a missing chunk: ${target}`);
      referenced.add(target);
    }
  }
  assert.deepEqual([...referenced].sort(), [...scripts].sort(), "The bundle holds an unused chunk");

  for (const file of ["demos.ts", "demos.css", "vite.config.mjs"]) {
    assert.ok(existsSync(absolutePath(`${demosSourceDirectory}/${file}`)), `Missing demo source ${file}`);
  }
  assert.match(readRequired("_config.yml"), /^  - tools\/$/m, "Demo sources must stay off the site");
});

test("retires the August films, icon, and tutorial placeholder", () => {
  const article = readRequired(articleRelativePath);
  for (const path of retiredMedia) {
    assert.equal(existsSync(absolutePath(path)), false, `${path} should be gone`);
  }
  assert.doesNotMatch(
    article,
    /<video\b|<iframe\b|\bautoplay\b|youtube\.com|youtu\.be|Coming soon|film-review__placeholder|film-review__brand-mark/i,
  );
  assert.doesNotMatch(article, /id="building-with-ai"|id="what-comes-next"|id="youtube-tutorial"/);
  assert.doesNotMatch(
    readRequired("assets/css/site.css"),
    /film-review__brand-mark|film-review__placeholder/,
  );

  const pages = [
    "index.md",
    ...readdirSync(absolutePath("articles")).map((file) => `articles/${file}`),
    ...readdirSync(absolutePath("assets/css")).map((file) => `assets/css/${file}`),
  ];
  for (const page of pages) {
    assert.doesNotMatch(readRequired(page), /2026-08-14-r1|reword-nerd-icon/, `${page} uses retired media`);
  }
});

test("keeps the reword_nerd post storage-free, with no theme script", () => {
  const layout = readRequired("_layouts/default.html");
  const reviewArticle = readRequired(articleRelativePath);
  const ordinaryArticle = readRequired("index.md");
  const reviewPage = frontMatterValues(reviewArticle);
  const ordinaryPage = frontMatterValues(ordinaryArticle);

  assert.equal(reviewPage.storage_free, true);
  assert.equal(ordinaryPage.storage_free, undefined);

  const reviewLayout = traceEffectiveLayout(layout, reviewPage);
  assert.match(reviewLayout.html, /<html lang="en" data-storage-free-theme="system">/);
  assert.deepEqual(reviewLayout.scriptSources, []);
  assert.equal(reviewLayout.themeControls.length, 0);
  assert.doesNotMatch(reviewLayout.html, /assets\/js\/theme\.js|name="theme"/);
  assert.doesNotMatch(reviewLayout.html, /localStorage|sessionStorage/i);
  assert.doesNotMatch(reviewArticle, /localStorage|sessionStorage|indexedDB/i);
  for (const file of bundleScripts()) {
    assert.doesNotMatch(
      readRequired(`${demosRelativeDirectory}/${file}`),
      /\.setItem\(|sessionStorage|indexedDB/,
      `${file} must not write browser storage`,
    );
  }

  const ordinaryLayout = traceEffectiveLayout(layout, ordinaryPage);
  assert.doesNotMatch(ordinaryLayout.html, /data-storage-free-theme=/);
  assert.deepEqual(ordinaryLayout.scriptSources, [
    "{{ '/assets/js/theme.js' | relative_url }}",
  ]);
  assert.equal(ordinaryLayout.themeControls.length, 1);
  assert.deepEqual(
    [...ordinaryLayout.themeControls[0][0].matchAll(/name="theme" value="([^"]+)"/g)].map(
      ([, value]) => value,
    ),
    ["light", "dark", "system"],
  );
});

test("resolves the storage-free system theme to light and the existing dark tokens", () => {
  const css = readRequired("assets/css/site.css");
  const lightBlock = css.match(/^:root \{([\s\S]*?)\n}/)?.[1];
  const existingDarkBlock = css.match(
    /:root\[data-resolved-theme="dark"\] \{([\s\S]*?)\n}/,
  )?.[1];
  const storageFreeDarkBlock = css.match(
    /@media \(prefers-color-scheme: dark\) \{\s*:root\[data-storage-free-theme="system"\] \{([\s\S]*?)\n  }\s*}/,
  )?.[1];

  assert.ok(lightBlock, "Missing default light theme");
  assert.ok(existingDarkBlock, "Missing existing dark theme");
  assert.ok(storageFreeDarkBlock, "Missing storage-free system-dark theme");
  assert.deepEqual(themeProperties(lightBlock), expectedLightTheme);
  assert.deepEqual(themeProperties(existingDarkBlock), expectedDarkTheme);
  assert.deepEqual(themeProperties(storageFreeDarkBlock), expectedDarkTheme);
});

test("uses exact project links and the exact final call to action", () => {
  const article = readRequired(articleRelativePath);
  for (const [label, href] of projectLinks) {
    assert.match(
      article,
      new RegExp(`<a href="${escapeRegExp(href)}">${escapeRegExp(label)}</a>`),
    );
  }

  assert.equal((article.match(/Try reword_nerd\./g) ?? []).length, 1);
  assert.match(
    article,
    /<p class="film-review__cta"><a href="https:\/\/ryanjosephkamp\.github\.io\/reword-nerd\/">Try reword_nerd\.<\/a><\/p>/,
  );
  assert.ok(article.indexOf("film-review__cta") > article.indexOf('aria-labelledby="project-links"'));
  assert.doesNotMatch(article, /analytics|dataLayer|gtag\s*\(/i);
});

test("contains film media responsively with styles scoped to this review", () => {
  const css = readRequired("assets/css/site.css");
  assert.match(css, /\.film-review,\s*\.film-review \*\s*{\s*min-width: 0;\s*}/);
  assert.match(
    css,
    /\.film-review__video\s*{[\s\S]*?display: block;[\s\S]*?width: 100%;[\s\S]*?max-width: 100%;[\s\S]*?height: auto;[\s\S]*?aspect-ratio: 16 \/ 9;[\s\S]*?}/,
  );
  assert.match(css, /\.film-review__film\s*{[\s\S]*?overflow: hidden;[\s\S]*?}/);
  assert.match(
    css,
    /@media \(max-width: 720px\)\s*{[\s\S]*?\.film-review__film\s*{[\s\S]*?padding:/,
  );
  assert.doesNotMatch(css, /^video\s*{/m);
});

test("runs only the contract test on pull requests with pinned Node and actions", () => {
  const workflow = readRequired(".github/workflows/reword-nerd-review.yml");
  assert.match(workflow, /^name: reword_nerd review contract$/m);
  assert.match(workflow, /^on:\n  pull_request:\s*$/m);
  assert.match(workflow, /^permissions:\n  contents: read\s*$/m);
  assert.match(workflow, /uses: actions\/checkout@[a-f0-9]{40}/);
  assert.match(workflow, /uses: actions\/setup-node@[a-f0-9]{40}/);
  assert.match(workflow, /node-version: 24\.18\.1/);
  assert.match(workflow, /run: node --test tests\/reword-nerd-review\.test\.mjs/);
  assert.doesNotMatch(workflow, /^  (?:push|workflow_dispatch|schedule):/m);
  assert.doesNotMatch(workflow, /\b(?:deploy|pages|upload-pages-artifact|npm|pnpm|npx|bundle|jekyll)\b/i);
});

test("keeps private paths, evidence, credentials, and non-public artifact names out of public files", () => {
  const textFiles = [
    articleRelativePath,
    "_layouts/default.html",
    "assets/css/site.css",
    "_config.yml",
    `${demosRelativeDirectory}/demos.js`,
    `${demosRelativeDirectory}/demos.css`,
    ...["demos.ts", "demos.css", "vite.config.mjs"].map((file) => `${demosSourceDirectory}/${file}`),
  ];
  const forbidden = [
    /\/Users\/[^/\s]+\//,
    /\/home\/runner\//,
    /github\.com\/ryanjosephkamp\/remotional/i,
    /\/actions\/runs\//i,
    /\/releases\/tag\//i,
    /BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY/i,
    /authorization:\s*bearer/i,
    /(?:ghp|github_pat)_[A-Za-z0-9_]+/,
  ];

  for (const relativePath of textFiles) {
    const contents = readRequired(relativePath);
    for (const pattern of forbidden) {
      assert.doesNotMatch(contents, pattern, `${relativePath} exposes ${pattern}`);
    }
  }
});
