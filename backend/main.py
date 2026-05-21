"""
Raw Ritual — FastAPI Backend
Run:  uvicorn main:app --reload
Docs: http://localhost:8000/docs
"""

from __future__ import annotations

import os
from typing import Literal, Optional
from datetime import datetime

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

load_dotenv()


# ── Settings ──────────────────────────────────────────────────────────────────

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_env: str = "development"
    app_host: str = "0.0.0.0"
    app_port: int = 8000
    cors_origins: str = "http://localhost:5173"

    @property
    def allowed_origins(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",")]


settings = Settings()


# ── App ───────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="Raw Ritual API",
    description="Backend API for Raw Ritual wellness brand",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── In-memory data (swap with DB later) ───────────────────────────────────────

PRODUCTS: list[dict] = [
    {
        "id": "dark-honey-protein-bar",
        "slug": "dark-honey-protein-bar",
        "name": "Dark Honey Protein Bar",
        "category": "bars",
        "category_label": "Protein Bars",
        "price": 4.50,
        "rating": 4.9,
        "review_count": 142,
        "tagline": "Raw cacao · Wildflower honey · 18g protein",
        "description": "Our flagship bar — crafted from cold-pressed dark cacao, raw wildflower honey, "
                       "and sprouted brown rice protein. Zero refined sugar, zero fillers.",
        "image": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80",
        "featured": True,
        "in_stock": True,
        "nutrition": {"calories": 240, "protein": "18g", "carbs": "24g", "fat": "9g"},
    },
    {
        "id": "vanilla-almond-bar",
        "slug": "vanilla-almond-bar",
        "name": "Vanilla Almond Bar",
        "category": "bars",
        "category_label": "Protein Bars",
        "price": 4.50,
        "rating": 4.7,
        "review_count": 98,
        "tagline": "Madagascar vanilla · Activated almonds · 17g protein",
        "description": "Fragrant Madagascan vanilla bean paste meets crunchy activated almonds.",
        "image": "https://images.unsplash.com/photo-1571748982800-fa51082c2224?auto=format&fit=crop&w=900&q=80",
        "featured": True,
        "in_stock": True,
        "nutrition": {"calories": 230, "protein": "17g", "carbs": "22g", "fat": "10g"},
    },
    {
        "id": "raw-wildflower-honey",
        "slug": "raw-wildflower-honey",
        "name": "Raw Wildflower Honey",
        "category": "honey",
        "category_label": "Raw Honey",
        "price": 18.00,
        "rating": 5.0,
        "review_count": 211,
        "tagline": "Cold-extracted · Unfiltered · 340g",
        "description": "Unfiltered, cold-extracted honey from a single Pacific Northwest apiary.",
        "image": "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=900&q=80",
        "featured": True,
        "in_stock": True,
        "nutrition": {"calories": 60, "protein": "0g", "carbs": "17g", "fat": "0g"},
    },
    {
        "id": "infused-cacao-honey",
        "slug": "infused-cacao-honey",
        "name": "Infused Cacao Honey",
        "category": "honey",
        "category_label": "Raw Honey",
        "price": 22.00,
        "rating": 4.8,
        "review_count": 74,
        "tagline": "Wildflower honey · Ecuadorian cacao nibs · 300g",
        "description": "Our wildflower honey slow-infused with whole Ecuadorian cacao nibs.",
        "image": "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80",
        "featured": False,
        "in_stock": True,
        "nutrition": {"calories": 65, "protein": "0g", "carbs": "17g", "fat": "0.5g"},
    },
    {
        "id": "activated-cashews",
        "slug": "activated-cashews",
        "name": "Activated Cashews",
        "category": "nuts",
        "category_label": "Activated Nuts",
        "price": 14.00,
        "rating": 4.8,
        "review_count": 89,
        "tagline": "Soaked · Dehydrated · Himalayan salt · 200g",
        "description": "Whole cashews soaked 12h, dehydrated low-and-slow, finished with Himalayan salt.",
        "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
        "featured": False,
        "in_stock": True,
        "nutrition": {"calories": 175, "protein": "5g", "carbs": "9g", "fat": "14g"},
    },
    {
        "id": "spiced-activated-almonds",
        "slug": "spiced-activated-almonds",
        "name": "Spiced Activated Almonds",
        "category": "nuts",
        "category_label": "Activated Nuts",
        "price": 13.00,
        "rating": 4.6,
        "review_count": 55,
        "tagline": "Cinnamon · Cayenne · Raw honey · 200g",
        "description": "Activated almonds lightly coated in raw honey, Ceylon cinnamon, and cayenne.",
        "image": "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80",
        "featured": True,
        "in_stock": True,
        "nutrition": {"calories": 170, "protein": "6g", "carbs": "11g", "fat": "12g"},
    },
    {
        "id": "ritual-amber-candle",
        "slug": "ritual-amber-candle",
        "name": "Ritual Amber Candle",
        "category": "candles",
        "category_label": "Botanical Candles",
        "price": 38.00,
        "rating": 4.9,
        "review_count": 67,
        "tagline": "Beeswax · Amber · Cedarwood · 200g",
        "description": "Pure beeswax infused with Moroccan amber resin, cedarwood, and black pepper.",
        "image": "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?auto=format&fit=crop&w=900&q=80",
        "featured": False,
        "in_stock": True,
        "nutrition": None,
    },
    {
        "id": "forest-smoke-candle",
        "slug": "forest-smoke-candle",
        "name": "Forest Smoke Candle",
        "category": "candles",
        "category_label": "Botanical Candles",
        "price": 38.00,
        "rating": 4.7,
        "review_count": 43,
        "tagline": "Beeswax · Vetiver · Smoked birch · 200g",
        "description": "Dark and atmospheric — vetiver, smoked birch, and a whisper of pine resin.",
        "image": "https://images.unsplash.com/photo-1574621100236-d25b64527e41?auto=format&fit=crop&w=900&q=80",
        "featured": False,
        "in_stock": True,
        "nutrition": None,
    },
]

