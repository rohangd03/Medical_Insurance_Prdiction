import json
import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn import metrics
from sklearn.metrics import mean_squared_error

# Loading the dataset
dataset = pd.read_csv('data_insurance.csv')

dataset.replace({'sex': {'male': 0, 'female': 1}}, inplace = True)
dataset.replace({'smoker': {'yes': 1, 'no': 0}}, inplace = True)
dataset.replace({'region': {'southeast': 0, 'southwest': 1, 'northeast': 2, 'northwest': 3}}, inplace = True)

X = dataset.drop(columns = 'charges', axis = 1)
Y = dataset['charges']

xTrain, xTest, yTrain, yTest = train_test_split(X, Y, test_size = 0.2, random_state = 2)

# Loading the Linear regression model
regressor = LinearRegression()
regressor.fit(xTrain, yTrain)

# Prediction on TRAINING DATA

training_prediction = regressor.predict(xTrain)

yPrediction = regressor.predict(xTest)

# Retrieve model coefficients and intercept
coefficients = regressor.coef_
intercept = regressor.intercept_

# Create a DataFrame for easier interpretation
feature_names = X.columns
coef_df = pd.DataFrame({'Feature': feature_names, 'Coefficient': coefficients})


# Define model coefficients
model_coefficients = {
    "intercept": float(intercept),
    "coefficients": {feature: float(coef) for feature, coef in zip(feature_names, coefficients)}
}

# Define the filename for the JSON file
filename = 'model_coefficients.json'
file_path = os.path.join(os.path.dirname(__file__), filename)


# Write the coefficients to a JSON file
with open(file_path, 'w') as file:
    json.dump(model_coefficients, file, indent=4)