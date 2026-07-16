from typing import Literal
from pydantic import BaseModel, Field

class ScopeItem(BaseModel):
    name: str = Field(description="Short name, e.g. 'Website redesign'")
    description: str = Field(description="What was discussed about this item")
    confidence: Literal["high", "medium", "low"] = Field(
        description="How clearly this was stated in the transcript"
    )

class Deliverable(BaseModel):
    name: str
    description: str

class ExtractionResult(BaseModel):
    scope_items: list[ScopeItem]
    deliverables: list[Deliverable]
    timeline_signals: list[str]
    budget_signals: list[str]
    open_questions: list[str] = Field(
        description="Anything ambiguous or unresolved. PREFER adding here over guessing."
    )
    project_summary: str = Field(description="2-3 sentence summary")
