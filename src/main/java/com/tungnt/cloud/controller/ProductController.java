package com.tungnt.cloud.controller;


import com.tungnt.cloud.entity.Product;
import com.tungnt.cloud.exception.AccountException;
import com.tungnt.cloud.exception.ProductException;
import com.tungnt.cloud.exception.RoleException;
import com.tungnt.cloud.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("/api")
public class ProductController {

    final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping(value = "/product")
    public ResponseEntity getAllProduct()  {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProduct());
    }

    @PostMapping(value = "/product")
    public ResponseEntity createProduct(@ModelAttribute Product product, @RequestPart("files") MultipartFile file) throws RoleException.RoleNotExistException, AccountException.AccountExistException, IOException {
        //return ResponseEntity.status(HttpStatus.OK).body(productService.addProduct(product));
        System.out.println("ahihi ");
        product.setImageFile(file);
        return ResponseEntity.status(HttpStatus.OK).body(productService.addProduct(product));
    }

    @GetMapping(value = "/product/{id}")
    public ResponseEntity getProductById(@PathVariable Integer id) throws ProductException.ProductNotExistException {
        return ResponseEntity.status(HttpStatus.OK).body(productService.findProductById(id));
    }

    @DeleteMapping(value="/product/{id}")
    public ResponseEntity deleteProduct(@PathVariable Integer id) throws ProductException.ProductNotExistException {
        productService.deleteProduct(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
//    @PostMapping(value = "/upload-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity changeImage(@RequestParam("file") MultipartFile file, Principal principal) throws ProductException.ProductNotExistException {
//        return ResponseEntity.status(HttpStatus.OK).body(productService.findProductById(id));
//    }

}
