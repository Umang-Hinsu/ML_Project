from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from routes.prediction import router as prediction_router
from routes.dashboard import router as dashboard_router
from services.prediction_service import prediction_service

app = FastAPI(
    title="CrediGuard AI - Loan Default Prediction API",
    description="Production REST API for Real-Time Machine Learning Loan Default & Risk Assessment",
    version="1.0.0"
)

# Robust CORS Configuration for both local development and live production
allowed_origins_env = os.environ.get("ALLOWED_ORIGINS", "*")
if allowed_origins_env == "*" or not allowed_origins_env.strip():
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    allowed_origins = [orig.strip() for orig in allowed_origins_env.split(",") if orig.strip()]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(prediction_router)
app.include_router(dashboard_router)

@app.get("/", tags=["Root"])
async def root():
    return {
        "service": "CrediGuard AI - Loan Default Prediction API",
        "status": "online",
        "health": "/api/health",
        "docs": "/docs"
    }

@app.get("/api/health", tags=["Health"])
async def health_check():
    is_model_ready = len(prediction_service.models) > 0 and prediction_service.pipeline is not None
    return {
        "status": "healthy",
        "service": "CrediGuard AI Loan Default Prediction API",
        "version": "1.0.0",
        "modelLoaded": is_model_ready,
        "selectedModel": "Logistic Regression",
        "availableModels": list(prediction_service.models.keys()),
        "metricsAvailable": prediction_service.metrics is not None,
        "pipelineReady": prediction_service.pipeline is not None,
        "loadErrors": prediction_service.load_errors
    }


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    is_dev = os.environ.get("ENVIRONMENT", "development").lower() == "development"
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=is_dev)

