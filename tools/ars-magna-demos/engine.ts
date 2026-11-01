// The Ars Magna article's search demo runs the site's own engine. This entry hands its client to
// assets/js/ars-magna-demos.js, which loads it only when a reader reaches the demo.
import { ArsMagnaClient, DEFAULT_QUERY } from "@engine";

(window as unknown as { ArsMagnaEngine: unknown }).ArsMagnaEngine = { ArsMagnaClient, DEFAULT_QUERY };
window.dispatchEvent(new Event("arsmagna:engine"));
