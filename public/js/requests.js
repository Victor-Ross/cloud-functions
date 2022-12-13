var vueApp = new Vue({
  el: '#app',
  data: {
    requests: [],
  },
  methods: {
    upvoteRequest(id) {
      const upvote = functions.httpsCallable('upvote');
      upvote({ id }).catch((error) => {
        showNotification(error.message);
      });
    },
  },
  mounted() {
    const requestsRef = db.collection('requests').orderBy('upvotes', 'desc');

    requestsRef.onSnapshot((snapshot) => {
      let requests = [];
      snapshot.docs.forEach((doc) => {
        requests.push({ ...doc.data(), id: doc.id });
      });
      this.requests = requests;
    });
  },
});
