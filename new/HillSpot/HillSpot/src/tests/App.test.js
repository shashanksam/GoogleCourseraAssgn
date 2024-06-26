import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App'
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import RoomBooking from '../components/RoomBooking';

describe("Testing routes", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("TCR1 : Testing routing for /", () => {
    expect(screen.getByText("Wanna enjoy your holiday trip to the fullest !!!")
    ).toBeInTheDocument();
  });

  test("TCR2- Testing Routing for Nav link", async () => {
    const navLink = screen.getByTestId("navLink1");
    expect(navLink).toHaveTextContent("Hillspot Palace");
  })
});

describe("Testing loading message until Location component gets rerender", () => {
    beforeEach(() => {
      render(<App />);
    });
  test("TCR3- testing loading message until Location component gets rerender", async () => {
    const errorMessage = screen.getByText("Loading...");
    expect(errorMessage).toBeInTheDocument();
  });
});

describe("Testing RoomBooking component - customer name field", () => {
  beforeEach(() => {
    render(<RoomBooking />);
  });

  test("TCCN1 : testing initial value for name input field", async () => {
    const nameInput = screen.getAllByTestId("customerName-input")[0];    
    expect(nameInput).toHaveAttribute("value");
    expect(nameInput.value).toBe("");
  });

  test("TCCN2 : testing value for name field once user enter some value", async () => {
    const nameInput = screen.getByTestId("customerName-input");
    expect(nameInput).toHaveAttribute("value");
    fireEvent.change(nameInput, { target: { value: "TestingName" } });
    expect(nameInput.value).toBe("TestingName");
  });

  test("TCCN3 : testing errorMessage for empty name input field", async () => {
    const nameInput = screen.getByTestId("customerName-input");
    fireEvent.change(nameInput, { target: { value: "TestingName" } });
    fireEvent.change(nameInput, { target: { value: "" } });
    const nameError = screen.getByTestId("customerNameError");
    expect(nameError).toHaveTextContent("Field is required");
  });

  test("TCCN4 : testing errorMessage for invalid name input field", async () => {
    const nameInput = screen.getByTestId("customerName-input");
    fireEvent.change(nameInput, { target: { value: "Ab" } });
    const nameError = screen.getByTestId("customerNameError");
    expect(nameError).toHaveTextContent("Name should have at least 3 alphabets");
  });

  test("TCCN5 : testing errorMessage for invalid name input field", async () => {
    const nameInput = screen.getByTestId("customerName-input");
    fireEvent.change(nameInput, { target: { value: "1234" } });
    const nameError = screen.getByTestId("customerNameError");
    expect(nameError).toHaveTextContent("Name should have only alphabets");
  });

  test("TCCN6 : testing NO errorMessage for valid name input field", async () => {
    const nameInput = screen.getByTestId("customerName-input");
    expect(nameInput).toHaveAttribute("value");
    fireEvent.change(nameInput, { target: { value: "TestingName" } });
    const nameError = screen.getByTestId("customerNameError");
    expect(nameError).toHaveTextContent("");
  });
});

