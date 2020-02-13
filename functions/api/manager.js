const { NlpManager } = require('node-nlp')
const manager = new NlpManager({ threshold: 0.85, languages: ['en', 'nl'] })

manager.addNamedEntityText(
  'size',
  'grande',
  ['en', 'nl'],
  ['Grande', 'Large', 'Triple', 'Grote', 'Groot']
)
manager.addNamedEntityText(
  'size',
  'short',
  ['en', 'nl'],
  ['Short', 'Small', 'Single', 'Kleine', 'Klein']
)
manager.addNamedEntityText(
  'size',
  'tall',
  ['en', 'nl'],
  ['Tall', 'Medium', 'Double']
)

manager.addNamedEntityText(
  'drink',
  'caffeAmericano',
  ['en', 'nl'],
  ['Caffè Americano', 'Caffè Americanos', 'Americano', 'Americanos']
)
manager.addNamedEntityText(
  'drink',
  'caffèLatte',
  ['en', 'nl'],
  ['Caffè Latte', 'Caffè Lattes', 'Latte', 'Lattes']
)
manager.addNamedEntityText(
  'drink',
  'caffèMocha',
  ['en', 'nl'],
  ['Caffè Mocha', 'Caffè Mochas', 'Mocha', 'Mochas']
)
manager.addNamedEntityText(
  'drink',
  'cappuccino',
  ['en', 'nl'],
  ['Cappuccino', 'Cappuccinos']
)
manager.addNamedEntityText(
  'drink',
  'caramelMacchiato',
  ['en', 'nl'],
  ['Caramel Macchiato', 'Caramel Macchiatos']
)
manager.addNamedEntityText(
  'drink',
  'espresso',
  ['en', 'nl'],
  ['Espresso', 'Espressos']
)
manager.addNamedEntityText(
  'drink',
  'espressoConPanna',
  ['en', 'nl'],
  ['Espresso Con Panna', 'Espressos Con Panna']
)
manager.addNamedEntityText(
  'drink',
  'espressoMacchiato',
  ['en', 'nl'],
  ['Espresso Macchiato', 'Espresso Macchiatos', 'Macchiato', 'Macchiatos']
)
manager.addNamedEntityText(
  'drink',
  'whiteChocolateMocha',
  ['en', 'nl'],
  ['White Chocolate Mocha', 'White Chocolate Mochas']
)

manager.addDocument('en', '%drink%.', 'Order')
manager.addDocument('en', '%size% %drink%.', 'Order')
manager.addDocument('en', 'And %number% %drink%.', 'Order')
manager.addDocument('en', 'And %number% %size% %drink%.', 'Order')
manager.addDocument('en', 'Can I get a %drink% please?', 'Order')
manager.addDocument('en', 'Can I get a %size% %drink% please?', 'Order')
manager.addDocument('en', 'Can I order a %drink% please?', 'Order')
manager.addDocument('en', 'Can I order a %size% %drink% please?', 'Order')
manager.addDocument('en', 'Finally %number% %drink%.', 'Order')
manager.addDocument('en', 'Finally %number% %size% %drink%.', 'Order')
manager.addDocument('en', 'Give me a %drink%.', 'Order')
manager.addDocument('en', 'Give me a %size% %drink%.', 'Order')
manager.addDocument('en', 'I want a %drink%.', 'Order')
manager.addDocument('en', 'I want a %size% %drink%.', 'Order')
manager.addDocument('en', 'Lastly %number% %drink%.', 'Order')
manager.addDocument('en', 'Lastly %number% %size% %drink%.', 'Order')
manager.addDocument('en', '%number% %drink%.', 'Order')
manager.addDocument('en', '%number% %size% %drink%.', 'Order')
manager.addDocument('nl', '%drink%.', 'Order')
manager.addDocument('nl', '%size% %drink%.', 'Order')
manager.addDocument('nl', '%number% %drink%.', 'Order')
manager.addDocument('nl', '%number% %size% %drink%.', 'Order')
manager.addDocument('nl', 'En %number% %drink%.', 'Order')
manager.addDocument('nl', 'En %number% %size% %drink%.', 'Order')
manager.addDocument('nl', 'En tot slot %number% %drink%.', 'Order')
manager.addDocument('nl', 'En tot slot %number% %size% %drink%.', 'Order')
manager.addDocument('nl', 'Geef me %number% %drink%.', 'Order')
manager.addDocument('nl', 'Geef me %number% %size% %drink%.', 'Order')
manager.addDocument('nl', 'Ik wil %number% %drink%.', 'Order')
manager.addDocument('nl', 'Ik wil %number% %size% %drink%.', 'Order')
manager.addDocument('nl', 'Kan ik alstublieft één %drink% krijgen?', 'Order')
manager.addDocument('nl', 'Kan ik %number% %drink% bestellen?', 'Order')
manager.addDocument('nl', 'Kan ik %number% %size% %drink% bestellen?', 'Order')
manager.addDocument('nl', 'Mag ik %number% %size% %drink%?', 'Order')
manager.addDocument('nl', 'Ten slotte %number% %drink%.', 'Order')
manager.addDocument('nl', 'Ten slotte %number% %size% %drink%.', 'Order')

manager.addDocument('en', '%size%', 'Order.Size')
manager.addDocument('en', 'A %size% one.', 'Order.Size')
manager.addDocument('nl', '%size%', 'Order.Size')
manager.addDocument('nl', 'Een %size%.', 'Order.Size')
manager.addAnswer(
  'en',
  'Order.Size',
  'Sorry, I could not understand, please rephrase your previous message.'
)
manager.addAnswer(
  'nl',
  'Order.Size',
  'Sorry, ik kon het niet begrijpen, herformuleer je vorige bericht.'
)

manager.addDocument('en', 'Clear order.', 'Order.Reset')
manager.addDocument('en', 'Reset.', 'Order.Reset')
manager.addDocument('en', 'Restart.', 'Order.Reset')
manager.addDocument('en', 'Start over.', 'Order.Reset')
manager.addDocument('nl', 'Begin opnieuw.', 'Order.Reset')
manager.addDocument('nl', 'Bestelling wissen.', 'Order.Reset')
manager.addDocument('nl', 'Herstarten.', 'Order.Reset')
manager.addDocument('nl', 'Reset.', 'Order.Reset')
manager.addAnswer(
  'en',
  'Order.Reset',
  "Let's start over. What would you like to order?"
)
manager.addAnswer(
  'nl',
  'Order.Reset',
  'Laten we opnieuw beginnen. Wat zou u willen bestellen?'
)

manager.addAnswer(
  'en',
  'None',
  'Sorry, I could not understand, please rephrase your previous message.'
)
manager.addAnswer(
  'nl',
  'None',
  'Sorry, ik kon het niet begrijpen, herformuleer je vorige bericht.'
)

module.exports = manager
