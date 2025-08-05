package com.JuiceINC.JuiceINC.repository;

import com.JuiceINC.JuiceINC.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByAvailableTrue();
    List<Product> findByCategory(String category);
    List<Product> findByCategoryAndAvailableTrue(String category);
} 