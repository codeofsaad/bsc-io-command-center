# Boston Scientific IO Unified Command Center

## Tableau Dashboard Extension

This project includes a Tableau Dashboard Extension that embeds the IO Command Center directly inside Tableau Desktop/Cloud dashboards.

### Quick Start

1. **Start the local server:**
   ```bash
   cd boston_scientific_io_command_center
   python serve.py
   ```

2. **Add to Tableau Desktop:**
   - Open Tableau Desktop
   - Create or open a dashboard
   - Drag an **Extension** object onto the dashboard canvas
   - Click **"Access Local Extensions"**
   - Browse to `tableau-extension/bsc_io_command_center.trex`
   - The IO Command Center will load inside the dashboard

### File Structure

```
boston_scientific_io_command_center/
├── index.html                  # Dashboard/Overview page
├── clinical-trials.html        # Clinical Trials page
├── metrics.html                # Commercial Metrics page
├── logistics.html              # Supply Chain & Logistics page
├── patient-outcomes.html       # Patient Outcomes page
├── shared.js                   # Agentforce panel logic
├── boston-scientific-logo.png   # BSC logo
├── serve.py                    # Local HTTP server
├── tableau-extension/
│   ├── bsc_io_command_center.trex   # Tableau extension manifest
│   └── extension.html               # Extension wrapper/loader
├── data/                       # Original datasets
│   ├── logistics_dose_tracking.csv
│   ├── commercial_portfolio.csv
│   ├── clinical_trials.csv
│   ├── patient_outcomes.csv
│   └── supply_chain_inventory.csv
└── data_v2/                    # KPI-matched datasets for Tableau Cloud
    ├── logistics_dose_tracking.csv
    ├── commercial_portfolio.csv
    ├── clinical_trials.csv
    ├── patient_outcomes.csv
    └── supply_chain_inventory.csv
```

### Datasets

The `data_v2/` folder contains CSV files whose aggregated metrics exactly match the KPIs displayed in the HTML dashboards. Upload these to Tableau Cloud as data sources for Pulse metrics and Tableau Agent queries.

### For Tableau Cloud Publishing

1. Upload the 5 CSVs from `data_v2/` as published data sources
2. Create Pulse metrics pointing to the relevant measures
3. Use Tableau Agent to ask questions against the data (e.g., "Which accounts have dropping TheraSphere volumes?")