describe("Testing RoomBooking component - no of people field", () => {
  beforeEach(() => {
    render(<RoomBooking />);
  });  
  test("TCNP1 : testing initial value for noOfPeople input field", async () => {
    const noOfPeopleInput = screen.getAllByTestId("noOfPeople-input")[0];
    expect(noOfPeopleInput).toHaveAttribute("value");
    expect(noOfPeopleInput.value).toBe("");
  });

  test("TCNP2 : testing value for noOfPeople field once user enter some value", async () => {
    const noOfPeopleInput = screen.getByTestId("noOfPeople-input");
    expect(noOfPeopleInput).toHaveAttribute("value");
    fireEvent.change(noOfPeopleInput, { target: { value: "4" } });
    expect(noOfPeopleInput.value).toBe("4");
  });

  test("TCNP3 : testing errorMessage for empty noOfPeople input field", async () => {
    const noOfPeopleInput = screen.getByTestId("noOfPeople-input");
    fireEvent.change(noOfPeopleInput, { target: { value: "4" } });
    fireEvent.change(noOfPeopleInput, { target: { value: "" } });
    const validationError = screen.getByTestId("noOfPeopleError");
    expect(validationError).toHaveTextContent("Field is required");
  });

  test("TCNP4 : testing errorMessage for invalid noOfPeople input field", async () => {
    const noOfPeopleInput = screen.getByTestId("noOfPeople-input");
    fireEvent.change(noOfPeopleInput, { target: { value: "-1" } });
    const validationError = screen.getByTestId("noOfPeopleError");
    expect(validationError).toHaveTextContent("Number of people should be greater than 0");
  });

  test("TCNP5 : testing errorMessage for invalid noOfPeople input field", async () => {
    const noOfPeopleInput = screen.getByTestId("noOfPeople-input");
    fireEvent.change(noOfPeopleInput, { target: { value: "5" } });
    const validationError = screen.getByTestId("noOfPeopleError");
    expect(validationError).toHaveTextContent("Number of people should not be more than 4");
  });

  test("TCNP6 : testing NO errorMessage for valid noOfPeople input field", async () => {
    const noOfPeopleInput = screen.getByTestId("noOfPeople-input");
    expect(noOfPeopleInput).toHaveAttribute("value");
    fireEvent.change(noOfPeopleInput, { target: { value: "3" } });
    const validationError = screen.getByTestId("noOfPeopleError");
    expect(validationError).toHaveTextContent("");
  });
});

describe("Testing RoomBooking component - visit date field", () => {
  beforeEach(() => {
    render(<RoomBooking />);
  });
  //testing visit date input field
  test("TCVD1 : testing initial value for visit date input field", async () => {
    const vdInput = screen.getAllByTestId("visitDate-input")[0];
    expect(vdInput).toHaveAttribute("value");
    expect(vdInput.value).toBe("");
  });

  test("TCVD2 : testing value for visit date field once user select some date value", async () => {
    const vdInput = screen.getByTestId("visitDate-input");
    expect(vdInput).toHaveAttribute("value");
    fireEvent.change(vdInput, { target: { value: "2050-12-31" } });
    expect(vdInput.value).toBe("2050-12-31");
  });

  test("TCVD3 : testing errorMessage for empty visit date input field", async () => {
    const vdInput = screen.getByTestId("visitDate-input");
    fireEvent.change(vdInput, { target: { value: "2050-12-31" } });
    fireEvent.change(vdInput, { target: { value: "" } });
    const validationError = screen.getByTestId("visitDateError");
    expect(validationError).toHaveTextContent("Field is required");
  });

  test("TCVD4 : testing errorMessage for invalid visit date input field", async () => {
    const vdInput = screen.getByTestId("visitDate-input");
    fireEvent.change(vdInput, { target: { value: "2020-12-31" } });
    const validationError = screen.getByTestId("visitDateError");
    expect(validationError).toHaveTextContent("Date of visit should not be past date");
  });

  test("TCVD5 : testing NO errorMessage for valid visit date input field", async () => {
    const vdInput = screen.getByTestId("visitDate-input");
    expect(vdInput).toHaveAttribute("value");
    fireEvent.change(vdInput, { target: { value: "2050-12-31" } });
    const validationError = screen.getByTestId("visitDateError");
    expect(validationError).toHaveTextContent("");
  });
});

