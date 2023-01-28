package com.tify.back.repository.gifthub;


import com.tify.back.model.gifthub.Img;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImgRepository extends JpaRepository<Img, Long> {
}
