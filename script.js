const apiKey = "6c1576401d364d5f98a174915250606";

async function buscarClima() {
  const cidade = document.getElementById("cityInput").value.trim();
  const resultado = document.getElementById("weatherResult");

  if (!cidade) {
    resultado.innerHTML = "Por favor, digite uma cidade!";
    return;
  }


  resultado.innerHTML = "Carregando...";

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(cidade)}&lang=pt`);
    if (!response.ok) throw new Error("Cidade não encontrada ou erro na API.");

    const data = await response.json();

    const nome = data.location.name;
    const pais = data.location.country;
    const estado = data.location.region
    const temp = data.current.temp_c;
    const vento = data.current.wind_kph;
    const umidade = data.current.humidity;
    const condicao = data.current.condition.text;
    const icone = data.current.condition.icon;

    resultado.innerHTML = `
      <h2>${nome}, ${estado}, ${pais}</h2>
      <p><img src="https:${icone}" alt="${condicao}" /> ${condicao}</p>
      <p>🌡 Temperatura: ${temp}°C</p>
      <p>💨 Vento: ${vento} km/h</p>
      <p>💧 Umidade: ${umidade}%</p>
    `;
  } catch (error) {
    resultado.innerHTML = "Erro: " + error.message;
  }
}


document.getElementById("btnBuscar").addEventListener("click", buscarClima);
