import { useState } from "react";
import axios from "axios";

const IconZap = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);
const IconEdit = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
);
const IconTrash = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
);

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
          {loading ? <span className="spinner" /> : <IconZap />}
          {loading ? "Simulating..." : "Simulate Random Order"}
        </button>

        <button className="btn btn-outline" onClick={() => setShowModal(true)}>
          <IconEdit /> Manual Entry
        </button>

        <button className="btn btn-danger" onClick={clearOrders} disabled={clearing}>
          {clearing ? <span className="spinner" /> : <IconTrash />}
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
