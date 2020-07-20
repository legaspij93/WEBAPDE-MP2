// const mongoose = require('mongoose')
// const user = require('../models/user')
// const userData = {firstName : "Steven", lastName : "Adams", region: "America", password: "secret", email: "stevenA@mail.com"}

// describe('Register Test', () => {
//     describe('When all forms filled', () => {
//         beforeAll(async() =>{
//             await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, userCreateIndex: true}, (err)=>{
//                 if(err){
//                     console.error(err);
//                     process.exit(1);
//                 }
//             });
//         });

//          it('Register success', async () => {
//             const validUser = new user(userData)
//             const savedUser = await validUser.save()
            
//             expect(savedUser._id).toBeDefined();
//             expect(savedUser.firstName).toBe(userData.firstName);
//             expect(savedUser.lastName).toBe(userData.lastName);
//             expect(savedUser.region).toBe(userData.region);
//             expect(savedUser.password).toBe(userData.password);
//             expect(savedUser.email).toBe(userData.email);
//          });
//     }); 
//  });