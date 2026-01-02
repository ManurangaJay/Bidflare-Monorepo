package com.bidflare.backend.service.impl;

import com.bidflare.backend.dto.UserDto;
import com.bidflare.backend.dto.auction.AuctionResponseDto;
import com.bidflare.backend.dto.product.ProductResponseDto;
import com.bidflare.backend.entity.Product;
import com.bidflare.backend.entity.User;
import com.bidflare.backend.mapper.AuctionMapper;
import com.bidflare.backend.mapper.ProductMapper;
import com.bidflare.backend.mapper.UserMapper;
import com.bidflare.backend.repository.AuctionRepository;
import com.bidflare.backend.repository.ProductRepository;
import com.bidflare.backend.repository.UserRepository;
import com.bidflare.backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final AuctionRepository auctionRepository;
    private final ProductMapper productMapper;

    @Override
    public Page<UserDto> getUsersByRole(User.Role role, Pageable pageable) {
        return userRepository.findByRole(role, pageable)
                .map(UserMapper::toDto);
    }

    @Override
    public Page<ProductResponseDto> getProductsByStatus(Product.Status status, Pageable pageable) {
        return productRepository.findByStatus(status, pageable)
                .map(productMapper::toDto);
    }

    @Override
    public Page<AuctionResponseDto> getAuctionsByStatus(boolean isClosed, Pageable pageable) {
        return auctionRepository.findByIsClosed(isClosed, pageable)
                .map(AuctionMapper::toDto);
    }
}
