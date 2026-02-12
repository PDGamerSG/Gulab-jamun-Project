import pandas as pd

sales_df = pd.read_parquet("fact_sales.parquet")
shipment_df = pd.read_parquet("fact_shipment.parquet")

sales_df["order_date"] = pd.to_datetime(sales_df["order_date"])

monthly_revenue = (
    sales_df.groupby(sales_df["order_date"].dt.to_period("M"))["revenue"]
    .sum()
)

print("\nMonthly Revenue:")
print(monthly_revenue)

country_revenue = sales_df.groupby("country")["revenue"].sum()

print("\nRevenue by Country:")
print(country_revenue)

purchase_frequency = sales_df.groupby("customer_id")["order_id"].nunique()

print("\nCustomer Purchase Frequency:")
print(purchase_frequency.head())

delivery_status = shipment_df["delivery_status"].value_counts()

print("\nDelivery Performance:")
print(delivery_status)
