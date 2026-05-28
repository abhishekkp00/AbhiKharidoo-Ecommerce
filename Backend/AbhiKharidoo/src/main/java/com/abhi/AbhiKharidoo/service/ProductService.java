package com.abhi.AbhiKharidoo.service;

import com.abhi.AbhiKharidoo.models.Product;
import com.abhi.AbhiKharidoo.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;
    public List<Product> getAllProducts(){
        return productRepo.findAll();
    }

    public Product getAllProductById(int id) {
        return productRepo.findById(id).orElse(new Product(-1));
    }
}
