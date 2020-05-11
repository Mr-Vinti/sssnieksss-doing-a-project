package com.sss.stdprt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.stdprt.domain.Course;

public interface CourseRepository extends JpaRepository<Course, Integer> {

	Course findByNameIgnoreCaseAndSrsId(String name, Integer srsId);
	
	List<Course> findBySrsId(Integer srsId);
}
