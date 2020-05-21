package com.sss.stdprt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sss.stdprt.domain.Contract;

public interface ContractRepository extends JpaRepository<Contract, Integer> {

	List<Contract> findByStdId(Integer stdId);

	Contract findByStdIdAndYear(Integer stdId, Integer year);
}
