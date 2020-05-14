package com.sss.stdprt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.stdprt.domain.Series;

public interface SeriesRepository extends JpaRepository<Series, Integer> {

	Series findByNameIgnoreCaseAndDeptIdAndStdyYr(String name, Integer deptId, Integer stdyYr);

	List<Series> findByDeptId(Integer deptId);
}
