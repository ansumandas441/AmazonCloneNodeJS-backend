config = require('../config');
// Assumes you've already included Stripe.js!
const stripe = Stripe(config.stripePublicKey);
const myForm = document.querySelector('.my-form');
myForm.addEventListener('submit', handleForm);

async function handleForm(event) {
  console.log("TOKENX happened 1");
  event.preventDefault();

  const accountResult = await stripe.createToken('account', {
    business_type: 'company',
    company: {
      name: document.querySelector('.inp-company-name').value,
      address: {
        line1: document.querySelector('.inp-company-street-address1').value,
        city: document.querySelector('.inp-company-city').value,
        state: document.querySelector('.inp-company-state').value,
        postal_code: document.querySelector('.inp-company-zip').value,
      },
    },
    tos_shown_and_accepted: true,
  });

  const personResult = await stripe.createToken('person', {
    person: {
      first_name: document.querySelector('.inp-person-first-name').value,
      last_name: document.querySelector('.inp-person-last-name').value,
      address: {
        line1: document.querySelector('.inp-person-street-address1').value,
        city: document.querySelector('.inp-person-city').value,
        state: document.querySelector('.inp-person-state').value,
        postal_code: document.querySelector('.inp-person-zip').value,
      },
    },
  });

  if (accountResult.token && personResult.token) {
    console.log("TOKENX happened");
    document.querySelector('#token-account').value = accountResult.token.id;
    document.querySelector('#token-person').value = personResult.token.id;
    myForm.submit();
  }
}
