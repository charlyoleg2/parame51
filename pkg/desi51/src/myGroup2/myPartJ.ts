// myPartJ.ts
// tutorial-10 : illustrating how to re-use figures of other designs

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
	pDropdown,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

// design import
import { myPartFDef } from './myPartF';
import { myPartGDef } from './myPartG';
import { myPartIDef } from './myPartI';

// step-2 : definition of the parameters and more (part-name, svg associated to each parameter, simulation parameters)
const pDef: tParamDef = {
	partName: 'myPartJ',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('F1H2', 'mm', 300, 10, 400, 1), // original default: 60
		pNumber('F1L2', 'mm', 300, 10, 400, 1), // original default: 60
		pNumber('F1L3', 'mm', 300, 10, 400, 1), // original default: 40
		pNumber('F1R1', 'mm', 10, 0, 50, 1),
		pNumber('F1R2', 'mm', 10, 0, 50, 1),
		pNumber('F1R3', 'mm', 10, 0, 50, 1),
		pNumber('F1R4', 'mm', 10, 0, 50, 1),
		pDropdown('F1CS', ['pointed', 'rounded', 'widened', 'wideAcc']), // the first ('pointed') is default
		pNumber('F1R5', 'mm', 10, 0, 50, 1),
		pNumber('F2A', 'mm', 100, 10, 400, 1),
		pNumber('F2B', 'mm', 200, 10, 400, 1),
		pNumber('F2R', 'mm', 10, 0, 50, 1),
		pNumber('F2C', 'mm', 100, 10, 400, 1),
		pNumber('F2SF1', '1.0', 2, 0.5, 3, 0.1),
		pNumber('F2Z1', 'degree', 45, -180, 180, 1),
		//pNumber('F3A', 'mm', 30, 10, 200, 1),
		pNumber('F3B', 'mm', 140, 10, 200, 1), // original default: 20
		pNumber('F3R1', 'mm', 10, 0, 50, 1)
	],
	paramSvg: {
		F1H2: 'myPartJ_face1.svg',
		F1L2: 'myPartJ_face1.svg',
		F1L3: 'myPartJ_face1.svg',
		F1R1: 'myPartJ_face1.svg',
		F1R2: 'myPartJ_face1.svg',
		F1R3: 'myPartJ_face1.svg',
		F1R4: 'myPartJ_face1.svg',
		F1CS: 'myPartJ_face1.svg',
		F1R5: 'myPartJ_face1.svg',
		F2A: 'myPartJ_face2.svg',
		F2B: 'myPartJ_face2.svg',
		F2R: 'myPartJ_face2.svg',
		F2C: 'myPartJ_face2.svg',
		F2SF1: 'myPartJ_face2.svg',
		F2Z1: 'myPartJ_face2.svg',
		//F3A: 'myPartJ_face3.svg',
		F3B: 'myPartJ_face3.svg',
		F3R1: 'myPartJ_face3.svg'
	},
	sim: {
		tMax: 100,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

// step-3 : definition of the function that creates from the parameter-values the figures and construct the 3D
function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom(pDef.partName);
	const fig1 = figure();
	const fig2 = figure();
	const fig3 = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const F2_width = 4 * param.F2C + (1 + 2 * param.F2SF1) * param.F2A; // horizontal size
		const F2_height = 5 * Math.max(param.F2A, param.F2B);
		//const F3_width = 6 * param.F3A; // F2_height
		const F3_width = F2_height;
		const F3A = F3_width / 6;
		const F3_height = 4 * param.F3B;
		const face1_depth = F2_height;
		const face2_depth = F3_height;
		const face3_depth = F2_width;
		const face1_H1 = face2_depth;
		const face1_L1 = face3_depth;
		// step-5 : checks on the parameter values
		if (param.F1H2 > face1_H1) {
			throw `err076: F1H2 ${param.F1H2} too large compare to H1 ${face1_H1}`;
		}
		if (param.F1L2 + param.F1L3 > face1_L1) {
			throw `err069: L1 ${face1_L1} too small compare to F1L2 ${param.F1L2} and F1L3 ${param.F1L3}`;
		}

		// step-6 : any logs
		rGeome.logstr += `myPartJ size: ${ffix(face3_depth)} x ${ffix(face2_depth)} x ${ffix(face1_depth)} mm\n`;
		// step-7a : sub-design
		// myPartF
		const myPartFParam = designParam(myPartFDef.pDef);
		myPartFParam.setVal('L1', face3_depth);
		myPartFParam.setVal('H1', face2_depth);
		myPartFParam.setVal('H2', param.F1H2);
		myPartFParam.setVal('L2', param.F1L2);
		myPartFParam.setVal('L3', param.F1L3);
		myPartFParam.setVal('R1', param.F1R1);
		myPartFParam.setVal('R2', param.F1R2);
		myPartFParam.setVal('R3', param.F1R3);
		myPartFParam.setVal('R4', param.F1R4);
		myPartFParam.setVal('CS', param.F1CS);
		myPartFParam.setVal('R5', param.F1R5);
		const myPartFGeom = myPartFDef.pGeom(0, myPartFParam.getParamVal());
		checkGeom(myPartFGeom);
		rGeome.logstr += prefixLog(myPartFGeom.logstr, myPartFParam.partName);
		// myPartG
		const myPartGParam = designParam(myPartGDef.pDef);
		myPartGParam.setVal('A', param.F2A);
		myPartGParam.setVal('B', param.F2B);
		myPartGParam.setVal('R', param.F2R);
		myPartGParam.setVal('C', param.F2C);
		myPartGParam.setVal('SF1', param.F2SF1);
		myPartGParam.setVal('Z1', param.F2Z1);
		const myPartGGeom = myPartGDef.pGeom(0, myPartGParam.getParamVal());
		checkGeom(myPartGGeom);
		rGeome.logstr += prefixLog(myPartGGeom.logstr, myPartGParam.partName);
		// myPartI
		const myPartIParam = designParam(myPartIDef.pDef);
		myPartIParam.setVal('A', F3A);
		myPartIParam.setVal('B', param.F3B);
		myPartIParam.setVal('R1', param.F3R1);
		const myPartIGeom = myPartIDef.pGeom(t, myPartIParam.getParamVal());
		checkGeom(myPartIGeom);
		rGeome.logstr += prefixLog(myPartIGeom.logstr, myPartIParam.partName);
		// step-7b : drawing of the figures
		fig1.mergeFigure(myPartFGeom.fig.faceCorners);
		fig2.mergeFigure(myPartGGeom.fig.faceTransforms);
		fig3.mergeFigure(myPartIGeom.fig.face2);
		// final figure list
		rGeome.fig = {
			face1: fig1,
			face2: fig2,
			face3: fig3
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_1`,
					face: `${designName}_face1`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: face1_depth,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_2`,
					face: `${designName}_face2`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: face2_depth,
					rotate: [-Math.PI / 2, 0, 0],
					translate: [0, 0, F2_height]
				},
				{
					outName: `subpax_${designName}_3`,
					face: `${designName}_face3`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: face3_depth,
					rotate: [0, Math.PI / 2, 0],
					translate: [0, 0, F3_width]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIntersection,
					inList: [
						`subpax_${designName}_1`,
						`subpax_${designName}_2`,
						`subpax_${designName}_3`
					]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {
			myPartF_1: {
				partName: myPartFParam.getPartName(),
				dparam: myPartFParam.getDesignParamList(),
				orientation: [0, 0, 0],
				position: [0, 0, 0]
			},
			myPartG_1: {
				partName: myPartGParam.getPartName(),
				dparam: myPartGParam.getDesignParamList(),
				orientation: [0, 0, 0],
				position: [0, 0, 0]
			},
			myPartI_1: {
				partName: myPartIParam.getPartName(),
				dparam: myPartIParam.getDesignParamList(),
				orientation: [0, 0, 0],
				position: [0, 0, 0]
			}
		};
		// step-10 : final log message
		// finalize
		rGeome.logstr += 'myPartJ drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartJDef: tPageDef = {
	pTitle: 'My Part-J',
	pDescription: 're-using figues of other designs',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartJDef };
