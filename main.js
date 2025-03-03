const app = Vue.createApp({
  data() {
    return {
      product: "Stocks",
      brand: "UrbanAttire",
      selectedVariant: 0,
      details: ["Pure Cotton", "50% off"],
      features:[
        {icon:"bi bi-arrow-repeat", text:"10 days Return"},
        {icon:"bi bi-truck", text:"Free Delivery"},
        {icon:"bi bi-star-fill", text:"Top Brand"},
      ],
      variants: [
        {
          id: 223,
          color: "Red",
          image: "./assets/images/redshirt.jpg",
          quantity: 50,
        },
        {
          id: 224,
          color: "Blue",
          image: "./assets/images/blueshirt.jpg",
          quantity: 0,
        },
        {
          id: 225,
          color: "Yellow",
          image: "./assets/images/yellowshirt.jpg",
          quantity: 10,
        },
      ],
      cart: [],
      showCartModal: false,
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      const variant = this.variants[this.selectedVariant];
      if (variant.quantity > 0) {
        this.cart.push({
          color: variant.color,
          quantity: 1,
          id: variant.id,
        });
        alert(`Added ${variant.color} shirt to the cart`);
      } else {
        alert(`${variant.color} shirt is out of stock`);
      }
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
    },
    showCart() {
      this.showCartModal = !this.showCartModal;
    },
    removeFromCart(index) {
      this.cart.splice(index, 1); // Removes the item from the cart
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
  },
});
