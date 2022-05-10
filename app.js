const vm = new Vue({
  el: "#app",
  data: {
    produtos: [],
    produto: false,
    carrinho: [],
    alertaAtivo: false,
    alertaMensagem: "Produto adicionado",
  },
  filters: {
    numberToPrice(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  computed: {
    carrinhoTotal() {
      let total = 0;
      if (this.carrinho.length) {
        this.carrinho.forEach((item) => {
          total += item.preco;
        });
      }
      return total;
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
    adicionarItem() {
      this.produto.estoque--;
      const { id, nome, preco } = this.produto;
      this.carrinho.push({ id, nome, preco });
      this.alerta(`${nome} adicionado ao carrinho`);
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
    },
    checarLocalStorage() {
      if (window.localStorage.carrinho) {
        this.carrinho = JSON.parse(window.localStorage.carrinho);
      }
    },
    alerta(mensagem) {
      this.alertaMensagem = mensagem;
      this.alertaAtivo = true;
      setTimeout(() => {
        this.alertaAtivo = false;
      }, 2000);
    },
  },
  watch: {
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho);
    },
  },
  created() {
    this.produtosAPI();
    this.checarLocalStorage();
  },
});
