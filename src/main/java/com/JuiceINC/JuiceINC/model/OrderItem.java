package com.JuiceINC.JuiceINC.model;

public class OrderItem {
    private String productId;
    private String productName;
    private String category;
    private int quantity;
    private double price;
    private String customIngredients; // For custom products

    public OrderItem() {}

    public OrderItem(String productId, String productName, String category, int quantity, double price) {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
    }

    public OrderItem(String productId, String productName, String category, int quantity, double price, String customIngredients) {
        this(productId, productName, category, quantity, price);
        this.customIngredients = customIngredients;
    }

    // Getters and Setters
    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCustomIngredients() {
        return customIngredients;
    }

    public void setCustomIngredients(String customIngredients) {
        this.customIngredients = customIngredients;
    }
} 