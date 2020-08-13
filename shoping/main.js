var app=new Vue({
    el:"#app",
    data:{
        product:'sock',
        image:'./vmSocks-green.jpg',
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        inventory:5,
        onSale:true,
        inStock:false,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage:'./vmSocks-green.jpg'
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: './vmSocks-blue.jpg'
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart:10
    },
    methods:{
        addToCart:function(){
            this.cart+=1
        },
        updateProduct:function(value){
            this.image = value;
        },
        removeToCart: function () {
            this.cart -= 1
        },
      
    },
    
})