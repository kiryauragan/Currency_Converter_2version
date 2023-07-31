document.addEventListener("DOMContentLoaded", function () {
  const exchangeRateElement = document.getElementById("exchangeRate");
  const getExchangeRateButton = document.getElementById("getExchangeRate");

  getExchangeRateButton.addEventListener("click", function () {
    fetch(
      "https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,GBP,UAH,PLN,CAD"
    )
      .then((response) => response.json())
      .then((data) => {
        const exchangeRates = data.rates;

        const selectedToCurrency =
          document.querySelector(".amount-to select").value;
        exchangeRateElement.textContent = `1 USD = ${exchangeRates[
          selectedToCurrency
        ].toFixed(2)} ${selectedToCurrency}`;

        const amountFromInput = document.querySelector(".amount-from input");
        const amountToInput = document.querySelector(".amount-to input");
        const selectedFromCurrency = document.querySelector(
          ".amount-from select"
        ).value;

        const amountFrom = parseFloat(amountFromInput.value);
        let amountTo;

        if (selectedFromCurrency === "USD") {
          amountTo = amountFrom * exchangeRates[selectedToCurrency];
        } else if (selectedToCurrency === "USD") {
          amountTo = amountFrom / exchangeRates[selectedFromCurrency];
        } else {
          const usdAmount = amountFrom / exchangeRates[selectedFromCurrency];
          amountTo = usdAmount * exchangeRates[selectedToCurrency];
        }

        amountToInput.value = amountTo.toFixed(2);
      })
      .catch((error) => console.error("Error fetching exchange rates:", error));
  });
});
