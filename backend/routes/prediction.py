from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Literal, Optional
from services.prediction_service import prediction_service

router = APIRouter(prefix="/api", tags=["Prediction"])

class LoanApplicationInput(BaseModel):
    Age: int = Field(..., ge=18, le=100, description="Applicant age in years (18-100)")
    Income: float = Field(..., ge=0, description="Annual gross income in USD")
    LoanAmount: float = Field(..., ge=0, description="Requested loan principal amount in USD")
    CreditScore: int = Field(..., ge=300, le=850, description="FICO/Credit score (300-850)")
    MonthsEmployed: int = Field(..., ge=0, description="Total months employed")
    NumCreditLines: int = Field(..., ge=0, description="Number of active credit lines")
    InterestRate: float = Field(..., ge=0.0, le=100.0, description="Loan interest rate percentage")
    LoanTerm: int = Field(..., ge=1, le=360, description="Loan repayment duration in months")
    DTIRatio: float = Field(..., ge=0.0, le=1.0, description="Debt-to-Income ratio (0.0 to 1.0)")
    Education: Literal["Bachelor's", "Master's", "High School", "PhD"] = Field(..., description="Highest level of education")
    EmploymentType: Literal["Full-time", "Unemployed", "Self-employed", "Part-time"] = Field(..., description="Employment category")
    MaritalStatus: Literal["Divorced", "Married", "Single"] = Field(..., description="Marital status")
    HasMortgage: Literal["Yes", "No"] = Field(..., description="Has existing mortgage")
    HasDependents: Literal["Yes", "No"] = Field(..., description="Has financial dependents")
    LoanPurpose: Literal["Other", "Auto", "Business", "Home", "Education"] = Field(..., description="Stated purpose of loan")
    HasCoSigner: Literal["Yes", "No"] = Field(..., description="Has a creditworthy co-signer")
    selected_model: Optional[Literal[
        "Logistic Regression",
        "Decision Tree",
        "Support Vector Classifier (SVC)",
        "K-Nearest Neighbors (KNN)",
        "Naive Bayes"
    ]] = Field("Logistic Regression", description="Selected ML classification model")

@router.post("/prediction")
async def predict_loan_default(input_data: LoanApplicationInput):
    """
    POST /api/prediction
    Evaluates loan applicant risk using selected ML model from 5 available classification models.
    """
    try:
        data_dict = input_data.model_dump()
        selected_model_name = data_dict.pop("selected_model", "Logistic Regression")
        result = prediction_service.predict(data_dict, selected_model_name=selected_model_name)
        return result
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error during prediction: {str(e)}")
