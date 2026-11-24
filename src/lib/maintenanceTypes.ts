export interface PartInfo {
  part_name?: string;
  manufacturer?: string;
  part_number?: string;
  confidence?: number;
  model_used?: string;
  category?: string;
  subcategory?: string;
  condition?: string;
  condition_details?: string;
  description?: string;
  search_terms?: string[];
  specifications?: {
    dimensions?: string;
    pressure_rating?: string;
    connection_type?: string;
  };
}

export interface Recommendation {
  action?: string;
  steps?: string[];
  summary?: string;
  part_recognition?: PartInfo;
}

export interface MaintenanceDetail {
  request_id: string;
  urgency: string;
  timestamp: string;
  status: string;
  location?: string;
  machine_id?: string;
  technician_notes?: string;
  part_info?: PartInfo;
  recommendation?: Recommendation;
  warranty_status?: { has_warranty: boolean; recommendation?: string };
  invoice_history?: { supplier: string; amount: number; date: string }[];
}
