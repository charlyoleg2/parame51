// myPartA.ts
// tutorial-1 : a simple design (a cylindrical tube) for showcasing the usage of geometrix

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

const pDef: tParamDef = {
	partName: 'myPartA',
	params: [
		//pNumber(name, unit, init, min, max, step)
		pNumber('D1', 'mm', 40, 10, 100, 2),
		pNumber('E1', 'mm', 3, 1, 50, 1),
		pNumber('L1', 'mm', 50, 10, 200, 10)
	],
	paramSvg: {
		D1: 'myPartA_section.svg',
		E1: 'myPartA_section.svg',
		L1: 'myPartA_side.svg'
	},
	sim: {
		tMax: 180,
		tStep: 0.5,
		tUpdate: 500 // every 0.5 second
	}
};

function pGeom(t: number, param: tParamVal): tGeom {
	const rGeome = initGeom(pDef.partName);
	const figSection = figure();
	const figSide = figure();
	rGeome.logstr += `${rGeome.partName} simTime: ${t}\n`;
	try {
		// 1: some preparation calculation
		const R1 = param.D1 / 2;
		// 2: checks on the parameter values
		if (R1 < param.E1) {
			throw `err089: D1 ${param.D1} too small compare to E1 ${param.E1}`;
		}
		// 3: any logs
		rGeome.logstr += `myPartA-length: ${ffix(param.L1)} mm\n`;
		rGeome.logstr += `myPartA-external-diameter: ${ffix(param.D1)} mm\n`;
		rGeome.logstr += `myPartA-internal-diameter: ${ffix(param.D1 - 2 * param.E1)} mm\n`;
		// 4: drawing of the figures
		// figSection
		figSection.addMain(contourCircle(0, 0, R1));
		figSection.addMain(contourCircle(0, 0, R1 - param.E1));
		// figSide
		const ctrCylinderSideRight = contour(R1, 0)
			.addSegStrokeA(R1, param.L1)
			.addSegStrokeA(R1 - param.E1, param.L1)
			.addSegStrokeA(R1 - param.E1, 0)
			.closeSegStroke();
		const ctrCylinderSideLeft = contour(-R1, 0)
			.addSegStrokeR(param.E1, 0)
			.addSegStrokeR(0, param.L1)
			.addSegStrokeR(-param.E1, 0)
			.closeSegStroke();
		figSide.addMain(ctrCylinderSideRight);
		figSide.addSecond(ctrCylinderSideLeft);
		// final figure list
		rGeome.fig = {
			faceSection: figSection,
			faceSide: figSide
		};
		// 5: recipes of the 3D construction
		const designName = rGeome.partName;
		rGeome.vol = {
			extrudes: [
				{
					outName: `subpax_${designName}_using_section`,
					face: `${designName}_faceSection`,
					extrudeMethod: EExtrude.eLinearOrtho,
					length: param.L1,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				},
				{
					outName: `subpax_${designName}_using_side`,
					face: `${designName}_faceSide`,
					extrudeMethod: EExtrude.eRotate,
					rotate: [0, 0, 0],
					translate: [0, 0, 0]
				}
			],
			volumes: [
				{
					outName: `ipax_${designName}_intermediate_1`,
					boolMethod: EBVolume.eUnion, // eIdentity, eIntersection, eUnion, eSubstraction
					inList: [`subpax_${designName}_using_section`, `ipax_${designName}_using_side`]
				},
				{
					outName: `ipax_${designName}_intermediate_2`,
					boolMethod: EBVolume.eIntersection,
					inList: [`subpax_${designName}_using_section`, `ipax_${designName}_using_side`]
				},
				{
					outName: `pax_${designName}`,
					boolMethod: EBVolume.eIdentity,
					inList: [`subpax_${designName}_using_section`]
				}
			]
		};
		// 6: optional sub-design parameter export
		// sub-design
		rGeome.sub = {};
		// 7: final log message
		// finalize
		rGeome.logstr += 'myPartA draw successfully!\n';
		rGeome.calcErr = false;
	} catch (emsg) {
		rGeome.logstr += emsg as string;
		console.log(emsg as string);
	}
	return rGeome;
}

const myPartADef: tPageDef = {
	pTitle: 'My Part-A',
	pDescription: 'A simple cylinder for showcasing the usage of geometrix',
	pDef: pDef,
	pGeom: pGeom
};

export { myPartADef };
