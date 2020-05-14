import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CertificateModalDialogComponent } from "./certificate-modal-dialog.component";

describe("ModalDialogComponent", () => {
  let component: CertificateModalDialogComponent;
  let fixture: ComponentFixture<CertificateModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateModalDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
