package com.JuiceINC.JuiceINC.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "raw_materials")
public class RawMaterial {
    @Id
    private String id;
    private String name;
    private String category;
    private double unitPrice;
    private String unit; 
    private boolean available;

    public RawMaterial() {}

    public RawMaterial(String name, String category, double unitPrice, String unit) {
        this.name = name;
        this.category = category;
        this.unitPrice = unitPrice;
        this.unit = unit;
        this.available = true;
    }

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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
} 