import React, { useState } from "react";

function App() {
  // 1. Variabel: Daftar produk
  const products = [
    { id: 1, name: "Nasi Goreng", price: 20000 },
    { id: 2, name: "Ayam Geprek", price: 25000 },
    { id: 3, name: "Es Teh", price: 5000 },
    { id: 4, name: "Es Kopyor", price: 10000 },
    { id: 5, name: "Mie Tektek", price: 15000 },
  ];


  // State untuk keranjang belanja dan total harga
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // 2. Function: Menambahkan produk ke keranjang
  const addToCart = (id, quantity) => {
    const product = products.find((item) => item.id === id);
    if (product && quantity > 0) {
      const subtotal = product.price * quantity;

      // Update keranjang belanja
      setCart([...cart, { ...product, quantity, subtotal }]);
      setTotal(total + subtotal);
    } else {
      alert("Jumlah tidak valid atau produk tidak ditemukan!");
    }
  };

  // 3. Kondisi: Validasi input
  const handleSubmit = (e) => {
    e.preventDefault();
    const productId = parseInt(e.target.productId.value);
    const quantity = parseInt(e.target.quantity.value);

    if (isNaN(productId) || isNaN(quantity)) {
      alert("Input harus angka!");
    } else {
      addToCart(productId, quantity);
      e.target.reset();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kasir Sederhana</h1>

      {/* 4. Perulangan: Menampilkan daftar produk */}
      <h2>Daftar Produk</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.id}. {product.name} - Rp {product.price}
          </li>
        ))}
      </ul>

      {/* Input Form */}
      <h2>Tambah Pesanan</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID Produk:
          <input type="number" name="productId" min="1" max="5" required />
        </label>
        <br />
        <label>
          Jumlah:
          <input type="number" name="quantity" min="1" required />
        </label>
        <br />
        <button type="submit">Tambah ke Keranjang</button>
      </form>

      {/* Output: Keranjang Belanja */}
      <h2>Keranjang Belanja</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity} x Rp {item.price} = Rp {item.subtotal}
            </li>
          ))}
        </ul>
      ) : (
        <p>Keranjang kosong</p>
      )}

      {/* Total Harga */}
      <h2>Total Harga: Rp {total}</h2>
    </div>
  );
}

export default App;
