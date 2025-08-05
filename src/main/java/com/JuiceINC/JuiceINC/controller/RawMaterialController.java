package com.JuiceINC.JuiceINC.controller;

import com.JuiceINC.JuiceINC.model.RawMaterial;
import com.JuiceINC.JuiceINC.service.RawMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/raw-materials")
@CrossOrigin(origins = "http://localhost:3000")
public class RawMaterialController {
    
    @Autowired
    private RawMaterialService rawMaterialService;

    @GetMapping
    public ResponseEntity<List<RawMaterial>> getAllRawMaterials() {
        List<RawMaterial> rawMaterials = rawMaterialService.getAllRawMaterials();
        return ResponseEntity.ok(rawMaterials);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RawMaterial> getRawMaterialById(@PathVariable String id) {
        Optional<RawMaterial> rawMaterial = rawMaterialService.getRawMaterialById(id);
        return rawMaterial.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<RawMaterial>> getRawMaterialsByCategory(@PathVariable String category) {
        List<RawMaterial> rawMaterials = rawMaterialService.getRawMaterialsByCategory(category);
        return ResponseEntity.ok(rawMaterials);
    }

    @PostMapping
    public ResponseEntity<RawMaterial> createRawMaterial(@RequestBody RawMaterial rawMaterial) {
        RawMaterial savedRawMaterial = rawMaterialService.saveRawMaterial(rawMaterial);
        return ResponseEntity.ok(savedRawMaterial);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RawMaterial> updateRawMaterial(@PathVariable String id, @RequestBody RawMaterial rawMaterial) {
        Optional<RawMaterial> existingRawMaterial = rawMaterialService.getRawMaterialById(id);
        if (existingRawMaterial.isPresent()) {
            rawMaterial.setId(id);
            RawMaterial updatedRawMaterial = rawMaterialService.saveRawMaterial(rawMaterial);
            return ResponseEntity.ok(updatedRawMaterial);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRawMaterial(@PathVariable String id) {
        rawMaterialService.deleteRawMaterial(id);
        return ResponseEntity.ok().build();
    }
} 