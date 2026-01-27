

## Plan: Add Surgical Equipment Products from Pharmoo World Website

### Overview
Add 12 new surgical equipment products from the existing pharmooworld.com website to the database catalog, including product images, detailed specifications, and pricing.

### Products to Add

Based on the scraped data from https://www.pharmooworld.com/surgical-supply.html, I'll add the following products:

| Product Name | Price | Category | Key Specifications |
|-------------|-------|----------|-------------------|
| ETHICON 6R45B | $900.00/Box | Hospital Supplies | Endopath ETS Articulating Linear Cutter Reload 45.0mm x 3.5mm |
| Covidien V-Loc 180 Wound Closure Device | $200.99/Box | Hospital Supplies | Wound closure, absorption complete within 180 days |
| ETHICON ECR45D | $1,000.00/Box | Hospital Supplies | Echelon Endopath Stapler Reloads, single-patient-use |
| ETHICON ECR60D | $1,300.00/Box | Hospital Supplies | Endopath 60MM Stapler Reload 3.8MM, 6 Row, Gold |
| COVIDIEN EGIA45AVM | $700.00/Box | Medical Devices | Endo GIA Articulating Vascular/Medium Tri-Staple Reload 45.0mm |
| COVIDIEN ILA 3971 | $100.00/Box of 6 | Hospital Supplies | ILA Auto Suture Loading Unit, Blue, 100MM - 3.8MM |
| ETHICON ECR45W | $750.00/Box | Hospital Supplies | Echelon Endopath Stapler, White |
| Covidien V-LOC 180 VLOCL0614 | $250.00/Box | Hospital Supplies | V-Loc wound closure device variant |
| COVIDIEN SUTURE VLOCM1904 | $200.00/Box | Hospital Supplies | Absorbable suture device |
| COVIDIEN VLOCL0804 | $300.00/Box of 12 | Hospital Supplies | V-Loc wound closure device variant |

### Implementation Steps

**Step 1: Database Migration - Insert New Products**

I'll create a database migration to insert all 12 surgical equipment products with:
- Product names and slugs
- Detailed descriptions
- Pricing (regular and bulk)
- Image URLs from the original website
- Specifications (dosage/size, form, manufacturer)
- Regulatory status
- Category assignment (Hospital Supplies or Medical Devices)

**Step 2: Image URLs**

Products will use the original image URLs from pharmooworld.com:
- `https://www.pharmooworld.com/assets/images/ethicon-6r45b-600x546.jpg`
- `https://www.pharmooworld.com/assets/images/s-l1600-600x450.jpg`
- `https://www.pharmooworld.com/assets/images/ethicon-ecr45d-box-600x600.jpg`
- `https://www.pharmooworld.com/assets/images/ethicon-ecr60d-box-600x564.jpg`
- `https://www.pharmooworld.com/assets/images/covidien-egia45avm-single-600x450.jpg`
- `https://www.pharmooworld.com/assets/images/covidien-ila-3971-box-600x400.jpg`
- And more...

### Technical Details

**Database Insert Query Structure:**
```sql
INSERT INTO public.products (
  name, slug, description, category_id, 
  price, bulk_price, bulk_min_quantity,
  dosage, form, manufacturer, origin, 
  regulatory_status, shelf_life, in_stock, image_url
) VALUES (...)
```

**Category Assignments:**
- Surgical staplers and reloads: Hospital Supplies (ID: 5d71f102-3aeb-41f6-85d0-5b75db760211)
- Endo GIA devices: Medical Devices (ID: dbcb6403-f949-4d59-a8d9-ecb4fc968420)
- Wound closure devices/sutures: Hospital Supplies

**Bulk Pricing Strategy:**
- 15% discount for orders of 10+ units (consistent with existing products)

### Expected Outcome

After implementation:
- 12 new surgical equipment products visible in the catalog
- Products properly categorized under Hospital Supplies and Medical Devices
- All products include images, pricing, and detailed specifications
- Products searchable and filterable in the products page
- Bulk pricing available for wholesale orders

