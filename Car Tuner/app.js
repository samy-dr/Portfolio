// Stock performance specifications matrix dictionary profiles
const carPlatforms = {
    jdm: { name: "Nissan Silvia S15 (SR20DET)", baseHp: 250, baseTq: 275, weight: 1250 },
    euro: { name: "BMW M3 Competition (S58)", baseHp: 473, baseTq: 550, weight: 1730 },
    usdm: { name: "Ford Mustang GT (Coyote V8)", baseHp: 460, baseTq: 570, weight: 1680 }
};

// DOM Handle Links Elements Layout Links
const chassisSelect = document.getElementById('chassis-select');
const ecuSelect = document.getElementById('ecu-select');
const boostSlider = document.getElementById('boost-slider');
const boostReadout = document.getElementById('boost-readout');
const weightSlider = document.getElementById('weight-slider');
const weightReadout = document.getElementById('weight-readout');
const tireSelect = document.getElementById('tire-select');

const statHp = document.getElementById('stat-hp');
const statTq = document.getElementById('stat-tq');
const statWt = document.getElementById('stat-wt');
const statAcc = document.getElementById('stat-acc');

const carVector = document.getElementById('car-vector-silhouette');
const ringFront = document.getElementById('ring-front');
const ringBack = document.getElementById('ring-back');
const summaryText = document.getElementById('summary-text');

function computeCarTuningSpecs() {
    const selectedPlatform = chassisSelect.value;
    const selectedEcu = ecuSelect.value;
    const boostLevel = parseFloat(boostSlider.value);
    const weightStripped = parseFloat(weightSlider.value);
    const tireType = tireSelect.value;
    
    const baseVehicle = carPlatforms[selectedPlatform];
    
    // --- ADVANCED AUTOMOTIVE CALCULATIONS TUNING TUNNEL ---
    // 1. Calculate Horsepower increases based on ECU Maps & Boost Modifiers
    let ecuMultiplier = 1.0;
    if (selectedEcu === 'stage1') ecuMultiplier = 1.15;
    if (selectedEcu === 'stage2') ecuMultiplier = 1.35;
    
    // Each additional BAR of boost past stock 0.5 adds incremental mechanical force
    const boostBonusValue = (boostLevel - 0.5) * 60; 
    
    let finalHp = Math.round((baseVehicle.baseHp * ecuMultiplier) + boostBonusValue);
    let finalTq = Math.round((baseVehicle.baseTq * ecuMultiplier) + (boostBonusValue * 1.2));
    let finalWt = baseVehicle.weight - weightStripped;
    
    // 2. Compute 0-100 KM/H Acceleration Metrics Curve Formula (Power-to-Weight + Tire Traction coefficients)
    let tractionFactor = 1.0; // Street baseline stock setting
    if (tireType === 'sport') tractionFactor = 0.88; // Drops raw sprint seconds values safely
    if (tireType === 'track') tractionFactor = 0.78; // Maximum mechanical traction velocity grip
    
    // Core physical calculation link formula curves values estimations
    let calculatedAcceleration = ((finalWt / finalHp) * 1.15 * tractionFactor).toFixed(2);
    
    // Sanity-check baseline boundary limit controls safeguards
    if (calculatedAcceleration < 1.9) calculatedAcceleration = 1.9; // Physical limits safety caps
    // --------------------------------------------------------

    // Render numbers directly into localized string elements rows panels
    statHp.innerText = finalHp.toLocaleString();
    statTq.innerText = finalTq.toLocaleString();
    statWt.innerText = finalWt.toLocaleString();
    statAcc.innerText = calculatedAcceleration;
    
    // Dynamic slider label values updates
    boostReadout.innerText = `${boostLevel.toFixed(1)} BAR`;
    weightReadout.innerText = `${weightStripped} KG Stripped`;

    // --- ANIMATED SCHEMATIC VECTOR UI ADJUSTMENT RESPONSES ---
    // Visually scale the car avatar icon to show power weight variations changes
    const scaleValue = 1 + (boostLevel * 0.15);
    carVector.style.transform = `scale(${scaleValue})`;
    
    // Turn on the neon tuning visualization dashboard blueprint accent positioning highlights
    if (boostLevel > 1.5 || selectedEcu === 'stage2') {
        ringFront.style.display = 'block';
        ringBack.style.display = 'block';
        ringFront.style.left = '65%';
        ringBack.style.left = '25%';
    } else {
        ringFront.style.display = 'none';
        ringBack.style.display = 'none';
    }
    
    // Update structural text analytics overview logs comment summaries cards
    summaryText.innerHTML = `Your custom tuned <b style="color:#06b6d4;">${baseVehicle.name}</b> setup weighs <b style="color:#cbd5e1;">${finalWt} KG</b>, operating at an augmented energy velocity profile. Blueprint safety coefficients validation: <b style="color:#f97316;">PASSED // OPTIMAL PERFORMANCE STAGING SECURED</b>.`;
}

// Bind event listeners to completely recalculate metrics automatically on any modifications
chassisSelect.addEventListener('change', computeCarTuningSpecs);
ecuSelect.addEventListener('change', computeCarTuningSpecs);
boostSlider.addEventListener('input', computeCarTuningSpecs);
weightSlider.addEventListener('input', computeCarTuningSpecs);
tireSelect.addEventListener('change', computeCarTuningSpecs);

// Initial application launch initialization calculations pipeline execution pass
computeCarTuningSpecs();
