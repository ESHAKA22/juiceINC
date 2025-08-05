package com.JuiceINC.JuiceINC.service;

import com.JuiceINC.JuiceINC.model.CustomProduct;
import com.JuiceINC.JuiceINC.model.RawMaterial;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class CustomProductService {
    
    @Autowired
    private RawMaterialService rawMaterialService;

    public double calculateCustomProductPrice(Map<String, Double> ingredients) {
        double totalPrice = 0.0;
        
        for (Map.Entry<String, Double> entry : ingredients.entrySet()) {
            String ingredientId = entry.getKey();
            Double quantity = entry.getValue();
            
            Optional<RawMaterial> rawMaterialOpt = rawMaterialService.getRawMaterialById(ingredientId);
            if (rawMaterialOpt.isPresent()) {
                RawMaterial rawMaterial = rawMaterialOpt.get();
                if (rawMaterial.isAvailable()) {
                    totalPrice += rawMaterial.getUnitPrice() * quantity;
                }
            }
        }
        
        return totalPrice;
    }

    public CustomProduct createCustomProduct(String name, String type, Map<String, Double> ingredients, String customerName, String specialInstructions) {
        CustomProduct customProduct = new CustomProduct(name, type, ingredients);
        customProduct.setCustomerName(customerName);
        customProduct.setSpecialInstructions(specialInstructions);
        customProduct.setTotalPrice(calculateCustomProductPrice(ingredients));
        
        return customProduct;
    }

    public boolean validateIngredients(Map<String, Double> ingredients) {
        for (String ingredientId : ingredients.keySet()) {
            Optional<RawMaterial> rawMaterialOpt = rawMaterialService.getRawMaterialById(ingredientId);
            if (!rawMaterialOpt.isPresent() || !rawMaterialOpt.get().isAvailable()) {
                return false;
            }
        }
        return true;
    }
} 