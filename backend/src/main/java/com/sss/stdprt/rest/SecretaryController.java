package com.sss.stdprt.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

import com.microsoft.azure.spring.autoconfigure.aad.UserPrincipal;
import com.sss.stdprt.beans.CertificateDto;
import com.sss.stdprt.beans.ContractDto;
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
			PreAuthenticatedAuthenticationToken auth) {
		String secretaryId = ((UserPrincipal) auth.getPrincipal()).getClaims().get("preferred_username").toString();
		String response = secretaryService.acceptCertificate(certificate, secretaryId);

		return ResponseEntity.ok(response);
	}

	@ApiOperation("Reject Certificate Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
			@ApiResponse(code = 400, message = "Malformed request"),
			@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/secretary/reject-certificate")
	public ResponseEntity<String> rejectCertificate(@RequestBody CertificateDto certificate,
			PreAuthenticatedAuthenticationToken auth) {
		String secretaryId = ((UserPrincipal) auth.getPrincipal()).getClaims().get("preferred_username").toString();
		String response = secretaryService.rejectCertificate(certificate, secretaryId);

		return ResponseEntity.ok(response);
	}

	@ApiOperation("Get Contracts Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
			@ApiResponse(code = 400, message = "Malformed request"),
			@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/secretary/get-contracts")
	public ResponseEntity<List<ContractDto>> getContracts(@RequestBody Integer stdId) {
		List<ContractDto> contracts = secretaryService.getContracts(stdId);

		return ResponseEntity.ok(contracts);
	}

	@ApiOperation("Add Contract Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
			@ApiResponse(code = 400, message = "Malformed request"),
			@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/secretary/add-contract")
	public ResponseEntity<ContractDto> addFaculty(@RequestBody ContractDto contract,
			PreAuthenticatedAuthenticationToken auth) {
		String adminId = ((UserPrincipal) auth.getPrincipal()).getClaims().get("preferred_username").toString();
		ContractDto contractDto = secretaryService.addContract(contract, adminId);

		return ResponseEntity.ok(contractDto);
	}

	@ApiOperation("Update Contract Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
			@ApiResponse(code = 400, message = "Malformed request"),
			@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/secretary/update-contract")
	public ResponseEntity<String> updateContract(@RequestBody ContractDto contract,
			PreAuthenticatedAuthenticationToken auth) {
		String adminId = ((UserPrincipal) auth.getPrincipal()).getClaims().get("preferred_username").toString();
		String response = secretaryService.updateContract(contract, adminId);

		return ResponseEntity.ok(response);
	}

	@ApiOperation("Delete Contract Method")
	@ApiResponses({ @ApiResponse(code = 200, message = "Successful"),
			@ApiResponse(code = 400, message = "Malformed request"),
			@ApiResponse(code = 500, message = "Internal error") })
	@PostMapping("/secretary/delete-contract")
	public ResponseEntity<String> deleteContract(@RequestBody Integer ctrId) {
		String response = secretaryService.deleteContract(ctrId);

		return ResponseEntity.ok(response);
	}
}
