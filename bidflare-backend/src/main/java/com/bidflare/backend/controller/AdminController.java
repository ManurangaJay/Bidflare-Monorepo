package com.bidflare.backend.controller;

import com.bidflare.backend.dto.UserDto;
import com.bidflare.backend.dto.auction.AuctionResponseDto;
import com.bidflare.backend.dto.product.ProductResponseDto;
import com.bidflare.backend.entity.Product;
import com.bidflare.backend.entity.User;
import com.bidflare.backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<Page<UserDto>> getUsersByRole(
            @RequestParam User.Role role,
            Pageable pageable) {
        return ResponseEntity.ok(adminService.getUsersByRole(role, pageable));
    }

    @GetMapping("/products")
    public ResponseEntity<Page<ProductResponseDto>> getProductsByStatus(
            @RequestParam Product.Status status,
            Pageable pageable) {
        return ResponseEntity.ok(adminService.getProductsByStatus(status, pageable));
    }

    @GetMapping("/auctions")
    public ResponseEntity<Page<AuctionResponseDto>> getAuctionsByStatus(
            @RequestParam boolean isClosed,
            Pageable pageable) {
        return ResponseEntity.ok(adminService.getAuctionsByStatus(isClosed, pageable));
    }
}
