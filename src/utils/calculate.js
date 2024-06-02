// calculations.js

// Define the cotangent function
Math.cot = function (x) {
  return 1 / Math.tan(x);
};

const c_k = (soilNaturalMoisture) => 0.09 * (1.2 * soilNaturalMoisture - 4.8);

const E_grunry_func = (
  soilNaturalMoisture,
  densitySolidPhase,
  densityNaturalState
) => {
  console.log("soilNaturalMoisture", soilNaturalMoisture);
  console.log("c_k(soilNaturalMoisture)", c_k(soilNaturalMoisture));
  return (
    ((1 + 0.01 * soilNaturalMoisture) * densitySolidPhase) /
    (c_k(soilNaturalMoisture) * densityNaturalState)
  );
};

const a_q_func = (soilUnitWeight, internalFrictionAngle) => {
  return (
    soilUnitWeight *
    Math.pow(Math.tan(Math.PI / 4 + internalFrictionAngle / 2), 2)
  );
};

export function calculateWedgePrismatic(
  casingDiameter,
  casingType,
  soilCohesionCoefficient,
  apexAngle,
  internalFrictionAngle,
  soilUnitWeight,
  layingDepth,
  numberOfCasings,
  calibrationLength,
  soilNaturalMoisture,
  densitySolidPhase,
  densityNaturalState
) {
  const correctedCasingType = calibrationLength < 150 ? 0 : casingType;
  const correctedCalibrationLength =
    calibrationLength < 150 ? calibrationLength : calibrationLength / 1000;
  const correctedInternalFrictionAngle = degreesToRadians(
    internalFrictionAngle
  );

  const E_grunry = E_grunry_func(
    soilNaturalMoisture,
    densitySolidPhase,
    densityNaturalState
  );

  const a_q = a_q_func(soilUnitWeight, correctedInternalFrictionAngle);

  const correctApexAngle = degreesToRadians(apexAngle);

  const term1 =
    ((Math.PI + 4 * (numberOfCasings - 1)) / 8) *
    Math.pow(casingDiameter, 2) *
    E_grunry *
    (1 + casingType * soilCohesionCoefficient * Math.tan(apexAngle));

  const q_mid =
    2 *
      soilCohesionCoefficient *
      Math.tan(Math.PI / 4 + correctedInternalFrictionAngle) +
    (a_q * layingDepth) / 2;

  console.log("q_mid", q_mid);

  const term2 =
    1000 *
    (Math.PI * casingDiameter + 2 * (numberOfCasings - 1) * casingDiameter) *
    correctedCalibrationLength *
    correctedCasingType *
    q_mid;
  console.log("d, діаметр футлярів", casingDiameter);
  console.log("n, кількість футлярів", numberOfCasings);
  console.log("beta, кут вершини футляра", correctApexAngle);
  console.log("b_n, довжина калібруючої частини", correctedCalibrationLength);
  console.log("f, коефіцієнт футляра", correctedCasingType);
  console.log("c, коефіцієнт зчеплення грунту", soilCohesionCoefficient);
  console.log(
    "phi, кут внутрішнього тертя грунту",
    correctedInternalFrictionAngle
  );
  console.log("gamma,  Питома вага у природньому стані ґрунту", soilUnitWeight);
  console.log("h, глибина прокладання", layingDepth);
  console.log("w, Природна вологість грунту", soilNaturalMoisture);
  console.log("ro_s, Щільність твердої фази ґрунту", densitySolidPhase);
  console.log("ro_n, Щільність ґрунту в природному стані", densityNaturalState);

  console.log("E_grunry, компресійний модуль деформації, МПа", E_grunry);
  console.log("a_q, коефіцієнт пропорційності грунту МПа/м", a_q);

  console.log("Перший доданок", term1);
  console.log("Другий доданок", term2);

  const P_cl =
    1000 *
    (((numberOfCasings - 1) * Math.pow(casingDiameter, 2)) / 2) *
    E_grunry *
    (1 +
      correctedCasingType *
        soilCohesionCoefficient *
        Math.tan(correctApexAngle));

  const P_pr_kon =
    1000 *
    ((Math.PI * Math.pow(casingDiameter, 2)) / 8) *
    E_grunry *
    (1 +
      correctedCasingType *
        soilCohesionCoefficient *
        Math.tan(correctApexAngle));
  const bigP = P_cl + P_pr_kon;

  console.log("P_cl", P_cl);
  console.log("P_pr_kon", P_pr_kon);
  console.log(
    "E_grunry * (1 + correctedCasingType * soilCohesionCoefficient *  Math.tan(correctApexAngle))",
    E_grunry *
      (1 +
        correctedCasingType *
          soilCohesionCoefficient *
          Math.tan(correctApexAngle))
  );

  console.log("bigP", bigP);

  console.log("term2", term2);

  return bigP + term2;
}

