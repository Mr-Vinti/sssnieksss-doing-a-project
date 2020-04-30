package com.sss.stdprt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.stdprt.domain.Faculty;

public interface FacultyRepository extends JpaRepository<Faculty, Integer> {
	Faculty findByNameIgnoreCase(String name);
}
