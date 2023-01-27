import { screen } from "@testing-library/dom";
import NewBillUI from "../views/NewBillUI.js";
import NewBill, { getExtension } from "../containers/NewBill.js";
import { fireEvent } from "@testing-library/dom";
import { localStorageMock } from "../__mocks__/localStorage.js";

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then ...", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      //to-do write assertion
    });
  });
  describe("When I create a new bill and upload a file", () => {
    test("Then it should check the fileformat", () => {
      const fileExtension = getExtension("testfile.jpeg");
      expect(fileExtension).toBe("jpeg");
    });
  });
  describe("When I create a new bill", () => {
    test("Then it should create a new file", () => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const firestore = null;
      const html = NewBillUI();
      document.body.innerHTML = html;
      const formInput = screen.queryByTestId("form-new-bill");
      expect(formInput).toBeTruthy();

      const testBill = new NewBill({
        document,
        onNavigate,
        firestore,
        localStorage: window.localStorage,
      });

      const testFile = screen.queryByTestId("file");
      expect(testFile).toBeTruthy();

      console.log(testBill, " Hey");

      const handleChangeFile = jest.fn((e) => testBill.handleChangeFile(e));
      testFile.addEventListener("change", handleChangeFile);

      fireEvent.change(testFile);

      expect(handleChangeFile).toHaveBeenCalled();

      function getMockInput(mockId) {
        let mockHtml = `<input data-testid=${mockId}></input>`
        mockHtml.value = "ABCDF"
        return mockHtml
    }
      ;

      

      // const handleSubmitFile = jest.fn(() => testBill.handleSubmit(mockEvent));
      // testFile.addEventListener("submit", handleSubmitFile);

      

      // console.log(mockEvent);
      // fireEvent.submit(testFile);

      // expect(handleSubmitFile).toHaveBeenCalled();
    });
  });
  describe("When I'm submitting a bill", () => {
    test("Then the handleSubmit Function should be called", () => {
      const inputData = {
        id: "47qAXb6fIm2zOKkLzMro",
        vat: "80",
        fileUrl: "https://firebasestorage.googleapis.com/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
        status: "pending",
        type: "Hôtel et logement",
        commentary: "séminaire billed",
        name: "encore",
        fileName: "preview-facture-free-201801-pdf-1.jpg",
        date: "2004-04-04",
        amount: 400,
        commentAdmin: "ok",
        email: "a@a",
        pct: 20
      }

      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const firestore = null;
      jest.mockEvent
     
      const formInput = screen.queryByTestId("form-new-bill");
      expect(formInput).toBeTruthy();

      const testBill = new NewBill({
        document,
        onNavigate,
        firestore,
        localStorage: window.localStorage,
      });
      const html = NewBillUI()
      document.body.innerHTML = html

      const inputExpenseType = screen.getByTestId("expense-type")
      fireEvent.change(inputExpenseType, { target: { value: inputData.type } })
      //const btnSubmit = document.querySelector(`form[data-testid="form-new-bill"]`)
      const handleSubmit = jest.fn(formInput.handleSubmit)
      formInput.addEventListener("submit", handleSubmit)
      fireEvent.submit(formInput)
      expect(handleSubmit).toHaveBeenCalled()
      expect(inputExpenseType.value).toBe(inputData.type)
      
      //screen.getAllByTestId("btn-send-bill").click()


    });
  });
});
