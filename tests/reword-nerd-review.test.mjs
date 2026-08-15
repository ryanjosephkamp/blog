import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const articleRelativePath = "articles/reword-nerd.md";
const mediaRelativeDirectory = "assets/media/reword-nerd/2026-08-14-r1";
const iconRelativePath = "assets/images/reword-nerd-icon.gif";
const expectedIcon = {
  bytes: 14_799_188,
  sha256: "539b3a7cef5e08e23e7c9491f431154c6bff2d6c6336662fd2c068e545bb4462",
};

const expectedMedia = [
  {
    film: "combined",
    role: "review-mp4",
    file: "reword-nerd-combined-quick-guide-r04-review.mp4",
    bytes: 1_254_760,
    sha256: "2c7ce738cb59cda46b6dc3e0f92134ad67c5776e360cb12b95dec55d4aa09870",
  },
  {
    film: "combined",
    role: "review-webm",
    file: "reword-nerd-combined-quick-guide-r04-review.webm",
    bytes: 1_500_059,
    sha256: "73694754e7673c3e8bfdd90331cd0d241ece6dbd1e64325600077affb1ec0bfd",
  },
  {
    film: "combined",
    role: "poster",
    file: "reword-nerd-combined-quick-guide-r04-poster.webp",
    bytes: 11_676,
    sha256: "1d440147a6723bfa1db6714276e018b995eedd7f622037eba5976cfd13e78c79",
  },
  {
    film: "combined",
    role: "transcript",
    file: "reword-nerd-combined-quick-guide-r04-transcript.txt",
    bytes: 1_003,
    sha256: "c25a7362e5e3f70716a08d53037b0ea433fa738983584e514f46a3374938ab58",
  },
  {
    film: "marketing-30",
    role: "review-mp4",
    file: "reword-nerd-marketing-30-r04-review.mp4",
    bytes: 782_263,
    sha256: "23797b4b91e4d6590c9299a4d26fc87c33d73e1b0b72f130259c1e279cae3613",
  },
  {
    film: "marketing-30",
    role: "review-webm",
    file: "reword-nerd-marketing-30-r04-review.webm",
    bytes: 751_777,
    sha256: "ac1cd5426fc687450f1fe334418c0ba9cd66b84049fa8ccf15c76ebdde09b398",
  },
  {
    film: "marketing-30",
    role: "poster",
    file: "reword-nerd-marketing-30-r04-poster.webp",
    bytes: 10_488,
    sha256: "995c6c9b430045ef29a1ea09cb4b9f7823e0dee33e3318997947d28d7b64b784",
  },
  {
    film: "marketing-30",
    role: "transcript",
    file: "reword-nerd-marketing-30-r04-transcript.txt",
    bytes: 207,
    sha256: "aae104ec49e55605374fd7724ee94e2b9dc16aa1b632db26045e08e6b6658877",
  },
  {
    film: "marketing-60",
    role: "review-mp4",
    file: "reword-nerd-marketing-60-r04-review.mp4",
    bytes: 1_567_864,
    sha256: "a5af434afce005c6f372e1be54fbd07dd242a0b9f49efaaa01c76865cc8698a5",
  },
  {
    film: "marketing-60",
    role: "review-webm",
    file: "reword-nerd-marketing-60-r04-review.webm",
    bytes: 1_589_436,
    sha256: "3c469f240e388318612aa18cd4964caae9303d7d46e6522d47fe438494463010",
  },
  {
    film: "marketing-60",
    role: "poster",
    file: "reword-nerd-marketing-60-r04-poster.webp",
    bytes: 10_462,
    sha256: "ba7b473ef8eca389cb696a4352e17e9044390c29deb5127aa7cce02cf77e4f31",
  },
  {
    film: "marketing-60",
    role: "transcript",
    file: "reword-nerd-marketing-60-r04-transcript.txt",
    bytes: 427,
    sha256: "d2587303fb20eb2fa9099f3fc9972a314d45608cfa6f27a195db8751d0d023a2",
  },
];

const films = [
  {
    key: "combined",
    heading: "Combined Quick Guide",
    descriptionId: "combined-description",
  },
  {
    key: "marketing-30",
    heading: "30-second product film",
    descriptionId: "marketing-30-description",
  },
  {
    key: "marketing-60",
    heading: "60-second product film",
    descriptionId: "marketing-60-description",
  },
];

