const carPlatforms = {
    jdm: { name: "Nissan Silvia S15 (SR20DET)", baseHp: 250, baseTq: 275, weight: 1250, frontWheel: "66%", backWheel: "25%", ringSize: "72px" },
    euro: { name: "BMW M3 Competition (S58)", baseHp: 473, baseTq: 550, weight: 1730, frontWheel: "66%", backWheel: "25%", ringSize: "72px" },
    usdm: { name: "Ford Mustang GT (Coyote V8)", baseHp: 460, baseTq: 570, weight: 1680, frontWheel: "66%", backWheel: "25%", ringSize: "72px" }
};

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

const ringFront = document.getElementById('ring-front');
const ringBack = document.getElementById('ring-back');
const summaryText = document.getElementById('summary-text');
const svgFormula = document.getElementById('svg-formula');

function computeCarTuningSpecs() {
    const selectedPlatform = chassisSelect.value;
    const selectedEcu = ecuSelect.value;
    const boostLevel = parseFloat(boostSlider.value);
    const weightStripped = parseFloat(weightSlider.value);
    const tireType = tireSelect.value;
    
    const baseVehicle = carPlatforms[selectedPlatform];
    
    // Core performance calculations formulas
    let ecuMultiplier = 1.0;
    if (selectedEcu === 'stage1') ecuMultiplier = 1.15;
    if (selectedEcu === 'stage2') ecuMultiplier = 1.35;
    
    const boostBonusValue = (boostLevel - 0.5) * 60; 
    
    let finalHp = Math.round((baseVehicle.baseHp * ecuMultiplier) + boostBonusValue);
    let finalTq = Math.round((baseVehicle.baseTq * ecuMultiplier) + (boostBonusValue * 1.2));
    let finalWt = baseVehicle.weight - weightStripped;
    
    let tractionFactor = 1.0; 
    if (tireType === 'sport') tractionFactor = 0.88; 
    if (tireType === 'track') tractionFactor = 0.78; 
    
    let calculatedAcceleration = ((finalWt / finalHp) * 1.15 * tractionFactor).toFixed(2);
    if (calculatedAcceleration < 1.9) calculatedAcceleration = 1.9;

    // Render telemetry metrics to dashboard cards
    statHp.innerText = finalHp.toLocaleString();
    statTq.innerText = finalTq.toLocaleString();
    statWt.innerText = finalWt.toLocaleString();
    statAcc.innerText = calculatedAcceleration;
    
    boostReadout.innerText = `${boostLevel.toFixed(1)} BAR`;
    weightReadout.innerText = `${weightStripped} KG Stripped`;

       // --- ANIMATE VECTOR BLUEPRINT COMPONENT GAUGE SCALES ---
    document.querySelectorAll('.car-blueprint-render').forEach(renderFrame => {
        // Dynamically scale the supercar blueprint outlines to show power modifications
        const structuralScale = 1 + ((boostLevel - 0.8) * 0.04);
        renderFrame.style.transform = `scale(${structuralScale})`;
    });


    // --- POSITION WHEEL GAUGE RINGS ---
    if (boostLevel > 1.5 || selectedEcu === 'stage2') {
        ringFront.style.display = 'block';
        ringBack.style.display = 'block';
        
        ringFront.style.width = baseVehicle.ringSize;
        ringFront.style.height = baseVehicle.ringSize;
        ringFront.style.left = baseVehicle.frontWheel;
        ringFront.style.top = "38%";
        
        ringBack.style.width = baseVehicle.ringSize;
        ringBack.style.height = baseVehicle.ringSize;
        ringBack.style.left = baseVehicle.backWheel;
        ringBack.style.top = "38%";
    } else {
        ringFront.style.display = 'none';
        ringBack.style.display = 'none';
    }
    
    summaryText.innerHTML = `Your custom tuned <b style="color:#06b6d4;">${baseVehicle.name}</b> setup weighs <b style="color:#cbd5e1;">${finalWt} KG</b>, operating at an augmented energy velocity profile. Blueprint validation: <b style="color:#f97316;">PASSED // SCHEMATIC VERIFIED</b>.`;
}

chassisSelect.addEventListener('change', computeCarTuningSpecs);
ecuSelect.addEventListener('change', computeCarTuningSpecs);
boostSlider.addEventListener('input', computeCarTuningSpecs);
weightSlider.addEventListener('input', computeCarTuningSpecs);
tireSelect.addEventListener('change', computeCarTuningSpecs);

computeCarTuningSpecs();
