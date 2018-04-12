'use strict'
const { validate } = use('Validator')
const User = use('App/Models/User')
class RegisterController {
  async showRegistrationForm({view,auth,response}) {
    try{
      await auth.check()
      return response.redirect('/')
    }
    catch (error){
      return view.render('auth.register')
    }
  }

  async register({request, response, session,auth}) {
    let {name,email,password} = request.all()
    const rules = {
      name: 'required|max:50|unique:users',
      email: 'required|email|unique:users|max:255',
      password: 'required|confirmed|min:6'
    }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      session
          .withErrors(validation.messages())
          .flashAll()
      return response.redirect('back')
    }
    const createResult=await User.create({name,email,password})
    if(createResult){
      const user = auth.user
      await auth.remember(true).attempt(email,password)
      return response.route('/',{user})
    }
  }


}

module.exports = RegisterController
