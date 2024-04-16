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
	// partName is used in URL. Choose a name without slash, backslash and space.
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
		tMax: 100,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

// step-3 : definition of the function that creates from the parameter-values the figures and construct the 3D
function pGeom(t: number, param: tParamVal, suffix = ''): tGeom {
	const rGeome = initGeom(pDef.partName + suffix);
	const fig1 = figure();
	const fig2 = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const rectW = 6 * param.A;
		const rectH = 4 * param.B;
		const rAngle1 = ((Math.PI / 2) * t) / pDef.sim.tMax;
		const rAngle2 = ((Math.PI / 2) * t) / pDef.sim.tMax + Math.PI / 4;
		const rAngle3 = ((Math.PI / 2) * t) / pDef.sim.tMax - Math.PI / 4;
		// step-5 : checks on the parameter values
		// step-6 : any logs
		rGeome.logstr += `myPartI size: ${ffix(rectW)} x ${ffix(rectH)} mm\n`;
		// step-7 : drawing of the figures
		//fig1
		const ctrOutline = contour(0, 0)
			.addSegStrokeR(rectW, 0)
			.addSegStrokeR(0, rectH)
			.addCornerRounded(param.R1)
			.addSegStrokeR(-rectW, 0)
			.closeSegStroke();
		fig1.addMain(ctrOutline);
		const ctrTriangle = contour(0, 0)
			.addSegStrokeR(param.A, 0)
			.addSegStrokeR(-param.A / 2, 2 * param.B)
			.closeSegStroke();
		fig1.addMain(ctrTriangle.translate(param.A, param.B));
		fig1.addMain(ctrTriangle.rotate(0, 0, Math.PI).translate(3.5 * param.A, 3 * param.B));
		fig1.addMain(ctrTriangle.translate(4 * param.A, param.B));
		//fig2
		fig2.mergeFigure(fig1.rotate(rectW / 2, rectH / 2, rAngle1));
		fig2.mergeFigure(
			fig1.rotate(rectW / 2, rectH / 2, rAngle2).translate(-1.5 * rectW, 0),
			true
		);
		fig2.mergeFigure(
			fig1.rotate(rectW / 2, rectH / 2, rAngle3).translatePolar(0, 1.5 * rectW),
			true
		);
		// final figure list
		rGeome.fig = {
			face2: fig2
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_2`,
					face: `${designName}_face2`,
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
					inList: [`subpax_${designName}_2`]
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
