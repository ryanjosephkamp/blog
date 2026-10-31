// The interactive demos in the reword_nerd article. Every prompt, task folder, screening
// decision, and comparison below comes from reword_nerd's own engine; this file only lays the
// demos out. Nothing here calls a model or sends anything anywhere.
import "./demos.css";
import { taskSlug, terminalCommand, type Shell } from "@engine/handoff/commands";
import { DESTINATIONS, destination, type DestinationId } from "@engine/handoff/destinations";
import { buildTaskMarkdown, buildTextTaskZip, type TaskFile } from "@engine/handoff/agentTask";
import {
  ASPECT_LABELS,
  buildImagePrompt,
  buildImageTaskMarkdown,
  buildImageTaskZip,
  imageFileNames,
} from "@engine/handoff/imagePrompt";
import { buildOnePrompt, buildStagePrompt, STAGES, type Stage, type TextBatch } from "@engine/handoff/textPrompt";
import { DEFAULT_JOB, GOALS, LENGTH_LABELS, withGoal, type Goal, type Length, type RewriteJob } from "@engine/job";
import { markdownToDocx } from "@engine/results/export";
import { lineDiff, type DiffRow } from "@engine/results/lineDiff";
import { auditVerdict, parseReply } from "@engine/results/parse";
import { readFolderProject } from "@engine/text/project";
import type { AspectRatio, ImageSettings, ImageSource, ProjectExclusion } from "@engine/types";
import { createZipBudget, openZipArchive } from "@engine/zip";

// ---------------------------------------------------------------------------------------------
// Small DOM helpers

type Child = Node | string | null | undefined | false;
type Props = Record<string, string | number | boolean | undefined | null>;

function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Props = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === false) continue;
    if (key === "class") element.className = String(value);
    else if (key === "text") element.textContent = String(value);
    else element.setAttribute(key, value === true ? "" : String(value));
  }
  for (const child of children) {
    if (child !== null && child !== undefined && child !== false) element.append(child);
  }
  return element;
}

let counter = 0;
const uid = (name: string) => `rn-${name}-${(counter += 1)}`;

interface Option<T extends string> {
  value: T;
  label: string;
}

/** A row of radio buttons drawn as pills: one choice, keyboard friendly. */
function choices<T extends string>(
  legend: string,
  options: readonly Option<T>[],
  current: T,
  onChange: (value: T) => void,
): HTMLFieldSetElement {
  const name = uid("choice");
  const set = h("fieldset", { class: "rn-choices" }, h("legend", { text: legend }));
  for (const option of options) {
    const input = h("input", { type: "radio", name, value: option.value });
    input.checked = option.value === current;
    input.addEventListener("change", () => {
      if (input.checked) onChange(option.value);
    });
    set.append(h("label", { class: "rn-choice" }, input, h("span", { text: option.label })));
  }
  return set;
}

function field(label: string, control: HTMLElement, hint?: string): HTMLElement {
  const id = control.id || uid("field");
  control.id = id;
  return h(
    "div",
    { class: "rn-field" },
    h("label", { for: id, text: label }),
    control,
    hint ? h("p", { class: "rn-hint", text: hint }) : null,
  );
}

function checkbox(label: string, checked: boolean, onChange: (value: boolean) => void) {
  const input = h("input", { type: "checkbox" });
  input.checked = checked;
  input.addEventListener("change", () => onChange(input.checked));
  return h("label", { class: "rn-check" }, input, h("span", { text: label }));
}

function code(className = "rn-code"): HTMLPreElement {
  return h("pre", { class: className, tabindex: 0 });
}

