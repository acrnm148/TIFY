package com.tify.back.repository.phonebook;

import com.tify.back.model.phonebook.Phonebook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhonebookRepository extends JpaRepository<Phonebook, Long> {
}
