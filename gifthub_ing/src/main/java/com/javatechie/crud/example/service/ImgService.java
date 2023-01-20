package com.javatechie.crud.example.service;

import com.javatechie.crud.example.entity.Img;
import com.javatechie.crud.example.entity.Product;
import com.javatechie.crud.example.repository.ImgRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImgService {
    private final ImgRepository imgRepository;

    public Img saveImg(Img img) {
        return imgRepository.save(img);
    }

    public List<Img> saveImgs(List<Img> imgs) {
        return imgRepository.saveAll(imgs);
    }

    public List<Img> getImgs() {
        return imgRepository.findAll();
    }

    public Img getImgById(int id) {
        return imgRepository.findById(id).orElse(null);
    }
    public String deleteImg(int id) {
        imgRepository.deleteById(id);
        return "img removed !!" + id;
    }

}