# In-memory newsletter list (replace with DB later)
newsletter_subscribers: list[str] = []

# In-memory contact submissions
contact_submissions: list[dict] = []


# ── Pydantic schemas ───────────────────────────────────────────────────────────

class ProductOut(BaseModel):
    id: str
    slug: str
    name: str
    category: str
    category_label: str
    price: float
    rating: float
    review_count: int
    tagline: str
    description: str
    image: str
    featured: bool
    in_stock: bool
    nutrition: Optional[dict] = None


class ContactIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    subject: str = Field(min_length=2, max_length=120)
    message: str = Field(min_length=10, max_length=2000)

    @field_validator("name")
    @classmethod
    def name_no_html(cls, v: str) -> str:
        if "<" in v or ">" in v:
            raise ValueError("Invalid characters in name")
        return v.strip()


class ContactOut(BaseModel):
    ok: bool
    message: str
    submitted_at: str


class NewsletterIn(BaseModel):
    email: EmailStr


class NewsletterOut(BaseModel):
    ok: bool
    message: str


class CartItem(BaseModel):
    slug: str
    quantity: int = Field(ge=1, le=99)


class CartIn(BaseModel):
    items: list[CartItem]


class CartOut(BaseModel):
    items: list[dict]
    subtotal: float
    item_count: int


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/", tags=["Health"])
def root():
    return {"status": "ok", "service": "Raw Ritual API", "version": "0.1.0"}


@app.get("/api/products", response_model=list[ProductOut], tags=["Products"])
def list_products(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    in_stock: Optional[bool] = None,
):
    """Return all products, with optional filters."""
    result = PRODUCTS
    if category and category != "all":
        result = [p for p in result if p["category"] == category]
    if featured is not None:
        result = [p for p in result if p["featured"] == featured]
    if in_stock is not None:
        result = [p for p in result if p["in_stock"] == in_stock]
    return result


@app.get("/api/products/{slug}", response_model=ProductOut, tags=["Products"])
def get_product(slug: str):
    """Return a single product by slug."""
    product = next((p for p in PRODUCTS if p["slug"] == slug), None)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Product '{slug}' not found")
    return product


@app.get("/api/categories", tags=["Products"])
def list_categories():
    """Return all available product categories."""
    seen: set[str] = set()
    categories = [{"id": "all", "label": "All Products"}]
    for p in PRODUCTS:
        if p["category"] not in seen:
            seen.add(p["category"])
            categories.append({"id": p["category"], "label": p["category_label"]})
    return categories


@app.post("/api/cart/preview", response_model=CartOut, tags=["Cart"])
def preview_cart(cart: CartIn):
    """Calculate cart totals without processing payment."""
    result_items = []
    subtotal = 0.0

    for item in cart.items:
        product = next((p for p in PRODUCTS if p["slug"] == item.slug), None)
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product '{item.slug}' not found",
            )
        line_total = product["price"] * item.quantity
        subtotal += line_total
        result_items.append({
            "slug": product["slug"],
            "name": product["name"],
            "price": product["price"],
            "quantity": item.quantity,
            "line_total": round(line_total, 2),
            "image": product["image"],
        })

    return CartOut(
        items=result_items,
        subtotal=round(subtotal, 2),
        item_count=sum(i.quantity for i in cart.items),
    )


@app.post("/api/contact", response_model=ContactOut, tags=["Contact"])
def submit_contact(body: ContactIn):
    """Accept a contact form submission."""
    submission = {
        "name": body.name,
        "email": body.email,
        "subject": body.subject,
        "message": body.message,
        "submitted_at": datetime.utcnow().isoformat(),
    }
    contact_submissions.append(submission)

    # TODO: send email via SMTP when env vars are set

    return ContactOut(
        ok=True,
        message="Thank you — we'll reply within one business day.",
        submitted_at=submission["submitted_at"],
    )


@app.post("/api/newsletter", response_model=NewsletterOut, tags=["Newsletter"])
def subscribe_newsletter(body: NewsletterIn):
    """Subscribe an email address to the newsletter."""
    email = body.email.lower()
    if email in newsletter_subscribers:
        return NewsletterOut(ok=True, message="You're already subscribed.")
    newsletter_subscribers.append(email)
    return NewsletterOut(ok=True, message="Welcome to Raw Ritual.")


# ── Dev entry point ───────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.app_host,
        port=settings.app_port,
        reload=settings.app_env == "development",
    )
