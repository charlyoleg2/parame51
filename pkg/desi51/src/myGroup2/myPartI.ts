// myPartI.ts
// tutorial-9 : illustrating figure transforms

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
	//pDropdown,
	initGeom,
	EExtrude,
	EBVolume
} from 'geometrix';

// step-2 : definition of the parameters and more (part-name, svg associated to each parameter, simulation parameters)
const pDef: tParamDef = {
	partName: 'myPartI',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('A', 'mm', 30, 10, 200, 1),
		pNumber('B', 'mm', 20, 10, 200, 1),
		pNumber('R1', 'mm', 10, 0, 50, 1)
	],
	paramSvg: {
		A: 'myPartI_face.svg',
		B: 'myPartI_face.svg',
		R1: 'myPartI_face.svg'
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
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const rectangle_width = 6 * param.A;
		const rectangle_height = 4 * param.B;
		// step-5 : checks on the parameter values
		// step-6 : any logs
		rGeome.logstr += `myPartI size: ${ffix(rectangle_width)} x ${ffix(rectangle_height)} mm\n`;
		// step-7 : drawing of the figures
		//fig1
		const ctrOutline = contour(0, 0)
			.addSegStrokeR(rectangle_width, 0)
			.addSegStrokeR(0, rectangle_height)
			.addCornerRounded(param.R1)
			.addSegStrokeR(-rectangle_width, 0)
			.closeSegStroke();
		fig1.addMain(ctrOutline);
		// final figure list
		rGeome.fig = {
			face1: fig1
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_1`,
					face: `${designName}_face1`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: 1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIdentity,
					inList: [`subpax_${designName}_1`]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
		// step-10 : final log message
		// finalize
		rGeome.logstr += 'myPartI drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartIDef: tPageDef = {
	pTitle: 'My Part-I',
	pDescription: 'illustrating figure transforms',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartIDef };
