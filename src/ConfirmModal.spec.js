import ConfirmModal from "./ConfirmModal";

describe("ConfirmModal", () => {
  let modalCmpt;

  beforeEach(() => {
    modalCmpt = new ConfirmModal({});
  });

  it("should have a basic component", () => {
    expect(modalCmpt).toBeDefined();
  });

  describe("_buttons method", () => {
    it("should set default values", () => {
      modalCmpt._buttons();
      expect(modalCmpt.buttons.cancel).toBeTruthy();
    });

    it("should set cancel value", () => {
      modalCmpt._buttons({ cancel: false });
      expect(modalCmpt.buttons.cancel).toBeFalsy();
    });

    it("should set proceed value", () => {
      modalCmpt._buttons({ proceed: false });
      expect(modalCmpt.buttons.proceed).toBeFalsy();
    });
  });

  describe("_prompt method", () => {
    it("should set default values", () => {
      modalCmpt._prompt();
      expect(modalCmpt.prompt.enabled).toBeFalsy();
    });

    it("should set enabled value", () => {
      modalCmpt._prompt({ enabled: true });
      expect(modalCmpt.prompt.enabled).toBeTruthy();
    });

    it("should set required value", () => {
      modalCmpt._prompt({ required: true });
      expect(modalCmpt.prompt.required).toBeTruthy();
    });
  });

});
