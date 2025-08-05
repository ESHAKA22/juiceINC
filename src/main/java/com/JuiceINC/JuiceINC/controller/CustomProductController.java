package com.JuiceINC.JuiceINC.controller;

import com.JuiceINC.JuiceINC.model.CustomProduct;
import com.JuiceINC.JuiceINC.service.CustomProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/custom-products")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomProductController {
    
    @Autowired
    private CustomProductService customProductService;

    @PostMapping
    public ResponseEntity<CustomProduct> createCustomProduct(@RequestBody CustomProductRequest request) {
        if (!customProductService.validateIngredients(request.getIngredients())) {
            return ResponseEntity.badRequest().build();
        }
        
        CustomProduct customProduct = customProductService.createCustomProduct(
            request.getName(),
            request.getType(),
            request.getIngredients(),
            request.getCustomerName(),
            request.getSpecialInstructions()
        );
        
        return ResponseEntity.ok(customProduct);
    }

    @PostMapping("/calculate-price")
    public ResponseEntity<PriceCalculationResponse> calculatePrice(@RequestBody Map<String, Double> ingredients) {
        if (!customProductService.validateIngredients(ingredients)) {
            return ResponseEntity.badRequest().build();
        }
        
        double totalPrice = customProductService.calculateCustomProductPrice(ingredients);
        PriceCalculationResponse response = new PriceCalculationResponse(totalPrice);
        
        return ResponseEntity.ok(response);
    }

    public static class CustomProductRequest {
        private String name;
        private String type;
        private Map<String, Double> ingredients;
        private String customerName;
        private String specialInstructions;
        private double totalPrice;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        
        public String getCategory() { return type; }
        public void setCategory(String category) { this.type = category; }
        
        public Map<String, Double> getIngredients() { return ingredients; }
        public void setIngredients(Map<String, Double> ingredients) { this.ingredients = ingredients; }
        
        public String getCustomerName() { return customerName; }
        public void setCustomerName(String customerName) { this.customerName = customerName; }
        
        public String getSpecialInstructions() { return specialInstructions; }
        public void setSpecialInstructions(String specialInstructions) { this.specialInstructions = specialInstructions; }
        
        public double getTotalPrice() { return totalPrice; }
        public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
    }

    public static class PriceCalculationResponse {
        private double totalPrice;

        public PriceCalculationResponse(double totalPrice) {
            this.totalPrice = totalPrice;
        }

        public double getTotalPrice() { return totalPrice; }
        public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
    }
} 