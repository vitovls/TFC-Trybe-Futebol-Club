const reqBodys = {
  validLogin: {
    email: 'admin@admin.com',
    password: 'secret_admin'
  },
  noEmail: {
    password: 'abcd@1234'
  },
  errorMail1: {
    email: 'teste',
    password: 'abcd@1234'
  },
  errorMail2: {
    email: 'teste@teste',
    password: 'abcd@1234'
  },
  errorMail3: {
    email: 'teste@.com',
    password: 'abcd@1234'
  },
  noPassword: {
    email: 'teste@teste.com',
  },
  errorPassword: {
    email: 'teste@teste.com',
    password: '123'
  }
}

export const { validLogin, noEmail,
  noPassword, errorMail1,
  errorMail2, errorMail3,
  errorPassword } = reqBodys
