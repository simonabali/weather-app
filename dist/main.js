const renderer = new Renderer()
const tempManager = new TempManager()

//It should call getDataFromDB from an instance of your TempManager
// It should then render the city data from your TempManager
// This function should run when the page loads 
const loadPage = async function () {
    await tempManager.getDataFromDB()
    let data = tempManager.cityData
    renderer.renderData(data)
    //console.log(data)
}

loadPage()

// which should call to the server and render new weather data
// It should take the city-input from your html
// It should call the getCityData method from an instance of your TempManager, 
//and send the city-input as the parameter
// It should then render the data you get back from the server
// This function needs to be async to work
const handleSearch = async function () {
    let searchedCity = $('#city-input').val()
    await tempManager.getCityData(searchedCity)
    renderer.renderData(tempManager.cityData)

}

// Takes the name of the city from the DOM
// Calls the saveCity method from an instance of the TempManager, sending the cityName as a parameter
$("body").on ("click", ".save-button", async function(){
    let cityName = ($(this).closest("div").find(".city-name").text()) //siblings works withhtml()
    await tempManager.saveCity(cityName)
   renderer.renderData(tempManager.cityData)
})

//Takes the name of the city from the DOM
//Calls the removeCity method from an instance of the TempManager, sending the cityName as a 
// parameters the saveCity method from an instance of the TempManager, sending the cityName as a parameter
$("body").on ("click", ".remove-button", async function(){
    let cityName = ($(this).closest("div").find(".city-name").text())
    await tempManager.removeCity(cityName)
   renderer.renderData(tempManager.cityData) //rerendering for the buttons to change
})

