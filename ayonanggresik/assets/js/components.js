Vue.component('my-header', {
    props: ['tags'],
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
            <my-search-box v-on:sort-by="sortBy"></my-search-box>
            <my-tags :tags="tags" v-on:sort-by="sortBy"></my-tags>
        </div>
    </header>
    `,
    methods: {
        sortBy(type, value){
            this.$emit('sort-by', type, value)
        }
    }
})
Vue.component('my-search-box', {
    data: function() {
        return {
            query: ''
        }
    },
    template: `
    <section class="search-box">
        <form action="" class="searchSomething" @submit.prevent="sortBy('query', query.toLowerCase())" >
            <input type="text" placeholder="nggoleko rek sak keselmu" v-model="query">
            <button type="submit"><i class="fa fa-search"></i></button>
        </form>
    </section>
    `,
    methods: {
      sortBy(type, value){
        this.$emit('sort-by', type, value)
      }
    },
})

Vue.component('my-tags', {
    props: ['tags'],
    template: `
    <section class="tag-lists">
        <a class="btn" href=""
            @click.prevent="sortBy('tag','semua')"> semua
        </a>
        <a class="btn" href="" 
            v-for="tag in tags"
            @click.prevent="sortBy('tag',tag)" 
            :class="tag">{{ tag }}
        </a>
    </section>
    `,
    methods: {
        sortBy(type, value){
            this.$emit('sort-by', type, value)
        }
    }
})
// <------------- HEADER SECTION --------------->

Vue.component('my-main', {
    props: ['places', 'len'],
    template: `
    <main>
        <my-contents 
            v-on:sort-by="sortBy" 
            :places="places" 
        >
        </my-contents>
        <button class="btn more" v-if="len > 0" @click.prevent="$emit('load-more')"> load more </button>
    </main>
    `,
    methods: {
        sortBy(type, value) { this.$emit('sort-by', type, value) }
    }
})

Vue.component('my-contents', {
    props: ['places'],
    template: `
    <div class="content-wrapper">
        <transition-group name="list" tag="div">
            <my-item 
                v-for="(place, i) in places"
                v-on:sort-by="sortBy"
                :key="place.name"
                :place="place"
            >
            </my-item>
        </transition-group>
        <div v-if="places.length == 0" class="is-404">(•_•)</div>
    </div>
    `,
    methods: {
        sortBy(type, value) { this.$emit('sort-by', type, value) },
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

// Vue.component('my-loader', {
//     template: `
//     <div class="loader" style="margin-top: 20px;text-align: center">Memuat...</div>
//     `
// })
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