package com.sss.stdprt.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.stdprt.beans.FacultyDto;
import com.sss.stdprt.domain.Faculty;

import lombok.AllArgsConstructor;

public interface FacultyRepository extends JpaRepository<Faculty, Integer> {
	Faculty findByNameIgnoreCase(String name);
}
