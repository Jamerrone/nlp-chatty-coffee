const chat = document.getElementById('chat')
const form = document.getElementById('form')
const input = document.getElementById('input')
const state = document.getElementById('state')
const response = document.getElementById('response')
const langSelector = document.getElementById('lang-selector')

const appState = {
  language: 'en',
  hasRequestedSize: false,
  currentDrink: {},
  order: { drinks: [], price: 0 }
}

const prices = {
  caffeAmericano: { short: 2.25, tall: 2.45, grande: 2.95 },
  caffèLatte: { short: 2.95, tall: 3.65, grande: 4.15 },
  caffèMocha: { short: 3.45, tall: 4.15, grande: 4.65 },
  cappuccino: { short: 3.15, tall: 3.25, grande: 3.95 },
  caramelMacchiato: { short: 3.75, tall: 4.45, grande: 4.75 },
  espresso: { short: 1.95, tall: 2.25, grande: 2.65 },
  espressoConPanna: { short: 1.95, tall: 2.25, grande: 2.65 },
  espressoMacchiato: { short: 1.95, tall: 2.25, grande: 2.65 },
  whiteChocolateMocha: { short: 3.75, tall: 4.45, grande: 4.75 }
}

function calculateTotalOrderPrice() {
  return parseFloat(
    appState.order.drinks.reduce((price, drink) => price + drink.price, 0).toFixed(2)
  )
}

function resetState() {
  appState.hasRequestedSize = false
  appState.currentDrink = {}
  appState.order = { drinks: [], price: 0 }
}

function calculateDrinkPrice({ name, size, amount }) {
  const price = prices[name][size] * amount
  return Math.round(price * 100) / 100
}

function postMessage(message, isResponse = true) {
  const li = document.createElement('li')
  isResponse && li.classList.add('left')
  li.innerHTML = message
  chat.appendChild(li)
}

function generateOrderStatusMessage() {
  let message = ''

  if (appState.language === 'en') {
    message = 'Here is what I have for your order.<br>'
    appState.order.drinks.forEach(d => (message += `<br>- ${d.amount}x ${d.size} ${d.name}`))
    message += `<br><br>For a total of: $${appState.order.price}`
    message += `<button>Place order</button>`
  } else if (appState.language === 'nl') {
    message = 'Hier is wat ik heb voor uw bestelling.<br>'
    appState.order.drinks.forEach(d => (message += `<br>- ${d.amount}x ${d.size} ${d.name}`))
    message += `<br><br>Voor een totaal van: $${appState.order.price}`
    message += `<button>Plaats bestelling</button>`
  }

  return message
}

function addDrinkToOrder(drink) {
  appState.currentDrink = {}
  appState.order.drinks.push(drink)
  appState.order.price = calculateTotalOrderPrice()
  postMessage(generateOrderStatusMessage())
}

form.addEventListener('submit', e => {
  e.preventDefault()

  if (input.value) {
    postMessage(input.value, false)
    fetch(`/.netlify/functions/api?lang=${appState.language}&message=${encodeURI(input.value)}`)
      .then(response => response.json())
      .then(json => {
        if (json.intent === 'Order.Reset') {
          resetState()
          postMessage(json.answer)
        } else if (json.intent === 'Order.Size' && appState.hasRequestedSize) {
          const drink = appState.currentDrink
          const { resolution, option } = json.entities.find(entity => entity.entity === 'size')

          drink.size = resolution ? resolution.value : option

          if (drink.name && drink.size && drink.amount) {
            drink.price = calculateDrinkPrice(drink)
          }

          appState.hasRequestedSize = false
          addDrinkToOrder(drink)
        } else if (json.intent === 'Order') {
          const drink = { name: '', size: '', amount: 1, price: 0 }

          json.entities.forEach(({ entity, resolution, option }) => {
            const value = resolution ? resolution.value : option

            switch (entity) {
              case 'drink':
                drink.name = value
                break
              case 'number':
                drink.amount = value
                break
              case 'size':
                drink.size = value
                break
            }

            if (drink.name && drink.size && drink.amount) {
              drink.price = calculateDrinkPrice(drink)
            }
          })

          if (drink.size !== '') {
            appState.hasRequestedSize = false
            addDrinkToOrder(drink)
          } else {
            appState.hasRequestedSize = true
            appState.currentDrink = drink
            if (appState.language === 'en') {
              postMessage(`What size "${drink.name}" would you like?`)
            } else if (appState.language === 'nl') {
              postMessage(`Welke maat "${drink.name}" wilt u?`)
            }
          }
        } else {
          postMessage(json.answer)
        }

        chat.scroll({
          top: chat.scrollHeight - chat.clientHeight,
          behavior: 'smooth'
        })
        state.textContent = JSON.stringify(appState, null, 2)
        response.textContent = JSON.stringify(json, null, 2)
      })

    input.value = ''
  }
})

function changeLanguage() {
  resetState()
  chat.innerHTML = ''
  appState.language = langSelector.value
  state.textContent = JSON.stringify(appState, null, 2)
  appState.language === 'en'
    ? postMessage(`Welcome to <strong>Coffee Bot</strong>, how can I help you?`)
    : postMessage(`Welkom bij <strong>Coffee Bot</strong>, hoe kan ik u helpen?`)
}

langSelector.addEventListener('change', changeLanguage)

changeLanguage()
