package com.sss.stdprt.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sss.stdprt.beans.CertificateDto;
import com.sss.stdprt.beans.ContractDto;
import com.sss.stdprt.domain.Certificate;
import com.sss.stdprt.domain.Contract;
import com.sss.stdprt.repository.CertificateRepository;
import com.sss.stdprt.repository.CertificateStatusRepository;
import com.sss.stdprt.repository.ContractRepository;
import com.sss.stdprt.util.Constants;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SecretaryService {
	private final CertificateRepository certificateRepository;
	private final CertificateStatusRepository certificateStatusRepository;
	private final ContractRepository contractRepository;

	public List<CertificateDto> getCertificates() {
		List<Certificate> certificates = certificateRepository.findAll();

		List<CertificateDto> certificateDtos = certificates.stream().map(ent -> Certificate.entityToDto(ent, true))
				.collect(Collectors.toList());

		return certificateDtos;
	}

	public String acceptCertificate(CertificateDto certificate, String secretaryId) {
		Optional<Certificate> certOpt = certificateRepository.findById(certificate.getCertId());

		if (certOpt.isPresent()) {
			Certificate cert = certOpt.get();

			cert.setApprovedAt(new Date());
			cert.setStatus(certificateStatusRepository.getOne(Constants.ACCEPTED_CERT_ID));
			cert.setPurpose(certificate.getPurpose());
			cert.setUpdatedAt(new Date());
			cert.setUpdatedBy(secretaryId);

			certificateRepository.save(cert);

			return "Success";
		}

		return "Fail";
	}

	public String rejectCertificate(CertificateDto certificate, String secretaryId) {
		Optional<Certificate> certOpt = certificateRepository.findById(certificate.getCertId());

		if (certOpt.isPresent()) {
			Certificate cert = certOpt.get();

			cert.setApprovedAt(new Date());
			cert.setStatus(certificateStatusRepository.getOne(Constants.REJECTED_CERT_ID));
			cert.setPurpose(certificate.getPurpose());
			cert.setUpdatedAt(new Date());
			cert.setUpdatedBy(secretaryId);

			certificateRepository.save(cert);

			return "Success";
		}

		return "Fail";
	}

	public List<ContractDto> getContracts(Integer stdId) {
		List<Contract> contracts = contractRepository.findByStdId(stdId);

		List<ContractDto> certificateDtos = contracts.stream().map(ent -> Contract.entityToDto(ent, true))
				.collect(Collectors.toList());

		return certificateDtos;
	}

	public ContractDto addContract(ContractDto contractDto, String adminId) {
		Contract contract = contractRepository.findByStdIdAndYear(contractDto.getStudent().getStdId(),
				contractDto.getYear());

		if (contract != null) {
			return null;
		}

		contract = new Contract();
		contract.setYear(contractDto.getYear());
		contract.setStdyType(contractDto.getStdyType());
		contract.setStdyYr(contractDto.getStdyYr());
		contract.setStdId(contractDto.getStudent().getStdId());
		contract.setCreatedAt(new Date());
		contract.setCreatedBy(adminId);
		contract.setUpdatedAt(new Date());
		contract.setUpdatedBy(adminId);

		Contract newContract = contractRepository.save(contract);
		return Contract.entityToDto(newContract, true);
	}

	public String updateContract(ContractDto contractDto, String adminId) {
		Contract newContract = contractRepository.findByStdIdAndYear(contractDto.getStudent().getStdId(),
				contractDto.getYear());

		if (newContract != null && newContract.getCtrId() != contractDto.getCtrId()) {
			return "Contract already exists";
		}

		Optional<Contract> ctrOpt = contractRepository.findById(contractDto.getCtrId());

		if (ctrOpt.isPresent()) {
			Contract ctr = ctrOpt.get();

			ctr.setYear(contractDto.getYear());
			ctr.setStdyType(contractDto.getStdyType());
			ctr.setStdyYr(contractDto.getStdyYr());
			ctr.setUpdatedAt(new Date());
			ctr.setUpdatedBy(adminId);

			contractRepository.save(ctr);

			return "Success";
		}

		return "Fail";
	}

	public String deleteContract(Integer ctrId) {
		Optional<Contract> ctrOpt = contractRepository.findById(ctrId);

		if (ctrOpt.isPresent()) {
			Contract ctr = ctrOpt.get();

			contractRepository.delete(ctr);

			return "Success";
		}

		return "Fail";
	}

}
