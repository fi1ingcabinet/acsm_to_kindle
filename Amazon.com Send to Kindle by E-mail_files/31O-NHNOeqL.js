(function(c,d){function r(c){if(c)return c.replace(/^\s+|\s+$/g,"")}function n(f,d){if(!f)return{};var b="INFO"===d.logLevel;f.m&&f.m.message&&(f=f.m);var g=d.m||d.message||"",g=f.m&&f.m.message?g+f.m.message:f.m&&f.m.target&&f.m.target.tagName?g+("Error handler invoked by "+f.m.target.tagName+" tag"):f.m?g+f.m:f.message?g+f.message:g+"Unknown error",g={m:g,name:f.name,type:f.type,csm:L+" "+(f.fromOnError?"onerror":"ueLogError")},h,m,k=0,n;g.logLevel=d.logLevel||z;d.adb&&(g.adb=d.adb);if(h=d.attribution)g.attribution=
""+h;if(!b){g.pageURL=d.pageURL||""+(window.location?window.location.href:"")||"missing";g.f=f.f||f.sourceURL||f.fileName||f.filename||f.m&&f.m.target&&f.m.target.src;g.l=f.l||f.line||f.lineno||f.lineNumber;g.c=f.c?""+f.c:f.c;g.s=[];g.t=c.ue.d();if((b=f.stack||(f.err?f.err.stack:""))&&b.split)for(g.csm+=" stack",h=b.split("\n");k<h.length&&g.s.length<y;)(b=h[k++])&&g.s.push(r(b));else for(g.csm+=" callee",m=w(f.args||arguments,"callee"),h=k=0;m&&k<y;)n=p,m.skipTrace||(b=m.toString())&&b.substr&&(n=
0===h?4*p:n,n=1==h?2*p:n,g.s.push(b.substr(0,n)),h++),m=w(m,"caller"),k++;if(!g.f&&0<g.s.length&&(k=g)&&k.s){var u,b=0<k.s.length?k.s[0]:"";h=1<k.s.length?k.s[1]:"";b&&(u=b.match(x));u&&3==u.length||!h||(u=h.match(K));u&&3==u.length&&(k.f=u[1],k.l=u[2])}}return g}function w(c,d){try{return c[d]}catch(b){}}function t(f,p){if(f){for(var b=n(f,p),g=(window.ue_err?window.ue_err.errorHandlers:null)||[],h=0;h<g.length;h++)"function"==typeof g[h].handler&&g[h].handler(b);c.ue.log(b,p.channel||m,{nb:1});
"function"===typeof ue_err.elh&&ue_err.elh(f,p);try{if(!f.fromOnError){var t=d.console,k=d.JSON,g="Error logged with the Track\x26Report JS errors API(http://tiny/1covqr6l8/wamazindeClieUserJava): ";if(t){if(k&&k.stringify)try{g+=k.stringify(b)}catch(r){g+="no info provided; converting to string failed"}else g+=b.m;"function"===typeof t.error?t.error(g,b):"function"===typeof t.log&&t.log(g,b)}}}catch(r){}}}function v(f,d){if(f&&!(c.ue_err.ec>c.ue_err.mxe)){c.ue_err.ter.push(f);d=d||{};var b=f.logLevel||
d.logLevel;d.logLevel=b;d.attribution=f.attribution||d.attribution;b&&b!==z&&b!==H&&b!==A&&b!==I||c.ue_err.ec++;b&&b!=z||ue_err.ecf++;t(f,d)}}if(c.ue_err&&(!c.ueLogError||c.ueLogError.isStub)){var m=c.ue_err_chan||"jserr",z="FATAL",H="ERROR",A="WARN",I="DOWNGRADED",L="v5",y=20,p=256,K=/\(?([^\s]*):(\d+):\d+\)?/,x=/.*@(.*):(\d*)/;t.skipTrace=1;n.skipTrace=1;v.skipTrace=1;(function(){if(c.ue_err.erl){var f=c.ue_err.erl.length,d,b;for(d=0;d<f;d++)b=c.ue_err.erl[d],t(b.ex,b.info);ue_err.erl=[]}})();c.ueLogError=
v}})(ue_csm,window);
(function(c,d){function r(a){for(var l={},e,q,O=0;O<a.length;O++)q=a[O],q.r=q.r||b.rid,q.s=q.s||c.ue_sid,e=q.r+q.s+q.m,q.c&&(l[e]||(l[e]=[]),l[e].push(a[O]));return l}function n(a){for(var l=1;l<arguments.length;l++){var e=arguments[l];try{if(e.isSupported)return e.send(a)}catch(b){}}}function w(){if(h.length&&!b.paused){for(var a=0;a<k.length;a++)k[a]();b._flhs+=1;t();n(r(h.splice(0,h.length)),B,D,E)}u=J=0}function t(){p&&v({k:"chk",f:b._flhs,l:b._lpn,s:"full"},"csm")}function v(a,l,e){e=e||{};!c.ue_furl||
0===e.bf&&b.isBF||(a={r:e.r||(b.paused?void 0:b.rid),s:e.s||(b.paused?void 0:c.ue_sid),m:e.m||c.ue_mid,mkt:e.mkt||c.ue_mkt,sn:e.sn||c.ue_sn,c:l,d:a,t:e.t||b.d(),cs:e.c&&c.ue_qsl},b._lpn[l]=(b._lpn[l]||0)+1,e.b?n(r([a]),B,E):e.nb?n(r([a]),B,D,E):e.img||M[l]?n(r([a]),E):e.ff?(h.push(a),w()):e.n?(h.push(a),0===F?w():u||(u=d.setTimeout(w,F))):(h.push(a),J||(J=d.setTimeout(w,P))))}function m(a,l,e){G++;G==y&&v({m:"Max number of Forester Logs exceeded",f:"forester-client.js",logLevel:"ERROR"},d.ue_err_chan||
"jserr");(G<y||e&&e.il)&&v(a,l,e)}function z(){if(!N){for(var a=0;a<C.length;a++)C[a]();for(a=0;a<k.length;a++)k[a]();b._flhs+=1;t();n(r(h.splice(0,h.length)),B,E);N=!0}}function H(a){var l=f(a);a.reqs&&(l={csmcount:{counter:K,t:0,value:l.length}},l.csmcount.value+=f(l).length,a.reqs.push(l),l=f(a));return l}var A={};(function(){function a(a){return 10>a?"0"+a:a}function l(a){b.lastIndex=0;return b.test(a)?'"'+a.replace(b,function(a){var e=d[a];return"string"===typeof e?e:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+
'"':'"'+a+'"'}function e(a,b){var q,d,h=c,m,k=b[a];k&&"object"===typeof k&&"function"===typeof k.toJSON&&(k=k.toJSON(a));"function"===typeof g&&(k=g.call(b,a,k));switch(typeof k){case "string":return l(k);case "number":return isFinite(k)?String(k):"null";case "boolean":case "null":return String(k);case "object":if(!k)return"null";c+=f;m=[];if("[object Array]"===Object.prototype.toString.apply(k)){b=k.length;for(a=0;a<b;a+=1)m[a]=e(a,k)||"null";d=0===m.length?"[]":c?"[\n"+c+m.join(",\n"+c)+"\n"+h+
"]":"["+m.join(",")+"]";c=h;return d}if(g&&"object"===typeof g)for(b=g.length,a=0;a<b;a+=1)"string"===typeof g[a]&&(q=g[a],(d=e(q,k))&&m.push(l(q)+(c?": ":":")+d));else for(q in k)Object.prototype.hasOwnProperty.call(k,q)&&(d=e(q,k))&&m.push(l(q)+(c?": ":":")+d);d=0===m.length?"{}":c?"{\n"+c+m.join(",\n"+c)+"\n"+h+"}":"{"+m.join(",")+"}";c=h;return d}}"function"!==typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+a(this.getUTCMonth()+
1)+"-"+a(this.getUTCDate())+"T"+a(this.getUTCHours())+":"+a(this.getUTCMinutes())+":"+a(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var b=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c,f,d={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},g;"function"!==typeof A.stringify&&(A.stringify=function(a,
b,l){var q;f=c="";if("number"===typeof l)for(q=0;q<l;q+=1)f+=" ";else"string"===typeof l&&(f=l);if((g=b)&&"function"!==typeof b&&("object"!==typeof b||"number"!==typeof b.length))throw Error("JSON.stringify");return e("",{"":a})})})();var I=function(){function a(b,e){if(null==b)return e.push("!n");if("number"===typeof b)return e.push("!"+b);if("string"===typeof b)return"\\"==b[b.length-1]?e.push("'"+b.replace(/'/g,"\\'")+"u005C'"):e.push("'"+b.replace(/'/g,"\\'")+"'");if("boolean"===typeof b)return e.push(b?
"!t":"!f");if(b instanceof Array){e.push("*");for(var c=0;c<b.length;c++)a(b[c],e);return e.push(")")}if("object"==typeof b){e.push("(");for(c in b)b.hasOwnProperty(c)&&(e.push(c),a(b[c],e));return e.push(")")}return e.push("!n")}return{stringify:function(b){var e=[];a(b,e);return e.join("")}}}(),L=c.ue_qsl||2E3,y=2E3,p=1===window.ue_ddq,K="foresterPayloadSize",x=function(){},f=d.JSON&&d.JSON.stringify||A&&A.stringify,Q=I.stringify,b=c.ue||{},I=c.uet||x;(c.uet||x)("bb","ue_frst_v2",{wb:1});var g=
"//"+c.ue_furl+"/1/batch/1/OE/",h=[],C=[],k=[],N=!1,u,J,F=void 0===c.ue_hpfi?1E3:c.ue_hpfi,P=void 0===c.ue_lpfi?1E4:c.ue_lpfi,M={"scheduled-delivery":1},G=0,D=function(){function a(){if(d.XDomainRequest){var a=new XDomainRequest;a.onerror=x;a.ontimeout=x;a.onprogress=x;a.onload=x;a.timeout=0;return a}if(d.XMLHttpRequest){a=new XMLHttpRequest;if(!("withCredentials"in a))throw"";return a}if(d.ActiveXObject){for(var b=0;b<q.length&&!a;b++)try{a=new ActiveXObject(q[b]),q=[q[b]]}catch(e){}return a}}function l(a){for(var e=
[],l=a[0]||{},d=0;d<a.length;d++){var q={};q[a[d].c]=a[d].d;e.push(q)}return{rid:l.r||b.rid,sid:l.s||c.ue_sid,mid:l.m||c.ue_mid,mkt:l.mkt||c.ue_mkt,sn:l.sn||c.ue_sn,reqs:e}}function e(b){var e=l(b),c=a();if(!c)throw"";c.onerror=function(){for(var a=0;a<b.length;a++)h.push(b[a]);D.isSupported=!1};c.open("POST",g,!0);c.setRequestHeader&&c.setRequestHeader("Content-type","text/plain");e=H(e);c.send(e)}var q="MSXML2.XMLHTTP.6.0 MSXML2.XMLHTTP.5.0 MSXML2.XMLHTTP.4.0 MSXML2.XMLHTTP.3.0 MSXML2.XMLHTTP Microsoft.XMLHTTP".split(" ");
return{send:function(a){for(var b in a)a.hasOwnProperty(b)&&a[b].length&&e(a[b])},buildPOSTBodyLog:l,isSupported:!0}}(),E=function(){return{send:function(a){for(var l in a)if(a.hasOwnProperty(l)){for(var e=a[l],d=e,k={},h,m=0;m<d.length;m++)h=d[m].c,k[h]||(k[h]=[]),k[h].push(d[m]);e=e[0]||{};d=e.sn||c.ue_sn;e=g+(e.m||c.ue_mid)+":"+(e.s||c.ue_sid)+":"+(e.r||b.rid)+(d?":"+d:"");d=[];h=e;var m=[],p=void 0;for(p in k)if(k.hasOwnProperty(p))for(var n=0;n<k[p].length;n++){var t=k[p][n],r=encodeURIComponent((t.cs?
Q:f)(t.d));m.push({l:r,t:t.t,p:1,c:p,d:t.cs?"c":"j"})}k=m;m=void 0;p="$";for(t=0;t<k.length;){n=k[t];m!=n.c?(h+=p+n.c+"\x3d",p="\x26",m=n.c):h+=",";var r=h,u=n.d+":",v=n;h=(v.l.match(".{1,"+(L-h.length)+"}[^%]{0,2}")||[])[0]||"";v.l=v.l.substr(h.length);h=r+(u+h+":"+n.t);if(n.l)h+=":"+n.p++ +"_",d.push(h),h=e,p="$",m=0;else if(t++,1!=n.p)for(h+=":"+n.p+"_"+n.p,r=0;r<n.p-1;r++)d[d.length-r-1]+=n.p}d.push(h);e=d;for(d=0;d<e.length;d++)(new Image).src=e[d]}},isSupported:!0}}(),B=function(){return{send:function(a){for(var b in a)if(a.hasOwnProperty(b)){var e=
D.buildPOSTBodyLog(a[b]),e=H(e);if(!navigator.sendBeacon(g,e))throw"";}},isSupported:!!navigator.sendBeacon}}();b._fic=E;b._fac=D;b._fbc=B;b._flq=h;b.sid=b.sid||c.ue_sid;b.mid=b.mid||c.ue_mid;b.furl=b.furl||c.ue_furl;b.sn=b.sn||c.ue_sn;b._flhs=b._flhs||0;b._lpn=b._lpn||{};try{d.amznJQ&&d.amznJQ.declareAvailable&&d.amznJQ.declareAvailable("forester-client"),d.P&&d.P.register&&d.P.register("forester-client",x)}catch(a){c.ueLogError(a,{logLevel:"WARN"})}(function(){b.log&&b.log.isStub&&(b.log.replay(function(a,
b,e){var c=a[2]||{};c.t=b;c.r=e;c.n=1;m(a[0],a[1],c)}),b.onunload.replay(function(a){C.push(a[0])}),b.onflush.replay(function(a){k.push(a[0])}))})();b.log=m;b.log.reset=function(){G=0};b.onunload=function(a){C.push(a)};b.onflush=function(a){k.push(a)};b.attach("beforeunload",z);b.attach("pagehide",z);I("ld","ue_frst_v2",{wb:1})})(ue_csm,window);
ue_csm.ue.exec(function(c,d){var r=function(){},n=function(){return{send:function(c,n){if(n&&c){var m;if(d.XDomainRequest)m=new XDomainRequest,m.onerror=r,m.ontimeout=r,m.onprogress=r,m.onload=r,m.timeout=0;else if(d.XMLHttpRequest){if(m=new XMLHttpRequest,!("withCredentials"in m))throw"";}else m=void 0;if(!m)throw"";m.open("POST",c,!0);m.setRequestHeader&&m.setRequestHeader("Content-type","text/plain");m.send(n)}},isSupported:!0}}(),w=function(){return{send:function(d,n){if(d&&n)if(navigator.sendBeacon(d,
n))c.ue_sbuimp&&c.ue&&c.ue.ssw&&c.ue.ssw("eelsts","scs");else throw"";},isSupported:!!navigator.sendBeacon&&!(d.cordova&&d.cordova.platformId&&"ios"==d.cordova.platformId)}}();c.ue._ajx=n;c.ue._sBcn=w},"Transportation-clients")(ue_csm,window);
ue_csm.ue.exec(function(c,d){function r(){for(var a=0;a<arguments.length;a++){var c=arguments[a];try{var e;if(c.isSupported){var g=B.buildPayload(h,b);e=c.send(f,g)}else throw dummyException;return e}catch(k){}}K({m:"All supported clients failed",attribution:"CSMSushiClient_TRANSPORTATION_FAIL",f:"sushi-client.js",logLevel:"ERROR"},d.ue_err_chan||"jserr")}function n(){if(b.length){for(var a=0;a<F.length;a++)F[a]();r(p._sBcn||{},p._ajx||{});b=[];g={};h={};M=G=C=k=0}}function w(){var a=new Date,b=function(a){return 10>
a?"0"+a:a};return Date.prototype.toISOString?a.toISOString():a.getUTCFullYear()+"-"+b(a.getUTCMonth()+1)+"-"+b(a.getUTCDate())+"T"+b(a.getUTCHours())+":"+b(a.getUTCMinutes())+":"+b(a.getUTCSeconds())+"."+String((a.getUTCMilliseconds()/1E3).toFixed(3)).slice(2,5)+"Z"}function t(a){try{return JSON.stringify(a)}catch(b){}return null}function v(a,l,e,f){var g=!1;f=f||{};u++;u==A&&K({m:"Max number of Sushi Logs exceeded",f:"sushi-client.js",logLevel:"ERROR",attribution:"CSMSushiClient_MAX_CALLS"},d.ue_err_chan||
"jserr");var k;if(k=!(u>=A))(k=a&&-1<a.constructor.toString().indexOf("Object")&&l&&-1<l.constructor.toString().indexOf("String")&&e&&-1<e.constructor.toString().indexOf("String"))||N++;k&&(p.count&&p.count("Event:"+e,1),a.producerId=a.producerId||l,a.schemaId=a.schemaId||e,a.timestamp=w(),l=Date.now?Date.now():+new Date,e=Math.random().toString().substring(2,12),a.messageId=c.ue_id+"-"+l+"-"+e,f&&!f.ssd&&(a.sessionId=a.sessionId||c.ue_sid,a.requestId=a.requestId||c.ue_id,a.obfuscatedMarketplaceId=
a.obfuscatedMarketplaceId||c.ue_mid),(l=t(a))?(l=l.length,(b.length==I||C+l>L)&&n(),C+=l,a={data:B.compressEvent(a)},b.push(a),(f||{}).n?0===D?n():M||(M=d.setTimeout(n,D)):G||(G=d.setTimeout(n,E)),g=!0):g=!1);!g&&c.ue_int&&console.error("Invalid JS Nexus API call");return g}function m(){if(!P){for(var a=0;a<J.length;a++)J[a]();for(a=0;a<F.length;a++)F[a]();b.length&&(c.ue_sbuimp&&c.ue&&c.ue.ssw&&(a=t({dct:h,evt:b}),c.ue.ssw("eeldata",a),c.ue.ssw("eelsts","unk")),r(p._sBcn||{}));P=!0}}function z(a){J.push(a)}
function H(a){F.push(a)}var A=1E3,I=499,L=524288,y=function(){},p=c.ue||{},K=p.log||y,x=c.uex||y;(c.uet||y)("bb","ue_sushi_v1",{wb:1});var f=c.ue_surl||"https://unagi-na.amazon.com/1/events/com.amazon.csm.nexusclient.gamma",Q=["messageId","timestamp"],b=[],g={},h={},C=0,k=0,N=0,u=0,J=[],F=[],P=!1,M,G,D=void 0===c.ue_hpsi?1E3:c.ue_hpsi,E=void 0===c.ue_lpsi?1E4:c.ue_lpsi,B=function(){function a(a){g[a]="#"+k++;h[g[a]]=a;return g[a]}function c(b){if(!(b instanceof Function)){if(b instanceof Array){for(var d=
[],f=b.length,h=0;h<f;h++)d[h]=c(b[h]);return d}if(b instanceof Object){d={};for(f in b)b.hasOwnProperty(f)&&(d[g[f]?g[f]:a(f)]=-1===Q.indexOf(f)?c(b[f]):b[f]);return d}return"string"===typeof b&&(b.length>("#"+k).length||"#"===b.charAt(0))?g[b]?g[b]:a(b):b}}return{compressEvent:c,buildPayload:function(){return t({cs:{dct:h},events:b})}}}();(function(){if(p.event&&p.event.isStub){if(c.ue_sbuimp&&c.ue&&c.ue.ssw){var a=c.ue.ssw("eelsts").val;if(a&&"unk"===a&&(a=c.ue.ssw("eeldata").val)){var d;a:{try{d=
JSON.parse(a);break a}catch(e){}d=null}d&&d.evt instanceof Array&&d.dct instanceof Object&&(b=d.evt,h=d.dct,b&&h&&(n(),c.ue.ssw("eeldata","{}"),c.ue.ssw("eelsts","scs")))}}p.event.replay(function(a){a[3]=a[3]||{};a[3].n=1;v.apply(this,a)});p.onSushiUnload.replay(function(a){z(a[0])});p.onSushiFlush.replay(function(a){H(a[0])})}})();p.attach("beforeunload",m);p.attach("pagehide",m);p._cmps=B;p.event=v;p.event.reset=function(){u=0};p.onSushiUnload=z;p.onSushiFlush=H;try{d.P&&d.P.register&&d.P.register("sushi-client",
y)}catch(a){c.ueLogError(a,{logLevel:"WARN"})}x("ld","ue_sushi_v1",{wb:1})},"Nxs-JS-Client")(ue_csm,window);