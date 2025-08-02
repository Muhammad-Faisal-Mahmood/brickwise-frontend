// hooks/useEstimatorCalculations.js
import { useMemo } from "react";

const useEstimatorCalculations = (form) => {
  const MARLA_TO_SQFT = 272.25;

  // Enhanced rates with taxes and additional costs
  const rates = {
    brickRate: 12,
    cementRate: 950,
    ironRate: 230,
    laborRate: 1500,
    machineryRate: 5000,
    electricalRate: 300, // per sq ft
    plumbingRate: 200, // per bathroom
    tilesRate: 150, // per sq ft
    paintRate: 80, // per sq ft
    miscellaneousRate: 0.1, // 10% of base cost
    taxRate: 0.17, // 17% sales tax
    contingencyRate: 0.15, // 15% contingency
  };

  const typeMultipliers = {
    Home: 1,
    Villa: 1.4,
    Apartment: 0.8,
    Farmhouse: 1.6,
    Commercial: 1.8,
    Office: 1.5,
  };

  const estimateMaterials = useMemo(() => {
    const { marlas, floors, bedrooms, bathrooms } = form;
    const area = marlas * MARLA_TO_SQFT;
    const totalArea = area * floors;

    // Enhanced calculations based on rooms
    const bedroomMultiplier = Math.max(1, bedrooms / 3); // Base 3 bedrooms
    const bathroomMultiplier = Math.max(1, bathrooms / 2); // Base 2 bathrooms

    const bricksQty = Math.ceil((totalArea / 100) * 500 * bedroomMultiplier);
    const cementQty = Math.ceil(
      (totalArea / 100) * 4 * floors * bedroomMultiplier
    );
    const ironQty = Math.ceil((totalArea / 100) * 50 * floors);
    const laborDays = Math.ceil(totalArea * 0.02 * bedroomMultiplier);
    const machineryDays = floors * 2 + Math.ceil(bedrooms / 2);

    // Additional materials
    const electricalCost = totalArea * rates.electricalRate;
    const plumbingCost = bathrooms * rates.plumbingRate * 50; // 50 sq ft per bathroom avg
    const tilesCost = totalArea * 0.6 * rates.tilesRate; // 60% of area tiled
    const paintCost = totalArea * 1.5 * rates.paintRate; // walls + ceiling

    return {
      bricksQty,
      cementQty,
      ironQty,
      laborDays,
      machineryDays,
      area: totalArea,
      electricalCost,
      plumbingCost,
      tilesCost,
      paintCost,
    };
  }, [form, rates]);

  const calculateCosts = useMemo(() => {
    const materials = estimateMaterials;
    const multiplier = typeMultipliers[form.type] || 1;

    // Base material costs
    const bricksCost = materials.bricksQty * rates.brickRate;
    const cementCost = materials.cementQty * rates.cementRate;
    const ironCost = materials.ironQty * rates.ironRate;
    const laborCost = materials.laborDays * rates.laborRate;
    const machineryCost = materials.machineryDays * rates.machineryRate;

    const baseCost =
      bricksCost + cementCost + ironCost + laborCost + machineryCost;
    const finishingCost =
      materials.electricalCost +
      materials.plumbingCost +
      materials.tilesCost +
      materials.paintCost;

    const subtotal = (baseCost + finishingCost) * multiplier;
    const miscellaneous = subtotal * rates.miscellaneousRate;
    const beforeTax = subtotal + miscellaneous;
    const tax = beforeTax * rates.taxRate;
    const contingency = beforeTax * rates.contingencyRate;
    const total = beforeTax + tax + contingency;

    return {
      bricksCost,
      cementCost,
      ironCost,
      laborCost,
      machineryCost,
      finishingCost,
      miscellaneous,
      tax,
      contingency,
      total,
      materials,
    };
  }, [form, estimateMaterials, rates, typeMultipliers]);

  return calculateCosts;
};

export default useEstimatorCalculations;
