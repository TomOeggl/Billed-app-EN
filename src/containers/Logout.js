import { ROUTES_PATH } from '../constants/routes.js'

export default class Logout {
  constructor({ document, onNavigate, localStorage }) {
    
    this.document = document
    this.onNavigate = onNavigate
    this.localStorage = localStorage
    $('#layout-disconnect').click(this.handleClick)
  }
  
  handleClick = (e) => {
    
    this.localStorage.clear()
    //console.log(this.localStorage)
    this.onNavigate(ROUTES_PATH['Login'])
    console.log('clicked on logout')
  }
} 