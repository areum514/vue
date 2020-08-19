var eventBus=new Vue()
Vue.component('product',{
    props:{
        premium:{
            type:Boolean,
            required :true
        }
    },
    template:`<div class="product">
            <div class="product-image">
                <img v-bind:src="image" >
            </div>
            <div class="product-info">
                <h1>{{title}}</h1>
                <a v-bind:href="link">more infomation</a>
                <p v-if="inventory > 10"> In stock</p>
                <p v-else-if="inventory <= 10 && inventory>0"> Almost Sold out!</p>
                <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
                <span v-if="onSale">{{sale}}</span>
                <product-details :details='details'></product-details>
                <div class="color-box" 
                v-for="(variant, index) in variants" 
                :key="variant.variantId"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
                </div>
                <p> User is premium {{premium}}</p>
                <p>shipping : {{shipping}}</p>
                <ul v-for="size in sizes">{{size}}</ul>
                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock}">
                    Add to cart
                </button>
                
                
                <button @click="removeToCart">remove to cart</button>
            </div>
            <product-tabs :reviews='reviews'></product-tabs>
            
        </div>`,
    data(){
        return {
            brand: 'Vue mastery',
            product: 'sock',
            selectedVariant: 0,
            link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
            inventory: 5,
            onSale: true,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: './vmSocks-green.jpg',
                    variantQuantity: 0
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: './vmSocks-blue.jpg',
                    variantQuantity: 10
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            reviews:[]
          
        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)

        },
        updateProduct: function (index) {
            this.selectedVariant = index;

        },
        removeToCart: function () {
            this.$emit('remove-to-cart', this.variants[this.selectedVariant].variantId)
            this.cart -= 1
        },
    
        

    },
    computed: {
        title() {
            return this.brand + " " + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
            }
            return this.brand + ' ' + this.product + ' are not on sale'
        },
        shipping(){
            if (this.premium){
                return 'Free';
            }
            return 2.99
            
        }

    },
    mounted(){
        eventBus.$on('review-submitted',productReview=>{
            this.reviews.push(productReview)

        })

    }

})

Vue.component('product-details',
{   props:{
    details:{
        type:Array,
        required:true
    }
},
    template:
        `<ul>
            <p v-for="detail in details">{{ detail }}</p>
        </ul>`
    
})
Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
        <b> Please correct the following error(s)</b>
        <ul>
        <li v-for="error in errors">{{error}}</li>
        </ul>
    </p>
    <p>
    <label from="name">Name:</label>
    <input id="name" v-model="name">
    </p>
    <p>
        <label from="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
    </p>
    <p>
        <label from="rating">Rating:</label>
        <select id="rating" v-model.namber="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
    </p>
    <p>
    Would you recommend this product?
    </p>
    <label>
    Yes
    <input type="radio" value="Yes" v-model="recommend"/>
    </label>
    <label>
    No
    <input type="radio" value="No" v-model="recommend"/>
    </label>
        <input type="submit" value="Submit">
    </p>
    </form>`,
    data() {
        return {
        name: null,
        rating: null,
        review: null,
        errors:[],
        recommend:null,
        } 
    },
    methods:{
        onSubmit(){
            this.errors=[]
            if(this.name &&this.rating&&this.review){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend:this.recommend
                }

                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.rating = null
                this.review = null
                this.recommend=null
            }
            else
            {
                if(!this.name)this.errors.push('Name required.')
                if (!this.rating) this.errors.push('Rating required.')
                if (!this.review) this.errors.push('Review required.')
                if (!this.recommend) this.errors.push('Recommend required.')
            }
            
        }
    }
})

Vue.component('product-tabs',{
    props:{
        reviews:{
            type:Array,
            required:true
        }
    },
    template:`
    <div>
        <span class='tab'
        :class="{activeTab:selectedTab===tab}"
        v-for='(tab, index) in tabs' :key="index"
        @click="selectedTab=tab">{{tab}}</span>

    <div v-if="selectedTab==='Reviews'">
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no review yet.</p>
    
            <ul>
                <li v-for='review in reviews'>
                <p>{{review.name}}</p>
                <p>Rating: {{review.review}}</p>
                <p>{{review.rating}}</p>
                <p>recommend: {{review.recommend}}</p>
                </li>
            </ul>
    </div>

    <product-review 
    v-if="selectedTab==='Make a Review'"></product-review>
        
    </div>`,
    data(){
        return {
            tabs:['Reviews','Make a Review'],
            selectedTab:'Reviews'
        }
    }

})
var app=new Vue({
    el:"#app",
    data:{
        premium:true,
        cart:[],
        
    },
    methods:{
        updateCart(id){
            this.cart.push(id)
        },
        removeItem(id) {
            for (var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                    return
                }
            }
        }
    }
})