describe("Testing RoomBooking component - phone number field", () => {
  beforeEach(() => {
    render(<RoomBooking />);
  });

  test("TCPN1 : testing initial value for phone number input field", async () => {
    const pnInput = screen.getAllByTestId("phoneNumber-input")[0];
    expect(pnInput).toHaveAttribute("value");
    expect(pnInput.value).toBe("");
  });

  test("TCPN2 : testing value for phone number field once user enter some value", async () => {
    const pnInput = screen.getByTestId("phoneNumber-input");
    expect(pnInput).toHaveAttribute("value");
    fireEvent.change(pnInput, { target: { value: "1234567890" } });
    expect(pnInput.value).toBe("1234567890");
  });

  test("TCPN3 : testing errorMessage for empty phone number input field", async () => {
    const pnInput = screen.getByTestId("phoneNumber-input");
    fireEvent.change(pnInput, { target: { value: "1234567890" } });
    fireEvent.change(pnInput, { target: { value: "" } });
    const validationError = screen.getByTestId("phoneNumberError");
    expect(validationError).toHaveTextContent("Field is required");
  });

  test("TCPN4 : testing errorMessage for invalid phone number input field", async () => {
    const pnInput = screen.getByTestId("phoneNumber-input");
    fireEvent.change(pnInput, { target: { value: "12345" } });
    const validationError = screen.getByTestId("phoneNumberError");
    expect(validationError).toHaveTextContent("Phone number should be of 10 digits");
  });

  test("TCPN5 : testing NO errorMessage for valid phone number input field", async () => {
    const pnInput = screen.getByTestId("phoneNumber-input");
    expect(pnInput).toHaveAttribute("value");
    fireEvent.change(pnInput, { target: { value: "1234567890" } });
    const validationError = screen.getByTestId("phoneNumberError");
    expect(validationError).toHaveTextContent("");
  });
});

describe("Testing RoomBooking component - Book Visit button", () => {
  beforeEach(() => {
    render(<RoomBooking />);
  });
  
  test("TCSB1- Checking Book Visit button and its text is exist or not", async () => {
    const bookingButton = screen.getByTestId("bookingBtn");
    expect(bookingButton).toHaveTextContent("Book Visit");
  });

  test('TCSB2- Checking Book Visit button is disabled by default', () => {
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('TCSB3- Checking Book Visit button is disabled when form is invalid', () => {
    const cName = screen.getByTestId("customerName-input");
    fireEvent.change(cName, { target: { value: "Tom Joseph" } });
    const button = screen.getByTestId("bookingBtn");
    expect(button).toBeDisabled();
  });

  test('TCSB4- Checking Book Visit button is enabled when form is valid', () => {
    expect(screen.getByRole('button')).toBeDisabled();
    const cName = screen.getByTestId("customerName-input");
    fireEvent.change(cName, { target: { value: "CustName" } });
    const noOfPeopleInput = screen.getByTestId("noOfPeople-input");
    fireEvent.change(noOfPeopleInput, { target: { value: "4" } });
    const vdInput = screen.getByTestId("visitDate-input");
    fireEvent.change(vdInput, { target: { value: "2050-12-31" } });
    const pnInput = screen.getByTestId("phoneNumber-input");
    fireEvent.change(pnInput, { target: { value: "1234567890" } });
    const button = screen.getByTestId("bookingBtn");
    expect(button).toBeEnabled();
  });
})


describe("Display Locations using axios GET request with correct API", () => {
  const server = setupServer(
    rest.get("http://localhost:4000/locationsCollection", (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: "L1001",
            locationName: "Ootacamund,Tamil Nadu",
            locationImagePath: "/assets/ooty.jpg"
          },
          {
            id: "L1002",
            locationName: "Kodaikanal,Tamil Nadu",
            locationImagePath: "/assets/kodaikanal.jpg"
          },
          {
            id: "L1003",
            locationName: "Yercaud,Tamil Nadu",
            locationImagePath: "/assets/yercaud.jpeg"
          },
          {
            id: "L1004",
            locationName: "Munnar,Kerala",
            locationImagePath: "/assets/munnar.jpg"
          }
        ])
      );
    })
  );  
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("TCAxiosG1- Checking axios GET request showing location name", async () => {  
    render(<App />);
    let locationName = await screen.findByText("Ootacamund,Tamil Nadu");
    expect(locationName).toBeInTheDocument();
  });

  it("TCAxiosG2- Checking axios GET request showing button on location card", async () => {    
    render(<App />);
    let btn1 = await screen.findByTestId("visitBtnL1001");
    expect(btn1).toBeInTheDocument();
  });

  it("TCAxiosG3- Checking axios GET request showing location image", async () => {  
    render(<App />);  
    const imagePath1 = await screen.findByTestId("imageL1001");
    expect(imagePath1.src).toBe("http://localhost/assets/ooty.jpg");
  })

  it("TCAxiosG4- Checking axios GET request showing location image with height", async () => {    
    render(<App />);
    const imageTag1 = await screen.findByTestId("imageL1001");
    expect(imageTag1).toHaveStyle('height: 200px');
  })

  it("TCAxiosG5- Checking axios GET request for className of location image", async () => {
    render(<App />);
    const imageTag1 = await screen.findByTestId("imageL1001");
    expect(imageTag1).toHaveClass('card-img-top');    
  });  

  it("TCAxiosG6- Checking axios GET request showing all locations", async () => {    
    render(<App />);
    let locationName1 = await screen.findByText("Ootacamund,Tamil Nadu");
    let locationName2 = await screen.findByText("Kodaikanal,Tamil Nadu");
    let locationName3 = await screen.findByText("Yercaud,Tamil Nadu");
    let locationName4 = await screen.findByText("Munnar,Kerala");
    expect(locationName1).toBeInTheDocument();
    expect(locationName2).toBeInTheDocument();
    expect(locationName3).toBeInTheDocument();
    expect(locationName4).toBeInTheDocument();
  });
});


