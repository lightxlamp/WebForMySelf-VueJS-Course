function printUser({email, password}){
    console.log('email: ', email)
    console.log('password:', password)
}

const userObj = {
    email: 'test@gmail.com',
    password: '123456'
}

printUser(userObj)

const userObj2MixedParams = {
    password: 'abcdfg',
    email: 'wow@gmail.com'
}

printUser(userObj2MixedParams)

const userObj3WrongParams = {
    name: 'Stas',
    age: '30'
}

printUser(userObj3WrongParams)