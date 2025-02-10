import{p as o,a as E,b as te,c as oe,d as H,f as $,g as C,h as w,j as G,k as h,E as R,l as b,m as _,n as J,o as k}from"./BudA-0nE.js";var U={partName:"myPartA",params:[o("D1","mm",40,10,100,2),o("E1","mm",3,1,50,1),o("L1","mm",50,10,200,10)],paramSvg:{D1:"myPartA_section.svg",E1:"myPartA_section.svg",L1:"myPartA_side.svg"},sim:{tMax:180,tStep:.5,tUpdate:500}};function se(P,e,D=""){const t=H(U.partName+D),S=h(),d=h();t.logstr+=`${t.partName} simTime: ${P}
`;try{const s=e.D1/2;if(s<e.E1)throw`err089: D1 ${e.D1} too small compare to E1 ${e.E1}`;t.logstr+=`myPartA-length: ${$(e.L1)} mm
`,t.logstr+=`myPartA-external-diameter: ${$(e.D1)} mm
`,t.logstr+=`myPartA-internal-diameter: ${$(e.D1-2*e.E1)} mm
`,S.addMainOI([k(0,0,s),k(0,0,s-e.E1)]);const r=_(s,0).addSegStrokeA(s,e.L1).addSegStrokeA(s-e.E1,e.L1).addSegStrokeA(s-e.E1,0).closeSegStroke(),g=_(-s,0).addSegStrokeR(e.E1,0).addSegStrokeR(0,e.L1).addSegStrokeR(-e.E1,0).closeSegStroke();d.addMainO(r),d.addSecond(g),t.fig={faceSection:S,faceSide:d};const n=t.partName;t.vol={extrudes:[{outName:`subpax_${n}`,face:`${n}_faceSection`,extrudeMethod:b.eLinearOrtho,length:e.L1,rotate:[0,0,0],translate:[0,0,0]}],volumes:[{outName:`pax_${n}`,boolMethod:R.eIdentity,inList:[`subpax_${n}`]}]},t.sub={},t.logstr+=`myPartA drawn successfully!
`,t.calcErr=!1}catch(s){t.logstr+=s,console.log(s)}return t}var I={pTitle:"My Part-A",pDescription:"A simple cylinder for showcasing the usage of geometrix",pDef:U,pGeom:se},z={partName:"myPartB",params:[o("L1","mm",60,10,100,10),E("extShape",["circle","triangle-up","triangle-down"]),o("D1","mm",50,10,200,5),te("Inner hollow"),oe("hollow"),E("intShape",["straight","slanted"]),o("S1","mm",20,1,100,1)],paramSvg:{L1:"myPartB_side.svg",extShape:"myPartB_front.svg",D1:"myPartB_front.svg",hollow:"myPartB_hollow.svg",intShape:"myPartB_hollow_shape.svg",S1:"myPartB_hollow_shape.svg"},sim:{tMax:180,tStep:.5,tUpdate:500}};function re(P,e,D=""){const t=H(z.partName+D),S=h(),d=h();t.logstr+=`${t.partName} simTime: ${P}
`;try{const s=e.D1/2,r=s/Math.sqrt(1+2**2);if(r<e.S1/2)throw`err063: D1 ${e.D1} too small compare to S1 ${e.S1}`;t.logstr+=`myPartB-length: ${$(e.L1)} mm
`;const g=[];switch(e.extShape){case 0:g.push(k(0,0,s));break;case 1:{const u=_(0,s).addSegStrokeR(-2*r,-r-s).addSegStrokeR(4*r,0).closeSegStroke();g.push(u)}break;case 2:{const u=_(0,-s).addSegStrokeR(2*r,r+s).addSegStrokeR(-4*r,0).closeSegStroke();g.push(u)}break;default:throw`err087: param.extShape ${e.extShape} unkown!`}if(e.hollow){const u=_(-e.S1/2,-e.S1/2).addSegStrokeR(e.S1,0).addSegStrokeR(0,e.S1).addSegStrokeR(-e.S1,0).closeSegStroke();switch(e.intShape){case 0:g.push(u);break;case 1:g.push(u.rotate(0,0,Math.PI/4));break;default:throw`err107: param.intShape ${e.intShape} unkown!`}}S.addMainOI(g);const n=_(-e.L1/2,-s).addSegStrokeR(e.L1,0).addSegStrokeR(0,2*s).addSegStrokeR(-e.L1,0).closeSegStroke();d.addSecond(n),t.fig={faceFront:S,faceSide:d};const i=t.partName;t.vol={extrudes:[{outName:`subpax_${i}`,face:`${i}_faceFront`,extrudeMethod:b.eLinearOrtho,length:e.L1,rotate:[0,0,0],translate:[0,0,0]}],volumes:[{outName:`pax_${i}`,boolMethod:R.eIdentity,inList:[`subpax_${i}`]}]},t.sub={},t.logstr+=`myPartB drawn successfully!
`,t.calcErr=!1}catch(s){t.logstr+=s,console.log(s)}return t}var ae={pTitle:"My Part-B",pDescription:"A simple part for showcasing the possible parameter types",pDef:z,pGeom:re},K={partName:"myPartC",params:[o("D1","mm",40,10,200,1),o("D2","mm",100,20,200,1),o("D3","mm",30,10,100,1),o("D4","mm",50,20,100,1),o("L1","mm",100,10,300,1),o("L2","mm",100,10,300,1),o("L3","mm",20,10,300,1),o("L4","mm",40,1,300,1),o("H1","mm",50,10,100,1)],paramSvg:{D1:"myPartC_side.svg",D2:"myPartC_side.svg",D3:"myPartC_top.svg",D4:"myPartC_top.svg",L1:"myPartC_cut.svg",L2:"myPartC_cut.svg",L3:"myPartC_cut.svg",L4:"myPartC_cut.svg",H1:"myPartC_cut.svg"},sim:{tMax:180,tStep:.5,tUpdate:500}};function ne(P,e,D=""){const t=H(K.partName+D),S=h(),d=h(),s=h(),r=h(),g=h();t.logstr+=`${t.partName} simTime: ${P}
`;try{const n=e.D1/2,i=e.D2/2,u=e.D3/2,y=e.D4/2;if(e.D1>e.D2)throw`err077: D1 ${e.D1} too large compare to D2 ${e.D2}`;if(e.D4>e.D2)throw`err080: D4 ${e.D4} too large compare to D2 ${e.D2}`;if(e.D3>e.D4)throw`err083: D3 ${e.D3} too large compare to D4 ${e.D4}`;if(e.L1<e.D4+e.L4)throw`err086: L1 ${e.L1} too small compare to D4 ${e.D4} and L4 ${e.L4}`;if(e.L3>e.L1+e.L2)throw`err089: L3 ${e.L3} too large compare to L1 ${e.L1} and L2 ${e.L2}`;t.logstr+=`myPartC-length: ${$(e.L1+e.L2)} mm
`,t.logstr+=`myPartC-height: ${$(e.D2+e.H1)} mm
`;const c=_(-i,0).addSegStrokeA(-i,e.L1).addSegStrokeA(-n,e.L1+e.L2).addSegStrokeR(0,-e.L3).closeSegStroke(),m=_(i,0).addSegStrokeA(i,e.L1).addSegStrokeA(n,e.L1+e.L2).addSegStrokeR(0,-e.L3).closeSegStroke();S.addMainO(c),S.addSecond(m);const l=_(-i,0).addSegStrokeA(-i,e.L1+e.L2).addSegStrokeA(i,e.L1+e.L2).addSegStrokeA(i,e.L4).closeSegStroke();d.addMainO(l);const L=_(-i,0).addSegStrokeA(-n,e.L1+e.L2-e.L3).addSegStrokeR(0,e.L3).addSegStrokeA(0,e.L1+e.L2).addSegStrokeA(0,0).closeSegStroke();s.addMainO(L),s.addSecond(c),s.addSecond(m),r.addMainO(k(0,e.L1-y,y)),r.addSecond(k(0,e.L1-y,u)),r.addSecond(c),r.addSecond(m),g.addMainO(k(0,e.L1-y,u)),g.addSecond(k(0,e.L1-y,y)),g.addSecond(c),g.addSecond(m),t.fig={faceBodyCut:S,faceBodySlant:d,faceBodyHollow:s,faceChimney:r,faceChimneyHollow:g};const a=t.partName;t.vol={extrudes:[{outName:`subpax_${a}_bodyRaw`,face:`${a}_faceBodyCut`,extrudeMethod:b.eRotate,rotate:[0,0,0],translate:[0,0,0]},{outName:`subpax_${a}_bodySlant`,face:`${a}_faceBodySlant`,extrudeMethod:b.eLinearOrtho,length:2*i,rotate:[Math.PI/2,0,-Math.PI/2],translate:[i,0,0]},{outName:`subpax_${a}_bodyH`,face:`${a}_faceBodyHollow`,extrudeMethod:b.eRotate,rotate:[0,0,0],translate:[0,0,0]},{outName:`subpax_${a}_chimney`,face:`${a}_faceChimney`,extrudeMethod:b.eLinearOrtho,length:e.H1+i,rotate:[Math.PI/2,0,0],translate:[0,0,0]},{outName:`subpax_${a}_chimneyH`,face:`${a}_faceChimneyHollow`,extrudeMethod:b.eLinearOrtho,length:e.H1+i,rotate:[Math.PI/2,0,0],translate:[0,0,0]}],volumes:[{outName:`ipax_${a}_body1`,boolMethod:R.eIntersection,inList:[`subpax_${a}_bodyRaw`,`subpax_${a}_bodySlant`]},{outName:`ipax_${a}_body2`,boolMethod:R.eUnion,inList:[`ipax_${a}_body1`,`subpax_${a}_chimney`]},{outName:`ipax_${a}_hollow`,boolMethod:R.eUnion,inList:[`subpax_${a}_bodyH`,`subpax_${a}_chimneyH`]},{outName:`ipax_${a}_body3`,boolMethod:R.eSubstraction,inList:[`ipax_${a}_body2`,`ipax_${a}_hollow`]},{outName:`pax_${a}`,boolMethod:R.eIdentity,inList:[`ipax_${a}_body3`]}]},t.sub={},t.logstr+=`myPartC drawn successfully!
`,t.calcErr=!1}catch(n){t.logstr+=n,console.log(n)}return t}var de={pTitle:"My Part-C",pDescription:"Showcasing extrusions and 3D construction",pDef:K,pGeom:ne},Z={partName:"myPartD",params:[o("D1","mm",60,10,200,1),o("D2","mm",40,10,200,1),o("D3","mm",100,10,200,1),o("D4","mm",80,10,200,1),o("H1","mm",30,-200,200,1)],paramSvg:{D1:"myPartD_face.svg",D2:"myPartD_face.svg",D3:"myPartD_top.svg",D4:"myPartD_top.svg",H1:"myPartD_face.svg"},sim:{tMax:180,tStep:.5,tUpdate:500}};function ce(P,e,D=""){const t=H(Z.partName+D),S=h(),d=h(),s=h(),r=h(),g=h();t.logstr+=`${t.partName} simTime: ${P}
`;try{const n=e.D1/2,i=e.D2/2,u=e.D3/2,y=e.D4/2;if(e.D2>e.D1)throw`err069: D2 ${e.D2} too large compare to D1 ${e.D1}`;if(e.D4>e.D3)throw`err072: D4 ${e.D4} too large compare to D3 ${e.D3}`;if(Math.abs(e.H1)>n+u)throw`err075: abs(H1) ${e.H1} too large compare to D1 ${e.D1} and D3 ${e.D3}`;const c=e.D1+e.D3,m=c,l=c/2,L=e.H1+l;t.logstr+=`myPartD-size: ${$(c)} x ${$(m)} x ${$(L)} mm
`,S.addMainOI([k(0,e.H1,n),k(0,e.H1,i)]);const a=_(-l,-u).addSegStrokeR(m,0).addSegStrokeR(0,e.D3).addSegStrokeR(-m,0).closeSegStroke(),v=_(-l,-y).addSegStrokeR(m,0).addSegStrokeR(0,e.D4).addSegStrokeR(-m,0).closeSegStroke();S.addSecond(a),S.addSecond(v),d.addSecond(k(0,e.H1,n)),d.addMainO(k(0,e.H1,i)),d.addSecond(a),d.addSecond(v),s.addMainOI([k(0,0,u),k(0,0,y)]);const x=_(-l,e.H1-n).addSegStrokeR(c,0).addSegStrokeR(0,e.D1).addSegStrokeR(-c,0).closeSegStroke(),M=_(-l,e.H1-i).addSegStrokeR(c,0).addSegStrokeR(0,e.D2).addSegStrokeR(-c,0).closeSegStroke();s.addSecond(x),s.addSecond(M),r.addSecond(k(0,0,u)),r.addMainO(k(0,0,y)),r.addSecond(x),r.addSecond(M),g.addSecond(a),g.addSecond(v);const N=_(-n,-l).addSegStrokeR(e.D1,0).addSegStrokeR(0,c).addSegStrokeR(-e.D1,0).closeSegStroke(),A=_(-i,-l).addSegStrokeR(e.D2,0).addSegStrokeR(0,c).addSegStrokeR(-e.D2,0).closeSegStroke();g.addSecond(N),g.addSecond(A),t.fig={faceTube1:S,faceTube2:s,faceTube1H:d,faceTube2H:r,faceTop:g};const f=t.partName;t.vol={extrudes:[{outName:`subpax_${f}_tube1`,face:`${f}_faceTube1`,extrudeMethod:b.eLinearOrtho,length:c,rotate:[-Math.PI/2,0,0],translate:[0,-l,2*e.H1]},{outName:`subpax_${f}_tube1H`,face:`${f}_faceTube1H`,extrudeMethod:b.eLinearOrtho,length:c,rotate:[-Math.PI/2,0,0],translate:[0,-l,2*e.H1]},{outName:`subpax_${f}_tube2`,face:`${f}_faceTube2`,extrudeMethod:b.eLinearOrtho,length:m,rotate:[0,Math.PI/2,0],translate:[-l,0,0]},{outName:`subpax_${f}_tube2H`,face:`${f}_faceTube2H`,extrudeMethod:b.eLinearOrtho,length:m,rotate:[0,Math.PI/2,0],translate:[-l,0,0]}],volumes:[{outName:`ipax_${f}_addi`,boolMethod:R.eUnion,inList:[`subpax_${f}_tube1`,`subpax_${f}_tube2`]},{outName:`ipax_${f}_subs`,boolMethod:R.eUnion,inList:[`subpax_${f}_tube1H`,`subpax_${f}_tube2H`]},{outName:`pax_${f}`,boolMethod:R.eSubstraction,inList:[`ipax_${f}_addi`,`ipax_${f}_subs`]}]},t.sub={},t.logstr+=`myPartD drawn successfully!
`,t.calcErr=!1}catch(n){t.logstr+=n,console.log(n)}return t}var T={pTitle:"My Part-D",pDescription:"Illustrating the power of 2D technical drawing",pDef:Z,pGeom:ce},W={partName:"myPartE",params:[o("N1","N",8,0,20,1),o("H1","mm",40,10,100,1),o("H2","mm",20,10,100,1),o("A","mm",10,5,50,1),o("B","mm",20,5,50,1),o("N2","N",8,3,24,1),o("D1","mm",40,10,200,1),o("D2","mm",80,10,200,1),o("S","mm",20,10,50,1)],paramSvg:{N1:"myPartE_cartesian.svg",H1:"myPartE_cartesian.svg",H2:"myPartE_cartesian.svg",A:"myPartE_cartesian.svg",B:"myPartE_cartesian.svg",N2:"myPartE_polarAbsolute.svg",D1:"myPartE_polarAbsolute.svg",D2:"myPartE_polarAbsolute.svg",S:"myPartE_polarRelative.svg"},sim:{tMax:180,tStep:.5,tUpdate:500}};function ie(P,e,D=""){const t=H(W.partName+D),S=h(),d=h(),s=h();t.logstr+=`${t.partName} simTime: ${P}
`;try{const r=e.D1/2,g=e.D2/2,n=2*Math.PI/e.N2;if(e.H2>e.H1)throw`err076: H2 ${e.H2} too large compare to H1 ${e.H1}`;if(e.D1>e.D2)throw`err069: D1 ${e.D1} too large compare to D2 ${e.D2}`;const i=e.A+(e.B+e.A)*e.N1,u=e.S*(2*Math.cos(Math.PI/3)+2*Math.cos(2*Math.PI/9)+2*Math.cos(Math.PI/9)+1);t.logstr+=`myPartE-size1: ${$(i)} mm
`,t.logstr+=`myPartE-size2: ${$(e.D2)} mm
`,t.logstr+=`myPartE-size3: ${$(u)} mm
`;const y=_(0,0).addSegStrokeA(0,e.H1).addSegStrokeA(e.A,e.H1);for(let L=0;L<e.N1;L++)y.addSegStrokeR(e.B/2,-e.H2).addSegStrokeR(e.B/2,e.H2).addSegStrokeR(e.A,0);y.addSegStrokeR(0,-e.H1).closeSegStroke(),S.addMainO(y);const c=_(r,0);for(let L=1;L<e.N2;L++)c.addSegStrokeAP(L*n,g).addSegStrokeAP(L*n,r);c.addSegStrokeAP(0,g).closeSegStroke(),d.addMainO(c);const m=_(0,0).addSegStrokeRP(Math.PI/3,e.S).addSegStrokeRP(2*Math.PI/9,e.S).addSegStrokeRP(Math.PI/9,e.S).addSegStrokeRP(0,e.S).addSegStrokeRP(-Math.PI/9,e.S).addSegStrokeRP(-2*Math.PI/9,e.S).addSegStrokeRP(-Math.PI/3,e.S).closeSegStroke();s.addMainO(m),t.fig={faceCartesian:S,facePolarAbs:d,facePolarRel:s};const l=t.partName;t.vol={extrudes:[{outName:`subpax_${l}_cartesian`,face:`${l}_faceCartesian`,extrudeMethod:b.eLinearOrtho,length:1,rotate:[0,0,0],translate:[0,0,0]},{outName:`subpax_${l}_polarAbs`,face:`${l}_facePolarAbs`,extrudeMethod:b.eLinearOrtho,length:1,rotate:[0,0,0],translate:[0,0,100]},{outName:`subpax_${l}_polarRel`,face:`${l}_facePolarRel`,extrudeMethod:b.eLinearOrtho,length:1,rotate:[0,0,0],translate:[0,0,200]}],volumes:[{outName:`pax_${l}`,boolMethod:R.eUnion,inList:[`subpax_${l}_cartesian`,`subpax_${l}_polarAbs`,`subpax_${l}_polarRel`]}]},t.sub={},t.logstr+=`myPartE drawn successfully!
`,t.calcErr=!1}catch(r){t.logstr+=r,console.log(r)}return t}var ge={pTitle:"My Part-E",pDescription:"illustrating Cartesian (absolute and relative) and polar (absolute and relative) coordinates",pDef:W,pGeom:ie},j={partName:"myPartF",params:[o("L1","mm",200,10,400,1),o("H1","mm",100,10,400,1),o("H2","mm",60,10,400,1),o("L2","mm",60,10,400,1),o("L3","mm",40,10,400,1),o("R1","mm",10,0,50,1),o("R2","mm",10,0,50,1),o("R3","mm",10,0,50,1),o("R4","mm",10,0,50,1),E("CS",["pointed","rounded","widened","wideAcc"]),o("R5","mm",10,0,50,1),o("extrudLength","mm",50,1,400,1)],paramSvg:{L1:"myPartF_corners.svg",H1:"myPartF_corners.svg",H2:"myPartF_corners.svg",L2:"myPartF_corners.svg",L3:"myPartF_corners.svg",R1:"myPartF_corners.svg",R2:"myPartF_corners.svg",R3:"myPartF_corners.svg",R4:"myPartF_corners.svg",CS:"myPartF_corners.svg",R5:"myPartF_corners.svg"},sim:{tMax:180,tStep:.5,tUpdate:500}};function le(P,e,D=""){const t=H(j.partName+D),S=h();t.logstr+=`${t.partName} simTime: ${P}
`;try{const d=(e.L1-e.L2-e.L3)/3,s=(e.H1-e.H2)/2;if(e.H2>e.H1)throw`err076: H2 ${e.H2} too large compare to H1 ${e.H1}`;if(e.L2+e.L3>e.L1)throw`err069: L1 ${e.L1} too small compare to L2 ${e.L2} and L3 ${e.L3}`;t.logstr+=`myPartF intermediate distance horizontal: ${$(d)} mm, vertical: ${$(s)} mm
`;const r=[],g=_(0,0).addCornerPointed().addSegStrokeA(e.L1,0).addCornerRounded(e.R2).addSegStrokeA(e.L1,e.H1).addCornerPointed().addSegStrokeA(0,e.H1).addCornerRounded(e.R1).closeSegStroke();r.push(g);const n=_(d,s).addSegStrokeR(e.L2,0).addCornerRounded(e.R3).addSegStrokeR(0,e.H2).addCornerWidened(e.R4).addSegStrokeR(-e.L2,0).addCornerRounded(e.R3).closeSegStroke().addCornerWidened(e.R4);r.push(n);const i=_(d,s).addSegStrokeR(e.L2/2,0).addSegStrokeR(e.L2/2,e.H2/2).addSegStrokeR(0,e.H2/2).addSegStrokeR(-e.L2/2,0).addSegStrokeR(-e.L2/2,-e.H2/2).closeSegStroke();S.addSecond(i);const u=_(e.L2+2*d,s).addSegStrokeR(e.L3,0).addSegStrokeR(-e.L3/2,e.H2);switch(e.CS){case 0:u.addCornerPointed();break;case 1:u.addCornerRounded(e.R5);break;case 2:u.addCornerWidened(e.R5);break;case 3:u.addCornerWideAcc(e.R5);break;default:u.addCornerPointed()}u.closeSegStroke(),r.push(u);const y=_(e.L2+2*d,s).addSegStrokeR(e.L3,0).addSegStrokeR(-e.L3/2,e.H2).closeSegStroke();S.addSecond(y),S.addMainOI(r),t.fig={faceCorners:S};const c=t.partName;t.vol={extrudes:[{outName:`subpax_${c}_corners`,face:`${c}_faceCorners`,extrudeMethod:b.eLinearOrtho,length:e.extrudLength,rotate:[0,0,0],translate:[0,0,0]}],volumes:[{outName:`pax_${c}`,boolMethod:R.eIdentity,inList:[`subpax_${c}_corners`]}]},t.sub={},t.logstr+=`myPartF drawn successfully!
`,t.calcErr=!1}catch(d){t.logstr+=d,console.log(d)}return t}var p={pTitle:"My Part-F",pDescription:"illustrating of contours with different types of corners",pDef:j,pGeom:le},q={partName:"myPartG",params:[o("A","mm",100,10,400,1),o("B","mm",200,10,400,1),o("R","mm",10,0,50,1),o("C","mm",100,10,400,1),o("SF1","1.0",2,.5,3,.1),o("Z1","degree",45,-180,180,1),o("extrudLength","mm",10,1,100,1)],paramSvg:{A:"myPartG_transforms.svg",B:"myPartG_transforms.svg",R:"myPartG_transforms.svg",C:"myPartG_transforms.svg",SF1:"myPartG_transforms.svg",Z1:"myPartG_transforms.svg",extrudLength:"myPartG_transforms.svg"},sim:{tMax:180,tStep:.5,tUpdate:500}};function Se(P,e,D=""){const t=H(q.partName+D),S=h();t.logstr+=`${t.partName} simTime: ${P}
`;try{const d=4*e.C+(1+2*e.SF1)*e.A,s=Math.max(e.A,e.B),r=5*s;t.logstr+=`myPartG size horizontal: ${$(d)} mm, vertical: ${$(r)} mm
`;const g=[],n=_(0,0).addSegStrokeR(d,0).addSegStrokeR(0,r).addSegStrokeR(-d,0).closeSegStroke();g.push(n);const i=_(e.C,s).addSegStrokeR(e.A,0).addSegStrokeR(-e.A/2,e.B).addCornerRounded(e.R).closeSegStroke();g.push(i);const y=i.scale(e.C,s,e.SF1,!1).translate(e.A+e.C,0);g.push(y);const c=(1+e.SF1)*e.A+2*e.C;g.push(i.scale(e.C,s,e.SF1,!0).translate(c,0));const m=i.rotate(e.C+e.A/2,s+e.B/2,J(e.Z1)).translatePolar(2*Math.PI/5,2.5*s);g.push(m);const l=i.rotate(e.C+e.A/2,s+e.B/2,J(-e.Z1)).translatePolar(2*Math.PI/5,2.5*s).translate(2*s,0);g.push(l),S.addMainOI(g),t.fig={faceTransforms:S};const L=t.partName;t.vol={extrudes:[{outName:`subpax_${L}_tf`,face:`${L}_faceTransforms`,extrudeMethod:b.eLinearOrtho,length:e.extrudLength,rotate:[0,0,0],translate:[0,0,0]}],volumes:[{outName:`pax_${L}`,boolMethod:R.eIdentity,inList:[`subpax_${L}_tf`]}]},t.sub={},t.logstr+=`myPartG drawn successfully!
`,t.calcErr=!1}catch(d){t.logstr+=d,console.log(d)}return t}var O={pTitle:"My Part-G",pDescription:"illustrating the transformations of contours",pDef:q,pGeom:Se},X={partName:"myPartH",params:[o("A1","mm",60,10,200,1),o("A2","mm",100,10,200,1),o("A3","mm",60,10,200,1),o("N1","N",3,2,12,1),o("N2","N",3,1,12,1),o("B","mm",40,10,200,1),o("SF1","1.0",1.2,.5,2,.1),o("E","mm",10,0,50,1)],paramSvg:{A1:"myPartH_circle.svg",A2:"myPartH_circle.svg",A3:"myPartH_circle.svg",N1:"myPartH_circle.svg",N2:"myPartH_line.svg",B:"myPartH_line.svg",SF1:"myPartH_line.svg",E:"myPartH_line.svg"},sim:{tMax:180,tStep:.5,tUpdate:500}};function me(P,e,D=""){const t=H(X.partName+D),S=h(),d=h();t.logstr+=`${t.partName} simTime: ${P}
`;try{const s=2*Math.PI/e.N1,r=[...Array(e.N2).keys()].map(m=>e.SF1**m),g=r.reduce((m,l)=>m+l,0),n=e.B*(e.N2-1)+e.A1*g;if(e.A3>e.A2+e.E)throw`err076: A3 ${e.A3} too large compare to A2 ${e.A2} and E ${e.E}`;t.logstr+=`myPartH line size: ${$(n)} mm
`;const i=_(0,0).addSegStrokeR(0,-e.A2).addSegStrokeR(e.A1/2,e.A3).addSegStrokeR(e.A1/2,-e.A3).addSegStrokeR(0,e.A2),u=_(n,0);for(let m=0;m<e.N1;m++)u.addPartial(i.rotate(0,0,m*s));S.addMainO(u);const y=_(0,0).addSegStrokeR(0,-e.E).addPartial(i);for(let m=1;m<e.N2;m++)y.addSegStrokeR(e.B,0).addPartial(i.scale(0,0,r[m]));y.addSegStrokeR(0,e.E).closeSegStroke(),d.addMainO(y),t.fig={faceCircle:S,faceLine:d};const c=t.partName;t.vol={extrudes:[{outName:`subpax_${c}_circle`,face:`${c}_faceCircle`,extrudeMethod:b.eLinearOrtho,length:1,rotate:[0,0,0],translate:[0,0,0]},{outName:`subpax_${c}_line`,face:`${c}_faceLine`,extrudeMethod:b.eLinearOrtho,length:1,rotate:[0,0,0],translate:[0,0,0]}],volumes:[{outName:`pax_${c}`,boolMethod:R.eUnion,inList:[`subpax_${c}_circle`,`subpax_${c}_line`]}]},t.sub={},t.logstr+=`myPartH drawn successfully!
`,t.calcErr=!1}catch(s){t.logstr+=s,console.log(s)}return t}var ue={pTitle:"My Part-H",pDescription:"illustrating contours made out of partial contours",pDef:X,pGeom:me},B={partName:"myPartI",params:[o("A","mm",30,10,200,1),o("B","mm",20,10,200,1),o("R1","mm",10,0,50,1)],paramSvg:{A:"myPartI_face.svg",B:"myPartI_face.svg",R1:"myPartI_face.svg"},sim:{tMax:100,tStep:.5,tUpdate:500}};function fe(P,e,D=""){const t=H(B.partName+D),S=h(),d=h();t.logstr+=`${t.partName} simTime: ${P}
`;try{const s=6*e.A,r=4*e.B,g=Math.PI/2*P/B.sim.tMax,n=Math.PI/2*P/B.sim.tMax+Math.PI/4,i=Math.PI/2*P/B.sim.tMax-Math.PI/4;t.logstr+=`myPartI size: ${$(s)} x ${$(r)} mm
`;const u=[],y=_(0,0).addSegStrokeR(s,0).addSegStrokeR(0,r).addCornerRounded(e.R1).addSegStrokeR(-s,0).closeSegStroke();u.push(y);const c=_(0,0).addSegStrokeR(e.A,0).addSegStrokeR(-e.A/2,2*e.B).closeSegStroke();u.push(c.translate(e.A,e.B)),u.push(c.rotate(0,0,Math.PI).translate(3.5*e.A,3*e.B)),u.push(c.translate(4*e.A,e.B)),S.addMainOI(u),d.mergeFigure(S.rotate(s/2,r/2,g)),d.mergeFigure(S.rotate(s/2,r/2,n).translate(-1.5*s,0),!0),d.mergeFigure(S.rotate(s/2,r/2,i).translatePolar(0,1.5*s),!0),t.fig={face2:d};const m=t.partName;t.vol={extrudes:[{outName:`subpax_${m}_2`,face:`${m}_face2`,extrudeMethod:b.eLinearOrtho,length:1,rotate:[0,0,0],translate:[0,0,0]}],volumes:[{outName:`pax_${m}`,boolMethod:R.eIdentity,inList:[`subpax_${m}_2`]}]},t.sub={},t.logstr+=`myPartI drawn successfully!
`,t.calcErr=!1}catch(s){t.logstr+=s,console.log(s)}return t}var V={pTitle:"My Part-I",pDescription:"illustrating figure transforms",pDef:B,pGeom:fe},Q={partName:"myPartJ",params:[o("F1H2","mm",300,10,400,1),o("F1L2","mm",300,10,400,1),o("F1L3","mm",300,10,400,1),o("F1R1","mm",10,0,50,1),o("F1R2","mm",10,0,50,1),o("F1R3","mm",10,0,50,1),o("F1R4","mm",10,0,50,1),E("F1CS",["pointed","rounded","widened","wideAcc"]),o("F1R5","mm",10,0,50,1),o("F2A","mm",100,10,400,1),o("F2B","mm",200,10,400,1),o("F2R","mm",10,0,50,1),o("F2C","mm",100,10,400,1),o("F2SF1","1.0",2,.5,3,.1),o("F2Z1","degree",45,-180,180,1),o("F3B","mm",140,10,200,1),o("F3R1","mm",10,0,50,1)],paramSvg:{F1H2:"myPartJ_face1.svg",F1L2:"myPartJ_face1.svg",F1L3:"myPartJ_face1.svg",F1R1:"myPartJ_face1.svg",F1R2:"myPartJ_face1.svg",F1R3:"myPartJ_face1.svg",F1R4:"myPartJ_face1.svg",F1CS:"myPartJ_face1.svg",F1R5:"myPartJ_face1.svg",F2A:"myPartJ_face2.svg",F2B:"myPartJ_face2.svg",F2R:"myPartJ_face2.svg",F2C:"myPartJ_face2.svg",F2SF1:"myPartJ_face2.svg",F2Z1:"myPartJ_face2.svg",F3B:"myPartJ_face3.svg",F3R1:"myPartJ_face3.svg"},sim:{tMax:100,tStep:.5,tUpdate:500}};function Pe(P,e,D=""){const t=H(Q.partName+D),S=h(),d=h(),s=h();t.logstr+=`${t.partName} simTime: ${P}
`;try{const r=4*e.F2C+(1+2*e.F2SF1)*e.F2A,g=5*Math.max(e.F2A,e.F2B),n=g,i=n/6,u=4*e.F3B,y=g,c=u,m=r,l=c,L=m;if(e.F1H2>l)throw`err076: F1H2 ${e.F1H2} too large compare to H1 ${l}`;if(e.F1L2+e.F1L3>L)throw`err069: L1 ${L} too small compare to F1L2 ${e.F1L2} and F1L3 ${e.F1L3}`;t.logstr+=`myPartJ size: ${$(m)} x ${$(c)} x ${$(y)} mm
`;const a=C(p.pDef);a.setVal("L1",m),a.setVal("H1",c),a.setVal("H2",e.F1H2),a.setVal("L2",e.F1L2),a.setVal("L3",e.F1L3),a.setVal("R1",e.F1R1),a.setVal("R2",e.F1R2),a.setVal("R3",e.F1R3),a.setVal("R4",e.F1R4),a.setVal("CS",e.F1CS),a.setVal("R5",e.F1R5);const v=p.pGeom(0,a.getParamVal(),a.getSuffix());w(v),t.logstr+=G(v.logstr,a.getPartNameSuffix());const x=C(O.pDef);x.setVal("A",e.F2A),x.setVal("B",e.F2B),x.setVal("R",e.F2R),x.setVal("C",e.F2C),x.setVal("SF1",e.F2SF1),x.setVal("Z1",e.F2Z1);const M=O.pGeom(0,x.getParamVal(),x.getSuffix());w(M),t.logstr+=G(M.logstr,x.getPartNameSuffix());const N=C(V.pDef);N.setVal("A",i),N.setVal("B",e.F3B),N.setVal("R1",e.F3R1);const A=V.pGeom(P,N.getParamVal(),N.getSuffix());w(A),t.logstr+=G(A.logstr,N.getPartNameSuffix()),S.mergeFigure(v.fig.faceCorners),d.mergeFigure(M.fig.faceTransforms),s.mergeFigure(A.fig.face2),t.fig={face1:S,face2:d,face3:s};const f=t.partName;t.vol={extrudes:[{outName:`subpax_${f}_1`,face:`${f}_face1`,extrudeMethod:b.eLinearOrtho,length:y,rotate:[0,0,0],translate:[0,0,0]},{outName:`subpax_${f}_2`,face:`${f}_face2`,extrudeMethod:b.eLinearOrtho,length:c,rotate:[-Math.PI/2,0,0],translate:[0,0,g]},{outName:`subpax_${f}_3`,face:`${f}_face3`,extrudeMethod:b.eLinearOrtho,length:m,rotate:[0,Math.PI/2,0],translate:[0,0,n]}],volumes:[{outName:`pax_${f}`,boolMethod:R.eIntersection,inList:[`subpax_${f}_1`,`subpax_${f}_2`,`subpax_${f}_3`]}]},t.sub={myPartF_1:{partName:a.getPartName(),dparam:a.getDesignParamList(),orientation:[0,0,0],position:[0,0,0]},myPartG_1:{partName:x.getPartName(),dparam:x.getDesignParamList(),orientation:[0,0,0],position:[0,0,0]},myPartI_1:{partName:N.getPartName(),dparam:N.getDesignParamList(),orientation:[0,0,0],position:[0,0,0]}},t.logstr+=`myPartJ drawn successfully!
`,t.calcErr=!1}catch(r){t.logstr+=r,console.log(r)}return t}var _e={pTitle:"My Part-J",pDescription:"re-using figures of other designs",pDef:Q,pGeom:Pe},Y={partName:"myPartK",params:[o("D1","mm",60,10,200,1),o("D2","mm",40,10,200,1),o("D3","mm",100,10,200,1),o("D4","mm",80,10,200,1),o("H1","mm",30,-200,200,1),o("L1","mm",30,10,200,1),o("L2","mm",30,0,200,1)],paramSvg:{D1:"myPartK_face.svg",D2:"myPartK_face.svg",D3:"myPartK_top.svg",D4:"myPartK_top.svg",H1:"myPartK_face.svg",L1:"myPartK_top.svg",L2:"myPartK_top.svg"},sim:{tMax:100,tStep:.5,tUpdate:500}};function ye(P,e,D=""){const t=H(Y.partName+D),S=h(),d=h(),s=h();t.logstr+=`${t.partName} simTime: ${P}
`;try{const r=e.D1/2,g=e.D3/2;if(e.D2>e.D1)throw`err069: D2 ${e.D2} too large compare to D1 ${e.D1}`;if(e.D4>e.D3)throw`err072: D4 ${e.D4} too large compare to D3 ${e.D3}`;if(Math.abs(e.H1)>r+g)throw`err075: abs(H1) ${e.H1} too large compare to D1 ${e.D1} and D3 ${e.D3}`;const n=(e.D1+e.D3)/2,i=2*n+2*(e.L1+e.L2),u=i,y=Math.min(e.D1,e.D3)/2,c=Math.max(e.D1,e.D3)/2,m=c+Math.max(c,Math.abs(e.H1)+y);t.logstr+=`myPartK-size: ${$(i)} x ${$(u)} x ${$(m)} mm
`;const l=C(T.pDef);l.setVal("D1",e.D1),l.setVal("D2",e.D2),l.setVal("D3",e.D3),l.setVal("D4",e.D4),l.setVal("H1",e.H1);const L=T.pGeom(0,l.getParamVal(),l.getSuffix());w(L),t.logstr+=G(L.logstr,l.getPartNameSuffix());const a=C(I.pDef,"ref1");a.setVal("D1",e.D1),a.setVal("E1",(e.D1-e.D2)/2),a.setVal("L1",e.L1);const v=I.pGeom(0,a.getParamVal(),a.getSuffix());w(v),t.logstr+=G(v.logstr,a.getPartNameSuffix());const x=C(I.pDef,"ref2");x.setVal("D1",e.D3),x.setVal("E1",(e.D3-e.D4)/2),x.setVal("L1",e.L1);const M=I.pGeom(0,x.getParamVal(),x.getSuffix());w(M),t.logstr+=G(M.logstr,x.getPartNameSuffix());const N=v.fig.faceSide,A=v.fig.faceSide.rotate(0,0,Math.PI/2),f=M.fig.faceSide.rotate(0,0,Math.PI/2);S.mergeFigure(L.fig.faceTube1),S.mergeFigure(f.translate(-n-e.L2,0)),S.mergeFigure(f.translate(n+e.L2+e.L1,0)),d.mergeFigure(L.fig.faceTube2),d.mergeFigure(A.translate(-n-e.L2,e.H1)),d.mergeFigure(A.translate(n+e.L2+e.L1,e.H1)),s.mergeFigure(L.fig.faceTop),s.mergeFigure(f.translate(-n-e.L2,0)),s.mergeFigure(f.translate(n+e.L2+e.L1,0)),s.mergeFigure(N.translate(0,n+e.L2)),s.mergeFigure(N.translate(0,-n-e.L2-e.L1)),t.fig={faceSide1:S,faceSide2:d,faceTop:s};const F=t.partName;t.vol={inherits:[{outName:`inpax_${F}_A11`,subdesign:"pax_myPartAref1",subgeom:v,rotate:[-Math.PI/2,0,0],translate:[0,-n-e.L2-e.L1,e.H1]},{outName:`inpax_${F}_A12`,subdesign:"pax_myPartAref1",subgeom:v,rotate:[-Math.PI/2,0,0],translate:[0,n+e.L2,e.H1]},{outName:`inpax_${F}_A21`,subdesign:"pax_myPartAref2",subgeom:M,rotate:[0,Math.PI/2,0],translate:[-n-e.L2-e.L1,0,0]},{outName:`inpax_${F}_A22`,subdesign:"pax_myPartAref2",subgeom:M,rotate:[0,Math.PI/2,0],translate:[n+e.L2,0,0]},{outName:`inpax_${F}_cross`,subdesign:"pax_myPartD",subgeom:L,rotate:[0,0,0],translate:[0,0,0]}],extrudes:[],volumes:[{outName:`pax_${F}`,boolMethod:R.eUnion,inList:[`inpax_${F}_A11`,`inpax_${F}_A12`,`inpax_${F}_A21`,`inpax_${F}_A22`,`inpax_${F}_cross`]}]},t.sub={myPartA_1:{partName:a.getPartName(),dparam:a.getDesignParamList(),orientation:[0,0,0],position:[0,0,0]},myPartA_2:{partName:x.getPartName(),dparam:x.getDesignParamList(),orientation:[0,0,0],position:[0,0,0]},myPartD_1:{partName:l.getPartName(),dparam:l.getDesignParamList(),orientation:[0,0,0],position:[0,0,0]}},t.logstr+=`myPartK drawn successfully!
`,t.calcErr=!1}catch(r){t.logstr+=r,console.log(r)}return t}var he={pTitle:"My Part-K",pDescription:"assembling 3D-parts defined elsewhere",pDef:Y,pGeom:ye};const ee={"desi51/myGroup1/myPartA":I,"desi51/myGroup1/myPartB":ae,"desi51/myGroup1/myPartC":de,"desi51/myGroup1/myPartD":T,"desi51/myGroup2/myPartE":ge,"desi51/myGroup2/myPartF":p,"desi51/myGroup2/myPartG":O,"desi51/myGroup2/myPartH":ue,"desi51/myGroup2/myPartI":V,"desi51/myGroup2/myPartJ":_e,"desi51/myGroup2/myPartK":he};function De(P){const e=/^.*\//g;return P.replace(e,"")}function Le(P){const e={};for(const D of Object.keys(P)){const t=De(D);e[t]=`/${D}`}return e}function $e(P){const e=[];for(const D of Object.keys(P))e.push(D);return e}const be=Le(ee),Re=$e(ee);export{ee as a,be as b,Re as d};
