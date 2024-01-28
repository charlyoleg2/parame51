// myPartE.ts
// tutorial-5 : illustrating contours made with Cartesian (absolute and relative) and polar (absolute and relative) coordinates

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
	partName: 'myPartE',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('N1', '', 8, 0, 20, 1),
		pNumber('H1', 'mm', 40, 10, 100, 1),
		pNumber('H2', 'mm', 20, 10, 100, 1),
		pNumber('A', 'mm', 10, 5, 50, 1),
		pNumber('B', 'mm', 20, 5, 50, 1),
		pNumber('N2', '', 8, 3, 24, 1),
		pNumber('D1', 'mm', 40, 10, 200, 1),
		pNumber('D2', 'mm', 80, 10, 200, 1),
		pNumber('S', 'mm', 20, 10, 50, 1)
	],
	paramSvg: {
		N1: 'myPartE_cartesian.svg',
		H1: 'myPartE_cartesian.svg',
		H2: 'myPartE_cartesian.svg',
		A: 'myPartE_cartesian.svg',
		B: 'myPartE_cartesian.svg',
		N2: 'myPartE_polarAbsolute.svg',
		D1: 'myPartE_polarAbsolute.svg',
		D2: 'myPartE_polarAbsolute.svg',
		S: 'myPartE_polarRelative.svg'
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
	const figCartesian = figure();
	const figPolarAbs = figure();
	const figPolarRel = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const R1 = param.D1 / 2;
		const R2 = param.D2 / 2;
		const angularStep = (2 * Math.PI) / param.N2;
		// step-5 : checks on the parameter values
		if (param.H2 > param.H1) {
			throw `err076: H2 ${param.H2} too large compare to H1 ${param.H1}`;
		}
		if (param.D1 > param.D2) {
			throw `err069: D1 ${param.D1} too large compare to D2 ${param.D2}`;
		}
		// step-6 : any logs
		const s1 = param.A + (param.B + param.A) * param.N1;
		const s3 =
			param.S *
			(2 * Math.cos(Math.PI / 3) +
				2 * Math.cos((2 * Math.PI) / 9) +
				2 * Math.cos(Math.PI / 9) +
				1);
		rGeome.logstr += `myPartE-size1: ${ffix(s1)} mm\n`;
		rGeome.logstr += `myPartE-size2: ${ffix(param.D2)} mm\n`;
		rGeome.logstr += `myPartE-size3: ${ffix(s3)} mm\n`;
		// step-7 : drawing of the figures
		// figCartesian
		const ctrCartesian = contour(0, 0)
			.addSegStrokeA(0, param.H1)
			.addSegStrokeA(param.A, param.H1);
		for (let i = 0; i < param.N1; i++) {
			ctrCartesian
				.addSegStrokeR(param.B / 2, -param.H2)
				.addSegStrokeR(param.B / 2, param.H2)
				.addSegStrokeR(param.A, 0);
		}
		ctrCartesian.addSegStrokeR(0, -param.H1).closeSegStroke();
		figCartesian.addMain(ctrCartesian);
		// figPolarAbs
		const ctrPolarAbs = contour(R1, 0);
		for (let i = 1; i < param.N2; i++) {
			ctrPolarAbs.addSegStrokeAP(i * angularStep, R2).addSegStrokeAP(i * angularStep, R1);
		}
		ctrPolarAbs.addSegStrokeAP(0, R2).closeSegStroke();
		figPolarAbs.addMain(ctrPolarAbs);
		// figPolarRel
		const ctrPolarRel = contour(0, 0)
			.addSegStrokeRP(Math.PI / 3, param.S)
			.addSegStrokeRP((2 * Math.PI) / 9, param.S)
			.addSegStrokeRP(Math.PI / 9, param.S)
			.addSegStrokeRP(0, param.S)
			.addSegStrokeRP(-Math.PI / 9, param.S)
			.addSegStrokeRP((-2 * Math.PI) / 9, param.S)
			.addSegStrokeRP(-Math.PI / 3, param.S)
			.closeSegStroke();
		figPolarRel.addMain(ctrPolarRel);
		// final figure list
		rGeome.fig = {
			faceCartesian: figCartesian,
			facePolarAbs: figPolarAbs,
			facePolarRel: figPolarRel
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_cartesian`,
					face: `${designName}_faceCartesian`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: 1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_polarAbs`,
					face: `${designName}_facePolarAbs`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: 1,
					rotate: [0, 0, 0],
					translate: [0, 0, 100]
				},
				{
					outName: `subpax_${designName}_polarRel`,
					face: `${designName}_facePolarRel`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: 1,
					rotate: [0, 0, 0],
					translate: [0, 0, 200]
				}
			],
			volumes: [
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eUnion,
					inList: [
						`subpax_${designName}_cartesian`,
						`subpax_${designName}_polarAbs`,
						`subpax_${designName}_polarRel`
					]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
		// step-10 : final log message
		// finalize
		rGeome.logstr += 'myPartE drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartEDef: tPageDef = {
	pTitle: 'My Part-E',
	pDescription:
		'illustrating Cartesian (absolute and relative) and polar (absolute and relative) coordinates',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartEDef };
