package com.sss.stdprt.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

import com.sss.stdprt.beans.CertificateDto;
import com.sss.stdprt.service.SecretaryService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.AllArgsConstructor;

@RestController
@Api(tags = "Secretary Controller")
@AllArgsConstructor
public class SecretaryController {
	private final SecretaryService secretaryService;

	@ApiOperation("Get Certificates Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
			@ApiResponse(code = 400, message = "Malformed request"),
			@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/secretary/get-certificates")
	public ResponseEntity<List<CertificateDto>> getCertificates() {
		List<CertificateDto> certificates = secretaryService.getCertificates();

		return ResponseEntity.ok(certificates);
	}

	@ApiOperation("Accept Certificate Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
			@ApiResponse(code = 400, message = "Malformed request"),
			@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/secretary/accept-certificate")
	public ResponseEntity<String> acceptCertificate(@RequestBody CertificateDto certificate,
			OAuth2AuthenticationToken auth) {
		String secretaryId = auth.getPrincipal().getAttributes().get("oid").toString();
		String response = secretaryService.acceptCertificate(certificate, secretaryId);

		return ResponseEntity.ok(response);
	}

	@ApiOperation("Reject Certificate Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
			@ApiResponse(code = 400, message = "Malformed request"),
			@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/secretary/reject-certificate")
	public ResponseEntity<String> rejectCertificate(@RequestBody CertificateDto certificate,
			OAuth2AuthenticationToken auth) {
		String secretaryId = auth.getPrincipal().getAttributes().get("oid").toString();
		String response = secretaryService.rejectCertificate(certificate, secretaryId);

		return ResponseEntity.ok(response);
	}
}
