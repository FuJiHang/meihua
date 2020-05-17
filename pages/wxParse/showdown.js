function e(f){var d={omitExtraWLInCodeBlocks:{defaultValue:!1,describe:"Omit the default extra whiteline added to code blocks",type:"boolean"},noHeaderId:{defaultValue:!1,describe:"Turn on/off generated header id",type:"boolean"},prefixHeaderId:{defaultValue:!1,describe:"Specify a prefix to generated header ids",type:"string"},headerLevelStart:{defaultValue:!1,describe:"The header blocks level start",type:"integer"},parseImgDimensions:{defaultValue:!1,describe:"Turn on/off image dimension parsing",type:"boolean"},simplifiedAutoLink:{defaultValue:!1,describe:"Turn on/off GFM autolink style",type:"boolean"},literalMidWordUnderscores:{defaultValue:!1,describe:"Parse midword underscores as literal underscores",type:"boolean"},strikethrough:{defaultValue:!1,describe:"Turn on/off strikethrough support",type:"boolean"},tables:{defaultValue:!1,describe:"Turn on/off tables support",type:"boolean"},tablesHeaderId:{defaultValue:!1,describe:"Add an id to table headers",type:"boolean"},ghCodeBlocks:{defaultValue:!0,describe:"Turn on/off GFM fenced code blocks support",type:"boolean"},tasklists:{defaultValue:!1,describe:"Turn on/off GFM tasklist support",type:"boolean"},smoothLivePreview:{defaultValue:!1,describe:"Prevents weird effects in live previews due to incomplete input",type:"boolean"},smartIndentationFix:{defaultValue:!1,description:"Tries to smartly fix identation in es6 strings",type:"boolean"}};if(!1===f){return JSON.parse(JSON.stringify(d))}var b={};for(var g in d){d.hasOwnProperty(g)&&(b[g]=d[g].defaultValue)}return b}function r(h,b){var p=b?"Error in "+b+" extension->":"Error in unnamed extension",k={valid:!0,error:""};s.helper.isArray(h)||(h=[h]);for(var d=0;d<h.length;++d){var g=p+" sub-extension "+d+": ",f=h[d];if("object"!==(void 0===f?"undefined":n(f))){return k.valid=!1,k.error=g+"must be an object, but "+(void 0===f?"undefined":n(f))+" given",k}if(!s.helper.isString(f.type)){return k.valid=!1,k.error=g+'property "type" must be a string, but '+n(f.type)+" given",k}var j=f.type=f.type.toLowerCase();if("language"===j&&(j=f.type="lang"),"html"===j&&(j=f.type="output"),"lang"!==j&&"output"!==j&&"listener"!==j){return k.valid=!1,k.error=g+"type "+j+' is not recognized. Valid values: "lang/language", "output/html" or "listener"',k}if("listener"===j){if(s.helper.isUndefined(f.listeners)){return k.valid=!1,k.error=g+'. Extensions of type "listener" must have a property called "listeners"',k}}else{if(s.helper.isUndefined(f.filter)&&s.helper.isUndefined(f.regex)){return k.valid=!1,k.error=g+j+' extensions must define either a "regex" property or a "filter" method',k}}if(f.listeners){if("object"!==n(f.listeners)){return k.valid=!1,k.error=g+'"listeners" property must be an object but '+n(f.listeners)+" given",k}for(var m in f.listeners){if(f.listeners.hasOwnProperty(m)&&"function"!=typeof f.listeners[m]){return k.valid=!1,k.error=g+'"listeners" property must be an hash of [event name]: [callback]. listeners.'+m+" must be a function but "+n(f.listeners[m])+" given",k}}}if(f.filter){if("function"!=typeof f.filter){return k.valid=!1,k.error=g+'"filter" must be a function, but '+n(f.filter)+" given",k}}else{if(f.regex){if(s.helper.isString(f.regex)&&(f.regex=new RegExp(f.regex,"g")),!f.regex instanceof RegExp){return k.valid=!1,k.error=g+'"regex" property must either be a string or a RegExp object, but '+n(f.regex)+" given",k}if(s.helper.isUndefined(f.replace)){return k.valid=!1,k.error=g+'"regex" extensions must implement a replace string or function',k}}}}return k}function t(d,b){return"~E"+b.charCodeAt(0)+"E"}var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(b){return typeof b}:function(b){return b&&"function"==typeof Symbol&&b.constructor===Symbol&&b!==Symbol.prototype?"symbol":typeof b},s={},a={},o={},i=e(!0),l={github:{omitExtraWLInCodeBlocks:!0,prefixHeaderId:"user-content-",simplifiedAutoLink:!0,literalMidWordUnderscores:!0,strikethrough:!0,tables:!0,tablesHeaderId:!0,ghCodeBlocks:!0,tasklists:!0},vanilla:e(!0)};s.helper={},s.extensions={},s.setOption=function(d,b){return i[d]=b,this},s.getOption=function(b){return i[b]},s.getOptions=function(){return i},s.resetOptions=function(){i=e(!0)},s.setFlavor=function(f){if(l.hasOwnProperty(f)){var d=l[f];for(var b in d){d.hasOwnProperty(b)&&(i[b]=d[b])}}},s.getDefaultOptions=function(b){return e(b)},s.subParser=function(d,b){if(s.helper.isString(d)){if(void 0===b){if(a.hasOwnProperty(d)){return a[d]}throw Error("SubParser named "+d+" not registered!")}a[d]=b}},s.extension=function(d,b){if(!s.helper.isString(d)){throw Error("Extension 'name' must be a string")}if(d=s.helper.stdExtName(d),s.helper.isUndefined(b)){if(!o.hasOwnProperty(d)){throw Error("Extension named "+d+" is not registered!")}return o[d]}"function"==typeof b&&(b=b()),s.helper.isArray(b)||(b=[b]);var f=r(b,d);if(!f.valid){throw Error(f.error)}o[d]=b},s.getAllExtensions=function(){return o},s.removeExtension=function(b){delete o[b]},s.resetExtensions=function(){o={}},s.validateExtension=function(d){var b=r(d,null);
return !!b.valid||(console.warn(b.error),!1)},s.hasOwnProperty("helper")||(s.helper={}),s.helper.isString=function(b){return"string"==typeof b||b instanceof String},s.helper.isFunction=function(d){var b={};return d&&"[object Function]"===b.toString.call(d)},s.helper.forEach=function(f,d){if("function"==typeof f.forEach){f.forEach(d)}else{for(var b=0;b<f.length;b++){d(f[b],b,f)}}},s.helper.isArray=function(b){return b.constructor===Array},s.helper.isUndefined=function(b){return void 0===b},s.helper.stdExtName=function(b){return b.replace(/[_-]||\s/g,"").toLowerCase()},s.helper.escapeCharactersCallback=t,s.helper.escapeCharacters=function(g,f,h){var d="(["+f.replace(/([\[\]\\])/g,"\\$1")+"])";h&&(d="\\\\"+d);var b=new RegExp(d,"g");return g=g.replace(b,t)};var c=function(x,b,C,k){var D,A,j,q,m,z=k||"",B=z.indexOf("g")>-1,g=new RegExp(b+"|"+C,"g"+z.replace(/g/g,"")),v=new RegExp(b,z.replace(/g/g,"")),y=[];do{for(D=0;j=g.exec(x);){if(v.test(j[0])){D++||(q=(A=g.lastIndex)-j[0].length)}else{if(D&&!--D){m=j.index+j[0].length;var w={left:{start:q,end:A},match:{start:A,end:j.index},right:{start:j.index,end:m},wholeMatch:{start:q,end:m}};if(y.push(w),!B){return y}}}}}while(D&&(g.lastIndex=A));return y};s.helper.matchRecursiveRegExp=function(h,g,d,k){for(var f=c(h,g,d,k),b=[],j=0;j<f.length;++j){b.push([h.slice(f[j].wholeMatch.start,f[j].wholeMatch.end),h.slice(f[j].match.start,f[j].match.end),h.slice(f[j].left.start,f[j].left.end),h.slice(f[j].right.start,f[j].right.end)])}return b},s.helper.replaceRecursiveRegExp=function(q,b,x,g,v){if(!s.helper.isFunction(b)){var f=b;b=function(){return f}}var k=c(q,x,g,v),j=q,w=k.length;if(w>0){var d=[];0!==k[0].wholeMatch.start&&d.push(q.slice(0,k[0].wholeMatch.start));for(var m=0;m<w;++m){d.push(b(q.slice(k[m].wholeMatch.start,k[m].wholeMatch.end),q.slice(k[m].match.start,k[m].match.end),q.slice(k[m].left.start,k[m].left.end),q.slice(k[m].right.start,k[m].right.end))),m<w-1&&d.push(q.slice(k[m].wholeMatch.end,k[m+1].wholeMatch.start))}k[w-1].wholeMatch.end<q.length&&d.push(q.slice(k[w-1].wholeMatch.end)),j=d.join("")}return j},s.helper.isUndefined(console)&&(console={warn:function(b){alert(b)},log:function(b){alert(b)},error:function(b){throw b}}),s.Converter=function(k){function x(p,h){if(h=h||null,s.helper.isString(p)){if(p=s.helper.stdExtName(p),h=p,s.extensions[p]){return console.warn("DEPRECATION WARNING: "+p+" is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"),void v(s.extensions[p],p)}if(s.helper.isUndefined(o[p])){throw Error('Extension "'+p+'" could not be loaded. It was either not found or is not a valid extension.')}p=o[p]}"function"==typeof p&&(p=p()),s.helper.isArray(p)||(p=[p]);var u=r(p,h);if(!u.valid){throw Error(u.error)}for(var f=0;f<p.length;++f){switch(p[f].type){case"lang":g.push(p[f]);break;case"output":m.push(p[f])}if(p[f].hasOwnProperty(j)){for(var d in p[f].listeners){p[f].listeners.hasOwnProperty(d)&&q(d,p[f].listeners[d])}}}}function v(h,f){"function"==typeof h&&(h=h(new s.Converter())),s.helper.isArray(h)||(h=[h]);var p=r(h,f);if(!p.valid){throw Error(p.error)}for(var d=0;d<h.length;++d){switch(h[d].type){case"lang":g.push(h[d]);break;case"output":m.push(h[d]);break;default:throw Error("Extension loader error: Type unrecognized!!!")}}}function q(f,d){if(!s.helper.isString(f)){throw Error("Invalid argument in converter.listen() method: name must be a string, but "+(void 0===f?"undefined":n(f))+" given")}if("function"!=typeof d){throw Error("Invalid argument in converter.listen() method: callback must be a function, but "+(void 0===d?"undefined":n(d))+" given")}j.hasOwnProperty(f)||(j[f]=[]),j[f].push(d)}function w(h){var f=h.match(/^\s*/)[0].length,d=new RegExp("^\\s{0,"+f+"}","gm");return h.replace(d,"")}var b={},g=[],m=[],j={};!function(){k=k||{};for(var f in i){i.hasOwnProperty(f)&&(b[f]=i[f])}if("object"!==(void 0===k?"undefined":n(k))){throw Error("Converter expects the passed parameter to be an object, but "+(void 0===k?"undefined":n(k))+" was passed instead.")}for(var d in k){k.hasOwnProperty(d)&&(b[d]=k[d])}b.extensions&&s.helper.forEach(b.extensions,x)}(),this._dispatch=function(u,p,f,y){if(j.hasOwnProperty(u)){for(var h=0;h<j[u].length;++h){var d=j[u][h](u,p,this,f,y);d&&void 0!==d&&(p=d)}}return p},this.listen=function(f,d){return q(f,d),this},this.makeHtml=function(f){if(!f){return f}var d={gHtmlBlocks:[],gHtmlMdBlocks:[],gHtmlSpans:[],gUrls:{},gTitles:{},gDimensions:{},gListLevel:0,hashLinkCounts:{},langExtensions:g,outputModifiers:m,converter:this,ghCodeBlocks:[]};return f=f.replace(/~/g,"~T"),f=f.replace(/\$/g,"~D"),f=f.replace(/\r\n/g,"\n"),f=f.replace(/\r/g,"\n"),b.smartIndentationFix&&(f=w(f)),f=f,f=s.subParser("detab")(f,b,d),f=s.subParser("stripBlankLines")(f,b,d),s.helper.forEach(g,function(h){f=s.subParser("runExtension")(h,f,b,d)}),f=s.subParser("hashPreCodeTags")(f,b,d),f=s.subParser("githubCodeBlocks")(f,b,d),f=s.subParser("hashHTMLBlocks")(f,b,d),f=s.subParser("hashHTMLSpans")(f,b,d),f=s.subParser("stripLinkDefinitions")(f,b,d),f=s.subParser("blockGamut")(f,b,d),f=s.subParser("unhashHTMLSpans")(f,b,d),f=s.subParser("unescapeSpecialChars")(f,b,d),f=f.replace(/~D/g,"$$"),f=f.replace(/~T/g,"~"),s.helper.forEach(m,function(h){f=s.subParser("runExtension")(h,f,b,d)
}),f},this.setOption=function(f,d){b[f]=d},this.getOption=function(d){return b[d]},this.getOptions=function(){return b},this.addExtension=function(f,d){x(f,d=d||null)},this.useExtension=function(d){x(d)},this.setFlavor=function(h){if(l.hasOwnProperty(h)){var f=l[h];for(var d in f){f.hasOwnProperty(d)&&(b[d]=f[d])}}},this.removeExtension=function(h){s.helper.isArray(h)||(h=[h]);for(var f=0;f<h.length;++f){for(var d=h[f],p=0;p<g.length;++p){g[p]===d&&g[p].splice(p,1)}for(;0<m.length;++p){m[0]===d&&m[0].splice(p,1)}}},this.getAllExtensions=function(){return{language:g,output:m}}},s.subParser("anchors",function(f,d,b){var g=function(z,j,q,C,m,w,v,B){s.helper.isUndefined(B)&&(B=""),z=j;var D=q,k=C.toLowerCase(),x=m,A=B;if(!x){if(k||(k=D.toLowerCase().replace(/ ?\n/g," ")),x="#"+k,s.helper.isUndefined(b.gUrls[k])){if(!(z.search(/\(\s*\)$/m)>-1)){return z}x=""}else{x=b.gUrls[k],s.helper.isUndefined(b.gTitles[k])||(A=b.gTitles[k])}}var y='<a href="'+(x=s.helper.escapeCharacters(x,"*_",!1))+'"';return""!==A&&null!==A&&(A=A.replace(/"/g,"&quot;"),y+=' title="'+(A=s.helper.escapeCharacters(A,"*_",!1))+'"'),y+=">"+D+"</a>"};return f=(f=b.converter._dispatch("anchors.before",f,d,b)).replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g,g),f=f.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,g),f=f.replace(/(\[([^\[\]]+)])()()()()()/g,g),f=b.converter._dispatch("anchors.after",f,d,b)}),s.subParser("autoLinks",function(j,b,p){function f(v,u){var q=u;return/^www\./i.test(u)&&(u=u.replace(/^www\./i,"http://www.")),'<a href="'+u+'">'+q+"</a>"}function m(v,u){var q=s.subParser("unescapeSpecialChars")(u);return s.subParser("encodeEmailAddress")(q)}var d=/\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)(?=\s|$)(?!["<>])/gi,h=/<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi,g=/(?:^|[ \n\t])([A-Za-z0-9!#$%&'*+-/=?^_`\{|}~\.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|[ \n\t])/gi,k=/<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi;return j=(j=p.converter._dispatch("autoLinks.before",j,b,p)).replace(h,f),j=j.replace(k,m),b.simplifiedAutoLink&&(j=(j=j.replace(d,f)).replace(g,m)),j=p.converter._dispatch("autoLinks.after",j,b,p)}),s.subParser("blockGamut",function(f,d,b){f=b.converter._dispatch("blockGamut.before",f,d,b),f=s.subParser("blockQuotes")(f,d,b),f=s.subParser("headers")(f,d,b);var g=s.subParser("hashBlock")("<hr />",d,b);return f=f.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,g),f=f.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,g),f=f.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm,g),f=s.subParser("lists")(f,d,b),f=s.subParser("codeBlocks")(f,d,b),f=s.subParser("tables")(f,d,b),f=s.subParser("hashHTMLBlocks")(f,d,b),f=s.subParser("paragraphs")(f,d,b),f=b.converter._dispatch("blockGamut.after",f,d,b)}),s.subParser("blockQuotes",function(f,d,b){return f=b.converter._dispatch("blockQuotes.before",f,d,b),f=f.replace(/((^[ \t]{0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(h,j){var g=j;return g=g.replace(/^[ \t]*>[ \t]?/gm,"~0"),g=g.replace(/~0/g,""),g=g.replace(/^[ \t]+$/gm,""),g=s.subParser("githubCodeBlocks")(g,d,b),g=s.subParser("blockGamut")(g,d,b),g=g.replace(/(^|\n)/g,"$1  "),g=g.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(p,m){var k=m;return k=k.replace(/^  /gm,"~0"),k=k.replace(/~0/g,"")}),s.subParser("hashBlock")("<blockquote>\n"+g+"\n</blockquote>",d,b)}),f=b.converter._dispatch("blockQuotes.after",f,d,b)}),s.subParser("codeBlocks",function(f,d,b){f=b.converter._dispatch("codeBlocks.before",f,d,b);var g=/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;return f=(f+="~0").replace(g,function(m,q,j){var p=q,k=j,h="\n";return p=s.subParser("outdent")(p),p=s.subParser("encodeCode")(p),p=s.subParser("detab")(p),p=p.replace(/^\n+/g,""),p=p.replace(/\n+$/g,""),d.omitExtraWLInCodeBlocks&&(h=""),p="<pre><code>"+p+h+"</code></pre>",s.subParser("hashBlock")(p,d,b)+k}),f=f.replace(/~0/,""),f=b.converter._dispatch("codeBlocks.after",f,d,b)}),s.subParser("codeSpans",function(f,d,b){return void 0===(f=b.converter._dispatch("codeSpans.before",f,d,b))&&(f=""),f=f.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(k,j,h,m){var g=m;return g=g.replace(/^([ \t]*)/g,""),g=g.replace(/[ \t]*$/g,""),g=s.subParser("encodeCode")(g),j+"<code>"+g+"</code>"}),f=b.converter._dispatch("codeSpans.after",f,d,b)}),s.subParser("detab",function(b){return b=b.replace(/\t(?=\t)/g,"    "),b=b.replace(/\t/g,"~A~B"),b=b.replace(/~B(.+?)~A/g,function(h,g){for(var d=g,j=4-d.length%4,f=0;f<j;f++){d+=" "}return d}),b=b.replace(/~A/g,"    "),b=b.replace(/~B/g,"")}),s.subParser("encodeAmpsAndAngles",function(b){return b=b.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),b=b.replace(/<(?![a-z\/?\$!])/gi,"&lt;")}),s.subParser("encodeBackslashEscapes",function(b){return b=b.replace(/\\(\\)/g,s.helper.escapeCharactersCallback),b=b.replace(/\\([`*_{}\[\]()>#+-.!])/g,s.helper.escapeCharactersCallback)}),s.subParser("encodeCode",function(b){return b=b.replace(/&/g,"&amp;"),b=b.replace(/</g,"&lt;"),b=b.replace(/>/g,"&gt;"),b=s.helper.escapeCharacters(b,"*_{}[]\\",!1)
}),s.subParser("encodeEmailAddress",function(d){var b=[function(f){return"&#"+f.charCodeAt(0)+";"},function(f){return"&#x"+f.charCodeAt(0).toString(16)+";"},function(f){return f}];return d="mailto:"+d,d=d.replace(/./g,function(g){if("@"===g){g=b[Math.floor(2*Math.random())](g)}else{if(":"!==g){var f=Math.random();g=f>0.9?b[2](g):f>0.45?b[1](g):b[0](g)}}return g}),d='<a href="'+d+'">'+d+"</a>",d=d.replace(/">.+:/g,'">')}),s.subParser("escapeSpecialCharsWithinTagAttributes",function(d){var b=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;return d=d.replace(b,function(g){var f=g.replace(/(.)<\/?code>(?=.)/g,"$1`");return f=s.helper.escapeCharacters(f,"\\`*_",!1)})}),s.subParser("githubCodeBlocks",function(f,d,b){return d.ghCodeBlocks?(f=b.converter._dispatch("githubCodeBlocks.before",f,d,b),f+="~0",f=f.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,function(h,k,g){var j=d.omitExtraWLInCodeBlocks?"":"\n";return g=s.subParser("encodeCode")(g),g=s.subParser("detab")(g),g=g.replace(/^\n+/g,""),g=g.replace(/\n+$/g,""),g="<pre><code"+(k?' class="'+k+" language-"+k+'"':"")+">"+g+j+"</code></pre>",g=s.subParser("hashBlock")(g,d,b),"\n\n~G"+(b.ghCodeBlocks.push({text:h,codeblock:g})-1)+"G\n\n"}),f=f.replace(/~0/,""),b.converter._dispatch("githubCodeBlocks.after",f,d,b)):f}),s.subParser("hashBlock",function(f,d,b){return f=f.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(b.gHtmlBlocks.push(f)-1)+"K\n\n"}),s.subParser("hashElement",function(f,d,b){return function(h,g){var j=g;return j=j.replace(/\n\n/g,"\n"),j=j.replace(/^\n/,""),j=j.replace(/\n+$/g,""),j="\n\n~K"+(b.gHtmlBlocks.push(j)-1)+"K\n\n"}}),s.subParser("hashHTMLBlocks",function(g,f,d){for(var h=["pre","div","h1","h2","h3","h4","h5","h6","blockquote","table","dl","ol","ul","script","noscript","form","fieldset","iframe","math","style","section","header","footer","nav","article","aside","address","audio","canvas","figure","hgroup","output","video","p"],b=0;b<h.length;++b){g=s.helper.replaceRecursiveRegExp(g,function(p,m,q,k){var j=p;return -1!==q.search(/\bmarkdown\b/)&&(j=q+d.converter.makeHtml(m)+k),"\n\n~K"+(d.gHtmlBlocks.push(j)-1)+"K\n\n"},"^(?: |\\t){0,3}<"+h[b]+"\\b[^>]*>","</"+h[b]+">","gim")}return g=g.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,s.subParser("hashElement")(g,f,d)),g=g.replace(/(<!--[\s\S]*?-->)/g,s.subParser("hashElement")(g,f,d)),g=g.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,s.subParser("hashElement")(g,f,d))}),s.subParser("hashHTMLSpans",function(g,f,d){for(var h=s.helper.matchRecursiveRegExp(g,"<code\\b[^>]*>","</code>","gi"),b=0;b<h.length;++b){g=g.replace(h[b][0],"~L"+(d.gHtmlSpans.push(h[b][0])-1)+"L")}return g}),s.subParser("unhashHTMLSpans",function(f,d,b){for(var g=0;g<b.gHtmlSpans.length;++g){f=f.replace("~L"+g+"L",b.gHtmlSpans[g])}return f}),s.subParser("hashPreCodeTags",function(f,d,b){return f=s.helper.replaceRecursiveRegExp(f,function(j,h,m,g){var k=m+s.subParser("encodeCode")(h)+g;return"\n\n~G"+(b.ghCodeBlocks.push({text:j,codeblock:k})-1)+"G\n\n"},"^(?: |\\t){0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>","^(?: |\\t){0,3}</code>\\s*</pre>","gim")}),s.subParser("headers",function(j,h,g){function m(q){var p,u=q.replace(/[^\w]/g,"").toLowerCase();return g.hashLinkCounts[u]?p=u+"-"+g.hashLinkCounts[u]++:(p=u,g.hashLinkCounts[u]=1),!0===d&&(d="section"),s.helper.isString(d)?d+p:p}j=g.converter._dispatch("headers.before",j,h,g);var d=h.prefixHeaderId,k=isNaN(parseInt(h.headerLevelStart))?1:parseInt(h.headerLevelStart),f=h.smoothLivePreview?/^(.+)[ \t]*\n={2,}[ \t]*\n+/gm:/^(.+)[ \t]*\n=+[ \t]*\n+/gm,b=h.smoothLivePreview?/^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm:/^(.+)[ \t]*\n-+[ \t]*\n+/gm;return j=j.replace(f,function(x,q){var w=s.subParser("spanGamut")(q,h,g),p=h.noHeaderId?"":' id="'+m(q)+'"',y=k,v="<h"+y+p+">"+w+"</h"+y+">";return s.subParser("hashBlock")(v,h,g)}),j=j.replace(b,function(x,q){var w=s.subParser("spanGamut")(q,h,g),p=h.noHeaderId?"":' id="'+m(q)+'"',y=k+1,v="<h"+y+p+">"+w+"</h"+y+">";return s.subParser("hashBlock")(v,h,g)}),j=j.replace(/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm,function(z,v,x){var q=s.subParser("spanGamut")(x,h,g),A=h.noHeaderId?"":' id="'+m(x)+'"',w=k-1+v.length,y="<h"+w+A+">"+q+"</h"+w+">";return s.subParser("hashBlock")(y,h,g)}),j=g.converter._dispatch("headers.after",j,h,g)}),s.subParser("images",function(g,f,d){function j(z,k,v,C,q,x,w,B){var D=d.gUrls,m=d.gTitles,y=d.gDimensions;if(v=v.toLowerCase(),B||(B=""),""===C||null===C){if(""!==v&&null!==v||(v=k.toLowerCase().replace(/ ?\n/g," ")),C="#"+v,s.helper.isUndefined(D[v])){return z}C=D[v],s.helper.isUndefined(m[v])||(B=m[v]),s.helper.isUndefined(y[v])||(q=y[v].width,x=y[v].height)}k=k.replace(/"/g,"&quot;"),k=s.helper.escapeCharacters(k,"*_",!1);var A='<img src="'+(C=s.helper.escapeCharacters(C,"*_",!1))+'" alt="'+k+'"';return B&&(B=B.replace(/"/g,"&quot;"),A+=' title="'+(B=s.helper.escapeCharacters(B,"*_",!1))+'"'),q&&x&&(A+=' width="'+(q="*"===q?"auto":q)+'"',A+=' height="'+(x="*"===x?"auto":x)+'"'),A+=" />"}var b=/!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g,h=/!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g;
return g=(g=d.converter._dispatch("images.before",g,f,d)).replace(h,j),g=g.replace(b,j),g=d.converter._dispatch("images.after",g,f,d)}),s.subParser("italicsAndBold",function(f,d,b){return f=b.converter._dispatch("italicsAndBold.before",f,d,b),f=d.literalMidWordUnderscores?(f=(f=(f=f.replace(/(^|\s|>|\b)__(?=\S)([\s\S]+?)__(?=\b|<|\s|$)/gm,"$1<strong>$2</strong>")).replace(/(^|\s|>|\b)_(?=\S)([\s\S]+?)_(?=\b|<|\s|$)/gm,"$1<em>$2</em>")).replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g,"<strong>$2</strong>")).replace(/(\*)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>"):(f=f.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>")).replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>"),f=b.converter._dispatch("italicsAndBold.after",f,d,b)}),s.subParser("lists",function(g,f,d){function j(m,q){d.gListLevel++,m=m.replace(/\n{2,}$/,"\n"),m+="~0";var k=/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,p=/\n[ \t]*\n(?!~0)/.test(m);return m=m.replace(k,function(A,w,C,y,x,B,D){D=D&&""!==D.trim();var v=s.subParser("outdent")(x,f,d),z="";return B&&f.tasklists&&(z=' class="task-list-item" style="list-style-type: none;"',v=v.replace(/^[ \t]*\[(x|X| )?]/m,function(){var u='<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';return D&&(u+=" checked"),u+=">"})),w||v.search(/\n{2,}/)>-1?(v=s.subParser("githubCodeBlocks")(v,f,d),v=s.subParser("blockGamut")(v,f,d)):(v=(v=s.subParser("lists")(v,f,d)).replace(/\n$/,""),v=p?s.subParser("paragraphs")(v,f,d):s.subParser("spanGamut")(v,f,d)),v="\n<li"+z+">"+v+"</li>\n"}),m=m.replace(/~0/g,""),d.gListLevel--,q&&(m=m.replace(/\s+$/,"")),m}function b(v,u,p){var q="ul"===u?/^ {0,2}\d+\.[ \t]/gm:/^ {0,2}[*+-][ \t]/gm,k=[],w="";if(-1!==v.search(q)){!function v(x){var y=x.search(q);-1!==y?(w+="\n\n<"+u+">"+j(x.slice(0,y),!!p)+"</"+u+">\n\n",q="ul"===(u="ul"===u?"ol":"ul")?/^ {0,2}\d+\.[ \t]/gm:/^ {0,2}[*+-][ \t]/gm,v(x.slice(y))):w+="\n\n<"+u+">"+j(x,!!p)+"</"+u+">\n\n"}(v);for(var m=0;m<k.length;++m){}}else{w="\n\n<"+u+">"+j(v,!!p)+"</"+u+">\n\n"}return w}g=d.converter._dispatch("lists.before",g,f,d),g+="~0";var h=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;return d.gListLevel?g=g.replace(h,function(p,m,k){return b(m,k.search(/[*+-]/g)>-1?"ul":"ol",!0)}):(h=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,g=g.replace(h,function(p,m,k,q){return b(k,q.search(/[*+-]/g)>-1?"ul":"ol")})),g=g.replace(/~0/,""),g=d.converter._dispatch("lists.after",g,f,d)}),s.subParser("outdent",function(b){return b=b.replace(/^(\t|[ ]{1,4})/gm,"~0"),b=b.replace(/~0/g,"")}),s.subParser("paragraphs",function(v,b,A){for(var j=(v=(v=(v=A.converter._dispatch("paragraphs.before",v,b,A)).replace(/^\n+/g,"")).replace(/\n+$/g,"")).split(/\n{2,}/g),y=[],g=j.length,m=0;m<g;m++){var k=j[m];k.search(/~(K|G)(\d+)\1/g)>=0?y.push(k):(k=(k=s.subParser("spanGamut")(k,b,A)).replace(/^([ \t]*)/g,"<p>"),k+="</p>",y.push(k))}for(g=y.length,m=0;m<g;m++){for(var x="",z=y[m],f=!1;z.search(/~(K|G)(\d+)\1/)>=0;){var q=RegExp.$1,w=RegExp.$2;x=(x="K"===q?A.gHtmlBlocks[w]:f?s.subParser("encodeCode")(A.ghCodeBlocks[w].text):A.ghCodeBlocks[w].codeblock).replace(/\$/g,"$$$$"),z=z.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/,x),/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(z)&&(f=!0)}y[m]=z}return v=y.join("\n\n"),v=v.replace(/^\n+/g,""),v=v.replace(/\n+$/g,""),A.converter._dispatch("paragraphs.after",v,b,A)}),s.subParser("runExtension",function(g,f,b,h){if(g.filter){f=g.filter(f,h.converter,b)}else{if(g.regex){var d=g.regex;!d instanceof RegExp&&(d=new RegExp(d,"g")),f=f.replace(d,g.replace)}}return f}),s.subParser("spanGamut",function(f,d,b){return f=b.converter._dispatch("spanGamut.before",f,d,b),f=s.subParser("codeSpans")(f,d,b),f=s.subParser("escapeSpecialCharsWithinTagAttributes")(f,d,b),f=s.subParser("encodeBackslashEscapes")(f,d,b),f=s.subParser("images")(f,d,b),f=s.subParser("anchors")(f,d,b),f=s.subParser("autoLinks")(f,d,b),f=s.subParser("encodeAmpsAndAngles")(f,d,b),f=s.subParser("italicsAndBold")(f,d,b),f=s.subParser("strikethrough")(f,d,b),f=f.replace(/  +\n/g," <br />\n"),f=b.converter._dispatch("spanGamut.after",f,d,b)}),s.subParser("strikethrough",function(f,d,b){return d.strikethrough&&(f=(f=b.converter._dispatch("strikethrough.before",f,d,b)).replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g,"<del>$1</del>"),f=b.converter._dispatch("strikethrough.after",f,d,b)),f}),s.subParser("stripBlankLines",function(b){return b.replace(/^[ \t]+$/gm,"")}),s.subParser("stripLinkDefinitions",function(f,d,b){var g=/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm;return f+="~0",f=f.replace(g,function(m,u,j,p,k,h,q){return u=u.toLowerCase(),b.gUrls[u]=s.subParser("encodeAmpsAndAngles")(j),h?h+q:(q&&(b.gTitles[u]=q.replace(/"|'/g,"&quot;")),d.parseImgDimensions&&p&&k&&(b.gDimensions[u]={width:p,height:k}),"")
}),f=f.replace(/~0/,"")}),s.subParser("tables",function(j,h,g){function m(p){return/^:[ \t]*--*$/.test(p)?' style="text-align:left;"':/^--*[ \t]*:[ \t]*$/.test(p)?' style="text-align:right;"':/^:[ \t]*--*[ \t]*:$/.test(p)?' style="text-align:center;"':""}function d(q,u){var p="";return q=q.trim(),h.tableHeaderId&&(p=' id="'+q.replace(/ /g,"_").toLowerCase()+'"'),q=s.subParser("spanGamut")(q,h,g),"<th"+p+u+">"+q+"</th>\n"}function k(p,q){return"<td"+q+">"+s.subParser("spanGamut")(p,h,g)+"</td>\n"}function f(w,v){for(var q="<table>\n<thead>\n<tr>\n",x=w.length,u=0;u<x;++u){q+=w[u]}for(q+="</tr>\n</thead>\n<tbody>\n",u=0;u<v.length;++u){q+="<tr>\n";for(var p=0;p<x;++p){q+=v[u][p]}q+="</tr>\n"}return q+="</tbody>\n</table>\n"}if(!h.tables){return j}var b=/^[ \t]{0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|~0)/gm;return j=g.converter._dispatch("tables.before",j,h,g),j=j.replace(b,function(A){var q,E=A.split("\n");for(q=0;q<E.length;++q){/^[ \t]{0,3}\|/.test(E[q])&&(E[q]=E[q].replace(/^[ \t]{0,3}\|/,"")),/\|[ \t]*$/.test(E[q])&&(E[q]=E[q].replace(/\|[ \t]*$/,""))}var w=E[0].split("|").map(function(p){return p.trim()}),C=E[1].split("|").map(function(p){return p.trim()}),D=[],v=[],x=[],B=[];for(E.shift(),E.shift(),q=0;q<E.length;++q){""!==E[q].trim()&&D.push(E[q].split("|").map(function(p){return p.trim()}))}if(w.length<C.length){return A}for(q=0;q<C.length;++q){x.push(m(C[q]))}for(q=0;q<w.length;++q){s.helper.isUndefined(x[q])&&(x[q]=""),v.push(d(w[q],x[q]))}for(q=0;q<D.length;++q){for(var z=[],y=0;y<v.length;++y){s.helper.isUndefined(D[q][y]),z.push(k(D[q][y],x[y]))}B.push(z)}return f(v,B)}),j=g.converter._dispatch("tables.after",j,h,g)}),s.subParser("unescapeSpecialChars",function(b){return b=b.replace(/~E(\d+)E/g,function(g,f){var d=parseInt(f);return String.fromCharCode(d)})}),module.exports=s;