# Weekend Getaway Ranker

## 📌 About the Project

Planning a short weekend trip can be confusing when there are too many places to choose from. This project, **Weekend Getaway Ranker**, is a simple Python program that helps you find the **best places to visit in a city** using real-world data.

The program uses Google review ratings and popularity to rank tourist destinations and suggests the **top 5 weekend spots** for a given city.

---

## 🎯 Objective

The main goal of this project is to:

* Practice data cleaning and analysis using Python
* Work with a real and large dataset
* Apply basic logic to rank items based on multiple factors
* Build a beginner-friendly, practical mini project

---

## 🛠️ Technologies Used

* **Python 3**
* **Pandas** library

---

## 📁 Folder Structure

```
Task-4/
│
├── app.py                     # Main Python file
├── requirements.txt           # Required Python libraries
├── output.txt                 # Sample outputs of the program
└── content/
    └── Top Indian Places to Visit.csv   # Dataset file
```

---

## 📊 Dataset Information

The dataset contains information about popular tourist destinations across India. Some of the important columns used in this project are:

* Destination Name
* City
* Google Review Rating
* Number of Google Reviews (in lakhs)

This data helps in fairly ranking the places for weekend travel.

---

## ⚙️ How the Ranking Logic Works

Each destination is assigned a score using the formula below:

```
Score = (Google Rating × 0.7) + (Popularity × 0.3)
```

* Ratings are given higher importance
* Popularity adds additional weight to well-known places

The destinations are then sorted based on this score.

---

## ▶️ How to Run the Project

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Run the Program

```bash
python app.py
```

### Step 3: Enter City Name

When prompted, enter a city name (for example: `mumbai`, `kolkata`, `bangalore`).

The city name is **not case-sensitive**.

---

## 🖥️ Sample Output

### Example: Mumbai

```
Top Weekend Destinations:
Gateway of India                    Rating: 4.6  Popularity: 3.60
Siddhivinayak Temple                Rating: 4.8  Popularity: 1.05
Marine Drive                        Rating: 4.5  Popularity: 1.50
Mahalaxmi Temple                    Rating: 4.7  Popularity: 0.33
Chhatrapati Shivaji Maharaj Museum  Rating: 4.6  Popularity: 0.34
```

More sample outputs are available in the `output.txt` file.

---

## ✨ Key Features

* Uses real tourist data
* Handles missing and invalid values safely
* Case-insensitive city search
* Simple and easy-to-understand logic
* Suitable for beginners

---

## 📦 Requirements

```
pandas
```

---

## 🔮 Future Improvements

* Add distance-based filtering
* Show results using graphs or charts
* Convert this program into a web application
* Allow multiple city comparisons

---

## ✅ Conclusion

This project shows how Python and Pandas can be used to analyze real-world data and convert it into meaningful recommendations. It is a small but practical project that helps strengthen basic data analysis and programming concepts.


