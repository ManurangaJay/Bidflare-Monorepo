package com.bidflare.backend.repository;

import com.bidflare.backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findBySellerId(UUID sellerId);
    Page<Product> findByStatus(Product.Status status, Pageable pageable);
}
