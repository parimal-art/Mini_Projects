import pandas as pd

print("=== Weekend Getaway Ranker ===")

# Load the CSV file
data = pd.read_csv("/content/Top Indian Places to Visit.csv")

# Rename columns for easier access
data = data.rename(columns={
    "Name": "Destination",
    "Google review rating": "Rating",
    "Number of google review in lakhs": "Popularity"
})

# Select required columns and remove missing values
data = data[["Destination", "City", "Rating", "Popularity"]].dropna()

# Convert Rating and Popularity to numeric values
data["Rating"] = pd.to_numeric(data["Rating"], errors="coerce")
data["Popularity"] = pd.to_numeric(data["Popularity"], errors="coerce")

# Remove rows with invalid numeric data
data = data.dropna()

# Normalize city names (remove spaces and convert to lowercase)
data["City"] = data["City"].str.strip().str.lower()

# Take user input
source_city = input("Enter source city: ").strip().lower()

# Filter data based on city
city_data = data[data["City"] == source_city].copy()

if city_data.empty:
    print("No data found for the entered city.")
else:
    # Calculate score using weighted formula
    city_data["Score"] = (
        city_data["Rating"] * 0.7 +
        city_data["Popularity"] * 0.3
    )

    # Sort destinations by score
    result = city_data.sort_values(by="Score", ascending=False)

    print("\nTop Weekend Destinations:\n")
    print(
        result[["Destination", "Rating", "Popularity"]]
        .head(5)
        .to_string(index=False)
    )
