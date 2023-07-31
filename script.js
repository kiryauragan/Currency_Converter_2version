document.addEventListener("DOMContentLoaded", function () {
  const exchangeRateElement = document.getElementById("exchangeRate");
  const getExchangeRateButton = document.getElementById("getExchangeRate");
  const fromCurrencySelect = document.getElementById("fromCurrency");
  const toCurrencySelect = document.getElementById("toCurrency");
  const fromFlagImage = document.getElementById("fromFlag");
  const toFlagImage = document.getElementById("toFlag");
  const amountFromInput = document.querySelector(".amount-from input");
  const amountToInput = document.querySelector(".amount-to input");

  function resetCurrencyConverter() {
    fromCurrencySelect.value = "USD";
    toCurrencySelect.value = "UAH";
    fromFlagImage.src = "img/usd.svg";
    toFlagImage.src = "img/uah.svg";
    amountFromInput.value = "1.00";
    amountToInput.value = "";
    exchangeRateElement.textContent = "Getting exchange rate...";
  }

  resetCurrencyConverter();

  function updateFlagImages() {
    const fromCurrency = fromCurrencySelect.value.toLowerCase();
    const toCurrency = toCurrencySelect.value.toLowerCase();
    fromFlagImage.src = `img/${fromCurrency}.svg`;
    toFlagImage.src = `img/${toCurrency}.svg`;
  }

  fromCurrencySelect.addEventListener("change", updateFlagImages);
  toCurrencySelect.addEventListener("change", updateFlagImages);

  getExchangeRateButton.addEventListener("click", function () {
    fetch(
      `https://api.exchangerate.host/latest?base=${fromCurrencySelect.value}&symbols=${toCurrencySelect.value}`
    )
      .then((response) => response.json())
      .then((data) => {
        const exchangeRates = data.rates;
        const selectedToCurrency = toCurrencySelect.value;
        exchangeRateElement.textContent = `1 ${fromCurrencySelect.value} = ${exchangeRates[selectedToCurrency].toFixed(2)} ${selectedToCurrency}`;
        const amountFrom = parseFloat(amountFromInput.value);
        const amountTo = amountFrom * exchangeRates[selectedToCurrency];
        amountToInput.value = amountTo.toFixed(2);
      })
      .catch((error) => console.error("Error fetching exchange rates:", error));
  });

  function updateCurrentDate() {
    const dateTimeElement = document.getElementById("dateTimeValue");
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDateTime = now.toLocaleDateString("en-US", options);
    dateTimeElement.textContent = formattedDateTime;
  }

  updateCurrentDate();
  setInterval(updateCurrentDate, 1000);
});
