const vm = new Vue({
  el: "#app",
  data: {
    mensagem: "O Vue está funcionando",
    produtos: [],
  },
  methods: {
    produtosAPI() {
      fetch("./api/produtos.json")
        .then((r) => r.json())
        .then((r) => (this.produtos = r));
    },
  },
  created() {
    this.produtosAPI();
  },
});
