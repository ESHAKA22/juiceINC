package com.JuiceINC.JuiceINC.service;

import com.JuiceINC.JuiceINC.model.RawMaterial;
import com.JuiceINC.JuiceINC.repository.RawMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RawMaterialService {
    
    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    public List<RawMaterial> getAllRawMaterials() {
        return rawMaterialRepository.findByAvailableTrue();
    }

    public List<RawMaterial> getRawMaterialsByCategory(String category) {
        return rawMaterialRepository.findByCategory(category);
    }

    public Optional<RawMaterial> getRawMaterialById(String id) {
        return rawMaterialRepository.findById(id);
    }

    public RawMaterial getRawMaterialByName(String name) {
        return rawMaterialRepository.findByName(name);
    }

    public RawMaterial saveRawMaterial(RawMaterial rawMaterial) {
        return rawMaterialRepository.save(rawMaterial);
    }

    public void deleteRawMaterial(String id) {
        rawMaterialRepository.deleteById(id);
    }

    public List<RawMaterial> getAllRawMaterialsAdmin() {
        return rawMaterialRepository.findAll();
    }
} 