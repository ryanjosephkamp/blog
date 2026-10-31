/* reword_nerd article demos, built from reword-nerd e85cf0f by tools/reword-nerd-demos. Rebuild; don't edit. */
import { r as e } from "./rolldown-runtime-Bj0s5Odl.js";
// ../reword-nerd/src/engine/handoff/commands.ts
var t = "Follow TASK.md";
function n(e, t = /* @__PURE__ */ new Date()) {
	let n = e.replace(/\.[a-z0-9]{1,5}$/i, "").normalize("NFKD").replace(/[^\w\s-]/g, "").toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 32).replace(/-$/, "") || "task", r = (e) => String(e).padStart(2, "0");
	return `rn-${n}-${`${r(t.getMonth() + 1)}${r(t.getDate())}-${r(t.getHours())}${r(t.getMinutes())}`}`;
}
function r(e, n, r) {
	let i = n.launch?.(t);
	if (r === "powershell") {
		let t = `cd ~\\Downloads; if (-not (Test-Path ${e})) { Expand-Archive ${e}.zip -DestinationPath . }; cd ${e}`;
		return i ? `${t}; ${i}` : t;
	}
	let a = `cd ~/Downloads && { [ -d ${e} ] || unzip -q ${e}.zip; } && cd ${e}`;
	return i ? `${a} && ${i}` : a;
}
// ../reword-nerd/src/engine/handoff/destinations.ts
var i = (e) => `"${e.replaceAll("\"", "\\\"")}"`, a = [
	{
		id: "claude-code",
		kind: "agent",
		label: "Claude Code",
		launch: (e) => `claude ${i(e)}`,
		forText: !0,
		forImages: !1,
		hint: "Runs all four stages and writes the files. Approve its file writes when it asks."
	},
	{
		id: "codex",
		kind: "agent",
		label: "Codex",
		launch: (e) => `codex ${i(e)}`,
		forText: !0,
		forImages: !1,
		hint: "Runs all four stages and writes the files. Approve its file writes when it asks."
	},
	{
		id: "gemini-cli",
		kind: "agent",
		label: "Gemini CLI",
		launch: (e) => `gemini -i ${i(e)}`,
		forText: !0,
		forImages: !1,
		hint: "Runs all four stages and writes the files. Approve its file writes when it asks."
	},
	{
		id: "other-agent",
		kind: "agent",
		label: "Another agent",
		forText: !0,
		forImages: !1,
		hint: "Open the folder in your agent and tell it: Follow TASK.md."
	},
	{
		id: "chatgpt",
		kind: "chat",
		label: "ChatGPT",
		url: "https://chatgpt.com/",
		forText: !0,
		forImages: !1,
		hint: "Paste the prompt into a new chat."
	},
	{
		id: "claude",
		kind: "chat",
		label: "Claude",
		url: "https://claude.ai/new",
		forText: !0,
		forImages: !1,
		hint: "Paste the prompt into a new chat."
	},
	{
		id: "gemini",
		kind: "chat",
		label: "Gemini",
		url: "https://gemini.google.com/app",
		forText: !0,
		forImages: !1,
		hint: "Paste the prompt into a new chat."
	},
	{
		id: "grok",
		kind: "chat",
		label: "Grok",
		url: "https://grok.com/",
		forText: !0,
		forImages: !1,
		hint: "Paste the prompt into a new chat."
	},
	{
		id: "other-chat",
		kind: "chat",
		label: "Another chat app",
		forText: !0,
		forImages: !1,
		hint: "Paste the prompt into a new chat."
	},
	{
		id: "grok-imagine",
		kind: "image",
		label: "Grok Imagine",
		url: "https://grok.com/imagine",
		forText: !1,
		forImages: !0,
		hint: "Attach the image, then paste its prompt."
	},
	{
		id: "chatgpt-images",
		kind: "image",
		label: "ChatGPT",
		url: "https://chatgpt.com/",
		forText: !1,
		forImages: !0,
		hint: "Attach the image, then paste its prompt."
	},
	{
		id: "gemini-images",
		kind: "image",
		label: "Gemini",
		url: "https://gemini.google.com/app",
		forText: !1,
		forImages: !0,
		hint: "Attach the image, then paste its prompt."
	},
	{
		id: "midjourney",
		kind: "image",
		label: "Midjourney",
		url: "https://www.midjourney.com/imagine",
		forText: !1,
		forImages: !0,
		hint: "Add the image as an image prompt, then paste its prompt."
	},
	{
		id: "codex-images",
		kind: "agent",
		label: "Codex",
		launch: (e) => `codex ${i(e)}`,
		forText: !1,
		forImages: !0,
		hint: "Regenerates every image in the folder from one command."
	},
	{
		id: "other-image",
		kind: "image",
		label: "Another image tool",
		forText: !1,
		forImages: !0,
		hint: "Attach the image, then paste its prompt."
	}
];
function o(e) {
	let t = a.find((t) => t.id === e);
	if (!t) throw Error(`Unknown destination: ${e}`);
	return t;
}
// ../reword-nerd/src/engine/prompts/decompose.md?raw
var s = "## Stage 1 of 4: Decompose\n\nDon't rewrite anything yet. Extract and organize the meaning of the source so a later stage can rewrite it without losing anything.\n\nUse this structure:\n\n```markdown\n## Type and purpose\n\n[What kind of document this is and what it's for]\n\n## Main point\n\n[One paragraph stating the central argument or purpose]\n\n## Claims and support\n\n- Claim: ...\n  - Support: ...\n\n## Facts that must survive\n\n- [Numbers, names, dates, technical terms, findings, citations]\n\n## Structure\n\n1. [Section or movement]\n\n## Constraints\n\n- Must keep: [critical elements]\n- Register: [academic, professional, neutral, and so on]\n- Wording that must not change in meaning: [precise or sensitive statements]\n\n## Ambiguities\n\n[Anything unclear or open to more than one reading]\n```\n\nBe complete about meaning and brief in wording. Don't add anything that isn't in the source. Return only the decomposition.\n", c = "## Stage 3 of 4: Verify\n\nCompare the candidate rewrite with the source and the decomposition. Be strict about meaning.\n\nUse this structure:\n\n```markdown\n## Overall\n\nPASS, PASS WITH MINOR ISSUES, or NEEDS REVISION, with one sentence of justification.\n\n## Coverage\n\n- Fully kept: ...\n- Weakened: ...\n- Missing or distorted: ...\n\n## Difference from the original\n\n[Where the wording or structure is still too close to the source]\n\n## Settings\n\n[Whether the tone, formality, length, language, and notes were followed]\n\n## Issues\n\n1. [Issue, with a quote or location]\n\nWrite \"None.\" if there are no issues.\n\n## Fixes\n\n- [Concrete changes for the final pass]\n```\n\nReturn only the report.\n", l = Object.freeze({
	docsAndMarkup: !0,
	comments: !0,
	userFacingStrings: !0,
	dataValues: !1
}), u = Object.freeze({
	clear: {
		label: "Make it clear",
		summary: "Plain language, same substance.",
		tone: "plain",
		formality: "natural"
	},
	polish: {
		label: "Polish it",
		summary: "Considered, confident, and professional.",
		tone: "professional",
		formality: "natural"
	},
	academic: {
		label: "Make it academic",
		summary: "Precise language for scholarly readers.",
		tone: "academic",
		formality: "formal"
	},
	custom: {
		label: "Custom",
		summary: "Set every option yourself.",
		tone: "original",
		formality: "original"
	}
}), d = Object.freeze({
	goal: "clear",
	tone: u.clear.tone,
	formality: u.clear.formality,
	length: "original",
	outputLanguage: "",
	notes: "",
	codeScope: l
}), f = Object.freeze({
	original: "Keep the original tone",
	plain: "Plain",
	professional: "Professional",
	academic: "Academic",
	technical: "Technical",
	friendly: "Friendly"
}), p = Object.freeze({
	original: "Keep the original formality",
	natural: "Natural",
	formal: "Formal"
}), m = Object.freeze({
	original: "About the same length",
	shorter: "Shorter",
	longer: "Longer"
});
function h(e, t) {
	return t === "custom" ? {
		...e,
		goal: t
	} : {
		...e,
		goal: t,
		tone: u[t].tone,
		formality: u[t].formality
	};
}
function g(e) {
	let t = [
		`- Tone: ${f[e.tone]}`,
		`- Formality: ${p[e.formality]}`,
		`- Length: ${m[e.length]}`,
		`- Output language: ${e.outputLanguage.trim() || "The same language as the source"}`,
		`- Notes from the user: ${e.notes.trim() || "None."}`
	];
	return e.goal !== "custom" && t.unshift(`- Goal: ${u[e.goal].label}. ${u[e.goal].summary}`), t.join("\n");
}
function _(e) {
	let t = (e) => e ? "may change" : "keep exactly as written";
	return [
		`- Documentation and markup prose: ${t(e.docsAndMarkup)}`,
		`- Code comments and docstrings: ${t(e.comments)}`,
		`- User-facing strings: ${t(e.userFacingStrings)}`,
		`- Prose values inside structured data: ${t(e.dataValues)}`,
		"- Code, identifiers, keys, paths, numbers, placeholders, and syntax: never change"
	].join("\n");
}
// ../reword-nerd/src/engine/prompts/one-prompt.md?raw
var v = "## Your task\n\nRewrite the source above in one response. Work through these four stages before you answer:\n\n1. **Decompose.** Build a complete inventory of the source's meaning: every material claim, fact, figure, name, date, relationship, constraint, protected term, citation, and ambiguity.\n2. **Rewrite.** Write a new version with substantially different phrasing and structure that keeps everything in the inventory.\n3. **Verify.** Compare your rewrite with the source and the inventory. Look for omissions, additions the source doesn't support, changes in meaning, passages that stay too close to the original wording, and settings you didn't follow.\n4. **Final.** Fix every problem you found and finish the document.\n\nKeep the inventory, the draft, and the checks to yourself. Return only what the output format below asks for.\n\n## Rules\n\n- Use only the source as evidence. Don't invent claims, data, citations, or interpretations.\n- Keep all of the meaning while changing the wording and sentence structure substantially.\n- Follow the settings below.\n- Keep the source's format: Markdown stays Markdown, HTML stays valid HTML, LaTeX stays compilable LaTeX, code stays working code.\n", y = "## Stage 2 of 4: Rewrite\n\nUsing the source and the decomposition, write a complete new version that:\n\n- keeps every claim, fact, and relationship in the decomposition;\n- uses substantially different sentences, phrasing, paragraph order, and transitions;\n- reads as natural prose, not a mechanical paraphrase;\n- follows the settings.\n\nYou may reorganize sections when the logic stays intact. Don't add claims, evidence, or interpretations the source doesn't support, and don't drop anything the decomposition marks as essential.\n\nReturn only the rewritten document.\n", b = "## Stage 4 of 4: Final\n\nProduce the finished document:\n\n- fix every issue the verification report supports, checking each fix against the source and the decomposition;\n- improve clarity and flow where needed;\n- keep the rewrite's distance from the original wording;\n- add nothing new.\n\nReturn the final document in the output format below, with no other notes.\n", x = [
	"decompose",
	"rewrite",
	"verify",
	"final"
], S = /* @__PURE__ */ new Set([
	"html",
	"xml",
	"json",
	"jsonl",
	"ndjson",
	"csv",
	"tsv",
	"yaml",
	"toml",
	"ini",
	"config",
	"css",
	"sql",
	"code"
]);
function C(e) {
	return e.project === null && e.files.length === 1;
}
function w(e) {
	let t = e.files.map((e) => e.text).join("\n"), n = "<<<", r = 0;
	for (; t.includes(`${n}SOURCE`) || t.includes(`${n}END SOURCE`);) r += 1, n = `<<<${r}:`;
	return n;
}
function T(e) {
	let t = w(e);
	return e.files.map((e) => {
		let n = e.text.endsWith("\n") ? e.text : `${e.text}\n`;
		return `${t}SOURCE ${e.path}>>>\n${n}${t}END SOURCE ${e.path}>>>`;
	}).join("\n\n");
}
function E(e) {
	if (C(e)) return `Below is a document to rewrite, \`${e.files[0].path}\`. Your instructions follow it.`;
	let t = e.project ? `the project \`${e.project.name}\`` : "several documents";
	return `Below are ${e.files.length} files from ${t} to rewrite. Your instructions follow them.`;
}
function D(e, t, n = "chat") {
	let r = [], i = new Set(e.files.map((e) => e.format));
	if (([...i].some((e) => S.has(e)) || e.project) && r.push([
		"## Code and structured files",
		"",
		"In code and structured files, change only what this list allows:",
		"",
		_(t.codeScope),
		"",
		"Never claim you ran tests or builds."
	].join("\n")), i.has("latex") || e.project?.latex) {
		let t = e.project?.mainFile ? ` The main file is \`${e.project.mainFile}\`.` : "";
		r.push([
			"## LaTeX",
			"",
			`Keep the preamble, macros, math, citations, labels, references, file paths, and figure environments working.${t} Don't change bibliography files.`
		].join("\n"));
	}
	if (n === "chat" && (i.has("docx") || i.has("pdf")) && r.push("## Converted documents\n\nWord and PDF files were converted to Markdown for you. Return Markdown with the same headings, lists, tables, and emphasis; it will be turned back into a document."), e.figures.length > 0) {
		let t = e.figures.map((e) => {
			let t = [
				e.pageNumber ? `page ${e.pageNumber}` : null,
				e.caption ? `caption: ${e.caption}` : null,
				e.altText ? `description: ${e.altText}` : null
			].filter(Boolean), r = n === "agent" ? `\`${e.taskPath}\`` : e.filename;
			return `- \`${e.ref}\` is ${r}${t.length ? ` (${t.join("; ")})` : ""}`;
		}).join("\n");
		r.push([
			"## Figures",
			"",
			n === "agent" ? "The text refers to these figures. Keep every reference next to the text it supports, and put the figures themselves in the finished files:" : "The source refers to these figures. Keep every figure reference, exactly as written, with its caption, next to the text it supports:",
			"",
			t
		].join("\n"));
	}
	return r.join("\n\n");
}
function O(e) {
	return C(e) ? "## Output format\n\nReply with exactly these two blocks and nothing before or after them:\n\n```text\n<<<FINAL_DOCUMENT>>>\n[The complete rewritten document]\n<<<END_FINAL_DOCUMENT>>>\n\n<<<FIDELITY_AUDIT>>>\nMeaning: PASS or REVIEW, with a short note\nSettings: PASS or REVIEW, with a short note\nFormatting and figures: PASS, NOT APPLICABLE, or REVIEW, with a short note\nOpen questions: None, or a short list\n<<<END_FIDELITY_AUDIT>>>\n```" : "## Output format\n\nReply with one block per file you changed, then the audit, and nothing else. Give each changed file in full; never a diff or an excerpt. Use the exact paths above.\n\n```text\n<<<FILE path/to/file.ext>>>\n[The complete rewritten file]\n<<<END_FILE>>>\n\n<<<FIDELITY_AUDIT>>>\nMeaning: PASS or REVIEW, with a short note\nSettings: PASS or REVIEW, with a short note\nUnchanged files: None, or a list of paths you left as they were\nOpen questions: None, or a short list\n<<<END_FIDELITY_AUDIT>>>\n```";
}
function k(e) {
	return `## Settings\n\n${g(e)}`;
}
function A(e) {
	return !e.project || e.project.excluded.length === 0 ? "" : `These project files were left out and must not be changed: ${e.project.excluded.join(", ")}.`;
}
function j(...e) {
	return e.filter((e) => e.trim().length > 0).join("\n\n");
}
function ee(e, t) {
	return j(E(e), T(e), A(e), v.trim(), k(t), D(e, t), O(e));
}
var te = {
	decompose: s,
	rewrite: y,
	verify: c,
	final: b
}, M = {
	decompose: "STAGE 1 DECOMPOSITION",
	rewrite: "STAGE 2 REWRITE",
	verify: "STAGE 3 VERIFICATION"
};
function ne(e) {
	return `[${M[e]} GOES HERE]`;
}
function re(e) {
	return [
		"decompose",
		"rewrite",
		"verify"
	].slice(0, x.indexOf(e));
}
function ie(e, t, n) {
	let r = re(n).map((e) => `<<<${M[e]}>>>\n${ne(e)}\n<<<END ${M[e]}>>>`);
	return j(`${E(e)} This is stage ${x.indexOf(n) + 1} of a four-stage rewrite.`, T(e), A(e), ...r, te[n].trim(), k(t), D(e, t), n === "final" ? O(e) : "");
}
// ../reword-nerd/src/engine/paths.ts
var ae = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i, oe = /[\u0000-\u001f\u007f-\u009f]/, se = 255, ce = 1024, le = new TextEncoder();
function ue(e) {
	return e.slice(e.lastIndexOf("/") + 1);
}
function de(e) {
	let t = ue(e);
	return e.split("/").includes("__MACOSX") || t.startsWith("._") || t === ".DS_Store" || t === "Icon\r" || t === "Thumbs.db" || t === "desktop.ini";
}
function N(e) {
	let t = e.replace(new RegExp(oe.source, "g"), "");
	return `"${t.length > 120 ? `${t.slice(0, 117)}...` : t}"`;
}
function fe(e) {
	for (let t of e.split("/")) {
		if (oe.test(t)) return "A file name here contains hidden control characters. Rename it and try again.";
		if (ae.test(t)) {
			let n = t.split(".")[0].toUpperCase();
			return `${N(e)} uses a name Windows reserves (${n}). Rename it and try again.`;
		}
		if (t.includes(":") || t.includes("\\") || /[. ]$/.test(t)) return `${N(e)} has a name Windows can't use (it has a colon or backslash, or ends with a dot or space). Rename it and try again.`;
		if (le.encode(t).byteLength > se) return `A name in ${N(e)} is too long. Shorten it and try again.`;
	}
	return le.encode(e).byteLength > ce ? `The path ${N(e)} is too long. Shorten it and try again.` : null;
}
function pe(e) {
	return e.normalize("NFKC").toLocaleLowerCase("und").replaceAll("ß", "ss").replaceAll("ς", "σ");
}
function me(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = pe(r), i = t.get(e) ?? n.get(e);
		if (i !== void 0) return [i, r];
		t.set(e, r);
		let a = e.split("/");
		for (let e = 1; e < a.length; e += 1) {
			let i = a.slice(0, e).join("/"), o = t.get(i);
			if (o !== void 0) return [o, r];
			n.has(i) || n.set(i, r);
		}
	}
	return null;
}
function he([e, t], n) {
	return e.normalize("NFC") === t.normalize("NFC") ? `This ${n} has two files with the same name, ${N(t)}. Rename one and try again.` : pe(e) === pe(t) ? `This ${n} has two files whose names differ only in capital letters (${N(e)} and ${N(t)}). Rename one and try again.` : `This ${n} has a file and a folder with the same name (${N(e)} and ${N(t)}). Rename one and try again.`;
}
// ../reword-nerd/src/engine/zip.ts
async function ge(e) {
	let { BlobReader: t, ZipReader: n } = await import("./zip.js-BDqZZMhe.js"), r = new n(new t(e), {
		useWebWorkers: !1,
		strictness: "strict"
	});
	return {
		async *entries() {
			for await (let e of r.getEntriesGenerator()) yield {
				path: e.filename,
				directory: e.directory,
				encrypted: e.encrypted,
				compressedSize: e.compressedSize,
				uncompressedSize: e.uncompressedSize,
				unixMode: e.unixMode ?? e.unixExternalUpper ?? null,
				async read(t, n) {
					e.directory || await e.getData(t, {
						checkSignature: !0,
						checkOverlappingEntry: !0,
						useWebWorkers: !1,
						signal: n
					});
				}
			};
		},
		close: () => r.close()
	};
}
function _e(e) {
	return {
		remaining: e,
		total: e
	};
}
// ../reword-nerd/src/engine/handoff/zip.ts
async function ve(e) {
	let { BlobReader: t, BlobWriter: n, TextReader: r, ZipWriter: i } = await import("./zip.js-BDqZZMhe.js"), a = new i(new n("application/zip"), { useWebWorkers: !1 });
	for (let n of e) {
		let e = typeof n.data == "string" ? new r(n.data) : new t(n.data);
		await a.add(n.path, e);
	}
	return a.close();
}
// ../reword-nerd/src/engine/handoff/agentTask.ts
var ye = "Read TASK.md in this folder and follow it.\n";
function be(e) {
	return e.format === "pdf" ? e.path.replace(/\.pdf$/i, ".docx") : e.path;
}
function xe(e) {
	return e.format === "docx" || e.format === "pdf" || e.text !== e.extractedText;
}
function Se(e) {
	return e.format === "docx" || e.format === "pdf" ? `${e.path}.md` : e.path;
}
function Ce(e) {
	return [
		"| Original | Rewrite the text in | Write the result to |",
		"| --- | --- | --- |",
		...e.map((e) => {
			let t = xe(e) ? `text/${Se(e)}` : `source/${e.path}`;
			return `| \`source/${e.path}\` | \`${t}\` | \`output/${be(e)}\` |`;
		})
	].join("\n");
}
function we(e) {
	return e.trim().replace(/^## /gm, "### ");
}
function Te(e, t) {
	let { batch: n, files: r } = e, i = n.project, a = i ? "`work/` (one set of stage files for the whole project)" : "`work/<file name>/` (one set per document)", o = new Set(r.map((e) => e.format)), l = D(n, t, "agent"), u = [
		"- Write each result in the same format as its original: Markdown stays Markdown, code stays working code, LaTeX stays compilable.",
		o.has("docx") || o.has("pdf") ? "- Word and PDF originals become Word files (`.docx`). Keep the headings, lists, tables, and emphasis from the text you rewrote. If you can't create Word files here, write Markdown to the same path with `.md` instead and say so in `REPORT.md`." : null,
		i ? "- Write only the files you changed. Don't copy unchanged files to `output/`; list them in `REPORT.md`." : null
	].filter(Boolean);
	return [
		`# Rewrite task: ${n.title}`,
		"",
		"This folder was prepared by reword_nerd. Rewrite the files below with the same meaning in new words, working through four stages, and save your work as you go.",
		"",
		"## Files",
		"",
		Ce(r),
		i && i.excluded.length > 0 ? `\nThese project files were left out on purpose; don't read or change them: ${i.excluded.map((e) => `\`${e}\``).join(", ")}.` : "",
		e.assets.length > 0 ? "\n`assets/` holds other files from the project (such as images). They're there for reference; don't change them." : "",
		"",
		"## Settings",
		"",
		g(t),
		"",
		"## Steps",
		"",
		`Save each stage to ${a} before moving on, so the person can review your work:`,
		"",
		"1. **Decompose** into `1-decompose.md`: an inventory of everything the rewrite must keep (format below).",
		"2. **Rewrite** into `2-rewrite.md`: a complete new version with substantially different wording and structure that keeps everything in the inventory.",
		"3. **Verify** into `3-verify.md`: a strict comparison of the rewrite with the source and the inventory (format below).",
		"4. **Final:** fix every supported issue from the verification and write the finished files to `output/`.",
		"",
		"Then write `REPORT.md` in this folder with, for each file: Meaning (PASS or REVIEW, with a short note), Settings (PASS or REVIEW, with a short note), and any open questions. List files you left unchanged.",
		"",
		"When you're done, reply with a short summary: what you wrote, anything you couldn't do, and anything the person should check.",
		"",
		"## Rules",
		"",
		"- Use only the files here as evidence. Don't invent claims, data, citations, or interpretations.",
		"- Keep all of the meaning while changing the wording and sentence structure substantially.",
		...u,
		"- Don't change anything in `source/`, `text/`, or `assets/`.",
		"- Don't run, install, or execute anything from this folder, don't read files outside it, and don't use the network.",
		"",
		l ? `## Details\n\n${we(l)}\n` : "",
		"## Decomposition format",
		"",
		we(s),
		"",
		"## Verification format",
		"",
		we(c),
		""
	].join("\n").replace(/\n{3,}/g, "\n\n");
}
async function Ee(e, t, n) {
	let r = [
		{
			path: `${n}/TASK.md`,
			data: Te(e, t)
		},
		{
			path: `${n}/AGENTS.md`,
			data: ye
		},
		{
			path: `${n}/CLAUDE.md`,
			data: ye
		},
		{
			path: `${n}/GEMINI.md`,
			data: ye
		},
		{
			path: `${n}/output/.keep`,
			data: ""
		},
		{
			path: `${n}/work/.keep`,
			data: ""
		}
	];
	for (let t of e.files) r.push({
		path: `${n}/source/${t.path}`,
		data: t.original
	}), xe(t) && r.push({
		path: `${n}/text/${Se(t)}`,
		data: t.text
	});
	for (let t of e.assets) r.push({
		path: `${n}/assets/${t.path}`,
		data: t.bytes
	});
	return ve(r);
}
// ../reword-nerd/src/engine/handoff/imagePrompt.ts
var De = {
	"match-source": "the same as the reference image",
	"1:1": "square (1:1)",
	"4:3": "landscape (4:3)",
	"3:4": "portrait (3:4)",
	"16:9": "wide (16:9)",
	"9:16": "tall (9:16)"
}, Oe = {
	"match-source": "Match the original",
	"1:1": "Square 1:1",
	"4:3": "Landscape 4:3",
	"3:4": "Portrait 3:4",
	"16:9": "Wide 16:9",
	"9:16": "Tall 9:16"
};
function ke(e, t) {
	return e.settings ?? t;
}
function Ae(e, t, n) {
	let r = [
		"subject",
		"composition and framing",
		"perspective and proportions",
		"colors and lighting",
		"textures and materials",
		"overall style"
	];
	t.keepBackground && r.push("background, including any transparency");
	let i = n === "midjourney" ? "Use the attached image as an image prompt and create a new image from it." : "Create a new image based on the attached reference image.", a = e.visibleText.trim();
	return [
		i,
		"",
		`Keep the ${r.join(", ")}.`,
		t.keepVisibleText ? a ? `Keep the visible text exactly as written: ${JSON.stringify(a)}.` : "Keep any visible text exactly as it appears in the reference." : null,
		t.mustKeep.trim() ? `Also keep: ${t.mustKeep.trim()}` : null,
		t.changes.trim() ? `Change only this: ${t.changes.trim()}` : "Change nothing else. This should be a faithful new rendering of the same image.",
		`Aspect ratio: ${De[t.aspectRatio]}${t.aspectRatio === "match-source" ? ` (${e.width} × ${e.height} pixels)` : ""}.`,
		"Generate the image from scratch. Don't return the reference image unchanged."
	].filter((e) => e !== null).join("\n");
}
function P(e) {
	let t = e.lastIndexOf(".");
	return t > 0 ? e.slice(0, t) : e;
}
function je(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = r.mimeType.split("/")[1].replace("jpeg", "jpg"), i = P(r.name).replace(/[^\w.-]+/g, "-").replace(/^-+|-+$/g, "") || "image", a = i;
		for (let e = 2; t.has(a.toLowerCase()); e += 1) a = `${i}-${e}`;
		t.add(a.toLowerCase()), n.set(r.id, `${a}.${e}`);
	}
	return n;
}
function Me(e, t) {
	return [
		"# Image task",
		"",
		"This folder was prepared by reword_nerd. Create a new version of each image below.",
		"",
		"| Reference image | Instructions | Save the new image to |",
		"| --- | --- | --- |",
		...e.map((e) => {
			let n = t.get(e.id) ?? e.name;
			return `| \`source/${n}\` | \`prompts/${P(n)}.md\` | \`output/${P(n)}.png\` |`;
		}),
		"",
		"## Steps",
		"",
		"For each row: look at the reference image, read its instructions, generate a new image that follows them, and save it as a PNG at the path in the last column.",
		"",
		"When you're done, reply with a short summary: which images you made, and any you couldn't.",
		"",
		"## Rules",
		"",
		"- Generate every image from scratch. Never copy or lightly edit the reference file and save it as the result.",
		"- If you can't generate images in this environment, stop and say so instead of improvising.",
		"- Don't change anything in `source/` or `prompts/`, don't read files outside this folder, and don't run anything from it.",
		""
	].join("\n");
}
async function Ne(e, t, n, r) {
	let i = je(e), a = "Read TASK.md in this folder and follow it.\n", o = [
		{
			path: `${r}/TASK.md`,
			data: Me(e, i)
		},
		{
			path: `${r}/AGENTS.md`,
			data: a
		},
		{
			path: `${r}/CLAUDE.md`,
			data: a
		},
		{
			path: `${r}/output/.keep`,
			data: ""
		}
	];
	for (let a of e) {
		let e = i.get(a.id) ?? a.name;
		o.push({
			path: `${r}/source/${e}`,
			data: a.original
		}), o.push({
			path: `${r}/prompts/${P(e)}.md`,
			data: `${Ae(a, ke(a, t), n)}\n`
		});
	}
	return ve(o);
}
// ../reword-nerd/src/engine/page/look.ts
var Pe = {
	paper: {
		bg: "#f6f4ec",
		ink: "#26333c",
		muted: "#5f6c74",
		line: "#dcd9cb"
	},
	white: {
		bg: "#ffffff",
		ink: "#1d252b",
		muted: "#59646c",
		line: "#e1e5e8"
	},
	sepia: {
		bg: "#f1e7d3",
		ink: "#44362a",
		muted: "#6d5b49",
		line: "#d9c9ad"
	},
	night: {
		bg: "#1b252c",
		ink: "#e3e9ec",
		muted: "#a3b1b9",
		line: "#33424c"
	}
}, Fe = {
	serif: "Georgia",
	sans: "Arial"
}, Ie = {
	small: 11,
	medium: 12,
	large: 14
};
// ../reword-nerd/src/engine/results/export.ts
function F(e, t, n = {}) {
	let r = [];
	for (let i of t ?? []) switch (i.type) {
		case "strong":
			r.push(...F(e, i.tokens, {
				...n,
				bold: !0
			}));
			break;
		case "em":
			r.push(...F(e, i.tokens, {
				...n,
				italics: !0
			}));
			break;
		case "del":
			r.push(...F(e, i.tokens, {
				...n,
				strike: !0
			}));
			break;
		case "codespan":
			r.push(I(e, i.text, {
				...n,
				code: !0
			}));
			break;
		case "br":
			r.push(new e.TextRun({ break: 1 }));
			break;
		case "link": {
			let t = i;
			r.push(new e.ExternalHyperlink({
				link: t.href,
				children: F(e, t.tokens, {
					...n,
					link: !0
				}).filter((t) => t instanceof e.TextRun)
			}));
			break;
		}
		case "image": {
			let t = i;
			r.push(I(e, `[Figure: ${t.text || t.href}]`, {
				...n,
				italics: !0
			}));
			break;
		}
		default: {
			let t = i.tokens;
			t?.length ? r.push(...F(e, t, n)) : r.push(I(e, Le(i.text ?? i.raw), n));
		}
	}
	return r;
}
function I(e, t, n) {
	return new e.TextRun({
		text: t,
		bold: n.bold,
		italics: n.italics,
		strike: n.strike,
		font: n.code ? "Consolas" : void 0,
		style: n.link ? "Hyperlink" : void 0
	});
}
function Le(e) {
	return e.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"").replaceAll("&#39;", "'");
}
var Re = [
	"HEADING_1",
	"HEADING_2",
	"HEADING_3",
	"HEADING_4",
	"HEADING_5",
	"HEADING_6"
];
function ze(e, t, n = !1) {
	let r = [];
	for (let i of t) switch (i.type) {
		case "heading": {
			let t = i;
			r.push(new e.Paragraph({
				heading: e.HeadingLevel[Re[Math.min(t.depth, 6) - 1]],
				children: F(e, t.tokens)
			}));
			break;
		}
		case "paragraph":
			r.push(new e.Paragraph({
				children: F(e, i.tokens),
				indent: n ? { left: 720 } : void 0
			}));
			break;
		case "blockquote":
			r.push(...ze(e, i.tokens, !0));
			break;
		case "list":
			r.push(...Be(e, i, 0));
			break;
		case "code":
			for (let t of i.text.split("\n")) r.push(new e.Paragraph({ children: [I(e, t, { code: !0 })] }));
			break;
		case "table":
			r.push(Ve(e, i));
			break;
		case "hr":
			r.push(new e.Paragraph({ thematicBreak: !0 }));
			break;
		case "space": break;
		default: {
			let t = i.text ?? i.raw;
			t.trim() && r.push(new e.Paragraph({ children: [I(e, t, {})] }));
		}
	}
	return r;
}
function Be(e, t, n) {
	let r = [];
	for (let i of t.items) {
		let [a, ...o] = i.tokens, s = a && (a.type === "text" || a.type === "paragraph") ? F(e, a.tokens ?? [a]) : [];
		r.push(new e.Paragraph({
			children: s,
			...t.ordered ? { numbering: {
				reference: "numbered",
				level: Math.min(n, 8)
			} } : { bullet: { level: Math.min(n, 8) } }
		}));
		let c = s.length ? o : i.tokens;
		for (let t of c) t.type === "list" ? r.push(...Be(e, t, n + 1)) : r.push(...ze(e, [t]));
	}
	return r;
}
function Ve(e, t) {
	let n = (t, n) => new e.TableRow({
		tableHeader: n,
		children: t.map((t) => new e.TableCell({ children: [new e.Paragraph({ children: F(e, t.tokens, n ? { bold: !0 } : {}) })] }))
	});
	return new e.Table({
		width: {
			size: 100,
			type: e.WidthType.PERCENTAGE
		},
		rows: [n(t.header, !0), ...t.rows.map((e) => n(e, !1))]
	});
}
var L = (e) => e.replace("#", "").toUpperCase();
function He(e, t) {
	let n = Pe[t.paper], r = Fe[t.font], i = Ie[t.size] * 2, a = (e, t) => ({
		run: {
			font: r,
			size: Math.round(i * e),
			color: L(n.ink),
			bold: !1
		},
		paragraph: {
			spacing: {
				before: t,
				after: 120
			},
			keepNext: !0
		}
	});
	return {
		background: { color: L(n.bg) },
		styles: { default: {
			document: {
				run: {
					font: r,
					size: i,
					color: L(n.ink)
				},
				paragraph: { spacing: {
					after: 160,
					line: t.font === "serif" ? 324 : 300
				} }
			},
			title: a(1.9, 0),
			heading1: a(1.7, 360),
			heading2: a(1.3, 320),
			heading3: a(1.1, 280),
			heading4: {
				...a(1, 240),
				run: {
					font: r,
					size: i,
					bold: !0
				}
			},
			hyperlink: { run: {
				color: L(t.link ?? n.ink),
				underline: { type: e.UnderlineType.SINGLE }
			} }
		} }
	};
}
async function Ue(e, t) {
	let [n, { marked: r }] = await Promise.all([import("./dist-B8cyhHeC.js"), import("./marked.esm-Bl5Eos46.js")]), i = r.lexer(e, { gfm: !0 }), a = Array.from({ length: 9 }, (e, t) => ({
		level: t,
		format: n.LevelFormat.DECIMAL,
		text: `%${t + 1}.`,
		alignment: n.AlignmentType.START,
		style: { paragraph: { indent: {
			left: 720 * (t + 1),
			hanging: 360
		} } }
	})), o = new n.Document({
		...t ? He(n, t) : {},
		numbering: { config: [{
			reference: "numbered",
			levels: a
		}] },
		sections: [{ children: ze(n, i) }]
	});
	return n.Packer.toBlob(o);
}
// ../reword-nerd/src/engine/results/lineDiff.ts
function We(e) {
	let t = e.split("\n");
	return t.at(-1) === "" && t.pop(), t;
}
function Ge(e) {
	let t = e.replace(/\r\n?/g, "\n");
	return t.endsWith("\n") || t === "" ? t : `${t}\n`;
}
function Ke(e) {
	let t = e.map((t, n) => !t.changed && t.text.trim() === "" && e[n - 1]?.changed && e[n + 1]?.changed ? {
		...t,
		changed: !0
	} : t), n = [];
	for (let e of t) {
		let t = n.at(-1);
		t && t.changed === e.changed ? t.text += e.text : n.push({ ...e });
	}
	return n;
}
function qe(e, t, n) {
	let r = e(t, n);
	return r.filter((e) => !e.added && !e.removed).reduce((e, t) => e + t.value.trim().length, 0) / Math.max(t.trim().length, n.trim().length, 1) < .3 ? null : {
		before: Ke(r.filter((e) => !e.added).map((e) => ({
			text: e.value,
			changed: !!e.removed
		}))),
		after: Ke(r.filter((e) => !e.removed).map((e) => ({
			text: e.value,
			changed: !!e.added
		})))
	};
}
async function Je(e, t) {
	let { diffLines: n, diffWordsWithSpace: r } = await import("./libesm-CsCUEJKn.js"), i = [], a = 1, o = 1, s = 0, c = 0;
	for (let r of n(Ge(e), Ge(t))) for (let e of We(r.value)) r.added ? (i.push({
		kind: "add",
		oldLine: null,
		newLine: o++,
		segments: []
	}), s += 1) : r.removed ? (i.push({
		kind: "del",
		oldLine: a++,
		newLine: null,
		segments: []
	}), c += 1) : i.push({
		kind: "same",
		oldLine: a++,
		newLine: o++,
		segments: []
	}), i.at(-1).segments = [{
		text: e,
		changed: !1
	}];
	for (let e = 0; e < i.length;) {
		if (i[e].kind !== "del") {
			e += 1;
			continue;
		}
		let t = e;
		for (; t < i.length && i[t].kind === "del";) t += 1;
		let n = t;
		for (; n < i.length && i[n].kind === "add";) n += 1;
		let a = Math.min(t - e, n - t);
		for (let n = 0; n < a; n += 1) {
			let a = i[e + n], o = i[t + n], s = qe(r, a.segments[0].text, o.segments[0].text);
			s && (a.segments = s.before, o.segments = s.after);
		}
		e = n;
	}
	return {
		rows: i,
		added: s,
		removed: c
	};
}
// ../reword-nerd/src/engine/results/parse.ts
function Ye(e, t, n) {
	let r = e.indexOf(t);
	if (r < 0) return null;
	let i = r + t.length, a = e.indexOf(n, i);
	return Xe(e.slice(i, a < 0 ? void 0 : a));
}
function Xe(e) {
	return e.replace(/^\r?\n/, "").replace(/\r?\n[ \t]*$/, "");
}
function Ze(e) {
	let t = e.trim(), n = /^```[\w-]*\r?\n([\s\S]*?)\r?\n```$/.exec(t);
	return n ? n[1] : t;
}
function Qe(e) {
	let t = Ze(e), n = Ye(t, "<<<FIDELITY_AUDIT>>>", "<<<END_FIDELITY_AUDIT>>>"), r = Ye(t, "<<<FINAL_DOCUMENT>>>", "<<<END_FINAL_DOCUMENT>>>"), i = [];
	for (let e of t.matchAll(/<<<FILE ([^\n>]+)>>>\r?\n([\s\S]*?)\r?\n?<<<END_FILE>>>/g)) i.push({
		path: e[1].trim(),
		text: e[2]
	});
	return r === null && i.length === 0 ? {
		document: (n === null ? t : t.slice(0, t.indexOf("<<<FIDELITY_AUDIT>>>"))).trim(),
		files: [],
		audit: n,
		unstructured: !0
	} : {
		document: r,
		files: i,
		audit: n,
		unstructured: !1
	};
}
function $e(e) {
	return e ? /\bREVIEW\b/.test(e) ? "review" : /\bPASS\b/.test(e) ? "pass" : "unknown" : "unknown";
}
// ../reword-nerd/src/engine/text/formats.ts
var et = Object.freeze({
	format: "text",
	languageId: "plaintext",
	previewKind: "plain-text"
}), tt = {
	format: "markdown",
	languageId: "markdown",
	previewKind: "markdown"
}, nt = {
	format: "html",
	languageId: "html",
	previewKind: "markup"
}, rt = {
	format: "yaml",
	languageId: "yaml",
	previewKind: "structured-data"
}, it = {
	format: "config",
	languageId: "ini",
	previewKind: "structured-data"
}, at = {
	format: "latex",
	languageId: "latex",
	previewKind: "latex"
}, ot = {
	".txt": et,
	".md": tt,
	".markdown": tt,
	".html": nt,
	".htm": nt,
	".xhtml": nt,
	".xml": {
		format: "xml",
		languageId: "xml",
		previewKind: "markup"
	},
	".json": {
		format: "json",
		languageId: "json",
		previewKind: "structured-data"
	},
	".jsonl": {
		format: "jsonl",
		languageId: "jsonl",
		previewKind: "structured-data"
	},
	".ndjson": {
		format: "ndjson",
		languageId: "jsonl",
		previewKind: "structured-data"
	},
	".csv": {
		format: "csv",
		languageId: "csv",
		previewKind: "table"
	},
	".tsv": {
		format: "tsv",
		languageId: "tsv",
		previewKind: "table"
	},
	".yaml": rt,
	".yml": rt,
	".toml": {
		format: "toml",
		languageId: "toml",
		previewKind: "structured-data"
	},
	".ini": {
		format: "ini",
		languageId: "ini",
		previewKind: "structured-data"
	},
	".config": it,
	".conf": it,
	".css": {
		format: "css",
		languageId: "css",
		previewKind: "code"
	},
	".scss": {
		format: "code",
		languageId: "scss",
		previewKind: "code"
	},
	".sass": {
		format: "code",
		languageId: "sass",
		previewKind: "code"
	},
	".less": {
		format: "code",
		languageId: "less",
		previewKind: "code"
	},
	".sql": {
		format: "sql",
		languageId: "sql",
		previewKind: "code"
	},
	".tex": at,
	".ltx": at
}, st = {
	".js": "javascript",
	".jsx": "javascriptreact",
	".mjs": "javascript",
	".cjs": "javascript",
	".ts": "typescript",
	".tsx": "typescriptreact",
	".mts": "typescript",
	".cts": "typescript",
	".py": "python",
	".pyw": "python",
	".rb": "ruby",
	".php": "php",
	".java": "java",
	".c": "c",
	".h": "c",
	".cc": "cpp",
	".cpp": "cpp",
	".cxx": "cpp",
	".hpp": "cpp",
	".cs": "csharp",
	".go": "go",
	".rs": "rust",
	".swift": "swift",
	".kt": "kotlin",
	".kts": "kotlin",
	".scala": "scala",
	".sh": "shellscript",
	".bash": "shellscript",
	".zsh": "shellscript",
	".fish": "shellscript",
	".ps1": "powershell",
	".r": "r",
	".lua": "lua",
	".pl": "perl",
	".pm": "perl",
	".dart": "dart",
	".vue": "vue",
	".svelte": "svelte",
	".ex": "elixir",
	".exs": "elixir",
	".erl": "erlang",
	".fs": "fsharp",
	".fsx": "fsharp",
	".hs": "haskell",
	".clj": "clojure",
	".cljs": "clojure",
	".sol": "solidity"
};
function R(e, t) {
	return e.map((e) => [e, t]);
}
new Map([
	...R([".doc"], "Older Word files (.doc) can't be read. Save it as .docx in Word and add it again."),
	...R([".rtf"], "Rich Text files (.rtf) can't be read. Save it as .docx or plain text and add it again."),
	...R([".odt", ".pages"], "This kind of document can't be read. Save it as a Word file (.docx) and add it again."),
	...R([
		".xls",
		".xlsx",
		".ods",
		".numbers"
	], "Spreadsheets can't be read. Save the sheet as CSV and add that instead."),
	...R([
		".ppt",
		".pptx",
		".odp"
	], "Presentations can't be read. Export the slides as a PDF and add that instead."),
	...R([
		".png",
		".jpg",
		".jpeg",
		".gif",
		".webp",
		".bmp",
		".tif",
		".tiff",
		".heic",
		".avif",
		".ico"
	], "This is an image, not a text document."),
	...R([
		".mp3",
		".wav",
		".m4a",
		".aac",
		".flac",
		".ogg",
		".mp4",
		".mov",
		".avi",
		".mkv",
		".webm"
	], "Audio and video files can't be read as text."),
	...R([
		".exe",
		".dll",
		".dylib",
		".so",
		".dmg",
		".msi"
	], "Programs and system files can't be read as text."),
	...R([
		".ttf",
		".otf",
		".woff",
		".woff2"
	], "Font files can't be read as text."),
	...R([
		".tar",
		".gz",
		".tgz",
		".bz2",
		".xz",
		".rar",
		".7z"
	], "Only .zip archives can be opened. Unpack this one and add the folder, or make a .zip of it.")
]);
function z(e) {
	return e.slice(Math.max(e.lastIndexOf("/"), e.lastIndexOf("\\")) + 1);
}
function B(e) {
	let t = z(e), n = t.lastIndexOf(".");
	return n <= 0 ? "" : t.slice(n).toLowerCase();
}
function ct(e) {
	let t = B(e), n = ot[t];
	if (n) return { ...n };
	let r = st[t];
	return r ? {
		format: "code",
		languageId: r,
		previewKind: "code"
	} : void 0;
}
function V(e, t) {
	return e.length >= t.length && t.every((t, n) => e[n] === t);
}
var lt = (e) => Array.from(e, (e) => e.charCodeAt(0)), ut = [
	[
		137,
		80,
		78,
		71
	],
	[
		80,
		75,
		3,
		4
	],
	[
		80,
		75,
		5,
		6
	],
	[
		80,
		75,
		7,
		8
	],
	[
		127,
		69,
		76,
		70
	],
	lt("%PDF-"),
	[
		255,
		216,
		255
	],
	lt("GIF87a"),
	lt("GIF89a")
];
function dt(e) {
	return ut.some((t) => V(e, t));
}
var ft = /[\u0001-\u0008\u000b\u000e-\u001f\u007f-\u009f]/;
function pt(e) {
	if (dt(e)) return {
		ok: !1,
		problem: "binary"
	};
	if (V(e, [255, 254]) || V(e, [254, 255])) return {
		ok: !1,
		problem: "utf16"
	};
	let t;
	try {
		t = new TextDecoder("utf-8", { fatal: !0 }).decode(e);
	} catch {
		return {
			ok: !1,
			problem: "not-utf8"
		};
	}
	return t.includes("\0") ? {
		ok: !1,
		problem: "binary"
	} : ft.test(t) ? {
		ok: !1,
		problem: "control-characters"
	} : t.trim().length === 0 ? {
		ok: !1,
		problem: "empty"
	} : {
		ok: !0,
		text: t
	};
}
// ../reword-nerd/src/engine/text/credentials.ts
var mt = /* @__PURE__ */ new Set([
	".env",
	".npmrc",
	".pypirc",
	".netrc",
	".git-credentials",
	".pgpass",
	".htpasswd",
	"credentials",
	"credentials.json",
	"secrets.json",
	"secrets.yaml",
	"secrets.yml",
	"service-account.json",
	"id_rsa",
	"id_dsa",
	"id_ecdsa",
	"id_ed25519"
]), ht = /* @__PURE__ */ new Set([
	".pem",
	".key",
	".p12",
	".pfx",
	".jks",
	".keystore",
	".ppk"
]), gt = /* @__PURE__ */ new Set([
	".env.example",
	".env.sample",
	".env.template",
	".env.dist"
]);
function _t(e) {
	let t = z(e).toLowerCase();
	return mt.has(t) ? !0 : t.startsWith(".env.") ? !gt.has(t) : ht.has(B(t)) && !t.includes("public");
}
var vt = /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----|PuTTY-User-Key-File-\d/, yt = /\b(?:sk-(?:ant-|proj-)?[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{22,}|(?:AKIA|ASIA)[0-9A-Z]{16}|xox[bpas]-[A-Za-z0-9-]{10,}|AIza[0-9A-Za-z_-]{35}|glpat-[A-Za-z0-9_-]{20,})/g, bt = /\bAuthorization["']?\s*[:=]\s*["']?Bearer\s+([A-Za-z0-9._~+/=-]{20,})/gi, xt = /\b[a-z][a-z0-9+.-]*:\/\/[^\s:@/]+:([^\s@/]{6,})@[^\s/]+/gi, St = /\b(?:client-key-data|token):\s*["']?([A-Za-z0-9+/=._-]{40,})/g, Ct = String.raw`[A-Za-z0-9_-]*(?:api[_-]?key|access[_-]?key|private[_-]?key|secret(?:[_-]?access)?(?:[_-]?key)?|token|passw(?:or)?d)`, wt = new RegExp(String.raw`(?:^|[\n{,;(])[ \t]*(?:export[ \t]+)?(?:(?:const|let|var|val|final)[ \t]+)?@?(?:[A-Za-z_$][\w$]*\.)*["']?${Ct}["']?[ \t]*(?::[ \t]*[A-Za-z_][\w.<>[\]]*[ \t]*)?[:=][ \t]*(["'])([^\s"']{8,})\1`, "gi"), Tt = new RegExp(String.raw`(?:^|\n)[ \t]*(?:export[ \t]+)?${Ct}[ \t]*[:=][ \t]*([^\s"'#,;()[\]{}<>]{8,})[ \t]*(?=\r?\n|#|$)`, "gi"), Et = /^[$<%{]|example|sample|placeholder|changeme|change-me|your[_-]|dummy|fake|redacted|password|x{4,}|\*{3,}|\.{3}/i;
function Dt(e) {
	return /^[\p{L}_.:-]+$/u.test(e);
}
function H(e) {
	return !Dt(e) && !Et.test(e) && !/^\d+$/.test(e);
}
function U(e, t, n, r) {
	for (let i of e.matchAll(t)) if (r(i[n])) return !0;
	return !1;
}
function Ot(e) {
	return vt.test(e) || U(e, yt, 0, (e) => !Et.test(e)) || U(e, bt, 1, H) || U(e, xt, 1, H) || U(e, St, 1, H) || U(e, wt, 2, H) || U(e, Tt, 1, H);
}
var kt = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\uFFFD]/g;
function At(e) {
	if (dt(e)) return !1;
	let t = pt(e);
	return Ot(t.ok ? t.text : new TextDecoder().decode(e).replace(kt, ""));
}
// ../reword-nerd/src/engine/text/util.ts
var W = class extends Error {
	constructor(e) {
		super(e), this.name = "ReadProblem";
	}
};
async function jt(e) {
	let t = new Uint8Array(await crypto.subtle.digest("SHA-256", e));
	return Array.from(t, (e) => e.toString(16).padStart(2, "0")).join("");
}
function Mt(e) {
	return `${e}-${crypto.randomUUID()}`;
}
function Nt(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")}, and ${e.at(-1)}`;
}
function Pt(e, t = 5) {
	return e.length <= t ? Nt(e) : Nt([...e.slice(0, t), `${e.length - t} more`]);
}
// ../reword-nerd/src/engine/text/latex.ts
function Ft(e) {
	let t = B(e);
	return t === ".tex" || t === ".ltx";
}
function It(e) {
	return e.replace(/((?:^|[^\\])(?:\\\\)*)%.*$/gm, "$1");
}
function Lt(e) {
	return /\\documentclass\s*(?:\[[^\]]*\])?\s*\{/.test(It(e));
}
var Rt = {
	tex: [".tex", ".ltx"],
	graphics: [
		".pdf",
		".png",
		".jpg",
		".jpeg",
		".eps",
		".webp",
		".gif",
		".svg"
	],
	bibliography: [".bib"]
}, zt = [
	[/\\(?:input|include|subfile)\s*\{([^}]+)\}/g, "tex"],
	[/\\includegraphics\s*(?:\[[^\]]*\])?\s*\{([^}]+)\}/g, "graphics"],
	[/\\bibliography\s*\{([^}]+)\}/g, "bibliography"],
	[/\\addbibresource\s*(?:\[[^\]]*\])?\s*\{([^}]+)\}/g, "bibliography"]
];
function Bt(e) {
	let t = It(e), n = /* @__PURE__ */ new Set(), r = [];
	for (let [e, i] of zt) for (let a of t.matchAll(e)) {
		let e = i === "bibliography" ? a[1].split(",") : [a[1]];
		for (let t of e) {
			let e = t.trim();
			!e || /[\\{}#]/.test(e) || n.has(`${i}:${e}`) || (n.add(`${i}:${e}`), r.push({
				written: e,
				kind: i
			}));
		}
	}
	return r;
}
function Vt(e) {
	let t = /\\graphicspath\s*\{((?:\s*\{[^}]*\})+)\s*\}/.exec(It(e));
	return t ? [...t[1].matchAll(/\{([^}]*)\}/g)].map((e) => e[1].trim()).filter(Boolean) : [];
}
function Ht(e) {
	let t = e.lastIndexOf("/");
	return t < 0 ? "" : e.slice(0, t + 1);
}
function Ut(e, t) {
	let n = [];
	for (let r of `${e}${t}`.split("/")) if (r && r !== ".") {
		if (r === "..") {
			if (n.length === 0) return null;
			n.pop();
		} else n.push(r);
	}
	return n.join("/");
}
function Wt(e, t, n, r) {
	let i = /* @__PURE__ */ new Set([Ht(n ?? t), Ht(t)]);
	if (e.kind === "graphics") for (let e of r) {
		let r = Ut(Ht(n ?? t), e);
		r !== null && i.add(r ? `${r}/` : "");
	}
	let a = B(e.written) ? [e.written] : Rt[e.kind].map((t) => `${e.written}${t}`), o = [];
	for (let e of i) for (let t of a) {
		let n = Ut(e, t);
		n && o.push(n);
	}
	return o;
}
function Gt(e) {
	let t = e.filter((e) => Ft(e.path) && Lt(e.text)).map((e) => e.path).sort();
	if (t.length === 0) return {
		isLatex: !1,
		mainFile: null
	};
	if (t.includes("main.tex")) return {
		isLatex: !0,
		mainFile: "main.tex"
	};
	if (t.length === 1) return {
		isLatex: !0,
		mainFile: t[0]
	};
	let n = t.filter((e) => z(e) === "main.tex");
	return {
		isLatex: !0,
		mainFile: n.length === 1 ? n[0] : null
	};
}
function Kt(e, t, n, r, i) {
	let a = Vt(t), o = [], s = [];
	for (let c of Bt(t)) {
		let t = Wt(c, e, n, a);
		t.some(r) || (t.some(i) ? s : o).push(c.written);
	}
	let c = [];
	return o.length > 0 && c.push(`This file uses ${Pt(o)}, which ${o.length === 1 ? "isn't" : "aren't"} in the project.`), s.length > 0 && c.push(`This file uses ${Pt(s)}, which ${s.length === 1 ? "was" : "were"} left out of the project.`), c;
}
// ../reword-nerd/src/engine/text/paths.ts
function qt(e) {
	let t = e.normalize("NFC");
	if (!t || t.includes("\0") || t.split("/").some((e) => !e || e === "." || e === "..")) throw new W(`This folder has a file path that can't be used (${N(e)}).`);
	return t;
}
// ../reword-nerd/src/engine/text/source.ts
var Jt = {
	docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	pdf: "application/pdf",
	markdown: "text/markdown",
	html: "text/html",
	xml: "application/xml",
	json: "application/json",
	csv: "text/csv",
	tsv: "text/tab-separated-values",
	css: "text/css"
};
async function Yt(e) {
	let { bytes: t, kind: n } = e;
	return {
		id: Mt("text"),
		kind: "text",
		path: e.path,
		projectId: e.projectId,
		format: n.format,
		languageId: n.languageId,
		previewKind: n.previewKind,
		original: new Blob([t], { type: Jt[n.format] ?? "text/plain" }),
		byteCount: t.byteLength,
		sha256: await jt(t),
		extractedText: e.text,
		text: e.text,
		included: !0,
		notes: e.notes ?? [],
		assets: e.assets ?? [],
		ocr: e.ocr ?? []
	};
}
var Xt = 26214400, Zt = 1048576, Qt = /* @__PURE__ */ new Set([
	"node_modules",
	"bower_components",
	".git",
	".hg",
	".svn",
	"__pycache__",
	".pytest_cache",
	".mypy_cache",
	".ruff_cache",
	".venv",
	"venv",
	".tox",
	".gradle",
	"Pods",
	".terraform",
	".next",
	".nuxt",
	".svelte-kit",
	".turbo",
	".cache"
]), $t = /* @__PURE__ */ new Set([
	"build",
	"dist",
	"out",
	"target",
	"coverage",
	"vendor",
	"vendors",
	"cache",
	"gen",
	"generated"
]), en = /* @__PURE__ */ new Set([
	"package.json",
	"Cargo.toml",
	"pyproject.toml",
	"setup.py",
	"go.mod",
	"pom.xml",
	"build.gradle",
	"build.gradle.kts",
	"composer.json",
	"Gemfile"
]), tn = /* @__PURE__ */ new Set([
	"package-lock.json",
	"npm-shrinkwrap.json",
	"yarn.lock",
	"pnpm-lock.yaml",
	"bun.lock",
	"bun.lockb",
	"poetry.lock",
	"pipfile.lock",
	"cargo.lock",
	"gemfile.lock",
	"composer.lock"
]), nn = /* @__PURE__ */ new Set([
	".zip",
	".tar",
	".gz",
	".tgz",
	".bz2",
	".xz",
	".rar",
	".7z"
]), rn = /* @__PURE__ */ new Set([
	".map",
	".aux",
	".log",
	".toc",
	".lof",
	".lot",
	".out",
	".blg",
	".fls",
	".fdb_latexmk",
	".synctex",
	".nav",
	".snm",
	".vrb",
	".xdv",
	".dvi"
]), an = {
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".gif": "image/gif",
	".webp": "image/webp",
	".avif": "image/avif",
	".bmp": "image/bmp",
	".tif": "image/tiff",
	".tiff": "image/tiff",
	".ico": "image/x-icon",
	".svg": "image/svg+xml",
	".eps": "application/postscript",
	".pdf": "application/pdf",
	".ttf": "font/ttf",
	".otf": "font/otf",
	".woff": "font/woff",
	".woff2": "font/woff2",
	".bib": "text/x-bibtex",
	".bst": "text/plain",
	".bbl": "text/plain"
}, on = /* @__PURE__ */ new Set([".cls", ".sty"]);
function sn(e) {
	let t = e.lastIndexOf("/");
	return t < 0 ? "" : e.slice(0, t);
}
function cn(e) {
	return new Set(e.filter((e) => en.has(z(e.path))).map((e) => sn(e.path)));
}
function ln(e, t) {
	let n = e.split("/");
	for (let e = 0; e < n.length - 1; e += 1) {
		let r = n[e], i = n.slice(0, e).join("/");
		if (Qt.has(r) || $t.has(r.toLowerCase()) && (e === 0 || t.has(i))) return `${n.slice(0, e + 1).join("/")}/`;
	}
	return null;
}
function un(e) {
	let t = z(e).toLowerCase(), n = B(t);
	return tn.has(t) ? "lock-file" : nn.has(n) ? "nested-archive" : rn.has(n) || /\.min\.(?:js|css)$/.test(t) ? "dependency-or-build-output" : _t(e) ? "credentials" : null;
}
var dn = class {
	items = /* @__PURE__ */ new Map();
	add(e, t) {
		this.items.has(e) || this.items.set(e, t);
	}
	covers(e) {
		if (this.items.has(e)) return !0;
		for (let t of this.items.keys()) if (t.endsWith("/") && e.startsWith(t)) return !0;
		return !1;
	}
	get size() {
		return this.items.size;
	}
	list() {
		return [...this.items].map(([e, t]) => ({
			path: e,
			reason: t
		})).sort((e, t) => fn(e.path, t.path));
	}
};
function fn(e, t) {
	return e < t ? -1 : +(e > t);
}
async function pn(t) {
	let { default: n } = await import("./ignore-5ZjhUzF3.js").then((t) => /* @__PURE__ */ e(t.default, 1)), r = n().add(t), i = (e) => {
		try {
			return r.ignores(e);
		} catch {
			return !1;
		}
	};
	return (e) => {
		let t = e.split("/");
		for (let e = 1; e < t.length; e += 1) {
			let n = `${t.slice(0, e).join("/")}/`;
			if (i(n)) return n;
		}
		return i(e) ? e : null;
	};
}
function mn(e, t) {
	let n = cn(e), r = [];
	for (let i of e) {
		if (de(i.path)) continue;
		let e = ln(i.path, n), a = e ? "dependency-or-build-output" : un(i.path);
		a ? t.add(e ?? i.path, a) : r.push(i);
	}
	return r;
}
async function hn(e, t) {
	let n = e.find((e) => e.path === ".gitignore");
	if (!n) return e;
	let r = await n.read(Zt, _e(Zt)), i = r instanceof Uint8Array ? pt(r) : null;
	if (!i?.ok) return e;
	let a = await pn(i.text);
	return e.filter((e) => {
		let r = e === n ? null : a(e.path);
		return r && t.add(r, "ignored-by-gitignore"), !r;
	});
}
function gn(e, t, n, r) {
	let i = e.filter((e) => e.size <= 26214400 && !e.expands || (t.add(e.path, "too-large"), !1));
	if (i.length > 500) throw new W(`This ${n} has more than 500 files to read, even after skipping dependency and build folders. Add a smaller part of it.`);
	let a = i.reduce((e, t) => e + t.size, 0);
	if (a > 104857600) throw new W(`The files in this ${n} add up to more than 100 MB. Add a smaller part of it.`);
	if (a > r.remaining) throw new W(`Together with the other files added at the same time, this ${n} would pass the ${Math.round(r.total / 1048576)} MB that can be read at once. Add it on its own.`);
	return i;
}
function _n({ problem: e }) {
	return e === "too-large" || e === "expands" || e === "over-budget" ? "too-large" : e === "link" || e === "encrypted" ? "link-or-locked" : "unreadable-text";
}
async function vn(e, t, n, r) {
	let i = {
		textFiles: [],
		latexSupport: [],
		assets: []
	};
	for (let [a, o] of e.entries()) {
		r.signal?.throwIfAborted(), r.onProgress?.({
			label: `Reading ${n} (${a + 1} of ${e.length} files)`,
			completed: a,
			total: e.length
		});
		let s = await o.read(Xt, r.budget);
		if (!(s instanceof Uint8Array)) {
			t.add(o.path, _n(s));
			continue;
		}
		if (At(s)) {
			t.add(o.path, "credentials");
			continue;
		}
		let c = B(o.path), l = an[c];
		if (l !== void 0) {
			i.assets.push({
				path: o.path,
				bytes: new Blob([s], { type: l })
			});
			continue;
		}
		let u = pt(s);
		if (u.ok) {
			let e = {
				path: o.path,
				bytes: s,
				text: u.text
			};
			on.has(c) ? i.latexSupport.push(e) : i.textFiles.push(e);
		} else u.problem === "empty" ? i.assets.push({
			path: o.path,
			bytes: new Blob([s])
		}) : t.add(o.path, u.problem === "binary" ? "binary" : "unreadable-text");
	}
	return i;
}
function yn(e) {
	let t = 0, n = 0;
	for (let r of e) t >= 250 ? (r.included = !1, r.notes.push("Left out of the job at first because the project has more than 250 text files. Turn it on if you need it.")) : n + r.byteCount > 5242880 ? (r.included = !1, r.notes.push("Left out of the job at first because the project's text is over 5 MB. Turn it on if you need it.")) : (t += 1, n += r.byteCount);
}
async function bn(e, t, n, r, i = () => void 0) {
	let a = t === "zip" ? "ZIP" : "folder", o = new dn(), s = await hn(mn(n, o), o);
	for (let e of s) {
		let t = fe(e.path);
		if (t) throw new W(t);
	}
	let c = me(s.map((e) => e.path));
	if (c) throw new W(he(c, a));
	let l = gn(s, o, a, r.budget);
	i(l);
	let { textFiles: u, latexSupport: d, assets: f } = await vn(l, o, e, r), p = Gt(u);
	if (p.isLatex ? f.push(...d.map(({ path: e, bytes: t }) => ({
		path: e,
		bytes: new Blob([t], { type: "text/plain" })
	}))) : u.push(...d), u.length === 0) throw new W(o.size + f.length > 0 ? `This ${a} has no text files that can be read. Everything in it was skipped or isn't text.` : `This ${a} has no text files that can be read.`);
	u.sort((e, t) => fn(e.path, t.path)), f.sort((e, t) => fn(e.path, t.path));
	let m = Mt("project"), h = new Set([...u, ...f].map((e) => e.path)), g = [];
	for (let { path: e, bytes: t, text: n } of u) {
		let r = ct(e) ?? { ...et }, i = p.isLatex && r.format === "latex" ? Kt(e, n, p.mainFile, (e) => h.has(e), (e) => o.covers(e)) : [];
		g.push(await Yt({
			path: e,
			projectId: m,
			kind: r,
			bytes: t,
			text: n,
			notes: i
		}));
	}
	return yn(g), {
		project: {
			id: m,
			name: e,
			from: t,
			classification: p.isLatex ? "latex" : "general",
			mainFile: p.mainFile,
			excluded: o.list(),
			assets: f
		},
		sources: g
	};
}
async function xn(e, t, n) {
	return bn(e, "folder", t.map(({ file: e, path: t }) => {
		let n = qt(t);
		return {
			path: n,
			size: e.size,
			expands: !1,
			read: async (t, r) => {
				if (e.size > t) return {
					path: n,
					problem: "too-large",
					reason: "This file is too large."
				};
				if (e.size > r.remaining) return {
					path: n,
					problem: "over-budget",
					reason: "Too much to read at once."
				};
				try {
					let t = new Uint8Array(await e.arrayBuffer());
					return r.remaining -= t.byteLength, t;
				} catch {
					return {
						path: n,
						problem: "damaged",
						reason: "This file couldn't be read."
					};
				}
			}
		};
	}), n);
}
// tools/reword-nerd-demos/demos.ts
function G(e, t = {}, ...n) {
	let r = document.createElement(e);
	for (let [e, n] of Object.entries(t)) n != null && n !== !1 && (e === "class" ? r.className = String(n) : e === "text" ? r.textContent = String(n) : r.setAttribute(e, n === !0 ? "" : String(n)));
	for (let e of n) e != null && e !== !1 && r.append(e);
	return r;
}
var Sn = 0, Cn = (e) => `rn-${e}-${Sn += 1}`;
function K(e, t, n, r) {
	let i = Cn("choice"), a = G("fieldset", { class: "rn-choices" }, G("legend", { text: e }));
	for (let e of t) {
		let t = G("input", {
			type: "radio",
			name: i,
			value: e.value
		});
		t.checked = e.value === n, t.addEventListener("change", () => {
			t.checked && r(e.value);
		}), a.append(G("label", { class: "rn-choice" }, t, G("span", { text: e.label })));
	}
	return a;
}
function q(e, t, n) {
	let r = t.id || Cn("field");
	return t.id = r, G("div", { class: "rn-field" }, G("label", {
		for: r,
		text: e
	}), t, n ? G("p", {
		class: "rn-hint",
		text: n
	}) : null);
}
function wn(e, t, n) {
	let r = G("input", { type: "checkbox" });
	return r.checked = t, r.addEventListener("change", () => n(r.checked)), G("label", { class: "rn-check" }, r, G("span", { text: e }));
}
function J(e = "rn-code") {
	return G("pre", {
		class: e,
		tabindex: 0
	});
}
function Tn(e) {
	let t = document.createRange();
	t.selectNodeContents(e);
	let n = window.getSelection();
	n?.removeAllRanges(), n?.addRange(t);
}
function En(e, t) {
	let n = e.dataset.label ?? e.textContent ?? "";
	e.dataset.label = n, e.textContent = t, window.setTimeout(() => {
		e.textContent = n;
	}, 1800);
}
function Y(e, t) {
	let n = G("button", {
		type: "button",
		class: "rn-button",
		text: e
	});
	return n.addEventListener("click", async () => {
		let e = t();
		try {
			await navigator.clipboard.writeText(e.textContent ?? ""), En(n, "Copied");
		} catch {
			Tn(e), En(n, "Selected; copy it");
		}
	}), n;
}
var Dn = async ({ name: e, blob: t }) => {
	let n = URL.createObjectURL(t), r = G("a", {
		href: n,
		download: e,
		hidden: !0
	});
	document.body.append(r), r.click(), r.remove(), window.setTimeout(() => URL.revokeObjectURL(n), 1e4);
};
function On(e) {
	Dn = e;
}
function X(e, t, n) {
	let r = G("div", { class: "rn-demo__body" });
	return e.classList.add("rn-demo"), e.append(G("div", { class: "rn-demo__head" }, G("p", {
		class: "rn-eyebrow",
		text: "Try it here"
	}), G("p", {
		class: "rn-demo__title",
		text: t
	}), G("p", {
		class: "rn-demo__lede",
		text: n
	})), r, G("p", {
		class: "rn-demo__foot",
		text: "Built in your browser by reword_nerd's own code. Nothing here calls a model or uploads anything."
	})), r;
}
function kn(e) {
	let t = {
		name: "",
		children: /* @__PURE__ */ new Map(),
		folder: !0
	};
	for (let n of e) {
		let e = n.split("/").filter(Boolean), r = t;
		e.forEach((t, i) => {
			let a = i === e.length - 1;
			if (t === ".keep") return;
			let o = r.children.get(t);
			o || (o = {
				name: t,
				children: /* @__PURE__ */ new Map(),
				folder: !a || n.endsWith("/")
			}, r.children.set(t, o)), a || (o.folder = !0), r = o;
		}), e.at(-1) === ".keep" && (r.folder = !0);
	}
	let n = (e) => {
		let t = G("ul"), r = [...e.children.values()].sort((e, t) => e.folder === t.folder ? e.name.localeCompare(t.name) : e.folder ? -1 : 1);
		for (let e of r) {
			let r = G("li", { class: e.folder ? "is-folder" : "is-file" }, `${e.name}${e.folder ? "/" : ""}`);
			e.children.size > 0 && r.append(n(e)), t.append(r);
		}
		return t;
	};
	return G("div", { class: "rn-tree" }, n(t));
}
async function An(e) {
	let t = await ge(e), n = [];
	for await (let e of t.entries()) n.push(e.path);
	return await t.close(), n;
}
function Z(e, t = 160) {
	let n = 0;
	return () => {
		window.clearTimeout(n), n = window.setTimeout(e, t);
	};
}
var jn = "library-hours", Mn = "# Library hours during exams\n\nAt this point in time, we are in the process of considering a number of different options for extending the opening hours of the main library during the examination period.\n\nIt should be noted that a final decision will be made by the library committee no later than March 3, and all students will be notified by email in due course.\n\nIn the event that the hours are extended, the second floor will remain a silent study area at all times.\n", Nn = "# Library hours during exams\n\nWe're weighing a few ways to keep the main library open longer during exams.\n\nThe library committee will decide by March 3, and every student will get an email.\n\nIf the hours are extended, the second floor will remain a silent study area at all times.\n", Pn = "<<<FINAL_DOCUMENT>>>\n# Library hours during exams\n\nWe're looking at several ways to keep the main library open later while exams are on.\n\nThe library committee will make a final decision by March 3, and every student will get an email about it.\n\nIf the hours change, the second floor will stay a silent study area the whole time.\n<<<END_FINAL_DOCUMENT>>>\n\n<<<FIDELITY_AUDIT>>>\nMeaning: PASS. The options, the March 3 deadline, the email, and the silent floor are all kept.\nSettings: PASS. Plain and natural, about the same length.\nFormatting and figures: PASS. The heading and three paragraphs are kept.\nOpen questions: None\n<<<END_FIDELITY_AUDIT>>>\n";
function Fn(e) {
	let t = X(e, "Hand a document to your model", "Pick where the work will run and how it should read. The command, task folder, and prompts update as you go."), i = {
		destination: "claude-code",
		format: "markdown",
		goal: "clear",
		length: "original",
		language: "",
		text: Mn,
		shell: /win/i.test(navigator.platform) ? "powershell" : "unix",
		stepByStep: !1,
		stage: "decompose"
	}, s = a.filter((e) => e.forText && !e.id.startsWith("other")), c = () => `${jn}.${i.format === "docx" ? "docx" : "md"}`, l = () => ({
		...h({ ...d }, i.goal),
		length: i.length,
		outputLanguage: i.language
	}), f = () => ({
		title: c(),
		files: [{
			path: c(),
			text: i.text,
			format: i.format
		}],
		project: null,
		figures: []
	}), p = (e) => ({
		path: c(),
		original: e,
		text: i.text,
		extractedText: i.text,
		format: i.format
	}), g = G("input", {
		type: "text",
		placeholder: "Same as the source",
		autocomplete: "off"
	});
	g.addEventListener("input", () => {
		i.language = g.value, M();
	});
	let _ = G("textarea", {
		rows: 9,
		spellcheck: "true"
	});
	_.value = i.text, _.addEventListener("input", () => {
		i.text = _.value, M();
	});
	let v = G("div", { class: "rn-controls" }, K("Where it runs", s.map((e) => ({
		value: e.id,
		label: e.label
	})), i.destination, (e) => {
		i.destination = e, M();
	}), K("The file", [{
		value: "markdown",
		label: "Markdown"
	}, {
		value: "docx",
		label: "Word"
	}], i.format, (e) => {
		i.format = e, M();
	}), K("Goal", [
		"clear",
		"polish",
		"academic"
	].map((e) => ({
		value: e,
		label: u[e].label
	})), i.goal, (e) => {
		i.goal = e, M();
	}), K("Length", [
		"original",
		"shorter",
		"longer"
	].map((e) => ({
		value: e,
		label: e === "original" ? "About the same" : m[e]
	})), i.length, (e) => {
		i.length = e, M();
	}), q("Output language", g), G("details", { class: "rn-details" }, G("summary", { text: "Edit the sample document" }), q(`${jn}.md`, _, "Change anything; the hand-off below follows."))), y = G("div", { class: "rn-output" }), b = G("p", {
		class: "rn-status",
		role: "status"
	});
	t.append(v, y, b);
	let S = J("rn-code rn-command"), C = G("div"), w = J(), T = G("button", {
		type: "button",
		class: "rn-button",
		text: "Download this task folder"
	}), E = G("div", { class: "rn-stack" }, G("p", {
		class: "rn-label",
		text: "1. Paste this in a terminal"
	}), K("Terminal", [{
		value: "unix",
		label: "macOS or Linux"
	}, {
		value: "powershell",
		label: "Windows"
	}], i.shell, (e) => {
		i.shell = e, M();
	}), S, G("div", { class: "rn-row" }, Y("Copy command", () => S), T), G("p", {
		class: "rn-label",
		text: "2. The agent works inside this folder"
	}), C, G("details", { class: "rn-details" }, G("summary", { text: "Read TASK.md, the agent's instructions" }), w)), D = J(), O = G("a", {
		class: "rn-button rn-button--quiet",
		target: "_blank",
		rel: "noopener noreferrer"
	}), k = G("div"), A = G("div", { class: "rn-stack" }, wn("Go step by step (four prompts, for long or delicate documents)", i.stepByStep, (e) => {
		i.stepByStep = e, M();
	}), k, G("p", { class: "rn-label rn-prompt-label" }), D, G("div", { class: "rn-row" }, Y("Copy prompt", () => D), O)), j = K("Stage", x.map((e, t) => ({
		value: e,
		label: `${t + 1}. ${e[0].toUpperCase()}${e.slice(1)}`
	})), i.stage, (e) => {
		i.stage = e, M();
	});
	k.append(j), T.addEventListener("click", async () => {
		T.disabled = !0;
		try {
			let e = i.format === "docx" ? await Ue(i.text) : new Blob([i.text], { type: "text/markdown" }), t = n(c()), r = await Ee({
				batch: f(),
				files: [p(e)],
				assets: []
			}, l(), t);
			await Dn({
				name: `${t}.zip`,
				blob: r
			}), b.textContent = `Saved ${t}.zip. Unzip it in Downloads and paste the command.`;
		} catch (e) {
			b.textContent = `That didn't save: ${e instanceof Error ? e.message : String(e)}`;
		} finally {
			T.disabled = !1;
		}
	});
	let te = 0, M = Z(async () => {
		let e = te += 1, t = o(i.destination);
		if (t.kind === "agent") {
			let a = n(c());
			S.textContent = r(a, t, i.shell), w.textContent = Te({
				batch: f(),
				files: [p(new Blob())],
				assets: []
			}, l());
			let o = await An(await Ee({
				batch: f(),
				files: [p(new Blob())],
				assets: []
			}, l(), a));
			if (e !== te) return;
			C.replaceChildren(kn(o)), y.replaceChildren(E), b.textContent = `${t.label}: one command, then the agent follows TASK.md. ${t.hint}`;
		} else {
			j.hidden = !i.stepByStep;
			let e = i.stepByStep ? ie(f(), l(), i.stage) : ee(f(), l());
			D.textContent = e;
			let n = A.querySelector(".rn-prompt-label");
			n.textContent = i.stepByStep ? `Prompt ${x.indexOf(i.stage) + 1} of 4 for ${t.label}` : `One prompt for ${t.label}`, O.textContent = `Open ${t.label}`, O.setAttribute("href", t.url ?? "#"), y.replaceChildren(A), b.textContent = `${e.length.toLocaleString("en-US")} characters. Paste it into a new chat${i.stepByStep ? ". In the app, you paste each reply back, and it goes into the next prompt for you" : ""}.`;
		}
	}, 60);
	M();
}
var In = {
	"dependency-or-build-output": "dependency or build output",
	"lock-file": "lock file",
	binary: "not a text file",
	"too-large": "too large",
	credentials: "may contain passwords or keys",
	"ignored-by-gitignore": "listed in .gitignore",
	"unreadable-text": "couldn't be read as text",
	"link-or-locked": "a link or a password-protected file",
	"nested-archive": "archive inside the project"
}, Ln = Uint8Array.from(atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="), (e) => e.charCodeAt(0)), Rn = "# Where the site is published\nhost: docs.example.org\nbranch: main\napi_token: 9f8e7d6c5b4a3f2e1d0c\n", zn = [
	{
		path: "README.md",
		content: "# Field notes\n\nA small site for our survey notes.\n"
	},
	{
		path: "docs/guide.md",
		content: "# Guide\n\nAdd a note, then publish it.\n"
	},
	{
		path: "src/app.js",
		content: "// Shows the latest note.\nexport const title = \"Latest note\";\n"
	},
	{
		path: "package.json",
		content: "{\n  \"name\": \"field-notes\",\n  \"private\": true\n}\n"
	},
	{
		path: "package-lock.json",
		content: "{\n  \"lockfileVersion\": 3\n}\n"
	},
	{
		path: "node_modules/left-pad/index.js",
		content: "module.exports = () => {};\n"
	},
	{
		path: "dist/app.min.js",
		content: "export const t=\"Latest note\";\n"
	},
	{
		path: ".env",
		content: "SECRET=do-not-share\n"
	},
	{
		path: ".gitignore",
		content: "scratch/\n"
	},
	{
		path: "scratch/todo.md",
		content: "- tidy the guide\n"
	},
	{
		path: "images/logo.png",
		content: Ln
	},
	{
		path: "backup.zip",
		content: "PK"
	},
	{
		path: ".DS_Store",
		content: ""
	}
], Bn = [
	".env.example",
	"id_ed25519",
	"build/index.html",
	"src/build/notes.md"
];
function Vn(e) {
	let t = X(e, "Add a whole project", "A sample project folder, screened by the same rules the app uses. Edit the YAML file or add a file name and watch what changes."), n = [], r = G("textarea", {
		rows: 5,
		spellcheck: "false",
		class: "rn-mono"
	});
	r.value = Rn;
	let i = G("input", {
		type: "text",
		placeholder: "e.g. secrets.json",
		autocomplete: "off",
		class: "rn-mono"
	}), a = G("button", {
		type: "button",
		class: "rn-button",
		text: "Add file"
	}), o = G("div", { class: "rn-row rn-row--tight" });
	for (let e of Bn) {
		let t = G("button", {
			type: "button",
			class: "rn-chip",
			text: e
		});
		t.addEventListener("click", () => u(e)), o.append(t);
	}
	let s = G("button", {
		type: "button",
		class: "rn-button rn-button--quiet",
		text: "Start over"
	}), c = G("div", { class: "rn-columns" }), l = G("p", {
		class: "rn-status",
		role: "status"
	});
	t.append(G("div", { class: "rn-controls" }, q("config/deploy.yaml", r, "Delete the token line, or change it to a placeholder like your-token-here."), G("div", { class: "rn-field" }, G("label", {
		for: i.id = Cn("extra"),
		text: "Add a file to the project"
	}), G("div", { class: "rn-row rn-row--tight" }, i, a), o), G("div", { class: "rn-row" }, s)), c, l);
	function u(e) {
		let t = e.trim().replace(/^\/+/, "");
		t && !n.includes(t) && (n.push(t), i.value = "", p());
	}
	a.addEventListener("click", () => u(i.value)), i.addEventListener("keydown", (e) => {
		e.key === "Enter" && (e.preventDefault(), u(i.value));
	}), r.addEventListener("input", () => p()), s.addEventListener("click", () => {
		n.length = 0, r.value = Rn, p();
	});
	let d = (e, t, n, r) => G("section", { class: `rn-column rn-column--${r}` }, G("p", {
		class: "rn-label",
		text: `${e} (${t.length})`
	}), t.length ? G("ul", { class: "rn-files" }, ...t) : G("p", {
		class: "rn-hint",
		text: n
	})), f = 0, p = Z(async () => {
		let e = f += 1, t = [
			...zn,
			{
				path: "config/deploy.yaml",
				content: r.value
			},
			...n.map((e) => ({
				path: e,
				content: "Notes for later.\n"
			}))
		].map(({ path: e, content: t }) => ({
			path: e,
			file: new File([typeof t == "string" ? t : new Uint8Array(t)], e.split("/").pop())
		}));
		try {
			let { project: n, sources: r } = await xn("field-notes", t, { budget: _e(10485760) });
			if (e !== f) return;
			let i = r.map((e) => e.path).sort().map((e) => G("li", {}, G("code", { text: e }))), a = n.assets.map((e) => G("li", {}, G("code", { text: e.path }))), o = n.excluded.map((e) => G("li", {}, G("code", { text: e.path }), G("span", {
				class: "rn-reason",
				text: In[e.reason]
			})));
			c.replaceChildren(d("Handed off", i, "Nothing to hand off.", "in"), d("Kept, not rewritten", a, "None.", "kept"), d("Left out", o, "Nothing left out.", "out")), l.textContent = `${i.length} files handed off, ${a.length} kept as is, and ${o.length} left out. The .DS_Store file is skipped without a mention.`;
		} catch (t) {
			if (e !== f) return;
			c.replaceChildren(), l.textContent = t instanceof Error ? t.message : String(t);
		}
	});
	p();
}
function Hn(e) {
	let t = G("table", { class: "rn-diff" });
	t.append(G("colgroup", {}, G("col", { class: "rn-diff__num" }), G("col", { class: "rn-diff__num" }), G("col", { class: "rn-diff__sign" }), G("col")));
	let n = G("tbody");
	for (let t of e) {
		let e = G("td", { class: "rn-diff__text" });
		for (let n of t.segments) e.append(n.changed ? G("mark", {
			class: "rn-diff__word",
			text: n.text
		}) : n.text);
		t.segments.some((e) => e.text) || e.append("\xA0"), n.append(G("tr", { class: `rn-diff__${t.kind}` }, G("td", {
			class: "rn-diff__n",
			text: t.oldLine ?? ""
		}), G("td", {
			class: "rn-diff__n",
			text: t.newLine ?? ""
		}), G("td", {
			class: "rn-diff__s",
			text: t.kind === "add" ? "+" : t.kind === "del" ? "−" : ""
		}), e));
	}
	return t.append(n), G("div", {
		class: "rn-diff-scroll",
		tabindex: 0,
		role: "region",
		"aria-label": "Changes"
	}, t);
}
function Un(e) {
	let t = X(e, "See every change", "Paste a model's reply, or edit the text yourself. Removed lines are red, new lines are green, and the words that changed are marked inside them."), n = { mode: "reply" }, r = G("textarea", {
		rows: 12,
		spellcheck: "false",
		class: "rn-mono"
	});
	r.value = Pn;
	let i = G("textarea", {
		rows: 9,
		spellcheck: "true"
	});
	i.value = Nn;
	let a = q("The reply", r, "A sample reply, written by hand for this demo. Paste a real one from the demo above to see yours."), o = q("Your version", i, "The sample document, already edited a little. Keep going."), s = G("button", {
		type: "button",
		class: "rn-button rn-button--quiet",
		text: "Start over"
	}), c = G("p", { class: "rn-verdict" }), l = J("rn-code rn-audit"), u = G("p", { class: "rn-stats" }), d = G("div"), f = G("p", {
		class: "rn-status",
		role: "status"
	});
	t.append(G("div", { class: "rn-controls" }, K("Compare", [{
		value: "reply",
		label: "A model's reply"
	}, {
		value: "own",
		label: "My own edits"
	}], n.mode, (e) => {
		n.mode = e, m();
	}), a, o, G("div", { class: "rn-row" }, s)), G("div", { class: "rn-stack" }, c, l, u, d), f), r.addEventListener("input", () => m()), i.addEventListener("input", () => m()), s.addEventListener("click", () => {
		r.value = Pn, i.value = Nn, m();
	});
	let p = 0, m = Z(async () => {
		let e = p += 1;
		a.hidden = n.mode !== "reply", o.hidden = n.mode !== "own";
		let t = i.value;
		if (c.hidden = l.hidden = n.mode !== "reply", n.mode === "reply") {
			let e = Qe(r.value);
			t = e.document ?? "";
			let n = $e(e.audit);
			c.className = `rn-verdict rn-verdict--${n}`, c.textContent = n === "pass" ? "The model's own check: PASS" : n === "review" ? "The model's own check: look closer" : "No check in this reply", l.textContent = e.audit ?? "", l.hidden = !e.audit, e.unstructured && (c.textContent = "No markers found, so the whole reply is treated as the rewrite");
		}
		let s = await Je(Mn, t);
		e === p && (u.replaceChildren(G("span", {
			class: "rn-stats__add",
			text: `+${s.added}`
		}), " ", G("span", {
			class: "rn-stats__del",
			text: `−${s.removed}`
		}), ` lines against ${jn}.md`), d.replaceChildren(Hn(s.rows)), f.textContent = `${s.added} lines added and ${s.removed} removed.`);
	});
	m();
}
var Q = {
	name: "bakery.png",
	width: 640,
	height: 480,
	text: "BAKERY"
};
function Wn() {
	let e = G("canvas", {
		width: Q.width,
		height: Q.height
	}), t = e.getContext("2d"), n = t.createLinearGradient(0, 0, 0, 360);
	n.addColorStop(0, "#8fcbea"), n.addColorStop(1, "#e9f5fb"), t.fillStyle = n, t.fillRect(0, 0, 640, 480), t.fillStyle = "#ffd25a", t.beginPath(), t.arc(548, 86, 44, 0, Math.PI * 2), t.fill(), t.fillStyle = "#86bb73", t.beginPath(), t.ellipse(120, 420, 330, 110, 0, Math.PI, 0), t.fill(), t.fillStyle = "#6fa65d", t.fillRect(0, 380, 640, 100), t.fillStyle = "#f4e4c4", t.fillRect(200, 190, 250, 200);
	for (let e = 0; e < 10; e += 1) t.fillStyle = e % 2 ? "#ffffff" : "#d4574f", t.fillRect(190 + e * 27, 190, 27, 34);
	t.fillStyle = "#5b3f2c", t.fillRect(232, 128, 186, 50), t.fillStyle = "#fff6e6", t.font = "700 32px Georgia, serif", t.textAlign = "center", t.textBaseline = "middle", t.fillText(Q.text, 325, 154), t.fillStyle = "#6b4a33", t.fillRect(302, 284, 52, 106), t.fillStyle = "#c3e5f3", t.fillRect(220, 250, 66, 62), t.fillRect(372, 250, 62, 62), t.strokeStyle = "#5b3f2c", t.lineWidth = 4, t.strokeRect(220, 250, 66, 62), t.strokeRect(372, 250, 62, 62), t.fillStyle = "#7a5230", t.fillRect(92, 300, 18, 84), t.fillStyle = "#4f8f4a";
	for (let [e, n, r] of [
		[
			101,
			270,
			46
		],
		[
			72,
			296,
			34
		],
		[
			130,
			298,
			34
		]
	]) t.beginPath(), t.arc(e, n, r, 0, Math.PI * 2), t.fill();
	return e;
}
function Gn(e) {
	let t = X(e, "Regenerate an image", "Say what should change and what must stay. reword_nerd writes the prompt to paste beside the image, or a folder for an agent that makes images."), i = Wn();
	i.setAttribute("role", "img"), i.setAttribute("aria-label", "A sample picture: a small bakery with a red and white awning, a tree, and the sun."), i.classList.add("rn-picture");
	let s = new Blob(), c = new Promise((e) => i.toBlob((t) => {
		t && (s = t), e();
	}, "image/png")), l = a.filter((e) => e.forImages && !e.id.startsWith("other")), u = {
		aspectRatio: "match-source",
		keepVisibleText: !0,
		keepBackground: !1,
		changes: "Make it look like a watercolor painting.",
		mustKeep: ""
	}, d = {
		destination: "grok-imagine",
		visibleText: Q.text,
		shell: /win/i.test(navigator.platform) ? "powershell" : "unix"
	}, f = G("input", {
		type: "text",
		autocomplete: "off"
	});
	f.value = u.changes;
	let p = G("input", {
		type: "text",
		autocomplete: "off",
		placeholder: "e.g. the shape of the awning"
	}), m = G("input", {
		type: "text",
		autocomplete: "off"
	});
	m.value = d.visibleText;
	let h = G("select");
	for (let [e, t] of Object.entries(Oe)) h.append(G("option", {
		value: e,
		text: t
	}));
	h.value = u.aspectRatio, f.addEventListener("input", () => {
		u.changes = f.value, O();
	}), p.addEventListener("input", () => {
		u.mustKeep = p.value, O();
	}), m.addEventListener("input", () => {
		d.visibleText = m.value, O();
	}), h.addEventListener("change", () => {
		u.aspectRatio = h.value, O();
	});
	let g = () => ({
		id: "sample",
		kind: "image",
		name: Q.name,
		from: null,
		original: s,
		mimeType: "image/png",
		width: Q.width,
		height: Q.height,
		byteCount: s.size,
		sha256: "",
		included: !0,
		visibleText: d.visibleText,
		settings: null,
		notes: []
	});
	t.append(G("div", { class: "rn-split" }, G("figure", { class: "rn-figure" }, i, G("figcaption", { text: "bakery.png, 640 × 480, drawn by this page" })), G("div", { class: "rn-controls" }, K("Where it runs", l.map((e) => ({
		value: e.id,
		label: e.id === "codex-images" ? "Codex (a folder)" : e.label
	})), d.destination, (e) => {
		d.destination = e, O();
	}), q("What should change", f), q("Also keep", p), q("Text in the picture", m, "The app reads this with OCR, and you can correct it."), G("div", { class: "rn-row rn-row--tight" }, wn("Keep the visible text", u.keepVisibleText, (e) => {
		u.keepVisibleText = e, O();
	}), wn("Keep the background", u.keepBackground, (e) => {
		u.keepBackground = e, O();
	})), q("Aspect ratio", h))));
	let _ = G("div", { class: "rn-output" }), v = G("p", {
		class: "rn-status",
		role: "status"
	});
	t.append(_, v);
	let y = J(), b = G("a", {
		class: "rn-button rn-button--quiet",
		target: "_blank",
		rel: "noopener noreferrer"
	}), x = G("div", { class: "rn-stack" }, G("p", { class: "rn-label rn-prompt-label" }), y, G("div", { class: "rn-row" }, Y("Copy prompt", () => y), b)), S = J("rn-code rn-command"), C = G("div"), w = J(), T = G("button", {
		type: "button",
		class: "rn-button",
		text: "Download this task folder"
	}), E = G("div", { class: "rn-stack" }, G("p", {
		class: "rn-label",
		text: "Paste this in a terminal"
	}), S, G("div", { class: "rn-row" }, Y("Copy command", () => S), T), G("p", {
		class: "rn-label",
		text: "Codex makes every image in this folder"
	}), C, G("details", { class: "rn-details" }, G("summary", { text: "Read TASK.md and the image's prompt" }), w));
	T.addEventListener("click", async () => {
		T.disabled = !0;
		try {
			await c;
			let e = n("images"), t = await Ne([g()], u, d.destination, e);
			await Dn({
				name: `${e}.zip`,
				blob: t
			}), v.textContent = `Saved ${e}.zip.`;
		} catch (e) {
			v.textContent = `That didn't save: ${e instanceof Error ? e.message : String(e)}`;
		} finally {
			T.disabled = !1;
		}
	});
	let D = 0, O = Z(async () => {
		let e = D += 1, t = o(d.destination), i = Ae(g(), u, d.destination);
		if (t.kind === "agent") {
			let a = n("images");
			S.textContent = r(a, t, d.shell);
			let o = je([g()]);
			w.textContent = `${Me([g()], o)}\n---\nprompts/bakery.md\n\n${i}`;
			let s = await An(await Ne([g()], u, d.destination, a));
			if (e !== D) return;
			C.replaceChildren(kn(s)), _.replaceChildren(E), v.textContent = t.hint;
		} else y.textContent = i, x.querySelector(".rn-prompt-label").textContent = `Attach bakery.png in ${t.label}, then paste`, b.textContent = `Open ${t.label}`, b.setAttribute("href", t.url ?? "#"), _.replaceChildren(x), v.textContent = t.hint;
	});
	O();
}
var Kn = {
	handoff: Fn,
	project: Vn,
	changes: Un,
	image: Gn
};
function $(e = document) {
	for (let t of e.querySelectorAll("[data-rn-demo]")) {
		if (t.dataset.rnMounted) continue;
		let e = Kn[t.dataset.rnDemo ?? ""];
		e && (t.dataset.rnMounted = "true", t.replaceChildren(), e(t));
	}
}
window.rewordNerdDemos = {
	mount: $,
	setSaver: On
}, document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => $()) : $(), document.dispatchEvent(new CustomEvent("rn-demos-ready"));
export { $ as mount, On as setSaver };
