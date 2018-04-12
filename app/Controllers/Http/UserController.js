'use strict'
const User = use('App/Models/User')
const { validate } = use('Validator')
class UserController {
  async show({view,params}){
    const userDoc = await User.findBy('id',params.id)
    const user =userDoc.toJSON()
    return view.render('users.show',{user})
  }

  async edit({view,params}){
    const userDoc = await User.findBy('id',params.id)
    const user =userDoc.toJSON()
    return view.render('users.edit',{user})
  }
  async update({request,session,response}){
    const rules = {
      name: 'required|min:3',
      introduction: 'min:3'
    }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }
  }
}

module.exports = UserController
