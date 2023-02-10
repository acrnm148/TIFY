package com.tify.back.repository.phonebook;

import com.tify.back.model.phonebook.Phonebook;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhonebookRepository extends JpaRepository<Phonebook, Long> {
	List<Phonebook> findByUserId(Long userId);
}
