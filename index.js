

document.addEventListener("DOMContentLoaded", () => {
  const apiUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
  let fetchedData = [];
  let sortOrder = "asc"; // Initial sort order
  let sortOrder2 = "asc"; // Initial sort order

  // Function to display data in a table
  const displayData = (data) => {
    const tableBody = document.querySelector("#data-table");
    tableBody.innerHTML = "";

    data.forEach((item) => {
      const row = document.createElement("tr");
 
      const imageCell = document.createElement("td");
      imageCell.classList.add("img-detail");
      const img = document.createElement("img");
      img.src = item.image;
      imageCell.appendChild(img);
      row.appendChild(imageCell);

      const nameCell = document.createElement("td");
      nameCell.textContent = item.name;
      row.appendChild(nameCell);
 
      const symbolCell = document.createElement("td");
      symbolCell.textContent = item.symbol;
      symbolCell.style.textTransform = "uppercase";
      row.appendChild(symbolCell);

      const priceCell = document.createElement("td");
      priceCell.classList.add("dir");
      priceCell.textContent ="$"+item.current_price;
      row.appendChild(priceCell);
 
      const volumeCell = document.createElement("td");
      volumeCell.classList.add("dir");
      volumeCell.textContent ="$"+item.total_volume;
      row.appendChild(volumeCell);

      const percentCell = document.createElement("td");
      percentCell.classList.add("dir2");
      percentCell.textContent = item.price_change_percentage_24h.toFixed(2);
      if (item.price_change_percentage_24h > 0) {
        percentCell.style.color = "green";
      } else {
        percentCell.style.color = "red";
      }
      row.appendChild(percentCell);

      const CapCell = document.createElement("td");
      CapCell.classList.add("mktdir");
      CapCell.textContent ="Mkt Cap : $"+ item.market_cap;
      
      row.appendChild(CapCell);
      tableBody.appendChild(row);
    });
  };

  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      fetchedData = data;
      displayData(fetchedData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      const dataContainer = document.getElementById("items");
      dataContainer.innerHTML = "Error loading data. Please try again later.";
    });

  // Add event listener to the sort button with sort-button
  const sortButton = document.getElementById("sort-button");
  sortButton.addEventListener("click", () => {
    fetchedData.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
      } else {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      }
    });

    // Toggle the sort order
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
    displayData(fetchedData);
  });

  // Add event listener to the sort button with market_cap
  const sortButton2 = document.getElementById("value-button");
  sortButton2.addEventListener("click", () => {
    fetchedData.sort((a, b) => {
      if (sortOrder2 === "asc") {
        return a.market_cap - b.market_cap;
      } else {
        return b.market_cap - a.market_cap;
      }
    });

    // Toggle the sort order
    sortOrder2 = sortOrder2 === "asc" ? "desc" : "asc";
    displayData(fetchedData);
  });

  // Function to filter data by name
  const filterData = (query) => {
    const filteredData = fetchedData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    displayData(filteredData);
  };

  //Search input
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (event) => {
    filterData(event.target.value);
  });
});