function selectText(element: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

function flash(button: HTMLButtonElement, message: string) {
  const label = button.dataset.label ?? button.textContent ?? "";
  button.dataset.label = label;
  button.textContent = message;
  window.setTimeout(() => {
    button.textContent = label;
  }, 1800);
}

function copyButton(label: string, source: () => HTMLElement): HTMLButtonElement {
  const button = h("button", { type: "button", class: "rn-button", text: label });
  button.addEventListener("click", async () => {
    const element = source();
    try {
      await navigator.clipboard.writeText(element.textContent ?? "");
      flash(button, "Copied");
    } catch {
      selectText(element);
      flash(button, "Selected; copy it");
    }
  });
  return button;
}

/** How a demo hands a file to the reader. The host page can swap this out. */
export type Saver = (file: { name: string; blob: Blob }) => Promise<void>;

let saver: Saver = async ({ name, blob }) => {
  const url = URL.createObjectURL(blob);
  const link = h("a", { href: url, download: name, hidden: true });
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
};

export function setSaver(next: Saver) {
  saver = next;
}

function frame(root: HTMLElement, title: string, lede: string): HTMLElement {
  const body = h("div", { class: "rn-demo__body" });
  root.classList.add("rn-demo");
  root.append(
    h(
      "div",
      { class: "rn-demo__head" },
      h("p", { class: "rn-eyebrow", text: "Try it here" }),
      h("p", { class: "rn-demo__title", text: title }),
      h("p", { class: "rn-demo__lede", text: lede }),
    ),
    body,
    h("p", {
      class: "rn-demo__foot",
      text: "Built in your browser by reword_nerd's own code. Nothing here calls a model or uploads anything.",
    }),
  );
  return body;
}

/** A folder listing drawn from a task folder's real paths. */
function tree(paths: readonly string[]): HTMLElement {
  interface Node {
    name: string;
    children: Map<string, Node>;
    folder: boolean;
  }
  const top: Node = { name: "", children: new Map(), folder: true };
  for (const path of paths) {
    const parts = path.split("/").filter(Boolean);
    let node = top;
    parts.forEach((part, index) => {
      const last = index === parts.length - 1;
      const keep = part === ".keep";
      if (keep) return;
      let next = node.children.get(part);
      if (!next) {
        next = { name: part, children: new Map(), folder: !last || path.endsWith("/") };
        node.children.set(part, next);
      }
      if (!last) next.folder = true;
      node = next;
    });
    // A folder that only held .keep is still a folder.
    if (parts.at(-1) === ".keep") node.folder = true;
  }
  const render = (node: Node): HTMLUListElement => {
    const list = h("ul");
    const sorted = [...node.children.values()].sort((a, b) =>
      a.folder === b.folder ? a.name.localeCompare(b.name) : a.folder ? -1 : 1,
    );
    for (const child of sorted) {
      const item = h("li", { class: child.folder ? "is-folder" : "is-file" }, `${child.name}${child.folder ? "/" : ""}`);
      if (child.children.size > 0) item.append(render(child));
      list.append(item);
    }
    return list;
  };
  return h("div", { class: "rn-tree" }, render(top));
}

async function zipPaths(zip: Blob): Promise<string[]> {
  const archive = await openZipArchive(zip);
  const paths: string[] = [];
  for await (const entry of archive.entries()) paths.push(entry.path);
  await archive.close();
  return paths;
}

function debounce(run: () => void, wait = 160) {
  let timer = 0;
  return () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(run, wait);
  };
}

// ---------------------------------------------------------------------------------------------
// The sample document, shared by the hand-off and comparison demos

const SAMPLE_STEM = "library-hours";

const SAMPLE = `# Library hours during exams

At this point in time, we are in the process of considering a number of different options for extending the opening hours of the main library during the examination period.

It should be noted that a final decision will be made by the library committee no later than March 3, and all students will be notified by email in due course.

In the event that the hours are extended, the second floor will remain a silent study area at all times.
`;

const OWN_EDIT = `# Library hours during exams

We're weighing a few ways to keep the main library open longer during exams.

The library committee will decide by March 3, and every student will get an email.

If the hours are extended, the second floor will remain a silent study area at all times.
`;

// Written by hand for the demo, in the format reword_nerd asks for. The last paragraph drifts
// ("extended" becomes "change") while the audit still says PASS, which is the point.
const SAMPLE_REPLY = `<<<FINAL_DOCUMENT>>>
# Library hours during exams

We're looking at several ways to keep the main library open later while exams are on.

The library committee will make a final decision by March 3, and every student will get an email about it.

If the hours change, the second floor will stay a silent study area the whole time.
<<<END_FINAL_DOCUMENT>>>

<<<FIDELITY_AUDIT>>>
Meaning: PASS. The options, the March 3 deadline, the email, and the silent floor are all kept.
Settings: PASS. Plain and natural, about the same length.
Formatting and figures: PASS. The heading and three paragraphs are kept.
Open questions: None
<<<END_FIDELITY_AUDIT>>>
`;

// ---------------------------------------------------------------------------------------------
// Demo 1: hand it off

type TextFormat = "markdown" | "docx";

