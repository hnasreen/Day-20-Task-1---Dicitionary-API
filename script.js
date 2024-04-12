var container=document.createElement("div")
container.className="container"

var row=document.createElement("div")
row.className="row"

var col1=document.createElement("div")
col1.className="col-md-6 offset-md-3"

var h1=document.createElement("h1")
h1.className="text-center mb-4"
h1.innerHTML="Dictionary"

var input=document.createElement("input")
input.setAttribute("type","text")
input.id="searchWord"
input.className="form-control mb-3"
input.setAttribute("placeholder","Enter a word")

var button=document.createElement("button")
button.className="btn btn-outline-dark d-block mx-auto"
button.innerHTML="Search"
button.addEventListener("click",searchDictionary)

var div=document.createElement("div")
div.id="resultContainer"
div.className="mt-4"

col1.append(h1,input,button,div)
row.append(col1)
container.append(row)
document.body.append(container)


// Define the searchDictionary function here
async function searchDictionary() {
  const word = document.getElementById("searchWord").value.trim();
  if (!word) {
    alert("Please enter a word to search.");
    return;
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    // Extract meaning and example
    const meaning = data[0].meanings[0].definitions[0].definition;
    const example = data[0].meanings[0].definitions[0].example;

    // Display the result
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${word}</h5>
          <p class="card-text"><strong>Meaning:</strong> ${meaning}</p>
          <p class="card-text"><strong>Example:</strong> ${example}</p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("An error occurred. Please try again later.");
  }
}