import pandas as pd
import random






























































shipment_df1 = pd.read_csv("clean_shipment.csv")
shipment_df1.to_parquet("fact_shipment.parquet", index=False)
print("✅ Clean fact_shipment.parquet created")

check_df = pd.read_parquet("fact_shipment.parquet")
print(check_df.columns)
