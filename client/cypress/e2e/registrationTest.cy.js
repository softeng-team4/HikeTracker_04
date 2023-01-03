describe('signin path', () => {
  it('should visit', () => {
    cy.visit('/signup');
  })
})

describe('registration form render', () => {
  it('should get form to register user', () => {
    cy.visit('/signup');
    cy.get('form');
  })
})

describe('can fill all the fields', () => {
  it('should change all the text fields', () => {
    cy.visit('/signup');
    cy.get('input[id=email]').type('test').should('have.value', 'test');
    cy.get('input[id=password]').type('test').should('have.value', 'test');
    cy.get('input[id=confirm_password]').type('test').should('have.value', 'test');
    cy.get('input[id=firstName]').type('test').should('have.value', 'test');
    cy.get('input[id=lastName]').type('test').should('have.value', 'test');
    cy.get('input[id=username]').type('test').should('have.value', 'test');
    cy.get('input[id=phoneNumber]').type('test').should('have.value', 'test');
  })
})

describe('can select all roles', () => {
  it('should select all available roles', () => {
    cy.visit('/signup');
    cy.get('select[id=role]').select('Local guide').should('have.value', 'Local guide');
    cy.get('select[id=role]').select('Hiker').should('have.value', 'Hiker');
    cy.get('select[id=role]').select('Hut worker').should('have.value', 'Hut worker');
    cy.get('.searchHutBtn').click()
    cy.get('.closeBtn').click()
  })
})


describe('email field empty', () => {
  it('should compare an alert', () => {
    cy.visit('/signup');
    cy.get('input[id=password]').type('notSoSafePassword1!');
    cy.get('input[id=confirm_password]').type('notSoSafePassword1!');
    cy.get('input[id=firstName]').type('John');
    cy.get('input[id=lastName]').type('Doe');
    cy.get('input[id=username]').type("john_doe");
    cy.get('input[id=phoneNumber]').type('1234567890');
    cy.get('form').submit();
    cy.get(':nth-child(1) > .invalid-feedback').contains('Invalid email address.');
  })
})

describe('wrong email typed', () => {
  it('should compare an alert', () => {
    cy.visit('/signup');
    cy.get('input[id=email]').type('john.doe#polito.it');
    cy.get('input[id=password]').type('notSoSafePassword1!');
    cy.get('input[id=confirm_password]').type('notSoSafePassword1!');
    cy.get('input[id=firstName]').type('John');
    cy.get('input[id=lastName]').type('Doe');
    cy.get('input[id=username]').type("john_doe");
    cy.get('input[id=phoneNumber]').type('1234567890');
    cy.get('form').submit();
    cy.get(':nth-child(1) > .invalid-feedback').contains('Invalid email address.');
  })
})

describe('password field empty', () => {
  it('should compare an alert', () => {
    cy.visit('/signup');
    cy.get('input[id=email]').type('john.doe@polito.it');
    cy.get('input[id=confirm_password]').type('notSoSafePassword1!');
    cy.get('input[id=firstName]').type('John');
    cy.get('input[id=lastName]').type('Doe');
    cy.get('input[id=username]').type("john_doe");
    cy.get('input[id=phoneNumber]').type('1234567890');
    cy.get('form').submit();
    cy.get(':nth-child(3) > .invalid-feedback').contains('Passwords do not match.');
  })
})


describe('password less than 6 chars', () => {
  it('should compare an alert', () => {
    cy.visit('/signup');
    cy.get('input[id=email]').type('john.doe@polito.it');
    cy.get('input[id=password]').type('jhon');
    cy.get('input[id=confirm_password]').type('jhon');
    cy.get('input[id=firstName]').type('John');
    cy.get('input[id=lastName]').type('Doe');
    cy.get('input[id=username]').type("john_doe");
    cy.get('input[id=phoneNumber]').type('1234567890');
    cy.get('form').submit();
    cy.get(':nth-child(2) > .invalid-feedback').contains('Password must be at least six character long');
  })
})


describe('first name field empty', () => {
  it('should compare an alert', () => {
    cy.visit('/signup');
    cy.get('input[id=email]').type('john.doe@polito.it');
    cy.get('input[id=password]').type('notSoSafePassword1!');
    cy.get('input[id=confirm_password]').type('notSoSafePassword1!');
    cy.get('input[id=lastName]').type('Doe');
    cy.get('input[id=username]').type("john_doe");
    cy.get('input[id=phoneNumber]').type('1234567890');
    cy.get('form').submit();
    cy.get(':nth-child(5) > .invalid-feedback').contains('First name cannot be empty.');
  })
})

describe('last name field empty', () => {
  it('should compare an alert', () => {
    cy.visit('/signup');
    cy.get('input[id=email]').type('john.doe@polito.it');
    cy.get('input[id=password]').type('notSoSafePassword1!');
    cy.get('input[id=confirm_password]').type('notSoSafePassword1!');
    cy.get('input[id=firstName]').type('John');    
    cy.get('input[id=username]').type("john_doe");
    cy.get('input[id=phoneNumber]').type('1234567890');
    cy.get('form').submit();
    cy.get(':nth-child(6) > .invalid-feedback').contains('Last name cannot be empty.');
  })
})