function mountHandoff(root: HTMLElement) {
  const body = frame(
    root,
    "Hand a document to your model",
    "Pick where the work will run and how it should read. The command, task folder, and prompts update as you go.",
  );

  const state = {
    destination: "claude-code" as DestinationId,
    format: "markdown" as TextFormat,
    goal: "clear" as Goal,
    length: "original" as Length,
    language: "",
    text: SAMPLE,
    shell: (/win/i.test(navigator.platform) ? "powershell" : "unix") as Shell,
    stepByStep: false,
    stage: "decompose" as Stage,
  };

  const textDestinations = DESTINATIONS.filter((item) => item.forText && !item.id.startsWith("other"));
  const fileName = () => `${SAMPLE_STEM}.${state.format === "docx" ? "docx" : "md"}`;
  const job = (): RewriteJob => ({
    ...withGoal({ ...DEFAULT_JOB }, state.goal),
    length: state.length,
    outputLanguage: state.language,
  });
  const batch = (): TextBatch => ({
    title: fileName(),
    files: [{ path: fileName(), text: state.text, format: state.format }],
    project: null,
    figures: [],
  });
  const taskFile = (original: Blob): TaskFile => ({
    path: fileName(),
    original,
    text: state.text,
    extractedText: state.text,
    format: state.format,
  });

  const language = h("input", { type: "text", placeholder: "Same as the source", autocomplete: "off" });
  language.addEventListener("input", () => {
    state.language = language.value;
    update();
  });
  const sample = h("textarea", { rows: 9, spellcheck: "true" });
  sample.value = state.text;
  sample.addEventListener("input", () => {
    state.text = sample.value;
    update();
  });

  const controls = h(
    "div",
    { class: "rn-controls" },
    choices(
      "Where it runs",
      textDestinations.map((item) => ({ value: item.id, label: item.label })),
      state.destination,
      (value) => {
        state.destination = value;
        update();
      },
    ),
    choices(
      "The file",
      [
        { value: "markdown", label: "Markdown" },
        { value: "docx", label: "Word" },
      ],
      state.format,
      (value) => {
        state.format = value;
        update();
      },
    ),
    choices(
      "Goal",
      (["clear", "polish", "academic"] as const).map((goal) => ({ value: goal, label: GOALS[goal].label })),
      state.goal,
      (value) => {
        state.goal = value;
        update();
      },
    ),
    choices(
      "Length",
      (["original", "shorter", "longer"] as const).map((length) => ({
        value: length,
        label: length === "original" ? "About the same" : LENGTH_LABELS[length],
      })),
      state.length,
      (value) => {
        state.length = value;
        update();
      },
    ),
    field("Output language", language),
    h(
      "details",
      { class: "rn-details" },
      h("summary", { text: "Edit the sample document" }),
      field(`${SAMPLE_STEM}.md`, sample, "Change anything; the hand-off below follows."),
    ),
  );

  const output = h("div", { class: "rn-output" });
  const status = h("p", { class: "rn-status", role: "status" });
  body.append(controls, output, status);

  // Agent view
  const command = code("rn-code rn-command");
  const treeSlot = h("div");
  const taskMd = code();
  const download = h("button", { type: "button", class: "rn-button", text: "Download this task folder" });
  const agentView = h(
    "div",
    { class: "rn-stack" },
    h("p", { class: "rn-label", text: "1. Paste this in a terminal" }),
    choices(
      "Terminal",
      [
        { value: "unix", label: "macOS or Linux" },
        { value: "powershell", label: "Windows" },
      ],
      state.shell,
      (value) => {
        state.shell = value;
        update();
      },
    ),
    command,
    h("div", { class: "rn-row" }, copyButton("Copy command", () => command), download),
    h("p", { class: "rn-label", text: "2. The agent works inside this folder" }),
    treeSlot,
    h("details", { class: "rn-details" }, h("summary", { text: "Read TASK.md, the agent's instructions" }), taskMd),
  );

  // Chat view
  const prompt = code();
  const openLink = h("a", { class: "rn-button rn-button--quiet", target: "_blank", rel: "noopener noreferrer" });
  const stageSlot = h("div");
  const chatView = h(
    "div",
    { class: "rn-stack" },
    checkbox("Go step by step (four prompts, for long or delicate documents)", state.stepByStep, (value) => {
      state.stepByStep = value;
      update();
    }),
    stageSlot,
    h("p", { class: "rn-label rn-prompt-label" }),
    prompt,
    h("div", { class: "rn-row" }, copyButton("Copy prompt", () => prompt), openLink),
  );
  const stageChoices = choices(
    "Stage",
    STAGES.map((stage, index) => ({ value: stage, label: `${index + 1}. ${stage[0].toUpperCase()}${stage.slice(1)}` })),
    state.stage,
    (value) => {
      state.stage = value;
      update();
    },
  );
  stageSlot.append(stageChoices);

  download.addEventListener("click", async () => {
    download.disabled = true;
    try {
      const original =
        state.format === "docx"
          ? await markdownToDocx(state.text)
          : new Blob([state.text], { type: "text/markdown" });
      const slug = taskSlug(fileName());
      const zip = await buildTextTaskZip({ batch: batch(), files: [taskFile(original)], assets: [] }, job(), slug);
      await saver({ name: `${slug}.zip`, blob: zip });
      status.textContent = `Saved ${slug}.zip. Unzip it in Downloads and paste the command.`;
    } catch (error) {
      status.textContent = `That didn't save: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      download.disabled = false;
    }
  });

  let run = 0;
  const update = debounce(async () => {
    const mine = (run += 1);
    const picked = destination(state.destination);
    if (picked.kind === "agent") {
      const slug = taskSlug(fileName());
      command.textContent = terminalCommand(slug, picked, state.shell);
      taskMd.textContent = buildTaskMarkdown({ batch: batch(), files: [taskFile(new Blob())], assets: [] }, job());
      const zip = await buildTextTaskZip({ batch: batch(), files: [taskFile(new Blob())], assets: [] }, job(), slug);
      const paths = await zipPaths(zip);
      if (mine !== run) return;
      treeSlot.replaceChildren(tree(paths));
      output.replaceChildren(agentView);
      status.textContent = `${picked.label}: one command, then the agent follows TASK.md. ${picked.hint}`;
    } else {
      stageChoices.hidden = !state.stepByStep;
      const text = state.stepByStep
        ? buildStagePrompt(batch(), job(), state.stage)
        : buildOnePrompt(batch(), job());
      prompt.textContent = text;
      const label = chatView.querySelector(".rn-prompt-label")!;
      label.textContent = state.stepByStep
        ? `Prompt ${STAGES.indexOf(state.stage) + 1} of 4 for ${picked.label}`
        : `One prompt for ${picked.label}`;
      openLink.textContent = `Open ${picked.label}`;
      openLink.setAttribute("href", picked.url ?? "#");
      output.replaceChildren(chatView);
      status.textContent = `${text.length.toLocaleString("en-US")} characters. Paste it into a new chat${
        state.stepByStep ? ". In the app, you paste each reply back, and it goes into the next prompt for you" : ""
      }.`;
    }
  }, 60);
  update();
}

// ---------------------------------------------------------------------------------------------
// Demo 2: what gets left out of a project

const EXCLUSION_LABELS: Record<ProjectExclusion, string> = {
  "dependency-or-build-output": "dependency or build output",
  "lock-file": "lock file",
  binary: "not a text file",
  "too-large": "too large",
  credentials: "may contain passwords or keys",
  "ignored-by-gitignore": "listed in .gitignore",
  "unreadable-text": "couldn't be read as text",
  "link-or-locked": "a link or a password-protected file",
  "nested-archive": "archive inside the project",
};

// A 1×1 PNG, so the picture in the sample project is a real image file.
const PIXEL = Uint8Array.from(
  atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="),
  (char) => char.charCodeAt(0),
);

const DEPLOY_YAML = `# Where the site is published
host: docs.example.org
branch: main
api_token: 9f8e7d6c5b4a3f2e1d0c
`;

const PROJECT_FILES: { path: string; content: string | Uint8Array }[] = [
  { path: "README.md", content: "# Field notes\n\nA small site for our survey notes.\n" },
  { path: "docs/guide.md", content: "# Guide\n\nAdd a note, then publish it.\n" },
  { path: "src/app.js", content: "// Shows the latest note.\nexport const title = \"Latest note\";\n" },
  { path: "package.json", content: '{\n  "name": "field-notes",\n  "private": true\n}\n' },
  { path: "package-lock.json", content: '{\n  "lockfileVersion": 3\n}\n' },
  { path: "node_modules/left-pad/index.js", content: "module.exports = () => {};\n" },
  { path: "dist/app.min.js", content: "export const t=\"Latest note\";\n" },
  { path: ".env", content: "SECRET=do-not-share\n" },
  { path: ".gitignore", content: "scratch/\n" },
  { path: "scratch/todo.md", content: "- tidy the guide\n" },
  { path: "images/logo.png", content: PIXEL },
  { path: "backup.zip", content: "PK" },
  { path: ".DS_Store", content: "" },
];

const EXTRA_EXAMPLES = [".env.example", "id_ed25519", "build/index.html", "src/build/notes.md"];

function mountProject(root: HTMLElement) {
  const body = frame(
    root,
    "Add a whole project",
    "A sample project folder, screened by the same rules the app uses. Edit the YAML file or add a file name and watch what changes.",
  );

  const extras: string[] = [];
  const yaml = h("textarea", { rows: 5, spellcheck: "false", class: "rn-mono" });
  yaml.value = DEPLOY_YAML;
  const extra = h("input", { type: "text", placeholder: "e.g. secrets.json", autocomplete: "off", class: "rn-mono" });
  const add = h("button", { type: "button", class: "rn-button", text: "Add file" });
  const examples = h("div", { class: "rn-row rn-row--tight" });
  for (const example of EXTRA_EXAMPLES) {
    const button = h("button", { type: "button", class: "rn-chip", text: example });
    button.addEventListener("click", () => addPath(example));
    examples.append(button);
  }
  const reset = h("button", { type: "button", class: "rn-button rn-button--quiet", text: "Start over" });

  const results = h("div", { class: "rn-columns" });
  const status = h("p", { class: "rn-status", role: "status" });

  body.append(
    h(
      "div",
      { class: "rn-controls" },
      field("config/deploy.yaml", yaml, "Delete the token line, or change it to a placeholder like your-token-here."),
      h(
        "div",
        { class: "rn-field" },
        h("label", { for: (extra.id = uid("extra")), text: "Add a file to the project" }),
        h("div", { class: "rn-row rn-row--tight" }, extra, add),
        examples,
      ),
      h("div", { class: "rn-row" }, reset),
    ),
    results,
    status,
  );

  function addPath(path: string) {
    const clean = path.trim().replace(/^\/+/, "");
    if (!clean || extras.includes(clean)) return;
    extras.push(clean);
    extra.value = "";
    update();
  }
  add.addEventListener("click", () => addPath(extra.value));
  extra.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addPath(extra.value);
    }
  });
  yaml.addEventListener("input", () => update());
  reset.addEventListener("click", () => {
    extras.length = 0;
    yaml.value = DEPLOY_YAML;
    update();
  });

  const column = (title: string, items: HTMLElement[], empty: string, kind: string) =>
    h(
      "section",
      { class: `rn-column rn-column--${kind}` },
      h("p", { class: "rn-label", text: `${title} (${items.length})` }),
      items.length ? h("ul", { class: "rn-files" }, ...items) : h("p", { class: "rn-hint", text: empty }),
    );

  let run = 0;
  const update = debounce(async () => {
    const mine = (run += 1);
    const files = [
      ...PROJECT_FILES,
      { path: "config/deploy.yaml", content: yaml.value },
      ...extras.map((path) => ({ path, content: "Notes for later.\n" })),
    ].map(({ path, content }) => ({
      path,
      file: new File([typeof content === "string" ? content : new Uint8Array(content)], path.split("/").pop()!),
    }));
    try {
      const { project, sources } = await readFolderProject("field-notes", files, {
        budget: createZipBudget(10 * 1024 * 1024),
      });
      if (mine !== run) return;
      const rewritten = sources
        .map((source) => source.path)
        .sort()
        .map((path) => h("li", {}, h("code", { text: path })));
      const kept = project.assets.map((asset) => h("li", {}, h("code", { text: asset.path })));
      const left = project.excluded.map((item) =>
        h("li", {}, h("code", { text: item.path }), h("span", { class: "rn-reason", text: EXCLUSION_LABELS[item.reason] })),
      );
      results.replaceChildren(
        column("Handed off", rewritten, "Nothing to hand off.", "in"),
        column("Kept, not rewritten", kept, "None.", "kept"),
        column("Left out", left, "Nothing left out.", "out"),
      );
      status.textContent = `${rewritten.length} files handed off, ${kept.length} kept as is, and ${left.length} left out. The .DS_Store file is skipped without a mention.`;
    } catch (error) {
      if (mine !== run) return;
      results.replaceChildren();
      status.textContent = error instanceof Error ? error.message : String(error);
    }
  });
  update();
}

// ---------------------------------------------------------------------------------------------
// Demo 3: the comparison, after a model or by hand

type CompareMode = "reply" | "own";

function diffTable(rows: readonly DiffRow[]): HTMLElement {
  const table = h("table", { class: "rn-diff" });
  table.append(
    h("colgroup", {}, h("col", { class: "rn-diff__num" }), h("col", { class: "rn-diff__num" }), h("col", { class: "rn-diff__sign" }), h("col")),
  );
  const tbody = h("tbody");
  for (const row of rows) {
    const text = h("td", { class: "rn-diff__text" });
    for (const segment of row.segments) {
      text.append(segment.changed ? h("mark", { class: "rn-diff__word", text: segment.text }) : segment.text);
    }
    if (!row.segments.some((segment) => segment.text)) text.append(" ");
    tbody.append(
      h(
        "tr",
        { class: `rn-diff__${row.kind}` },
        h("td", { class: "rn-diff__n", text: row.oldLine ?? "" }),
        h("td", { class: "rn-diff__n", text: row.newLine ?? "" }),
        h("td", { class: "rn-diff__s", text: row.kind === "add" ? "+" : row.kind === "del" ? "−" : "" }),
        text,
      ),
    );
  }
  table.append(tbody);
  return h("div", { class: "rn-diff-scroll", tabindex: 0, role: "region", "aria-label": "Changes" }, table);
}

function mountChanges(root: HTMLElement) {
  const body = frame(
    root,
    "See every change",
    "Paste a model's reply, or edit the text yourself. Removed lines are red, new lines are green, and the words that changed are marked inside them.",
  );
  const state = { mode: "reply" as CompareMode };
  const reply = h("textarea", { rows: 12, spellcheck: "false", class: "rn-mono" });
  reply.value = SAMPLE_REPLY;
  const own = h("textarea", { rows: 9, spellcheck: "true" });
  own.value = OWN_EDIT;

  const replyField = field(
    "The reply",
    reply,
    "A sample reply, written by hand for this demo. Paste a real one from the demo above to see yours.",
  );
  const ownField = field("Your version", own, "The sample document, already edited a little. Keep going.");
  const reset = h("button", { type: "button", class: "rn-button rn-button--quiet", text: "Start over" });
  const verdict = h("p", { class: "rn-verdict" });
  const audit = code("rn-code rn-audit");
  const stats = h("p", { class: "rn-stats" });
  const table = h("div");
  const status = h("p", { class: "rn-status", role: "status" });

  body.append(
    h(
      "div",
      { class: "rn-controls" },
      choices(
        "Compare",
        [
          { value: "reply", label: "A model's reply" },
          { value: "own", label: "My own edits" },
        ],
        state.mode,
        (value) => {
          state.mode = value;
          update();
        },
      ),
      replyField,
      ownField,
      h("div", { class: "rn-row" }, reset),
    ),
    h("div", { class: "rn-stack" }, verdict, audit, stats, table),
    status,
  );

  reply.addEventListener("input", () => update());
  own.addEventListener("input", () => update());
  reset.addEventListener("click", () => {
    reply.value = SAMPLE_REPLY;
    own.value = OWN_EDIT;
    update();
  });

  let run = 0;
  const update = debounce(async () => {
    const mine = (run += 1);
    replyField.hidden = state.mode !== "reply";
    ownField.hidden = state.mode !== "own";
    let after = own.value;
    verdict.hidden = audit.hidden = state.mode !== "reply";
    if (state.mode === "reply") {
      const parsed = parseReply(reply.value);
      after = parsed.document ?? "";
      const check = auditVerdict(parsed.audit);
      verdict.className = `rn-verdict rn-verdict--${check}`;
      verdict.textContent =
        check === "pass"
          ? "The model's own check: PASS"
          : check === "review"
            ? "The model's own check: look closer"
            : "No check in this reply";
      audit.textContent = parsed.audit ?? "";
      audit.hidden = !parsed.audit;
      if (parsed.unstructured) verdict.textContent = "No markers found, so the whole reply is treated as the rewrite";
    }
    const diff = await lineDiff(SAMPLE, after);
    if (mine !== run) return;
    stats.replaceChildren(
      h("span", { class: "rn-stats__add", text: `+${diff.added}` }),
      " ",
      h("span", { class: "rn-stats__del", text: `−${diff.removed}` }),
      ` lines against ${SAMPLE_STEM}.md`,
    );
    table.replaceChildren(diffTable(diff.rows));
    status.textContent = `${diff.added} lines added and ${diff.removed} removed.`;
  });
  update();
}

// ---------------------------------------------------------------------------------------------
// Demo 4: images

const SAMPLE_IMAGE = { name: "bakery.png", width: 640, height: 480, text: "BAKERY" };

/** Draws the sample picture, so the demo has a real image without shipping a photo. */
function drawBakery(): HTMLCanvasElement {
  const canvas = h("canvas", { width: SAMPLE_IMAGE.width, height: SAMPLE_IMAGE.height });
  const g = canvas.getContext("2d")!;
  const sky = g.createLinearGradient(0, 0, 0, 360);
  sky.addColorStop(0, "#8fcbea");
  sky.addColorStop(1, "#e9f5fb");
  g.fillStyle = sky;
  g.fillRect(0, 0, 640, 480);
  g.fillStyle = "#ffd25a";
  g.beginPath();
  g.arc(548, 86, 44, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#86bb73";
  g.beginPath();
  g.ellipse(120, 420, 330, 110, 0, Math.PI, 0);
  g.fill();
  g.fillStyle = "#6fa65d";
  g.fillRect(0, 380, 640, 100);
  // The shop
  g.fillStyle = "#f4e4c4";
  g.fillRect(200, 190, 250, 200);
  for (let index = 0; index < 10; index += 1) {
    g.fillStyle = index % 2 ? "#ffffff" : "#d4574f";
    g.fillRect(190 + index * 27, 190, 27, 34);
  }
  g.fillStyle = "#5b3f2c";
  g.fillRect(232, 128, 186, 50);
  g.fillStyle = "#fff6e6";
  g.font = "700 32px Georgia, serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(SAMPLE_IMAGE.text, 325, 154);
  g.fillStyle = "#6b4a33";
  g.fillRect(302, 284, 52, 106);
  g.fillStyle = "#c3e5f3";
  g.fillRect(220, 250, 66, 62);
  g.fillRect(372, 250, 62, 62);
  g.strokeStyle = "#5b3f2c";
  g.lineWidth = 4;
  g.strokeRect(220, 250, 66, 62);
  g.strokeRect(372, 250, 62, 62);
  // A tree
  g.fillStyle = "#7a5230";
  g.fillRect(92, 300, 18, 84);
  g.fillStyle = "#4f8f4a";
  for (const [x, y, r] of [
    [101, 270, 46],
    [72, 296, 34],
    [130, 298, 34],
  ]) {
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  }
  return canvas;
}

function mountImage(root: HTMLElement) {
  const body = frame(
    root,
    "Regenerate an image",
    "Say what should change and what must stay. reword_nerd writes the prompt to paste beside the image, or a folder for an agent that makes images.",
  );
  const canvas = drawBakery();
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "A sample picture: a small bakery with a red and white awning, a tree, and the sun.");
  canvas.classList.add("rn-picture");
  let png: Blob = new Blob();
  const pngReady = new Promise<void>((resolve) =>
    canvas.toBlob((blob) => {
      if (blob) png = blob;
      resolve();
    }, "image/png"),
  );

  const imageDestinations = DESTINATIONS.filter((item) => item.forImages && !item.id.startsWith("other"));
  const settings: ImageSettings = {
    aspectRatio: "match-source",
    keepVisibleText: true,
    keepBackground: false,
    changes: "Make it look like a watercolor painting.",
    mustKeep: "",
  };
  const state = {
    destination: "grok-imagine" as DestinationId,
    visibleText: SAMPLE_IMAGE.text,
    shell: (/win/i.test(navigator.platform) ? "powershell" : "unix") as Shell,
  };

  const changes = h("input", { type: "text", autocomplete: "off" });
  changes.value = settings.changes;
  const keep = h("input", { type: "text", autocomplete: "off", placeholder: "e.g. the shape of the awning" });
  const seen = h("input", { type: "text", autocomplete: "off" });
  seen.value = state.visibleText;
  const aspect = h("select");
  for (const [value, label] of Object.entries(ASPECT_LABELS)) aspect.append(h("option", { value, text: label }));
  aspect.value = settings.aspectRatio;

  changes.addEventListener("input", () => {
    settings.changes = changes.value;
    update();
  });
  keep.addEventListener("input", () => {
    settings.mustKeep = keep.value;
    update();
  });
  seen.addEventListener("input", () => {
    state.visibleText = seen.value;
    update();
  });
  aspect.addEventListener("change", () => {
    settings.aspectRatio = aspect.value as AspectRatio;
    update();
  });

  const image = (): ImageSource => ({
    id: "sample",
    kind: "image",
    name: SAMPLE_IMAGE.name,
    from: null,
    original: png,
    mimeType: "image/png",
    width: SAMPLE_IMAGE.width,
    height: SAMPLE_IMAGE.height,
    byteCount: png.size,
    sha256: "",
    included: true,
    visibleText: state.visibleText,
    settings: null,
    notes: [],
  });

  body.append(
    h(
      "div",
      { class: "rn-split" },
      h("figure", { class: "rn-figure" }, canvas, h("figcaption", { text: "bakery.png, 640 × 480, drawn by this page" })),
      h(
        "div",
        { class: "rn-controls" },
        choices(
          "Where it runs",
          imageDestinations.map((item) => ({
            value: item.id,
            label: item.id === "codex-images" ? "Codex (a folder)" : item.label,
          })),
          state.destination,
          (value) => {
            state.destination = value;
            update();
          },
        ),
        field("What should change", changes),
        field("Also keep", keep),
        field("Text in the picture", seen, "The app reads this with OCR, and you can correct it."),
        h(
          "div",
          { class: "rn-row rn-row--tight" },
          checkbox("Keep the visible text", settings.keepVisibleText, (value) => {
            settings.keepVisibleText = value;
            update();
          }),
          checkbox("Keep the background", settings.keepBackground, (value) => {
            settings.keepBackground = value;
            update();
          }),
        ),
        field("Aspect ratio", aspect),
      ),
    ),
  );

  const output = h("div", { class: "rn-output" });
  const status = h("p", { class: "rn-status", role: "status" });
  body.append(output, status);

  const prompt = code();
  const openLink = h("a", { class: "rn-button rn-button--quiet", target: "_blank", rel: "noopener noreferrer" });
  const promptView = h(
    "div",
    { class: "rn-stack" },
    h("p", { class: "rn-label rn-prompt-label" }),
    prompt,
    h("div", { class: "rn-row" }, copyButton("Copy prompt", () => prompt), openLink),
  );

  const command = code("rn-code rn-command");
  const treeSlot = h("div");
  const taskMd = code();
  const download = h("button", { type: "button", class: "rn-button", text: "Download this task folder" });
  const folderView = h(
    "div",
    { class: "rn-stack" },
    h("p", { class: "rn-label", text: "Paste this in a terminal" }),
    command,
    h("div", { class: "rn-row" }, copyButton("Copy command", () => command), download),
    h("p", { class: "rn-label", text: "Codex makes every image in this folder" }),
    treeSlot,
    h("details", { class: "rn-details" }, h("summary", { text: "Read TASK.md and the image's prompt" }), taskMd),
  );

  download.addEventListener("click", async () => {
    download.disabled = true;
    try {
      await pngReady;
      const slug = taskSlug("images");
      const zip = await buildImageTaskZip([image()], settings, state.destination, slug);
      await saver({ name: `${slug}.zip`, blob: zip });
      status.textContent = `Saved ${slug}.zip.`;
    } catch (error) {
      status.textContent = `That didn't save: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      download.disabled = false;
    }
  });

  let run = 0;
  const update = debounce(async () => {
    const mine = (run += 1);
    const picked = destination(state.destination);
    const text = buildImagePrompt(image(), settings, state.destination);
    if (picked.kind === "agent") {
      const slug = taskSlug("images");
      command.textContent = terminalCommand(slug, picked, state.shell);
      const names = imageFileNames([image()]);
      taskMd.textContent = `${buildImageTaskMarkdown([image()], names)}\n---\nprompts/bakery.md\n\n${text}`;
      const zip = await buildImageTaskZip([image()], settings, state.destination, slug);
      const paths = await zipPaths(zip);
      if (mine !== run) return;
      treeSlot.replaceChildren(tree(paths));
      output.replaceChildren(folderView);
      status.textContent = picked.hint;
    } else {
      prompt.textContent = text;
      promptView.querySelector(".rn-prompt-label")!.textContent = `Attach bakery.png in ${picked.label}, then paste`;
      openLink.textContent = `Open ${picked.label}`;
      openLink.setAttribute("href", picked.url ?? "#");
      output.replaceChildren(promptView);
      status.textContent = picked.hint;
    }
  });
  update();
}

// ---------------------------------------------------------------------------------------------
// Mounting

const DEMOS: Record<string, (root: HTMLElement) => void> = {
  handoff: mountHandoff,
  project: mountProject,
  changes: mountChanges,
  image: mountImage,
};

/** Mounts every demo placeholder (`<div data-rn-demo="handoff">`) inside `scope`. */
export function mount(scope: ParentNode = document) {
  for (const element of scope.querySelectorAll<HTMLElement>("[data-rn-demo]")) {
    if (element.dataset.rnMounted) continue;
    const start = DEMOS[element.dataset.rnDemo ?? ""];
    if (!start) continue;
    element.dataset.rnMounted = "true";
    element.replaceChildren();
    start(element);
  }
}

declare global {
  interface Window {
    rewordNerdDemos?: { mount: typeof mount; setSaver: typeof setSaver };
  }
}

window.rewordNerdDemos = { mount, setSaver };
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => mount());
else mount();
document.dispatchEvent(new CustomEvent("rn-demos-ready"));
