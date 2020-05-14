package com.sss.stdprt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.stdprt.domain.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

	List<Department> findByFacId(Integer facId);

	Department findByNameIgnoreCaseAndFacId(String name, Integer facId);
}
