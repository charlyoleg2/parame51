// myPartF.ts
// tutorial-6 : illustrating contours with different corner types

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
	partName: 'myPartF',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('L1', 'mm', 200, 10, 400, 1),
		pNumber('H1', 'mm', 100, 10, 400, 1),
		pNumber('H2', 'mm', 60, 10, 400, 1),
		pNumber('L2', 'mm', 60, 10, 400, 1),
		pNumber('L3', 'mm', 40, 10, 400, 1),
		pNumber('R1', 'mm', 10, 0, 50, 1),
		pNumber('R2', 'mm', 10, 0, 50, 1),
		pNumber('R3', 'mm', 10, 0, 50, 1),
		pNumber('R4', 'mm', 10, 0, 50, 1),
		pDropdown('CS', ['pointed', 'rounded', 'widened', 'wideAcc']), // the first ('pointed') is default
		pNumber('R5', 'mm', 10, 0, 50, 1),
		pNumber('extrudLength', 'mm', 50, 1, 400, 1)
	],
	paramSvg: {
		L1: 'myPartF_corners.svg',
		H1: 'myPartF_corners.svg',
		H2: 'myPartF_corners.svg',
		L2: 'myPartF_corners.svg',
		L3: 'myPartF_corners.svg',
		R1: 'myPartF_corners.svg',
		R2: 'myPartF_corners.svg',
		R3: 'myPartF_corners.svg',
		R4: 'myPartF_corners.svg',
		CS: 'myPartF_corners.svg',
		R5: 'myPartF_corners.svg'
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
	const figCorners = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const EH = (param.L1 - param.L2 - param.L3) / 3; // intermediate horizontal distance
		const EV = (param.H1 - param.H2) / 2;
		// step-5 : checks on the parameter values
		if (param.H2 > param.H1) {
			throw `err076: H2 ${param.H2} too large compare to H1 ${param.H1}`;
		}
		if (param.L2 + param.L3 > param.L1) {
			throw `err069: L1 ${param.L1} too small compare to L2 ${param.L2} and L3 ${param.L3}`;
		}
		// step-6 : any logs
		rGeome.logstr += `myPartF intermediate distance horizontal: ${ffix(EH)} mm, vertical: ${ffix(EV)} mm\n`;
		// step-7 : drawing of the figures
		// figCartesian
		const ctrExt = contour(0, 0)
			.addCornerPointed() // no effect, same as nothing
			.addSegStrokeA(param.L1, 0)
			.addCornerRounded(param.R2)
			.addSegStrokeA(param.L1, param.H1)
			.addCornerPointed() // no effect, same as nothing
			.addSegStrokeA(0, param.H1)
			.addCornerRounded(param.R1)
			.closeSegStroke();
		figCorners.addMain(ctrExt);
		// final figure list
		rGeome.fig = {
			faceCorners: figCorners
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_corners`,
					face: `${designName}_faceCorners`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.extrudLength,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIdentity,
					inList: [`subpax_${designName}_corners`]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
		// step-10 : final log message
		// finalize
		rGeome.logstr += 'myPartF drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartFDef: tPageDef = {
	pTitle: 'My Part-F',
	pDescription: 'illustrating of contours with different types of corners',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartFDef };
