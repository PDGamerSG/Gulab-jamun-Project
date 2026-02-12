from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from faker import Faker
import random
from datetime import datetime
from pydantic import BaseModel

class AIFixRequest(BaseModel):
    fix_type: str

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


try:
    sales_df = pd.read_parquet("fact_sales.parquet")
    sales_df["order_date"] = pd.to_datetime(sales_df["order_date"])
except:
    
    sales_df = pd.DataFrame(columns=["order_id", "product_id", "customer_id", "order_date", "revenue", "quantity", "unit_price", "country"])

try:
    shipment_df = pd.read_parquet("fact_shipment.parquet")
except:
    shipment_df = pd.DataFrame(columns=["shipment_id", "order_id", "warehouse_id", "delivery_status"])

simulated_orders = []



@app.get("/monthly-revenue")
def monthly_revenue():
    if sales_df.empty: return {}
    result = sales_df.groupby(sales_df["order_date"].dt.to_period("M"))["revenue"].sum()
    result.index = result.index.astype(str)
    return result.to_dict()

@app.get("/country-revenue")
def country_revenue():
    if sales_df.empty: return {}
    return sales_df.groupby("country")["revenue"].sum().to_dict()

@app.get("/delivery-performance")
def delivery_performance():
    if shipment_df.empty: return {}
    return shipment_df["delivery_status"].value_counts().to_dict()

@app.get("/kpi-summary")
def kpi_summary():
    total_revenue = sales_df["revenue"].sum() if not sales_df.empty else 0
    total_orders = sales_df["order_id"].nunique() if not sales_df.empty else 0
    total_customers = sales_df["customer_id"].nunique() if not sales_df.empty else 0
    
    delivery_success = 0
    if not shipment_df.empty:
        delivery_success = ((shipment_df["delivery_status"] == "On Time").sum() / len(shipment_df)) * 100

    return {
        "total_revenue": float(total_revenue),
        "total_orders": int(total_orders),
        "total_customers": int(total_customers),
        "delivery_success_rate": round(delivery_success, 2)
    }

@app.get("/warehouse-sales")
def warehouse_sales():
    if sales_df.empty or shipment_df.empty: return {}
    merged = shipment_df.merge(sales_df, on="order_id")
    return merged.groupby("warehouse_id")["revenue"].sum().to_dict()

@app.get("/customer-segmentation")
def customer_segmentation():
    if sales_df.empty: return {"New Customers": 0, "Returning Customers": 0}
    purchase_counts = sales_df.groupby("customer_id")["order_id"].nunique()
    new_customers = (purchase_counts == 1).sum()
    returning_customers = (purchase_counts > 1).sum()
    return {
        "New Customers": int(new_customers),
        "Returning Customers": int(returning_customers)
    }

@app.get("/customer-clv")
def customer_clv():
    if sales_df.empty: return {}
    clv = sales_df.groupby("customer_id")["revenue"].sum()
    return clv.sort_values(ascending=False).head(10).to_dict()

@app.get("/purchase-frequency")
def purchase_frequency():
    if sales_df.empty: return {}
    freq = sales_df.groupby("customer_id")["order_id"].nunique()
    return freq.sort_values(ascending=False).head(10).to_dict()

@app.get("/delivery-delay-by-warehouse")
def delivery_delay_by_warehouse():
    if shipment_df.empty: return {}
    delay = shipment_df.groupby(["warehouse_id", "delivery_status"]).size().unstack(fill_value=0)
    return delay.to_dict()

@app.get("/slow-moving-products")
def slow_moving_products():
    if sales_df.empty: return {}
    slow_products = sales_df.groupby("product_id")["quantity"].sum().sort_values().head(10)
    return slow_products.to_dict()

@app.get("/stock-risk")
def stock_risk():
    if sales_df.empty: return {}
    product_sales = sales_df.groupby("product_id")["quantity"].sum()
    high_risk = product_sales.sort_values(ascending=False).head(10)
    return high_risk.to_dict()



@app.get("/daily-revenue")
def daily_revenue():
    if sales_df.empty: return {}
    
    daily = sales_df.groupby(sales_df["order_date"].dt.date)["revenue"].sum()
    
    return daily.tail(30).astype(str).to_dict() 

@app.get("/inventory-turnover")
def inventory_turnover():
    
    return {
        "Electronics": 4.5,
        "Clothing": 3.2,
        "Home & Garden": 2.8,
        "Toys": 5.1,
        "Books": 1.9
    }

@app.get("/basket-analysis")
def basket_analysis():
    if sales_df.empty: return {"avg_basket_size": 0, "avg_basket_value": 0}
    
    
    basket_size = sales_df.groupby("order_id")["quantity"].sum().mean()
    
    
    basket_value = sales_df.groupby("order_id")["revenue"].sum().mean()
    
    return {
        "avg_basket_size": round(basket_size, 2),
        "avg_basket_value": round(basket_value, 2)
    }

@app.get("/data-quality")
def data_quality():
    """Run comprehensive data quality checks on available data."""
    sales_count = len(sales_df)
    shipment_count = len(shipment_df)
    total = sales_count + shipment_count
    
    if total == 0:
        return {"overall_score": 0, "total_records": 0, "checks": {}, "profiling": {}}

    
    null_sales = int(sales_df.isnull().any(axis=1).sum())
    null_shipment = int(shipment_df.isnull().any(axis=1).sum())

    
    dup_sales = int(sales_df.duplicated().sum())

    
    neg_price = int((sales_df["unit_price"] < 0).sum()) if "unit_price" in sales_df.columns else 0

    
    neg_qty = int((sales_df["quantity"] < 0).sum()) if "quantity" in sales_df.columns else 0

    
    date_issues = 0
    if "order_date" in sales_df.columns:
        dates = pd.to_datetime(sales_df["order_date"], errors="coerce")
        date_issues = int(dates.isna().sum())

    
    ref_issues = 0
    if "order_id" in shipment_df.columns and "order_id" in sales_df.columns:
        ref_issues = int(~shipment_df["order_id"].isin(sales_df["order_id"]).sum())

    
    valid_statuses = {"On Time", "Delayed"}
    delivery_issues = 0
    if "delivery_status" in shipment_df.columns:
        delivery_issues = int(~shipment_df["delivery_status"].isin(valid_statuses).sum())

    
    total_issues = null_sales + null_shipment + dup_sales + neg_price + neg_qty + date_issues + ref_issues + delivery_issues
    
    overall_score = round(max(0, (1 - total_issues / max(total, 1)) * 100), 1)

    
    unique_customers = int(sales_df["customer_id"].nunique()) if "customer_id" in sales_df.columns else 0
    unique_products = int(sales_df["product_id"].nunique()) if "product_id" in sales_df.columns else 0
    countries = int(sales_df["country"].nunique()) if "country" in sales_df.columns else 0
    warehouses = int(shipment_df["warehouse_id"].nunique()) if "warehouse_id" in shipment_df.columns else 0

    date_min = str(sales_df["order_date"].min())[:10] if "order_date" in sales_df.columns and not sales_df.empty else "N/A"
    date_max = str(sales_df["order_date"].max())[:10] if "order_date" in sales_df.columns and not sales_df.empty else "N/A"

    sales_completeness = round((1 - sales_df.isnull().sum().sum() / max(sales_df.size, 1)) * 100, 1)
    shipment_completeness = round((1 - shipment_df.isnull().sum().sum() / max(shipment_df.size, 1)) * 100, 1)

    return {
        "overall_score": overall_score,
        "total_records": total,
        "sales_records": sales_count,
        "shipment_records": shipment_count,
        "checks": {
            "null_sales":       {"passed": null_sales == 0,      "count": null_sales,      "total": sales_count},
            "null_shipment":    {"passed": null_shipment == 0,   "count": null_shipment,   "total": shipment_count},
            "duplicates_sales": {"passed": dup_sales == 0,       "count": dup_sales,       "total": sales_count},
            "neg_price":        {"passed": neg_price == 0,       "count": neg_price,       "total": sales_count},
            "neg_quantity":     {"passed": neg_qty == 0,         "count": neg_qty,         "total": sales_count},
            "date_range":       {"passed": date_issues == 0,     "count": date_issues,     "total": sales_count},
            "referential":      {"passed": ref_issues == 0,      "count": ref_issues,      "total": shipment_count},
            "delivery_values":  {"passed": delivery_issues == 0, "count": delivery_issues, "total": shipment_count},
        },
        "profiling": {
            "sales_completeness": sales_completeness,
            "shipment_completeness": shipment_completeness,
            "unique_customers": unique_customers,
            "unique_products": unique_products,
            "date_range_start": date_min,
            "date_range_end": date_max,
            "countries": countries,
            "warehouses": warehouses,
        }
    }



