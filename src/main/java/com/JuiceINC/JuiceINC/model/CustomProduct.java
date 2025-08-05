package com.JuiceINC.JuiceINC.model;

import java.util.List;
import java.util.Map;

public class CustomProduct {
    private String id;
    private String name;
    private String type; // salad, juice
    private Map<String, Double> ingredients; // ingredient id -> quantity
    private double totalPrice;
    private String customerName;
    private String specialInstructions;

    public CustomProduct() {}

    public CustomProduct(String name, String type, Map<String, Double> ingredients) {
        this.name = name;
        this.type = type;
        this.ingredients = ingredients;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    // Legacy getter for backward compatibility
    public String getCategory() {
        return type;
    }

    // Legacy setter for backward compatibility
    public void setCategory(String category) {
        this.type = category;
    }

    public Map<String, Double> getIngredients() {
        return ingredients;
    }

    public void setIngredients(Map<String, Double> ingredients) {
        this.ingredients = ingredients;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getSpecialInstructions() {
        return specialInstructions;
    }

    public void setSpecialInstructions(String specialInstructions) {
        this.specialInstructions = specialInstructions;
    }
} 