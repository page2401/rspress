"use strict";(self.rspackChunk_page2401_rspress=self.rspackChunk_page2401_rspress||[]).push([["q"],{P0(e,t,a){function i(e,t){e.accDescr&&t.setAccDescription?.(e.accDescr),e.accTitle&&t.setAccTitle?.(e.accTitle),e.title&&t.setDiagramTitle?.(e.title)}(0,a.r("Gt").K)(i,"populateCommonDb"),a.d(t,{},{S:i})},IR(e,t,a){var i=a.r("P0"),r=a.r("eQ"),l=a.r("sk"),s=a.r("ma"),n=a.r("M4"),o=a.r("Gt"),c=a.r("Xe"),p=a.r("xC"),d=a.r("f1"),h=s.UI.pie,g={sections:new Map,showData:!1,config:h},u=g.sections,f=g.showData,m=structuredClone(h),x=(0,o.K)(()=>structuredClone(m),"getConfig"),$=(0,o.K)(()=>{u=new Map,f=g.showData,(0,s.IU)()},"clear"),S=(0,o.K)(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);u.has(e)||(u.set(e,t),n.R.debug(`added new section: ${e}, with value: ${t}`))},"addSection"),w=(0,o.K)(()=>u,"getSections"),y=(0,o.K)(e=>{f=e},"setShowData"),C=(0,o.K)(()=>f,"getShowData"),k={getConfig:x,clear:$,setDiagramTitle:s.ke,getDiagramTitle:s.ab,setAccTitle:s.SV,getAccTitle:s.iN,setAccDescription:s.EI,getAccDescription:s.m7,addSection:S,getSections:w,setShowData:y,getShowData:C},D=(0,o.K)((e,t)=>{(0,i.S)(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},"populateDb"),T={parse:(0,o.K)(async e=>{let t=await (0,c.qg)("pie",e);n.R.debug(t),D(t,k)},"parse")},b=(0,o.K)(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),v=(0,o.K)(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),a=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return(0,p.rL)().value(e=>e.value).sort(null)(a)},"createPieArcs"),A=(0,o.K)((e,t,a,i)=>{n.R.debug("rendering pie chart\n"+e);let o=i.db,c=(0,s.D7)(),h=(0,l.$t)(o.getConfig(),c.pie),g=(0,r.D)(t),u=g.append("g");u.attr("transform","translate(225,225)");let{themeVariables:f}=c,[m]=(0,l.I5)(f.pieOuterStrokeWidth);m??=2;let x=h.legendPosition,$=h.textPosition,S=h.donutHole>0&&h.donutHole<=.9?h.donutHole:0,w=(0,p.JL)().innerRadius(185*S).outerRadius(185),y=(0,p.JL)().innerRadius(185*$).outerRadius(185*$),C=u.append("g");C.append("circle").attr("cx",0).attr("cy",0).attr("r",185+m/2).attr("class","pieOuterCircle");let k=o.getSections(),D=v(k),T=[f.pie1,f.pie2,f.pie3,f.pie4,f.pie5,f.pie6,f.pie7,f.pie8,f.pie9,f.pie10,f.pie11,f.pie12],b=0;k.forEach(e=>{b+=e});let A=D.filter(e=>"0"!==(e.data.value/b*100).toFixed(0)),K=(0,d.UM)(T).domain([...k.keys()]);C.selectAll("mySlices").data(A).enter().append("path").attr("d",w).attr("fill",e=>K(e.data.label)).attr("class",e=>{let t="pieCircle";return"hover"===h.highlightSlice?t+=" highlightedOnHover":h.highlightSlice===e.data.label&&(t+=" highlighted"),t}),C.selectAll("mySlices").data(A).enter().append("text").text(e=>(e.data.value/b*100).toFixed(0)+"%").attr("transform",e=>"translate("+y.centroid(e)+")").style("text-anchor","middle").attr("class","slice");let R=u.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-200).attr("class","pieTitleText"),M=[...k.entries()].map(([e,t])=>({label:e,value:t})),O=u.selectAll(".legend").data(M).enter().append("g").attr("class","legend");O.append("rect").attr("width",18).attr("height",18).style("fill",e=>K(e.label)).style("stroke",e=>K(e.label)),O.append("text").attr("x",22).attr("y",14).text(e=>o.getShowData()?`${e.label} [${e.value}]`:e.label);let z=Math.max(...O.selectAll("text").nodes().map(e=>e?.getBoundingClientRect().width??0)),F=450,H=490,I=22*M.length;switch(x){case"center":O.attr("transform",(e,t)=>"translate("+(-z/2-22)+","+(22*t-22*M.length/2)+")");break;case"top":F+=I,O.attr("transform",(e,t)=>`translate(${-z/2-22}, ${22*t-185})`),C.attr("transform",()=>`translate(0, ${I+22})`);break;case"bottom":F+=I,O.attr("transform",(e,t)=>"translate("+(-z/2-22)+","+(22*t- -207)+")");break;case"left":H+=22+z,O.attr("transform",(e,t)=>"translate(-207,"+(22*t-22*M.length/2)+")"),C.attr("transform",()=>`translate(${z+18+4}, 0)`);break;default:H+=22+z,O.attr("transform",(e,t)=>"translate(216,"+(22*t-22*M.length/2)+")")}let L=R.node()?.getBoundingClientRect().width??0,P=Math.min(0,225-L/2),W=Math.max(H,225+L/2)-P;g.attr("viewBox",`${P} 0 ${W} ${F}`),(0,s.a$)(g,F,W,h.useMaxWidth)},"draw");a.d(t,{},{diagram:{parser:T,db:k,renderer:{draw:A},styles:b}})}}]);