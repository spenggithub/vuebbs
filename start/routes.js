'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/','PagesController.root')
Route.group(()=>{
  Route.get('login', 'LoginController.showLoginForm').as('login')
  Route.post('login', 'LoginController.login')
  Route.post('logout', 'LoginController.logout').as('logout')
  Route.get('register', 'RegisterController.showRegistrationForm').as('register');
  Route.post('register', 'RegisterController.register')
}).namespace('Auth')
