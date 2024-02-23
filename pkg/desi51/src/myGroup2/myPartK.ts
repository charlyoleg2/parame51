// myPartK.ts
// tutorial-11 : assembling 3D-parts defined in other pages

// step-1 : import from geometrix
import type {
	//tContour,
	tParamDef,
	tParamVal,
	tGeom,
	//tExtrude,
	tPageDef
	//tSubInst
	//tSubDesign
} from 'geometrix';
import {
	designParam,
	checkGeom,
	prefixLog,
	//contour,
	//contourCircle,
	figure,
	//degToRad,
	//radToDeg,
	ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	initGeom,
	//EExtrude,
	EBVolume
} from 'geometrix';

// design import
import { myPartADef } from '../myGroup1/myPartA';
import { myPartDDef } from '../myGroup1/myPartD';

// step-2 : definition of the parameters and more (part-name, svg associated to each parameter, simulation parameters)
const pDef: tParamDef = {
	partName: 'myPartK',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 60, 10, 200, 1),
		pNumber('D2', 'mm', 40, 10, 200, 1),
		pNumber('D3', 'mm', 100, 10, 200, 1),
		pNumber('D4', 'mm', 80, 10, 200, 1),
		pNumber('H1', 'mm', 30, -200, 200, 1),
		pNumber('L1', 'mm', 30, 10, 200, 1),
		pNumber('L2', 'mm', 30, 0, 200, 1)
	],
	paramSvg: {
		D1: 'myPartK_face.svg',
		D2: 'myPartK_face.svg',
		D3: 'myPartK_top.svg',
		D4: 'myPartK_top.svg',
		H1: 'myPartK_face.svg',
		L1: 'myPartK_top.svg',
		L2: 'myPartK_top.svg'
	},
	sim: {
		tMax: 100,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

// step-3 : definition of the function that creates from the parameter-values the figures and construct the 3D
function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	const figSide1 = figure();
	const figSide2 = figure();
	const figTop = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const R1 = param.D1 / 2;
		//const R2 = param.D2 / 2;
		const R3 = param.D3 / 2;
		//const R4 = param.D4 / 2;
		// step-5 : checks on the parameter values
		if (param.D2 > param.D1) {
			throw `err069: D2 ${param.D2} too large compare to D1 ${param.D1}`;
		}
		if (param.D4 > param.D3) {
			throw `err072: D4 ${param.D4} too large compare to D3 ${param.D3}`;
		}
		if (Math.abs(param.H1) > R1 + R3) {
			throw `err075: abs(H1) ${param.H1} too large compare to D1 ${param.D1} and D3 ${param.D3}`;
		}
		// step-6 : any logs
		const l132 = (param.D1 + param.D3) / 2;
		const s1 = 2 * l132 + 2 * (param.L1 + param.L2);
		const s2 = s1;
		const Rmin = Math.min(param.D1, param.D3) / 2;
		const Rmax = Math.max(param.D1, param.D3) / 2;
		const s3 = Rmax + Math.max(Rmax, Math.abs(param.H1) + Rmin);
		rGeome.logstr += `myPartK-size: ${ffix(s1)} x ${ffix(s2)} x ${ffix(s3)} mm\n`;
		// step-7a : sub-design
		// myPartD
		const myPartDParam = designParam(myPartDDef.pDef);
		myPartDParam.setVal('D1', param.D1);
		myPartDParam.setVal('D2', param.D2);
		myPartDParam.setVal('D3', param.D3);
		myPartDParam.setVal('D4', param.D4);
		myPartDParam.setVal('H1', param.H1);
		const myPartDGeom = myPartDDef.pGeom(
			0,
			myPartDParam.getParamVal(),
			myPartDParam.getSuffix()
		);
		checkGeom(myPartDGeom);
		rGeome.logstr += prefixLog(myPartDGeom.logstr, myPartDParam.getPartNameSuffix());
		// myPartA-1
		const myPartAParam_1 = designParam(myPartADef.pDef, 'ref1');
		myPartAParam_1.setVal('D1', param.D1);
		myPartAParam_1.setVal('E1', (param.D1 - param.D2) / 2);
		myPartAParam_1.setVal('L1', param.L1);
		const myPartAGeom_1 = myPartADef.pGeom(
			0,
			myPartAParam_1.getParamVal(),
			myPartAParam_1.getSuffix()
		);
		checkGeom(myPartAGeom_1);
		rGeome.logstr += prefixLog(myPartAGeom_1.logstr, myPartAParam_1.getPartNameSuffix());
		// myPartA-2
		const myPartAParam_2 = designParam(myPartADef.pDef, 'ref2');
		myPartAParam_2.setVal('D1', param.D3);
		myPartAParam_2.setVal('E1', (param.D3 - param.D4) / 2);
		myPartAParam_2.setVal('L1', param.L1);
		const myPartAGeom_2 = myPartADef.pGeom(
			0,
			myPartAParam_2.getParamVal(),
			myPartAParam_2.getSuffix()
		);
		checkGeom(myPartAGeom_2);
		rGeome.logstr += prefixLog(myPartAGeom_2.logstr, myPartAParam_2.getPartNameSuffix());
		// step-7b : drawing of the figures
		const partA1v = myPartAGeom_1.fig.faceSide;
		const partA1 = myPartAGeom_1.fig.faceSide.rotate(0, 0, Math.PI / 2);
		const partA2 = myPartAGeom_2.fig.faceSide.rotate(0, 0, Math.PI / 2);
		figSide1.mergeFigure(myPartDGeom.fig.faceTube1);
		figSide1.mergeFigure(partA2.translate(-l132 - param.L2, 0));
		figSide1.mergeFigure(partA2.translate(l132 + param.L2 + param.L1, 0));
		figSide2.mergeFigure(myPartDGeom.fig.faceTube2);
		figSide2.mergeFigure(partA1.translate(-l132 - param.L2, param.H1));
		figSide2.mergeFigure(partA1.translate(l132 + param.L2 + param.L1, param.H1));
		figTop.mergeFigure(myPartDGeom.fig.faceTop);
		figTop.mergeFigure(partA2.translate(-l132 - param.L2, 0));
		figTop.mergeFigure(partA2.translate(l132 + param.L2 + param.L1, 0));
		figTop.mergeFigure(partA1v.translate(0, l132 + param.L2));
		figTop.mergeFigure(partA1v.translate(0, -l132 - param.L2 - param.L1));
		// final figure list
		rGeome.fig = {
			faceSide1: figSide1,
			faceSide2: figSide2,
			faceTop: figTop
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			inherits: [
				{
					outName: `inpax_${designName}_A11`,
					subdesign: 'pax_myPartA',
					subgeom: myPartAGeom_1,
					rotate: [-Math.PI / 2, 0, 0],
					translate: [0, -l132 - param.L2 - param.L1, 2 * param.H1]
				},
				{
					outName: `inpax_${designName}_A12`,
					subdesign: 'pax_myPartA',
					subgeom: myPartAGeom_1,
					rotate: [-Math.PI / 2, 0, 0],
					translate: [0, l132 + param.L2, 2 * param.H1]
				},
				{
					outName: `inpax_${designName}_A21`,
					subdesign: 'pax_myPartA',
					subgeom: myPartAGeom_2,
					rotate: [0, Math.PI / 2, 0],
					translate: [-l132 - param.L2 - param.L1, 0, 0]
				},
				{
					outName: `inpax_${designName}_A22`,
					subdesign: 'pax_myPartA',
					subgeom: myPartAGeom_2,
					rotate: [0, Math.PI / 2, 0],
					translate: [l132 + param.L2, 0, 0]
				},
				{
					outName: `inpax_${designName}_cross`,
					subdesign: 'pax_myPartD',
					subgeom: myPartDGeom,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			extrudes: [],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`inpax_${designName}_A11`,
						`inpax_${designName}_A12`,
						`inpax_${designName}_A21`,
						`inpax_${designName}_A22`,
						`inpax_${designName}_cross`
					]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		rGeome.sub = {
			myPartA_1: {
				partName: myPartAParam_1.getPartName(),
				dparam: myPartAParam_1.getDesignParamList(),
				orientation: [0, 0, 0],
				position: [0, 0, 0]
			},
			myPartA_2: {
				partName: myPartAParam_2.getPartName(),
				dparam: myPartAParam_2.getDesignParamList(),
				orientation: [0, 0, 0],
				position: [0, 0, 0]
			},
			myPartD_1: {
				partName: myPartDParam.getPartName(),
				dparam: myPartDParam.getDesignParamList(),
				orientation: [0, 0, 0],
				position: [0, 0, 0]
			}
		};
		// step-10 : final log message
		rGeome.logstr += 'myPartK drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartKDef: tPageDef = {
	pTitle: 'My Part-K',
	pDescription: 'assembling 3D-parts defined elsewhere',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartKDef };
