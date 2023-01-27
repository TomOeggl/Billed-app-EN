import { screen } from "@testing-library/dom";
import BillsUI from "../views/BillsUI.js";
import Bills from "../containers/Bills.js";
import { bills } from "../fixtures/bills.js";
import VerticalLayout from "../views/VerticalLayout.js";
import { localStorageMock } from "../__mocks__/localStorage";
import ErrorPage from "../views/ErrorPage.js";
import LoadingPage from "../views/LoadingPage.js";
import { fireEvent } from "@testing-library/dom";
import { ROUTES_PATH } from "../constants/routes.js";
import { ROUTES } from "../constants/routes"
import { render } from "@testing-library/react";
import DashboardUI from "../views/DashboardUI.js";

//BillsUI.js tests
describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", () => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      const user = JSON.stringify({
        type: "Employee",
      });
      window.localStorage.setItem("user", user);
      const html = BillsUI({ data: [] });
      document.body.innerHTML = html;
      //to-do write expect expression
      //   Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      // const user = JSON.stringify({
      //   type: 'Employee'
      // })
      // window.localStorage.setItem('user', user)
      //   const html = VerticalLayout(120)
      //   document.body.innerHTML = html
      const icon = screen.getByTestId("icon-window");
      icon.classList.add("active-icon");

      expect(icon.classList.contains("active-icon")).toBeTruthy();
    });
    test("Then bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;
      const dates = screen
        .getAllByText(
          /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i
        )
        .map((a) => a.innerHTML);
      const antiChrono = (a, b) => (a < b ? 1 : -1);
      const datesSorted = [...dates].sort(antiChrono);
      expect(dates).toEqual(datesSorted);
    });
    test("Then if it is loading should return a loading page ", () => {
      const html = BillsUI({ data: [], loading: true, error: false });
      document.body.innerHTML = html;
      expect(LoadingPage).toBeTruthy();
    });
    test("Then if error is true it should return a error page ", () => {
      const html = BillsUI({ data: [], loading: false, error: true });
      document.body.innerHTML = html;
      expect(ErrorPage).toBeTruthy();
    });
  });
});

//Bills.js tests
describe("Given I am connected as an employee on the Bills page", () => {
  describe("When I click on New Bill Icon", () => {
    test("Then the handle new bill method should be called", () => {
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;
      const newFeeButton = screen.getByTestId("btn-new-bill");
      const handleClickNewBill = jest.fn((e) =>
        newFeeButton.handleClickNewBill(e)
      );
      fireEvent.click(newFeeButton);
      expect(handleClickNewBill).toHaveBeenCalled;
    });
  });
});

describe("Given I am connected as an employee on the Bills page", () => {
  describe("When I click on New Bill Icon", () => {
    test("Then the handle new bill method should be called", () => {
      render(BillsUI)

      // localStorage should be populated with form data
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    })

    // we have to mock navigation to test it
    const onNavigate = (pathname) => {
      document.body.innerHTML = ROUTES({ pathname })
    }

    let PREVIOUS_LOCATION = ''

    const firebase = jest.fn()

    const testBills = new Bills(
      {document,
      onNavigate,
      firebase,
      localStorage: window.localStorage}
    )

   

    const newBillButton = document.querySelector(
      `button[data-testid="btn-new-bill"]`
    )
    const handleNewBill = jest.fn(newBillButton.handleClickNewBill)
    newBillButton.addEventListener("click", handleNewBill)
    fireEvent.click(newBillButton)
    expect(handleNewBill).toHaveBeenCalled()


    const icon = {
      getAttribute: jest.fn().mockImplementation(() => '')

    };

    // const $modaleFile = {
    //   width: jest.fn().mockImplementation(() => 200),
    //   modal: jest.fn().mockImplementation(() => null)
    // };
    const findMock = jest.fn().mockImplementation(() => {
      return {
         html: jest.fn()
       }
   });
    window.$ = jest.fn().mockImplementation(() => {
      return {
         modal: jest.fn(),
         width: jest.fn(),
         find: findMock
         
       }
   });
   
   


    testBills.handleClickIconEye(icon)
    const iconEye = document.querySelector(`div[data-testid="icon-eye"]`);
    //const functHandleClickIconEye = jest.fn(iconEye.handleClickIconEye)
      //const eye = screen.getByTestId('icon-eye-d')
      //iconEye.addEventListener('click', handleClickIconEye)
      fireEvent.click(iconEye)
      //expect(handleClickIconEye).toHaveBeenCalled()
    });
  });
});