const projectLinks = [
  ["reword_nerd Text portal", "https://ryanjosephkamp.github.io/reword-nerd/"],
  ["reword_nerd Image portal", "https://ryanjosephkamp.github.io/reword-nerd/image/"],
  ["reword_nerd Updates archive", "https://ryanjosephkamp.github.io/reword-nerd/updates/"],
  ["reword_nerd v0.8 post", "https://ryanjosephkamp.github.io/reword-nerd/updates/v0-8-0/"],
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
  return Object.fromEntries(
    frontMatter(document).map((line) => {
      const separator = line.indexOf(":");
      assert.ok(separator > 0, `Invalid front-matter line: ${line}`);
      const key = line.slice(0, separator);
      const rawValue = line.slice(separator + 1).trim();
      if (rawValue === "true") return [key, true];
      if (rawValue === "false") return [key, false];
      return [key, rawValue.replace(/^"|"$/g, "")];
    }),
  );
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

function liquidMediaUrl(file) {
  return `{{ '/${mediaRelativeDirectory}/${file}' | relative_url }}`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("publishes discoverable article front matter without review-only indexing directives", () => {
  const article = readRequired(articleRelativePath);
  assert.deepEqual(frontMatter(article), [
    'title: "reword_nerd: Local prompt packages for text and images"',
    'description: "Review the reword_nerd quick guide and product films for its local Text and Image prompt-package workflow."',
    "permalink: /articles/reword-nerd/",
    "storage_free: true",
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

test("lists reword_nerd as the newest of exactly two official blog posts", () => {
  const expectedLink =
    '<a href="{{ \'/articles/reword-nerd/\' | relative_url }}">reword_nerd: Local prompt packages for text and images</a>';

  for (const indexPath of ["index.md", "articles/index.md"]) {
    const index = readRequired(indexPath);
    assert.equal((index.match(/<li>/g) ?? []).length, 2, `${indexPath} must list two posts`);
    assert.equal(
      (index.match(/\/articles\/reword-nerd\//g) ?? []).length,
      1,
      `${indexPath} must link reword_nerd exactly once`,
    );
    assert.match(index, new RegExp(escapeRegExp(expectedLink)));
    assert.ok(
      index.indexOf("/articles/reword-nerd/") < index.indexOf("/articles/s26-airp/"),
      `${indexPath} must show the newest post first`,
    );
  }

  const config = readRequired("_config.yml");
  assert.match(config, /^exclude:\n(?:  - .+\n)*  - tests\/$/m);
  assert.equal(existsSync(absolutePath("robots.txt")), false);
});

test("publishes only the exact attested r04 public derivative allowlist under 40 MiB", () => {
  const mediaDirectory = absolutePath(mediaRelativeDirectory);
  assert.ok(existsSync(mediaDirectory), `Missing media directory: ${mediaRelativeDirectory}`);
  assert.deepEqual(
    readdirSync(mediaDirectory).sort(),
    expectedMedia.map(({ file }) => file).sort(),
  );

  let aggregateBytes = 0;
  for (const media of expectedMedia) {
    const path = join(mediaDirectory, media.file);
    assert.equal(statSync(path).size, media.bytes, `${media.file} byte count drifted`);
    assert.equal(sha256(path), media.sha256, `${media.file} SHA-256 drifted`);
    aggregateBytes += media.bytes;
  }

  assert.equal(aggregateBytes, 7_480_422);
  assert.ok(aggregateBytes <= 40 * 1024 * 1024);
  assert.deepEqual(
    Object.fromEntries(
      ["review-mp4", "review-webm", "poster", "transcript"].map((role) => [
        role,
        expectedMedia.filter((media) => media.role === role).length,
      ]),
    ),
    { "review-mp4": 3, "review-webm": 3, poster: 3, transcript: 3 },
  );
});

test("renders three accessibly named same-origin films in the required order", () => {
  const article = readRequired(articleRelativePath);
  const expectedOrder = [
    "Combined Quick Guide",
    "30-second product film",
    "60-second product film",
    "YouTube tutorial",
    "Project links",
    "Try reword_nerd.",
  ];
  let previousIndex = -1;
  for (const marker of expectedOrder) {
    const index = article.indexOf(marker);
    assert.ok(index > previousIndex, `${marker} is missing or out of order`);
    previousIndex = index;
  }

  const figureBlocks = [...article.matchAll(/<figure class="film-review__film">([\s\S]*?)<\/figure>/g)];
  assert.equal(figureBlocks.length, 3);
  const allIds = [...article.matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id);
  assert.equal(new Set(allIds).size, allIds.length, "Article IDs must be unique");
  const filmHeadingIds = figureBlocks.map(([, figure]) => {
    const heading = figure.match(/<h2 id="([^"]+)">/);
    assert.ok(heading, "Each film must have a heading ID");
    return heading[1];
  });
  assert.deepEqual(filmHeadingIds, [
    "combined-title",
    "marketing-30-title",
    "marketing-60-title",
  ]);

  for (const [index, film] of films.entries()) {
    const figure = figureBlocks[index][1];
    assert.match(figure, new RegExp(`<h2 id="${film.key}-title">${escapeRegExp(film.heading)}</h2>`));
    assert.match(figure, new RegExp(`<p id="${film.descriptionId}">[^<]+</p>`));

    const videoMatch = figure.match(/<video\s+([\s\S]*?)>([\s\S]*?)<\/video>/);
    assert.ok(videoMatch, `${film.key} must include a video`);
    const attributes = videoMatch[1];
    assert.match(attributes, /(?:^|\s)controls(?:\s|$)/);
    assert.match(attributes, /(?:^|\s)playsinline(?:\s|$)/);
    assert.match(attributes, /preload="metadata"/);
    assert.match(attributes, new RegExp(`aria-labelledby="${film.key}-title"`));
    assert.match(attributes, new RegExp(`aria-describedby="${film.descriptionId}"`));

    const poster = expectedMedia.find((media) => media.film === film.key && media.role === "poster");
    assert.match(attributes, new RegExp(`poster="${escapeRegExp(liquidMediaUrl(poster.file))}"`));

    const sources = [...videoMatch[2].matchAll(/<source src="([^"]+)" type="([^"]+)"\s*\/>/g)].map(
      ([, src, type]) => ({ src, type }),
    );
    const mp4 = expectedMedia.find((media) => media.film === film.key && media.role === "review-mp4");
    const webm = expectedMedia.find((media) => media.film === film.key && media.role === "review-webm");
    assert.deepEqual(sources, [
      { src: liquidMediaUrl(mp4.file), type: "video/mp4" },
      { src: liquidMediaUrl(webm.file), type: "video/webm" },
    ]);

    const transcript = expectedMedia.find(
      (media) => media.film === film.key && media.role === "transcript",
    );
    assert.match(
      figure,
      new RegExp(`<a href="${escapeRegExp(liquidMediaUrl(transcript.file))}">Plain-text transcript</a>`),
    );
  }
});

test("publishes the approved films inside a complete personal project article", () => {
  const article = readRequired(articleRelativePath);
  const essayBlocks = [
    ...article.matchAll(
      /<section class="film-review__essay" aria-labelledby="([^"]+)">([\s\S]*?)<\/section>/g,
    ),
  ];

  assert.deepEqual(
    essayBlocks.map(([, id]) => id),
    [
      "why-i-built-it",
      "what-reword-nerd-does",
      "the-text-workbench",
      "the-image-companion",
      "why-the-package-matters",
      "building-with-ai",
      "what-comes-next",
    ],
  );

  for (const [, id, contents] of essayBlocks) {
    assert.match(contents, new RegExp(`<h2 id="${escapeRegExp(id)}">[^<]+<\\/h2>`));
    const minimumParagraphs = id === "what-comes-next" ? 1 : 2;
    assert.ok(
      (contents.match(/<p(?:\s[^>]*)?>/g) ?? []).length >= minimumParagraphs,
      `${id} must contain at least ${minimumParagraphs} paragraph(s)`,
    );
  }

  assert.match(
    article,
    /<p class="article-subtitle">A local-first browser workbench for text rewording and image regeneration prompt packages<\/p>/,
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
  assert.match(
    article,
    /<strong>an exported package should\s+be reviewed before it is shared<\/strong>/,
  );
  assert.doesNotMatch(article, /ReWord Nerd/);
  assert.doesNotMatch(article, /aria-labelledby="what-i-learned"|id="what-i-learned"/);
  assert.ok(
    article.indexOf('aria-labelledby="why-i-built-it"') <
      article.indexOf("Combined Quick Guide"),
    "The personal introduction must precede the combined guide",
  );
  assert.ok(
    article.indexOf('aria-labelledby="what-comes-next"') <
      article.indexOf("YouTube tutorial"),
    "The forward-looking essay section must precede the tutorial placeholder",
  );
});

test("embeds the exact animated reword_nerd icon with responsive motion controls", () => {
  const article = readRequired(articleRelativePath);
  const css = readRequired("assets/css/site.css");
  const iconPath = absolutePath(iconRelativePath);

  assert.ok(existsSync(iconPath), `Missing required file: ${iconRelativePath}`);
  assert.equal(statSync(iconPath).size, expectedIcon.bytes, "Icon byte count drifted");
  assert.equal(sha256(iconPath), expectedIcon.sha256, "Icon SHA-256 drifted");

  const iconMarkup = article.match(
    /<details class="film-review__brand-mark" open>([\s\S]*?)<\/details>/,
  )?.[1];
  assert.ok(iconMarkup, "Missing collapsible animated icon near the introduction");
  assert.match(iconMarkup, /<summary>Animated reword_nerd icon \(toggle visibility\)<\/summary>/);
  assert.match(
    iconMarkup,
    /<img\s+[\s\S]*?src="{{ '\/assets\/images\/reword-nerd-icon\.gif' \| relative_url }}"[\s\S]*?alt="Animated teal reword_nerd pyramid icon"[\s\S]*?width="960"[\s\S]*?height="960"[\s\S]*?loading="lazy"[\s\S]*?decoding="async"[\s\S]*?\/>/,
  );

  const subtitleIndex = article.indexOf("film-review__brand-mark");
  assert.ok(article.indexOf("article-subtitle") < subtitleIndex);
  assert.ok(subtitleIndex < article.indexOf("On the human side of this pipeline"));
  assert.match(
    css,
    /\.film-review__brand-mark\s*{[\s\S]*?max-width:[\s\S]*?margin:[\s\S]*?}/,
  );
  assert.match(
    css,
    /\.film-review__brand-mark img\s*{[\s\S]*?display: block;[\s\S]*?width: 100%;[\s\S]*?height: auto;[\s\S]*?}/,
  );
  assert.match(
    css,
    /@media \(prefers-reduced-motion: reduce\)\s*{[\s\S]*?\.film-review__brand-mark img\s*{[\s\S]*?display: none;[\s\S]*?}/,
  );
});

test("selects a storage-free effective layout only for the review route", () => {
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
  assert.doesNotMatch(reviewArticle, /<script\b|localStorage|sessionStorage/i);

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

test("uses a request-free tutorial placeholder, exact project links, and exact final CTA", () => {
  const article = readRequired(articleRelativePath);
  const placeholder = article.match(
    /<section class="film-review__placeholder"[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(placeholder, "Missing YouTube tutorial placeholder");
  assert.match(placeholder, /<h2 id="youtube-tutorial">YouTube tutorial<\/h2>/);
  assert.match(placeholder, /<strong>Coming soon<\/strong>/);
  assert.doesNotMatch(placeholder, /<(?:iframe|a)\b|\b(?:href|src)=/i);

  for (const [label, href] of projectLinks) {
    assert.match(
      article,
      new RegExp(`<a href="${escapeRegExp(href)}">${escapeRegExp(label)}</a>`),
    );
  }

  assert.equal((article.match(/Try reword_nerd\./g) ?? []).length, 1);
  assert.match(
    article.trim(),
    /<p class="film-review__cta"><a href="https:\/\/ryanjosephkamp\.github\.io\/reword-nerd\/">Try reword_nerd\.<\/a><\/p>$/,
  );

  assert.doesNotMatch(article, /<iframe\b|\bautoplay\b|\bloop\b|youtube\.com|youtu\.be/i);
  assert.doesNotMatch(article, /localStorage|sessionStorage|analytics|dataLayer|gtag\s*\(/i);
  for (const [, source] of article.matchAll(/<(?:source|video)\b[^>]*\b(?:src|poster)="([^"]+)"/g)) {
    assert.match(source, /^{{ '\/assets\/media\/reword-nerd\/2026-08-14-r1\//);
    assert.doesNotMatch(source, /^https?:\/\//i);
  }
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
    ...expectedMedia
      .filter(({ role }) => role === "transcript")
      .map(({ file }) => `${mediaRelativeDirectory}/${file}`),
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

  for (const { file } of expectedMedia) {
    assert.doesNotMatch(file, /(?:master|captions|contact-sheet|ledger|receipt|manifest|\.srt$|\.vtt$)/i);
  }
});
