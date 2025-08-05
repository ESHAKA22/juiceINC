package com.JuiceINC.JuiceINC.repository;

import com.JuiceINC.JuiceINC.model.RawMaterial;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RawMaterialRepository extends MongoRepository<RawMaterial, String> {
    List<RawMaterial> findByAvailableTrue();
    List<RawMaterial> findByCategory(String category);
    RawMaterial findByName(String name);
} 