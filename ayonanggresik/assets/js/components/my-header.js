const myHeader = {
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
}
    
export {myHeader}