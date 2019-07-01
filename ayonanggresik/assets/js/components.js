Vue.component('my-header', {
    props: ['tags'],
    data: function() {
        return {
            query: ''
        }
    },
    template: `
    <header>
        <a href="">
            <div class="site-logo">
                <img src="" alt="Logo Ayo Nang Gresik">
            </div>
            <div class="site-title">
                <h1> Ayo Nang Gresik!</h1>
            </div>
        </a>
        <div class="st">
            <section class="search-box">
                <form action="" class="searchSomething" @submit.prevent="sortBy('query', query.toLowerCase())">
                    <input type="text" placeholder="nggoleko rek sak keselmu" v-model="query">
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            </section>
            <section class="tag-lists">
                <a class="btn" href="" @click.prevent="sortBy('tag','semua')"> semua </a>
                <a class="btn" href="" v-for="tag in tags" @click.prevent="sortBy('tag',tag)" :class="tag"> {{ tag }} </a>
            </section>
        </div>
    </header>
    `,
    methods: {
        sortBy(type, value){
            this.$emit('sort-by', type, value)
            this.query = ''
        }
    }
})
// <------------- HEADER SECTION --------------->

Vue.component('my-main', {
    props: ['items', 'is-more', 'is-loading', 'error-text'],
    template: `
    <main>
        <div class="content-wrapper">
            <transition-group name="list" tag="div">
                <my-item 
                    v-for="(place, i) in items"
                    v-on:sort-by="sortBy"
                    :key="place.name"
                    :place="place"
                >
                </my-item>
            </transition-group>
            <div v-if="items.length == 0 && isLoading == false && errorText != ''" class="is-404">(•_•)</div>
        </div>
        
        <button class="btn more" v-if="isMore" @click.prevent="$emit('load-more')"> load more </button>
        <div v-if="isLoading" class="loader">Loading</div>
        <div v-if="errorText != ''">{{ errorText }}</div>
    </main>
    `,
    methods: {
        sortBy(type, value) { this.$emit('sort-by', type, value) }
    }
})

Vue.component('my-item', {
    props: ['place'],
    template: `
    <div class="content list-item">
        <img :src="place.logo" :alt="place.name+ '-logo'" class="logo">
        <h2 class="title">{{place.name}}</h2>
        <p class="desc">{{place.description}}</p>
        <div class="social-media">
            <a target='_blank' 
                v-if="place.facebook"
                :href="'https://facebook.com/' +place.facebook">
                <i class='fa fa-facebook'></i>
            </a>
            <a target="_blank"
                v-if="place.instagram"
                :href="'https://instagram.com/' +place.instagram">
                <i class="fa fa-instagram"></i>
            </a>
            <a target="_blank"
                v-if="place.website"
                :href="place.website">
                <i class="fa fa-globe"></i>
            </a>
            <a target="_blank"
                v-if="place.gmaps"
                :href="place.gmaps">
                <i class="fa fa-map-marker"></i>
            </a>
        </div>
        <div class="tags">
            <a href=""
                v-for="tag in tags"
                @click.prevent="sortBy('tag',tag.toLowerCase())"
                :class="'btn ' +tag.toLowerCase()">
                {{tag.toLowerCase()}}
            </a>
        </div>
    </div>
    `,
    computed: {
        tags: function () {
            return this.place.tags.split(', ')
        }
    },
    methods: {
        sortBy(type, value) { this.$emit('sort-by', type, value)}
    }
})

// <------------- MAIN SECTION --------------->

Vue.component('my-footer', {
    template: `
    <footer>
        <span>digawe nang <u><b>gresik</b></u> nganggo <i class="fa fa-heart"></i> </span>
        <a href="#" target="_blank" class="btn"> Tambah Data+</a>
        <!-- https://forms.gle/XiMxH1KS9md68AXr9 -->
    </footer>
    `
})

// <-------------- GLOBAL USED ----------->
Vue.component('my-divider', {
    template: "<div class='divider'></div>"
})