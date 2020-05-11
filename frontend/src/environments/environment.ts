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
  getFaculties: 'http://localhost:8080/student-portal/admin/get-faculties',
  getDepartments: 'http://localhost:8080/student-portal/admin/get-departments',
  getSeries: 'http://localhost:8080/student-portal/admin/get-series',
  getGroups: 'http://localhost:8080/student-portal/admin/get-groups',
  getStudents: 'http://localhost:8080/student-portal/admin/get-students',
};
