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
    cy.get('input[id=username]').type('test').should('have.value', 'test');
    cy.get('input[id=password]').type('test').should('have.value', 'test');
    cy.get('input[id=confirm_password]').type('test').should('have.value', 'test');
    cy.get('input[id=firstName]').type('test').should('have.value', 'test');
    cy.get('input[id=lastName]').type('test').should('have.value', 'test');
  })
})

describe('can select all roles', () => {
  it('should select all available roles', () => {
    cy.visit('/signup');
    cy.get('select[id=role]').select('Local guide').should('have.value', 'Local guide');
    cy.get('select[id=role]').select('Hiker').should('have.value', 'Hiker');
  })
})

describe('email field empty', () => {
  it('should compare an alert', () => {
    cy.visit('/signup');
    cy.get('input[id=password]').type('notSoSafePassword1!');
    cy.get('input[id=confirm_password]').type('notSoSafePassword1!');
    cy.get('input[id=firstName]').type('John');
    cy.get('input[id=lastName]').type('Doe');
    cy.get('form').submit();
    cy.get('div[role=alert]').contains('Invalid email address.');
  })
})

describe('wrong email typed', () => {
  it('should compare an alert', () => {
    cy.visit('/signup');
    cy.get('input[id=username]').type('john.doe#polito.it');
    cy.get('input[id=password]').type('notSoSafePassword1!');
    cy.get('input[id=confirm_password]').type('notSoSafePassword1!');
    cy.get('input[id=firstName]').type('John');
    cy.get('input[id=lastName]').type('Doe');
    cy.get('form').submit();
    cy.get('div[role=alert]').contains('Invalid email address.');
  })
})

describe('password field empty', () => {
  it('should compare an alert', () => {
    cy.visit('/signup');
    cy.get('input[id=username]').type('john.doe@polito.it');
    cy.get('input[id=confirm_password]').type('notSoSafePassword1!');
    cy.get('input[id=firstName]').type('John');
    cy.get('input[id=lastName]').type('Doe');
    cy.get('form').submit();
    cy.get('div[role=alert]').contains('Passwords do not match.');
  })
})

describe('password less than 6 chars', () => {
  it('should compare an alert', () => {
    cy.visit('/signup');
    cy.get('input[id=username]').type('john.doe@polito.it');
    cy.get('input[id=password]').type('jhon');
    cy.get('input[id=confirm_password]').type('jhon');
    cy.get('input[id=firstName]').type('John');
    cy.get('input[id=lastName]').type('Doe');
    cy.get('form').submit();
    cy.get('div[role=alert]').contains('Email cannot be empty and password must be at least six character long.');
  })
})

describe('first name field empty', () => {
  it('should compare an alert', () => {
    cy.visit('/signup');
    cy.get('input[id=username]').type('john.doe@polito.it');
    cy.get('input[id=password]').type('notSoSafePassword1!');
    cy.get('input[id=confirm_password]').type('notSoSafePassword1!');
    cy.get('input[id=lastName]').type('Doe');
    cy.get('form').submit();
    cy.get('div[role=alert]').contains('First name cannot be empty.');
  })
})

describe('last name field empty', () => {
  it('should compare an alert', () => {
    cy.visit('/signup');
    cy.get('input[id=username]').type('john.doe@polito.it');
    cy.get('input[id=password]').type('notSoSafePassword1!');
    cy.get('input[id=confirm_password]').type('notSoSafePassword1!');
    cy.get('input[id=firstName]').type('John');
    cy.get('form').submit();
    cy.get('div[role=alert]').contains('Last name cannot be empty.');
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