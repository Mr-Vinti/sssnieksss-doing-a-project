package com.sss.stdprt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.stdprt.domain.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {
	
	Department findByNameIgnoreCaseAndFacId(String name, Integer facId);
}
