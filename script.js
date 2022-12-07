'strict mode'

const beforeButton = document.querySelector('#before')
const afterButton = document.querySelector('#after')
const chooseDateDiv = document.querySelector('#chooseDate')
const signUpButton = document.querySelector('#signup')
const loginUsername = document.querySelector('#loginUsername')
const loginPassword = document.querySelector('#loginPassword')
const signupUsername = document.querySelector('#signupUsername')
const signupPassword = document.querySelector('#signupPassword')
const logOutButton = document.querySelector('#logout')
const mainPageButton = document.querySelector('#mainpage')
const lotteryButton = document.getElementById('cekilis')
const resultMessage = document.getElementById('result')

function createUser(e) {
  var users = JSON.parse(localStorage.getItem('users') || '[]')
  e.preventDefault()
  if (
    signupUsername.value.length > 4 &&
    signupPassword.value.length > 4 &&
    signupPassword.value === document.querySelector('#confirm').value
  ) {
    if (users.find((account) => account.username === signupUsername.value)) {
      alert('Böyle bir kullanıcı ismi zaten var!')
    } else {
      ;(function () {
        let user = {
          username: signupUsername.value,
          password: signupPassword.value,
        }
        users.push(user)
        // Saving
        localStorage.setItem('users', JSON.stringify(users))
        console.log(JSON.parse(localStorage.getItem('users')))
      })()
    }
  } else {
    alert(
      'Lütfen en 5 karakterden oluşan kullanıcı adı ve şifre giriniz ve şifrelerin uyuştuğundan emin olunuz'
    )
  }
}

function lottery() {
  let i
  var users = JSON.parse(localStorage.getItem('users') || '[]')
  function randomize() {
    i = Math.floor(
      Math.random() * JSON.parse(localStorage.getItem('users')).length
    )
  }
  randomize()
  let drawnUser = users[i]
  let currentUsername = sessionStorage.getItem('username')
  if (sessionStorage.getItem('drew')) {
    return alert('Siz çekiliş hakkınızı halihazırda kullanmışsınız')
  } else if (
    drawnUser['username'] !== currentUsername &&
    !drawnUser['drawnBy']
  ) {
    drawnUser.drawnBy = currentUsername
    const currentUserIndex = users.findIndex((object) => {
      return object.username === currentUsername
    })
    users[currentUserIndex].drew = drawnUser.username
    sessionStorage.setItem('drew', 'yes')
    localStorage.setItem('users', JSON.stringify(users))
    hideButton()
    resultMessage.textContent = `Kura sonucu çıkan isim: \n ${drawnUser.username}`
    console.log(JSON.parse(localStorage.getItem('users')))
  } else {
    alert('Lütfen bir daha deneyin')
  }
}
function getInfo(e) {
  e.preventDefault()
  const username = loginUsername.value
  const password = loginPassword.value
  for (i = 0; i < JSON.parse(localStorage.getItem('users')).length; i++) {
    if (
      username === JSON.parse(localStorage.getItem('users'))[i].username &&
      password === JSON.parse(localStorage.getItem('users'))[i].password
    ) {
      sessionStorage.setItem('username', username)
      sessionStorage.setItem('password', password)
      JSON.parse(localStorage.getItem('users'))[i].drew
        ? sessionStorage.setItem('drew', 'yes')
        : ''
      if (window.location.pathname.split('/').pop() === 'login.html') {
        window.location.href = 'bekle.html'
      } else if (
        window.location.pathname.split('/').pop() === 'loginWithoutSignup.html'
      ) {
        window.location.href = 'kura.html'
      }
    }
  }
}
function hideButton() {
  lotteryButton.classList.add('form--hidden')
}
function goToLogin() {
  window.location.href = 'login.html'
}
function goToSignup() {
  window.location.href = 'signup.html'
}
function goToLoginWithoutSignupLink() {
  window.location.href = 'loginWithoutSignup.html'
}
function goToIndex() {
  window.location.href = 'index.html'
}

logOutButton.addEventListener('click', function () {
  delete sessionStorage.username
  delete sessionStorage.password
  delete sessionStorage.drew
  window.location.href = 'index.html'
})
