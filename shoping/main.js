var app=new Vue({
    el:"#app",
    data:{
        brand:'Vue mastery',
        product:'sock',
        selectedVariant:0,
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        inventory:5,
        onSale:true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage:'./vmSocks-green.jpg',
                variantQuantity:0
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: './vmSocks-blue.jpg',
                variantQuantity: 10
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart:10
    },
    methods:{
        addToCart:function(){
            this.cart+=1
        },
        updateProduct: function (index){
            this.selectedVariant = index;
            
        },
        removeToCart: function () {
            this.cart -= 1
        },
      
    },
    computed:{
        title(){
            return this.brand + " " + this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
            }
            return this.brand + ' ' + this.product + ' are not on sale'
        }

    }
    
})