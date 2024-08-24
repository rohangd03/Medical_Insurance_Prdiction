// Function to fetch model coefficients from JSON file
async function fetchModelCoefficients() {
    const response = await fetch('model_coefficients.json');
    const data = await response.json();
    return data;
}

// Function to predict charges
async function predictCharges() {
    // Get input values
    var age = parseFloat(document.getElementById('age').value);
    var sex = parseInt(document.getElementById('sex').value);
    var bmi = parseFloat(document.getElementById('bmi').value);
    var children = parseInt(document.getElementById('children').value);
    var smoker = parseInt(document.getElementById('smoker').value);
    var region = parseInt(document.getElementById('region').value);

    // Validate inputs
    if (isNaN(age) || age <= 0) {
        displayError("Please enter a valid age greater than 0.");
        return;
    }

    if (isNaN(bmi) || bmi <= 0) {
        displayError("Please enter a valid BMI greater than 0.");
        return;
    }

    if (isNaN(children) || children < 0) {
        displayError("Please enter a valid number of children (0 or more).");
        return;
    }

    if (![0, 1].includes(sex)) {
        displayError("Please select a valid sex (0 for Male, 1 for Female).");
        return;
    }

    if (![0, 1].includes(smoker)) {
        displayError("Please select a valid smoker status (0 for No, 1 for Yes).");
        return;
    }

    if (![0, 1, 2, 3].includes(region)) {
        displayError("Please select a valid region (0: Southeast, 1: Southwest, 2: Northeast, 3: Northwest).");
        return;
    }

    // Fetch model coefficients
    try {
        const model = await fetchModelCoefficients();
        var intercept = model.intercept;
        var coefficients = model.coefficients;

        // Calculate prediction
        var predictedCharges = intercept +
            coefficients.age * age +
            coefficients.sex * sex +
            coefficients.bmi * bmi +
            coefficients.children * children +
            coefficients.smoker * smoker +
            coefficients.region * region;

        // Display the result
        document.getElementById('result').innerHTML = `<strong>Predicted Medical Charges:</strong> $${predictedCharges.toFixed(2)}`;
    } catch (error) {
        displayError("An error occurred while fetching the model coefficients. Please try again.");
        console.error("Error fetching model coefficients:", error);
    }
}

// Function to display error messages
function displayError(message) {
    document.getElementById('result').innerHTML = `<span style="color: red;">${message}</span>`;
}
