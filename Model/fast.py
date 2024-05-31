from fastapi import FastAPI, Form, Request
from fastapi.responses import JSONResponse
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import pickle

app = FastAPI()

# Load model
with open('xgboost_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Load the dataset upfront for fitting LabelEncoders
df = pd.read_csv("Moubawab.csv")

# Initialize LabelEncoders
le_lieu = LabelEncoder()
le_type = LabelEncoder()

# Fit LabelEncoders with data
le_lieu.fit(df['Lieu'])
le_type.fit(df['Type'])

# Get unique locations and types
lieux = le_lieu.classes_
types = le_type.classes_

templates = Jinja2Templates(directory="templates")

# Add CORS middleware
origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://127.0.0.1:4200",
    "http://127.0.0.1:4200/predict-api"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "lieux": lieux, "types": types})

@app.post("/predict", response_class=HTMLResponse)
async def predict(request: Request, lieu: str = Form(...), concierge: int = Form(...), security_system: int = Form(...), 
                  garden: int = Form(...), pool: int = Form(...), heating: int = Form(...), 
                  equipped_kitchen: int = Form(...), type: str = Form(...), num_bedrooms: int = Form(...), 
                  surface: int = Form(...)):
    # Preprocess data (encode categorical features)
    lieu_enc = le_lieu.transform([lieu])[0]
    type_enc = le_type.transform([type])[0]

    # Create input dataframe
    input_data = pd.DataFrame({
        'Lieu': [lieu_enc],
        'Concierge': [concierge],
        'Secutity_System': [security_system],
        'Garden': [garden],
        'Pool': [pool],
        'Heating': [heating],
        'Equipped_Kitchen': [equipped_kitchen],
        'Type': [type_enc],
        'Num_Bedrooms': [num_bedrooms],
        'Surface': [surface],
        'Avg_Price_Per_Surface': 4000
    })

    # Predict price
    prediction = model.predict(input_data)[0]
    prediction = round_to_nearest_10000(prediction)  # Round to nearest 10,000

    return templates.TemplateResponse("index.html", {"request": request, "prediction": prediction, "lieux": lieux, "types": types})

def round_to_nearest_10000(x):
    return round(x / 10000) * 10000

@app.post("/predict-api")
async def predict_api(data: dict):
    # Extract features from JSON data
    lieu = data['lieu']
    concierge = int(data['concierge'])
    security_system = int(data['security_system'])
    garden = int(data['garden'])
    pool = int(data['pool'])
    heating = int(data['heating'])
    equipped_kitchen = int(data['equipped_kitchen'])
    type = data['type']
    num_bedrooms = int(data['num_bedrooms'])
    surface = int(data['surface'])

    # Preprocess data (encode categorical features)
    lieu_enc = le_lieu.transform([lieu])[0]
    type_enc = le_type.transform([type])[0]

    # Create input dataframe
    input_data = pd.DataFrame({
        'Lieu': [lieu_enc],
        'Concierge': [concierge],
        'Secutity_System': [security_system],
        'Garden': [garden],
        'Pool': [pool],
        'Heating': [heating],
        'Equipped_Kitchen': [equipped_kitchen],
        'Type': [type_enc],
        'Num_Bedrooms': [num_bedrooms],
        'Surface': [surface],
        'Avg_Price_Per_Surface': 4000
    })

    # Predict price
    prediction = model.predict(input_data)[0]
    prediction = round_to_nearest_10000(prediction)  # Round to nearest 10,000

    # Return prediction as JSON
    return JSONResponse(content={'prediction': prediction})

if __name__ == '__main__':
     import uvicorn
     uvicorn.run(app, port=4200)
