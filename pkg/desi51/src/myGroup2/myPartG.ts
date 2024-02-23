// myPartG.ts
// tutorial-7 : illustrating the transformations of contours

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
	degToRad,
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
	partName: 'myPartG',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('A', 'mm', 100, 10, 400, 1),
		pNumber('B', 'mm', 200, 10, 400, 1),
		pNumber('R', 'mm', 10, 0, 50, 1),
		pNumber('C', 'mm', 100, 10, 400, 1),
		pNumber('SF1', '1.0', 2, 0.5, 3, 0.1),
		pNumber('Z1', 'degree', 45, -180, 180, 1)
	],
	paramSvg: {
		A: 'myPartG_transforms.svg',
		B: 'myPartG_transforms.svg',
		R: 'myPartG_transforms.svg',
		C: 'myPartG_transforms.svg',
		SF1: 'myPartG_transforms.svg',
		Z1: 'myPartG_transforms.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

// step-3 : definition of the function that creates from the parameter-values the figures and construct the 3D
function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	const figTransforms = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const sizeH = 4 * param.C + (1 + 2 * param.SF1) * param.A; // horizontal size
		const stepV = Math.max(param.A, param.B);
		const sizeV = 5 * stepV;
		// step-5 : checks on the parameter values
		// step-6 : any logs
		rGeome.logstr += `myPartG size horizontal: ${ffix(sizeH)} mm, vertical: ${ffix(sizeV)} mm\n`;
		// step-7 : drawing of the figures
		// figTransforms
		// contour of external outline
		const ctrExt = contour(0, 0)
			.addSegStrokeR(sizeH, 0)
			.addSegStrokeR(0, sizeV)
			.addSegStrokeR(-sizeH, 0)
			.closeSegStroke();
		figTransforms.addMain(ctrExt);
		// contour of first Hollow
		const ctrH1 = contour(param.C, stepV)
			.addSegStrokeR(param.A, 0)
			.addSegStrokeR(-param.A / 2, param.B)
			.addCornerRounded(param.R)
			.closeSegStroke();
		figTransforms.addMain(ctrH1);
		// scale and translate 1
		const ctrH2a = ctrH1.scale(param.C, stepV, param.SF1, false); // scale
		const ctrH2b = ctrH2a.translate(param.A + param.C, 0); // translate
		figTransforms.addMain(ctrH2b);
		// scale and translate 2
		const translateX = (1 + param.SF1) * param.A + 2 * param.C;
		figTransforms.addMain(
			ctrH1.scale(param.C, stepV, param.SF1, true).translate(translateX, 0)
		); // scale + translate in one line
		// rotate and translate 1
		const ctrH4 = ctrH1
			.rotate(param.C + param.A / 2, stepV + param.B / 2, degToRad(param.Z1))
			.translatePolar((2 * Math.PI) / 5, 2.5 * stepV);
		figTransforms.addMain(ctrH4);
		// rotate and translate 2
		const ctrH5 = ctrH1
			.rotate(param.C + param.A / 2, stepV + param.B / 2, degToRad(-param.Z1))
			.translatePolar((2 * Math.PI) / 5, 2.5 * stepV)
			.translate(2 * stepV, 0);
		figTransforms.addMain(ctrH5);
		// final figure list
		rGeome.fig = {
			faceTransforms: figTransforms
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_tf`,
					face: `${designName}_faceTransforms`,
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
					inList: [`subpax_${designName}_tf`]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
		// step-10 : final log message
		// finalize
		rGeome.logstr += 'myPartG drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartGDef: tPageDef = {
	pTitle: 'My Part-G',
	pDescription: 'illustrating the transformations of contours',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartGDef };
