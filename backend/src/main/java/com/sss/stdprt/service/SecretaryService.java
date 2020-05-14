package com.sss.stdprt.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sss.stdprt.beans.CertificateDto;
import com.sss.stdprt.domain.Certificate;
import com.sss.stdprt.repository.CertificateRepository;
import com.sss.stdprt.repository.CertificateStatusRepository;
import com.sss.stdprt.util.Constants;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SecretaryService {
	private final CertificateRepository certificateRepository;
	private final CertificateStatusRepository certificateStatusRepository;

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

}
