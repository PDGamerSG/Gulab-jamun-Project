import { useState } from "react";
import axios from "axios";

function SimulateOrderButton() {
  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    product_id: "P101", quantity: 1, unit_price: 50, country: "India", customer_id: "C1001"
  });

  const simulateOrder = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/simulate-order");
      setLoading(false);
      window.dispatchEvent(new Event("data-refresh"));
    } catch {
      setLoading(false);
    }
  };

  const clearOrders = async () => {
    setClearing(true);
    try {
      await axios.delete("http://localhost:8000/clear-simulated-orders");
      setClearing(false);
      window.dispatchEvent(new Event("data-refresh"));
    } catch {
      setClearing(false);
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        order_id: String(Math.floor(Math.random() * 900000) + 100000),
        ...formData,
        order_date: new Date().toISOString()
      };
      await axios.post("http://localhost:8000/create-order", payload);
      setLoading(false);
      setShowModal(false);
      window.dispatchEvent(new Event("data-refresh"));
      alert("Order Created Successfully!");
    } catch {
      setLoading(false);
      alert("Failed to create order");
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button className="btn btn-primary" onClick={simulateOrder} disabled={loading}>
          {loading ? <span className="spinner" /> : "⚡"}
          {loading ? "Simulating..." : "Simulate Random Order"}
        </button>

        <button className="btn btn-outline" onClick={() => setShowModal(true)}>
          📝 Manual Entry
        </button>

        <button className="btn btn-danger" onClick={clearOrders} disabled={clearing}>
          {clearing ? <span className="spinner" /> : "🗑️"}
          {clearing ? "Clearing..." : "Clear Added Orders"}
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-in">
            <div className="modal-header">
              <h3>Create Manual Order</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleManualSubmit} className="manual-form">
              <div className="form-group">
                <label>Product ID</label>
                <input required value={formData.product_id} onChange={e => setFormData({ ...formData, product_id: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Quantity</label>
                  <input type="number" required min="1" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })} />
                </div>
                <div className="form-group">
                  <label>Unit Price (₹)</label>
                  <input type="number" required min="1" value={formData.unit_price} onChange={e => setFormData({ ...formData, unit_price: Number(e.target.value) })} />
                </div>
              </div>
              <div className="form-group">
                <label>Country</label>
                <select value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })}>
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Germany</option>
                  <option>Japan</option>
                </select>
              </div>
              <div className="form-group">
                <label>Customer ID</label>
                <input required value={formData.customer_id} onChange={e => setFormData({ ...formData, customer_id: e.target.value })} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-text" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SimulateOrderButton;

