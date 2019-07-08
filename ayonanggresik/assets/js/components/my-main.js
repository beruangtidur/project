const myItem = {
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
        sortBy(type, value) { this.$emit('sort-by', type, value) }
    }
}

const myMain = {
    components: {myItem},
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
            <div v-if="items.length == 0 && isLoading == false && errorText == ''" class="is-404">(•_•)</div>
        </div>
        
        <button class="btn more" v-if="isMore" @click.prevent="$emit('load-more')"> load more </button>
        <div v-if="isLoading" class="loader">Loading</div>
        <div v-if="errorText != ''">{{ errorText }}</div>
    </main>
    `,
    methods: {
        sortBy(type, value) { this.$emit('sort-by', type, value) }
    }
}

export {myMain}