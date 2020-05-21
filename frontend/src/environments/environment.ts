// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  baseHref: '/',
  addFaculty: 'http://localhost:8080/student-portal/admin/add-faculty',
  addDepartment: 'http://localhost:8080/student-portal/admin/add-department',
  addSeries: 'http://localhost:8080/student-portal/admin/add-series',
  addGroup: 'http://localhost:8080/student-portal/admin/add-group',
  addStudent: 'http://localhost:8080/student-portal/admin/add-student',
  addCourse: 'http://localhost:8080/student-portal/admin/add-course',
  addContract: 'http://localhost:8080/student-portal/secretary/add-contract',

  getFaculties: 'http://localhost:8080/student-portal/admin/get-faculties',
  getDepartments: 'http://localhost:8080/student-portal/admin/get-departments',
  getSeries: 'http://localhost:8080/student-portal/admin/get-series',
  getGroups: 'http://localhost:8080/student-portal/admin/get-groups',
  getStudents: 'http://localhost:8080/student-portal/admin/get-students',
  getCourses: 'http://localhost:8080/student-portal/admin/get-courses',
  getContracts: 'http://localhost:8080/student-portal/secretary/get-contracts',

  updateFaculty: 'http://localhost:8080/student-portal/admin/update-faculty',
  updateDepartment: 'http://localhost:8080/student-portal/admin/update-department',
  updateSeries: 'http://localhost:8080/student-portal/admin/update-series',
  updateGroup: 'http://localhost:8080/student-portal/admin/update-group',
  updateStudent: 'http://localhost:8080/student-portal/admin/update-student',
  updateCourse: 'http://localhost:8080/student-portal/admin/update-course',
  updateContract: 'http://localhost:8080/student-portal/secretary/update-contract',

  deleteFaculty: 'http://localhost:8080/student-portal/admin/delete-faculty',
  deleteDepartment: 'http://localhost:8080/student-portal/admin/delete-department',
  deleteSeries: 'http://localhost:8080/student-portal/admin/delete-series',
  deleteGroup: 'http://localhost:8080/student-portal/admin/delete-group',
  deleteStudent: 'http://localhost:8080/student-portal/admin/delete-student',
  deleteCourse: 'http://localhost:8080/student-portal/admin/delete-course',
  deleteContract: 'http://localhost:8080/student-portal/secretary/delete-contract',

  getCertificates: 'http://localhost:8080/student-portal/secretary/get-certificates',
  acceptCertificate: 'http://localhost:8080/student-portal/secretary/accept-certificate',
  rejectCertificate: 'http://localhost:8080/student-portal/secretary/reject-certificate',
};
