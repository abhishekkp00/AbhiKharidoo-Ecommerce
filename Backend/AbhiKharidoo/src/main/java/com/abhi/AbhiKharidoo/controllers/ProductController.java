package com.abhi.AbhiKharidoo.controllers;

import com.abhi.AbhiKharidoo.models.Product;
import com.abhi.AbhiKharidoo.repo.ProductRepo;
import com.abhi.AbhiKharidoo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ProductController {

    @Autowired
    private ProductService productService;

    @RequestMapping("/products")
    public ResponseEntity<List<Product>> getProducts(){
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @RequestMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id){
        Product product = productService.getAllProductById(id);

        if(product.getId() > 0)
            return new ResponseEntity<>(product, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);


    }

    @RequestMapping("/product")
    public ResponseEntity<?> addProduct(@RequestParam Product product, @RequestParam MultipartFile image){
        Product savedProduct = null;
        try {
            savedProduct = productService.addProduct(product, image);
            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductByIdAlias(@PathVariable int id){
        return getProductById(id);
    }

    @GetMapping("/product/{id}/image")
    public ResponseEntity<byte[]> getProductImage(@PathVariable int id){
        Product product = productService.getAllProductById(id);

        if (product.getId() <= 0 || product.getImageData() == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        HttpHeaders headers = new HttpHeaders();
        if (product.getImageType() != null && !product.getImageType().isBlank()) {
            headers.setContentType(MediaType.parseMediaType(product.getImageType()));
        }

        return new ResponseEntity<>(product.getImageData(), headers, HttpStatus.OK);
    }
}
