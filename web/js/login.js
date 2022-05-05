import axios from 'axios'

window.onload = () => {
  document.querySelector('#registar').onclick = () => {
    window.location.href = "localhost:5500/views/register.html"
  }
  document.querySelector('#login').onclick = () => {
    const userData = {
      account: document.querySelector('#account').value,
      pwd: document.querySelector('#pwd').value
    }
    axios.post()
  }
}