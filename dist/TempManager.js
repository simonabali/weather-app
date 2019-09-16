
class TempManager {
    constructor(data) {
        this.cityData = []
    }

    async getDataFromDB() {
        let response = await $.get("/cities")
        if (response) {
            this.cityData = []
            response.forEach(r => this.cityData.push(r))
        }
    }

    async getCityData(cityName) {
        let data = await $.get(`/city/${cityName}`)
        this.cityData.unshift(data) //unshift adds to at array in position 0
    }
    

    async saveCity(cityName) {
        let foundCity = this.cityData.find(c => c.name == cityName)
        foundCity.saved = true // for the iff in handlebars to transform the save into a remove
        console.log(this.cityData)
        //you cannot do directly model.save(), but a post to your api.js, with the data sent
        await $.post("/city", foundCity, function () {
            console.log("City saved")
        })
    }

    async removeCity(cityName) {
        await $.ajax({
            method: "DELETE",
            url: `/city/${cityName}`, // you do not need the ":" before the parameter!
            success: () => {
                let index = this.cityData.findIndex(c => c.name == cityName)
                this.cityData.splice(index, 1)
                console.log("City deleted from Array")
            }
        })
    }
}

