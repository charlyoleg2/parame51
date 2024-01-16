// myPartD.ts
// tutorial-4 : a design that shows the power of 2D technical drawings

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
	partName: 'myPartD',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 60, 10, 200, 1),
		pNumber('D2', 'mm', 40, 10, 200, 1),
		pNumber('D3', 'mm', 100, 10, 200, 1),
		pNumber('D4', 'mm', 80, 10, 200, 1),
		pNumber('H1', 'mm', 30, -200, 200, 1)
	],
	paramSvg: {
		D1: 'myPartD_face.svg',
		D2: 'myPartD_face.svg',
		D3: 'myPartD_top.svg',
		D4: 'myPartD_top.svg',
		H1: 'myPartD_face.svg'
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
	const figTube1 = figure();
	const figTube1Hollow = figure();
	const figTube2 = figure();
	const figTube2Hollow = figure();
	const figTop = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// step-4 : some preparation calculation
		const R1 = param.D1 / 2;
		const R2 = param.D2 / 2;
		const R3 = param.D3 / 2;
		const R4 = param.D4 / 2;
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
		const s1 = param.D1 + param.D3;
		const s2 = s1;
		const s3 = param.H1 + s1 / 2;
		rGeome.logstr += `myPartD-size: ${ffix(s1)} x ${ffix(s2)} x ${ffix(s3)} mm\n`;
		// step-7 : drawing of the figures
		// figTube1
		figTube1.addMain(contourCircle(0, param.H1, R1));
		figTube1.addMain(contourCircle(0, param.H1, R2));
		const ctrTube2 = contour(-s1 / 2, -R3)
			.addSegStrokeR(s2, 0)
			.addSegStrokeR(0, param.D3)
			.addSegStrokeR(-s2, 0)
			.closeSegStroke();
		const ctrTube2H = contour(-s1 / 2, -R4)
			.addSegStrokeR(s2, 0)
			.addSegStrokeR(0, param.D4)
			.addSegStrokeR(-s2, 0)
			.closeSegStroke();
		figTube1.addSecond(ctrTube2);
		figTube1.addSecond(ctrTube2H);
		// figTube1Hollow
		figTube1Hollow.addSecond(contourCircle(0, param.H1, R1));
		figTube1Hollow.addMain(contourCircle(0, param.H1, R2));
		figTube1Hollow.addSecond(ctrTube2);
		figTube1Hollow.addSecond(ctrTube2H);
		// figTube2
		figTube2.addMain(contourCircle(0, 0, R3));
		figTube2.addMain(contourCircle(0, 0, R4));
		const ctrTube1 = contour(-s1 / 2, param.H1 - R1)
			.addSegStrokeR(s1, 0)
			.addSegStrokeR(0, param.D1)
			.addSegStrokeR(-s1, 0)
			.closeSegStroke();
		const ctrTube1H = contour(-s1 / 2, param.H1 - R2)
			.addSegStrokeR(s1, 0)
			.addSegStrokeR(0, param.D2)
			.addSegStrokeR(-s1, 0)
			.closeSegStroke();
		figTube2.addSecond(ctrTube1);
		figTube2.addSecond(ctrTube1H);
		// figTube2Hollow
		figTube2Hollow.addSecond(contourCircle(0, 0, R3));
		figTube2Hollow.addMain(contourCircle(0, 0, R4));
		figTube2Hollow.addSecond(ctrTube1);
		figTube2Hollow.addSecond(ctrTube1H);
		// figTop
		figTop.addSecond(ctrTube2);
		figTop.addSecond(ctrTube2H);
		const ctrTube1b = contour(-R1, -s1 / 2)
			.addSegStrokeR(param.D1, 0)
			.addSegStrokeR(0, s1)
			.addSegStrokeR(-param.D1, 0)
			.closeSegStroke();
		const ctrTube1bH = contour(-R2, -s1 / 2)
			.addSegStrokeR(param.D2, 0)
			.addSegStrokeR(0, s1)
			.addSegStrokeR(-param.D2, 0)
			.closeSegStroke();
		figTop.addSecond(ctrTube1b);
		figTop.addSecond(ctrTube1bH);
		// final figure list
		rGeome.fig = {
			faceTube1: figTube1,
			faceTube2: figTube2,
			faceTube1H: figTube1Hollow,
			faceTube2H: figTube2Hollow,
			faceTop: figTop
		};
		// step-8 : recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_tube1`,
					face: `${designName}_faceTube1`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: s1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_tube1H`,
					face: `${designName}_faceTube1H`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: s1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_tube2`,
					face: `${designName}_faceTube2`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: s2,
					rotate: [0, Math.PI / 2, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_tube2H`,
					face: `${designName}_faceTube2H`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: s2,
					rotate: [0, Math.PI / 2, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `ipax_${designName}_addi`,
					boolMethod: EBVolume.eUnion,
					inList: [`subpax_${designName}_tube1`, `subpax_${designName}_tube2`]
				},
				{
					outName: `ipax_${designName}_subs`,
					boolMethod: EBVolume.eUnion,
					inList: [`subpax_${designName}_tube1H`, `subpax_${designName}_tube2H`]
				},
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eSubstraction,
					inList: [`ipax_${designName}_addi`, `ipax_${designName}_subs`]
				}
			]
		};
		// step-9 : optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
		// step-10 : final log message
		// finalize
		rGeome.logstr += 'myPartD drawn successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

// step-11 : definiton of the final object that gathers the precedent object and function
const myPartDDef: tPageDef = {
	pTitle: 'My Part-D',
	pDescription: 'Illustrating the power of 2D technical drawing',
	pDef: pDef,
	pGeom: pGeom
};

// step-12 : export the final object
export { myPartDDef };