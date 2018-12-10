!function(t){var e={};function r(o){if(e[o])return e[o].exports;var s=e[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(o,s,function(e){return t[e]}.bind(null,s));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);class o{constructor(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);let r=0;for(;r<t.length&&0==t[r];)r++;this.num=new Array(t.length-r+e);for(let e=0;e<t.length-r;e++)this.num[e]=t[e+r]}get(t){return this.num[t]}getLength(){return this.num.length}multiply(t){const e=new Array(this.getLength()+t.getLength()-1);for(let r=0;r<this.getLength();r++)for(let o=0;o<t.getLength();o++)e[r+o]^=p.gexp(p.glog(this.get(r))+p.glog(t.get(o)));return new o(e,0)}mod(t){if(this.getLength()-t.getLength()<0)return this;const e=p.glog(this.get(0))-p.glog(t.get(0)),r=new Array(this.getLength());for(let t=0;t<this.getLength();t++)r[t]=this.get(t);for(let o=0;o<t.getLength();o++)r[o]^=p.gexp(p.glog(t.get(o))+e);return new o(r,0).mod(t)}}const s={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},i={L:1,M:0,Q:3,H:2},n=0,l=1,h=2,a=3,u=4,c=5,g=6,f=7,d={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){let e=t<<10;for(;d.getBCHDigit(e)-d.getBCHDigit(d.G15)>=0;)e^=d.G15<<d.getBCHDigit(e)-d.getBCHDigit(d.G15);return(t<<10|e)^d.G15_MASK},getBCHTypeNumber:function(t){let e=t<<12;for(;d.getBCHDigit(e)-d.getBCHDigit(d.G18)>=0;)e^=d.G18<<d.getBCHDigit(e)-d.getBCHDigit(d.G18);return t<<12|e},getBCHDigit:function(t){let e=0;for(;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return d.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case n:return(e+r)%2==0;case l:return e%2==0;case h:return r%3==0;case a:return(e+r)%3==0;case u:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case c:return e*r%2+e*r%3==0;case g:return(e*r%2+e*r%3)%2==0;case f:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){let e=new o([1],0);for(let r=0;r<t;r++)e=e.multiply(new o([1,p.gexp(r)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case s.MODE_NUMBER:return 10;case s.MODE_ALPHA_NUM:return 9;case s.MODE_8BIT_BYTE:case s.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case s.MODE_NUMBER:return 12;case s.MODE_ALPHA_NUM:return 11;case s.MODE_8BIT_BYTE:return 16;case s.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case s.MODE_NUMBER:return 14;case s.MODE_ALPHA_NUM:return 13;case s.MODE_8BIT_BYTE:return 16;case s.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){const e=t.getModuleCount();let r=0;for(let o=0;o<e;o++)for(let s=0;s<e;s++){let i=0;const n=t.isDark(o,s);for(let r=-1;r<=1;r++)if(!(o+r<0||e<=o+r))for(let l=-1;l<=1;l++)s+l<0||e<=s+l||0==r&&0==l||n==t.isDark(o+r,s+l)&&i++;i>5&&(r+=3+i-5)}for(let o=0;o<e-1;o++)for(let s=0;s<e-1;s++){let e=0;t.isDark(o,s)&&e++,t.isDark(o+1,s)&&e++,t.isDark(o,s+1)&&e++,t.isDark(o+1,s+1)&&e++,0!=e&&4!=e||(r+=3)}for(let o=0;o<e;o++)for(let s=0;s<e-6;s++)t.isDark(o,s)&&!t.isDark(o,s+1)&&t.isDark(o,s+2)&&t.isDark(o,s+3)&&t.isDark(o,s+4)&&!t.isDark(o,s+5)&&t.isDark(o,s+6)&&(r+=40);for(let o=0;o<e;o++)for(let s=0;s<e-6;s++)t.isDark(s,o)&&!t.isDark(s+1,o)&&t.isDark(s+2,o)&&t.isDark(s+3,o)&&t.isDark(s+4,o)&&!t.isDark(s+5,o)&&t.isDark(s+6,o)&&(r+=40);let o=0;for(let r=0;r<e;r++)for(let s=0;s<e;s++)t.isDark(s,r)&&o++;return r+=10*(Math.abs(100*o/e/e-50)/5)}},p={glog:function(t){if(t<1)throw new Error("glog("+t+")");return p.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return p.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)};for(let t=0;t<8;t++)p.EXP_TABLE[t]=1<<t;for(let t=8;t<256;t++)p.EXP_TABLE[t]=p.EXP_TABLE[t-4]^p.EXP_TABLE[t-5]^p.EXP_TABLE[t-6]^p.EXP_TABLE[t-8];for(let t=0;t<255;t++)p.LOG_TABLE[p.EXP_TABLE[t]]=t;class _{constructor(t,e){this.totalCount=t,this.dataCount=e}static getBlocks(t,e){const r=_.getBlockTable(t,e);if(void 0==r)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);const o=r.length/3,s=[];for(let t=0;t<o;t++){const e=r[3*t+0],o=r[3*t+1],i=r[3*t+2];for(let t=0;t<e;t++)s.push(new _(o,i))}return s}static getBlockTable(t,e){switch(e){case i.L:return _.RS_BLOCK_TABLE[4*(t-1)+0];case i.M:return _.RS_BLOCK_TABLE[4*(t-1)+1];case i.Q:return _.RS_BLOCK_TABLE[4*(t-1)+2];case i.H:return _.RS_BLOCK_TABLE[4*(t-1)+3];default:return}}}_.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];var m=_;var w=class{constructor(){this.buffer=[],this.length=0}get(t){const e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)}put(t,e){for(let r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))}getLengthInBits(){return this.length}putBit(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var C=class{constructor(t){this.mode=s.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(let t=0,e=this.data.length;t<e;t++){const e=[],r=this.data.charCodeAt(t);r>65536?(e[0]=240|(1835008&r)>>>18,e[1]=128|(258048&r)>>>12,e[2]=128|(4032&r)>>>6,e[3]=128|63&r):r>2048?(e[0]=224|(61440&r)>>>12,e[1]=128|(4032&r)>>>6,e[2]=128|63&r):r>128?(e[0]=192|(1984&r)>>>6,e[1]=128|63&r):e[0]=r,this.parsedData.push(e)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}getLength(t){return this.parsedData.length}write(t){for(let e=0,r=this.parsedData.length;e<r;e++)t.put(this.parsedData[e],8)}};class D{constructor(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}addData(t){const e=new C(t);this.dataList.push(e),this.dataCache=null}isDark(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]}getModuleCount(){return this.moduleCount}make(){this.makeImpl(!1,this.getBestMaskPattern())}makeImpl(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(let t=0;t<this.moduleCount;t++){this.modules[t]=new Array(this.moduleCount);for(let e=0;e<this.moduleCount;e++)this.modules[t][e]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=D.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)}setupPositionProbePattern(t,e){for(let r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(let o=-1;o<=7;o++)e+o<=-1||this.moduleCount<=e+o||(this.modules[t+r][e+o]=0<=r&&r<=6&&(0==o||6==o)||0<=o&&o<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=o&&o<=4)}getBestMaskPattern(){let t=0,e=0;for(let r=0;r<8;r++){this.makeImpl(!0,r);const o=d.getLostPoint(this);(0==r||t>o)&&(t=o,e=r)}return e}createMovieClip(t,e,r){const o=t.createEmptyMovieClip(e,r);this.make();for(let t=0;t<this.modules.length;t++){const e=1*t;for(let r=0;r<this.modules[t].length;r++){const s=1*r;this.modules[t][r]&&(o.beginFill(0,100),o.moveTo(s,e),o.lineTo(s+1,e),o.lineTo(s+1,e+1),o.lineTo(s,e+1),o.endFill())}}return o}setupTimingPattern(){for(let t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(let t=8;t<this.moduleCount-8;t++)null==this.modules[6][t]&&(this.modules[6][t]=t%2==0)}setupPositionAdjustPattern(){const t=d.getPatternPosition(this.typeNumber);for(let e=0;e<t.length;e++)for(let r=0;r<t.length;r++){const o=t[e],s=t[r];if(null==this.modules[o][s])for(let t=-2;t<=2;t++)for(let e=-2;e<=2;e++)this.modules[o+t][s+e]=-2==t||2==t||-2==e||2==e||0==t&&0==e}}setupTypeNumber(t){const e=d.getBCHTypeNumber(this.typeNumber);for(let r=0;r<18;r++){const o=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=o}for(let r=0;r<18;r++){const o=!t&&1==(e>>r&1);this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=o}}setupTypeInfo(t,e){const r=this.errorCorrectLevel<<3|e,o=d.getBCHTypeInfo(r);for(let e=0;e<15;e++){const r=!t&&1==(o>>e&1);e<6?this.modules[e][8]=r:e<8?this.modules[e+1][8]=r:this.modules[this.moduleCount-15+e][8]=r}for(let e=0;e<15;e++){const r=!t&&1==(o>>e&1);e<8?this.modules[8][this.moduleCount-e-1]=r:e<9?this.modules[8][15-e-1+1]=r:this.modules[8][15-e-1]=r}this.modules[this.moduleCount-8][8]=!t}mapData(t,e){let r=-1,o=this.moduleCount-1,s=7,i=0;for(let n=this.moduleCount-1;n>0;n-=2)for(6==n&&n--;;){for(let r=0;r<2;r++)if(null==this.modules[o][n-r]){let l=!1;i<t.length&&(l=1==(t[i]>>>s&1)),d.getMask(e,o,n-r)&&(l=!l),this.modules[o][n-r]=l,-1==--s&&(i++,s=7)}if((o+=r)<0||this.moduleCount<=o){o-=r,r=-r;break}}}static createData(t,e,r){const o=m.getBlocks(t,e),s=new w;for(let e=0;e<r.length;e++){const o=r[e];s.put(o.mode,4),s.put(o.getLength(),d.getLengthInBits(o.mode,t)),o.write(s)}let i=0;for(let t=0;t<o.length;t++)i+=o[t].dataCount;if(s.getLengthInBits()>8*i)throw new Error("code length overflow. ("+s.getLengthInBits()+">"+8*i+")");for(s.getLengthInBits()+4<=8*i&&s.put(0,4);s.getLengthInBits()%8!=0;)s.putBit(!1);for(;!(s.getLengthInBits()>=8*i||(s.put(D.PAD0,8),s.getLengthInBits()>=8*i));)s.put(D.PAD1,8);return D.createBytes(s,o)}static createBytes(t,e){let r=0,s=0,i=0;const n=new Array(e.length),l=new Array(e.length);for(let h=0;h<e.length;h++){const a=e[h].dataCount,u=e[h].totalCount-a;s=Math.max(s,a),i=Math.max(i,u),n[h]=new Array(a);for(let e=0;e<n[h].length;e++)n[h][e]=255&t.buffer[e+r];r+=a;const c=d.getErrorCorrectPolynomial(u),g=new o(n[h],c.getLength()-1).mod(c);l[h]=new Array(c.getLength()-1);for(let t=0;t<l[h].length;t++){const e=t+g.getLength()-l[h].length;l[h][t]=e>=0?g.get(e):0}}let h=0;for(let t=0;t<e.length;t++)h+=e[t].totalCount;const a=new Array(h);let u=0;for(let t=0;t<s;t++)for(let r=0;r<e.length;r++)t<n[r].length&&(a[u++]=n[r][t]);for(let t=0;t<i;t++)for(let r=0;r<e.length;r++)t<l[r].length&&(a[u++]=l[r][t]);return a}}D.PAD0=236,D.PAD1=17;var A=D;function E(t,e){const r=document.createElementNS("http://www.w3.org/2000/svg",t);for(const t in e)e.hasOwnProperty(t)&&r.setAttribute(t,e[t]);return r}var L=class{constructor(t,e){this._el=t,this._htOption=e}draw(t){const e=this._htOption,r=this._el,o=t.getModuleCount();Math.floor(e.width/o),Math.floor(e.height/o),this.clear();const s=E("svg",{viewBox:"0 0 "+String(o)+" "+String(o),width:this._htOption.width,height:this._htOption.height,fill:e.colorLight});s.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),r.appendChild(s),s.appendChild(E("rect",{fill:e.colorLight,width:"100%",height:"100%"})),s.appendChild(E("rect",{fill:e.colorDark,width:"1",height:"1",id:"template"}));for(let e=0;e<o;e++)for(let r=0;r<o;r++)if(t.isDark(e,r)){const t=E("use",{x:String(r),y:String(e)});t.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),s.appendChild(t)}}makeImage(){}clear(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)}};var B=class{constructor(t,e){this._el=t,this._htOption=e,this._bIsPainted=!1,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=e.width,this._elCanvas.height=e.height,this._el.appendChild(this._elCanvas),this._oContext=this._elCanvas.getContext("2d"),this._elImage=document.createElement("img"),this._elImage.alt="Scan me!",this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null}draw(t){const e=this._elImage,r=this._oContext,o=this._htOption,s=t.getModuleCount(),i=o.width/s,n=o.height/s,l=Math.round(i),h=Math.round(n);e.style.display="none",this.clear();for(let e=0;e<s;e++)for(let a=0;a<s;a++){const s=t.isDark(e,a),u=a*i,c=e*n;r.strokeStyle=s?o.colorDark:o.colorLight,r.lineWidth=1,r.fillStyle=s?o.colorDark:o.colorLight,r.fillRect(u,c,i,n),r.strokeRect(Math.floor(u)+.5,Math.floor(c)+.5,l,h),r.strokeRect(Math.ceil(u)-.5,Math.ceil(c)-.5,l,h)}this._bIsPainted=!0}makeImage(){this._bIsPainted&&this._safeSetDataURI(this._onMakeImage,function(){console.error("Error",arguments)})}isPainted(){return this._bIsPainted}clear(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1}_safeSetDataURI(t,e){if(this._fFail=e,this._fSuccess=t,null===this._bSupportDataURI){const t=document.createElement("img"),e=function(){this._bSupportDataURI=!1,this._fFail&&this._fFail.call(this)},r=function(){this._bSupportDataURI=!0,this._fSuccess&&this._fSuccess.call(this)};return t.onabort=e,t.onerror=e,t.onload=r,void(t.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")}!0===this._bSupportDataURI&&this._fSuccess?this._fSuccess.call(this):!1===this._bSupportDataURI&&this._fFail&&this._fFail.call(this)}_onMakeImage(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}};class M{constructor(t,e){if(this._el=t,this._htOption={width:256,height:256,colorDark:"#000000",colorLight:"#ffffff",correctLevel:i.L},"string"==typeof e&&(e={text:e}),e)for(const t in e)this._htOption[t]=e[t];"string"==typeof t&&(t=document.getElementById(t)),this._htOption.useSVG?this._oDrawing=new L(this._el,this._htOption):this._oDrawing=new B(this._el,this._htOption),this._oModel=null,this._htOption.text&&this.makeCode(this._htOption.text)}makeCode(t){this._oModel=new A(function(t,e){let r=1;const o=function(t){const e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}(t);for(let s=0,n=b.length;s<n;s++){let n=0;switch(e){case i.L:n=b[s][0];break;case i.M:n=b[s][1];break;case i.Q:n=b[s][2];break;case i.H:n=b[s][3];break;default:console.log("Unknown correct level",e,t)}if(o<=n)break;r++}if(r>b.length)throw new Error("Text is beyond the limit of "+b[b.length-1][3]+": "+o);return r}(t,this._htOption.correctLevel),this._htOption.correctLevel),this._oModel.addData(t),this._oModel.make(),this._el.title=t,this._oDrawing.draw(this._oModel),this._oDrawing.makeImage()}clear(){this._oDrawing.clear()}}M.CorrectLevel=i;const b=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];var y=M;window.MatrixBarcode=y}]);