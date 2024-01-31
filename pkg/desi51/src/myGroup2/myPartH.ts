// myPartH.ts
// tutorial-6 : illustrating contours made out of partial contours

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
	partName: 'myPartF',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('A1', 'mm', 60, 10, 200, 1),
		pNumber('A2', 'mm', 100, 10, 200, 1),
		pNumber('A3', 'mm', 60, 10, 200, 1),
		pNumber('N1', 'N', 3, 2, 12, 1),
		pNumber('N2', 'N', 3, 1, 12, 1),
		pNumber('B', 'mm', 40, 10, 200, 1),
		pNumber('SF1', '1.0', 1.2, 0.5, 2, 0.1),
		pNumber('E', 'mm', 10, 0, 50, 1)
	],
	paramSvg: {
		A1: 'myPartH_circle.svg',
		A2: 'myPartH_circle.svg',
		A3: 'myPartH_circle.svg',
		N1: 'myPartH_circle.svg',
		N2: 'myPartH_line.svg',
		B: 'myPartH_line.svg',
		SF1: 'myPartH_line.svg',
		E: 'myPartH_line.svg'
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
	const figCircle = figure();
	const figLine = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const rotAngle = Math.PI / param.N1;
		const sarr = [...Array(param.N2).keys()].map((n) => param.SF1 ** n);
		const rsarr = sarr.reduce((total, nouv) => {
			return total + nouv;
		}, 0);
		const line_size_h = param.B * (param.N2 - 1) + param.A1 * rsarr;
		// step-5 : checks on the parameter values
		if (param.A3 > param.A2 + param.E) {
			throw `err076: A3 ${param.A3} too large compare to A2 ${param.A2} and E ${param.E}`;
		}
		// step-6 : any logs
		rGeome.logstr += `myPartH line size: ${ffix(line_size_h)} mm\n`;
		// step-7 : drawing of the figures
		// partial contour
		const partialCtr = contour(0, 0)
			.addSegStrokeR(0, -param.A2)
			.addSegStrokeR(param.A1 / 2, param.A3)
			.addSegStrokeR(param.A1 / 2, -param.A3)
			.addSegStrokeR(0, param.A2);
		// figCircle
		const ctrCircle = contour(line_size_h, 0).addPartial(partialCtr);
		for (let i = 0; i < param.N1 - 1; i++) {
			ctrCircle.addPartial(partialCtr.rotate(0, 0, rotAngle));
		}
		figCircle.addMain(ctrCircle);
		// figLine
		const ctrLine = contour(0, 0).addSegStrokeR(0, -param.E).addPartial(partialCtr);
		for (let i = 0; i < param.N2 - 1; i++) {
			ctrLine.addSegStrokeR(param.B, 0).addPartial(partialCtr.scale(0, 0, param.SF1));
		}
		ctrLine.addSegStrokeR(0, param.E).closeSegStroke();
		figLine.addMain(ctrLine);
		// final figure list
		rGeome.fig = {
			faceCircle: figCircle,
			faceLine: figLine
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_circle`,
					face: `${designName}_faceCircle`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: 1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_line`,
					face: `${designName}_faceLine`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: 1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [`subpax_${designName}_circle`, `subpax_${designName}_line`]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
		// step-10 : final log message
		// finalize
		rGeome.logstr += 'myPartH drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartHDef: tPageDef = {
	pTitle: 'My Part-H',
	pDescription: 'illustrating contours made out of partial contours',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartHDef };
