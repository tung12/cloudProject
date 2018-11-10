package com.tungnt.cloud.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.tungnt.cloud.entity.Product;
import com.tungnt.cloud.exception.ProductException;
import com.tungnt.cloud.repository.ProductRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import com.google.common.io.Files;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {

    final ProductRepository productRepository;
    private final Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap("cloud_name", "conchymxinhxinh", "api_key", "718455327871143", "api_secret", "Eo3t8ohIr5UeWiYekkhqqqdztHo"));

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProduct(){
        return productRepository.findAll();
    }

    @Transactional(rollbackFor = Exception.class)
    public Product addProduct(Product product) throws IOException {
        ////Authentication authentication = Contex
        File image = new File(product.getImageFile().getOriginalFilename());
        byte[] bytes = product.getImageFile().getBytes();
        Files.write(bytes,image);
        Map<String, String> uploadResult = cloudinary.uploader().upload(image, ObjectUtils.asMap(
                "public_id","images/"+product.getImageFile().getOriginalFilename().replaceAll(".jpg",""),
                "overwrite","avatar",
                "transformation", new Transformation<>().crop("limit"),
                "format", "jpg"
        ));
        image.delete();
        String url = uploadResult.get("secure_url");
        System.out.println(url);
        product.setImageUrl(url);
        return productRepository.save(product);
        //return null;
    }

    public Product findProductById(Integer id) throws ProductException.ProductNotExistException {
        return productRepository.findById(id).orElseThrow(ProductException.ProductNotExistException::new);
    }

    public void deleteProduct(Integer id) throws ProductException.ProductNotExistException {
        Product product = productRepository.findById(id).orElseThrow(ProductException.ProductNotExistException::new);
        productRepository.delete(product);
    }

    public Product updateProduct(Product product) throws ProductException.ProductNotExistException, IOException {
        Product oldProduct = productRepository.findById(product.getId()).orElseThrow(ProductException.ProductNotExistException::new);
        oldProduct.setName(product.getName());
        oldProduct.setPrice(product.getPrice());
        if (product.getImageFile() != null){
            File image = new File(product.getImageFile().getOriginalFilename());
            byte[] bytes = product.getImageFile().getBytes();
            Files.write(bytes,image);
            Map<String, String> uploadResult = cloudinary.uploader().upload(image, ObjectUtils.asMap(
                    "public_id","images/"+product.getImageFile().getOriginalFilename().replaceAll(".jpg",""),
                    "overwrite","avatar",
                    "transformation", new Transformation<>().crop("limit"),
                    "format", "jpg"
            ));
            image.delete();
            String url = uploadResult.get("secure_url");
            oldProduct.setImageUrl(url);
        }

       return  productRepository.save(oldProduct);

    }
//    public Product changeImage(MultipartFile file, String username) throws ProductException.ProductNotExistException {
//        return productRepository.findById(id).orElseThrow(ProductException.ProductNotExistException::new);
//    }
}
