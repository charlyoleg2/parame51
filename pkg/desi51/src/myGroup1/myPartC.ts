// myPartC.ts
// tutorial-3 : demonstrate the extrusions and 3D construction

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
	contour,
	contourCircle,
	figure,
	//degToRad,
	//radToDeg,
	ffix,
	pNumber,
	//pCheckbox,
	//pDropdown,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

// step-2 : definition of the parameters and more (part-name, svg associated to each parameter, simulation parameters)
const pDef: tParamDef = {
	partName: 'myPartC',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 40, 10, 200, 1),
		pNumber('D2', 'mm', 100, 20, 200, 1),
		pNumber('D3', 'mm', 30, 10, 100, 1),
		pNumber('D4', 'mm', 50, 20, 100, 1),
		pNumber('L1', 'mm', 100, 10, 300, 1),
		pNumber('L2', 'mm', 100, 10, 300, 1),
		pNumber('L3', 'mm', 20, 10, 300, 1),
		pNumber('L4', 'mm', 40, 1, 300, 1),
		pNumber('H1', 'mm', 50, 10, 100, 1)
	],
	paramSvg: {
		D1: 'myPartC_side.svg',
		D2: 'myPartC_side.svg',
		D3: 'myPartC_top.svg',
		D4: 'myPartC_top.svg',
		L1: 'myPartC_cut.svg',
		L2: 'myPartC_cut.svg',
		L3: 'myPartC_cut.svg',
		L4: 'myPartC_cut.svg',
		H1: 'myPartC_cut.svg'
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
	const figBodyCut = figure();
	const figBodySlant = figure();
	const figChimney = figure();
	const figChimneyHollow = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const R1 = param.D1 / 2;
		const R2 = param.D2 / 2;
		const R3 = param.D3 / 2;
		const R4 = param.D4 / 2;
		// step-5 : checks on the parameter values
		if (param.D1 > param.D2) {
			throw `err077: D1 ${param.D1} too large compare to D2 ${param.D2}`;
		}
		if (param.D4 > param.D2) {
			throw `err080: D4 ${param.D4} too large compare to D2 ${param.D2}`;
		}
		if (param.D3 > param.D4) {
			throw `err083: D3 ${param.D3} too large compare to D4 ${param.D4}`;
		}
		if (param.L1 < param.D4 + param.L4) {
			throw `err086: L1 ${param.L1} too small compare to D4 ${param.D4} and L4 ${param.L4}`;
		}
		if (param.L3 > param.L1 + param.L2) {
			throw `err089: L3 ${param.L3} too large compare to L1 ${param.L1} and L2 ${param.L2}`;
		}
		// step-6 : any logs
		rGeome.logstr += `myPartC-length: ${ffix(param.L1 + param.L2)} mm\n`;
		rGeome.logstr += `myPartC-height: ${ffix(param.D2 + param.H1)} mm\n`;
		// step-7 : drawing of the figures
		// figBodyCut
		const ctrBodyCut1 = contour(-R2, 0)
			.addSegStrokeA(-R2, param.L1)
			.addSegStrokeA(-R1, param.L1 + param.L2)
			.addSegStrokeR(0, -param.L3)
			.closeSegStroke();
		const ctrBodyCut2 = contour(R2, 0)
			.addSegStrokeA(R2, param.L1)
			.addSegStrokeA(R1, param.L1 + param.L2)
			.addSegStrokeR(0, -param.L3)
			.closeSegStroke();
		figBodyCut.addMain(ctrBodyCut1);
		figBodyCut.addSecond(ctrBodyCut2);
		// figBodySlant
		const ctrBodySlant = contour(-R2, 0)
			.addSegStrokeA(-R2, param.L1 + param.L2)
			.addSegStrokeA(R2, param.L1 + param.L2)
			.addSegStrokeA(R2, param.L4)
			.closeSegStroke();
		figBodySlant.addMain(ctrBodySlant);
		// figChimney
		figChimney.addMain(contourCircle(0, param.L1 - R4, R4));
		figChimney.addSecond(contourCircle(0, param.L1 - R4, R3));
		figChimney.addSecond(ctrBodyCut1);
		figChimney.addSecond(ctrBodyCut2);
		// figChimneyHollow
		figChimneyHollow.addMain(contourCircle(0, param.L1 - R4, R3));
		figChimneyHollow.addSecond(contourCircle(0, param.L1 - R4, R4));
		figChimneyHollow.addSecond(ctrBodyCut1);
		figChimneyHollow.addSecond(ctrBodyCut2);
		// final figure list
		rGeome.fig = {
			faceBodyCut: figBodyCut,
			faceBodySlant: figBodySlant,
			faceChimney: figChimney,
			faceChimneyHollow: figChimneyHollow
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_bodyRaw`,
					face: `${designName}_faceBodyCut`,
					extrudeMethod: EExtrude.eRotate, // always along the axis 0y
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_bodySlant`,
					face: `${designName}_faceBodySlant`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: 2 * R2,
					rotate: [0, 0, 0],
					translate: [0, 0, -R2]
				},
				{
					outName: `subpax_${designName}_chimney`,
					face: `${designName}_faceChimney`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.H1 + R2,
					rotate: [0, 0, 0],
					translate: [0, 0, -param.H1 - R2]
				},
				{
					outName: `subpax_${designName}_chimneyH`,
					face: `${designName}_faceChimneyHollow`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.H1 + R2,
					rotate: [0, 0, 0],
					translate: [0, 0, -param.H1 - R2]
				}
			],
			volumes: [
				{
					outName: `ipax_${designName}_body1`,
					boolMethod: EBVolume.eIntersection, // eIdentity, eIntersection, eUnion, eSubstraction
					inList: [`subpax_${designName}_bodyRaw`, `subpax_${designName}_bodySlant`]
				},
				{
					outName: `ipax_${designName}_body2`,
					boolMethod: EBVolume.eUnion,
					inList: [`ipax_${designName}_body1`, `subpax_${designName}_chimney`]
				},
				{
					outName: `ipax_${designName}_body3`,
					boolMethod: EBVolume.eSubstraction,
					inList: [`ipax_${designName}_body2`, `subpax_${designName}_chimneyH`]
				},
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIdentity, // useless identity but just for showcasing
					inList: [`ipax_${designName}_body3`]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
		// step-10 : final log message
		// finalize
		rGeome.logstr += 'myPartC drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartCDef: tPageDef = {
	pTitle: 'My Part-C',
	pDescription: 'Showcasing extrusions and 3D construction',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartCDef };
