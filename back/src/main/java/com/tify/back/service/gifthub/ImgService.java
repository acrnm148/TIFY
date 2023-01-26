package com.tify.back.service.gifthub;


import com.tify.back.model.gifthub.Img;
import com.tify.back.repository.gifthub.ImgRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Img getImgById(Long id) {
        return imgRepository.findById(id).orElse(null);
    }
    public String deleteImg(Long id) {
        imgRepository.deleteById(id);
        return "img removed !!" + id;
    }

}
