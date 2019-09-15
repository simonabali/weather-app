class TempManager {
    constructor(data) {
        this.cityData = []
    }
    
    getDataFromDB() {
        $.get("/cities", function (response) {
            if (response) { this.cityData = response }
        })
    }

    async getCityData(cityName) {
        let data = await $.get(`/city/${cityName}`)
            this.cityData.push(data)
        }
    

    saveCity(cityName) {
    let foundCity = this.cityData.find(c => c.name == cityName)
    $.post("/city", foundCity, () => console.log ("City sent") )
    }


    removeCity(cityName){
        $.ajax({
            method: "DELETE",
            url: `/city/:${cityName}`,
            success: useData,
            error: function (xhr, text, error) { alert("Error") }
        })}
    
    }



