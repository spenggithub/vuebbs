'use strict'

class PageController {
  root({view})
  {
    return view.render('pages/root')
  }
}

module.exports = PageController
