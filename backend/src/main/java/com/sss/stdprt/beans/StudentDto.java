package com.sss.stdprt.beans;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentDto {
	private Integer stdId;
    private String firstName;
    private String lastName;
    private String userName;
    private String fatherInitial;
    private String cnp;
    private String phoneNumber;
    private String email;
    private GroupDto group;
    private Integer studyYear;
    private List<ContractDto> contractList;
}
