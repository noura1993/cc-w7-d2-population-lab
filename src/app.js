import Vue from "vue";

document.addEventListener("DOMContentLoaded", () => {
    new Vue({
        el: "#app",
        data: {
            countries: [],
            country: {
                name: "",
                capital: "",
                population: 0,
                borders: [],
                cioc: "",
                flag: ""
            },
            searchInput: "",
            favouriteCountries: []
        },
        computed: {
            totalPopulation: function() {
                return this.countries.reduce((total, country) => total + country.population, 0)
            }
        },
        mounted() {
            this.populateCountries();
            document.getElementById("country-info").style.display = "none";
        },
        methods: {
            populateCountries: function() {
                fetch("https://restcountries.eu/rest/v2/all")
                .then(result => result.json())
                .then(data => this.countries = data);
            },
            searchCountry: function(searchInput) {
                
                const foundCountry = this.countries.find((country) => {
                    return searchInput === country.name
                });

                document.getElementById("country-info").style.display = "block";
                this.country = foundCountry;
                this.searchInput = "";
            },
            addToFavouriteCountries: function() {
                this.favouriteCountries.push(this.country);
            }
        }
    });
});




