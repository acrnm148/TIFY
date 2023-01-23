package com.tify.back.gifthub.repository;

import com.tify.back.gifthub.entity.Img;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImgRepository extends JpaRepository<Img, Long> {
}
