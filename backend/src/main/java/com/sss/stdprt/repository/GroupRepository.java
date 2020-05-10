package com.sss.stdprt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.stdprt.domain.Group;

public interface GroupRepository extends JpaRepository<Group, Integer> {

	Group findByNameIgnoreCaseAndSrsId(String name, Integer srsId);
	
	List<Group> findBySrsId(Integer srsId);
}
