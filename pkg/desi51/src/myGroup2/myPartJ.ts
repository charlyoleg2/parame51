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

// step-2 : definition of the parameters and more (part-name, svg associated to each parameter, simulation parameters)
const pDef: tParamDef = {
	partName: 'myPartJ',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('F1H2', 'mm', 60, 10, 400, 1),
		pNumber('F1L2', 'mm', 60, 10, 400, 1),
		pNumber('F1L3', 'mm', 40, 10, 400, 1),
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
		pNumber('F3A', 'mm', 30, 10, 200, 1),
		pNumber('F3B', 'mm', 20, 10, 200, 1),
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
		F3A: 'myPartJ_face3.svg',
		F3B: 'myPartJ_face3.svg',
		F3R1: 'myPartJ_face3.svg'
	},
	sim: {
		tMax: 180,
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
		const face1_depth = param.F3A;
		const face2_depth = 1;
		const face3_depth = 1;
		// step-5 : checks on the parameter values
		// step-6 : any logs
		rGeome.logstr += `myPartJ size: ${ffix(face3_depth)} x ${ffix(face2_depth)} x ${ffix(face1_depth)} mm\n`;
		// step-7 : drawing of the figures
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
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_3`,
					face: `${designName}_face3`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: face3_depth,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIntersection,
					inList: [
						`subpax_${designName}_face1`,
						`subpax_${designName}_face2`,
						`subpax_${designName}_face3`
					]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
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
