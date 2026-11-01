/* reword_nerd article demos, built from reword-nerd e85cf0f by tools/reword-nerd-demos. Rebuild; don't edit. */
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/constants.js
var e = 4294967295, t = 65535, n = 134695760, r = n, i = 33639248, a = 101010256, o = 101075792, s = 117853008, c = 39169, l = 21589, u = 28789, d = 25461, f = 6534, p = 30837, m = 30805, h = 2048, g = 61440, _ = 16384, v = 2048, y = 1024, b = new Date(2107, 11, 31, 23, 59, 58), x = new Date(1980, 0, 1), S = Infinity, C = "undefined", w = "function", T = /* @__PURE__ */ new Uint8Array(), E = 64, D = 2;
try {
	typeof navigator < "u" && navigator.hardwareConcurrency && (D = navigator.hardwareConcurrency);
} catch {}
var O = {
	workerURI: "./core/web-worker-wasm.js",
	wasmURI: "./core/streams/zlib-wasm/zlib-streams.wasm",
	chunkSize: 65536,
	maxWorkers: D,
	terminateWorkerTimeout: 5e3,
	workerStarvationTimeout: 5e3,
	workerStartupTimeout: 5e3,
	useWebWorkers: !0,
	useCompressionStream: !0,
	transferStreams: !0,
	CompressionStream: typeof CompressionStream < "u" && CompressionStream,
	DecompressionStream: typeof DecompressionStream < "u" && DecompressionStream
}, k = [
	"baseURI",
	"wasmURI",
	"workerURI",
	"chunkSize",
	"maxWorkers",
	"terminateWorkerTimeout",
	"workerStarvationTimeout",
	"workerStartupTimeout",
	"useCompressionStream",
	"useWebWorkers",
	"transferStreams",
	"CompressionStream",
	"DecompressionStream",
	"CompressionStreamZlib",
	"DecompressionStreamZlib"
], A = { ...O };
function j() {
	return A;
}
function M(e) {
	return Math.max(e.chunkSize, E);
}
function N(e) {
	for (let t of k) {
		let n = e[t];
		n !== void 0 && (A[t] = n);
	}
}
function P(e) {
	for (let t of k) {
		let n = e[t];
		n !== void 0 && (O[t] = n);
	}
	N(e);
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/web-worker-inline-wasm.js
function F(e) {
	e({ workerURI: (e) => {
		let t = "text/javascript";
		if (e) {
			let e = new Blob(["(t=>{\"function\"==typeof define&&define.amd?define(t):t()})(function(){\"use strict\";const{Array:t,Object:e,Number:n,Math:s,Error:r,Uint8Array:o,Uint16Array:i,Uint32Array:c,Int32Array:a,Map:f,DataView:l,Promise:u,TextEncoder:w,crypto:h,postMessage:p,TransformStream:d,ReadableStream:y,WritableStream:m,CompressionStream:g,DecompressionStream:S}=self,v=void 0,b=\"undefined\",z=\"function\",k=new o,C=[[],[],[],[],[],[],[],[]];for(let t=0;256>t;t++){let e=t;for(let t=0;8>t;t++)e=1&e?e>>>1^3988292384:e>>>1;C[0][t]=e}for(let t=0;256>t;t++)for(let e=1;8>e;e++){const n=C[e-1][t];C[e][t]=n>>>8^C[0][255&n]}const[A,I,x,P,M,B,D,R]=C;class U{constructor(t){this.o=t||-1}append(t){let e=0|this.o;const n=0|t.length;let s=0;if(n>=8&&t.buffer){const r=new l(t.buffer,t.byteOffset,n),o=n-8;for(;o>=s;s+=8){const t=e^r.getInt32(s,!0),n=r.getInt32(s+4,!0);e=R[255&t]^D[t>>>8&255]^B[t>>>16&255]^M[t>>>24&255]^P[255&n]^x[n>>>8&255]^I[n>>>16&255]^A[n>>>24&255]}}for(;n>s;s++)e=e>>>8^A[255&(e^t[s])];this.o=e}get(){return~this.o}}class _ extends d{constructor(){let t;const e=new U;super({transform(t,n){e.append(t),n.enqueue(t)},flush(){const n=new o(4);new l(n.buffer).setUint32(0,e.get()),t.value=n}}),t=this}}function V(t,e){const n=new o(t.length+e.length);return n.set(t),n.set(e,t.length),n}const W={concat(t,e){if(0===t.length||0===e.length)return t.concat(e);const n=t[t.length-1],s=W.l(n);return 32===s?t.concat(e):W.h(e,s,0|n,t.slice(0,t.length-1))},m(t){const e=t.length;if(0===e)return 0;const n=t[e-1];return 32*(e-1)+W.l(n)},S(t,e){if(32*t.length<e)return t;const n=(t=t.slice(0,s.ceil(e/32))).length;return e&=31,n>0&&e&&(t[n-1]=W.v(e,t[n-1]&2147483648>>e-1,1)),t},v:(t,e,n)=>32===t?e:(n?0|e:e<<32-t)+1099511627776*t,l:t=>s.round(t/1099511627776)||32,h(t,e,n,s){for(void 0===s&&(s=[]);e>=32;e-=32)s.push(n),n=0;if(0===e)return s.concat(t);for(let r=0;r<t.length;r++)s.push(n|t[r]>>>e),n=t[r]<<32-e;const r=t.length?t[t.length-1]:0,o=W.l(r);return s.push(W.v(e+o&31,e+o>32?n:s.pop(),1)),s}},K={bytes:{C(t){const e=W.m(t)/8,n=new o(e);let s;for(let r=0;e>r;r++)3&r||(s=t[r/4]),n[r]=s>>>24,s<<=8;return n},A(t){const e=[];let n,s=0;for(n=0;n<t.length;n++)s=s<<8|t[n],3&~n||(e.push(s),s=0);return 3&n&&e.push(W.v(8*(3&n),s)),e}}},E=class{constructor(t){const e=this;e.blockSize=512,e.I=[1732584193,4023233417,2562383102,271733878,3285377520],e.P=[1518500249,1859775393,2400959708,3395469782],t?(e.M=t.M.slice(0),e.B=t.B.slice(0),e.D=t.D):e.reset()}reset(){const t=this;return t.M=t.I.slice(0),t.B=[],t.D=0,t}update(t){const e=this;\"string\"==typeof t&&(t=K.R.A(t));const n=e.B=W.concat(e.B,t),s=e.D,o=e.D=s+W.m(t);if(o>9007199254740991)throw new r(\"Cannot hash more than 2^53 - 1 bits\");const i=new c(n);let a=0;for(let t=e.blockSize+s-(e.blockSize+s&e.blockSize-1);o>=t;t+=e.blockSize)e.U(i.subarray(16*a,16*(a+1))),a+=1;return n.splice(0,16*a),e}_(){const t=this;let e=t.B;const n=t.M;e=W.concat(e,[W.v(1,1)]);for(let t=e.length+2;15&t;t++)e.push(0);for(e.push(s.floor(t.D/4294967296)),e.push(0|t.D);e.length;)t.U(e.splice(0,16));return t.reset(),n}V(t,e,n,s){return t>19?t>39?t>59?t>79?void 0:e^n^s:e&n|e&s|n&s:e^n^s:e&n|~e&s}W(t,e){return e<<t|e>>>32-t}U(e){const n=this,r=n.M,o=t(80);for(let t=0;16>t;t++)o[t]=e[t];let i=r[0],c=r[1],a=r[2],f=r[3],l=r[4];for(let t=0;79>=t;t++){16>t||(o[t]=n.W(1,o[t-3]^o[t-8]^o[t-14]^o[t-16]));const e=n.W(5,i)+n.V(t,c,a,f)+l+o[t]+n.P[s.floor(t/20)]|0;l=f,f=a,a=n.W(30,c),c=i,i=e}r[0]=r[0]+i|0,r[1]=r[1]+c|0,r[2]=r[2]+a|0,r[3]=r[3]+f|0,r[4]=r[4]+l|0}},F={importKey:t=>new F.K(K.bytes.A(t)),F(t,e,n,s){if(n=n||1e4,0>s||0>n)throw new r(\"invalid params to pbkdf2\");const o=1+(s>>5)<<2;let i,c,a,f,u;const w=new ArrayBuffer(o),h=new l(w);let p=0;const d=W;for(e=K.bytes.A(e),u=1;(o||1)>p;u++){for(i=c=t.encrypt(d.concat(e,[u])),a=1;n>a;a++)for(c=t.encrypt(c),f=0;f<c.length;f++)i[f]^=c[f];for(a=0;(o||1)>p&&a<i.length;a++)h.setInt32(p,i[a]),p+=4}return w.slice(0,s/8)},K:class{constructor(t){const e=this,n=e.L=E,s=[[],[]];e.O=[new n,new n];const r=e.O[0].blockSize/32;t.length>r&&(t=(new n).update(t)._());for(let e=0;r>e;e++)s[0][e]=909522486^t[e],s[1][e]=1549556828^t[e];e.O[0].update(s[0]),e.O[1].update(s[1]),e.T=new n(e.O[0])}reset(){const t=this;t.T=new t.L(t.O[0]),t.j=!1}update(t){this.j=!0,this.T.update(t)}digest(){const t=this,e=t.T._(),n=new t.L(t.O[1]).update(e)._();return t.reset(),n}encrypt(t){if(this.j)throw new r(\"encrypt on already updated hmac called!\");return this.update(t),this.digest(t)}}},L=typeof h!=b&&typeof h.getRandomValues==z,O=\"Invalid password\",T=\"Invalid signature\",j=\"zipjs-abort-check-password\";function H(t){if(L)return h.getRandomValues(t);throw new r(\"Crypto API not supported\")}const Z=16,N={name:\"PBKDF2\"},q=e.assign({hash:{name:\"HMAC\"}},N),G=e.assign({iterations:1e3,hash:{name:\"SHA-1\"}},N),J=[\"deriveBits\"],Q=[8,12,16],X=[16,24,32],Y=10,$=[0,0,0,0],tt=typeof h!=b,et=tt&&h.subtle,nt=tt&&typeof et!=b,st=K.bytes,rt=class{constructor(t){const e=this;e.H=[[[],[],[],[],[]],[[],[],[],[],[]]],e.H[0][0][0]||e.Z();const n=e.H[0][4],s=e.H[1],o=t.length;let i,c,a,f=1;if(4!==o&&6!==o&&8!==o)throw new r(\"invalid aes key size\");for(e.P=[c=t.slice(0),a=[]],i=o;4*o+28>i;i++){let t=c[i-1];(i%o===0||8===o&&i%o===4)&&(t=n[t>>>24]<<24^n[t>>16&255]<<16^n[t>>8&255]<<8^n[255&t],i%o===0&&(t=t<<8^t>>>24^f<<24,f=f<<1^283*(f>>7))),c[i]=c[i-o]^t}for(let t=0;i;t++,i--){const e=c[3&t?i:i-4];a[t]=4>=i||4>t?e:s[0][n[e>>>24]]^s[1][n[e>>16&255]]^s[2][n[e>>8&255]]^s[3][n[255&e]]}}encrypt(t){return this.N(t,0)}decrypt(t){return this.N(t,1)}Z(){const t=this.H[0],e=this.H[1],n=t[4],s=e[4],r=[],o=[];let i,c,a,f;for(let t=0;256>t;t++)o[(r[t]=t<<1^283*(t>>7))^t]=t;for(let l=i=0;!n[l];l^=c||1,i=o[i]||1){let o=i^i<<1^i<<2^i<<3^i<<4;o=o>>8^255&o^99,n[l]=o,s[o]=l,f=r[a=r[c=r[l]]];let u=16843009*f^65537*a^257*c^16843008*l,w=257*r[o]^16843008*o;for(let n=0;4>n;n++)t[n][l]=w=w<<24^w>>>8,e[n][o]=u=u<<24^u>>>8}for(let n=0;5>n;n++)t[n]=t[n].slice(0),e[n]=e[n].slice(0)}N(t,e){if(4!==t.length)throw new r(\"invalid aes block size\");const n=this.P[e],s=n.length/4-2,o=[0,0,0,0],i=this.H[e],c=i[0],a=i[1],f=i[2],l=i[3],u=i[4];let w,h,p,d=t[0]^n[0],y=t[e?3:1]^n[1],m=t[2]^n[2],g=t[e?1:3]^n[3],S=4;for(let t=0;s>t;t++)w=c[d>>>24]^a[y>>16&255]^f[m>>8&255]^l[255&g]^n[S],h=c[y>>>24]^a[m>>16&255]^f[g>>8&255]^l[255&d]^n[S+1],p=c[m>>>24]^a[g>>16&255]^f[d>>8&255]^l[255&y]^n[S+2],g=c[g>>>24]^a[d>>16&255]^f[y>>8&255]^l[255&m]^n[S+3],S+=4,d=w,y=h,m=p;for(let t=0;4>t;t++)o[e?3&-t:t]=u[d>>>24]<<24^u[y>>16&255]<<16^u[m>>8&255]<<8^u[255&g]^n[S++],w=d,d=y,y=m,m=g,g=w;return o}},ot=class{constructor(t,e){this.G=t,this.J=e,this.X=e}reset(){this.X=this.J}update(t){return this.Y(this.G,t,this.X)}$(t){if(255&~(t>>24))t+=1<<24;else{let e=t>>16&255,n=t>>8&255,s=255&t;255===e?(e=0,255===n?(n=0,255===s?s=0:++s):++n):++e,t=0,t+=e<<16,t+=n<<8,t+=s}return t}et(t){0===(t[0]=this.$(t[0]))&&(t[1]=this.$(t[1]))}Y(t,e,n){let s;if(!(s=e.length))return[];const r=W.m(e);for(let r=0;s>r;r+=4){this.et(n);const s=t.encrypt(n);e[r]^=s[0],e[r+1]^=s[1],e[r+2]^=s[2],e[r+3]^=s[3]}return W.S(e,r)}},it=F.K;let ct=tt&&nt&&typeof et.importKey==z,at=tt&&nt&&typeof et.deriveBits==z;class ft extends d{constructor({password:t,rawPassword:e,encryptionStrength:n,checkPasswordOnly:s}){super({start(){ut(this,t,e,n)},async transform(t,e){const n=this,{password:i,strength:c,nt:a,ready:f}=n;i?(await(async(t,e,n,s)=>{const o=await ht(t,e,n,dt(s,0,Q[e])),i=dt(s,Q[e]);if(o[0]!=i[0]||o[1]!=i[1])throw new r(O)})(n,c,i,dt(t,0,Q[c]+2)),t=dt(t,Q[c]+2),s?e.error(new r(j)):a()):await f;const l=new o(t.length-Y-(t.length-Y)%Z);e.enqueue(wt(n,t,l,0,Y,!0))},async flush(t){const{st:e,ot:n,pending:s,ready:o}=this;if(n&&e){await o;const i=dt(s,0,s.length-Y),c=dt(s,s.length-Y);let a=k;if(i.length){const t=mt(st,i);n.update(t);const s=e.update(t);a=yt(st,s)}const f=dt(yt(st,n.digest()),0,Y);let l=s.length<Y?1:0;for(let t=0;Y>t;t++)l|=f[t]^c[t];if(l)throw new r(T);t.enqueue(a)}}})}}class lt extends d{constructor({password:t,rawPassword:e,encryptionStrength:n}){let s;super({start(){ut(this,t,e,n)},async transform(t,e){const n=this,{password:s,strength:r,nt:i,ready:c}=n;let a=k;s?(a=await(async(t,e,n)=>{const s=H(new o(Q[e]));return V(s,await ht(t,e,n,s))})(n,r,s),i()):await c;const f=new o(a.length+t.length-t.length%Z);f.set(a,0),e.enqueue(wt(n,t,f,a.length,0))},async flush(t){const{st:e,ot:n,pending:r,ready:o}=this;if(n&&e){await o;let i=k;if(r.length){const t=e.update(mt(st,r));n.update(t),i=yt(st,t)}s.signature=yt(st,n.digest()).slice(0,Y),t.enqueue(V(i,s.signature))}}}),s=this}}function ut(t,n,s,r){e.assign(t,{ready:new u(e=>t.nt=e),password:pt(n,s),strength:r-1,pending:k})}function wt(t,e,n,s,r,i){const{st:c,ot:a,pending:f}=t;f.length&&(e=V(f,e));const l=e.length-r;let u;for(n=((t,e)=>{if(e&&e>t.length){const n=t;(t=new o(e)).set(n,0)}return t})(n,s+(l-l%Z)),u=0;l-Z>=u;u+=Z){const t=mt(st,dt(e,u,u+Z));i&&a.update(t);const r=c.update(t);i||a.update(r),n.set(yt(st,r),u+s)}return t.pending=dt(e,u),n}async function ht(n,s,r,i){n.password=null;const c=await(async(t,e,n,s,r)=>{if(!ct)return F.importKey(e);try{return await et.importKey(\"raw\",e,n,!1,r)}catch{return ct=!1,F.importKey(e)}})(0,r,q,0,J),a=await(async(t,e,n)=>{if(!at)return F.F(e,t.salt,G.iterations,n);try{return await et.deriveBits(t,e,n)}catch{return at=!1,F.F(e,t.salt,G.iterations,n)}})(e.assign({salt:i},G),c,8*(2*X[s]+2)),f=new o(a),l=mt(st,dt(f,0,X[s])),u=mt(st,dt(f,X[s],2*X[s])),w=dt(f,2*X[s]);return e.assign(n,{keys:{key:l,it:u,passwordVerification:w},st:new ot(new rt(l),t.from($)),ot:new it(u)}),w}function pt(t,e){return e===v?(t=>{if(typeof w==b){const e=new o((t=unescape(encodeURIComponent(t))).length);for(let n=0;n<e.length;n++)e[n]=t.charCodeAt(n);return e}return(new w).encode(t)})(t):e}function dt(t,e,n){return t.subarray(e,n)}function yt(t,e){return t.C(e)}function mt(t,e){return t.A(e)}class gt extends d{constructor({password:t,rawPassword:e,passwordVerification:n,checkPasswordOnly:s}){super({start(){vt(this,t,e,n)},transform(t,e){const n=this;if(n.password||n.rawPassword){const e=bt(n,t.subarray(0,12));if(n.password=n.rawPassword=null,0!=(e[11]^n.passwordVerification))throw new r(O);t=t.subarray(12)}s?e.error(new r(j)):e.enqueue(bt(n,t))}})}}class St extends d{constructor({password:t,rawPassword:e,passwordVerification:n}){super({start(){vt(this,t,e,n)},transform(t,e){const n=this;let s,r;if(n.password||n.rawPassword){n.password=n.rawPassword=null;const e=H(new o(12));e[11]=n.passwordVerification,s=new o(t.length+e.length),s.set(zt(n,e),0),r=12}else s=new o(t.length),r=0;s.set(zt(n,t),r),e.enqueue(s)}})}}function vt(t,n,s,r){e.assign(t,{password:n,rawPassword:s,passwordVerification:r}),((t,n,s)=>{const r=[305419896,591751049,878082192];if(e.assign(t,{keys:r,ct:new U(r[0]),ft:new U(r[2])}),s)for(let e=0;e<s.length;e++)kt(t,s[e]);else for(let e=0;e<n.length;e++)kt(t,n.charCodeAt(e))})(t,n,s)}function bt(t,e){const n=new o(e.length);for(let s=0;s<e.length;s++)n[s]=Ct(t)^e[s],kt(t,n[s]);return n}function zt(t,e){const n=new o(e.length);for(let s=0;s<e.length;s++)n[s]=Ct(t)^e[s],kt(t,e[s]);return n}function kt(t,e){let[,n]=t.keys;t.ct.append([e]);const r=~t.ct.get();n=It(s.imul(It(n+At(r)),134775813)+1),t.ft.append([n>>>24]);const o=~t.ft.get();t.keys=[r,n,o]}function Ct(t){const e=2|t.keys[2];return At(s.imul(e,1^e)>>>8)}function At(t){return 255&t}function It(t){return 4294967295&t}const xt=new f;function Pt(t){return xt.get(t)}const Mt=\"deflate-raw\";class Bt extends d{constructor(t,{chunkSize:e,CompressionStreamZlib:n,CompressionStream:s}){super({});const{compressed:r,encrypted:o,useCompressionStream:i,zipCrypto:c,signed:a,level:f,deflate64:u,format:w,compressionMethod:h}=t,p=this;let d,y,m,g=super.readable;const S=w&&Pt(w),v=a&&r&&!u&&!S&&(!o||c)&&!(!i||!s);o&&!c||!a||v||(d=new _,g=Kt(g,d)),r&&(S?g=Et(g,Vt(S.CompressionStream,w,{level:f,chunkSize:e,compressionMethod:h})):v?(m=new Dt,g=Et(g,new s(\"gzip\")),g=Kt(g,m)):g=Wt(g,i,{level:f,chunkSize:e},s,n)),o&&(c?g=Kt(g,new St(t)):(y=new lt(t),g=Kt(g,y))),_t(p,g,()=>{let t;o&&!c&&(t=y.signature),o&&!c||!a||(t=v?m.signature:new l(d.value.buffer).getUint32(0)),p.signature=t})}}class Dt extends d{constructor(){let t,e=10,n=new o(0);super({transform(t,r){if(e){const n=s.min(e,t.length);if(e-=n,!(t=t.subarray(n)).length)return}const o=n.length+t.length;if(8>=o)return void(n=V(n,t));const i=o-8,c=s.min(i,n.length);r.enqueue(V(n.subarray(0,c),t.subarray(0,i-c))),n=V(n.subarray(c),t.subarray(i-c))},flush(){const e=new l((s=n).buffer,s.byteOffset,s.byteLength);var s;t.signature=e.getUint32(0,!0),t.uncompressedSize=e.getUint32(4,!0)}}),t=this}}class Rt extends d{constructor(t,{chunkSize:e,DecompressionStreamZlib:n,DecompressionStream:s}){super({});const{zipCrypto:o,encrypted:i,signed:c,signature:a,compressed:f,useCompressionStream:u,deflate64:w,format:h,compressionMethod:p,rawBitFlag:d,outputSize:m}=t;let g,S,v=super.readable;if(i&&(o?v=Kt(v,new gt(t)):(S=new ft(t),v=Kt(v,S))),f){const t=h&&Pt(h);v=t?Et(v,Vt(t.DecompressionStream,h,{chunkSize:e,compressionMethod:p,rawBitFlag:d,uncompressedSize:m})):Wt(v,u,{chunkSize:e,deflate64:w},s,n),v=(t=>{const e=t.getReader();return new y({async pull(t){let n;try{n=await e.read()}catch(t){if(t&&t.message)throw t;const e=new r(\"Invalid compressed data\");throw e.cause=t,e}const{value:s,done:o}=n;o?t.close():t.enqueue(s)},cancel:t=>e.cancel(t)})})(v)}i&&!o||!c||(g=new _,v=Kt(v,g)),_t(this,v,()=>{if((!i||o)&&c){const t=new l(g.value.buffer);if(a!=t.getUint32(0,!1))throw new r(T)}})}}const Ut=new f;function _t(t,n,s){n=Kt(n,new d({flush:s})),e.defineProperty(t,\"readable\",{get:()=>n})}function Vt(t,e,n){if(!t)throw new r(\"Compression method not supported\");return new t(e,n)}function Wt(t,e,n,s,r){const o=e&&s?s:r||s,i=n.deflate64?\"deflate64-raw\":Mt;let c;try{c=new o(i,n)}catch(t){if(!e||!r||o==r)throw t;c=new r(i,n)}return Et(t,c)}function Kt(t,e){return(t=>{if(t instanceof y)return t;const e=t.getReader();return new y({async pull(t){const{value:n,done:s}=await e.read();s?t.close():t.enqueue(n)},cancel:t=>e.cancel(t)})})(t).pipeThrough(e)}function Et(t,e){const n=e.writable.getWriter(),s=t.getReader();return(async()=>{try{for(;;){await n.ready;const t=await s.read();if(t.done){await n.close();break}await n.write(t.value)}}catch(t){await(async(t,e)=>{try{await t.abort(e)}catch{}})(n,t),await(async(t,e)=>{try{await t.cancel(e)}catch{}})(s,t)}})(),e.readable}const Ft=\"data\",Lt=\"close\",Ot=\"deflate\";class Tt extends d{constructor(t,n){super({});const s=this,{codecType:o}=t;let i;o.startsWith(Ot)?i=Bt:o.startsWith(\"inflate\")&&(i=Rt),s.outputSize=0;let c=0;const a=new i(t,n),f=super.readable,l=new d({transform(t,e){t&&t.length&&(c+=t.length,e.enqueue(t))},flush(){e.assign(s,{inputSize:c})}}),u=new d({transform(e,n){if(e&&e.length&&(n.enqueue(e),s.outputSize+=e.length,t.outputSize!==v&&s.outputSize>t.outputSize))throw new r(\"Invalid uncompressed size\")},flush(){const{signature:t}=a;e.assign(s,{signature:t,inputSize:c})}});e.defineProperty(s,\"readable\",{get:()=>f.pipeThrough(l).pipeThrough(a).pipeThrough(u)})}}class jt extends d{constructor(t){const e=[];let s=0;function r(){const n=new o(t);let r=0;for(;t>r;){const s=e[0],o=t-r;s.length>o?(n.set(s.subarray(0,o),r),e[0]=s.subarray(o),r+=o):(n.set(s,r),r+=s.length,e.shift())}return s-=t,n}n.isFinite(t)&&t>=1||(t=65536),super({transform(n,o){for(e.push(n),s+=n.length;s>t;)o.enqueue(r())},flush(t){s&&t.enqueue(((t,e)=>{const n=new o(e);let s=0;for(const e of t)n.set(e,s),s+=e.length;return n})(e,s))}})}}let Ht=2;try{typeof navigator!=b&&navigator.hardwareConcurrency&&(Ht=navigator.hardwareConcurrency)}catch{}const Zt=new f,Nt=new f;let qt,Gt,Jt,Qt,Xt,Yt=0;async function $t(t){let e,o;try{const{options:i,config:c}=t;if(i.format&&await(async(t,e)=>{!xt.has(t)&&e&&((t,e)=>{const{CompressionStream:n,DecompressionStream:s}=e;if(typeof n!=z&&typeof s!=z)throw new r(\"Invalid codec module\");xt.set(t,{CompressionStream:n,DecompressionStream:s})})(t,await(import(e)))})(i.format,i.codecURI),c.CompressionStream=self.CompressionStream,c.DecompressionStream=self.DecompressionStream,i.compressed&&!i.format)if(i.useCompressionStream){if(!(t=>{if(!t)return!1;let e=Ut.get(t);if(e===v){try{new t(Mt),e=!0}catch{e=!1}Ut.set(t,e)}return e})(i.codecType.startsWith(Ot)?c.CompressionStream:c.DecompressionStream))try{await self.initModule(t.config)}catch{}}else try{await self.initModule(t.config)}catch{i.useCompressionStream=!0}const a={highWaterMark:1},f=t.readable||new y({async pull(t){const e=new u(t=>Zt.set(Yt,t));te({type:\"pull\",messageId:Yt}),Yt=(Yt+1)%n.MAX_SAFE_INTEGER;const{value:s,done:r}=await e;t.enqueue(s),r&&t.close()}},a);o=t.writable||new m({async write(t){let e;const s=new u(t=>e=t);Nt.set(Yt,e),te({type:Ft,value:t,messageId:Yt}),Yt=(Yt+1)%n.MAX_SAFE_INTEGER,await s}},a),e=new Tt(i,c),qt=new AbortController;const{signal:l}=qt;await f.pipeThrough(e).pipeThrough(new jt((t=>s.max(t.chunkSize,64))(c))).pipeTo(o,{signal:l,preventClose:!0,preventAbort:!0}),await o.getWriter().close();const{signature:w,inputSize:h,outputSize:p}=e;te({type:Lt,result:{signature:w,inputSize:h,outputSize:p}})}catch(t){if(t.outputSize=e?e.outputSize:0,o&&!o.locked)try{await o.getWriter().close()}catch{}ee(t)}}function te(t){const{value:e}=t;if(e)if(e.length)try{t.value=(n=e,n.byteOffset||n.byteLength!=n.buffer.byteLength?new o(n):n).buffer,p(t,[t.value])}catch{p(t)}else p(t);else p(t);var n}function ee(t=new r(\"Unknown error\")){const{message:e,stack:n,code:s,name:o,outputSize:i}=t;p({error:{message:e,stack:n,code:s,name:o,outputSize:i}})}function ne(t,e,n={}){const i=\"number\"==typeof n.level?n.level:-1,c=\"number\"==typeof n.outBuffer?n.outBuffer:65536,a=\"number\"==typeof n.inBufferSize?n.inBufferSize:65536;return new d({start(){try{let n;if(this.lt=Jt(c),this.in=Jt(a),this.inBufferSize=a,!this.lt||!this.in)throw new r(\"allocation failed\");if(this.ut=new o(c),t?(this.wt=Gt.deflate_process,this.ht=Gt.deflate_last_consumed,this.yt=Gt.deflate_end,this.gt=Gt.deflate_new(),n=\"gzip\"===e?Gt.deflate_init_gzip(this.gt,i):\"deflate-raw\"===e?Gt.deflate_init_raw(this.gt,i):Gt.deflate_init(this.gt,i)):\"deflate64-raw\"===e?(this.wt=Gt.inflate9_process,this.ht=Gt.inflate9_last_consumed,this.yt=Gt.inflate9_end,this.gt=Gt.inflate9_new(),n=Gt.inflate9_init_raw(this.gt)):(this.wt=Gt.inflate_process,this.ht=Gt.inflate_last_consumed,this.yt=Gt.inflate_end,this.gt=Gt.inflate_new(),n=\"deflate-raw\"===e?Gt.inflate_init_raw(this.gt):\"gzip\"===e?Gt.inflate_init_gzip(this.gt):Gt.inflate_init(this.gt)),0!==n)throw new r(\"init failed:\"+n)}catch(t){throw f(this),t}},transform(e,n){try{const i=e,a=new o(Xt.buffer),f=this.wt,l=this.ht,u=this.lt,w=this.ut;let h=0;for(;h<i.length;){const e=s.min(i.length-h,32768);if((!this.in||this.inBufferSize<e)&&(this.in&&Qt&&(Qt(this.in),this.in=0),this.in=Jt(e),this.inBufferSize=e,!this.in))throw new r(\"allocation failed\");a.set(i.subarray(h,h+e),this.in);const o=f(this.gt,this.in,e,u,c,0),p=16777215&o;if(p&&(w.set(a.subarray(u,u+p),0),n.enqueue(w.slice(0,p))),!t){const t=o>>24&255,e=128&t?t-256:t;if(0>e)throw new r(\"process error:\"+e)}const d=l(this.gt);if(0===d)break;h+=d}}catch(t){f(this),n.error(t)}},flush(e){try{const n=new o(Xt.buffer),s=this.wt,i=this.lt,a=this.ut;for(;;){const o=s(this.gt,0,0,i,c,4),f=16777215&o,l=o>>24&255;if(!t){const t=128&l?l-256:l;if(0>t)throw new r(\"process error:\"+t)}if(f&&(a.set(n.subarray(i,i+f),0),e.enqueue(a.slice(0,f))),1===l||0===f)break}}catch(t){e.error(t)}finally{const t=f(this);0!==t&&e.error(new r(\"end error:\"+t))}},cancel(){f(this)}});function f(t){let e=0;return t.gt&&t.yt&&(e=t.yt(t.gt)),t.gt=0,t.in&&Qt&&Qt(t.in),t.in=0,t.lt&&Qt&&Qt(t.lt),t.lt=0,e}}addEventListener(\"message\",({data:t})=>{const{type:e,messageId:n,value:s,done:r}=t;try{if(\"start\"==e&&$t(t),e==Ft){const t=Zt.get(n);Zt.delete(n),t({value:s||new o,done:r})}if(\"ack\"==e){const t=Nt.get(n);Nt.delete(n),t()}e==Lt&&qt.abort()}catch(t){ee(t)}}),p({type:\"ready\"});class se{constructor(t=\"deflate\",e){return ne(!0,t,e)}}class re{constructor(t=\"deflate\",e){return ne(!1,t,e)}}se.St=!0,re.St=!0;let oe=!1;self.initModule=async t=>{try{const e=await(async(t,{baseURI:e})=>{if(!oe){let n,s;try{try{s=new URL(t,e)}catch{}const r=await fetch(s);n=await r.arrayBuffer()}catch(e){if(!t.startsWith(\"data:application/wasm;base64,\"))throw e;n=(t=>{const e=t.split(\",\")[1],n=atob(e),s=n.length,r=new o(s);for(let t=0;s>t;++t)r[t]=n.charCodeAt(t);return r.buffer})(t)}(t=>{if(Gt=t,({malloc:Jt,free:Qt,memory:Xt}=Gt),\"function\"!=typeof Jt||\"function\"!=typeof Qt||!Xt)throw Gt=Jt=Qt=Xt=null,new r(\"Invalid WASM module\")})((await WebAssembly.instantiate(n)).instance.exports),oe=!0}})(t.wasmURI,t);return t.CompressionStreamZlib=se,t.DecompressionStreamZlib=re,e}catch{}}});\n"], { type: t });
			return URL.createObjectURL(e);
		}
		return "data:" + t + ",(t%3D%3E%7B%22function%22%3D%3Dtypeof%20define%26%26define.amd%3Fdefine(t)%3At()%7D)(function()%7B%22use%20strict%22%3Bconst%7BArray%3At%2CObject%3Ae%2CNumber%3An%2CMath%3As%2CError%3Ar%2CUint8Array%3Ao%2CUint16Array%3Ai%2CUint32Array%3Ac%2CInt32Array%3Aa%2CMap%3Af%2CDataView%3Al%2CPromise%3Au%2CTextEncoder%3Aw%2Ccrypto%3Ah%2CpostMessage%3Ap%2CTransformStream%3Ad%2CReadableStream%3Ay%2CWritableStream%3Am%2CCompressionStream%3Ag%2CDecompressionStream%3AS%7D%3Dself%2Cv%3Dvoid%200%2Cb%3D%22undefined%22%2Cz%3D%22function%22%2Ck%3Dnew%20o%2CC%3D%5B%5B%5D%2C%5B%5D%2C%5B%5D%2C%5B%5D%2C%5B%5D%2C%5B%5D%2C%5B%5D%2C%5B%5D%5D%3Bfor(let%20t%3D0%3B256%3Et%3Bt%2B%2B)%7Blet%20e%3Dt%3Bfor(let%20t%3D0%3B8%3Et%3Bt%2B%2B)e%3D1%26e%3Fe%3E%3E%3E1%5E3988292384%3Ae%3E%3E%3E1%3BC%5B0%5D%5Bt%5D%3De%7Dfor(let%20t%3D0%3B256%3Et%3Bt%2B%2B)for(let%20e%3D1%3B8%3Ee%3Be%2B%2B)%7Bconst%20n%3DC%5Be-1%5D%5Bt%5D%3BC%5Be%5D%5Bt%5D%3Dn%3E%3E%3E8%5EC%5B0%5D%5B255%26n%5D%7Dconst%5BA%2CI%2Cx%2CP%2CM%2CB%2CD%2CR%5D%3DC%3Bclass%20U%7Bconstructor(t)%7Bthis.o%3Dt%7C%7C-1%7Dappend(t)%7Blet%20e%3D0%7Cthis.o%3Bconst%20n%3D0%7Ct.length%3Blet%20s%3D0%3Bif(n%3E%3D8%26%26t.buffer)%7Bconst%20r%3Dnew%20l(t.buffer%2Ct.byteOffset%2Cn)%2Co%3Dn-8%3Bfor(%3Bo%3E%3Ds%3Bs%2B%3D8)%7Bconst%20t%3De%5Er.getInt32(s%2C!0)%2Cn%3Dr.getInt32(s%2B4%2C!0)%3Be%3DR%5B255%26t%5D%5ED%5Bt%3E%3E%3E8%26255%5D%5EB%5Bt%3E%3E%3E16%26255%5D%5EM%5Bt%3E%3E%3E24%26255%5D%5EP%5B255%26n%5D%5Ex%5Bn%3E%3E%3E8%26255%5D%5EI%5Bn%3E%3E%3E16%26255%5D%5EA%5Bn%3E%3E%3E24%26255%5D%7D%7Dfor(%3Bn%3Es%3Bs%2B%2B)e%3De%3E%3E%3E8%5EA%5B255%26(e%5Et%5Bs%5D)%5D%3Bthis.o%3De%7Dget()%7Breturn~this.o%7D%7Dclass%20_%20extends%20d%7Bconstructor()%7Blet%20t%3Bconst%20e%3Dnew%20U%3Bsuper(%7Btransform(t%2Cn)%7Be.append(t)%2Cn.enqueue(t)%7D%2Cflush()%7Bconst%20n%3Dnew%20o(4)%3Bnew%20l(n.buffer).setUint32(0%2Ce.get())%2Ct.value%3Dn%7D%7D)%2Ct%3Dthis%7D%7Dfunction%20V(t%2Ce)%7Bconst%20n%3Dnew%20o(t.length%2Be.length)%3Breturn%20n.set(t)%2Cn.set(e%2Ct.length)%2Cn%7Dconst%20W%3D%7Bconcat(t%2Ce)%7Bif(0%3D%3D%3Dt.length%7C%7C0%3D%3D%3De.length)return%20t.concat(e)%3Bconst%20n%3Dt%5Bt.length-1%5D%2Cs%3DW.l(n)%3Breturn%2032%3D%3D%3Ds%3Ft.concat(e)%3AW.h(e%2Cs%2C0%7Cn%2Ct.slice(0%2Ct.length-1))%7D%2Cm(t)%7Bconst%20e%3Dt.length%3Bif(0%3D%3D%3De)return%200%3Bconst%20n%3Dt%5Be-1%5D%3Breturn%2032*(e-1)%2BW.l(n)%7D%2CS(t%2Ce)%7Bif(32*t.length%3Ce)return%20t%3Bconst%20n%3D(t%3Dt.slice(0%2Cs.ceil(e%2F32))).length%3Breturn%20e%26%3D31%2Cn%3E0%26%26e%26%26(t%5Bn-1%5D%3DW.v(e%2Ct%5Bn-1%5D%262147483648%3E%3Ee-1%2C1))%2Ct%7D%2Cv%3A(t%2Ce%2Cn)%3D%3E32%3D%3D%3Dt%3Fe%3A(n%3F0%7Ce%3Ae%3C%3C32-t)%2B1099511627776*t%2Cl%3At%3D%3Es.round(t%2F1099511627776)%7C%7C32%2Ch(t%2Ce%2Cn%2Cs)%7Bfor(void%200%3D%3D%3Ds%26%26(s%3D%5B%5D)%3Be%3E%3D32%3Be-%3D32)s.push(n)%2Cn%3D0%3Bif(0%3D%3D%3De)return%20s.concat(t)%3Bfor(let%20r%3D0%3Br%3Ct.length%3Br%2B%2B)s.push(n%7Ct%5Br%5D%3E%3E%3Ee)%2Cn%3Dt%5Br%5D%3C%3C32-e%3Bconst%20r%3Dt.length%3Ft%5Bt.length-1%5D%3A0%2Co%3DW.l(r)%3Breturn%20s.push(W.v(e%2Bo%2631%2Ce%2Bo%3E32%3Fn%3As.pop()%2C1))%2Cs%7D%7D%2CK%3D%7Bbytes%3A%7BC(t)%7Bconst%20e%3DW.m(t)%2F8%2Cn%3Dnew%20o(e)%3Blet%20s%3Bfor(let%20r%3D0%3Be%3Er%3Br%2B%2B)3%26r%7C%7C(s%3Dt%5Br%2F4%5D)%2Cn%5Br%5D%3Ds%3E%3E%3E24%2Cs%3C%3C%3D8%3Breturn%20n%7D%2CA(t)%7Bconst%20e%3D%5B%5D%3Blet%20n%2Cs%3D0%3Bfor(n%3D0%3Bn%3Ct.length%3Bn%2B%2B)s%3Ds%3C%3C8%7Ct%5Bn%5D%2C3%26~n%7C%7C(e.push(s)%2Cs%3D0)%3Breturn%203%26n%26%26e.push(W.v(8*(3%26n)%2Cs))%2Ce%7D%7D%7D%2CE%3Dclass%7Bconstructor(t)%7Bconst%20e%3Dthis%3Be.blockSize%3D512%2Ce.I%3D%5B1732584193%2C4023233417%2C2562383102%2C271733878%2C3285377520%5D%2Ce.P%3D%5B1518500249%2C1859775393%2C2400959708%2C3395469782%5D%2Ct%3F(e.M%3Dt.M.slice(0)%2Ce.B%3Dt.B.slice(0)%2Ce.D%3Dt.D)%3Ae.reset()%7Dreset()%7Bconst%20t%3Dthis%3Breturn%20t.M%3Dt.I.slice(0)%2Ct.B%3D%5B%5D%2Ct.D%3D0%2Ct%7Dupdate(t)%7Bconst%20e%3Dthis%3B%22string%22%3D%3Dtypeof%20t%26%26(t%3DK.R.A(t))%3Bconst%20n%3De.B%3DW.concat(e.B%2Ct)%2Cs%3De.D%2Co%3De.D%3Ds%2BW.m(t)%3Bif(o%3E9007199254740991)throw%20new%20r(%22Cannot%20hash%20more%20than%202%5E53%20-%201%20bits%22)%3Bconst%20i%3Dnew%20c(n)%3Blet%20a%3D0%3Bfor(let%20t%3De.blockSize%2Bs-(e.blockSize%2Bs%26e.blockSize-1)%3Bo%3E%3Dt%3Bt%2B%3De.blockSize)e.U(i.subarray(16*a%2C16*(a%2B1)))%2Ca%2B%3D1%3Breturn%20n.splice(0%2C16*a)%2Ce%7D_()%7Bconst%20t%3Dthis%3Blet%20e%3Dt.B%3Bconst%20n%3Dt.M%3Be%3DW.concat(e%2C%5BW.v(1%2C1)%5D)%3Bfor(let%20t%3De.length%2B2%3B15%26t%3Bt%2B%2B)e.push(0)%3Bfor(e.push(s.floor(t.D%2F4294967296))%2Ce.push(0%7Ct.D)%3Be.length%3B)t.U(e.splice(0%2C16))%3Breturn%20t.reset()%2Cn%7DV(t%2Ce%2Cn%2Cs)%7Breturn%20t%3E19%3Ft%3E39%3Ft%3E59%3Ft%3E79%3Fvoid%200%3Ae%5En%5Es%3Ae%26n%7Ce%26s%7Cn%26s%3Ae%5En%5Es%3Ae%26n%7C~e%26s%7DW(t%2Ce)%7Breturn%20e%3C%3Ct%7Ce%3E%3E%3E32-t%7DU(e)%7Bconst%20n%3Dthis%2Cr%3Dn.M%2Co%3Dt(80)%3Bfor(let%20t%3D0%3B16%3Et%3Bt%2B%2B)o%5Bt%5D%3De%5Bt%5D%3Blet%20i%3Dr%5B0%5D%2Cc%3Dr%5B1%5D%2Ca%3Dr%5B2%5D%2Cf%3Dr%5B3%5D%2Cl%3Dr%5B4%5D%3Bfor(let%20t%3D0%3B79%3E%3Dt%3Bt%2B%2B)%7B16%3Et%7C%7C(o%5Bt%5D%3Dn.W(1%2Co%5Bt-3%5D%5Eo%5Bt-8%5D%5Eo%5Bt-14%5D%5Eo%5Bt-16%5D))%3Bconst%20e%3Dn.W(5%2Ci)%2Bn.V(t%2Cc%2Ca%2Cf)%2Bl%2Bo%5Bt%5D%2Bn.P%5Bs.floor(t%2F20)%5D%7C0%3Bl%3Df%2Cf%3Da%2Ca%3Dn.W(30%2Cc)%2Cc%3Di%2Ci%3De%7Dr%5B0%5D%3Dr%5B0%5D%2Bi%7C0%2Cr%5B1%5D%3Dr%5B1%5D%2Bc%7C0%2Cr%5B2%5D%3Dr%5B2%5D%2Ba%7C0%2Cr%5B3%5D%3Dr%5B3%5D%2Bf%7C0%2Cr%5B4%5D%3Dr%5B4%5D%2Bl%7C0%7D%7D%2CF%3D%7BimportKey%3At%3D%3Enew%20F.K(K.bytes.A(t))%2CF(t%2Ce%2Cn%2Cs)%7Bif(n%3Dn%7C%7C1e4%2C0%3Es%7C%7C0%3En)throw%20new%20r(%22invalid%20params%20to%20pbkdf2%22)%3Bconst%20o%3D1%2B(s%3E%3E5)%3C%3C2%3Blet%20i%2Cc%2Ca%2Cf%2Cu%3Bconst%20w%3Dnew%20ArrayBuffer(o)%2Ch%3Dnew%20l(w)%3Blet%20p%3D0%3Bconst%20d%3DW%3Bfor(e%3DK.bytes.A(e)%2Cu%3D1%3B(o%7C%7C1)%3Ep%3Bu%2B%2B)%7Bfor(i%3Dc%3Dt.encrypt(d.concat(e%2C%5Bu%5D))%2Ca%3D1%3Bn%3Ea%3Ba%2B%2B)for(c%3Dt.encrypt(c)%2Cf%3D0%3Bf%3Cc.length%3Bf%2B%2B)i%5Bf%5D%5E%3Dc%5Bf%5D%3Bfor(a%3D0%3B(o%7C%7C1)%3Ep%26%26a%3Ci.length%3Ba%2B%2B)h.setInt32(p%2Ci%5Ba%5D)%2Cp%2B%3D4%7Dreturn%20w.slice(0%2Cs%2F8)%7D%2CK%3Aclass%7Bconstructor(t)%7Bconst%20e%3Dthis%2Cn%3De.L%3DE%2Cs%3D%5B%5B%5D%2C%5B%5D%5D%3Be.O%3D%5Bnew%20n%2Cnew%20n%5D%3Bconst%20r%3De.O%5B0%5D.blockSize%2F32%3Bt.length%3Er%26%26(t%3D(new%20n).update(t)._())%3Bfor(let%20e%3D0%3Br%3Ee%3Be%2B%2B)s%5B0%5D%5Be%5D%3D909522486%5Et%5Be%5D%2Cs%5B1%5D%5Be%5D%3D1549556828%5Et%5Be%5D%3Be.O%5B0%5D.update(s%5B0%5D)%2Ce.O%5B1%5D.update(s%5B1%5D)%2Ce.T%3Dnew%20n(e.O%5B0%5D)%7Dreset()%7Bconst%20t%3Dthis%3Bt.T%3Dnew%20t.L(t.O%5B0%5D)%2Ct.j%3D!1%7Dupdate(t)%7Bthis.j%3D!0%2Cthis.T.update(t)%7Ddigest()%7Bconst%20t%3Dthis%2Ce%3Dt.T._()%2Cn%3Dnew%20t.L(t.O%5B1%5D).update(e)._()%3Breturn%20t.reset()%2Cn%7Dencrypt(t)%7Bif(this.j)throw%20new%20r(%22encrypt%20on%20already%20updated%20hmac%20called!%22)%3Breturn%20this.update(t)%2Cthis.digest(t)%7D%7D%7D%2CL%3Dtypeof%20h!%3Db%26%26typeof%20h.getRandomValues%3D%3Dz%2CO%3D%22Invalid%20password%22%2CT%3D%22Invalid%20signature%22%2Cj%3D%22zipjs-abort-check-password%22%3Bfunction%20H(t)%7Bif(L)return%20h.getRandomValues(t)%3Bthrow%20new%20r(%22Crypto%20API%20not%20supported%22)%7Dconst%20Z%3D16%2CN%3D%7Bname%3A%22PBKDF2%22%7D%2Cq%3De.assign(%7Bhash%3A%7Bname%3A%22HMAC%22%7D%7D%2CN)%2CG%3De.assign(%7Biterations%3A1e3%2Chash%3A%7Bname%3A%22SHA-1%22%7D%7D%2CN)%2CJ%3D%5B%22deriveBits%22%5D%2CQ%3D%5B8%2C12%2C16%5D%2CX%3D%5B16%2C24%2C32%5D%2CY%3D10%2C%24%3D%5B0%2C0%2C0%2C0%5D%2Ctt%3Dtypeof%20h!%3Db%2Cet%3Dtt%26%26h.subtle%2Cnt%3Dtt%26%26typeof%20et!%3Db%2Cst%3DK.bytes%2Crt%3Dclass%7Bconstructor(t)%7Bconst%20e%3Dthis%3Be.H%3D%5B%5B%5B%5D%2C%5B%5D%2C%5B%5D%2C%5B%5D%2C%5B%5D%5D%2C%5B%5B%5D%2C%5B%5D%2C%5B%5D%2C%5B%5D%2C%5B%5D%5D%5D%2Ce.H%5B0%5D%5B0%5D%5B0%5D%7C%7Ce.Z()%3Bconst%20n%3De.H%5B0%5D%5B4%5D%2Cs%3De.H%5B1%5D%2Co%3Dt.length%3Blet%20i%2Cc%2Ca%2Cf%3D1%3Bif(4!%3D%3Do%26%266!%3D%3Do%26%268!%3D%3Do)throw%20new%20r(%22invalid%20aes%20key%20size%22)%3Bfor(e.P%3D%5Bc%3Dt.slice(0)%2Ca%3D%5B%5D%5D%2Ci%3Do%3B4*o%2B28%3Ei%3Bi%2B%2B)%7Blet%20t%3Dc%5Bi-1%5D%3B(i%25o%3D%3D%3D0%7C%7C8%3D%3D%3Do%26%26i%25o%3D%3D%3D4)%26%26(t%3Dn%5Bt%3E%3E%3E24%5D%3C%3C24%5En%5Bt%3E%3E16%26255%5D%3C%3C16%5En%5Bt%3E%3E8%26255%5D%3C%3C8%5En%5B255%26t%5D%2Ci%25o%3D%3D%3D0%26%26(t%3Dt%3C%3C8%5Et%3E%3E%3E24%5Ef%3C%3C24%2Cf%3Df%3C%3C1%5E283*(f%3E%3E7)))%2Cc%5Bi%5D%3Dc%5Bi-o%5D%5Et%7Dfor(let%20t%3D0%3Bi%3Bt%2B%2B%2Ci--)%7Bconst%20e%3Dc%5B3%26t%3Fi%3Ai-4%5D%3Ba%5Bt%5D%3D4%3E%3Di%7C%7C4%3Et%3Fe%3As%5B0%5D%5Bn%5Be%3E%3E%3E24%5D%5D%5Es%5B1%5D%5Bn%5Be%3E%3E16%26255%5D%5D%5Es%5B2%5D%5Bn%5Be%3E%3E8%26255%5D%5D%5Es%5B3%5D%5Bn%5B255%26e%5D%5D%7D%7Dencrypt(t)%7Breturn%20this.N(t%2C0)%7Ddecrypt(t)%7Breturn%20this.N(t%2C1)%7DZ()%7Bconst%20t%3Dthis.H%5B0%5D%2Ce%3Dthis.H%5B1%5D%2Cn%3Dt%5B4%5D%2Cs%3De%5B4%5D%2Cr%3D%5B%5D%2Co%3D%5B%5D%3Blet%20i%2Cc%2Ca%2Cf%3Bfor(let%20t%3D0%3B256%3Et%3Bt%2B%2B)o%5B(r%5Bt%5D%3Dt%3C%3C1%5E283*(t%3E%3E7))%5Et%5D%3Dt%3Bfor(let%20l%3Di%3D0%3B!n%5Bl%5D%3Bl%5E%3Dc%7C%7C1%2Ci%3Do%5Bi%5D%7C%7C1)%7Blet%20o%3Di%5Ei%3C%3C1%5Ei%3C%3C2%5Ei%3C%3C3%5Ei%3C%3C4%3Bo%3Do%3E%3E8%5E255%26o%5E99%2Cn%5Bl%5D%3Do%2Cs%5Bo%5D%3Dl%2Cf%3Dr%5Ba%3Dr%5Bc%3Dr%5Bl%5D%5D%5D%3Blet%20u%3D16843009*f%5E65537*a%5E257*c%5E16843008*l%2Cw%3D257*r%5Bo%5D%5E16843008*o%3Bfor(let%20n%3D0%3B4%3En%3Bn%2B%2B)t%5Bn%5D%5Bl%5D%3Dw%3Dw%3C%3C24%5Ew%3E%3E%3E8%2Ce%5Bn%5D%5Bo%5D%3Du%3Du%3C%3C24%5Eu%3E%3E%3E8%7Dfor(let%20n%3D0%3B5%3En%3Bn%2B%2B)t%5Bn%5D%3Dt%5Bn%5D.slice(0)%2Ce%5Bn%5D%3De%5Bn%5D.slice(0)%7DN(t%2Ce)%7Bif(4!%3D%3Dt.length)throw%20new%20r(%22invalid%20aes%20block%20size%22)%3Bconst%20n%3Dthis.P%5Be%5D%2Cs%3Dn.length%2F4-2%2Co%3D%5B0%2C0%2C0%2C0%5D%2Ci%3Dthis.H%5Be%5D%2Cc%3Di%5B0%5D%2Ca%3Di%5B1%5D%2Cf%3Di%5B2%5D%2Cl%3Di%5B3%5D%2Cu%3Di%5B4%5D%3Blet%20w%2Ch%2Cp%2Cd%3Dt%5B0%5D%5En%5B0%5D%2Cy%3Dt%5Be%3F3%3A1%5D%5En%5B1%5D%2Cm%3Dt%5B2%5D%5En%5B2%5D%2Cg%3Dt%5Be%3F1%3A3%5D%5En%5B3%5D%2CS%3D4%3Bfor(let%20t%3D0%3Bs%3Et%3Bt%2B%2B)w%3Dc%5Bd%3E%3E%3E24%5D%5Ea%5By%3E%3E16%26255%5D%5Ef%5Bm%3E%3E8%26255%5D%5El%5B255%26g%5D%5En%5BS%5D%2Ch%3Dc%5By%3E%3E%3E24%5D%5Ea%5Bm%3E%3E16%26255%5D%5Ef%5Bg%3E%3E8%26255%5D%5El%5B255%26d%5D%5En%5BS%2B1%5D%2Cp%3Dc%5Bm%3E%3E%3E24%5D%5Ea%5Bg%3E%3E16%26255%5D%5Ef%5Bd%3E%3E8%26255%5D%5El%5B255%26y%5D%5En%5BS%2B2%5D%2Cg%3Dc%5Bg%3E%3E%3E24%5D%5Ea%5Bd%3E%3E16%26255%5D%5Ef%5By%3E%3E8%26255%5D%5El%5B255%26m%5D%5En%5BS%2B3%5D%2CS%2B%3D4%2Cd%3Dw%2Cy%3Dh%2Cm%3Dp%3Bfor(let%20t%3D0%3B4%3Et%3Bt%2B%2B)o%5Be%3F3%26-t%3At%5D%3Du%5Bd%3E%3E%3E24%5D%3C%3C24%5Eu%5By%3E%3E16%26255%5D%3C%3C16%5Eu%5Bm%3E%3E8%26255%5D%3C%3C8%5Eu%5B255%26g%5D%5En%5BS%2B%2B%5D%2Cw%3Dd%2Cd%3Dy%2Cy%3Dm%2Cm%3Dg%2Cg%3Dw%3Breturn%20o%7D%7D%2Cot%3Dclass%7Bconstructor(t%2Ce)%7Bthis.G%3Dt%2Cthis.J%3De%2Cthis.X%3De%7Dreset()%7Bthis.X%3Dthis.J%7Dupdate(t)%7Breturn%20this.Y(this.G%2Ct%2Cthis.X)%7D%24(t)%7Bif(255%26~(t%3E%3E24))t%2B%3D1%3C%3C24%3Belse%7Blet%20e%3Dt%3E%3E16%26255%2Cn%3Dt%3E%3E8%26255%2Cs%3D255%26t%3B255%3D%3D%3De%3F(e%3D0%2C255%3D%3D%3Dn%3F(n%3D0%2C255%3D%3D%3Ds%3Fs%3D0%3A%2B%2Bs)%3A%2B%2Bn)%3A%2B%2Be%2Ct%3D0%2Ct%2B%3De%3C%3C16%2Ct%2B%3Dn%3C%3C8%2Ct%2B%3Ds%7Dreturn%20t%7Det(t)%7B0%3D%3D%3D(t%5B0%5D%3Dthis.%24(t%5B0%5D))%26%26(t%5B1%5D%3Dthis.%24(t%5B1%5D))%7DY(t%2Ce%2Cn)%7Blet%20s%3Bif(!(s%3De.length))return%5B%5D%3Bconst%20r%3DW.m(e)%3Bfor(let%20r%3D0%3Bs%3Er%3Br%2B%3D4)%7Bthis.et(n)%3Bconst%20s%3Dt.encrypt(n)%3Be%5Br%5D%5E%3Ds%5B0%5D%2Ce%5Br%2B1%5D%5E%3Ds%5B1%5D%2Ce%5Br%2B2%5D%5E%3Ds%5B2%5D%2Ce%5Br%2B3%5D%5E%3Ds%5B3%5D%7Dreturn%20W.S(e%2Cr)%7D%7D%2Cit%3DF.K%3Blet%20ct%3Dtt%26%26nt%26%26typeof%20et.importKey%3D%3Dz%2Cat%3Dtt%26%26nt%26%26typeof%20et.deriveBits%3D%3Dz%3Bclass%20ft%20extends%20d%7Bconstructor(%7Bpassword%3At%2CrawPassword%3Ae%2CencryptionStrength%3An%2CcheckPasswordOnly%3As%7D)%7Bsuper(%7Bstart()%7But(this%2Ct%2Ce%2Cn)%7D%2Casync%20transform(t%2Ce)%7Bconst%20n%3Dthis%2C%7Bpassword%3Ai%2Cstrength%3Ac%2Cnt%3Aa%2Cready%3Af%7D%3Dn%3Bi%3F(await(async(t%2Ce%2Cn%2Cs)%3D%3E%7Bconst%20o%3Dawait%20ht(t%2Ce%2Cn%2Cdt(s%2C0%2CQ%5Be%5D))%2Ci%3Ddt(s%2CQ%5Be%5D)%3Bif(o%5B0%5D!%3Di%5B0%5D%7C%7Co%5B1%5D!%3Di%5B1%5D)throw%20new%20r(O)%7D)(n%2Cc%2Ci%2Cdt(t%2C0%2CQ%5Bc%5D%2B2))%2Ct%3Ddt(t%2CQ%5Bc%5D%2B2)%2Cs%3Fe.error(new%20r(j))%3Aa())%3Aawait%20f%3Bconst%20l%3Dnew%20o(t.length-Y-(t.length-Y)%25Z)%3Be.enqueue(wt(n%2Ct%2Cl%2C0%2CY%2C!0))%7D%2Casync%20flush(t)%7Bconst%7Bst%3Ae%2Cot%3An%2Cpending%3As%2Cready%3Ao%7D%3Dthis%3Bif(n%26%26e)%7Bawait%20o%3Bconst%20i%3Ddt(s%2C0%2Cs.length-Y)%2Cc%3Ddt(s%2Cs.length-Y)%3Blet%20a%3Dk%3Bif(i.length)%7Bconst%20t%3Dmt(st%2Ci)%3Bn.update(t)%3Bconst%20s%3De.update(t)%3Ba%3Dyt(st%2Cs)%7Dconst%20f%3Ddt(yt(st%2Cn.digest())%2C0%2CY)%3Blet%20l%3Ds.length%3CY%3F1%3A0%3Bfor(let%20t%3D0%3BY%3Et%3Bt%2B%2B)l%7C%3Df%5Bt%5D%5Ec%5Bt%5D%3Bif(l)throw%20new%20r(T)%3Bt.enqueue(a)%7D%7D%7D)%7D%7Dclass%20lt%20extends%20d%7Bconstructor(%7Bpassword%3At%2CrawPassword%3Ae%2CencryptionStrength%3An%7D)%7Blet%20s%3Bsuper(%7Bstart()%7But(this%2Ct%2Ce%2Cn)%7D%2Casync%20transform(t%2Ce)%7Bconst%20n%3Dthis%2C%7Bpassword%3As%2Cstrength%3Ar%2Cnt%3Ai%2Cready%3Ac%7D%3Dn%3Blet%20a%3Dk%3Bs%3F(a%3Dawait(async(t%2Ce%2Cn)%3D%3E%7Bconst%20s%3DH(new%20o(Q%5Be%5D))%3Breturn%20V(s%2Cawait%20ht(t%2Ce%2Cn%2Cs))%7D)(n%2Cr%2Cs)%2Ci())%3Aawait%20c%3Bconst%20f%3Dnew%20o(a.length%2Bt.length-t.length%25Z)%3Bf.set(a%2C0)%2Ce.enqueue(wt(n%2Ct%2Cf%2Ca.length%2C0))%7D%2Casync%20flush(t)%7Bconst%7Bst%3Ae%2Cot%3An%2Cpending%3Ar%2Cready%3Ao%7D%3Dthis%3Bif(n%26%26e)%7Bawait%20o%3Blet%20i%3Dk%3Bif(r.length)%7Bconst%20t%3De.update(mt(st%2Cr))%3Bn.update(t)%2Ci%3Dyt(st%2Ct)%7Ds.signature%3Dyt(st%2Cn.digest()).slice(0%2CY)%2Ct.enqueue(V(i%2Cs.signature))%7D%7D%7D)%2Cs%3Dthis%7D%7Dfunction%20ut(t%2Cn%2Cs%2Cr)%7Be.assign(t%2C%7Bready%3Anew%20u(e%3D%3Et.nt%3De)%2Cpassword%3Apt(n%2Cs)%2Cstrength%3Ar-1%2Cpending%3Ak%7D)%7Dfunction%20wt(t%2Ce%2Cn%2Cs%2Cr%2Ci)%7Bconst%7Bst%3Ac%2Cot%3Aa%2Cpending%3Af%7D%3Dt%3Bf.length%26%26(e%3DV(f%2Ce))%3Bconst%20l%3De.length-r%3Blet%20u%3Bfor(n%3D((t%2Ce)%3D%3E%7Bif(e%26%26e%3Et.length)%7Bconst%20n%3Dt%3B(t%3Dnew%20o(e)).set(n%2C0)%7Dreturn%20t%7D)(n%2Cs%2B(l-l%25Z))%2Cu%3D0%3Bl-Z%3E%3Du%3Bu%2B%3DZ)%7Bconst%20t%3Dmt(st%2Cdt(e%2Cu%2Cu%2BZ))%3Bi%26%26a.update(t)%3Bconst%20r%3Dc.update(t)%3Bi%7C%7Ca.update(r)%2Cn.set(yt(st%2Cr)%2Cu%2Bs)%7Dreturn%20t.pending%3Ddt(e%2Cu)%2Cn%7Dasync%20function%20ht(n%2Cs%2Cr%2Ci)%7Bn.password%3Dnull%3Bconst%20c%3Dawait(async(t%2Ce%2Cn%2Cs%2Cr)%3D%3E%7Bif(!ct)return%20F.importKey(e)%3Btry%7Breturn%20await%20et.importKey(%22raw%22%2Ce%2Cn%2C!1%2Cr)%7Dcatch%7Breturn%20ct%3D!1%2CF.importKey(e)%7D%7D)(0%2Cr%2Cq%2C0%2CJ)%2Ca%3Dawait(async(t%2Ce%2Cn)%3D%3E%7Bif(!at)return%20F.F(e%2Ct.salt%2CG.iterations%2Cn)%3Btry%7Breturn%20await%20et.deriveBits(t%2Ce%2Cn)%7Dcatch%7Breturn%20at%3D!1%2CF.F(e%2Ct.salt%2CG.iterations%2Cn)%7D%7D)(e.assign(%7Bsalt%3Ai%7D%2CG)%2Cc%2C8*(2*X%5Bs%5D%2B2))%2Cf%3Dnew%20o(a)%2Cl%3Dmt(st%2Cdt(f%2C0%2CX%5Bs%5D))%2Cu%3Dmt(st%2Cdt(f%2CX%5Bs%5D%2C2*X%5Bs%5D))%2Cw%3Ddt(f%2C2*X%5Bs%5D)%3Breturn%20e.assign(n%2C%7Bkeys%3A%7Bkey%3Al%2Cit%3Au%2CpasswordVerification%3Aw%7D%2Cst%3Anew%20ot(new%20rt(l)%2Ct.from(%24))%2Cot%3Anew%20it(u)%7D)%2Cw%7Dfunction%20pt(t%2Ce)%7Breturn%20e%3D%3D%3Dv%3F(t%3D%3E%7Bif(typeof%20w%3D%3Db)%7Bconst%20e%3Dnew%20o((t%3Dunescape(encodeURIComponent(t))).length)%3Bfor(let%20n%3D0%3Bn%3Ce.length%3Bn%2B%2B)e%5Bn%5D%3Dt.charCodeAt(n)%3Breturn%20e%7Dreturn(new%20w).encode(t)%7D)(t)%3Ae%7Dfunction%20dt(t%2Ce%2Cn)%7Breturn%20t.subarray(e%2Cn)%7Dfunction%20yt(t%2Ce)%7Breturn%20t.C(e)%7Dfunction%20mt(t%2Ce)%7Breturn%20t.A(e)%7Dclass%20gt%20extends%20d%7Bconstructor(%7Bpassword%3At%2CrawPassword%3Ae%2CpasswordVerification%3An%2CcheckPasswordOnly%3As%7D)%7Bsuper(%7Bstart()%7Bvt(this%2Ct%2Ce%2Cn)%7D%2Ctransform(t%2Ce)%7Bconst%20n%3Dthis%3Bif(n.password%7C%7Cn.rawPassword)%7Bconst%20e%3Dbt(n%2Ct.subarray(0%2C12))%3Bif(n.password%3Dn.rawPassword%3Dnull%2C0!%3D(e%5B11%5D%5En.passwordVerification))throw%20new%20r(O)%3Bt%3Dt.subarray(12)%7Ds%3Fe.error(new%20r(j))%3Ae.enqueue(bt(n%2Ct))%7D%7D)%7D%7Dclass%20St%20extends%20d%7Bconstructor(%7Bpassword%3At%2CrawPassword%3Ae%2CpasswordVerification%3An%7D)%7Bsuper(%7Bstart()%7Bvt(this%2Ct%2Ce%2Cn)%7D%2Ctransform(t%2Ce)%7Bconst%20n%3Dthis%3Blet%20s%2Cr%3Bif(n.password%7C%7Cn.rawPassword)%7Bn.password%3Dn.rawPassword%3Dnull%3Bconst%20e%3DH(new%20o(12))%3Be%5B11%5D%3Dn.passwordVerification%2Cs%3Dnew%20o(t.length%2Be.length)%2Cs.set(zt(n%2Ce)%2C0)%2Cr%3D12%7Delse%20s%3Dnew%20o(t.length)%2Cr%3D0%3Bs.set(zt(n%2Ct)%2Cr)%2Ce.enqueue(s)%7D%7D)%7D%7Dfunction%20vt(t%2Cn%2Cs%2Cr)%7Be.assign(t%2C%7Bpassword%3An%2CrawPassword%3As%2CpasswordVerification%3Ar%7D)%2C((t%2Cn%2Cs)%3D%3E%7Bconst%20r%3D%5B305419896%2C591751049%2C878082192%5D%3Bif(e.assign(t%2C%7Bkeys%3Ar%2Cct%3Anew%20U(r%5B0%5D)%2Cft%3Anew%20U(r%5B2%5D)%7D)%2Cs)for(let%20e%3D0%3Be%3Cs.length%3Be%2B%2B)kt(t%2Cs%5Be%5D)%3Belse%20for(let%20e%3D0%3Be%3Cn.length%3Be%2B%2B)kt(t%2Cn.charCodeAt(e))%7D)(t%2Cn%2Cs)%7Dfunction%20bt(t%2Ce)%7Bconst%20n%3Dnew%20o(e.length)%3Bfor(let%20s%3D0%3Bs%3Ce.length%3Bs%2B%2B)n%5Bs%5D%3DCt(t)%5Ee%5Bs%5D%2Ckt(t%2Cn%5Bs%5D)%3Breturn%20n%7Dfunction%20zt(t%2Ce)%7Bconst%20n%3Dnew%20o(e.length)%3Bfor(let%20s%3D0%3Bs%3Ce.length%3Bs%2B%2B)n%5Bs%5D%3DCt(t)%5Ee%5Bs%5D%2Ckt(t%2Ce%5Bs%5D)%3Breturn%20n%7Dfunction%20kt(t%2Ce)%7Blet%5B%2Cn%5D%3Dt.keys%3Bt.ct.append(%5Be%5D)%3Bconst%20r%3D~t.ct.get()%3Bn%3DIt(s.imul(It(n%2BAt(r))%2C134775813)%2B1)%2Ct.ft.append(%5Bn%3E%3E%3E24%5D)%3Bconst%20o%3D~t.ft.get()%3Bt.keys%3D%5Br%2Cn%2Co%5D%7Dfunction%20Ct(t)%7Bconst%20e%3D2%7Ct.keys%5B2%5D%3Breturn%20At(s.imul(e%2C1%5Ee)%3E%3E%3E8)%7Dfunction%20At(t)%7Breturn%20255%26t%7Dfunction%20It(t)%7Breturn%204294967295%26t%7Dconst%20xt%3Dnew%20f%3Bfunction%20Pt(t)%7Breturn%20xt.get(t)%7Dconst%20Mt%3D%22deflate-raw%22%3Bclass%20Bt%20extends%20d%7Bconstructor(t%2C%7BchunkSize%3Ae%2CCompressionStreamZlib%3An%2CCompressionStream%3As%7D)%7Bsuper(%7B%7D)%3Bconst%7Bcompressed%3Ar%2Cencrypted%3Ao%2CuseCompressionStream%3Ai%2CzipCrypto%3Ac%2Csigned%3Aa%2Clevel%3Af%2Cdeflate64%3Au%2Cformat%3Aw%2CcompressionMethod%3Ah%7D%3Dt%2Cp%3Dthis%3Blet%20d%2Cy%2Cm%2Cg%3Dsuper.readable%3Bconst%20S%3Dw%26%26Pt(w)%2Cv%3Da%26%26r%26%26!u%26%26!S%26%26(!o%7C%7Cc)%26%26!(!i%7C%7C!s)%3Bo%26%26!c%7C%7C!a%7C%7Cv%7C%7C(d%3Dnew%20_%2Cg%3DKt(g%2Cd))%2Cr%26%26(S%3Fg%3DEt(g%2CVt(S.CompressionStream%2Cw%2C%7Blevel%3Af%2CchunkSize%3Ae%2CcompressionMethod%3Ah%7D))%3Av%3F(m%3Dnew%20Dt%2Cg%3DEt(g%2Cnew%20s(%22gzip%22))%2Cg%3DKt(g%2Cm))%3Ag%3DWt(g%2Ci%2C%7Blevel%3Af%2CchunkSize%3Ae%7D%2Cs%2Cn))%2Co%26%26(c%3Fg%3DKt(g%2Cnew%20St(t))%3A(y%3Dnew%20lt(t)%2Cg%3DKt(g%2Cy)))%2C_t(p%2Cg%2C()%3D%3E%7Blet%20t%3Bo%26%26!c%26%26(t%3Dy.signature)%2Co%26%26!c%7C%7C!a%7C%7C(t%3Dv%3Fm.signature%3Anew%20l(d.value.buffer).getUint32(0))%2Cp.signature%3Dt%7D)%7D%7Dclass%20Dt%20extends%20d%7Bconstructor()%7Blet%20t%2Ce%3D10%2Cn%3Dnew%20o(0)%3Bsuper(%7Btransform(t%2Cr)%7Bif(e)%7Bconst%20n%3Ds.min(e%2Ct.length)%3Bif(e-%3Dn%2C!(t%3Dt.subarray(n)).length)return%7Dconst%20o%3Dn.length%2Bt.length%3Bif(8%3E%3Do)return%20void(n%3DV(n%2Ct))%3Bconst%20i%3Do-8%2Cc%3Ds.min(i%2Cn.length)%3Br.enqueue(V(n.subarray(0%2Cc)%2Ct.subarray(0%2Ci-c)))%2Cn%3DV(n.subarray(c)%2Ct.subarray(i-c))%7D%2Cflush()%7Bconst%20e%3Dnew%20l((s%3Dn).buffer%2Cs.byteOffset%2Cs.byteLength)%3Bvar%20s%3Bt.signature%3De.getUint32(0%2C!0)%2Ct.uncompressedSize%3De.getUint32(4%2C!0)%7D%7D)%2Ct%3Dthis%7D%7Dclass%20Rt%20extends%20d%7Bconstructor(t%2C%7BchunkSize%3Ae%2CDecompressionStreamZlib%3An%2CDecompressionStream%3As%7D)%7Bsuper(%7B%7D)%3Bconst%7BzipCrypto%3Ao%2Cencrypted%3Ai%2Csigned%3Ac%2Csignature%3Aa%2Ccompressed%3Af%2CuseCompressionStream%3Au%2Cdeflate64%3Aw%2Cformat%3Ah%2CcompressionMethod%3Ap%2CrawBitFlag%3Ad%2CoutputSize%3Am%7D%3Dt%3Blet%20g%2CS%2Cv%3Dsuper.readable%3Bif(i%26%26(o%3Fv%3DKt(v%2Cnew%20gt(t))%3A(S%3Dnew%20ft(t)%2Cv%3DKt(v%2CS)))%2Cf)%7Bconst%20t%3Dh%26%26Pt(h)%3Bv%3Dt%3FEt(v%2CVt(t.DecompressionStream%2Ch%2C%7BchunkSize%3Ae%2CcompressionMethod%3Ap%2CrawBitFlag%3Ad%2CuncompressedSize%3Am%7D))%3AWt(v%2Cu%2C%7BchunkSize%3Ae%2Cdeflate64%3Aw%7D%2Cs%2Cn)%2Cv%3D(t%3D%3E%7Bconst%20e%3Dt.getReader()%3Breturn%20new%20y(%7Basync%20pull(t)%7Blet%20n%3Btry%7Bn%3Dawait%20e.read()%7Dcatch(t)%7Bif(t%26%26t.message)throw%20t%3Bconst%20e%3Dnew%20r(%22Invalid%20compressed%20data%22)%3Bthrow%20e.cause%3Dt%2Ce%7Dconst%7Bvalue%3As%2Cdone%3Ao%7D%3Dn%3Bo%3Ft.close()%3At.enqueue(s)%7D%2Ccancel%3At%3D%3Ee.cancel(t)%7D)%7D)(v)%7Di%26%26!o%7C%7C!c%7C%7C(g%3Dnew%20_%2Cv%3DKt(v%2Cg))%2C_t(this%2Cv%2C()%3D%3E%7Bif((!i%7C%7Co)%26%26c)%7Bconst%20t%3Dnew%20l(g.value.buffer)%3Bif(a!%3Dt.getUint32(0%2C!1))throw%20new%20r(T)%7D%7D)%7D%7Dconst%20Ut%3Dnew%20f%3Bfunction%20_t(t%2Cn%2Cs)%7Bn%3DKt(n%2Cnew%20d(%7Bflush%3As%7D))%2Ce.defineProperty(t%2C%22readable%22%2C%7Bget%3A()%3D%3En%7D)%7Dfunction%20Vt(t%2Ce%2Cn)%7Bif(!t)throw%20new%20r(%22Compression%20method%20not%20supported%22)%3Breturn%20new%20t(e%2Cn)%7Dfunction%20Wt(t%2Ce%2Cn%2Cs%2Cr)%7Bconst%20o%3De%26%26s%3Fs%3Ar%7C%7Cs%2Ci%3Dn.deflate64%3F%22deflate64-raw%22%3AMt%3Blet%20c%3Btry%7Bc%3Dnew%20o(i%2Cn)%7Dcatch(t)%7Bif(!e%7C%7C!r%7C%7Co%3D%3Dr)throw%20t%3Bc%3Dnew%20r(i%2Cn)%7Dreturn%20Et(t%2Cc)%7Dfunction%20Kt(t%2Ce)%7Breturn(t%3D%3E%7Bif(t%20instanceof%20y)return%20t%3Bconst%20e%3Dt.getReader()%3Breturn%20new%20y(%7Basync%20pull(t)%7Bconst%7Bvalue%3An%2Cdone%3As%7D%3Dawait%20e.read()%3Bs%3Ft.close()%3At.enqueue(n)%7D%2Ccancel%3At%3D%3Ee.cancel(t)%7D)%7D)(t).pipeThrough(e)%7Dfunction%20Et(t%2Ce)%7Bconst%20n%3De.writable.getWriter()%2Cs%3Dt.getReader()%3Breturn(async()%3D%3E%7Btry%7Bfor(%3B%3B)%7Bawait%20n.ready%3Bconst%20t%3Dawait%20s.read()%3Bif(t.done)%7Bawait%20n.close()%3Bbreak%7Dawait%20n.write(t.value)%7D%7Dcatch(t)%7Bawait(async(t%2Ce)%3D%3E%7Btry%7Bawait%20t.abort(e)%7Dcatch%7B%7D%7D)(n%2Ct)%2Cawait(async(t%2Ce)%3D%3E%7Btry%7Bawait%20t.cancel(e)%7Dcatch%7B%7D%7D)(s%2Ct)%7D%7D)()%2Ce.readable%7Dconst%20Ft%3D%22data%22%2CLt%3D%22close%22%2COt%3D%22deflate%22%3Bclass%20Tt%20extends%20d%7Bconstructor(t%2Cn)%7Bsuper(%7B%7D)%3Bconst%20s%3Dthis%2C%7BcodecType%3Ao%7D%3Dt%3Blet%20i%3Bo.startsWith(Ot)%3Fi%3DBt%3Ao.startsWith(%22inflate%22)%26%26(i%3DRt)%2Cs.outputSize%3D0%3Blet%20c%3D0%3Bconst%20a%3Dnew%20i(t%2Cn)%2Cf%3Dsuper.readable%2Cl%3Dnew%20d(%7Btransform(t%2Ce)%7Bt%26%26t.length%26%26(c%2B%3Dt.length%2Ce.enqueue(t))%7D%2Cflush()%7Be.assign(s%2C%7BinputSize%3Ac%7D)%7D%7D)%2Cu%3Dnew%20d(%7Btransform(e%2Cn)%7Bif(e%26%26e.length%26%26(n.enqueue(e)%2Cs.outputSize%2B%3De.length%2Ct.outputSize!%3D%3Dv%26%26s.outputSize%3Et.outputSize))throw%20new%20r(%22Invalid%20uncompressed%20size%22)%7D%2Cflush()%7Bconst%7Bsignature%3At%7D%3Da%3Be.assign(s%2C%7Bsignature%3At%2CinputSize%3Ac%7D)%7D%7D)%3Be.defineProperty(s%2C%22readable%22%2C%7Bget%3A()%3D%3Ef.pipeThrough(l).pipeThrough(a).pipeThrough(u)%7D)%7D%7Dclass%20jt%20extends%20d%7Bconstructor(t)%7Bconst%20e%3D%5B%5D%3Blet%20s%3D0%3Bfunction%20r()%7Bconst%20n%3Dnew%20o(t)%3Blet%20r%3D0%3Bfor(%3Bt%3Er%3B)%7Bconst%20s%3De%5B0%5D%2Co%3Dt-r%3Bs.length%3Eo%3F(n.set(s.subarray(0%2Co)%2Cr)%2Ce%5B0%5D%3Ds.subarray(o)%2Cr%2B%3Do)%3A(n.set(s%2Cr)%2Cr%2B%3Ds.length%2Ce.shift())%7Dreturn%20s-%3Dt%2Cn%7Dn.isFinite(t)%26%26t%3E%3D1%7C%7C(t%3D65536)%2Csuper(%7Btransform(n%2Co)%7Bfor(e.push(n)%2Cs%2B%3Dn.length%3Bs%3Et%3B)o.enqueue(r())%7D%2Cflush(t)%7Bs%26%26t.enqueue(((t%2Ce)%3D%3E%7Bconst%20n%3Dnew%20o(e)%3Blet%20s%3D0%3Bfor(const%20e%20of%20t)n.set(e%2Cs)%2Cs%2B%3De.length%3Breturn%20n%7D)(e%2Cs))%7D%7D)%7D%7Dlet%20Ht%3D2%3Btry%7Btypeof%20navigator!%3Db%26%26navigator.hardwareConcurrency%26%26(Ht%3Dnavigator.hardwareConcurrency)%7Dcatch%7B%7Dconst%20Zt%3Dnew%20f%2CNt%3Dnew%20f%3Blet%20qt%2CGt%2CJt%2CQt%2CXt%2CYt%3D0%3Basync%20function%20%24t(t)%7Blet%20e%2Co%3Btry%7Bconst%7Boptions%3Ai%2Cconfig%3Ac%7D%3Dt%3Bif(i.format%26%26await(async(t%2Ce)%3D%3E%7B!xt.has(t)%26%26e%26%26((t%2Ce)%3D%3E%7Bconst%7BCompressionStream%3An%2CDecompressionStream%3As%7D%3De%3Bif(typeof%20n!%3Dz%26%26typeof%20s!%3Dz)throw%20new%20r(%22Invalid%20codec%20module%22)%3Bxt.set(t%2C%7BCompressionStream%3An%2CDecompressionStream%3As%7D)%7D)(t%2Cawait(import(e)))%7D)(i.format%2Ci.codecURI)%2Cc.CompressionStream%3Dself.CompressionStream%2Cc.DecompressionStream%3Dself.DecompressionStream%2Ci.compressed%26%26!i.format)if(i.useCompressionStream)%7Bif(!(t%3D%3E%7Bif(!t)return!1%3Blet%20e%3DUt.get(t)%3Bif(e%3D%3D%3Dv)%7Btry%7Bnew%20t(Mt)%2Ce%3D!0%7Dcatch%7Be%3D!1%7DUt.set(t%2Ce)%7Dreturn%20e%7D)(i.codecType.startsWith(Ot)%3Fc.CompressionStream%3Ac.DecompressionStream))try%7Bawait%20self.initModule(t.config)%7Dcatch%7B%7D%7Delse%20try%7Bawait%20self.initModule(t.config)%7Dcatch%7Bi.useCompressionStream%3D!0%7Dconst%20a%3D%7BhighWaterMark%3A1%7D%2Cf%3Dt.readable%7C%7Cnew%20y(%7Basync%20pull(t)%7Bconst%20e%3Dnew%20u(t%3D%3EZt.set(Yt%2Ct))%3Bte(%7Btype%3A%22pull%22%2CmessageId%3AYt%7D)%2CYt%3D(Yt%2B1)%25n.MAX_SAFE_INTEGER%3Bconst%7Bvalue%3As%2Cdone%3Ar%7D%3Dawait%20e%3Bt.enqueue(s)%2Cr%26%26t.close()%7D%7D%2Ca)%3Bo%3Dt.writable%7C%7Cnew%20m(%7Basync%20write(t)%7Blet%20e%3Bconst%20s%3Dnew%20u(t%3D%3Ee%3Dt)%3BNt.set(Yt%2Ce)%2Cte(%7Btype%3AFt%2Cvalue%3At%2CmessageId%3AYt%7D)%2CYt%3D(Yt%2B1)%25n.MAX_SAFE_INTEGER%2Cawait%20s%7D%7D%2Ca)%2Ce%3Dnew%20Tt(i%2Cc)%2Cqt%3Dnew%20AbortController%3Bconst%7Bsignal%3Al%7D%3Dqt%3Bawait%20f.pipeThrough(e).pipeThrough(new%20jt((t%3D%3Es.max(t.chunkSize%2C64))(c))).pipeTo(o%2C%7Bsignal%3Al%2CpreventClose%3A!0%2CpreventAbort%3A!0%7D)%2Cawait%20o.getWriter().close()%3Bconst%7Bsignature%3Aw%2CinputSize%3Ah%2CoutputSize%3Ap%7D%3De%3Bte(%7Btype%3ALt%2Cresult%3A%7Bsignature%3Aw%2CinputSize%3Ah%2CoutputSize%3Ap%7D%7D)%7Dcatch(t)%7Bif(t.outputSize%3De%3Fe.outputSize%3A0%2Co%26%26!o.locked)try%7Bawait%20o.getWriter().close()%7Dcatch%7B%7Dee(t)%7D%7Dfunction%20te(t)%7Bconst%7Bvalue%3Ae%7D%3Dt%3Bif(e)if(e.length)try%7Bt.value%3D(n%3De%2Cn.byteOffset%7C%7Cn.byteLength!%3Dn.buffer.byteLength%3Fnew%20o(n)%3An).buffer%2Cp(t%2C%5Bt.value%5D)%7Dcatch%7Bp(t)%7Delse%20p(t)%3Belse%20p(t)%3Bvar%20n%7Dfunction%20ee(t%3Dnew%20r(%22Unknown%20error%22))%7Bconst%7Bmessage%3Ae%2Cstack%3An%2Ccode%3As%2Cname%3Ao%2CoutputSize%3Ai%7D%3Dt%3Bp(%7Berror%3A%7Bmessage%3Ae%2Cstack%3An%2Ccode%3As%2Cname%3Ao%2CoutputSize%3Ai%7D%7D)%7Dfunction%20ne(t%2Ce%2Cn%3D%7B%7D)%7Bconst%20i%3D%22number%22%3D%3Dtypeof%20n.level%3Fn.level%3A-1%2Cc%3D%22number%22%3D%3Dtypeof%20n.outBuffer%3Fn.outBuffer%3A65536%2Ca%3D%22number%22%3D%3Dtypeof%20n.inBufferSize%3Fn.inBufferSize%3A65536%3Breturn%20new%20d(%7Bstart()%7Btry%7Blet%20n%3Bif(this.lt%3DJt(c)%2Cthis.in%3DJt(a)%2Cthis.inBufferSize%3Da%2C!this.lt%7C%7C!this.in)throw%20new%20r(%22allocation%20failed%22)%3Bif(this.ut%3Dnew%20o(c)%2Ct%3F(this.wt%3DGt.deflate_process%2Cthis.ht%3DGt.deflate_last_consumed%2Cthis.yt%3DGt.deflate_end%2Cthis.gt%3DGt.deflate_new()%2Cn%3D%22gzip%22%3D%3D%3De%3FGt.deflate_init_gzip(this.gt%2Ci)%3A%22deflate-raw%22%3D%3D%3De%3FGt.deflate_init_raw(this.gt%2Ci)%3AGt.deflate_init(this.gt%2Ci))%3A%22deflate64-raw%22%3D%3D%3De%3F(this.wt%3DGt.inflate9_process%2Cthis.ht%3DGt.inflate9_last_consumed%2Cthis.yt%3DGt.inflate9_end%2Cthis.gt%3DGt.inflate9_new()%2Cn%3DGt.inflate9_init_raw(this.gt))%3A(this.wt%3DGt.inflate_process%2Cthis.ht%3DGt.inflate_last_consumed%2Cthis.yt%3DGt.inflate_end%2Cthis.gt%3DGt.inflate_new()%2Cn%3D%22deflate-raw%22%3D%3D%3De%3FGt.inflate_init_raw(this.gt)%3A%22gzip%22%3D%3D%3De%3FGt.inflate_init_gzip(this.gt)%3AGt.inflate_init(this.gt))%2C0!%3D%3Dn)throw%20new%20r(%22init%20failed%3A%22%2Bn)%7Dcatch(t)%7Bthrow%20f(this)%2Ct%7D%7D%2Ctransform(e%2Cn)%7Btry%7Bconst%20i%3De%2Ca%3Dnew%20o(Xt.buffer)%2Cf%3Dthis.wt%2Cl%3Dthis.ht%2Cu%3Dthis.lt%2Cw%3Dthis.ut%3Blet%20h%3D0%3Bfor(%3Bh%3Ci.length%3B)%7Bconst%20e%3Ds.min(i.length-h%2C32768)%3Bif((!this.in%7C%7Cthis.inBufferSize%3Ce)%26%26(this.in%26%26Qt%26%26(Qt(this.in)%2Cthis.in%3D0)%2Cthis.in%3DJt(e)%2Cthis.inBufferSize%3De%2C!this.in))throw%20new%20r(%22allocation%20failed%22)%3Ba.set(i.subarray(h%2Ch%2Be)%2Cthis.in)%3Bconst%20o%3Df(this.gt%2Cthis.in%2Ce%2Cu%2Cc%2C0)%2Cp%3D16777215%26o%3Bif(p%26%26(w.set(a.subarray(u%2Cu%2Bp)%2C0)%2Cn.enqueue(w.slice(0%2Cp)))%2C!t)%7Bconst%20t%3Do%3E%3E24%26255%2Ce%3D128%26t%3Ft-256%3At%3Bif(0%3Ee)throw%20new%20r(%22process%20error%3A%22%2Be)%7Dconst%20d%3Dl(this.gt)%3Bif(0%3D%3D%3Dd)break%3Bh%2B%3Dd%7D%7Dcatch(t)%7Bf(this)%2Cn.error(t)%7D%7D%2Cflush(e)%7Btry%7Bconst%20n%3Dnew%20o(Xt.buffer)%2Cs%3Dthis.wt%2Ci%3Dthis.lt%2Ca%3Dthis.ut%3Bfor(%3B%3B)%7Bconst%20o%3Ds(this.gt%2C0%2C0%2Ci%2Cc%2C4)%2Cf%3D16777215%26o%2Cl%3Do%3E%3E24%26255%3Bif(!t)%7Bconst%20t%3D128%26l%3Fl-256%3Al%3Bif(0%3Et)throw%20new%20r(%22process%20error%3A%22%2Bt)%7Dif(f%26%26(a.set(n.subarray(i%2Ci%2Bf)%2C0)%2Ce.enqueue(a.slice(0%2Cf)))%2C1%3D%3D%3Dl%7C%7C0%3D%3D%3Df)break%7D%7Dcatch(t)%7Be.error(t)%7Dfinally%7Bconst%20t%3Df(this)%3B0!%3D%3Dt%26%26e.error(new%20r(%22end%20error%3A%22%2Bt))%7D%7D%2Ccancel()%7Bf(this)%7D%7D)%3Bfunction%20f(t)%7Blet%20e%3D0%3Breturn%20t.gt%26%26t.yt%26%26(e%3Dt.yt(t.gt))%2Ct.gt%3D0%2Ct.in%26%26Qt%26%26Qt(t.in)%2Ct.in%3D0%2Ct.lt%26%26Qt%26%26Qt(t.lt)%2Ct.lt%3D0%2Ce%7D%7DaddEventListener(%22message%22%2C(%7Bdata%3At%7D)%3D%3E%7Bconst%7Btype%3Ae%2CmessageId%3An%2Cvalue%3As%2Cdone%3Ar%7D%3Dt%3Btry%7Bif(%22start%22%3D%3De%26%26%24t(t)%2Ce%3D%3DFt)%7Bconst%20t%3DZt.get(n)%3BZt.delete(n)%2Ct(%7Bvalue%3As%7C%7Cnew%20o%2Cdone%3Ar%7D)%7Dif(%22ack%22%3D%3De)%7Bconst%20t%3DNt.get(n)%3BNt.delete(n)%2Ct()%7De%3D%3DLt%26%26qt.abort()%7Dcatch(t)%7Bee(t)%7D%7D)%2Cp(%7Btype%3A%22ready%22%7D)%3Bclass%20se%7Bconstructor(t%3D%22deflate%22%2Ce)%7Breturn%20ne(!0%2Ct%2Ce)%7D%7Dclass%20re%7Bconstructor(t%3D%22deflate%22%2Ce)%7Breturn%20ne(!1%2Ct%2Ce)%7D%7Dse.St%3D!0%2Cre.St%3D!0%3Blet%20oe%3D!1%3Bself.initModule%3Dasync%20t%3D%3E%7Btry%7Bconst%20e%3Dawait(async(t%2C%7BbaseURI%3Ae%7D)%3D%3E%7Bif(!oe)%7Blet%20n%2Cs%3Btry%7Btry%7Bs%3Dnew%20URL(t%2Ce)%7Dcatch%7B%7Dconst%20r%3Dawait%20fetch(s)%3Bn%3Dawait%20r.arrayBuffer()%7Dcatch(e)%7Bif(!t.startsWith(%22data%3Aapplication%2Fwasm%3Bbase64%2C%22))throw%20e%3Bn%3D(t%3D%3E%7Bconst%20e%3Dt.split(%22%2C%22)%5B1%5D%2Cn%3Datob(e)%2Cs%3Dn.length%2Cr%3Dnew%20o(s)%3Bfor(let%20t%3D0%3Bs%3Et%3B%2B%2Bt)r%5Bt%5D%3Dn.charCodeAt(t)%3Breturn%20r.buffer%7D)(t)%7D(t%3D%3E%7Bif(Gt%3Dt%2C(%7Bmalloc%3AJt%2Cfree%3AQt%2Cmemory%3AXt%7D%3DGt)%2C%22function%22!%3Dtypeof%20Jt%7C%7C%22function%22!%3Dtypeof%20Qt%7C%7C!Xt)throw%20Gt%3DJt%3DQt%3DXt%3Dnull%2Cnew%20r(%22Invalid%20WASM%20module%22)%7D)((await%20WebAssembly.instantiate(n)).instance.exports)%2Coe%3D!0%7D%7D)(t.wasmURI%2Ct)%3Breturn%20t.CompressionStreamZlib%3Dse%2Ct.DecompressionStreamZlib%3Dre%2Ce%7Dcatch%7B%7D%7D%7D)%3B%0A";
	} });
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/codec-registry.js
var I = "Invalid codec module", L = /* @__PURE__ */ new Map(), ee = /* @__PURE__ */ new Map();
function te(e) {
	return L.get(e);
}
function ne(e) {
	return ee.get(e);
}
function re(e, t) {
	let { CompressionStream: n, DecompressionStream: r } = t;
	if (typeof n != "function" && typeof r != "function") throw Error(I);
	ee.set(e, {
		CompressionStream: n,
		DecompressionStream: r
	});
}
async function R(e, t) {
	!ee.has(e) && t && re(e, await import(
		/* webpackIgnore: true */
		/* @vite-ignore */
		t
));
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/streams/codecs/crc32.js
var z = [
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[]
];
for (let e = 0; e < 256; e++) {
	let t = e;
	for (let e = 0; e < 8; e++) t = t & 1 ? t >>> 1 ^ 3988292384 : t >>> 1;
	z[0][e] = t;
}
for (let e = 0; e < 256; e++) for (let t = 1; t < 8; t++) {
	let n = z[t - 1][e];
	z[t][e] = n >>> 8 ^ z[0][n & 255];
}
var [ie, ae, oe, B, se, ce, le, ue] = z, de = class {
	constructor(e) {
		this.crc = e || -1;
	}
	append(e) {
		let t = this.crc | 0, n = e.length | 0, r = 0;
		if (n >= 8 && e.buffer) {
			let i = new DataView(e.buffer, e.byteOffset, n), a = n - 8;
			for (; r <= a; r += 8) {
				let e = t ^ i.getInt32(r, !0), n = i.getInt32(r + 4, !0);
				t = ue[e & 255] ^ le[e >>> 8 & 255] ^ ce[e >>> 16 & 255] ^ se[e >>> 24 & 255] ^ B[n & 255] ^ oe[n >>> 8 & 255] ^ ae[n >>> 16 & 255] ^ ie[n >>> 24 & 255];
			}
		}
		for (; r < n; r++) t = t >>> 8 ^ ie[(t ^ e[r]) & 255];
		this.crc = t;
	}
	get() {
		return ~this.crc;
	}
}, fe = class extends TransformStream {
	constructor() {
		let e, t = new de();
		super({
			transform(e, n) {
				t.append(e), n.enqueue(e);
			},
			flush() {
				let n = /* @__PURE__ */ new Uint8Array(4);
				new DataView(n.buffer).setUint32(0, t.get()), e.value = n;
			}
		}), e = this;
	}
};
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/util/encode-text.js
function pe(e) {
	if (typeof TextEncoder > "u") {
		e = unescape(encodeURIComponent(e));
		let t = new Uint8Array(e.length);
		for (let n = 0; n < t.length; n++) t[n] = e.charCodeAt(n);
		return t;
	}
	return new TextEncoder().encode(e);
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/util/array.js
function me(e, t) {
	let n = new Uint8Array(e.length + t.length);
	return n.set(e), n.set(t, e.length), n;
}
function he(e) {
	return e.byteOffset || e.byteLength != e.buffer.byteLength ? new Uint8Array(e) : e;
}
function V(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/streams/codecs/sjcl.js
var H = {
	concat(e, t) {
		if (e.length === 0 || t.length === 0) return e.concat(t);
		let n = e[e.length - 1], r = H.getPartial(n);
		return r === 32 ? e.concat(t) : H._shiftRight(t, r, n | 0, e.slice(0, e.length - 1));
	},
	bitLength(e) {
		let t = e.length;
		if (t === 0) return 0;
		let n = e[t - 1];
		return (t - 1) * 32 + H.getPartial(n);
	},
	clamp(e, t) {
		if (e.length * 32 < t) return e;
		e = e.slice(0, Math.ceil(t / 32));
		let n = e.length;
		return t &= 31, n > 0 && t && (e[n - 1] = H.partial(t, e[n - 1] & 2147483648 >> t - 1, 1)), e;
	},
	partial(e, t, n) {
		return e === 32 ? t : (n ? t | 0 : t << 32 - e) + e * 1099511627776;
	},
	getPartial(e) {
		return Math.round(e / 1099511627776) || 32;
	},
	_shiftRight(e, t, n, r) {
		for (r === void 0 && (r = []); t >= 32; t -= 32) r.push(n), n = 0;
		if (t === 0) return r.concat(e);
		for (let i = 0; i < e.length; i++) r.push(n | e[i] >>> t), n = e[i] << 32 - t;
		let i = e.length ? e[e.length - 1] : 0, a = H.getPartial(i);
		return r.push(H.partial(t + a & 31, t + a > 32 ? n : r.pop(), 1)), r;
	}
}, ge = { bytes: {
	fromBits(e) {
		let t = H.bitLength(e) / 8, n = new Uint8Array(t), r;
		for (let i = 0; i < t; i++) i & 3 || (r = e[i / 4]), n[i] = r >>> 24, r <<= 8;
		return n;
	},
	toBits(e) {
		let t = [], n, r = 0;
		for (n = 0; n < e.length; n++) r = r << 8 | e[n], (n & 3) == 3 && (t.push(r), r = 0);
		return n & 3 && t.push(H.partial(8 * (n & 3), r)), t;
	}
} }, _e = {};
_e.sha1 = class {
	constructor(e) {
		let t = this;
		t.blockSize = 512, t._init = [
			1732584193,
			4023233417,
			2562383102,
			271733878,
			3285377520
		], t._key = [
			1518500249,
			1859775393,
			2400959708,
			3395469782
		], e ? (t._h = e._h.slice(0), t._buffer = e._buffer.slice(0), t._length = e._length) : t.reset();
	}
	reset() {
		let e = this;
		return e._h = e._init.slice(0), e._buffer = [], e._length = 0, e;
	}
	update(e) {
		let t = this;
		typeof e == "string" && (e = ge.utf8String.toBits(e));
		let n = t._buffer = H.concat(t._buffer, e), r = t._length, i = t._length = r + H.bitLength(e);
		if (i > 9007199254740991) throw Error("Cannot hash more than 2^53 - 1 bits");
		let a = new Uint32Array(n), o = 0;
		for (let e = t.blockSize + r - (t.blockSize + r & t.blockSize - 1); e <= i; e += t.blockSize) t._block(a.subarray(16 * o, 16 * (o + 1))), o += 1;
		return n.splice(0, 16 * o), t;
	}
	finalize() {
		let e = this, t = e._buffer, n = e._h;
		t = H.concat(t, [H.partial(1, 1)]);
		for (let e = t.length + 2; e & 15; e++) t.push(0);
		for (t.push(Math.floor(e._length / 4294967296)), t.push(e._length | 0); t.length;) e._block(t.splice(0, 16));
		return e.reset(), n;
	}
	_f(e, t, n, r) {
		if (e <= 19) return t & n | ~t & r;
		if (e <= 39) return t ^ n ^ r;
		if (e <= 59) return t & n | t & r | n & r;
		if (e <= 79) return t ^ n ^ r;
	}
	_S(e, t) {
		return t << e | t >>> 32 - e;
	}
	_block(e) {
		let t = this, n = t._h, r = Array(80);
		for (let t = 0; t < 16; t++) r[t] = e[t];
		let i = n[0], a = n[1], o = n[2], s = n[3], c = n[4];
		for (let e = 0; e <= 79; e++) {
			e >= 16 && (r[e] = t._S(1, r[e - 3] ^ r[e - 8] ^ r[e - 14] ^ r[e - 16]));
			let n = t._S(5, i) + t._f(e, a, o, s) + c + r[e] + t._key[Math.floor(e / 20)] | 0;
			c = s, s = o, o = t._S(30, a), a = i, i = n;
		}
		n[0] = n[0] + i | 0, n[1] = n[1] + a | 0, n[2] = n[2] + o | 0, n[3] = n[3] + s | 0, n[4] = n[4] + c | 0;
	}
};
var ve = {};
ve.aes = class {
	constructor(e) {
		let t = this;
		t._tables = [[
			[],
			[],
			[],
			[],
			[]
		], [
			[],
			[],
			[],
			[],
			[]
		]], t._tables[0][0][0] || t._precompute();
		let n = t._tables[0][4], r = t._tables[1], i = e.length, a, o, s, c = 1;
		if (i !== 4 && i !== 6 && i !== 8) throw Error("invalid aes key size");
		for (t._key = [o = e.slice(0), s = []], a = i; a < 4 * i + 28; a++) {
			let e = o[a - 1];
			(a % i === 0 || i === 8 && a % i === 4) && (e = n[e >>> 24] << 24 ^ n[e >> 16 & 255] << 16 ^ n[e >> 8 & 255] << 8 ^ n[e & 255], a % i === 0 && (e = e << 8 ^ e >>> 24 ^ c << 24, c = c << 1 ^ (c >> 7) * 283)), o[a] = o[a - i] ^ e;
		}
		for (let e = 0; a; e++, a--) {
			let t = o[e & 3 ? a : a - 4];
			a <= 4 || e < 4 ? s[e] = t : s[e] = r[0][n[t >>> 24]] ^ r[1][n[t >> 16 & 255]] ^ r[2][n[t >> 8 & 255]] ^ r[3][n[t & 255]];
		}
	}
	encrypt(e) {
		return this._crypt(e, 0);
	}
	decrypt(e) {
		return this._crypt(e, 1);
	}
	_precompute() {
		let e = this._tables[0], t = this._tables[1], n = e[4], r = t[4], i = [], a = [], o, s, c, l;
		for (let e = 0; e < 256; e++) a[(i[e] = e << 1 ^ (e >> 7) * 283) ^ e] = e;
		for (let u = o = 0; !n[u]; u ^= s || 1, o = a[o] || 1) {
			let a = o ^ o << 1 ^ o << 2 ^ o << 3 ^ o << 4;
			a = a >> 8 ^ a & 255 ^ 99, n[u] = a, r[a] = u, l = i[c = i[s = i[u]]];
			let d = l * 16843009 ^ c * 65537 ^ s * 257 ^ u * 16843008, f = i[a] * 257 ^ a * 16843008;
			for (let n = 0; n < 4; n++) e[n][u] = f = f << 24 ^ f >>> 8, t[n][a] = d = d << 24 ^ d >>> 8;
		}
		for (let n = 0; n < 5; n++) e[n] = e[n].slice(0), t[n] = t[n].slice(0);
	}
	_crypt(e, t) {
		if (e.length !== 4) throw Error("invalid aes block size");
		let n = this._key[t], r = n.length / 4 - 2, i = [
			0,
			0,
			0,
			0
		], a = this._tables[t], o = a[0], s = a[1], c = a[2], l = a[3], u = a[4], d = e[0] ^ n[0], f = e[t ? 3 : 1] ^ n[1], p = e[2] ^ n[2], m = e[t ? 1 : 3] ^ n[3], h = 4, g, _, v;
		for (let e = 0; e < r; e++) g = o[d >>> 24] ^ s[f >> 16 & 255] ^ c[p >> 8 & 255] ^ l[m & 255] ^ n[h], _ = o[f >>> 24] ^ s[p >> 16 & 255] ^ c[m >> 8 & 255] ^ l[d & 255] ^ n[h + 1], v = o[p >>> 24] ^ s[m >> 16 & 255] ^ c[d >> 8 & 255] ^ l[f & 255] ^ n[h + 2], m = o[m >>> 24] ^ s[d >> 16 & 255] ^ c[f >> 8 & 255] ^ l[p & 255] ^ n[h + 3], h += 4, d = g, f = _, p = v;
		for (let e = 0; e < 4; e++) i[t ? 3 & -e : e] = u[d >>> 24] << 24 ^ u[f >> 16 & 255] << 16 ^ u[p >> 8 & 255] << 8 ^ u[m & 255] ^ n[h++], g = d, d = f, f = p, p = m, m = g;
		return i;
	}
};
var ye = {};
ye.ctrGladman = class {
	constructor(e, t) {
		this._prf = e, this._initIv = t, this._iv = t;
	}
	reset() {
		this._iv = this._initIv;
	}
	update(e) {
		return this.calculate(this._prf, e, this._iv);
	}
	incWord(e) {
		if ((e >> 24 & 255) == 255) {
			let t = e >> 16 & 255, n = e >> 8 & 255, r = e & 255;
			t === 255 ? (t = 0, n === 255 ? (n = 0, r === 255 ? r = 0 : ++r) : ++n) : ++t, e = 0, e += t << 16, e += n << 8, e += r;
		} else e += 1 << 24;
		return e;
	}
	incCounter(e) {
		(e[0] = this.incWord(e[0])) === 0 && (e[1] = this.incWord(e[1]));
	}
	calculate(e, t, n) {
		let r;
		if (!(r = t.length)) return [];
		let i = H.bitLength(t);
		for (let i = 0; i < r; i += 4) {
			this.incCounter(n);
			let r = e.encrypt(n);
			t[i] ^= r[0], t[i + 1] ^= r[1], t[i + 2] ^= r[2], t[i + 3] ^= r[3];
		}
		return H.clamp(t, i);
	}
};
var U = {
	importKey(e) {
		return new U.hmacSha1(ge.bytes.toBits(e));
	},
	pbkdf2(e, t, n, r) {
		if (n ||= 1e4, r < 0 || n < 0) throw Error("invalid params to pbkdf2");
		let i = (r >> 5) + 1 << 2, a, o, s, c, l, u = new ArrayBuffer(i), d = new DataView(u), f = 0, p = H;
		for (t = ge.bytes.toBits(t), l = 1; f < (i || 1); l++) {
			for (a = o = e.encrypt(p.concat(t, [l])), s = 1; s < n; s++) for (o = e.encrypt(o), c = 0; c < o.length; c++) a[c] ^= o[c];
			for (s = 0; f < (i || 1) && s < a.length; s++) d.setInt32(f, a[s]), f += 4;
		}
		return u.slice(0, r / 8);
	}
};
U.hmacSha1 = class {
	constructor(e) {
		let t = this, n = t._hash = _e.sha1, r = [[], []];
		t._baseHash = [new n(), new n()];
		let i = t._baseHash[0].blockSize / 32;
		e.length > i && (e = new n().update(e).finalize());
		for (let t = 0; t < i; t++) r[0][t] = e[t] ^ 909522486, r[1][t] = e[t] ^ 1549556828;
		t._baseHash[0].update(r[0]), t._baseHash[1].update(r[1]), t._resultHash = new n(t._baseHash[0]);
	}
	reset() {
		let e = this;
		e._resultHash = new e._hash(e._baseHash[0]), e._updated = !1;
	}
	update(e) {
		let t = this;
		t._updated = !0, t._resultHash.update(e);
	}
	digest() {
		let e = this, t = e._resultHash.finalize(), n = new e._hash(e._baseHash[1]).update(t).finalize();
		return e.reset(), n;
	}
	encrypt(e) {
		if (this._updated) throw Error("encrypt on already updated hmac called!");
		return this.update(e), this.digest(e);
	}
};
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/streams/common-crypto.js
var be = typeof crypto < "u" && typeof crypto.getRandomValues == "function", xe = "Invalid password", Se = "Invalid signature", Ce = "zipjs-abort-check-password", we = "Crypto API not supported";
function Te(e) {
	if (be) return crypto.getRandomValues(e);
	throw Error(we);
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/streams/aes-crypto-stream.js
var Ee = 16, De = "raw", Oe = { name: "PBKDF2" }, ke = { name: "HMAC" }, Ae = "SHA-1", je = Object.assign({ hash: ke }, Oe), Me = Object.assign({
	iterations: 1e3,
	hash: { name: Ae }
}, Oe), Ne = ["deriveBits"], Pe = [
	8,
	12,
	16
], Fe = [
	16,
	24,
	32
], Ie = 10, Le = [
	0,
	0,
	0,
	0
], Re = typeof crypto != C, ze = Re && crypto.subtle, Be = Re && ze !== void 0, Ve = ge.bytes, He = ve.aes, Ue = ye.ctrGladman, We = U.hmacSha1, Ge = Re && Be && typeof ze.importKey == "function", Ke = Re && Be && typeof ze.deriveBits == "function", qe = class extends TransformStream {
	constructor({ password: e, rawPassword: t, encryptionStrength: n, checkPasswordOnly: r }) {
		super({
			start() {
				Ye(this, e, t, n);
			},
			async transform(e, t) {
				let n = this, { password: i, strength: a, resolveReady: o, ready: s } = n;
				i ? (await Ze(n, a, i, it(e, 0, Pe[a] + 2)), e = it(e, Pe[a] + 2), r ? t.error(Error(Ce)) : o()) : await s;
				let c = new Uint8Array(e.length - Ie - (e.length - Ie) % Ee);
				t.enqueue(Xe(n, e, c, 0, Ie, !0));
			},
			async flush(e) {
				let { ctr: t, hmac: n, pending: r, ready: i } = this;
				if (n && t) {
					await i;
					let a = it(r, 0, r.length - Ie), o = it(r, r.length - Ie), s = T;
					if (a.length) {
						let e = ot(Ve, a);
						n.update(e), s = at(Ve, t.update(e));
					}
					let c = it(at(Ve, n.digest()), 0, Ie), l = +(r.length < Ie);
					for (let e = 0; e < Ie; e++) l |= c[e] ^ o[e];
					if (l) throw Error(Se);
					e.enqueue(s);
				}
			}
		});
	}
}, Je = class extends TransformStream {
	constructor({ password: e, rawPassword: t, encryptionStrength: n }) {
		let r;
		super({
			start() {
				Ye(this, e, t, n);
			},
			async transform(e, t) {
				let n = this, { password: r, strength: i, resolveReady: a, ready: o } = n, s = T;
				r ? (s = await Qe(n, i, r), a()) : await o;
				let c = new Uint8Array(s.length + e.length - e.length % Ee);
				c.set(s, 0), t.enqueue(Xe(n, e, c, s.length, 0));
			},
			async flush(e) {
				let { ctr: t, hmac: n, pending: i, ready: a } = this;
				if (n && t) {
					await a;
					let o = T;
					if (i.length) {
						let e = t.update(ot(Ve, i));
						n.update(e), o = at(Ve, e);
					}
					r.signature = at(Ve, n.digest()).slice(0, Ie), e.enqueue(me(o, r.signature));
				}
			}
		}), r = this;
	}
};
function Ye(e, t, n, r) {
	Object.assign(e, {
		ready: new Promise((t) => e.resolveReady = t),
		password: nt(t, n),
		strength: r - 1,
		pending: T
	});
}
function Xe(e, t, n, r, i, a) {
	let { ctr: o, hmac: s, pending: c } = e;
	c.length && (t = me(c, t));
	let l = t.length - i;
	n = rt(n, r + (l - l % Ee));
	let u = 0;
	for (; u <= l - Ee; u += Ee) {
		let e = ot(Ve, it(t, u, u + Ee));
		a && s.update(e);
		let i = o.update(e);
		a || s.update(i), n.set(at(Ve, i), u + r);
	}
	return e.pending = it(t, u), n;
}
async function Ze(e, t, n, r) {
	let i = await $e(e, t, n, it(r, 0, Pe[t])), a = it(r, Pe[t]);
	if (i[0] != a[0] || i[1] != a[1]) throw Error(xe);
}
async function Qe(e, t, n) {
	let r = Te(new Uint8Array(Pe[t]));
	return me(r, await $e(e, t, n, r));
}
async function $e(e, t, n, r) {
	e.password = null;
	let i = await et(De, n, je, !1, Ne), a = await tt(Object.assign({ salt: r }, Me), i, 8 * (Fe[t] * 2 + 2)), o = new Uint8Array(a), s = ot(Ve, it(o, 0, Fe[t])), c = ot(Ve, it(o, Fe[t], Fe[t] * 2)), l = it(o, Fe[t] * 2);
	return Object.assign(e, {
		keys: {
			key: s,
			authentication: c,
			passwordVerification: l
		},
		ctr: new Ue(new He(s), Array.from(Le)),
		hmac: new We(c)
	}), l;
}
async function et(e, t, n, r, i) {
	if (Ge) try {
		return await ze.importKey(e, t, n, r, i);
	} catch {
		return Ge = !1, U.importKey(t);
	}
	return U.importKey(t);
}
async function tt(e, t, n) {
	if (Ke) try {
		return await ze.deriveBits(e, t, n);
	} catch {
		return Ke = !1, U.pbkdf2(t, e.salt, Me.iterations, n);
	}
	return U.pbkdf2(t, e.salt, Me.iterations, n);
}
function nt(e, t) {
	return t === void 0 ? pe(e) : t;
}
function rt(e, t) {
	if (t && t > e.length) {
		let n = e;
		e = new Uint8Array(t), e.set(n, 0);
	}
	return e;
}
function it(e, t, n) {
	return e.subarray(t, n);
}
function at(e, t) {
	return e.fromBits(t);
}
function ot(e, t) {
	return e.toBits(t);
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/streams/zip-crypto-stream.js
var st = 12, ct = class extends TransformStream {
	constructor({ password: e, rawPassword: t, passwordVerification: n, checkPasswordOnly: r }) {
		super({
			start() {
				ut(this, e, t, n);
			},
			transform(e, t) {
				let n = this;
				if (n.password || n.rawPassword) {
					let t = dt(n, e.subarray(0, st));
					if (n.password = n.rawPassword = null, (t[11] ^ n.passwordVerification) != 0) throw Error(xe);
					e = e.subarray(st);
				}
				r ? t.error(Error(Ce)) : t.enqueue(dt(n, e));
			}
		});
	}
}, lt = class extends TransformStream {
	constructor({ password: e, rawPassword: t, passwordVerification: n }) {
		super({
			start() {
				ut(this, e, t, n);
			},
			transform(e, t) {
				let n = this, r, i;
				if (n.password || n.rawPassword) {
					n.password = n.rawPassword = null;
					let t = Te(new Uint8Array(st));
					t[11] = n.passwordVerification, r = new Uint8Array(e.length + t.length), r.set(ft(n, t), 0), i = st;
				} else r = new Uint8Array(e.length), i = 0;
				r.set(ft(n, e), i), t.enqueue(r);
			}
		});
	}
};
function ut(e, t, n, r) {
	Object.assign(e, {
		password: t,
		rawPassword: n,
		passwordVerification: r
	}), pt(e, t, n);
}
function dt(e, t) {
	let n = new Uint8Array(t.length);
	for (let r = 0; r < t.length; r++) n[r] = ht(e) ^ t[r], mt(e, n[r]);
	return n;
}
function ft(e, t) {
	let n = new Uint8Array(t.length);
	for (let r = 0; r < t.length; r++) n[r] = ht(e) ^ t[r], mt(e, t[r]);
	return n;
}
function pt(e, t, n) {
	let r = [
		305419896,
		591751049,
		878082192
	];
	if (Object.assign(e, {
		keys: r,
		crcKey0: new de(r[0]),
		crcKey2: new de(r[2])
	}), n) for (let t = 0; t < n.length; t++) mt(e, n[t]);
	else for (let n = 0; n < t.length; n++) mt(e, t.charCodeAt(n));
}
function mt(e, t) {
	let [, n] = e.keys;
	e.crcKey0.append([t]);
	let r = ~e.crcKey0.get();
	n = _t(Math.imul(_t(n + gt(r)), 134775813) + 1), e.crcKey2.append([n >>> 24]);
	let i = ~e.crcKey2.get();
	e.keys = [
		r,
		n,
		i
	];
}
function ht(e) {
	let t = e.keys[2] | 2;
	return gt(Math.imul(t, t ^ 1) >>> 8);
}
function gt(e) {
	return e & 255;
}
function _t(e) {
	return e | 0;
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/util/compatible-streams.js
function vt(e) {
	if (e instanceof ReadableStream) return e;
	let t = e.getReader();
	return new ReadableStream({
		async pull(e) {
			let { value: n, done: r } = await t.read();
			r ? e.close() : e.enqueue(n);
		},
		cancel(e) {
			return t.cancel(e);
		}
	});
}
function yt(e) {
	if (e instanceof WritableStream) return e;
	let t = e.getWriter();
	return new WritableStream({
		write(e) {
			return t.write(e);
		},
		close() {
			return t.close();
		},
		abort(e) {
			return t.abort(e);
		}
	});
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/streams/zip-entry-stream.js
var bt = "Invalid uncompressed size", xt = "Invalid compressed data", St = "Compression method not supported", Ct = "deflate-raw", wt = "deflate64-raw", Tt = "gzip", Et = 10, Dt = 8, Ot = class extends TransformStream {
	constructor(e, { chunkSize: t, CompressionStreamZlib: n, CompressionStream: r }) {
		super({});
		let { compressed: i, encrypted: a, useCompressionStream: o, zipCrypto: s, signed: c, level: l, deflate64: u, format: d, compressionMethod: f } = e, p = this, m, h, g, _ = super.readable, v = d && ne(d), y = c && i && !u && !v && (!a || s) && !!(o && r);
		(!a || s) && c && !y && (m = new fe(), _ = It(_, m)), i && (v ? _ = Lt(_, Pt(v.CompressionStream, d, {
			level: l,
			chunkSize: t,
			compressionMethod: f
		})) : y ? (g = new kt(), _ = Lt(_, new r(Tt)), _ = It(_, g)) : _ = Ft(_, o, {
			level: l,
			chunkSize: t
		}, r, n)), a && (s ? _ = It(_, new lt(e)) : (h = new Je(e), _ = It(_, h))), Nt(p, _, () => {
			let e;
			a && !s && (e = h.signature), (!a || s) && c && (e = y ? g.signature : new DataView(m.value.buffer).getUint32(0)), p.signature = e;
		});
	}
}, kt = class extends TransformStream {
	constructor() {
		let e, t = Et, n = /* @__PURE__ */ new Uint8Array();
		super({
			transform(e, r) {
				if (t) {
					let n = Math.min(t, e.length);
					if (t -= n, e = e.subarray(n), !e.length) return;
				}
				let i = n.length + e.length;
				if (i <= Dt) {
					n = me(n, e);
					return;
				}
				let a = i - Dt, o = Math.min(a, n.length);
				r.enqueue(me(n.subarray(0, o), e.subarray(0, a - o))), n = me(n.subarray(o), e.subarray(a - o));
			},
			flush() {
				let t = V(n);
				e.signature = t.getUint32(0, !0), e.uncompressedSize = t.getUint32(4, !0);
			}
		}), e = this;
	}
}, At = class extends TransformStream {
	constructor(e, { chunkSize: t, DecompressionStreamZlib: n, DecompressionStream: r }) {
		super({});
		let { zipCrypto: i, encrypted: a, signed: o, signature: s, compressed: c, useCompressionStream: l, deflate64: u, format: d, compressionMethod: f, rawBitFlag: p, outputSize: m } = e, h, g, _ = super.readable;
		if (a && (i ? _ = It(_, new ct(e)) : (g = new qe(e), _ = It(_, g))), c) {
			let e = d && ne(d);
			_ = e ? Lt(_, Pt(e.DecompressionStream, d, {
				chunkSize: t,
				compressionMethod: f,
				rawBitFlag: p,
				uncompressedSize: m
			})) : Ft(_, l, {
				chunkSize: t,
				deflate64: u
			}, r, n), _ = Bt(_);
		}
		(!a || i) && o && (h = new fe(), _ = It(_, h)), Nt(this, _, () => {
			if ((!a || i) && o) {
				let e = new DataView(h.value.buffer);
				if (s != e.getUint32(0, !1)) throw Error(Se);
			}
		});
	}
}, jt = /* @__PURE__ */ new Map();
function Mt(e) {
	if (!e) return !1;
	let t = jt.get(e);
	if (t === void 0) {
		try {
			new e(Ct), t = !0;
		} catch {
			t = !1;
		}
		jt.set(e, t);
	}
	return t;
}
function Nt(e, t, n) {
	t = It(t, new TransformStream({ flush: n })), Object.defineProperty(e, "readable", { get() {
		return t;
	} });
}
function Pt(e, t, n) {
	if (!e) throw Error(St);
	return new e(t, n);
}
function Ft(e, t, n, r, i) {
	let a = t && r ? r : i || r, o = n.deflate64 ? wt : Ct, s;
	try {
		s = new a(o, n);
	} catch (e) {
		if (t && i && a != i) s = new i(o, n);
		else throw e;
	}
	return Lt(e, s);
}
function It(e, t) {
	return vt(e).pipeThrough(t);
}
function Lt(e, t) {
	let n = t.writable.getWriter(), r = e.getReader();
	return i(), t.readable;
	async function i() {
		try {
			for (;;) {
				await n.ready;
				let e = await r.read();
				if (e.done) {
					await n.close();
					break;
				}
				await n.write(e.value);
			}
		} catch (e) {
			await Rt(n, e), await zt(r, e);
		}
	}
}
async function Rt(e, t) {
	try {
		await e.abort(t);
	} catch {}
}
async function zt(e, t) {
	try {
		await e.cancel(t);
	} catch {}
}
function Bt(e) {
	let t = e.getReader();
	return new ReadableStream({
		async pull(e) {
			let n;
			try {
				n = await t.read();
			} catch (e) {
				if (e && e.message) throw e;
				let t = /* @__PURE__ */ Error(xt);
				throw t.cause = e, t;
			}
			let { value: r, done: i } = n;
			i ? e.close() : e.enqueue(r);
		},
		cancel(e) {
			return t.cancel(e);
		}
	});
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/streams/codec-stream.js
var Vt = 65536, Ht = "message", Ut = "start", Wt = "data", Gt = "deflate", Kt = "inflate", qt = class extends TransformStream {
	constructor(e, t) {
		super({});
		let n = this, { codecType: r } = e, i;
		r.startsWith("deflate") ? i = Ot : r.startsWith("inflate") && (i = At), n.outputSize = 0;
		let a = 0, o = new i(e, t), s = super.readable, c = new TransformStream({
			transform(e, t) {
				e && e.length && (a += e.length, t.enqueue(e));
			},
			flush() {
				Object.assign(n, { inputSize: a });
			}
		}), l = new TransformStream({
			transform(t, r) {
				if (t && t.length && (r.enqueue(t), n.outputSize += t.length, e.outputSize !== void 0 && n.outputSize > e.outputSize)) throw Error(bt);
			},
			flush() {
				let { signature: e } = o;
				Object.assign(n, {
					signature: e,
					inputSize: a
				});
			}
		});
		Object.defineProperty(n, "readable", { get() {
			return s.pipeThrough(c).pipeThrough(o).pipeThrough(l);
		} });
	}
}, Jt = class extends TransformStream {
	constructor(e) {
		let t = [], n = 0;
		(!Number.isFinite(e) || e < 1) && (e = Vt), super({
			transform(i, a) {
				for (t.push(i), n += i.length; n > e;) a.enqueue(r());
			},
			flush(e) {
				n && e.enqueue(i(t, n));
			}
		});
		function r() {
			let r = new Uint8Array(e), i = 0;
			for (; i < e;) {
				let n = t[0], a = e - i;
				n.length <= a ? (r.set(n, i), i += n.length, t.shift()) : (r.set(n.subarray(0, a), i), t[0] = n.subarray(a), i += a);
			}
			return n -= e, r;
		}
		function i(e, t) {
			let n = new Uint8Array(t), r = 0;
			for (let t of e) n.set(t, r), r += t.length;
			return n;
		}
	}
}, Yt = { type: "module" }, Xt = "error", Zt = "messageerror", Qt = "Worker startup timeout", $t, en, tn, nn, rn = !0;
try {
	rn = typeof structuredClone == "function" && structuredClone(new DOMException("", "AbortError")).code !== void 0;
} catch {}
var an = () => {};
function on({ initModule: e }) {
	an = e;
}
var sn = class {
	constructor(e, { readable: t, writable: n }, { options: r, config: i, streamOptions: a, useWebWorkers: o, transferStreams: s, workerURI: c }, l) {
		let { signal: u } = a;
		return Object.assign(e, {
			busy: !0,
			generation: (e.generation || 0) + 1,
			readable: t.pipeThrough(new Jt(M(i))).pipeThrough(new cn(a), { signal: u }),
			writable: n,
			options: Object.assign({}, r),
			workerURI: c,
			transferStreams: s,
			terminate() {
				return new Promise((t) => {
					let { worker: n, busy: r } = e;
					n ? (r ? e.resolveTerminated = t : (n.terminate(), t()), e.interface = null) : t();
				});
			},
			onTaskFinished() {
				if (e.busy) {
					let { resolveTerminated: t } = e;
					t && (e.resolveTerminated = null, e.terminated = !0, e.worker.terminate(), t()), e.busy = !1, l(e);
				}
			}
		}), $t === void 0 && ($t = typeof Worker != C), (o && $t ? dn : un)(e, i);
	}
}, cn = class extends TransformStream {
	constructor({ onstart: e, onprogress: t, size: n, onend: r }) {
		let i = 0;
		super({
			async start() {
				e && await ln(e, n);
			},
			async transform(e, r) {
				i += e.length, t && await ln(t, i, n), r.enqueue(e);
			},
			async flush() {
				r && await ln(r, i);
			}
		});
	}
};
async function ln(e, ...t) {
	try {
		await e(...t);
	} catch {}
}
function un(e, t) {
	return { run: () => fn(e, t) };
}
function dn(e, t) {
	let { baseURI: n, chunkSize: r, workerStartupTimeout: i } = t, { wasmURI: a } = t;
	if (!e.interface) {
		typeof a == "function" && (a = a());
		let o;
		try {
			o = gn(e.workerURI, n, e);
		} catch {
			return $t = !1, un(e, t);
		}
		Object.assign(e, {
			worker: o,
			workerAlive: !1,
			terminated: !1,
			interface: { run: async () => {
				try {
					return await pn(e, {
						chunkSize: r,
						wasmURI: a,
						baseURI: n,
						workerStartupTimeout: i
					});
				} catch (n) {
					if (n && n.workerStartupFailed) {
						$t = !1;
						let { reader: n } = e;
						return n && n.releaseLock(), e.reader = null, e.writer = null, fn(e, t);
					}
					throw n;
				}
			} }
		});
	}
	return e.interface;
}
async function fn({ options: e, readable: t, writable: n, onTaskFinished: r }, i) {
	let a;
	try {
		if (e.compressed && !e.format) {
			let t = e.codecType.startsWith(Gt), n = t ? i.CompressionStreamZlib : i.DecompressionStreamZlib, r = t ? i.CompressionStream : i.DecompressionStream;
			if (!e.useCompressionStream) try {
				await an(i);
			} catch {
				(!n || n.requiresModule) && (e.useCompressionStream = !0);
			}
			else if (n && n.requiresModule && !Mt(r)) try {
				await an(i);
			} catch {}
		}
		a = new qt(e, i), await t.pipeThrough(a).pipeThrough(new Jt(M(i))).pipeTo(n, {
			preventClose: !0,
			preventAbort: !0
		});
		let { signature: r, inputSize: o, outputSize: s } = a;
		return {
			signature: r,
			inputSize: o,
			outputSize: s
		};
	} catch (e) {
		throw a && (e.outputSize = a.outputSize), e;
	} finally {
		r();
	}
}
async function pn(e, t) {
	let n, r, i = new Promise((e, t) => {
		n = e, r = t;
	});
	Object.assign(e, {
		reader: null,
		writer: null,
		resolveResult: n,
		rejectResult: r,
		result: i
	});
	let { readable: a, options: o } = e, { writable: s, closed: c, abortPipe: l } = mn(e.writable), u;
	try {
		u = bn({
			type: Ut,
			options: o,
			config: t,
			readable: a,
			writable: s
		}, e);
	} catch (t) {
		l();
		try {
			await c;
		} catch {}
		throw e.onTaskFinished(), t;
	}
	u || Object.assign(e, {
		reader: a.getReader(),
		writer: s.getWriter()
	});
	let { workerStartupTimeout: d } = t;
	!e.workerAlive && Number.isFinite(d) && d >= 0 && (e.startupTimeout = setTimeout(() => _n(e), d));
	try {
		let e = await i;
		return await f(), await c, e;
	} catch (e) {
		await f(), l();
		try {
			await c;
		} catch {}
		throw e;
	}
	async function f() {
		if (!u && !s.locked) try {
			await s.getWriter().close();
		} catch {}
	}
}
function mn(e) {
	let t = new AbortController(), { writable: n, readable: r } = new TransformStream(), i = r.pipeTo(e, {
		preventClose: !0,
		preventAbort: !0,
		signal: t.signal
	});
	return i.catch(() => {}), {
		writable: n,
		closed: i,
		abortPipe: () => t.abort()
	};
}
function hn(e) {
	let { worker: t } = e;
	if (t) try {
		t.terminate();
	} catch {}
	e.interface = null;
}
function gn(e, t, n, r, i = !0) {
	let a, o, s;
	if (tn === void 0 || en !== e) {
		let c = typeof e == w;
		o = c ? e(i) : e;
		let l = o.startsWith("data:"), u = o.startsWith("blob:");
		if (l || u) {
			r === void 0 && (r = !1), r && (s = Yt);
			try {
				a = new Worker(o, s);
			} catch (i) {
				if (u) try {
					URL.revokeObjectURL(o);
				} catch {}
				if (c && u) return gn(e, t, n, r, !1);
				if (r) throw i;
				return gn(e, t, n, !0, !1);
			}
		} else {
			r === void 0 && (r = !0), r && (s = Yt);
			try {
				o = new URL(o, t);
			} catch {}
			try {
				a = new Worker(o, s);
			} catch (a) {
				if (r) throw a;
				return gn(e, t, n, !1, i);
			}
		}
		en = e, tn = o, nn = s;
	} else a = new Worker(tn, nn);
	return a.addEventListener(Ht, (e) => {
		n.workerAlive = !0, vn(n), xn(e, n);
	}), a.addEventListener(Xt, (e) => yn(e, n)), a.addEventListener(Zt, (e) => yn(e, n)), a;
}
function _n(e) {
	if (e.startupTimeout = null, e.workerAlive) return;
	let { rejectResult: t, writer: n } = e;
	if (hn(e), e.worker = null, t) {
		let e = /* @__PURE__ */ Error(Qt);
		e.workerStartupFailed = !0, t(e), n && n.releaseLock();
	}
}
function vn(e) {
	let { startupTimeout: t } = e;
	t && (clearTimeout(t), e.startupTimeout = null);
}
function yn(e, t) {
	e.preventDefault && e.preventDefault(), vn(t);
	let { workerAlive: n, rejectResult: r, writer: i, onTaskFinished: a } = t;
	if (hn(t), n || (t.worker = null), r) {
		let t = e.error || Error(e.message || Xt);
		n || (t = Object.assign(Error(t.message || Xt), { workerStartupFailed: !0 })), r(t), i && i.releaseLock(), n && a();
	}
}
function bn(e, { worker: t, writer: n, transferStreams: r, workerAlive: i }) {
	try {
		let { value: n, readable: a, writable: o } = e, s = [];
		if (n && (e.value = he(n), s.push(e.value.buffer)), r && rn && i ? (a && s.push(a), o && s.push(o)) : e.readable = e.writable = null, s.length) try {
			return t.postMessage(e, s), !0;
		} catch {
			rn = !1, e.readable = e.writable = null, t.postMessage(e);
		}
		else t.postMessage(e);
	} catch (e) {
		throw n && n.releaseLock(), e;
	}
}
async function xn({ data: e }, t) {
	let { type: n, value: r, messageId: i, result: a, error: o } = e, { reader: s, writer: c, resolveResult: l, rejectResult: u, onTaskFinished: d, generation: f } = t, p = () => t.generation != f;
	try {
		if (o) {
			let { message: e, stack: t, code: n, name: r, outputSize: i } = o, a = Error(e);
			Object.assign(a, {
				stack: t,
				code: n,
				name: r,
				outputSize: i
			}), m(a);
		} else {
			if (n == "pull") {
				let { value: e, done: n } = await s.read();
				p() || bn({
					type: Wt,
					value: e,
					done: n,
					messageId: i
				}, t);
			}
			n == "data" && (await c.ready, await c.write(new Uint8Array(r)), p() || bn({
				type: "ack",
				messageId: i
			}, t)), n == "close" && m(null, a);
		}
	} catch (e) {
		p() || (hn(t), m(e));
	}
	function m(e, t) {
		p() || (e ? u(e) : l(t), c && c.releaseLock(), d());
	}
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/codec-pool.js
var Sn = [], Cn = [], wn, Tn, En = 0;
async function Dn(e, t) {
	let { options: n, config: r } = t, { transferStreams: i, useWebWorkers: a, useCompressionStream: o, compressed: s, signed: c, encrypted: l, format: u, codecURI: d } = n, { workerURI: f, maxWorkers: p } = r;
	u && (d && (n.codecURI = On(d, r.baseURI)), await R(u, n.codecURI)), t.transferStreams = i || i === void 0 && r.transferStreams;
	let m = !s && !c && !l, h = u === void 0 || !!n.codecURI;
	return t.useWebWorkers = !m && h && (a || a === void 0 && r.useWebWorkers), t.workerURI = t.useWebWorkers && f ? f : void 0, n.useCompressionStream = o || o === void 0 && r.useCompressionStream, (await g()).run();
	async function g() {
		let n = Sn.find((e) => !e.busy);
		if (n) return Pn(n), new sn(n, e, t, _);
		if (Sn.length < p) {
			let n = { indexWorker: En };
			return En++, Sn.push(n), new sn(n, e, t, _);
		}
		return new Promise((n) => {
			Cn.push({
				resolve: n,
				stream: e,
				workerOptions: t
			}), Tn = r.workerStarvationTimeout, kn();
		});
	}
	function _(e) {
		if (An(), Cn.length) {
			let [{ resolve: t, stream: n, workerOptions: r }] = Cn.splice(0, 1);
			t(new sn(e, n, r, _)), kn();
		} else e.worker ? (Pn(e), Nn(e, t)) : Sn = Sn.filter((t) => t != e);
	}
}
function On(e, t) {
	try {
		return new URL(e, t).toString();
	} catch {
		return e;
	}
}
function kn() {
	!wn && Cn.length && Number.isFinite(Tn) && Tn >= 0 && (wn = setTimeout(jn, Tn));
}
function An() {
	wn &&= (clearTimeout(wn), null);
}
function jn() {
	if (wn = null, Cn.length) {
		let [{ resolve: e, stream: t, workerOptions: n }] = Cn.splice(0, 1);
		e(new sn({}, t, Object.assign({}, n, {
			useWebWorkers: !1,
			workerURI: void 0
		}), Mn)), kn();
	}
}
function Mn() {
	An(), kn();
}
function Nn(e, t) {
	let { config: n } = t, { terminateWorkerTimeout: r } = n;
	Number.isFinite(r) && r >= 0 && (e.terminated ? e.terminated = !1 : e.terminateTimeout = setTimeout(async () => {
		Sn = Sn.filter((t) => t != e);
		try {
			await e.terminate();
		} catch {}
	}, r));
}
function Pn(e) {
	let { terminateTimeout: t } = e;
	t && (clearTimeout(t), e.terminateTimeout = null);
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/io.js
var Fn = "Writer iterator completed too soon", In = "text/plain", Ln = "Content-Type", Rn = "writable", zn = Symbol(), Bn = class {
	constructor() {
		this.size = 0;
	}
	init() {
		this.initialized = !0;
	}
}, Vn = class extends Bn {
	get readable() {
		return this.createReadable();
	}
	createReadable({ offset: e = 0, size: t, chunkSize: n = M(j()) } = {}) {
		let r = this, i = 0;
		return new ReadableStream({ async pull(a) {
			let o = t === void 0 ? n : Math.min(n, t - i), s = await W(r, e + i, o);
			a.enqueue(s), i + n > t || t === void 0 && !s.length && o ? a.close() : i += n;
		} });
	}
}, Hn, Un;
function Wn() {
	Un = (async () => {
		try {
			let e = new Blob([/* @__PURE__ */ new Uint8Array(3)]).slice(1, 2).stream().getReader(), t = 0, n = await e.read();
			for (; !n.done;) t += n.value.length, n = await e.read();
			Hn = t == 1;
		} catch {
			Hn = !1;
		}
	})();
}
var Gn = class extends Vn {
	constructor(e) {
		super(), Object.assign(this, {
			blob: e,
			size: e.size
		}), Un || Wn();
	}
	createReadable(e) {
		let { blob: t, size: n } = this, { offset: r = 0, size: i = n - r } = e || {};
		return !r && i >= n ? vt(t.stream()) : Hn ? vt(t.slice(r, r + i).stream()) : super.createReadable(e);
	}
	async readUint8Array(e, t) {
		let n = this, r = e + t, i = await (!e && r >= n.size ? n.blob : n.blob.slice(e, r)).arrayBuffer();
		return i.byteLength > t && (i = i.slice(e, r)), new Uint8Array(i);
	}
};
function Kn() {
	return typeof Blob.prototype.stream != "function" || new Blob([]).stream() instanceof ReadableStream;
}
var qn = class extends Bn {
	constructor(e) {
		super();
		let t = this, n = new TransformStream();
		if (Object.defineProperty(t, Rn, { get() {
			return n.writable;
		} }), Kn()) {
			let r = [];
			e && r.push([Ln, e]), t.blob = new Response(n.readable, { headers: r }).blob();
		} else {
			let r = [];
			t.blob = n.readable.pipeTo(new WritableStream({ write(e) {
				r.push(e);
			} })).then(() => new Blob(r, { type: e }));
		}
		t.blob.catch(() => {});
	}
	getData() {
		return this.blob;
	}
}, Jn = class extends Gn {
	constructor(e) {
		super(new Blob([e], { type: In }));
	}
}, Yn = class extends Vn {
	constructor(e) {
		super(), this.readers = e;
	}
	async init() {
		let e = this, { readers: t } = e;
		e.lastDiskNumber = 0, await Promise.all(t.map((e) => $n(e))), e.diskOffsets = t.map((t) => {
			let n = e.size;
			return e.size += t.size, n;
		}), super.init();
	}
	getDiskOffset(e) {
		let { diskOffsets: t, size: n } = this, r = t[e];
		return r === void 0 ? n : r;
	}
	async readUint8Array(e, t) {
		let n = this, { readers: r } = this, i, a = 0, o = e;
		for (; r[a] && o >= r[a].size;) o -= r[a].size, a++;
		let s = r[a];
		if (s) {
			let r = s.size;
			if (o + t <= r) i = await W(s, o, t);
			else {
				let a = r - o;
				i = me(await W(s, o, a), await n.readUint8Array(e + a, t - a));
			}
		} else i = T;
		return n.lastDiskNumber = Math.max(a, n.lastDiskNumber), i;
	}
}, Xn = class extends Bn {
	constructor(e, t = 4294967295) {
		super();
		let n = this;
		Object.assign(n, {
			diskNumber: 0,
			diskOffset: 0,
			size: 0,
			maxSize: t,
			availableSize: t
		});
		let r, i, a, o = new WritableStream({
			async write(t) {
				if (t === zn) {
					a && await c();
					return;
				}
				let { availableSize: o } = n;
				if (a) t.length >= o ? (await s(t.subarray(0, o)), await c(), t.length > o && await this.write(t.subarray(o))) : await s(t);
				else {
					let { value: o, done: s } = await e.next();
					if (s && !o) throw Error(Fn);
					r = o, r.size = 0, r.maxSize && (n.maxSize = r.maxSize), n.availableSize = n.maxSize, await $n(r), i = o.writable, a = i.getWriter(), await this.write(t);
				}
			},
			async close() {
				a && (await a.ready, await l());
			},
			async abort(e) {
				a && await a.abort(e);
			}
		});
		Object.defineProperty(n, Rn, { get() {
			return o;
		} });
		async function s(e) {
			let t = e.length;
			t && (await a.ready, await a.write(e), r.size += t, n.availableSize -= t);
		}
		async function c() {
			await l(), n.diskOffset += r.size, n.diskNumber++, a = null, n.availableSize = n.maxSize;
		}
		async function l() {
			await a.close();
		}
	}
	async closeDisk() {
		let e = this.writable.getWriter();
		try {
			await e.ready, await e.write(zn);
		} finally {
			e.releaseLock();
		}
	}
}, Zn = class {
	constructor(e) {
		return Array.isArray(e) && (e = new Yn(e)), (e instanceof ReadableStream || typeof e.getReader == "function") && (e = { readable: vt(e) }), e;
	}
}, Qn = class {
	constructor(e) {
		return e.writable === void 0 && typeof e.next == "function" && (e = new Xn(e)), (e instanceof WritableStream || typeof e.getWriter == "function") && (e = { writable: yt(e) }), e.size === void 0 && (e.size = 0), e;
	}
};
async function $n(e, t) {
	if (e.init && !e.initialized) await e.init(t);
	else return Promise.resolve();
}
function W(e, t, n) {
	return e.readUint8Array(t, n);
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/util/decode-cp437.js
var er = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■\xA0".split(""), tr = er.length == 256;
function nr(e) {
	if (tr) {
		let t = "";
		for (let n = 0; n < e.length; n++) t += er[e[n]];
		return t;
	}
	return new TextDecoder().decode(e);
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/util/decode-text.js
function rr(e, t) {
	return t && t.trim().toLowerCase() == "cp437" ? nr(e) : new TextDecoder(t, { ignoreBOM: !0 }).decode(e);
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/zip-entry.js
var ir = "filename", ar = "rawFilename", or = "comment", sr = "rawComment", cr = "uncompressedSize", lr = "compressedSize", ur = "offset", dr = "diskNumberStart", fr = "lastModDate", pr = "rawLastModDate", mr = "lastAccessDate", hr = "rawLastAccessDate", gr = "creationDate", _r = "rawCreationDate", vr = "internalFileAttributes", yr = "externalFileAttributes", br = "msdosAttributesRaw", xr = "msdosAttributes", Sr = "msDosCompatible", Cr = "zip64", wr = "encrypted", Tr = "version", Er = "versionMadeBy", Dr = "zipCrypto", Or = "directory", kr = "executable", Ar = "compressionMethod", jr = "signature", Mr = "extraField", Nr = "extraFieldInfoZip", Pr = "extraFieldUnix", Fr = "unixMode", Ir = "setuid", Lr = "setgid", Rr = "sticky", zr = [
	ir,
	ar,
	cr,
	lr,
	fr,
	pr,
	or,
	sr,
	mr,
	gr,
	_r,
	ur,
	dr,
	vr,
	yr,
	br,
	xr,
	Sr,
	Cr,
	wr,
	Tr,
	Er,
	Dr,
	Or,
	kr,
	Ar,
	jr,
	Mr,
	Pr,
	Nr,
	"uid",
	"gid",
	Fr,
	Ir,
	Lr,
	Rr,
	"bitFlag",
	"filenameUTF8",
	"commentUTF8",
	"rawExtraField",
	"extraFieldZip64",
	"extraFieldUnicodePath",
	"extraFieldUnicodeComment",
	"extraFieldAES",
	"extraFieldNTFS",
	"extraFieldExtendedTimestamp"
], Br = class {
	constructor(e) {
		zr.forEach((t) => this[t] = e[t]);
	}
}, Vr = "filenameEncoding", Hr = "commentEncoding", Ur = "extractPrependedData", Wr = "extractAppendedData", Gr = "password", Kr = "rawPassword", qr = "passThrough", Jr = "signal", Yr = "checkPasswordOnly", Xr = "checkOverlappingEntryOnly", Zr = "checkOverlappingEntry", Qr = "checkAmbiguity", $r = "useWebWorkers", ei = "useCompressionStream", ti = "transferStreams", ni = "encryptionStrength", ri = "extendedTimestamp", ii = "ntfsTimestamp", ai = "keepOrder", oi = "level", si = "bufferedWrite", ci = "createTempStream", li = "dataDescriptorSignature", ui = "useUnicodeFileNames", di = "dataDescriptor", fi = "encodeText", pi = "offset", mi = "usdz", hi = "unixExtraFieldType", gi = "strictness", _i = "maxAppendedDataSize", vi = "strict", yi = "balanced", bi = "tolerant", xi = "File format is not recognized", Si = "End of central directory not found", Ci = "End of Zip64 central directory locator not found", wi = "Central directory header not found", Ti = "Local file header not found", Ei = "Zip64 extra field not found", Di = "File contains encrypted entry", Oi = "Encryption method not supported", ki = "Compression method not supported", Ai = "Split zip file", ji = "Overlapping entry found", Mi = "Ambiguous archive", Ni = "Encrypted central directory is not supported", Pi = "utf-8", Fi = "UTF8", Ii = "cp437", Li = 9 | h, Ri = [
	[cr, e],
	[lr, e],
	[ur, e],
	[dr, t]
], zi = {
	[t]: {
		getValue: J,
		bytes: 4
	},
	[e]: {
		getValue: ga,
		bytes: 8
	}
}, Bi = class {
	constructor(e, t = {}) {
		Object.assign(this, {
			reader: new Zn(e),
			options: t,
			config: j(),
			readRanges: /* @__PURE__ */ new Map()
		});
	}
	async *getEntriesGenerator(e = {}) {
		let n = this, { reader: r } = n, { config: a } = n;
		if (await $n(r), r.size !== void 0 && r.readUint8Array || (r = new Gn(await new Response(r.readable).blob()), await $n(r)), r.size < 22) throw Error(xi);
		let o = ea(K(n, e, gi), K(n, e, Qr)), s = o == vi, c = o != bi, l = ta(K(n, e, _i), o), { endOfDirectoryInfo: u, endOfDirectoryReachingEndCount: d } = await oa(r, c, l);
		if (!u) throw J(V(await W(r, 0, 4))) == 134695760 ? Error(Ai) : Error(Si);
		c && d > 1 && G("multiple end of central directory records");
		let f = V(u), p = J(f, 12), m = J(f, 16), h = u.offset, b = q(f, 20), x = h + 22 + b;
		r.size - x > l && G("appended data");
		let S = q(f, 4), C = r.lastDiskNumber || 0, w = q(f, 6), E = q(f, 10), D = 0, O, k, A, j = m == 4294967295 || p == 4294967295 || E == 65535 || w == 65535;
		if (m != 4294967295 && w != 65535 && (m += $i(r, w)), j) {
			let e = u.offset >= 20 ? await W(r, u.offset - 20, 20) : T, t = V(e);
			if (e.length == 20 && J(t, 0) == 117853008) {
				m = $i(r, J(t, 4)) + ga(t, 8);
				let e = await W(r, m, 56), n = V(e), i = u.offset - 20 - 56;
				if ((e.length < 56 || J(n, 0) != 101075792) && m != i && i >= 0) {
					let t = m;
					m = i, m > t && (D = m - t), e = await W(r, m, 56), n = V(e);
				}
				if (e.length < 56 || J(n, 0) != 101075792) throw Error(Ci);
				k = !0, A = ga(n, 4) > 44, S == 65535 ? S = J(n, 16) : s && S != J(n, 16) && G("mismatched zip64 end of central directory record"), w == 65535 ? w = J(n, 20) : s && w != J(n, 20) && G("mismatched zip64 end of central directory record"), E == 65535 ? E = ga(n, 32) : s && E != ga(n, 32) && G("mismatched zip64 end of central directory record"), p == 4294967295 ? p = ga(n, 40) : s && p != ga(n, 40) && G("mismatched zip64 end of central directory record"), m = $i(r, w) + ga(n, 48) + D;
			}
		}
		let M = p, N = u.offset - (k ? 76 : 0);
		if (m >= r.size && (D = r.size - m - p - 22, m = r.size - p - 22), C != S) throw Error(Ai);
		if (m < 0) throw Error(xi);
		let P = 0, F = await W(r, m, p), I = V(F);
		if (p) {
			if (F.length < 4) throw Error(xi);
			let e = N - p;
			if (m != e && w == S) {
				let t = J(I, P) != i;
				if (!t && e >= 0 && e + 4 <= r.size && (t = J(V(await W(r, e, 4)), 0) == i), t) {
					let t = m;
					m = e, m > t && (D += m - t), F = await W(r, m, p), I = V(F);
				}
			}
		}
		let L = N - m;
		if (p != L && L >= 0 && w == S && (p = L, F = await W(r, m, p), I = V(F)), m < 0 || m >= r.size) throw Error(xi);
		O = m;
		let ee = K(n, e, Vr), te = K(n, e, Hr), ne = s ? /* @__PURE__ */ new Set() : void 0, re;
		for (let i = 0; i < E; i++) {
			let o = new Vi(r, a, n.options);
			if (P + 46 > F.length || J(I, P) != 33639248) throw i == 0 && (A || Hi(I)) ? Error(Ni) : Error(wi);
			Ui(o, I, P + 6);
			let c = !!o.bitFlag.languageEncodingFlag, l = P + 46, u = l + o.filenameLength, d = u + o.extraFieldLength, f = q(I, P + 4), p = !(f >> 8), m = f >> 8 == 3, h = F.subarray(l, u), b = q(I, P + 32), x = d + b, S = F.subarray(d, x), C = c, w = c, T = J(I, P + 38), k = T & 255, j = {
				readOnly: !!(k & 1),
				hidden: !!(k & 2),
				system: !!(k & 4),
				directory: !!(k & 16),
				archive: !!(k & 32)
			}, M = J(I, P + 42), N = K(n, e, "decodeText") || rr, L = C ? Pi : ee || Ii, R = w ? Pi : te || Ii, z = N(h, L);
			z === void 0 && (z = rr(h, L));
			let ie = N(S, R);
			ie === void 0 && (ie = rr(S, R)), Object.assign(o, {
				index: i,
				versionMadeBy: f,
				msDosCompatible: p,
				compressedSize: 0,
				uncompressedSize: 0,
				commentLength: b,
				offset: M,
				diskNumberStart: q(I, P + 34),
				internalFileAttributes: q(I, P + 36),
				externalFileAttributes: T,
				msdosAttributesRaw: k,
				msdosAttributes: j,
				rawFilename: h,
				filenameUTF8: C,
				commentUTF8: w,
				rawExtraField: F.subarray(u, d),
				rawComment: S,
				filename: z,
				comment: ie
			}), Wi(o, o, I, P + 6), o.offset += D, O = Math.min($i(r, o.diskNumberStart) + o.offset, O), s && (ne.has(o.filename) && (re = !0), ne.add(o.filename));
			let ae = o.externalFileAttributes >> 16 & t;
			o.unixMode === void 0 && ae & 16877 && (o.unixMode = ae);
			let oe = !!(o.unixMode & v), B = !!(o.unixMode & y), se = !!(o.unixMode & 512), ce = o.unixMode === void 0 ? m && !!(ae & 73) : !!(o.unixMode & 73), le = o.unixMode !== void 0 && (o.unixMode & 61440) == 16384, ue = (ae & g) == _;
			Object.assign(o, {
				setuid: oe,
				setgid: B,
				sticky: se,
				unixExternalUpper: ae,
				internalFileAttribute: o.internalFileAttributes,
				externalFileAttribute: o.externalFileAttributes,
				executable: ce,
				directory: le || ue || p && j.directory || o.filename.endsWith("/") && !o.uncompressedSize,
				zipCrypto: o.encrypted && !o.extraFieldAES
			});
			let de = new Br(o);
			de.getData = (e, t) => o.getData(e, de, n.readRanges, t), de.arrayBuffer = async (e) => {
				let t = new TransformStream(), [r] = await Promise.all([new Response(t.readable).arrayBuffer(), o.getData(t, de, n.readRanges, e)]);
				return r;
			}, P = x;
			let { onprogress: fe } = e;
			if (fe) try {
				await fe(i + 1, E, new Br(o));
			} catch {}
			yield de;
		}
		s && P != M && G("trailing central directory data"), re && G("duplicate filename"), s && (D || E && O > 0) && G("prepended data");
		let R = K(n, e, Ur), z = K(n, e, Wr);
		return R && (n.prependedData = O > 0 ? await W(r, 0, O) : T), n.comment = b ? await W(r, h + 22, b) : T, z && (n.appendedData = x < r.size ? await W(r, x, r.size - x) : T), !0;
	}
	async getEntries(e = {}) {
		let t = [];
		for await (let n of this.getEntriesGenerator(e)) t.push(n);
		return t;
	}
	async close() {}
}, Vi = class {
	constructor(e, t, n) {
		Object.assign(this, {
			reader: e,
			config: t,
			options: n
		});
	}
	async getData(e, t, n, r = {}) {
		let i = this, { reader: a, index: o, offset: s, diskNumberStart: c, extraFieldAES: l, extraFieldZip64: u, compressionMethod: d, config: f, bitFlag: p, rawBitFlag: m, signature: h, rawLastModDate: g, uncompressedSize: _, compressedSize: v } = i, { dataDescriptor: y } = p, b = t.localDirectory = {}, x = $i(a, c) + s, S = await W(a, x, 30), C = V(S), w = K(i, r, Gr), E = K(i, r, Kr), D = K(i, r, qr);
		if (w = w && w.length && w, E = E && E.length && E, l && l.originalCompressionMethod != 99) throw Error(ki);
		if (S.length < 30 || J(C, 0) != 67324752) throw Error(Ti);
		Ui(b, C, 4);
		let { extraFieldLength: O, filenameLength: k } = b, A = ea(K(i, r, gi), K(i, r, Qr)) == vi, j = T;
		if (A && (k || O)) {
			let e = await W(a, x + 30, k + O);
			j = e.subarray(0, k), b.rawExtraField = e.subarray(k);
		} else b.rawExtraField = O ? await W(a, x + 30 + k, O) : T;
		Wi(i, b, C, 4, !0), A && fa(i, b, j);
		let { lastAccessDate: M, creationDate: N } = b;
		M && (t.lastAccessDate = M), N && (t.creationDate = N);
		let P = i.encrypted && b.encrypted && !D, F = P && !l;
		if (D || (t.zipCrypto = F), P && (b.rawBitFlag & 64) == 64) throw Error(Oi);
		let I = D ? void 0 : te(d);
		if (d != 0 && d != 8 && d != 9 && !I && !D) throw Error(ki);
		if (P) {
			if (!F && (l.strength < 1 || l.strength > 3)) throw Error(Oi);
			if (!w && !E) throw Error(Di);
		}
		let L = x + 30 + k + O, ee = v, ne = vt(a.createReadable({
			offset: L,
			size: ee
		})), re = K(i, r, Jr), R = K(i, r, Yr), z = K(i, r, Zr), ie = K(i, r, Xr);
		ie && (z = !0);
		let { onstart: ae, onprogress: oe, onend: B } = r, se = d == 9, ce = K(i, r, ei);
		se && (ce = !1);
		let le = {
			options: {
				codecType: Kt,
				password: w,
				rawPassword: E,
				zipCrypto: F,
				encryptionStrength: l && l.strength,
				signed: K(i, r, "checkSignature") && !D,
				passwordVerification: F && (y ? g >>> 8 & 255 : h >>> 24 & 255),
				outputSize: D ? v : _,
				signature: h,
				compressed: d != 0 && !D,
				encrypted: P,
				useWebWorkers: K(i, r, $r),
				useCompressionStream: ce,
				transferStreams: K(i, r, ti),
				deflate64: se,
				format: I ? I.format : void 0,
				codecURI: I ? I.codecURI : void 0,
				compressionMethod: d,
				rawBitFlag: m,
				checkPasswordOnly: R
			},
			config: f,
			streamOptions: {
				signal: re,
				size: ee,
				onstart: ae,
				onprogress: oe,
				onend: B
			}
		};
		z && await Qi({
			reader: a,
			fileEntry: t,
			index: o,
			offset: x,
			signature: h,
			compressedSize: v,
			uncompressedSize: _,
			dataOffset: L,
			dataDescriptor: y || b.bitFlag.dataDescriptor,
			extraFieldZip64: u || b.extraFieldZip64,
			readRanges: n
		});
		let ue;
		try {
			if (!ie) {
				R && (e = new WritableStream()), e = new Qn(e), await $n(e, D ? v : _), {writable: ue} = e;
				let { outputSize: t } = await Dn({
					readable: ne,
					writable: ue
				}, le);
				if (e.size += t, t != (D ? v : _)) throw Error(bt);
			}
		} catch (t) {
			if (t.outputSize !== void 0 && (e.size += t.outputSize), !R || t.message != "zipjs-abort-check-password") throw t;
		} finally {
			!K(i, r, "preventClose") && ue && !ue.locked && await ue.getWriter().close();
		}
		return R || ie ? void 0 : e.getData ? e.getData() : ue;
	}
};
function Hi(e) {
	let t = Math.min(e.byteLength, 1024) - 3;
	for (let n = 0; n < t; n++) if (J(e, n) == 134630224) return !0;
	return !1;
}
function Ui(e, t, n) {
	let r = e.rawBitFlag = q(t, n + 2), i = (r & 1) == 1, a = J(t, n + 6);
	Object.assign(e, {
		encrypted: i,
		version: q(t, n),
		bitFlag: {
			level: (r & 6) >> 1,
			dataDescriptor: (r & 8) == 8,
			languageEncodingFlag: (r & h) == h
		},
		rawLastModDate: a,
		lastModDate: pa(a),
		filenameLength: q(t, n + 22),
		extraFieldLength: q(t, n + 24)
	});
}
function Wi(e, t, n, r, i) {
	let { rawExtraField: a } = t, o = t.extraField = /* @__PURE__ */ new Map(), s = V(a), h = 0;
	try {
		for (; h < a.length;) {
			let e = q(s, h), t = q(s, h + 2);
			o.set(e, {
				type: e,
				data: a.slice(h + 4, h + 4 + t)
			}), h += 4 + t;
		}
	} catch {}
	let g = q(n, r + 4);
	Object.assign(t, {
		signature: J(n, r + 10),
		compressedSize: J(n, r + 14),
		uncompressedSize: J(n, r + 18)
	});
	let _ = o.get(1);
	_ && (Gi(_, t), t.extraFieldZip64 = _);
	let v = o.get(u);
	v && (Ki(v, ir, ar, t, e), t.extraFieldUnicodePath = v);
	let y = o.get(d);
	y && (Ki(y, or, sr, t, e), t.extraFieldUnicodeComment = y);
	let b = o.get(c);
	b && b.data.length >= 7 ? (qi(b, t, g), t.extraFieldAES = b) : t.compressionMethod = g;
	let x = o.get(10);
	x && (Ji(x, t), t.extraFieldNTFS = x);
	let S = o.get(m);
	if (S) Yi(S, t, !1), t.extraFieldUnix = S;
	else {
		let e = o.get(p);
		e && (Yi(e, t, !0), t.extraFieldInfoZip = e);
	}
	let C = o.get(l);
	C && (Zi(C, t, i), t.extraFieldExtendedTimestamp = C);
	let w = o.get(f);
	w && (t.extraFieldUSDZ = w);
}
function Gi(e, t) {
	t.zip64 = !0;
	let n = V(e.data), r = Ri.filter(([e, n]) => t[e] == n), i = r.reduce((e, [, t]) => e + zi[t].bytes, 0);
	if (e.data.length < i) throw Error(Ei);
	for (let i = 0, a = 0; i < r.length; i++) {
		let [o, s] = r[i], c = zi[s];
		t[o] = e[o] = c.getValue(n, a), a += c.bytes;
	}
}
function Ki(e, t, n, r, i) {
	if (e.data.length < 5) {
		e.valid = !1;
		return;
	}
	let a = V(e.data), o = new de();
	o.append(i[n]);
	let s = V(/* @__PURE__ */ new Uint8Array(4));
	s.setUint32(0, o.get(), !0);
	let c = J(a, 1);
	Object.assign(e, {
		version: ha(a, 0),
		[t]: rr(e.data.subarray(5)),
		valid: !i.bitFlag.languageEncodingFlag && c == J(s, 0)
	}), e.valid && (r[t] = e[t], r[t + Fi] = !0);
}
function qi(e, t, n) {
	let r = V(e.data), i = ha(r, 4);
	Object.assign(e, {
		vendorVersion: ha(r, 0),
		vendorId: ha(r, 2),
		strength: i,
		originalCompressionMethod: n,
		compressionMethod: q(r, 5)
	}), t.compressionMethod = e.compressionMethod;
}
function Ji(e, t) {
	let n = V(e.data), r = 4, i;
	try {
		for (; r < e.data.length && !i;) {
			let t = q(n, r), a = q(n, r + 2);
			t == 1 && (i = e.data.slice(r + 4, r + 4 + a)), r += 4 + a;
		}
	} catch {}
	try {
		if (i && i.length == 24) {
			let n = V(i), r = n.getBigUint64(0, !0), a = n.getBigUint64(8, !0), o = n.getBigUint64(16, !0);
			Object.assign(e, {
				rawLastModDate: r,
				rawLastAccessDate: a,
				rawCreationDate: o
			});
			let s = {
				lastModDate: ma(r),
				lastAccessDate: ma(a),
				creationDate: ma(o)
			};
			Object.assign(e, s), Object.assign(t, s);
		}
	} catch {}
}
function Yi(e, t, n) {
	try {
		let r = V(e.data), i, a;
		if (n) {
			let t = 0, n = ha(r, t++), o = ha(r, t++);
			i = Xi(e.data.subarray(t, t + o)), t += o;
			let s = ha(r, t++);
			a = Xi(e.data.subarray(t, t + s)), Object.assign(e, {
				version: n,
				uid: i,
				gid: a
			});
		} else e.data.length >= 4 && (i = q(r, 0), a = q(r, 2), Object.assign(e, {
			uid: i,
			gid: a
		}));
		i !== void 0 && (t.uid = i), a !== void 0 && (t.gid = a);
	} catch {}
}
function Xi(e) {
	let t = /* @__PURE__ */ new Uint8Array(4);
	return t.set(e, 0), new DataView(t.buffer, t.byteOffset, 4).getUint32(0, !0);
}
function Zi(e, t, n) {
	if (!e.data.length) return;
	let r = V(e.data), i = ha(r, 0), a = [], o = [];
	n ? ((i & 1) == 1 && (a.push(fr), o.push(pr)), (i & 2) == 2 && (a.push(mr), o.push(hr)), (i & 4) == 4 && (a.push(gr), o.push(_r))) : e.data.length >= 5 && (a.push(fr), o.push(pr));
	let s = 1;
	a.forEach((n, i) => {
		if (e.data.length >= s + 4) {
			let a = J(r, s);
			t[n] = e[n] = /* @__PURE__ */ new Date((a | 0) * 1e3);
			let c = o[i];
			e[c] = a;
		}
		s += 4;
	});
}
async function Qi({ reader: e, fileEntry: t, index: n, offset: r, signature: i, compressedSize: a, uncompressedSize: o, dataOffset: s, dataDescriptor: c, extraFieldZip64: l, readRanges: u }) {
	let d = 0;
	if (c && (d = l ? 20 : 12), d) {
		let n = await W(e, s + a, d + 4);
		if (n.length == d + 4 && J(V(n), 0) == 134695760) {
			let e = J(V(n), 4), r, s;
			l ? (r = ga(V(n), 8), s = ga(V(n), 16)) : (r = J(V(n), 8), s = J(V(n), 12)), (t.encrypted && !t.zipCrypto || e == i) && r == a && s == o && (d += 4);
		}
	}
	let f = {
		start: r,
		end: s + a + d,
		fileEntry: t
	};
	for (let [e, t] of u) if (e != n && f.start < t.end && t.start < f.end) {
		let e = /* @__PURE__ */ Error(ji);
		throw e.overlappingEntry = t.fileEntry, e;
	}
	u.set(n, f);
}
function $i(e, t) {
	return e.getDiskOffset ? e.getDiskOffset(t) : 0;
}
function ea(e, t) {
	return e === void 0 ? t ? vi : yi : e;
}
function ta(e, n) {
	return e === void 0 ? n == "strict" ? 0 : n == "tolerant" ? Infinity : t : e;
}
var na = 64, ra = 0, ia = 1, aa = 2;
async function oa(e, n, r) {
	let { size: i } = e, a = Math.min(i, 22 + t), o = { count: na }, s, c, l = 0;
	for await (let [t, r, u, d, f] of ca(e, a)) {
		let a = q(t, d + 20);
		if (f + 22 + a == i) {
			let a = await ua(e, t, r, d, f, i, o);
			if (a == aa) {
				if (s ||= la(u, d, f), l++, !n || l > 1) break;
			} else a == ia && !c && (c = la(u, d, f));
		}
	}
	return s ||= c, s ||= await sa(e, r, o), {
		endOfDirectoryInfo: s,
		endOfDirectoryReachingEndCount: l
	};
}
async function sa(e, n, r) {
	let { size: i } = e, a = Math.min(i, n == Infinity ? i : 22 + t + n), o, s;
	for await (let [t, n, c, l, u] of ca(e, a)) {
		let a = la(c, l, u);
		o ||= a;
		let d = await ua(e, t, n, l, u, i, r);
		if (d == aa) return a;
		d == ia && !s && (s = a);
	}
	return s || o;
}
async function* ca(e, t) {
	let n = e.size - t, r = await W(e, n, t), i = V(r);
	for (let e = r.length - 22; e >= 0; e--) J(i, e) == 101010256 && (yield [
		i,
		n,
		r,
		e,
		n + e
	]);
}
function la(e, t, n) {
	return {
		offset: n,
		buffer: e.slice(t, t + 22).buffer
	};
}
async function ua(e, t, n, r, i, a, o) {
	let s = q(t, r + 10), c = J(t, r + 12), l = J(t, r + 16);
	if (s == 65535 || c == 4294967295 || l == 4294967295) return await da(e, t, n, i - 20, a, o) == 117853008 ? aa : ra;
	if (!s && !c) return ia;
	let u = q(t, r + 6);
	for (let r of [i - c, $i(e, u) + l]) if (await da(e, t, n, r, a, o) == 33639248) return aa;
	return ra;
}
async function da(e, t, n, r, i, a) {
	if (!(r < 0 || r + 4 > i)) {
		if (r >= n) return J(t, r - n);
		if (a.count > 0) return a.count--, J(V(await W(e, r, 4)), 0);
	}
}
function fa(e, t, n) {
	let { rawFilename: r } = e;
	(n.length != r.length || n.some((e, t) => e != r[t])) && G("mismatched local file header (filename)"), (t.rawBitFlag & Li) != (e.rawBitFlag & Li) && G("mismatched local file header (general purpose bit flag)"), t.compressionMethod != e.compressionMethod && G("mismatched local file header (compression method)"), !t.bitFlag.dataDescriptor && (t.signature || t.compressedSize || t.uncompressedSize) && (t.signature != e.signature || t.compressedSize != e.compressedSize || t.uncompressedSize != e.uncompressedSize) && G("mismatched local file header (signature or sizes)");
}
function G(e) {
	let t = /* @__PURE__ */ Error(Mi);
	throw t.reason = e, t;
}
function K(e, t, n) {
	return t[n] === void 0 ? e.options[n] : t[n];
}
function pa(e) {
	let n = (e & 4294901760) >> 16, r = e & t;
	try {
		return new Date(1980 + ((n & 65024) >> 9), ((n & 480) >> 5) - 1, n & 31, (r & 63488) >> 11, (r & 2016) >> 5, (r & 31) * 2, 0);
	} catch {}
}
function ma(e) {
	return new Date(Number(e / BigInt(1e4) - BigInt(0xa9730b66800)));
}
function ha(e, t) {
	return e.getUint8(t);
}
function q(e, t) {
	return e.getUint16(t, !0);
}
function J(e, t) {
	return e.getUint32(t, !0);
}
function ga(e, t) {
	return Number(e.getBigUint64(t, !0));
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/zip-writer.js
var _a = "File already exists", va = "Zip file comment exceeds 64KB", ya = "File entry comment exceeds 64KB", ba = "File entry name exceeds 64KB", xa = "Version exceeds 65535", Sa = "The strength must equal 1, 2, or 3", Ca = "Encryption is not supported in USDZ files", wa = "Extra field type exceeds 65535", Ta = "Extra field data exceeds 64KB", Ea = "Compression method not supported", Da = -2147483648, Oa = 2147483647, ka = "Zip64 is not supported (set the 'zip64' option to 'true')", Aa = "Undefined uncompressed size", ja = "Undefined reader", Ma = "Zip file not empty", Na = "Invalid uid (must be integer 0..2^32-1)", Pa = "Invalid gid (must be integer 0..2^32-1)", Fa = "Invalid UNIX mode (must be integer 0..65535)", Ia = "Invalid unixExtraFieldType (must be 'infozip' or 'unix')", La = "uid/gid must be 0..65535 for unixExtraFieldType 'unix' (use 'infozip' for larger ids)", Ra = "Invalid msdosAttributesRaw (must be integer 0..255)", za = "Invalid msdosAttributes (must be an object with boolean flags)", Ba = new Uint8Array([
	7,
	0,
	2,
	0,
	65,
	69,
	3,
	0,
	0
]), Va = "infozip", Ha = "unix", Ua = 0, Wa = [], Ga = class {
	constructor(e, t = {}) {
		e = new Qn(e);
		let { availableSize: n = S, maxSize: r = S } = e, i = n > 0 && n !== Infinity && r > 0 && r !== Infinity;
		Object.assign(this, {
			writer: e,
			addSplitZipSignature: i,
			options: t,
			config: j(),
			files: /* @__PURE__ */ new Map(),
			filenames: /* @__PURE__ */ new Set(),
			offset: t.offset === void 0 ? e.size || e.writable.size || 0 : t[pi],
			initialOffset: t.offset === void 0 ? 0 : t[pi] - (e.size || e.writable.size || 0),
			pendingAddFileCalls: /* @__PURE__ */ new Set(),
			bufferedWrites: 0,
			lastFileEntry: void 0
		});
	}
	async prependZip(e) {
		if (this.filenames.size) throw Error(Ma);
		e = new Zn(e), await $n(e);
		let { ZipReader: t } = await import("./zip-reader-7f4UcMkF.js"), n = new t(e.readable), r = await n.getEntries();
		await n.close(), await $n(this.writer), await e.readable.pipeTo(this.writer.writable, {
			preventClose: !0,
			preventAbort: !0
		}), this.writer.size = this.offset = e.size, this.filenames = new Set(r.map((e) => e.filename)), this.files = new Map(r.map((e) => {
			let { version: t, rawLastModDate: n, lastAccessDate: r, creationDate: i, rawFilename: a, bitFlag: o, encrypted: s, uncompressedSize: c, compressedSize: l, zip64: u } = e, { compressionMethod: d, rawExtraFieldZip64: f, rawExtraFieldAES: p, rawExtraFieldExtendedTimestamp: m, rawExtraFieldNTFS: h, rawExtraFieldUnix: g, rawExtraField: _ } = e, { level: v, languageEncodingFlag: y, dataDescriptor: b } = o;
			f ||= T, p ||= T, m ||= T, h ||= T, g ||= T, _ ||= T, e.extraFieldAES && (d = 99);
			let x = Z(f, p, m, h, g, _), S = u && c >= 4294967295, C = u && l >= 4294967295, { headerArray: w, headerView: E } = Eo({
				version: t,
				bitFlag: Do(v, y, b, s, d) & -7 | v << 1,
				compressionMethod: d,
				uncompressedSize: c,
				compressedSize: l,
				rawLastModDate: n,
				rawFilename: a,
				zip64CompressedSize: C,
				zip64UncompressedSize: S,
				extraFieldLength: x
			}), { signature: D } = e;
			return D !== void 0 && X(E, 10, D), Object.assign(e, {
				zip64UncompressedSize: S,
				zip64CompressedSize: C,
				zip64Offset: u && e.offset >= 4294967295,
				diskNumberStart: 0,
				zip64DiskNumberStart: !1,
				rawExtraFieldZip64: f,
				rawExtraFieldAES: p,
				rawExtraFieldExtendedTimestamp: m,
				rawExtraFieldNTFS: h,
				rawExtraFieldUnix: g,
				rawExtraField: _,
				extendedTimestamp: m.length > 0 || h.length > 0,
				extraFieldExtendedTimestampFlag: 1 + (r ? 2 : 0) + (i ? 4 : 0),
				headerArray: w,
				headerView: E
			}), [e.filename, e];
		}));
	}
	async add(e = "", t, n = {}) {
		let r = this;
		n = Object.assign({}, n);
		let { pendingAddFileCalls: i, config: a } = r;
		Ua < a.maxWorkers ? Ua++ : await new Promise((e) => Wa.push(e));
		let o, s;
		try {
			if (e = e.trim(), Y(r, n, "directory") && !e.endsWith("/") && (e += "/"), r.filenames.has(e)) throw Error(_a);
			return r.filenames.add(e), s = !0, o = Ka(r, e, t, n), i.add(o), await o;
		} catch (t) {
			throw s && r.filenames.delete(e), t;
		} finally {
			i.delete(o);
			let e = Wa.shift();
			e ? e() : Ua--;
		}
	}
	remove(e) {
		let { filenames: t, files: n } = this;
		if (typeof e == "string" && (e = n.get(e)), e && e.filename !== void 0) {
			let { filename: r } = e;
			if (t.has(r) && n.has(r)) return t.delete(r), n.delete(r), !0;
		}
		return !1;
	}
	async close(e = T, t = {}) {
		let n = this, { pendingAddFileCalls: r, writer: i } = this, { writable: a } = i;
		if (Z(e) > 65535) throw Error(va);
		for (; r.size;) await Promise.allSettled(Array.from(r));
		return await ao(n, e, t), Y(n, t, "preventClose") || await a.getWriter().close(), i.getData ? i.getData() : a;
	}
};
async function Ka(e, t, n, r) {
	let i = qa(e, t, r);
	({name: t} = i);
	let a = Ja(e, t, r), { comment: o } = a, s = r[Mr];
	e.files.set(t, void 0);
	let c;
	try {
		let o = await Ya(e, n, a, r);
		({reader: n} = o);
		let s = fo(e.writer), l = uo(e.writer);
		r = Object.assign({}, r, i.resolvedOptions, a.resolvedOptions, o.resolvedOptions, {
			internalFileAttribute: a.resolvedOptions.internalFileAttributes,
			externalFileAttribute: i.resolvedOptions.externalFileAttributes,
			signature: r[jr],
			offset: e.offset - s,
			diskNumberStart: l
		});
		let u = Qa(r), d = no(r), f = Z(u.localHeaderArray, d.dataDescriptorArray);
		c = await Xa(e, t, n, {
			headerInfo: u,
			dataDescriptorInfo: d,
			metadataSize: f
		}, r);
	} catch (n) {
		throw e.files.delete(t), n;
	}
	return Object.assign(c, {
		name: t,
		comment: o,
		extraField: s
	}), new Br(c);
}
function qa(n, r, i) {
	r = r.trim();
	let a = Y(n, i, Sr), o = Y(n, i, Er, a ? 20 : 768), s = Y(n, i, kr), c = Y(n, i, "uid"), l = Y(n, i, "gid"), u = Y(n, i, Fr), d = Y(n, i, hi), f = Y(n, i, Ir), p = Y(n, i, Lr), m = Y(n, i, Rr);
	if (c !== void 0 && (c < 0 || c > 4294967295)) throw Error(Na);
	if (l !== void 0 && (l < 0 || l > 4294967295)) throw Error(Pa);
	if (u !== void 0 && (u < 0 || u > 65535)) throw Error(Fa);
	if (d !== void 0 && d !== Va && d !== Ha) throw Error(Ia);
	if (d === Ha && (c !== void 0 && c > 65535 || l !== void 0 && l > 65535)) throw Error(La);
	d === void 0 && (c !== void 0 || l !== void 0) && (d = Va);
	let h = Y(n, i, br), g = Y(n, i, xr), b = c !== void 0 || l !== void 0 || u !== void 0 || d, x = h !== void 0 || g !== void 0;
	if (b ? (a = !1, o = o & t | 768) : x && (a = !0, o &= 255), h !== void 0 && (h < 0 || h > 255)) throw Error(Ra);
	if (g && typeof g != "object") throw Error(za);
	if (o > 65535) throw Error(xa);
	let S = Y(n, i, yr), C = S !== void 0;
	C || (S = 0), !i.directory && r.endsWith("/") && (i[Or] = !0);
	let w = Y(n, i, Or);
	w ? (r.endsWith("/") || (r += "/"), C || (S = 16, a || (S |= (_ | 493) << 16))) : !a && !C && (S = s ? 493 << 16 : 420 << 16);
	let T;
	if (!a) {
		let e = u !== void 0 || !!(f || p || m);
		T = S >> 16 & t, u = u === void 0 ? T : u & t, f ? u |= v : f = !!(u & v), p ? u |= y : p = !!(u & y), m ? u |= 512 : m = !!(u & 512), (!C || e) && (w && (u |= _), S = (u & t) << 16 | S & t);
	}
	return {msdosAttributesRaw: h, msdosAttributes: g} = to(h, g), x && (S = S & e | h & 255), {
		name: r,
		resolvedOptions: {
			versionMadeBy: o,
			msDosCompatible: a,
			externalFileAttributes: S,
			unixExternalUpper: T,
			uid: c,
			gid: l,
			unixMode: u,
			unixExtraFieldType: d,
			setuid: f,
			setgid: p,
			sticky: m,
			msdosAttributesRaw: h,
			msdosAttributes: g
		}
	};
}
function Ja(e, t, n) {
	let r = Y(e, n, fi, pe), i = r(t);
	if (i === void 0 && (i = pe(t)), Z(i) > 65535) throw Error(ba);
	let a = n.comment || "", o = r(a);
	if (o === void 0 && (o = pe(a)), Z(o) > 65535) throw Error(ya);
	let s = Y(e, n, Tr, 20);
	if (s > 65535) throw Error(xa);
	let c = Y(e, n, fr, /* @__PURE__ */ new Date()), l = Y(e, n, mr), u = Y(e, n, gr), d = Y(e, n, vr, 0), f = Y(e, n, qr), p, m;
	f || (p = Y(e, n, Gr), m = Y(e, n, Kr));
	let h = Y(e, n, ni, 3), g = Y(e, n, Dr), _ = Y(e, n, ri, !0), v = Y(e, n, ii), y = Y(e, n, ai, !0), b = Y(e, n, $r), x = Y(e, n, ti), S = Y(e, n, si), C = Y(e, n, ci), w = Y(e, n, li, !0), E = Y(e, n, Jr), D = Y(e, n, ui, !0), O = Y(e, n, Ar), k = f || O === void 0 ? void 0 : te(O);
	if (!f && O !== void 0 && O !== 0 && O !== 8 && !k) throw Error(Ea);
	let A = Y(e, n, oi);
	if (e.options.usdz) {
		if (p !== void 0 || m !== void 0) throw Error(Ca);
		A === void 0 && O === void 0 && (A = 0);
	}
	let j = Y(e, n, ei), M = Y(e, n, di);
	S && M === void 0 && (M = !1), (M === void 0 || g) && (M = !0), A !== void 0 && A != 6 && (j = !1), !j && !k && e.config.CompressionStream === void 0 && e.config.CompressionStreamZlib === void 0 && (A = 0);
	let N = Y(e, n, Cr);
	if (!g && (p !== void 0 || m !== void 0) && !(h >= 1 && h <= 3)) throw Error(Sa);
	let P = T, F = n[Mr];
	if (F) {
		let e = 0, t = 0;
		F.forEach((t) => e += 4 + Z(t)), P = new Uint8Array(e);
		let n = V(P);
		F.forEach((e, r) => {
			if (r > 65535) throw Error(wa);
			if (Z(e) > 65535) throw Error(Ta);
			Co(n, t, r), Co(n, t + 2, Z(e)), To(P, e, t + 4), t += 4 + Z(e);
		});
	}
	return {
		comment: a,
		resolvedOptions: {
			rawFilename: i,
			rawComment: o,
			version: s,
			lastModDate: c,
			lastAccessDate: l,
			creationDate: u,
			internalFileAttributes: d,
			passThrough: f,
			password: p,
			rawPassword: m,
			encryptionStrength: h,
			zipCrypto: g,
			extendedTimestamp: _,
			ntfsTimestamp: v,
			keepOrder: y,
			useWebWorkers: b,
			transferStreams: x,
			bufferedWrite: S,
			createTempStream: C,
			dataDescriptorSignature: w,
			signal: E,
			useUnicodeFileNames: D,
			compressionMethod: O,
			format: k ? k.format : void 0,
			codecURI: k ? k.codecURI : void 0,
			codecVersionNeeded: k ? k.versionNeeded : void 0,
			level: A,
			useCompressionStream: j,
			dataDescriptor: M,
			zip64: N,
			rawExtraField: P
		}
	};
}
async function Ya(t, n, { resolvedOptions: r }, i) {
	let { passThrough: a, zipCrypto: o, password: s, rawPassword: c, encryptionStrength: l } = r, { dataDescriptor: u, zip64: d, level: f, compressionMethod: p } = r, m = 0, h = 0;
	if (a) {
		if (!n) throw Error(ja);
		if (h = i[cr], h === void 0) throw Error(Aa);
	}
	let g = d === !0, _ = Y(t, i, wr), v = !!n && (!!(s && Z(s) || c && Z(c)) || a && _);
	n || (f = 0, p = 0);
	let y = v ? o ? 12 : 16 + l * 4 : 0;
	n && (n = new Zn(n), await $n(n), a ? (i.uncompressedSize = h, m = xo(h) + y) : n.size === void 0 ? (u = !0, (d || d === void 0) && (d = !0, h = m = e + 1)) : (i.uncompressedSize = h = n.size, m = xo(h) + y));
	let b = g || h >= 4294967295, x = g || m >= 4294967295;
	if (b || x) {
		if (d === !1) throw Error(ka);
		d = !0;
	}
	return d ||= !1, {
		reader: n,
		resolvedOptions: {
			dataDescriptor: u,
			zip64: d,
			zip64UncompressedSize: b,
			zip64CompressedSize: x,
			uncompressedSize: h,
			level: f,
			compressionMethod: p,
			encrypted: v
		}
	};
}
async function Xa(e, t, r, i, a) {
	let { files: o, writer: s } = e, { keepOrder: c, dataDescriptor: l, signal: u } = a, { headerInfo: d } = i, f = e.options[mi], p = e.lastFileEntry, m = {}, h, g, _, v, y, b, x = 0, C;
	o.set(t, m), e.lastFileEntry = m;
	try {
		let g;
		c && (g = p && p.lock, w()), a.bufferedWrite || !c || e.writerLocked || e.bufferedWrites || !l ? (h = !0, e.bufferedWrites++, C = a.createTempStream ? await a.createTempStream() : new TransformStream(void 0, void 0, { highWaterMark: S }), C.size = 0, await $n(s)) : (C = s, await T()), await $n(C);
		let _ = fo(s);
		if (e.addSplitZipSignature) {
			delete e.addSplitZipSignature;
			let t = /* @__PURE__ */ new Uint8Array(4);
			X(V(t), 0, n), await ho(s, t), e.offset += 4;
		}
		f && !h && $a(i, e.offset - _);
		let { localHeaderArray: D } = d;
		h || (await g, await E());
		let O = uo(s), k = mo(e, s);
		if (m.diskNumberStart = O, h || (y = !0, b = s.size, await ho(C, D)), m = await Za(r, C, m, i, e.config, a), h || (y = !1), o.set(t, m), m.filename = t, h) {
			if (await Promise.all([C.writable.getWriter().close(), g]), await T(), v = !0, b = s.size, await E(), m.diskNumberStart = uo(s), m.offset = mo(e, s), f) {
				let t = i.metadataSize;
				$a(i, e.offset - fo(s)), m.size += i.metadataSize - t;
			}
			io(m, d.localHeaderView, a), await ho(s, d.localHeaderArray), await go(C.readable, s, u, (e) => x += e), s.size += C.size, v = !1;
		} else m.diskNumberStart = O, m.offset = k;
		return e.offset += m.size, m;
	} catch (n) {
		if (v || y) {
			if (e.hasCorruptedEntries = !0, n) try {
				n.corruptedEntry = !0;
			} catch {}
			e.offset += s.size - b, h && (e.offset += x);
		}
		throw o.delete(t), n;
	} finally {
		if (h && e.bufferedWrites--, _ && _(), g && g(), h && C && C.dispose) try {
			await C.dispose();
		} catch {}
	}
	function w() {
		m.lock = new Promise((e) => _ = e);
	}
	async function T() {
		e.writerLocked = !0;
		let { lockWriter: t } = e;
		e.lockWriter = new Promise((t) => g = () => {
			e.writerLocked = !1, t();
		}), await t;
	}
	async function E() {
		po(s, Z(d.localHeaderArray)) && await s.closeDisk();
	}
}
async function Za(e, t, { diskNumberStart: n, lock: r }, i, a, o) {
	let { headerInfo: s, dataDescriptorInfo: c, metadataSize: l } = i, { headerArray: u, headerView: d, lastModDate: f, rawLastModDate: p, encrypted: m, compressed: h, version: g, compressionMethod: _, rawExtraFieldZip64: v, localExtraFieldZip64Length: y, rawExtraFieldExtendedTimestamp: b, extraFieldExtendedTimestampFlag: x, rawExtraFieldNTFS: S, rawExtraFieldUnix: C, rawExtraFieldAES: w } = s, { dataDescriptorArray: T } = c, { rawFilename: E, lastAccessDate: D, creationDate: O, password: k, rawPassword: A, level: j, zip64: M, zip64UncompressedSize: N, zip64CompressedSize: P, zipCrypto: F, dataDescriptor: I, directory: L, executable: ee, versionMadeBy: te, rawComment: ne, rawExtraField: re, useWebWorkers: R, transferStreams: z, onstart: ie, onprogress: ae, onend: oe, signal: B, encryptionStrength: se, extendedTimestamp: ce, msDosCompatible: le, internalFileAttributes: ue, externalFileAttributes: de, uid: fe, gid: pe, unixMode: me, setuid: he, setgid: V, sticky: H, unixExternalUpper: ge, msdosAttributesRaw: _e, msdosAttributes: ve, useCompressionStream: ye, passThrough: U, format: be, codecURI: xe } = o, Se = {
		lock: r,
		versionMadeBy: te,
		zip64: M,
		directory: !!L,
		executable: !!ee,
		filenameUTF8: !0,
		rawFilename: E,
		commentUTF8: !0,
		rawComment: ne,
		rawExtraFieldZip64: v,
		localExtraFieldZip64Length: y,
		rawExtraFieldExtendedTimestamp: b,
		rawExtraFieldNTFS: S,
		rawExtraFieldUnix: C,
		rawExtraFieldAES: w,
		rawExtraField: re,
		extendedTimestamp: ce,
		msDosCompatible: le,
		internalFileAttributes: ue,
		externalFileAttributes: de,
		diskNumberStart: n,
		uid: fe,
		gid: pe,
		unixMode: me,
		setuid: he,
		setgid: V,
		sticky: H,
		unixExternalUpper: ge,
		msdosAttributesRaw: _e,
		msdosAttributes: ve
	}, { signature: Ce, uncompressedSize: we } = o, Te = 0;
	U || (we = 0);
	let { writable: Ee } = t;
	if (e) {
		let n = vt(e.createReadable ? e.createReadable() : e.readable), r = e.size, i = {
			options: {
				codecType: Gt,
				level: j,
				rawPassword: A,
				password: k,
				encryptionStrength: se,
				zipCrypto: m && F,
				passwordVerification: m && F && p >> 8 & 255,
				signed: !U,
				compressed: h && !U,
				encrypted: m && !U,
				useWebWorkers: R,
				useCompressionStream: ye,
				transferStreams: z,
				format: be,
				codecURI: xe,
				compressionMethod: _
			},
			config: a,
			streamOptions: {
				signal: B,
				size: r,
				onstart: ie,
				onprogress: ae,
				onend: oe
			}
		};
		try {
			let e = await Dn({
				readable: n,
				writable: Ee
			}, i);
			if (Te = e.outputSize, t.size += Te, U || (we = e.inputSize, Ce = e.signature), !P && Te >= 4294967295 || !N && we >= 4294967295) throw Error(ka);
		} catch (e) {
			throw e.outputSize !== void 0 && (t.size += e.outputSize), e;
		}
	}
	return ro({
		signature: Ce,
		compressedSize: Te,
		uncompressedSize: we,
		headerInfo: s,
		dataDescriptorInfo: c
	}, o), I && await ho(t, T), Object.assign(Se, {
		uncompressedSize: we,
		compressedSize: Te,
		lastModDate: f,
		rawLastModDate: p,
		creationDate: O,
		lastAccessDate: D,
		encrypted: m,
		zipCrypto: F,
		size: l + Te,
		compressionMethod: _,
		version: g,
		headerArray: u,
		headerView: d,
		signature: Ce,
		extraFieldExtendedTimestampFlag: x,
		zip64UncompressedSize: N,
		zip64CompressedSize: P
	}), Se;
}
function Qa(e) {
	let { rawFilename: n, lastModDate: r, lastAccessDate: i, creationDate: a, level: o, zip64: s, zipCrypto: u, useUnicodeFileNames: d, dataDescriptor: f, directory: h, rawExtraField: g, encryptionStrength: _, extendedTimestamp: v, ntfsTimestamp: y, passThrough: S, encrypted: C, zip64UncompressedSize: w, zip64CompressedSize: E, uncompressedSize: D } = e, { version: O, compressionMethod: k } = e, A = !h && (k === void 0 ? o === void 0 || o > 0 : k !== 0), j, M = S || !A, N = s && (e.bufferedWrite || !f || !w && !E || M), P = N || s && f && (w || E);
	if (s && (w || E)) {
		let e = lo(20);
		if (e.uint16(1), e.uint16(16), j = e.array, N && (e.uint64(D), M)) {
			let t = C ? u ? 12 : 16 + _ * 4 : 0;
			e.uint64(S ? 0 : D + t);
		}
	} else j = T;
	let F;
	if (C && !u) {
		let e = lo(Z(Ba) + 2);
		e.uint16(c), e.bytes(Ba), F = e.array, F[8] = _;
	} else F = T;
	let I, L, ee;
	if (v) {
		let e = vo(r), t = yo(e);
		if (t) {
			let t = 9 + (i ? 4 : 0) + (a ? 4 : 0), n = lo(t);
			ee = 1 + (i ? 2 : 0) + (a ? 4 : 0), n.uint16(l), n.uint16(t - 4), n.uint8(ee), n.uint32(e), i && n.uint32(bo(vo(i))), a && n.uint32(bo(vo(a))), L = n.array;
		} else L = T;
		if (y === void 0 ? !t || i || a : y) try {
			let e = _o(r), t = lo(36);
			t.uint16(10), t.uint16(32), t.skip(4), t.uint16(1), t.uint16(24), t.uint64(e), t.uint64(_o(i) || e), t.uint64(_o(a) || e), I = t.array;
		} catch {
			I = T;
		}
		else I = T;
	} else I = L = T;
	let te;
	try {
		let { uid: n, gid: r, unixExtraFieldType: i } = e;
		if (i == Va && (n !== void 0 || r !== void 0)) {
			let e = eo(n), t = eo(r), i = 3 + e.length + t.length, a = lo(4 + i);
			a.uint16(p), a.uint16(i), a.uint8(1), a.uint8(e.length), a.bytes(e), a.uint8(t.length), a.bytes(t), te = a.array;
		} else if (i == Ha && (n !== void 0 || r !== void 0)) {
			let e = lo(8);
			e.uint16(m), e.uint16(4), e.uint16((n === void 0 ? 0 : n) & t), e.uint16((r === void 0 ? 0 : r) & t), te = e.array;
		} else te = T;
	} catch {
		te = T;
	}
	k === void 0 && (k = A ? 8 : 0);
	let { codecVersionNeeded: ne } = e;
	A && ne !== void 0 && (O = O > ne ? O : ne), s && (O = O > 45 ? O : 45), C && !u && (O = O > 51 ? O : 51, F[9] = k, k = 99);
	let re = P ? Z(j) : 0, R = re + Z(F, L, I, te, g);
	if (R > 65535) throw Error(Ta);
	let z = /* @__PURE__ */ new Date(Math.ceil(r.getTime() / 2e3) * 2e3), { headerArray: ie, headerView: ae, rawLastModDate: oe } = Eo({
		version: O,
		bitFlag: Do(o, d, f, C, k),
		compressionMethod: k,
		uncompressedSize: D,
		lastModDate: z < x ? x : z > b ? b : z,
		rawFilename: n,
		zip64CompressedSize: E,
		zip64UncompressedSize: w,
		extraFieldLength: R
	}), B = lo(30 + Z(n) + R), se = B.array, ce = V(se);
	return B.uint32(67324752), B.bytes(ie), B.bytes(n), P && B.bytes(j), B.bytes(F), B.bytes(L), B.bytes(I), B.bytes(te), B.bytes(g), f && (E || X(ce, 18, 0), w || X(ce, 22, 0)), {
		localHeaderArray: se,
		localHeaderView: ce,
		headerArray: ie,
		headerView: ae,
		lastModDate: r,
		rawLastModDate: oe,
		encrypted: C,
		compressed: A,
		version: O,
		compressionMethod: k,
		extraFieldExtendedTimestampFlag: ee,
		rawExtraFieldZip64: T,
		localExtraFieldZip64Length: re,
		rawExtraFieldExtendedTimestamp: L,
		rawExtraFieldNTFS: I,
		rawExtraFieldUnix: te,
		rawExtraFieldAES: F,
		extraFieldLength: R
	};
}
function $a(e, t) {
	let { headerInfo: n } = e, { localHeaderArray: r, extraFieldLength: i } = n, a = 64 - (t + Z(r)) % 64;
	a < 4 && (a += 64);
	let o = new Uint8Array(a), s = V(o);
	Co(s, 0, f), Co(s, 2, a - 4);
	let c = r;
	n.localHeaderArray = r = new Uint8Array(Z(c) + a), To(r, c), To(r, o, Z(c));
	let l = V(r);
	Co(l, 28, i + a), n.localHeaderView = l, e.metadataSize += a;
}
function eo(e) {
	if (e === void 0) return T;
	{
		let t = /* @__PURE__ */ new Uint8Array(4);
		V(t).setUint32(0, e, !0);
		let n = 4;
		for (; n > 1 && t[n - 1] === 0;) n--;
		return t.subarray(0, n);
	}
}
function to(e, t) {
	if (e !== void 0) e &= 255;
	else if (t !== void 0) {
		let { readOnly: n, hidden: r, system: i, directory: a, archive: o } = t, s = 0;
		n && (s |= 1), r && (s |= 2), i && (s |= 4), a && (s |= 16), o && (s |= 32), e = s & 255;
	}
	return t === void 0 && (t = {
		readOnly: !!(e & 1),
		hidden: !!(e & 2),
		system: !!(e & 4),
		directory: !!(e & 16),
		archive: !!(e & 32)
	}), {
		msdosAttributesRaw: e,
		msdosAttributes: t
	};
}
function no({ zip64: e, dataDescriptor: t, dataDescriptorSignature: n }) {
	let i = T, a, o = 0, s = e ? 20 : 12;
	return n && (s += 4), t && (i = new Uint8Array(s), a = V(i), n && (o = 4, X(a, 0, r))), {
		dataDescriptorArray: i,
		dataDescriptorView: a,
		dataDescriptorOffset: o
	};
}
function ro({ signature: e, compressedSize: t, uncompressedSize: n, headerInfo: r, dataDescriptorInfo: i }, { zip64: a, zipCrypto: o, dataDescriptor: s }) {
	let { headerView: c, encrypted: l } = r, { dataDescriptorView: u, dataDescriptorOffset: d } = i;
	(!l || o) && e !== void 0 && (X(c, 10, e), s && X(u, d, e)), a ? s && (wo(u, d + 4, BigInt(t)), wo(u, d + 12, BigInt(n))) : (X(c, 14, t), X(c, 18, n), s && (X(u, d + 4, t), X(u, d + 8, n)));
}
function io({ rawFilename: e, encrypted: t, zip64: n, localExtraFieldZip64Length: r, signature: i, compressedSize: a, uncompressedSize: o, zip64UncompressedSize: s, zip64CompressedSize: c }, l, { dataDescriptor: u }) {
	if (u || (t || X(l, 14, i), c || X(l, 18, a), s || X(l, 22, o)), n && r) {
		let t = 30 + Z(e) + 4;
		wo(l, t, BigInt(o)), wo(l, t + 8, BigInt(a));
	}
}
async function ao(e, t, n) {
	let r = oo(e.files);
	await co(e, t, n, {
		directoryStart: await so(e, r, n),
		directoryDataLength: r
	});
}
function oo(n) {
	let r = 0;
	for (let [, i] of n) {
		let { rawFilename: n, rawExtraFieldAES: a, rawComment: o, rawExtraFieldNTFS: s, rawExtraFieldUnix: c, rawExtraField: u, extendedTimestamp: d, extraFieldExtendedTimestampFlag: f, lastModDate: p, zip64UncompressedSize: m, zip64CompressedSize: h, uncompressedSize: g, compressedSize: _ } = i, v = i.offset >= e, y = i.diskNumberStart >= t, b;
		if (v || y || m || h) {
			let e = 4 + (m ? 8 : 0) + (h ? 8 : 0) + (v ? 8 : 0) + (y ? 4 : 0), t = lo(e);
			t.uint16(1), t.uint16(e - 4), m && t.uint64(g), h && t.uint64(_), v && t.uint64(i.offset), y && t.uint32(i.diskNumberStart), b = t.array;
		} else b = T;
		i.rawExtraFieldZip64 = b, i.zip64Offset = v, i.zip64DiskNumberStart = y;
		let x, S = vo(p);
		if (d && yo(S)) {
			let e = lo(9);
			e.uint16(l), e.uint16(5), e.uint8(f), e.uint32(S), x = e.array;
		} else x = T;
		i.rawExtraFieldExtendedTimestamp = x;
		let C = Z(b, a, s, c, x, u);
		if (C > 65535) throw Error(Ta);
		r += 46 + Z(n, o) + C;
	}
	return r;
}
async function so(n, r, a) {
	let { files: o, writer: s } = n, c = new Uint8Array(r);
	await $n(s);
	let l = 0, u = 0, d = uo(s), f = fo(s);
	for (let [n, r] of Array.from(o.values()).entries()) {
		let { offset: p, rawFilename: m, rawExtraFieldZip64: h, rawExtraFieldAES: g, rawExtraFieldExtendedTimestamp: _, rawExtraFieldNTFS: v, rawExtraFieldUnix: y, rawExtraField: b, rawComment: x, versionMadeBy: S, headerArray: C, headerView: w, zip64UncompressedSize: T, zip64CompressedSize: E, zip64DiskNumberStart: D, zip64Offset: O, internalFileAttributes: k, externalFileAttributes: A, diskNumberStart: j, uncompressedSize: M, compressedSize: N } = r, P = Z(h, g, _, v, y, b), F = 46 + Z(m, x) + P;
		po(s, l + F - u) && (await ho(s, c.slice(u, l)), u = l, await s.closeDisk()), n == 0 && (d = uo(s), f = fo(s)), T || X(w, 18, M), E || X(w, 14, N), (O || D) && r.version < 45 && Co(w, 0, 45);
		let I = lo(F);
		if (I.uint32(i), I.uint16(S), I.bytes(C.subarray(0, 24)), I.uint16(P), I.uint16(Z(x)), I.uint16(D ? t : j), I.uint16(k), I.uint32(A), I.uint32(O ? e : p), I.bytes(m), I.bytes(h), I.bytes(g), I.bytes(_), I.bytes(v), I.bytes(y), I.bytes(b), I.bytes(x), To(c, I.array, l), l += F, a.onprogress) try {
			await a.onprogress(n + 1, o.size, new Br(r));
		} catch {}
	}
	return await ho(s, u ? c.slice(u) : c), {
		diskNumber: d,
		diskOffset: f
	};
}
async function co(n, r, i, c) {
	let { writer: l } = n, { directoryStart: u } = c, { directoryDataLength: d } = c, f = n.files.size, p = u.diskNumber, m = mo(n, u), h = uo(l);
	po(l, 22) && h++;
	let g = Y(n, i, Cr);
	if (m >= 4294967295 || d >= 4294967295 || f >= 65535 || h >= 65535) {
		if (g === !1) throw Error(ka);
		g = !0;
	}
	let _ = Z(r);
	if (_ > 65535) throw Error(va);
	let v = lo(g ? 98 : 22);
	po(l, Z(v.array) + _) && await l.closeDisk(), h = uo(l), g && (v.uint32(o), v.uint64(44), v.uint16(45), v.uint16(45), v.uint32(h), v.uint32(p), v.uint64(f), v.uint64(f), v.uint64(d), v.uint64(m), v.uint32(s), v.uint32(h), v.uint64(BigInt(mo(n, l)) + BigInt(d)), v.uint32(h + 1), Y(n, i, "supportZip64SplitFile", !0) && (h = t, p = t), f = t, m = e, d = e), v.uint32(a), v.uint16(h), v.uint16(p), v.uint16(f), v.uint16(f), v.uint32(d), v.uint32(m), v.uint16(_), await ho(l, v.array), _ && await ho(l, r);
}
function lo(e) {
	let t = new Uint8Array(e), n = V(t), r = 0;
	return {
		array: t,
		uint8: (e) => {
			So(n, r, e), r += 1;
		},
		uint16: (e) => {
			Co(n, r, e), r += 2;
		},
		uint32: (e) => {
			X(n, r, e), r += 4;
		},
		uint64: (e) => {
			wo(n, r, BigInt(e)), r += 8;
		},
		bytes: (e) => {
			To(t, e, r), r += Z(e);
		},
		skip: (e) => r += e
	};
}
function uo(e) {
	let { diskNumber: t = 0 } = e;
	return t;
}
function fo(e) {
	let { diskOffset: t = 0 } = e;
	return t;
}
function po(e, t) {
	let { availableSize: n = S } = e;
	return t > n;
}
function mo(e, { diskNumber: t = 0, diskOffset: n = 0 }) {
	return e.offset - n - (t ? e.initialOffset : 0);
}
async function ho(e, t) {
	let { writable: n } = e, r = n.getWriter();
	try {
		await r.ready, e.size += Z(t), await r.write(t);
	} finally {
		r.releaseLock();
	}
}
async function go(e, t, n, r) {
	let i = t.writable.getWriter();
	try {
		await e.pipeTo(new WritableStream({ async write(e) {
			await i.ready, await i.write(e), r(Z(e));
		} }), {
			preventClose: !0,
			preventAbort: !0,
			signal: n
		});
	} finally {
		i.releaseLock();
	}
}
function _o(e) {
	if (e) return (BigInt(e.getTime()) + BigInt(0xa9730b66800)) * BigInt(1e4);
}
function vo(e) {
	return Math.floor(e.getTime() / 1e3);
}
function yo(e) {
	return e >= Da && e <= Oa;
}
function bo(e) {
	return Math.min(Oa, Math.max(Da, e));
}
function Y(e, t, n, r) {
	let i = t[n] === void 0 ? e.options[n] : t[n];
	return i === void 0 ? r : i;
}
function xo(e) {
	return e + 5 * (Math.floor(e / 16383) + 1);
}
function So(e, t, n) {
	e.setUint8(t, n);
}
function Co(e, t, n) {
	e.setUint16(t, n, !0);
}
function X(e, t, n) {
	e.setUint32(t, n, !0);
}
function wo(e, t, n) {
	e.setBigUint64(t, n, !0);
}
function To(e, t, n) {
	e.set(t, n);
}
function Z(...e) {
	let t = 0;
	return e.forEach((e) => e && (t += e.length)), t;
}
function Eo({ version: t, bitFlag: n, compressionMethod: r, uncompressedSize: i, compressedSize: a, lastModDate: o, rawLastModDate: s, rawFilename: c, zip64CompressedSize: l, zip64UncompressedSize: u, extraFieldLength: d }) {
	let f = lo(26), p = f.array, m = V(p);
	if (f.uint16(t), f.uint16(n), f.uint16(r), s === void 0) {
		let e = /* @__PURE__ */ new Uint32Array(1), t = V(e);
		Co(t, 0, (o.getHours() << 6 | o.getMinutes()) << 5 | o.getSeconds() / 2), Co(t, 2, (o.getFullYear() - 1980 << 4 | o.getMonth() + 1) << 5 | o.getDate()), s = e[0];
	}
	return f.uint32(s), f.skip(4), l || a !== void 0 ? f.uint32(l ? e : a) : f.skip(4), u || i !== void 0 ? f.uint32(u ? e : i) : f.skip(4), f.uint16(Z(c)), f.uint16(d), {
		headerArray: p,
		headerView: m,
		rawLastModDate: s
	};
}
function Do(e, t, n, r, i) {
	let a = 0;
	return t && (a |= h), n && (a |= 8), (i == 8 || i == 9) && (e >= 0 && e <= 3 && (a |= 6), e > 3 && e <= 5 && (a |= 4), e == 9 && (a |= 2)), r && (a |= 1), a;
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/zip-core-base.js
try {
	P({ baseURI: import.meta.url });
} catch {}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/zlib-streams-inline.js
var Oo = [
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	13,
	15,
	17,
	19,
	23,
	27,
	31,
	35,
	43,
	51,
	59,
	67,
	83,
	99,
	115,
	131,
	163,
	195,
	227,
	258
], ko = [
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0
], Ao = [
	1,
	2,
	3,
	4,
	5,
	7,
	9,
	13,
	17,
	25,
	33,
	49,
	65,
	97,
	129,
	193,
	257,
	385,
	513,
	769,
	1025,
	1537,
	2049,
	3073,
	4097,
	6145,
	8193,
	12289,
	16385,
	24577
], jo = [
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13
], Mo = [
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
], No = /* @__PURE__ */ new Uint8Array(288);
No.fill(8, 0, 144), No.fill(9, 144, 256), No.fill(7, 256, 280), No.fill(8, 280, 288);
var Po = (/* @__PURE__ */ new Uint8Array(30)).fill(5);
function Fo(e) {
	let t = /* @__PURE__ */ new Uint16Array(16);
	for (let n of e) t[n]++;
	t[0] = 0;
	let n = /* @__PURE__ */ new Uint16Array(17);
	for (let e = 1; 15 >= e; e++) n[e + 1] = n[e] + t[e];
	let r = new Uint16Array(e.length);
	for (let t = 0; t < e.length; t++) e[t] && (r[n[e[t]]++] = t);
	return {
		l: t,
		symbols: r
	};
}
var Q = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function Io(e) {
	let t;
	e({ wasmURI: () => (t ||= "data:application/wasm;base64," + ((e) => {
		let t = "", n = e.length, r = 0;
		for (; n > r + 2; r += 3) {
			let n = e[r] << 16 | e[r + 1] << 8 | e[r + 2];
			t += Q[n >> 18 & 63] + Q[n >> 12 & 63] + Q[n >> 6 & 63] + Q[63 & n];
		}
		let i = n - r;
		if (i === 1) {
			let n = e[r] << 16;
			t += Q[n >> 18 & 63] + Q[n >> 12 & 63] + "==";
		} else if (i === 2) {
			let n = e[r] << 16 | e[r + 1] << 8;
			t += Q[n >> 18 & 63] + Q[n >> 12 & 63] + Q[n >> 6 & 63] + "=";
		}
		return t;
	})(((e) => {
		let t = 0, n = 0, r = 0, i = /* @__PURE__ */ new Uint8Array(1024), a = 0, o = 0;
		for (; !o;) {
			o = c(1);
			let e = c(2);
			if (e == 0) l();
			else if (e == 1) u(Fo(No), Fo(Po));
			else {
				if (e != 2) throw Error("invalid deflate block type");
				u(...d());
			}
		}
		return i.subarray(0, a);
		function s() {
			if (t >= e.length) throw Error("unexpected end of deflate data");
			return e[t++];
		}
		function c(e) {
			for (; e > r;) n |= s() << r, r += 8;
			let t = n & (1 << e) - 1;
			return n >>>= e, r -= e, t;
		}
		function l() {
			n = 0, r = 0;
			let e = s() | s() << 8;
			t += 2, p(a + e);
			for (let t = 0; e > t; t++) i[a++] = s();
		}
		function u(e, t) {
			let n = f(e);
			for (; n != 256;) {
				if (256 > n) p(a + 1), i[a++] = n;
				else {
					let e = n - 257, r = Oo[e] + c(ko[e]), o = f(t), s = Ao[o] + c(jo[o]);
					p(a + r);
					let l = a - s;
					for (let e = 0; r > e; e++) i[a++] = i[l + e];
				}
				n = f(e);
			}
		}
		function d() {
			let e = c(5) + 257, t = c(5) + 1, n = c(4) + 4, r = /* @__PURE__ */ new Uint8Array(19);
			for (let e = 0; n > e; e++) r[Mo[e]] = c(3);
			let i = Fo(r), a = new Uint8Array(e + t), o = 0;
			for (; o < a.length;) {
				let e = f(i);
				if (16 > e) a[o++] = e;
				else if (e == 16) {
					let e = a[o - 1], t = c(2) + 3;
					for (; t--;) a[o++] = e;
				} else o += e == 17 ? c(3) + 3 : c(7) + 11;
			}
			return [Fo(a.subarray(0, e)), Fo(a.subarray(e))];
		}
		function f(e) {
			let { l: t, symbols: n } = e, r = 0, i = 0, a = 0;
			for (let e = 1; 15 >= e; e++) {
				r |= c(1);
				let o = t[e];
				if (o > r - i) return n[a + (r - i)];
				a += o, i = i + o << 1, r <<= 1;
			}
			throw Error("invalid huffman code");
		}
		function p(e) {
			if (i.length < e) {
				let t = 2 * i.length;
				for (; e > t;) t *= 2;
				let n = new Uint8Array(t);
				n.set(i.subarray(0, a)), i = n;
			}
		}
	})(((e) => {
		let t = (e = (e + "").replace(/[^A-Za-z0-9+/=]/g, "")).length, n = [];
		for (let r = 0; t > r; r += 4) {
			let t = Q.indexOf(e[r]) << 18 | Q.indexOf(e[r + 1]) << 12 | (63 & Q.indexOf(e[r + 2])) << 6 | 63 & Q.indexOf(e[r + 3]);
			n.push(t >> 16 & 255), e[r + 2] !== "=" && n.push(t >> 8 & 255), e[r + 3] !== "=" && n.push(255 & t);
		}
		return new Uint8Array(n);
	})("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"))), t) });
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/streams/zlib-wasm/zlib-streams.js
var $, Lo, Ro, zo;
function Bo(e) {
	if ($ = e, {malloc: Lo, free: Ro, memory: zo} = $, typeof Lo != "function" || typeof Ro != "function" || !zo) throw $ = Lo = Ro = zo = null, Error("Invalid WASM module");
}
function Vo(e, t, n = {}) {
	let r = typeof n.level == "number" ? n.level : -1, i = typeof n.outBuffer == "number" ? n.outBuffer : 65536, a = typeof n.inBufferSize == "number" ? n.inBufferSize : 65536;
	return new TransformStream({
		start() {
			try {
				let n;
				if (this.out = Lo(i), this.in = Lo(a), this.inBufferSize = a, !this.out || !this.in) throw Error("allocation failed");
				if (this._scratch = new Uint8Array(i), e ? (this._process = $.deflate_process, this._last_consumed = $.deflate_last_consumed, this._end = $.deflate_end, this.streamHandle = $.deflate_new(), n = t === "gzip" ? $.deflate_init_gzip(this.streamHandle, r) : t === "deflate-raw" ? $.deflate_init_raw(this.streamHandle, r) : $.deflate_init(this.streamHandle, r)) : t === "deflate64-raw" ? (this._process = $.inflate9_process, this._last_consumed = $.inflate9_last_consumed, this._end = $.inflate9_end, this.streamHandle = $.inflate9_new(), n = $.inflate9_init_raw(this.streamHandle)) : (this._process = $.inflate_process, this._last_consumed = $.inflate_last_consumed, this._end = $.inflate_end, this.streamHandle = $.inflate_new(), n = t === "deflate-raw" ? $.inflate_init_raw(this.streamHandle) : t === "gzip" ? $.inflate_init_gzip(this.streamHandle) : $.inflate_init(this.streamHandle)), n !== 0) throw Error("init failed:" + n);
			} catch (e) {
				throw o(this), e;
			}
		},
		transform(t, n) {
			try {
				let r = t, a = new Uint8Array(zo.buffer), o = this._process, s = this._last_consumed, c = this.out, l = this._scratch, u = 0;
				for (; u < r.length;) {
					let t = Math.min(r.length - u, 32768);
					if ((!this.in || this.inBufferSize < t) && (this.in && Ro && (Ro(this.in), this.in = 0), this.in = Lo(t), this.inBufferSize = t, !this.in)) throw Error("allocation failed");
					a.set(r.subarray(u, u + t), this.in);
					let d = o(this.streamHandle, this.in, t, c, i, 0), f = d & 16777215;
					if (f && (l.set(a.subarray(c, c + f), 0), n.enqueue(l.slice(0, f))), !e) {
						let e = d >> 24 & 255, t = e & 128 ? e - 256 : e;
						if (t < 0) throw Error("process error:" + t);
					}
					let p = s(this.streamHandle);
					if (p === 0) break;
					u += p;
				}
			} catch (e) {
				o(this), n.error(e);
			}
		},
		flush(t) {
			try {
				let n = new Uint8Array(zo.buffer), r = this._process, a = this.out, o = this._scratch;
				for (;;) {
					let s = r(this.streamHandle, 0, 0, a, i, 4), c = s & 16777215, l = s >> 24 & 255;
					if (!e) {
						let e = l & 128 ? l - 256 : l;
						if (e < 0) throw Error("process error:" + e);
					}
					if (c && (o.set(n.subarray(a, a + c), 0), t.enqueue(o.slice(0, c))), l === 1 || c === 0) break;
				}
			} catch (e) {
				t.error(e);
			} finally {
				let e = o(this);
				e !== 0 && t.error(/* @__PURE__ */ Error("end error:" + e));
			}
		},
		cancel() {
			o(this);
		}
	});
	function o(e) {
		let t = 0;
		return e.streamHandle && e._end && (t = e._end(e.streamHandle)), e.streamHandle = 0, e.in && Ro && Ro(e.in), e.in = 0, e.out && Ro && Ro(e.out), e.out = 0, t;
	}
}
var Ho = class {
	constructor(e = "deflate", t) {
		return Vo(!0, e, t);
	}
}, Uo = class {
	constructor(e = "deflate", t) {
		return Vo(!1, e, t);
	}
};
Ho.requiresModule = !0, Uo.requiresModule = !0;
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/core/streams/zlib-wasm/zlib-streams-loader.js
var Wo = !1;
async function Go(e, { baseURI: t }) {
	if (!Wo) {
		let n, r;
		try {
			try {
				r = new URL(e, t);
			} catch {}
			n = await (await fetch(r)).arrayBuffer();
		} catch (t) {
			if (e.startsWith("data:application/wasm;base64,")) n = Ko(e);
			else throw t;
		}
		Bo((await WebAssembly.instantiate(n)).instance.exports), Wo = !0;
	}
}
function Ko(e) {
	let t = e.split(",")[1], n = atob(t), r = n.length, i = new Uint8Array(r);
	for (let e = 0; e < r; ++e) i[e] = n.charCodeAt(e);
	return i.buffer;
}
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/zip-module-wasm.js
var qo;
// ../reword-nerd/node_modules/@zip.js/zip.js/lib/zip-fs-wasm.js
Io(P), on({ initModule: (e) => {
	if (!qo) {
		let { wasmURI: t } = e;
		typeof t == "function" && (t = t()), qo = Go(t, e);
	}
	return qo;
} }), P({
	CompressionStreamZlib: Ho,
	DecompressionStreamZlib: Uo
}), F(P);
export { Gn as BlobReader, qn as BlobWriter, Jn as TextReader, Bi as ZipReader, Ga as ZipWriter, Se as _, Ni as a, Ei as c, Ai as d, ki as f, xe as g, bt as h, Di as i, Ti as l, xt as m, xi as n, Ci as o, Oi as p, wi as r, Si as s, Mi as t, ji as u };
