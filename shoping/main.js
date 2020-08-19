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
                
                <div class="cart"><p>Cart {{cart}}</p></div>
                <button @click="removeToCart">remove to cart</button>
            </div>
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
            cart: 10
        }
    },
    methods: {
        addToCart: function () {
            this.cart += 1
        },
        updateProduct: function (index) {
            this.selectedVariant = index;

        },
        removeToCart: function () {
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
var app=new Vue({
    el:"#app",
    data:{
        premium:true
    }
})