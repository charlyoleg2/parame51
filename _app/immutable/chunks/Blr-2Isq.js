var Pn=Array.isArray,Jt=Array.prototype.indexOf,Fn=Array.from,Ln=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,Qt=Object.getOwnPropertyDescriptors,Mn=Object.prototype,Yn=Array.prototype,tn=Object.getPrototypeOf;const Hn=()=>{};function jn(t){return t()}function yt(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,Tt=4,j=8,ot=16,g=32,B=64,K=128,O=256,$=512,d=1024,k=2048,P=4096,b=8192,F=16384,nn=32768,mt=65536,Bn=1<<17,rn=1<<19,At=1<<20,ht=Symbol("$state"),Un=Symbol("legacy props"),Vn=Symbol("");function gt(t){return t===this.v}function en(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function kt(t){return!en(t,this.v)}function ln(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function sn(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function an(t){throw new Error("https://svelte.dev/e/effect_orphan")}function un(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Gn(){throw new Error("https://svelte.dev/e/hydration_failed")}function Kn(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function $n(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Zn(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function on(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function fn(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let tt=!1;function zn(){tt=!0}const Wn=1,Xn=2,Jn=4,Qn=8,tr=16,nr=1,rr=2,er=4,lr=8,sr=16,ar=1,ur=2,_n="[",cn="[!",vn="]",Dt={},or=Symbol();function it(t,n){var r={f:0,v:t,reactions:null,equals:gt,rv:0,wv:0};return r}function ir(t){return pn(it(t))}function fr(t,n=!1){var e;const r=it(t);return n||(r.equals=kt),tt&&_!==null&&_.l!==null&&((e=_.l).s??(e.s=[])).push(r),r}function pn(t){return u!==null&&u.f&y&&(m===null?Rn([t]):m.push(t)),t}function _r(t,n){return u!==null&&nt()&&u.f&(y|ot)&&(m===null||!m.includes(t))&&fn(),hn(t,n)}function hn(t,n){return t.equals(n)||(t.v,t.v=n,t.wv=Gt(),It(t,k),nt()&&f!==null&&f.f&d&&!(f.f&(g|B))&&(A===null?Sn([t]):A.push(t))),n}function It(t,n){var r=t.reactions;if(r!==null)for(var e=nt(),l=r.length,s=0;s<l;s++){var a=r[s],o=a.f;o&k||!e&&a===f||(T(a,n),o&(d|O)&&(o&y?It(a,P):et(a)))}}function Rt(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let R=!1;function cr(t){R=t}let p;function q(t){if(t===null)throw Rt(),Dt;return p=t}function vr(){return q(x(p))}function pr(t){if(R){if(x(p)!==null)throw Rt(),Dt;p=t}}function hr(t=1){if(R){for(var n=t,r=p;n--;)r=x(r);p=r}}function dr(){for(var t=0,n=p;;){if(n.nodeType===8){var r=n.data;if(r===vn){if(t===0)return n;t-=1}else(r===_n||r===cn)&&(t+=1)}var e=x(n);n.remove(),n=e}}var dt,St,Ot;function Er(){if(dt===void 0){dt=window;var t=Element.prototype,n=Node.prototype;St=pt(n,"firstChild").get,Ot=pt(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function Z(t=""){return document.createTextNode(t)}function lt(t){return St.call(t)}function x(t){return Ot.call(t)}function wr(t,n){if(!R)return lt(t);var r=lt(p);if(r===null)r=p.appendChild(Z());else if(n&&r.nodeType!==3){var e=Z();return r==null||r.before(e),q(e),e}return q(r),r}function yr(t,n){if(!R){var r=lt(t);return r instanceof Comment&&r.data===""?x(r):r}if(n&&(p==null?void 0:p.nodeType)!==3){var e=Z();return p==null||p.before(e),q(e),e}return p}function Tr(t,n=1,r=!1){let e=R?p:t;for(var l;n--;)l=e,e=x(e);if(!R)return e;var s=e==null?void 0:e.nodeType;if(r&&s!==3){var a=Z();return e===null?l==null||l.after(a):e.before(a),q(a),a}return q(e),e}function mr(t){t.textContent=""}function dn(t){var n=y|k;f===null?n|=O:f.f|=At;var r=u!==null&&u.f&y?u:null;const e={children:null,ctx:_,deps:null,equals:gt,f:n,fn:t,reactions:null,rv:0,v:null,wv:0,parent:r??f};return r!==null&&(r.children??(r.children=[])).push(e),e}function Ar(t){const n=dn(t);return n.equals=kt,n}function xt(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&y?ft(e):S(e)}}}function En(t){for(var n=t.parent;n!==null;){if(!(n.f&y))return n;n=n.parent}return null}function Ct(t){var n,r=f;J(En(t));try{xt(t),n=$t(t)}finally{J(r)}return n}function Nt(t){var n=Ct(t),r=(I||t.f&O)&&t.deps!==null?P:d;T(t,r),t.equals(n)||(t.v=n,t.wv=Gt())}function ft(t){xt(t),H(t,0),T(t,F),t.v=t.children=t.deps=t.ctx=t.reactions=null}function bt(t){f===null&&u===null&&an(),u!==null&&u.f&O&&sn(),_t&&ln()}function wn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function L(t,n,r,e=!0){var l=(t&B)!==0,s=f,a={ctx:_,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|k,first:null,fn:n,last:null,next:null,parent:l?null:s,prev:null,teardown:null,transitions:null,wv:0};if(r){var o=C;try{Et(!0),ct(a),a.f|=nn}catch(v){throw S(a),v}finally{Et(o)}}else n!==null&&et(a);var c=r&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&(At|K))===0;if(!c&&!l&&e&&(s!==null&&wn(a,s),u!==null&&u.f&y)){var h=u;(h.children??(h.children=[])).push(a)}return a}function gr(t){const n=L(j,null,!1);return T(n,d),n.teardown=t,n}function kr(t){bt();var n=f!==null&&(f.f&g)!==0&&_!==null&&!_.m;if(n){var r=_;(r.e??(r.e=[])).push({fn:t,effect:f,reaction:u})}else{var e=qt(t);return e}}function Dr(t){return bt(),yn(t)}function Ir(t){const n=L(B,t,!0);return(r={})=>new Promise(e=>{r.outro?An(n,()=>{S(n),e(void 0)}):(S(n),e(void 0))})}function qt(t){return L(Tt,t,!1)}function yn(t){return L(j,t,!0)}function Rr(t){return Tn(t)}function Tn(t,n=0){return L(j|ot|n,t,!0)}function Sr(t,n=!0){return L(j|g,t,!0,n)}function Pt(t){var n=t.teardown;if(n!==null){const r=_t,e=u;wt(!0),X(null);try{n.call(null)}finally{wt(r),X(e)}}}function Ft(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)ft(n[r])}}function Lt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;S(r,n),r=e}}function mn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&g||S(n),n=r}}function S(t,n=!0){var r=!1;if((n||t.f&rn)&&t.nodes_start!==null){for(var e=t.nodes_start,l=t.nodes_end;e!==null;){var s=e===l?null:x(e);e.remove(),e=s}r=!0}Lt(t,n&&!r),Ft(t),H(t,0),T(t,F);var a=t.transitions;if(a!==null)for(const c of a)c.stop();Pt(t);var o=t.parent;o!==null&&o.first!==null&&Mt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function Mt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function An(t,n){var r=[];Yt(t,r,!0),gn(r,()=>{S(t),n&&n()})}function gn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var l of t)l.out(e)}else n()}function Yt(t,n,r){if(!(t.f&b)){if(t.f^=b,t.transitions!==null)for(const a of t.transitions)(a.is_global||r)&&n.push(a);for(var e=t.first;e!==null;){var l=e.next,s=(e.f&mt)!==0||(e.f&g)!==0;Yt(e,n,s?r:!1),e=l}}}function Or(t){Ht(t,!0)}function Ht(t,n){if(t.f&b){t.f^=b,t.f&d||(t.f^=d),U(t)&&(T(t,k),et(t));for(var r=t.first;r!==null;){var e=r.next,l=(r.f&mt)!==0||(r.f&g)!==0;Ht(r,l?n:!1),r=e}if(t.transitions!==null)for(const s of t.transitions)(s.is_global||n)&&s.in()}}const kn=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let z=!1,W=!1,st=[],at=[];function jt(){z=!1;const t=st.slice();st=[],yt(t)}function Bt(){W=!1;const t=at.slice();at=[],yt(t)}function xr(t){z||(z=!0,queueMicrotask(jt)),st.push(t)}function Cr(t){W||(W=!0,kn(Bt)),at.push(t)}function Dn(){z&&jt(),W&&Bt()}const Ut=0,In=1;let V=!1,G=Ut,M=!1,Y=null,C=!1,_t=!1;function Et(t){C=t}function wt(t){_t=t}let D=[],N=0;let u=null;function X(t){u=t}let f=null;function J(t){f=t}let m=null;function Rn(t){m=t}let E=null,w=0,A=null;function Sn(t){A=t}let Vt=1,Q=0,I=!1,_=null;function Gt(){return++Vt}function nt(){return!tt||_!==null&&_.l===null}function U(t){var h;var n=t.f;if(n&k)return!0;if(n&P){var r=t.deps,e=(n&O)!==0;if(r!==null){var l,s,a=(n&$)!==0,o=e&&f!==null&&!I,c=r.length;if(a||o){for(l=0;l<c;l++)s=r[l],(a||!((h=s==null?void 0:s.reactions)!=null&&h.includes(t)))&&(s.reactions??(s.reactions=[])).push(t);a&&(t.f^=$)}for(l=0;l<c;l++)if(s=r[l],U(s)&&Nt(s),s.wv>t.wv)return!0}(!e||f!==null&&!I)&&T(t,d)}return!1}function On(t,n){for(var r=n;r!==null;){if(r.f&K)try{r.fn(t);return}catch{r.f^=K}r=r.parent}throw V=!1,t}function xn(t){return(t.f&F)===0&&(t.parent===null||(t.parent.f&K)===0)}function rt(t,n,r,e){if(V){if(r===null&&(V=!1),xn(n))throw t;return}r!==null&&(V=!0);{On(t,n);return}}function Kt(t,n,r=0){var e=t.reactions;if(e!==null)for(var l=0;l<e.length;l++){var s=e[l];s.f&y?Kt(s,n,r+1):n===s&&(r===0?T(s,k):s.f&d&&T(s,P),et(s))}}function $t(t){var vt;var n=E,r=w,e=A,l=u,s=I,a=m,o=_,c=t.f;E=null,w=0,A=null,u=c&(g|B)?null:t,I=!C&&(c&O)!==0,m=null,_=t.ctx,Q++;try{var h=(0,t.fn)(),v=t.deps;if(E!==null){var i;if(H(t,w),v!==null&&w>0)for(v.length=w+E.length,i=0;i<E.length;i++)v[w+i]=E[i];else t.deps=v=E;if(!I)for(i=w;i<v.length;i++)((vt=v[i]).reactions??(vt.reactions=[])).push(t)}else v!==null&&w<v.length&&(H(t,w),v.length=w);if(nt()&&A!==null&&!(t.f&(y|P|k)))for(i=0;i<A.length;i++)Kt(A[i],t);return l!==null&&Q++,h}finally{E=n,w=r,A=e,u=l,I=s,m=a,_=o}}function Cn(t,n){let r=n.reactions;if(r!==null){var e=Jt.call(r,t);if(e!==-1){var l=r.length-1;l===0?r=n.reactions=null:(r[e]=r[l],r.pop())}}r===null&&n.f&y&&(E===null||!E.includes(n))&&(T(n,P),n.f&(O|$)||(n.f^=$),H(n,0))}function H(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)Cn(t,r[e])}function ct(t){var n=t.f;if(!(n&F)){T(t,d);var r=f,e=_;f=t;try{n&ot?mn(t):Lt(t),Ft(t),Pt(t);var l=$t(t);t.teardown=typeof l=="function"?l:null,t.wv=Vt;var s=t.deps,a}catch(o){rt(o,t,r,e||t.ctx)}finally{f=r}}}function Zt(){if(N>1e3){N=0;try{un()}catch(t){if(Y!==null)rt(t,Y,null);else throw t}}N++}function zt(t){var n=t.length;if(n!==0){Zt();var r=C;C=!0;try{for(var e=0;e<n;e++){var l=t[e];l.f&d||(l.f^=d);var s=[];Wt(l,s),Nn(s)}}finally{C=r}}}function Nn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if(!(e.f&(F|b)))try{U(e)&&(ct(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Mt(e):e.fn=null))}catch(l){rt(l,e,null,e.ctx)}}}function bn(){if(M=!1,N>1001)return;const t=D;D=[],zt(t),M||(N=0,Y=null)}function et(t){G===Ut&&(M||(M=!0,queueMicrotask(bn))),Y=t;for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(B|g)){if(!(r&d))return;n.f^=d}}D.push(n)}function Wt(t,n){var r=t.first,e=[];t:for(;r!==null;){var l=r.f,s=(l&g)!==0,a=s&&(l&d)!==0,o=r.next;if(!a&&!(l&b))if(l&j){if(s)r.f^=d;else try{U(r)&&ct(r)}catch(i){rt(i,r,null,r.ctx)}var c=r.first;if(c!==null){r=c;continue}}else l&Tt&&e.push(r);if(o===null){let i=r.parent;for(;i!==null;){if(t===i)break t;var h=i.next;if(h!==null){r=h;continue t}i=i.parent}}r=o}for(var v=0;v<e.length;v++)c=e[v],n.push(c),Wt(c,n)}function Xt(t){var n=G,r=D;try{Zt();const l=[];G=In,D=l,M=!1,zt(r);var e=t==null?void 0:t();return Dn(),(D.length>0||l.length>0)&&Xt(),N=0,Y=null,e}finally{G=n,D=r}}async function Nr(){await Promise.resolve(),Xt()}function br(t){var v;var n=t.f,r=(n&y)!==0;if(r&&n&F){var e=Ct(t);return ft(t),e}if(u!==null){m!==null&&m.includes(t)&&on();var l=u.deps;t.rv<Q&&(t.rv=Q,E===null&&l!==null&&l[w]===t?w++:E===null?E=[t]:E.push(t))}else if(r&&t.deps===null)for(var s=t,a=s.parent,o=s;a!==null;)if(a.f&y){var c=a;o=c,a=c.parent}else{var h=a;(v=h.deriveds)!=null&&v.includes(o)||(h.deriveds??(h.deriveds=[])).push(o);break}return r&&(s=t,U(s)&&Nt(s)),t.v}function qr(t){const n=u;try{return u=null,t()}finally{u=n}}const qn=-7169;function T(t,n){t.f=t.f&qn|n}function Pr(t,n=!1,r){_={p:_,c:null,e:null,m:!1,s:t,x:null,l:null},tt&&!n&&(_.l={s:null,u:null,r1:[],r2:it(!1)})}function Fr(t){const n=_;if(n!==null){const a=n.e;if(a!==null){var r=f,e=u;n.e=null;try{for(var l=0;l<a.length;l++){var s=a[l];J(s.effect),X(s.reaction),qt(s.fn)}}finally{J(r),X(e)}}_=n.p,n.m=!0}return{}}function Lr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(ht in t)ut(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&ht in r&&ut(r)}}}function ut(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{ut(t[e],n)}catch{}const r=tn(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Qt(r);for(let l in e){const s=e[l].get;if(s)try{s.call(t)}catch{}}}}}export{er as $,Yn as A,it as B,$n as C,_r as D,mt as E,pt as F,f as G,Zn as H,tn as I,Pn as J,vr as K,cn as L,dr as M,q as N,cr as O,Or as P,An as Q,qt as R,ht as S,yn as T,or as U,xr as V,fr as W,gr as X,Ln as Y,Kn as Z,Bn as _,Sr as a,kt as a0,g as a1,B as a2,J as a3,nr as a4,rr as a5,lr as a6,Un as a7,Ar as a8,sr as a9,gn as aA,Qn as aB,tr as aC,Vn as aD,Qt as aE,Cr as aF,nt as aG,dt as aH,Xt as aa,Nr as ab,ir as ac,hr as ad,lt as ae,mr as af,X as ag,u as ah,Z as ai,ar as aj,ur as ak,Er as al,_n as am,x as an,Dt as ao,vn as ap,Rt as aq,Gn as ar,Fn as as,Ir as at,Jn as au,b as av,Wn as aw,hn as ax,Xn as ay,Yt as az,Tn as b,p as c,S as d,kr as e,qr as f,br as g,R as h,_ as i,jn as j,Lr as k,dn as l,zn as m,Hn as n,yr as o,wr as p,pr as q,yt as r,Tr as s,Rr as t,Dr as u,Pr as v,Fr as w,en as x,tt as y,Mn as z};