const degreesToRadians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

//конус
export function calculateConicalCylindrical(
  layingDepth,
  soilUnitWeight,
  soilCohesionCoefficient,
  casingDiameter,
  casingType,
  apexAngle,
  numberOfCasings,
  soilNaturalMoisture,
  densitySolidPhase,
  densityNaturalState,
  internalFrictionAngle
) {
  const E_grunry = E_grunry_func(
    soilNaturalMoisture,
    densitySolidPhase,
    densityNaturalState
  );
  const correctApexAngle = degreesToRadians(apexAngle);
  const correctInternalFrictionAngle = degreesToRadians(internalFrictionAngle);

  console.log("d, діаметр футлярів", casingDiameter);
  console.log("f, коефіцієнт футляра", casingType);
  console.log("beta, кут загострення при вершині", correctApexAngle);
  console.log("n, кількість футлярів", numberOfCasings);
  console.log("w, Природна вологість грунту", soilNaturalMoisture);
  console.log("ro_s, Щільність твердої фази ґрунту", densitySolidPhase);
  console.log("ro_n, Щільність ґрунту в природному стані", densityNaturalState);
  console.log("c, коефіцієнт зчеплення грунту", soilCohesionCoefficient);
  console.log("gamma_ep, об'ємна вага грунту", soilUnitWeight);
  console.log("h, глибина", layingDepth);
  console.log(
    "phi_0, кут внутрішнього тертя грунту",
    correctInternalFrictionAngle
  );

  console.log("E_grunry, компресійний модуль деформації, МПа", E_grunry);

  const A =
    Math.sin(correctInternalFrictionAngle) *
    (3 - Math.sin(correctInternalFrictionAngle));
  const B =
    3 * soilCohesionCoefficient * Math.cos(correctInternalFrictionAngle) -
    2.5 * soilCohesionCoefficient * Math.sin(2 * correctInternalFrictionAngle) +
    soilUnitWeight * layingDepth * (1 + Math.sin(correctInternalFrictionAngle));

  const C =
    (soilUnitWeight *
      layingDepth *
      (1 + Math.sin(correctInternalFrictionAngle)) +
      4 * soilCohesionCoefficient * Math.cos(correctInternalFrictionAngle)) *
    soilCohesionCoefficient *
    Math.cos(correctInternalFrictionAngle);

  console.log("A", A);
  console.log("B", B);
  console.log("C", C);

  const discriminant = Math.pow(B, 2) + 4 * A * C;
  console.log("discriminant", discriminant);
  const sigma_1 = Math.abs((B + Math.sqrt(discriminant)) / (2 * A)); 

  console.log("sigma_1", sigma_1);

  const calculateLambda = (
    soilUnitWeight,
    layingDepth,
    soilCohesionCoefficient,
    correctInternalFrictionAngle,
    sigma_1
  ) => {
    const numerator =
      (soilUnitWeight * layingDepth +
        soilCohesionCoefficient / Math.tan(correctInternalFrictionAngle)) *
      Math.pow(Math.tan(Math.PI / 4 + correctInternalFrictionAngle / 2), 4);
    const lambda = numerator / sigma_1;
    return lambda;
  };

  const bigD = (1 + 1 / Math.sin(Math.PI / numberOfCasings)) * casingDiameter;
  console.log("bigD", bigD);

  const lambda = calculateLambda(
    soilUnitWeight,
    layingDepth,
    soilCohesionCoefficient,
    correctInternalFrictionAngle,
    sigma_1
  );

  console.log("lambda", lambda);

  console.log(
    " E_grunry * (1 + casingType * soilCohesionCoefficient * Math.tan(correctApexAngle))",
    E_grunry *
      (1 + casingType * soilCohesionCoefficient * Math.tan(correctApexAngle))
  );

  const firstPart =
    1000 *
    (Math.PI / 8) *
    Math.pow(bigD, 2) *
    E_grunry *
    (1 + casingType * soilCohesionCoefficient * Math.tan(correctApexAngle));
  const secondPart =
    1000 * 0.1 * Math.PI * lambda * casingType * bigD * sigma_1;
  const thirdPart = (0.3 - 0.2) * 0.035;

  console.log("firstPart", firstPart);
  console.log("secondPart", secondPart);
  console.log("thirdPart", thirdPart);

  const P_Σkon = firstPart + secondPart + thirdPart;

  console.log("P_Σкон.", P_Σkon);

  return P_Σkon;
}
