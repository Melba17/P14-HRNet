const mockEmployees = [
  {
    "firstName": "Jennifer",
    "lastName": "Mancuzo",
    "dateOfBirth": "1990-06-12",
    "startDate": "2018-01-24",
    "street": "159 Abbey Street",
    "city": "Hartford",
    "state": "CT",
    "zipCode": "6112",
    "department": "Legal"
  },
  {
    "firstName": "Mark",
    "lastName": "Mendeles",
    "dateOfBirth": "1970-06-12",
    "startDate": "2014-02-16",
    "street": "159 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "department": "Sales"
  },
  {
    "firstName": "Amanda",
    "lastName": "Ficher",
    "dateOfBirth": "1977-06-12",
    "startDate": "2008-01-24",
    "street": "15 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "department": "Legal"
  },
  {
    "firstName": "Stephen",
    "lastName": "King",
    "dateOfBirth": "1947-09-21",
    "startDate": "1962-04-25",
    "street": "5th Alberta Street",
    "city": "Portland",
    "state": "ME",
    "zipCode": "4101",
    "department": "Engineering"
  },
  {
    "firstName": "Mickey",
    "lastName": "Mouse",
    "dateOfBirth": "1928-05-15",
    "startDate": "1925-02-01",
    "street": "500 South Buena Vista Street",
    "city": "Burbank",
    "state": "CA",
    "zipCode": "91501",
    "department": "Human Resources"
  },
  {
    "firstName": "Sigourney",
    "lastName": "Weaver",
    "dateOfBirth": "1949-10-08",
    "startDate": "1995-02-09",
    "street": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "department": "Marketing"
  },
  {
    "firstName": "Tony",
    "lastName": "Parker",
    "dateOfBirth": "1982-05-17",
    "startDate": "2002-06-14",
    "street": "12 Victoria Road",
    "city": "San Antonio",
    "state": "TX",
    "zipCode": "78201",
    "department": "Sales"
  },
  {
    "firstName": "Georges",
    "lastName": "Clooney",
    "dateOfBirth": "1961-05-06",
    "startDate": "1985-11-14",
    "street": "2500 East Van Buren Street",
    "city": "Phoenix",
    "state": "AZ",
    "zipCode": "85008",
    "department": "Human Resources"
  },
  {
    "firstName": "Hannah",
    "lastName": "Hawkins",
    "dateOfBirth": "1965-02-18",
    "startDate": "2008-05-03",
    "street": "714 Blue Hills Avenue",
    "city": "Hartford",
    "state": "CT",
    "zipCode": "6112",
    "department": "Engineering"
  },
  {
    "firstName": "Rose",
    "lastName": "Gordon",
    "dateOfBirth": "1975-12-30",
    "startDate": "2014-08-20",
    "street": "168;174 Scranton Street",
    "city": "New Haven",
    "state": "CT",
    "zipCode": "6511",
    "department": "Marketing"
  },
  {
    "firstName": "Jerome",
    "lastName": "Kim",
    "dateOfBirth": "1979-09-09",
    "startDate": "2020-04-08",
    "street": "2233 North Hoyne Avenue",
    "city": "Chicago",
    "state": "IL",
    "zipCode": "606447",
    "department": "Legal"
  },
  {
    "firstName": "Jason",
    "lastName": "Mitchelle",
    "dateOfBirth": "1983-01-22",
    "startDate": "2016-12-16",
    "street": "1565 South 8th Street",
    "city": "Missoula",
    "state": "MT",
    "zipCode": "59801",
    "department": "Human Resources"
  },
  {
    "firstName": "Larry",
    "lastName": "Peters",
    "dateOfBirth": "1967-04-02",
    "startDate": "1985-03-01",
    "street": "1 Drexel Drive",
    "city": "New-Orleans",
    "state": "LA",
    "zipCode": "70135",
    "department": "Marketing"
  },
  {
    "firstName": "Priscilla",
    "lastName": "Richards",
    "dateOfBirth": "1977-05-12",
    "startDate": "2018-10-16",
    "street": "2460 South Main Street",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90007",
    "department": "Engineering"
  },
  {
    "firstName": "Tony",
    "lastName": "Franklin",
    "dateOfBirth": "1979-07-29",
    "startDate": "2005-06-22",
    "street": "4413 South 12th Street",
    "city": "Phoenix",
    "state": "AZ",
    "zipCode": "85008",
    "department": "Sales"
  },
  {
    "firstName": "Monica",
    "lastName": "Welch",
    "dateOfBirth": "1980-11-07",
    "startDate": "1999-03-26",
    "street": "3001 Southwest 39th Street",
    "city": "Des Moines",
    "state": "IA",
    "zipCode": "50321",
    "department": "Sales"
  },
  {
    "firstName": "Arnold",
    "lastName": "Schwarzenegger",
    "dateOfBirth": "1947-07-30",
    "startDate": "1980-10-02",
    "street": "Hollywood Hills",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90068",
    "department": "Engineering"
  },
  {
    "firstName": "Ella",
    "lastName": "Fitzgerald",
    "dateOfBirth": "1962-06-05",
    "startDate": "1991-08-18",
    "street": "1600 Pennsylvania Avenue NW",
    "city": "Washington",
    "state": "DC",
    "zipCode": "20500",
    "department": "Marketing"
  },
  {
    "firstName": "ZZ",
    "lastName": "Top",
    "dateOfBirth": "1949-12-16",
    "startDate": "2008-11-04",
    "street": "245 South Main Street",
    "city": "Houston",
    "state": "TX",
    "zipCode": "78201",
    "department": "Marketing"
  },
  {
    "firstName": "Riley",
    "lastName": "Richardson",
    "dateOfBirth": "1957-05-25",
    "startDate": "1992-08-23",
    "street": "506 West 8th Street",
    "city": "Austin",
    "state": "TX",
    "zipCode": "78701",
    "department": "Engineering"
  },
  {
    "firstName": "Barak",
    "lastName": "Obama",
    "dateOfBirth": "1961-08-04",
    "startDate": "2008-11-04",
    "street": "1600 Pennsylvania Avenue NW",
    "city": "Washington",
    "state": "DC",
    "zipCode": "20500",
    "department": "Sales"
  },
  {
    "firstName": "Dwayne",
    "lastName": "Torres",
    "dateOfBirth": "1957-03-10",
    "startDate": "1990-09-11",
    "street": "1052 Cardinal Road",
    "city": "Virginia Beach",
    "state": "VA",
    "zipCode": "23451",
    "department": "Legal"
  }
];

export default mockEmployees;