const app = new Vue({
    el: '#app',
    data: {
        limit: 3,
        tags : [],
        places : [],
        placesCopy: [],
        limitedData: []
    },
    methods: {
        sortBy(type, value) {
            arr = []

            if (type == 'tag') {
                if (value == 'semua') {
                    arr = this.places.slice()
                } else {
                    arr = this.places.filter(place => { if (place.tags.toLowerCase().indexOf(value) > -1) return true })
                }
            } else if(type == 'query') {
                arr = this.places.filter(el => { if (el.name.toLowerCase().indexOf(value) > -1 || el.description.toLowerCase().indexOf(value) > -1) return true })
            }

            this.placesCopy = arr
            this.limitedData = [...this.placesCopy.splice(0, this.limit)]

        },
        loadMore(){
            this.limitedData = [...this.limitedData, ...this.placesCopy.splice(0, this.limit)]
        }
    },
    created: function(){
        lastPos = 0
        window.addEventListener('scroll', function () {
            recentPos = window.scrollY
            searchBox = document.querySelector('.search-box')

            if (recentPos > 300) {
                searchBox.style.animation = ''
                if (searchBox.classList.contains('fixed') == false) searchBox.classList.add('fixed')

                if (lastPos > recentPos) {
                    searchBox.style.animation = 'slideDown .5s ease forwards'
                } else {
                    searchBox.style.animation = 'slideUp .5s ease forwards'
                }
            } else {
                searchBox.style.animation = ''
                searchBox.classList.remove('fixed')
            }

            lastPos = recentPos
        }) // FIXED SEARCH BOX

    },
    mounted: function(){
        _url = 'https://script.google.com/macros/s/AKfycbxQjQ-_q9iEnshmKyAYiBNHd7BjZspsOJEbt6QsDbrpmjrouu4/exec'
        _sheet1 = 'Data'
        _sheet2 = 'Tags'
  
        axios({
            method: 'get',
            url: _url,
            params: {
                sheet: _sheet1
            }
        })
        .then(res => {
            this.places = res.data.Data.reverse()
            this.placesCopy = this.places.slice()
            this.limitedData = [...this.placesCopy.splice(0, this.limit)]
        })

        axios({
            method: 'get',
            url: _url,
            params: {
                sheet: _sheet2
            }
        })
            .then(res => {
                this.tags = res.data.Tags
            })
    }
})


