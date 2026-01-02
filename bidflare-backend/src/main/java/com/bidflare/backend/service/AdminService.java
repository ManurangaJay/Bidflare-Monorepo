package com.bidflare.backend.service;

import com.bidflare.backend.dto.UserDto;
import com.bidflare.backend.dto.auction.AuctionResponseDto;
import com.bidflare.backend.dto.product.ProductResponseDto;
import com.bidflare.backend.entity.Product;
import com.bidflare.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminService {
    Page<UserDto> getUsersByRole(User.Role role, Pageable pageable);
    Page<ProductResponseDto> getProductsByStatus(Product.Status status, Pageable pageable);
    Page<AuctionResponseDto> getAuctionsByStatus(boolean isClosed, Pageable pageable);
}
