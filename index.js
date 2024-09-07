const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";
$(document).ready(async function () {
  const currencyResponse = await fetch(`${BASE_URL}/currencies.min.json`);
  const body = await currencyResponse.json();
  console.log(typeof body);
  Object.keys(body).forEach(key => {
    if (!!body[key]) {
      $('select[name=currencyToSelect], select[name=currencyFromSelect]').append($('<option>', {
        value: key,
        text: body[key]
      }));
    }
  });

  $('#exchange').submit(async function(e) {
    e.preventDefault();
    const currencyFrom = $('select[name=currencyFromSelect]').val();
    const currencyTo = $('select[name=currencyToSelect]').val();
    const res = await fetch(`${BASE_URL}/currencies/${currencyFrom}.min.json`);
    const body = await res.json();
    const rate = body[currencyFrom][currencyTo];
    const currencyFromValue = parseFloat($('input[name=currencyFrom]').val());

    $('input[name=currencyTo]').val((Math.round(currencyFromValue * rate * 100) / 100).toFixed(2));
  });

  $('.swap-currency').click(function(e) {
    const currencyFrom = $('select[name=currencyFromSelect]').val();
    const currencyTo = $('select[name=currencyToSelect]').val();
    const currencyToValue = parseFloat($('input[name=currencyTo]').val());
    
    $('select[name=currencyFromSelect]').val(currencyTo);
    $('select[name=currencyToSelect]').val(currencyFrom);
    $('input[name=currencyFrom]').val(currencyToValue);

    $('#exchange').submit();
  });
});