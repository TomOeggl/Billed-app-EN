import { ROUTES_PATH } from '../constants/routes.js'
import { formatDate, formatStatus } from "../app/format.js"
import Logout from "./Logout.js"
import firebase from '../__mocks__/firebase.js'

//import { bills } from "../fixtures/bills.js"

export default class {
  constructor({ document, onNavigate, firestore, localStorage }) {
    this.document = document
    this.onNavigate = onNavigate
    this.firestore = firestore
    const buttonNewBill = document.querySelector(`button[data-testid="btn-new-bill"]`)
    if (buttonNewBill) buttonNewBill.addEventListener('click', this.handleClickNewBill)
    const iconEye = document.querySelectorAll(`div[data-testid="icon-eye"]`)
    if (iconEye) iconEye.forEach(icon => {
      icon.addEventListener('click', (e) => this.handleClickIconEye(icon))
    })
    new Logout({ document, localStorage, onNavigate })
    //const dummyData = bills
    //console.log(dummyData)
  }

  handleClickNewBill = e => {
    this.onNavigate(ROUTES_PATH['NewBill'])
  }

  handleClickIconEye = (icon) => {
    const billUrl = icon.getAttribute("data-bill-url")
    const imgWidth = Math.floor($('#modaleFile').width() * 0.5)
    $('#modaleFile').find(".modal-body").html(`<div style='text-align: center;'><img width=${imgWidth} src=${billUrl} /></div>`)
    $('#modaleFile').modal('show')
  }

  // no need to cover this function by tests
  getBills = () => {
    const userEmail = localStorage.getItem('user') ?
      JSON.parse(localStorage.getItem('user')).email : ""
    if (this.firestore) {
      return this.firestore
      .bills()
      .get()
      .then(snapshot => {
        
        const bills = snapshot.docs
          .map(doc => {
            try {
              //let ogDate = parseInt(doc.data().date.replace('-','').replace('-', ''))
              //console.log(doc.data().date)
              return {
                ...doc.data(),
                ogDate: parseInt(doc.data().date.replace('-','').replace('-', '')),
                date: formatDate(doc.data().date),
                status: formatStatus(doc.data().status)
                //ogDate: ogDate
              }
            } catch(e) {
              // if for some reason, corrupted data was introduced, we manage here failing formatDate function
              // log the error and return unformatted date in that case
              console.log(e,'for',doc.data())
              return {
                ...doc.data(),
                date: doc.data().date,
                status: formatStatus(doc.data().status)
              }
            }
          })
          .filter(bill => bill.email === userEmail)


          const billsBuffer = bills
          console.log(billsBuffer)
          // for (var i = 0; i < billsBuffer.length; i++){
          //   billsBuffer[i].ogDate = parseInt(billsBuffer[i].date.replace('-','').replace('-', ''))
            
          // }


          console.log('length', bills.length)
          console.log(billsBuffer)


          const bills2 = billsBuffer.sort((a, b) => a.ogDate - b.ogDate)
          console.log(bills2)
        return bills2
      })
      .catch(error => error)
    }
  }
}
