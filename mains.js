/** Generamos la base de datos con los productos.
 * Los métodos determinarán: agregar un item y eliminar un item.
 */

const db = {
  methods: {
    find: (id) => {
      return db.items.find((item) => item.id === id);
    },
    remove: (items) => {
      items.forEach((item) => {
        const product = db.methods.find(item.id);
        product.qty = product.qty - item.qty;
      });

      console.log(db);
    },
  },
  items: [
    {
      id: 0,
      title: "La Melancolía de los Feos",
      price: 25000,
      qty: 10,
    },
    {
      id: 1,
      title: "Apocalipsis",
      price: 30000,
      qty: 4,
    },
    {
      id: 2,
      title: "El relato de un Asesino",
      price: 25000,
      qty: 20,
    },
  ],
};

/** Creamos un objeto con la base de datos del carrito de compras escogidos.
 * Los métodos serán las acciones.
 */

const shoppingCart = {
  items: [],
  methods: {
    add: (id, qty) => {
      const cartItem = shoppingCart.methods.get(id);

      if (cartItem) {
        if (shoppingCart.methods.hasInventory(id, qty + cartItem.qty)) {
          cartItem.qty += qty;
        } else {
          alert("No hay inventario suficiente");
        }
      } else {
        shoppingCart.items.push({ id, qty });
      }
    },
    remove: (id, qty) => {
      const cartItem = shoppingCart.methods.get(id);
      if (cartItem.qty - qty > 0) {
        cartItem.qty -= qty;
      } else {
        shoppingCart.items = shoppingCart.items.filter((item) => item.id != id);
      }
    },
    count: () => {
      return shoppingCart.items.reduce((acc, item) => acc + item.qty, 0);
    },
    get: (id) => {
      const index = shoppingCart.items.findIndex((item) => item.id === id);
      return index >= 0 ? shoppingCart.items[index] : null;
    },
    getTotal: () => {
      const total = shoppingCart.items.reduce((acc, item) => {
        const found = db.methods.find(item.id);
        return acc + found.price * item.qty;
      }, 0);
      return total;
    },
    hasInventory: (id, qty) => {
      return db.items.find((item) => item.id === id).qty - qty >= 0;
    },
    purchase: () => {
        db.methods.remove(shoppingCart.items);
        shoppingCart.items = [];
    },
  },
};