describe("Testing route params", () => {
  test("TCAxiosG7-  routing to /roomBooking/:locationName", async () => {
    const server = setupServer(
      rest.get("http://localhost:4000/locationsCollection", (req, res, ctx) => {
        return res(
          ctx.json([
            {
              id: "L1001",
              locationName: "Ootacamund,Tamil Nadu",
              locationImagePath: "/assets/ooty.jpg"
            },
            {
              id: "L1002",
              locationName: "Kodaikanal,Tamil Nadu",
              locationImagePath: "/assets/kodaikanal.jpg"
            }
          ])
        );
      })
    );
    server.listen();
    render(<App />);
    let visitButton = await screen.findByTestId("visitBtnL1001");
    fireEvent.click(visitButton);
    const formHeading = screen.getByText(/Ootacamund,Tamil Nadu/i);
    expect(formHeading).toBeInTheDocument();
    server.close();
  });
});


describe("Room Booking using axios POST request", () => {
  beforeEach(() => {
    render(<RoomBooking />);
  });

  test("TCAxiosP1- testing success message after form submission", async () => {
    const server = setupServer(
      rest.post("http://localhost:4000/bookingsCollection/", (req, res, ctx) => {
        return res(ctx.json({ message: "making mock request with correct API" }));
      })
    );
    server.listen();
    fireEvent.change(screen.getByTestId("customerName-input"), { target: { value: "Tom" } });
    fireEvent.change(screen.getByTestId("noOfPeople-input"), { target: { value: "3" } });
    fireEvent.change(screen.getByTestId("visitDate-input"), { target: { value: "01/01/2025" } });
    fireEvent.change(screen.getByTestId("phoneNumber-input"), { target: { value: "1234567890" } });
    let form = screen.getByTestId("bookingBtn");
    fireEvent.submit(form);
    const successMessage = await screen.findByText("Your visit is successfully booked for");
    await waitFor(() => {
      expect(successMessage).toBeInTheDocument();
    });
    server.close();
  });

  test("TCAxiosP2- testing success message after form submission with CSS", async () => {
    const server = setupServer(
      rest.post("http://localhost:4000/bookingsCollection/", (req, res, ctx) => {
        return res(ctx.json({ message: "making mock request with correct API" }));
      })
    );
    server.listen();
    fireEvent.change(screen.getByTestId("customerName-input"), { target: { value: "Tom" } });
    fireEvent.change(screen.getByTestId("noOfPeople-input"), { target: { value: "3" } });
    fireEvent.change(screen.getByTestId("visitDate-input"), { target: { value: "01/01/2025" } });
    fireEvent.change(screen.getByTestId("phoneNumber-input"), { target: { value: "1234567890" } });
    let form = screen.getByTestId("bookingBtn");
    fireEvent.submit(form);
    const successMessage = await screen.findByText("Your visit is successfully booked for");
    await waitFor(() => {
      expect(successMessage).toHaveClass('text-success');
    });
    server.close();
  });
});