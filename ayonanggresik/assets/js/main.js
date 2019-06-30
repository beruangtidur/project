const app = new Vue({
    el: '#app',
    data: {
        limit: 3,
        tags : [],
        items : [],
        sortType: 'tag',
        sortVal: 'semua',
        isLoading: true,
        isMore: false,
        errorText: "",
    },
    computed: {
        sortedItems: function() {
            let _e = []

            if (this.sortType == 'tag') {
                if (this.sortVal == 'semua') {
                    this.isMore = this.items.length > this.limit
                    return this.items.slice(0, this.limit)
                } else {
                    _e = this.items.filter(item => { if (item.tags.toLowerCase().indexOf(this.sortVal) > -1) return true })
                    this.isMore = _e.length > this.limit
                }
            } else if (this.sortType == 'query') {
                _e = this.items.filter(el => { if (el.name.toLowerCase().indexOf(this.sortVal) > -1 || el.description.toLowerCase().indexOf(this.sortVal) > -1) return true })
                this.isMore = _e.length > this.limit
            }

            return _e.slice(0, this.limit)
        }
    },
    methods: {
        sortBy(type, value) {
            this.sortType = type
            this.sortVal = value
            this.limit = 3
        },
        loadMore(){
            this.limit += 3
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
            this.items = res.data.Data.reverse()
            this.isLoading = false
        })
        .catch(function(err) {
            this.errorText = "Gagal Load Data, Coba Reload ulang"
        })
        //<------------ GET ALL MAIN DATA ------------------->
        axios({
            method: 'get',
            url: _url,
            params: {
                sheet: _sheet2
            }
        })
        .then(res => {
            this.tags = res.data.Tags
            this.isLoading = false
        })
        //<------------ GET ALL TAGS DATA ------------------->
    }
})


