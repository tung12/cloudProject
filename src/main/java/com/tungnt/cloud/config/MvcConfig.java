package com.tungnt.cloud.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@EnableWebMvc
@Configuration
public class MvcConfig extends WebMvcConfigurerAdapter {
    @Override
    public void addResourceHandlers(
            ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/static/**")
                .addResourceLocations("/build/static/");
        registry.addResourceHandler("/*.js")
                .addResourceLocations("/build/");
        registry.addResourceHandler("/*.json")
                .addResourceLocations("/build/");
        registry.addResourceHandler("/*.ico")
                .addResourceLocations("/build/");
        registry.addResourceHandler("/index.html")
                .addResourceLocations("/index.html");
    }
}
