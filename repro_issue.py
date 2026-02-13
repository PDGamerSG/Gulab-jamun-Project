import requests
import time

BASE_URL = "http://localhost:8000"

def check_revenue():
    try:
        resp = requests.get(f"{BASE_URL}/monthly-revenue")
        print(f"Revenue Status: {resp.status_code}")
        if resp.status_code == 200:
            print(f"Keys: {list(resp.json().keys())[-3:]}") # Print last 3 keys
        else:
            print(f"Error: {resp.text}")
    except Exception as e:
        print(f"Request failed: {e}")

print("--- Initial State ---")
check_revenue()

for i in range(1, 4):
    print(f"\n--- Simulating Order {i} ---")
    resp = requests.post(f"{BASE_URL}/simulate-order")
    print(f"Simulate Status: {resp.status_code}")
    
    print(f"--- Checking Revenue after Order {i} ---")
    check_revenue()
    time.sleep(1)
