package com.JuiceINC.JuiceINC.config;

import com.JuiceINC.JuiceINC.model.Product;
import com.JuiceINC.JuiceINC.model.RawMaterial;
import com.JuiceINC.JuiceINC.repository.ProductRepository;
import com.JuiceINC.JuiceINC.repository.RawMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize raw materials (fruits)
        initializeRawMaterials();
        
        // Initialize products
        initializeProducts();
    }

    private void initializeRawMaterials() {
        if (rawMaterialRepository.count() == 0) {
            List<RawMaterial> rawMaterials = Arrays.asList(
                new RawMaterial("Banana", "fruit", 2.50, "piece"),
                new RawMaterial("Watermelon", "fruit", 15.00, "kg"),
                new RawMaterial("Pineapple", "fruit", 8.00, "piece"),
                new RawMaterial("Mango", "fruit", 12.00, "kg"),
                new RawMaterial("Apple", "fruit", 5.00, "kg"),
                new RawMaterial("Papaya", "fruit", 10.00, "kg"),
                new RawMaterial("Orange", "fruit", 6.00, "kg"),
                new RawMaterial("Wood Apple", "fruit", 4.00, "piece"),
                new RawMaterial("Vanilla", "ice_cream", 3.00, "scoop"),
                new RawMaterial("Chocolate", "ice_cream", 3.50, "scoop"),
                new RawMaterial("Fruit and Nut", "ice_cream", 4.00, "scoop")
            );
            
            rawMaterialRepository.saveAll(rawMaterials);
        }
    }

    private void initializeProducts() {
        if (productRepository.count() == 0) {
            List<Product> products = Arrays.asList(
                // Fruit Salads
                new Product("Tropical Mix Salad", "Fresh mix of tropical fruits", "fruit_salad", 25.00, 
                    Arrays.asList("Banana", "Watermelon", "Pineapple", "Mango")),
                new Product("Classic Fruit Salad", "Traditional fruit salad with seasonal fruits", "fruit_salad", 20.00, 
                    Arrays.asList("Apple", "Banana", "Papaya")),
                new Product("Exotic Fruit Salad", "Premium exotic fruits combination", "fruit_salad", 30.00, 
                    Arrays.asList("Mango", "Pineapple", "Papaya", "Watermelon")),
                
                // Fruit Juices
                new Product("Mango Juice", "Fresh mango juice", "fruit_juice", 15.00, 
                    Arrays.asList("Mango")),
                new Product("Orange Juice", "Fresh orange juice", "fruit_juice", 12.00, 
                    Arrays.asList("Orange")),
                new Product("Wood Apple Juice", "Traditional wood apple juice", "fruit_juice", 10.00, 
                    Arrays.asList("Wood Apple")),
                new Product("Watermelon Juice", "Refreshing watermelon juice", "fruit_juice", 14.00, 
                    Arrays.asList("Watermelon")),
                new Product("Papaya Juice", "Healthy papaya juice", "fruit_juice", 13.00, 
                    Arrays.asList("Papaya")),
                
                // Ice Creams
                new Product("Vanilla Ice Cream", "Classic vanilla ice cream", "ice_cream", 8.00, 
                    Arrays.asList("Vanilla")),
                new Product("Chocolate Ice Cream", "Rich chocolate ice cream", "ice_cream", 9.00, 
                    Arrays.asList("Chocolate")),
                new Product("Fruit and Nut Ice Cream", "Premium fruit and nut ice cream", "ice_cream", 10.00, 
                    Arrays.asList("Fruit and Nut"))
            );
            
            productRepository.saveAll(products);
        }
    }
} 