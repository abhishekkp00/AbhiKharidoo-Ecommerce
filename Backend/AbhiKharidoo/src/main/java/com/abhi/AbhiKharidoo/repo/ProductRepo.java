package com.abhi.AbhiKharidoo.repo;

import com.abhi.AbhiKharidoo.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

}