describe('username field empty', () => {
  it('should compare an alert', () => {
    cy.visit('/signup');
    cy.get('input[id=email]').type('john.doe@polito.it');
    cy.get('input[id=password]').type('notSoSafePassword1!');
    cy.get('input[id=confirm_password]').type('notSoSafePassword1!');
    cy.get('input[id=firstName]').type('John');    
    cy.get('input[id=lastName]').type("Doe");
    cy.get('input[id=phoneNumber]').type('1234567890');
    cy.get('form').submit();
    cy.get(':nth-child(4) > .invalid-feedback').contains('Username cannot be empty.');
  })
})

describe('telephone field empty', () => {
  it('should compare an alert', () => {
    cy.visit('/signup');
    cy.get('input[id=email]').type('john.doe@polito.it');
    cy.get('input[id=password]').type('notSoSafePassword1!');
    cy.get('input[id=confirm_password]').type('notSoSafePassword1!');
    cy.get('input[id=firstName]').type('John');    
    cy.get('input[id=lastName]').type("Doe");
    cy.get('input[id=username]').type('john_doe');
    cy.get('form').submit();
    cy.get(':nth-child(7) > .invalid-feedback').contains('Invalid phone number.');
  })
})

describe('wrong telephone typed', () => {
  it('should compare an alert', () => {
    cy.visit('/signup');
    cy.get('input[id=email]').type('john.doe@polito.it');
    cy.get('input[id=password]').type('notSoSafePassword1!');
    cy.get('input[id=confirm_password]').type('notSoSafePassword1!');
    cy.get('input[id=firstName]').type('John');    
    cy.get('input[id=lastName]').type("Doe");
    cy.get('input[id=username]').type('john_doe');
    cy.get('input[id=phoneNumber]').type('123456');
    cy.get('form').submit();
    cy.get(':nth-child(7) > .invalid-feedback').contains('Invalid phone number.');
  })
})

describe('sign up with a hut worker', () => {
  it('should select a hut', () => {
    cy.visit('/signup');
    cy.get('input[id=email]').type('john.doe@polito.it');
    cy.get('input[id=password]').type('notSoSafePassword1!');
    cy.get('input[id=confirm_password]').type('notSoSafePassword1!');
    cy.get('input[id=firstName]').type('John');    
    cy.get('input[id=lastName]').type("Doe");
    cy.get('input[id=username]').type('john_doe');
    cy.get('input[id=phoneNumber]').type('1234567890');
    cy.get('select[id=role]').select('Hut worker').should('have.value', 'Hut worker');
    cy.get('.searchHutBtn').click()
    cy.contains('Name')
    cy.contains('Phone')
    cy.contains('Email')
    cy.contains('Latitude')
    cy.contains('Longitude')
    cy.contains('Altitude')
    cy.contains('Country')
    cy.contains('Region')
    cy.contains('City')
    cy.contains('Website')
    cy.contains('Description')
    cy.get(':nth-child(4) > .card > .card-footer').contains('Select hut').click()
    cy.contains('Name')
    cy.contains('Phone')
    cy.contains('Email')
    cy.contains('Latitude')
    cy.contains('Longitude')
    cy.contains('Altitude')
    cy.contains('Country')
    cy.contains('Region')
    cy.contains('City')
    cy.contains('Website')
    cy.contains('Description')
    cy.contains('Sign Up').click()
  })
})

describe('login path', () => {
  it('should visit', () => {
    cy.visit('/login');
  })
})

describe('login form render', () => {
  it('should get form to login user', () => {
    cy.visit('/login');
    cy.get('form');
  })
})

describe('can fill all the login fields', () => {
  it('should compare an alert', () => {
    cy.visit('/login');
    cy.get('input[id=username]').type('test').should('have.value', 'test');
    cy.get('input[id=password]').type('test').should('have.value', 'test');
  })
})

describe('login email field empty', () => {
  it('should compare an alert', () => {
    cy.visit('/login');
    cy.get('input[id=password]').type('notSoSafePassword1!');
    cy.get('form').submit();
    cy.get('div[role=alert]').contains('Invalid email address.');
  })
})

describe('login wrong email typed', () => {
  it('should compare an alert', () => {
    cy.visit('/login');
    cy.get('input[id=username]').type('john.doe#polito.it');
    cy.get('input[id=password]').type('notSoSafePassword1!');
    cy.get('form').submit();
    cy.get('div[role=alert]').contains('Invalid email address.');
  })
})

describe('login password field empty', () => {
  it('should compare an alert', () => {
    cy.visit('/login');
    cy.get('input[id=username]').type('john.doe@polito.it');
    cy.get('form').submit();
    cy.get('div[role=alert]').contains('Email cannot be empty and password must be at least six character long.');
  })
})

describe('login password less than 6 chars', () => {
  it('should compare an alert', () => {
    cy.visit('/login');
    cy.get('input[id=username]').type('john.doe@polito.it');
    cy.get('input[id=password]').type('jhon');
    cy.get('form').submit();
    cy.get('div[role=alert]').contains('Email cannot be empty and password must be at least six character long.');
  })
})

describe('correct login', () => {
  it('should login the user and render the home', () => {
    cy.visit('/login');
    cy.get('input[id=username]').type('gianmarcobell95@gmail.com');
    cy.get('input[id=password]').type('password123');
    cy.get('form').submit();
    cy.get('h2').contains('Explore Hike');
    cy.get('button').contains('GIANMARCO');
    cy.logout()
  })
})