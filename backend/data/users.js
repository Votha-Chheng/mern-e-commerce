import bcrypt from 'bcryptjs'

const users = [
  {
    nom : 'administrateur',
    prénom : 'administrateur',
    email: 'administrateur@example.com',
    motDePasse : bcrypt.hashSync('123456', 10),
    isAdmin: true,
    validationEmail : true,
  },
  {
    nom : 'John',
    prénom : 'Doe',
    email: 'john@example.com',
    motDePasse : bcrypt.hashSync('123456', 10),
    validationEmail : true,
  },
  {
    nom : 'Jane',
    prénom : 'Doe',
    email: 'jane@example.com',
    motDePasse : bcrypt.hashSync('123456', 10),
  }
] 

export default users