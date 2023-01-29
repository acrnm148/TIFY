package com.tify.back.repository.noti;

import com.tify.back.model.noti.Noti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotiRepository extends JpaRepository<Noti, Long> {
}