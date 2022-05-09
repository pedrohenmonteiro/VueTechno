const vm = new Vue({
  el: "#app",
  data: {
    mensagem: "O Vue está funcionando",
    produtos: [],
    produto: false,
  },
  filters: {
    numberToPrice(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  methods: {
    handleClick(e) {
      if (e.target === e.currentTarget) {
        this.produto = false;
      }
    },

    produtosAPI() {
      fetch("./api/produtos.json")
        .then((r) => r.json())
        .then((r) => (this.produtos = r));
    },

    produtoAPI(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then((r) => r.json())
        .then((r) => (this.produto = r));
    },
  },
  created() {
    this.produtosAPI();
  },
});