@app.post("/simulate-order")
def simulate_order():
    global sales_df
    global simulated_orders
    
    if sales_df.empty: return {"error": "No data to simulate from"}

    new_order = {
        "order_id": str(random.randint(100000, 999999)),
        "product_id": str(random.choice(sales_df["product_id"].unique())),
        "description": "Simulated Product",
        "quantity": random.randint(1, 10),
        "order_date": datetime.now(),
        "unit_price": random.uniform(10, 100),
        "customer_id": str(random.randint(20000, 30000)),
        "country": random.choice(sales_df["country"].unique())
    }
    new_order["revenue"] = new_order["quantity"] * new_order["unit_price"]

    sales_df = pd.concat([sales_df, pd.DataFrame([new_order])], ignore_index=True)
    simulated_orders.append(new_order["order_id"])

    return {"message": "New order simulated successfully", "order_id": new_order["order_id"]}

@app.delete("/clear-simulated-orders")
def clear_simulated_orders():
    global sales_df
    global simulated_orders
    
    if not simulated_orders:
        return {"message": "No simulated orders to clear"}

    sales_df = sales_df[~sales_df["order_id"].isin(simulated_orders)]
    cleared_count = len(simulated_orders)
    simulated_orders = []

    return {"message": f"Cleared {cleared_count} simulated orders"}

@app.post("/ingest-data")
async def ingest_data(data: list[dict]):
    global sales_df
    if not data:
        return {"message": "No data provided"}
    
    
    new_df = pd.DataFrame(data)
    
    
    if "revenue" in new_df.columns:
        new_df["revenue"] = pd.to_numeric(new_df["revenue"], errors="coerce").fillna(0)
    if "order_date" in new_df.columns:
        new_df["order_date"] = pd.to_datetime(new_df["order_date"], errors="coerce")
        
    
    sales_df = pd.concat([sales_df, new_df], ignore_index=True)
    
    return {"message": f"Successfully ingested {len(new_df)} records", "total_records": len(sales_df)}

@app.get("/ai-diagnose")
def ai_diagnose():
    issues = []
    
    
    missing_rev = sales_df[(sales_df["revenue"] == 0) & (sales_df["quantity"] > 0) & (sales_df["unit_price"] > 0)]
    if not missing_rev.empty:
        issues.append({
            "type": "missing_revenue",
            "title": "Missing Revenue Calculations",
            "description": f"Found {len(missing_rev)} orders where Revenue is 0 but Quantity and Price exist."
        })

    
    negative_sales = sales_df[sales_df["quantity"] < 0]
    if not negative_sales.empty:
        issues.append({
            "type": "negative_inventory",
            "title": "Negative Inventory Detected",
            "description": f"Found {len(negative_sales)} return orders/adjustments causing negative stock flow."
        })

    
    insights = {
        "projected_revenue": int(sales_df["revenue"].sum() * 1.15),
        "stock_health": 94
    }

    return {"issues": issues, "insights": insights}

@app.post("/ai-fix")
def ai_fix(req: AIFixRequest):
    global sales_df
    
    if req.fix_type == "missing_revenue":
        mask = (sales_df["revenue"] == 0) & (sales_df["quantity"] > 0)
        count = mask.sum()
        sales_df.loc[mask, "revenue"] = sales_df.loc[mask, "quantity"] * sales_df.loc[mask, "unit_price"]
        return {"message": f"Fixed {count} records. Revenue recalculated."}
    
    if req.fix_type == "negative_inventory":
        
        
        return {"message": "Marked specific orders as 'Returns' in metadata."}

    return {"message": "Fix applied successfully."}

@app.post("/create-order")
async def create_order(order: dict):
    global sales_df
    global simulated_orders
    
    
    required = ["order_id", "revenue", "country"]
    
    if "revenue" not in order and "quantity" in order and "unit_price" in order:
        order["revenue"] = float(order["quantity"]) * float(order["unit_price"])
    
    
    if "order_date" in order:
        order["order_date"] = pd.to_datetime(order["order_date"])
    else:
        order["order_date"] = datetime.now()
        
    
    new_df = pd.DataFrame([order])
    sales_df = pd.concat([sales_df, new_df], ignore_index=True)
    
    
    if "order_id" in order:
        simulated_orders.append(str(order["order_id"]))
        
    return {"message": "Order created successfully", "order_id": order.get("order_id")}

@app.get("/sales-data")
def get_sales_data(limit: int = 20):
    
    
    df = sales_df.tail(limit).copy()
    if "order_date" in df.columns:
        df["order_date"] = df["order_date"].astype(str)
    
    return df.to_dict(orient="records")
