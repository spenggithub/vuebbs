'use strict'
const { validate } = use('Validator')
const User = use('App/Models/User')
const Hash = use('Hash')
class LoginController {
  showLoginForm({view,auth,response}){
    if(!auth.check()){
      return response.redirect('/')
    }
    else {
      return view.render('auth/login')

    }
  }
  async login({request,session,response,auth,view}){
    const rules = {
      email:'required|email',
      password:'required|min:3'
    }
    const {email,password} = request.all()
    const validation = await validate(request.all(),rules)
    if(validation.fails()){
      session.withErrors(validation.messages())
          .flashExcept(['password'])
      return response.redirect('back')
    }
    const loginResult = await auth.remember(true).attempt(email,password)
    if(loginResult)
    {
      const user = auth.user
      return response.route('/',{user})
    }
    else {
      response.unauthorized('Invalid credentails')
    }
  }

  async logout({response,auth}){
    await auth.logout()
    return response.redirect('/')
  }
}

module.exports = LoginController
