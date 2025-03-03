app.component("review-form", {
  template: `
    <div v-if="reviews.length > 0" class="reviews-display">
      <h4>Customer Reviews</h4>
      <ul>
        <li v-for="(review, index) in reviews" :key="index">
          <div class="review-item">
            <strong>{{ review.name }} ({{ review.rating }} stars)</strong>
            <p>{{ review.review }}</p>
            <button @click="editReview(index)">Edit</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="review-form-container">
      <form @submit.prevent="onSubmit" class="review-form">
        <h3>{{ editingReviewIndex !== null ? 'Edit Your Review' : 'Leave a Review' }}</h3>
        
        <label for="name">Name:</label>
        <input id="name" v-model="name" required>

        <label for="review">Review:</label>
        <textarea id="review" v-model="review" required></textarea>

        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating" required>
          <option value="3">★★★</option>
          <option value="2">★★</option>
          <option value="1">★</option>
        </select>

        <input class="submit-button" type="submit" value="Submit">
      </form>
    </div>
  `,

  data() {
    return {
      name: "",
      review: "",
      rating: null,
      reviews: [], // Store reviews here
      editingReviewIndex: null, // Track which review is being edited
    };
  },

  methods: {
    onSubmit() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
      };

      if (this.editingReviewIndex !== null) {
        // Update the existing review
        this.reviews[this.editingReviewIndex] = productReview;
        this.editingReviewIndex = null; // Reset editing mode
      } else {
        // Add new review
        this.reviews.push(productReview);
      }

      // Save updated reviews to localStorage
      this.saveReviewsToLocalStorage();

      // Clear form inputs after submission
      this.name = "";
      this.review = "";
      this.rating = null;
    },

    editReview(index) {
      // Populate the form with the selected review's data for editing
      const reviewToEdit = this.reviews[index];
      this.name = reviewToEdit.name;
      this.review = reviewToEdit.review;
      this.rating = reviewToEdit.rating;
      this.editingReviewIndex = index; // Set the index of the review being edited
    },

    saveReviewsToLocalStorage() {
      localStorage.setItem("reviews", JSON.stringify(this.reviews));
    },

    loadReviewsFromLocalStorage() {
      const savedReviews = localStorage.getItem("reviews");
      if (savedReviews) {
        this.reviews = JSON.parse(savedReviews);
      }
    },
  },

  mounted() {
    // Load reviews from localStorage when the component is mounted
    this.loadReviewsFromLocalStorage();
  },
});
