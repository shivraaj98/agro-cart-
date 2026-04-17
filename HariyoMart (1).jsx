import { useState, useEffect, useRef, useCallback } from "react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  ShoppingCart, Heart, Search, Star, MapPin, Truck, Shield,
  Plus, X, Check, ArrowRight, Leaf, Zap, LogOut, Edit, Trash2,
  Eye, ShoppingBag, Users, DollarSign, Activity, ArrowUpRight,
  ArrowDownRight, CreditCard, Clock, RefreshCw, Award, Sprout,
  Flame, Smartphone, BarChart2, Menu, ChevronDown, Package,
  TrendingUp, ChevronLeft, ChevronRight, Navigation, Wifi,
  WifiOff, AlertCircle, Filter, SlidersHorizontal,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────────────────────── */
const T = {
  green:        "#2A5C45",
  greenLight:   "#4A8C6A",
  greenPale:    "#EAF4EE",
  greenDark:    "#1B3D2F",
  saffron:      "#D4700A",
  saffronLight: "#F5A623",
  red:          "#C41E3A",
  redDark:      "#8B0000",
  sky:          "#1A6B9A",
  skyLight:     "#E8F4FD",
  earth:        "#6B4226",
  dark:         "#161D10",
  surface:      "#FDFAF5",
  card:         "#FFFFFF",
  alt:          "#F5F0E8",
  border:       "#DDD0BE",
  borderLight:  "#EDE5D8",
  text:         "#1C1208",
  textMid:      "#4A3728",
  textMuted:    "#8A7060",
  gold:         "#C8A800",
  esewa:        "#60BB46",
  khalti:       "#5C2D91",
  ime:          "#1565C0",
  cod:          "#E65100",
  success:      "#2E7D32",
  danger:       "#C62828",
  warning:      "#E65100",
};

/* ─────────────────────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────────────────────── */
const CATEGORIES = [
  { id:"fv", name:"Fruits & Vegetables", np:"फलफूल तथा तरकारी", icon:"🥦", count:312 },
  { id:"sp", name:"Seeds & Plants",       np:"बीउ तथा बिरुवा",   icon:"🌱", count:178 },
  { id:"fp", name:"Fertilizers",          np:"मल तथा कीटनाशक",   icon:"🧪", count:134 },
  { id:"ft", name:"Farming Tools",         np:"कृषि औजार",        icon:"🔧", count:209 },
  { id:"la", name:"Livestock Care",        np:"पशुपालन",           icon:"🐄", count:87  },
  { id:"ir", name:"Irrigation",            np:"सिँचाई प्रविधि",   icon:"💧", count:56  },
  { id:"aa", name:"Agro Accessories",      np:"कृषि सहायक",       icon:"🧺", count:143 },
  { id:"or", name:"Organic",               np:"जैविक उत्पादन",   icon:"🌿", count:221 },
];

const PRODUCTS = [
  {
    id:1, name:"Jumli Marsi Rice (Organic)", np:"जुम्ली मर्सी चामल",
    cat:"fv", price:380, discount:10, stock:800, unit:"kg",
    seller:"Jumla Organic Cooperative", verified:true,
    location:"Jumla, Karnali", zone:"Remote Hill",
    rating:4.9, reviews:312, delivery:"5–8 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"Very High", season:"Post-Monsoon",
    tags:["organic","GI-tagged","premium"],
    desc:"Authentic Jumla Marsi rice grown at 2,500m altitude. GI-tagged, nutty flavor, zero chemicals.",
    features:["Grown at 2,500m","No chemicals","GI-tagged","Rich antioxidants"],
    specs:{"Variety":"Marsi","Altitude":"2,500m","Certification":"Organic Nepal","Moisture":"<14%"},
    img:"🌾", trending:true, flash:false,
    lat:29.27, lng:82.18,
  },
  {
    id:2, name:"Ilam Orthodox Tea (First Flush)", np:"इलाम चिया",
    cat:"fv", price:1200, discount:15, stock:250, unit:"250g",
    seller:"Ilam Tea Estate", verified:true,
    location:"Ilam, Province 1", zone:"Eastern Hill",
    rating:4.8, reviews:567, delivery:"3–5 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"High", season:"Spring",
    tags:["premium","export-quality","orthodox"],
    desc:"World-class first-flush Ilam orthodox tea. Hand-picked by skilled farmers at 1,600m.",
    features:["First flush spring harvest","Hand-rolled orthodox","Muscatel character"],
    specs:{"Grade":"SFTGFOP1","Estate":"Kanyam","Altitude":"1,600m","Net Weight":"250g"},
    img:"🍃", trending:true, flash:true,
    lat:26.91, lng:87.92,
  },
  {
    id:3, name:"Mustang Apple (Himalayan)", np:"मुस्ताङ्ग स्याउ",
    cat:"fv", price:180, discount:5, stock:1200, unit:"kg",
    seller:"Mustang Apple Growers Assoc.", verified:true,
    location:"Mustang, Gandaki", zone:"Mountain",
    rating:4.7, reviews:445, delivery:"4–6 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"Very High", season:"Autumn",
    tags:["himalayan","sweet","fresh","seasonal"],
    desc:"Crispy sweet apples from Mustang valley. Grown at 3,000m, cold-stored in mountain caves.",
    features:["Mountain cold-stored","No wax coating","Crispy & sweet"],
    specs:{"Variety":"Fuji/Golden","Altitude":"3,000m","Size":"70–90mm"},
    img:"🍎", trending:true, flash:false,
    lat:28.99, lng:83.87,
  },
  {
    id:4, name:"Chitwan Organic Tomato", np:"चितवन जैविक गोलभेडा",
    cat:"fv", price:65, discount:0, stock:8, unit:"kg",
    seller:"Bharatpur Agri Hub", verified:true,
    location:"Chitwan, Bagmati", zone:"Terai",
    rating:4.5, reviews:289, delivery:"1–2 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"High", season:"Winter & Spring",
    tags:["fresh","local","organic","terai"],
    desc:"Farm-fresh organic tomatoes from Chitwan. Harvested daily, delivered within 24 hours.",
    features:["Harvested daily","Zero pesticide","High lycopene","Year-round"],
    specs:{"Type":"Hybrid Tomato","District":"Chitwan","Grade":"A1"},
    img:"🍅", trending:false, flash:true,
    lat:27.53, lng:84.35,
  },
  {
    id:5, name:"Palpa Hill Lemon", np:"पाल्पा कागती",
    cat:"fv", price:90, discount:10, stock:600, unit:"dozen",
    seller:"Palpa Citrus Farm", verified:false,
    location:"Palpa, Lumbini", zone:"Mid-Hill",
    rating:4.3, reviews:134, delivery:"3–4 days",
    cod:true, esewa:true, khalti:false, mobile:true,
    demand:"Medium", season:"Year-round",
    tags:["hill-grown","tangy","natural"],
    desc:"Juicy hill lemons from Palpa slopes. Thick skin and very high juice content.",
    features:["High juice yield","Thick skin","No artificial ripening"],
    specs:{"Variety":"Kagati Hill","Size":"Medium","District":"Palpa"},
    img:"🍋", trending:false, flash:false,
    lat:27.86, lng:83.55,
    outOfStock:true,
  },
  {
    id:6, name:"Katahar (Jackfruit) Fresh", np:"कटहर",
    cat:"fv", price:120, discount:0, stock:400, unit:"piece",
    seller:"Terai Fresh Exports", verified:true,
    location:"Bara, Madhesh", zone:"Terai",
    rating:4.6, reviews:198, delivery:"1–3 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"High", season:"Summer",
    tags:["tropical","terai","local","seasonal"],
    desc:"Large ripe jackfruit from Madhesh. Weighs 3–8 kg each. Great for dal bhat.",
    features:["3–8 kg weight","Ripe or raw","Zero additives"],
    specs:{"Weight":"4–6 kg","Ripeness":"Semi-ripe","Region":"Bara"},
    img:"🍈", trending:false, flash:false,
    lat:27.01, lng:85.01,
  },
  {
    id:7, name:"Sabitri Rice Seed (Certified)", np:"सावित्री धान बीउ",
    cat:"sp", price:240, discount:5, stock:1500, unit:"kg",
    seller:"National Seeds Company Nepal", verified:true,
    location:"Parsa, Bagmati", zone:"Terai",
    rating:4.8, reviews:678, delivery:"2–4 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"Very High", season:"Kharif",
    tags:["certified","high-yield","NARC"],
    desc:"NARC-approved Sabitri rice seed. Most popular in Nepal Terai. Blast disease resistant.",
    features:["NARC certified","140-day maturity","Blast resistant","4.5–5 t/ha yield"],
    specs:{"Variety":"Sabitri","Maturity":"140 days","Yield":"4.5–5 t/ha","Min Germination":"85%"},
    img:"🌾", trending:true, flash:false,
    lat:27.04, lng:84.81,
  },
  {
    id:8, name:"Gaurav Maize Seed (Hybrid)", np:"गौरव मकै बीउ",
    cat:"sp", price:180, discount:8, stock:2000, unit:"kg",
    seller:"Agrovet Nepal Pvt Ltd", verified:true,
    location:"Chitwan, Bagmati", zone:"Terai",
    rating:4.6, reviews:423, delivery:"2–3 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"High", season:"Kharif & Rabi",
    tags:["hybrid","high-yield","certified"],
    desc:"Hybrid maize seed with superior yield. Drought tolerant and disease resistant.",
    features:["Dual season","6–7 t/ha yield","120-day maturity","Drought tolerant"],
    specs:{"Type":"Hybrid","Maturity":"120 days","Yield":"6–7 t/ha"},
    img:"🌽", trending:false, flash:true,
    lat:27.53, lng:84.43,
  },
  {
    id:9, name:"Wheat Seed BL 3355 (Premium)", np:"गहुँ बीउ BL-3355",
    cat:"sp", price:95, discount:0, stock:5000, unit:"kg",
    seller:"Bhairahawa Seeds Store", verified:true,
    location:"Rupandehi, Lumbini", zone:"Terai",
    rating:4.7, reviews:891, delivery:"2–4 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"Very High", season:"Rabi",
    tags:["rabi","bestseller","certified"],
    desc:"Government-approved BL 3355 wheat. Nepal's most widely planted variety. Rust resistant.",
    features:["Rust resistant","4.5 t/ha yield","115-day maturity","GON certified"],
    specs:{"Variety":"BL-3355","Maturity":"115 days","Yield":"4.5 t/ha","Protein":"12%"},
    img:"🌾", trending:true, flash:false,
    lat:27.50, lng:83.45,
    outOfStock:true,
  },
  {
    id:10, name:"DAP Fertilizer (AICL)", np:"डीएपी मल",
    cat:"fp", price:2800, discount:0, stock:500, unit:"50kg bag",
    seller:"AgroInput Nepal", verified:true,
    location:"Birgunj, Madhesh", zone:"Terai",
    rating:4.5, reviews:1203, delivery:"3–5 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"Very High", season:"All Seasons",
    tags:["essential","bulk","government-rate"],
    desc:"Diammonium Phosphate — Nepal's most used base fertilizer. Subsidized Govt rate.",
    features:["46% P2O5 + 18% N","Govt subsidized","All crop types","Bulk discount"],
    specs:{"Grade":"18-46-0","Granule":"2–5mm","Weight":"50kg"},
    img:"🧪", trending:false, flash:false,
    lat:27.00, lng:84.87,
  },
  {
    id:11, name:"Urea Fertilizer (Govt. Rate)", np:"युरिया मल",
    cat:"fp", price:1650, discount:0, stock:800, unit:"50kg bag",
    seller:"AICL Dealer Pokhara", verified:true,
    location:"Pokhara, Gandaki", zone:"Mid-Hill",
    rating:4.4, reviews:2145, delivery:"2–4 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"Very High", season:"All Seasons",
    tags:["nitrogen","essential","subsidized"],
    desc:"46% nitrogen urea. Nepal Govt fixed-rate fertilizer. Most demanded nitrogen source.",
    features:["46% Nitrogen","Govt fixed price","For all crops","High solubility"],
    specs:{"Nitrogen":"46%","Form":"Prilled","Weight":"50kg"},
    img:"🧪", trending:false, flash:false,
    lat:28.21, lng:83.99,
  },
  {
    id:12, name:"Neem Organic Pesticide", np:"नीम जैविक कीटनाशक",
    cat:"fp", price:480, discount:10, stock:320, unit:"liter",
    seller:"GreenGuard Agro Nepal", verified:true,
    location:"Lalitpur, Bagmati", zone:"Urban",
    rating:4.6, reviews:234, delivery:"2–3 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"Medium", season:"Kharif",
    tags:["organic","safe","eco-friendly","neem"],
    desc:"Cold-pressed neem oil pesticide. Safe for humans, bees, and beneficial insects.",
    features:["100% organic neem","Safe for pollinators","No residue","Rainfast formula"],
    specs:{"Active":"Azadirachtin 1500ppm","Concentration":"3%","Shelf Life":"24 months"},
    img:"🌿", trending:true, flash:false,
    lat:27.67, lng:85.32,
  },
  {
    id:13, name:"Khukuri Sickle (Hariyo Brand)", np:"हरियो ब्राण्ड हँसिया",
    cat:"ft", price:350, discount:0, stock:1500, unit:"piece",
    seller:"Bhaktapur Traditional Tools", verified:true,
    location:"Bhaktapur, Bagmati", zone:"Urban",
    rating:4.8, reviews:890, delivery:"2–3 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"High", season:"Harvest Season",
    tags:["traditional","local-made","durable","harvest"],
    desc:"Authentic Nepali sickle forged by Bhaktapur artisans. High-carbon steel blade.",
    features:["High-carbon steel","Sal wood handle","Razor-sharp edge","10-year durability"],
    specs:{"Blade":"25cm","Handle":"Sal wood","Weight":"280g","Origin":"Bhaktapur"},
    img:"⚒️", trending:false, flash:false,
    lat:27.67, lng:85.43,
  },
  {
    id:14, name:"Power Tiller Shaktiman 7HP", np:"शक्तिमान पावर टिलर ७HP",
    cat:"ft", price:145000, discount:5, stock:25, unit:"unit",
    seller:"Nepal Agro Machinery Pvt Ltd", verified:true,
    location:"Bharatpur, Bagmati", zone:"Terai",
    rating:4.7, reviews:156, delivery:"7–14 days",
    cod:false, esewa:true, khalti:true, mobile:true,
    demand:"Medium", season:"Pre-Kharif",
    tags:["machinery","7hp","bestseller","warranty"],
    desc:"7HP diesel power tiller. Nepal's most popular mechanized farming solution.",
    features:["7HP diesel engine","Multi-attachment","Fuel efficient","DFTQC certified"],
    specs:{"Engine":"7HP Diesel","Width":"800–1000mm","Weight":"300kg","Warranty":"2 years"},
    img:"🚜", trending:true, flash:false,
    lat:27.68, lng:84.43,
  },
  {
    id:15, name:"Hand Sprayer Pump 16L", np:"ह्याण्ड स्प्रेयर पम्प",
    cat:"ft", price:1800, discount:15, stock:600, unit:"piece",
    seller:"Agro Equipments Butwal", verified:true,
    location:"Butwal, Lumbini", zone:"Terai",
    rating:4.5, reviews:445, delivery:"3–5 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"High", season:"All Seasons",
    tags:["essential","16L","lightweight","durable"],
    desc:"16-liter knapsack sprayer with ergonomic straps. Compatible with all pesticides.",
    features:["16L capacity","Ergonomic straps","Adjustable nozzle","HDPE tank"],
    specs:{"Capacity":"16L","Material":"HDPE","Nozzle":"Adjustable brass","Weight":"2.1kg"},
    img:"💦", trending:false, flash:true,
    lat:27.70, lng:83.45,
  },
  {
    id:16, name:"Iron Spade (Kodalo) Premium", np:"कोदालो प्रिमियम",
    cat:"ft", price:650, discount:0, stock:0, unit:"piece",
    seller:"Hetauda Hardware Emporium", verified:false,
    location:"Hetauda, Bagmati", zone:"Mid-Hill",
    rating:4.4, reviews:678, delivery:"3–4 days",
    cod:true, esewa:true, khalti:false, mobile:true,
    demand:"High", season:"Pre-Monsoon",
    tags:["durable","steel","local","essential"],
    desc:"Forged steel kodalo with hardwood handle. Ideal for terraced farming.",
    features:["Forged steel blade","Hardwood handle","Anti-rust","40cm depth"],
    specs:{"Blade":"Forged steel","Handle":"Hardwood","Length":"120cm","Weight":"1.8kg"},
    img:"🔧", trending:false, flash:false,
    lat:27.43, lng:85.03,
  },
  {
    id:17, name:"Pashu Shakti Cattle Feed 25kg", np:"पशु शक्ति पशु आहार",
    cat:"la", price:1850, discount:5, stock:400, unit:"25kg bag",
    seller:"Himal Agro Feed Mills", verified:true,
    location:"Biratnagar, Province 1", zone:"Terai",
    rating:4.6, reviews:312, delivery:"3–5 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"High", season:"All Seasons",
    tags:["cattle","nutrition","protein"],
    desc:"Balanced cattle feed with 20% crude protein. Enhances milk yield in dairy cows.",
    features:["20% crude protein","Boosts milk 15%","Probiotic added","GMP certified"],
    specs:{"Protein":"20% min","Fat":"3.5% min","Moisture":"12% max","Weight":"25kg"},
    img:"🐄", trending:false, flash:false,
    lat:26.46, lng:87.27,
  },
  {
    id:18, name:"Poultry Layer Feed 50kg", np:"कुखुरा लेयर दाना",
    cat:"la", price:3200, discount:0, stock:300, unit:"50kg bag",
    seller:"Nepal Poultry Industries", verified:true,
    location:"Hetauda, Bagmati", zone:"Terai",
    rating:4.5, reviews:456, delivery:"2–4 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"High", season:"All Seasons",
    tags:["poultry","layer","egg-production","bulk"],
    desc:"Complete layer diet for maximum egg production. High calcium for strong shells.",
    features:["Optimized for layers","High calcium","Lysine balanced","DFTQC approved"],
    specs:{"Protein":"16% min","Calcium":"3.5%","ME":"2700 kcal/kg","Pack":"50kg"},
    img:"🐔", trending:false, flash:false,
    lat:27.43, lng:85.03,
  },
  {
    id:19, name:"Drip Irrigation Kit (1 Ropani)", np:"थोपा सिँचाई किट",
    cat:"ir", price:12500, discount:20, stock:80, unit:"kit",
    seller:"NepDrip Solutions Pvt Ltd", verified:true,
    location:"Kathmandu, Bagmati", zone:"Urban",
    rating:4.8, reviews:189, delivery:"5–7 days",
    cod:false, esewa:true, khalti:true, mobile:true,
    demand:"Medium", season:"Dry Season",
    tags:["smart-farming","water-saving","subsidy-eligible"],
    desc:"Complete drip irrigation for 1 Ropani (508 sqm). Saves 50% water. Govt subsidy eligible.",
    features:["508 sqm coverage","50% water saving","Subsidy eligible","5-year warranty"],
    specs:{"Coverage":"508 sqm","Emitter":"2L/hr","Pressure":"1–2.5 bar","Warranty":"5 years"},
    img:"💧", trending:true, flash:false,
    lat:27.70, lng:85.32,
  },
  {
    id:20, name:"Solar Water Pump 1HP", np:"सौर्य जल पम्प",
    cat:"ir", price:48000, discount:10, stock:30, unit:"unit",
    seller:"SolarNepal Agritech", verified:true,
    location:"Pokhara, Gandaki", zone:"Mid-Hill",
    rating:4.7, reviews:78, delivery:"10–15 days",
    cod:false, esewa:true, khalti:true, mobile:true,
    demand:"Medium", season:"All Seasons",
    tags:["solar","modern","subsidy","off-grid"],
    desc:"Off-grid solar pump for remote farms. No fuel cost. AEPC subsidy up to 50%.",
    features:["1HP motor","300W solar panel","AEPC subsidy","IP68 waterproof"],
    specs:{"Power":"1HP","Solar Panel":"300W","Max Head":"30m","Warranty":"3 years"},
    img:"☀️", trending:false, flash:false,
    lat:28.21, lng:83.99,
  },
  {
    id:21, name:"Greenhouse Plastic Film 100m", np:"ग्रीनहाउस प्लास्टिक",
    cat:"aa", price:8500, discount:5, stock:150, unit:"roll",
    seller:"Agri Plastics Nepal", verified:true,
    location:"Lalitpur, Bagmati", zone:"Urban",
    rating:4.5, reviews:134, delivery:"4–6 days",
    cod:false, esewa:true, khalti:true, mobile:true,
    demand:"Medium", season:"Winter",
    tags:["greenhouse","UV-resistant","modern"],
    desc:"200-micron UV-resistant plastic film. 100m roll for tunnel greenhouse. 40% yield boost.",
    features:["200 micron","UV stabilized 4yr","IR blocking","Anti-drip treatment"],
    specs:{"Width":"6m","Length":"100m","Thickness":"200 micron","Lifespan":"4–5 years"},
    img:"🏗️", trending:false, flash:false,
    lat:27.67, lng:85.31,
  },
  {
    id:22, name:"Garden Gloves Set Thorn-proof", np:"बगैँचा पञ्जा सेट",
    cat:"aa", price:280, discount:0, stock:2000, unit:"pair",
    seller:"SafeWork Nepal", verified:false,
    location:"Kirtipur, Bagmati", zone:"Urban",
    rating:4.3, reviews:567, delivery:"2–3 days",
    cod:true, esewa:true, khalti:false, mobile:true,
    demand:"Medium", season:"All Seasons",
    tags:["safety","thorn-proof","durable","washable"],
    desc:"Nitrile-coated thorn-proof gloves. Anti-slip grip. Washable 100+ times.",
    features:["Nitrile coated","Thorn resistant","Anti-slip","Machine washable"],
    specs:{"Material":"Nitrile+cotton","Protection":"Level 2","Sizes":"S, M, L"},
    img:"🧤", trending:false, flash:false,
    lat:27.67, lng:85.28,
  },
  {
    id:23, name:"Vermicompost Organic Manure 50kg", np:"गाँडे मल जैविक",
    cat:"or", price:750, discount:0, stock:1000, unit:"50kg bag",
    seller:"Bharatpur Vermicompost Center", verified:true,
    location:"Chitwan, Bagmati", zone:"Terai",
    rating:4.7, reviews:389, delivery:"3–5 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"High", season:"Pre-Planting",
    tags:["organic","soil-health","natural","sustainable"],
    desc:"Premium vermicompost from cow dung. NNRFC certified. Improves soil microbial activity.",
    features:["NNRFC certified","NPK rich","Water retention","100% natural"],
    specs:{"Organic Carbon":"15% min","NPK":"1.5:1:1.5%","pH":"6.8–7.2","Weight":"50kg"},
    img:"🌿", trending:true, flash:false,
    lat:27.53, lng:84.35,
  },
  {
    id:24, name:"Himalayan Buckwheat (Fapar)", np:"फापर हिमाली",
    cat:"or", price:290, discount:8, stock:500, unit:"kg",
    seller:"Jumla Agricultural Cooperative", verified:true,
    location:"Jumla, Karnali", zone:"Remote Hill",
    rating:4.9, reviews:201, delivery:"6–10 days",
    cod:true, esewa:true, khalti:true, mobile:true,
    demand:"Medium", season:"Post-Monsoon",
    tags:["superfood","himalayan","gluten-free","export-ready"],
    desc:"Himalayan buckwheat grown at 2,800m without chemicals. Gluten-free superfood.",
    features:["Gluten-free superfood","Rich in rutin","High altitude organic","Export quality"],
    specs:{"Variety":"Tartary Buckwheat","Altitude":"2,800m","Origin":"Jumla"},
    img:"🌾", trending:true, flash:false,
    lat:29.27, lng:82.18,
  },
];

const PRICE_HISTORY = [
  { m:"Magh",   tomato:55, apple:160, rice:330, wheat:88 },
  { m:"Falgun", tomato:60, apple:170, rice:340, wheat:90 },
  { m:"Chaitra",tomato:65, apple:180, rice:350, wheat:92 },
  { m:"Baisakh",tomato:70, apple:170, rice:355, wheat:93 },
  { m:"Jestha", tomato:75, apple:160, rice:360, wheat:95 },
  { m:"Ashadh", tomato:68, apple:155, rice:370, wheat:94 },
  { m:"Shrawan",tomato:62, apple:165, rice:375, wheat:95 },
  { m:"Bhadra", tomato:58, apple:175, rice:378, wheat:96 },
];

const MONTHLY_SALES = [
  { m:"Kartik",  rev:1820000, orders:1234 },
  { m:"Mangsir", rev:2140000, orders:1567 },
  { m:"Poush",   rev:3210000, orders:2103 },
  { m:"Magh",    rev:2890000, orders:1934 },
  { m:"Falgun",  rev:3560000, orders:2345 },
  { m:"Chaitra", rev:4120000, orders:2789 },
  { m:"Baisakh", rev:3840000, orders:2567 },
];

const ORDERS_DEMO = [
  { id:"HB-7812", product:"Sabitri Rice Seed",    qty:50, amount:11400, status:"Delivered",  date:"2081-01-15", buyer:"Ram Bahadur Thapa", pay:"eSewa" },
  { id:"HB-7813", product:"Mustang Apple",         qty:30, amount:5130,  status:"Shipped",    date:"2081-01-18", buyer:"Sunita Gurung",     pay:"Khalti" },
  { id:"HB-7814", product:"DAP Fertilizer",        qty:4,  amount:11200, status:"Processing", date:"2081-01-20", buyer:"Hari Prasad Yadav", pay:"COD" },
  { id:"HB-7815", product:"Drip Irrigation Kit",   qty:1,  amount:10000, status:"Pending",    date:"2081-01-21", buyer:"Kamala Devi",       pay:"IME Pay" },
  { id:"HB-7816", product:"Ilam Tea First Flush",  qty:10, amount:10200, status:"Delivered",  date:"2081-01-12", buyer:"Bimala Sharma",     pay:"ConnectIPS" },
];

const SEASONAL = {
  "Kharif (Baisakh–Ashadh)": ["Rice Seeds","Maize Seeds","DAP Fertilizer","Hand Sprayer","Vegetable Seedlings"],
  "Monsoon (Shrawan–Bhadra)":["Pesticides","Fungicides","Weeding Tools","Neem Pesticide"],
  "Rabi (Kartik–Mangsir)":   ["Wheat Seeds","Potato Seeds","Urea Fertilizer","Spade/Kodalo"],
  "Winter (Poush–Magh)":     ["Greenhouse Film","Vermicompost","Vegetable Saplings","Drip Irrigation"],
};

const FLASH_END = Date.now() + 8 * 3600000;

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */
const npr = n => `रू ${Number(n).toLocaleString()}`;
const fp  = p => Math.round(p.price * (1 - (p.discount || 0) / 100));

/* ── Stock status helpers ───────────────────────────────────
   stockStatus returns one of: "out" | "low" | "in"
   Low stock = stock > 0 but <= 20                           */
const stockStatus = p => {
  if (p.outOfStock || p.stock === 0) return "out";
  if (p.stock <= 20)                 return "low";
  return "in";
};

const STOCK_LABEL = {
  out: { label:"Out of Stock",  bg:"#FFCDD2", fg:"#B71C1C", dot:"#C62828" },
  low: { label:"Low Stock",     bg:"#FFF3E0", fg:"#E65100", dot:"#FF6F00" },
  in:  { label:"In Stock",      bg:"#E8F5E9", fg:"#1B5E20", dot:"#2E7D32" },
};

const StockBadge = ({ p, style={} }) => {
  const s = STOCK_LABEL[stockStatus(p)];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:s.bg,
      color:s.fg, fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:20, ...style }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:s.dot, flexShrink:0 }}/>
      {p.stock > 0 ? `${stockStatus(p)==="low"?p.stock+" left":"In Stock"}` : "Out of Stock"}
    </span>
  );
};

/* ── Shared AI fetch helper — includes required browser header ──
   anthropic-dangerous-direct-browser-calls:true is REQUIRED
   for Anthropic API calls made directly from a browser context. */
const callClaude = async (prompt, fallback) => {
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-dangerous-direct-browser-calls": "true",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 600,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d = await r.json();
    const text = d.content?.[0]?.text || "{}";
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch (e) {
    console.warn("Claude API error, using fallback:", e.message);
    return fallback;
  }
};

/* Haversine formula → km */
const haversine = (lat1, lon1, lat2, lon2) => {
  const R   = 6371;
  const rad = d => d * Math.PI / 180;
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2
    + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon/2)**2;
  return R * 2 * Math.asin(Math.sqrt(a));
};

const fmtDist = km => km < 1 ? `${Math.round(km*1000)} m` : `${km.toFixed(1)} km`;

/* ─────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────── */
/* Responsive breakpoints */
const useBreakpoint = () => {
  const [bp, setBp] = useState(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    return w < 640 ? "sm" : w < 1024 ? "md" : "lg";
  });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "sm" : w < 1024 ? "md" : "lg");
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
};

/* Geolocation with permission handling */
const useGeo = () => {
  const [state, setState] = useState({ coords:null, loading:false, error:null, denied:false });

  const request = useCallback(() => {
    if (!navigator.geolocation) {
      setState(s=>({...s, error:"Geolocation not supported"}));
      return;
    }
    setState(s=>({...s, loading:true, error:null}));
    navigator.geolocation.getCurrentPosition(
      pos => setState({ coords:{ lat:pos.coords.latitude, lng:pos.coords.longitude }, loading:false, error:null, denied:false }),
      err => setState(s=>({...s, loading:false, error:err.message, denied:err.code===1})),
      { enableHighAccuracy:true, timeout:8000, maximumAge:60000 }
    );
  }, []);

  return { ...state, request };
};

/* Flash sale timer */
const useTimer = () => {
  const [t, setT] = useState({h:0,m:0,s:0});
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, FLASH_END - Date.now());
      setT({ h:Math.floor(diff/3600000), m:Math.floor(diff%3600000/60000), s:Math.floor(diff%60000/1000) });
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);
  const pad = n => String(n).padStart(2,"0");
  return `${pad(t.h)}:${pad(t.m)}:${pad(t.s)}`;
};

/* ─────────────────────────────────────────────────────────────
   UI ATOMS
───────────────────────────────────────────────────────────── */
const Badge = ({ status }) => {
  const cfg = {
    Delivered:  ["#C8E6C9","#1B5E20"],
    Shipped:    ["#BBDEFB","#0D47A1"],
    Processing: ["#FFF9C4","#F57F17"],
    Pending:    ["#FFCCBC","#BF360C"],
    Active:     ["#C8E6C9","#1B5E20"],
    Approved:   ["#C8E6C9","#1B5E20"],
    Pending_Approval:["#FFF9C4","#F57F17"],
    Suspended:  ["#FFCDD2","#B71C1C"],
  };
  const [bg,fg] = cfg[status] || ["#EEE","#333"];
  return (
    <span style={{ background:bg, color:fg, padding:"2px 10px", borderRadius:20, fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>
      {status.replace("_"," ")}
    </span>
  );
};

const Stars = ({ rating, reviews }) => (
  <span style={{ display:"flex", alignItems:"center", gap:4 }}>
    <span style={{ color:T.gold, fontSize:12 }}>
      {"★".repeat(Math.round(rating))}{"☆".repeat(5-Math.round(rating))}
    </span>
    <span style={{ color:T.textMuted, fontSize:11 }}>{rating}{reviews!=null&&` (${reviews.toLocaleString()})`}</span>
  </span>
);

const PayBadge = ({ label, color }) => (
  <span style={{ background:color+"22", color, fontSize:9, fontWeight:800, padding:"2px 6px", borderRadius:4 }}>{label}</span>
);

/* Card with hover lift */
const Card = ({ children, style={}, onClick }) => {
  const hov = onClick ? {
    onMouseEnter:e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(42,92,69,0.15)"; },
    onMouseLeave:e=>{ e.currentTarget.style.transform="translateY(0)";    e.currentTarget.style.boxShadow="0 2px 12px rgba(42,92,69,0.07)"; },
  } : {};
  return (
    <div onClick={onClick} {...hov}
      style={{ background:T.card, borderRadius:16, border:`1px solid ${T.borderLight}`,
        boxShadow:"0 2px 12px rgba(42,92,69,0.07)", overflow:"hidden",
        cursor:onClick?"pointer":"default", transition:"transform 0.2s,box-shadow 0.2s", ...style }}>
      {children}
    </div>
  );
};

/* Button */
const Btn = ({ children, variant="primary", onClick, disabled, style={}, size="md" }) => {
  const sz = size==="sm"?{padding:"7px 16px",fontSize:13}:size==="lg"?{padding:"13px 28px",fontSize:15}:{padding:"10px 20px",fontSize:14};
  const v = {
    primary:   { background:T.green,   color:"#fff" },
    accent:    { background:T.saffron, color:"#fff" },
    crimson:   { background:T.red,     color:"#fff" },
    ghost:     { background:"transparent", color:T.green, border:`1.5px solid ${T.green}` },
    secondary: { background:T.alt,     color:T.text, border:`1px solid ${T.border}` },
    success:   { background:T.success, color:"#fff" },
    danger:    { background:T.danger,  color:"#fff" },
    esewa:     { background:T.esewa,   color:"#fff" },
    khalti:    { background:T.khalti,  color:"#fff" },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ ...sz, border:"none", borderRadius:10, fontFamily:"'Hind',sans-serif",
        fontWeight:700, cursor:disabled?"not-allowed":"pointer", opacity:disabled?0.6:1,
        display:"inline-flex", alignItems:"center", gap:6, transition:"all 0.18s",
        ...v[variant], ...style }}>
      {children}
    </button>
  );
};

/* Text input */
const Input = ({ label, value, onChange, type="text", placeholder, style={} }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
    {label && <label style={{ fontSize:12, fontWeight:700, color:T.text }}>{label}</label>}
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{ padding:"10px 14px", border:`1.5px solid ${T.border}`, borderRadius:10,
        fontSize:14, fontFamily:"'Hind',sans-serif", color:T.text, background:T.card,
        outline:"none", width:"100%", ...style }}
      onFocus={e=>e.target.style.borderColor=T.green}
      onBlur={e=>e.target.style.borderColor=T.border} />
  </div>
);

/* Select */
const Select = ({ label, value, onChange, options, style={} }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
    {label && <label style={{ fontSize:12, fontWeight:700, color:T.text }}>{label}</label>}
    <select value={value} onChange={e=>onChange(e.target.value)}
      style={{ padding:"10px 14px", border:`1.5px solid ${T.border}`, borderRadius:10,
        fontSize:14, fontFamily:"'Hind',sans-serif", color:T.text, background:T.card,
        outline:"none", ...style }}>
      {options.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  </div>
);

/* Metric card for dashboards */
const Metric = ({ title, value, change, pos=true, icon:Icon, color=T.green }) => (
  <Card style={{ padding:"18px 20px" }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
      <div>
        <div style={{ fontSize:11, color:T.textMuted, fontWeight:600, marginBottom:5 }}>{title}</div>
        <div style={{ fontSize:22, fontWeight:900, color:T.text, fontFamily:"'Tiro Devanagari Sanskrit',serif" }}>{value}</div>
        {change && (
          <div style={{ display:"flex", alignItems:"center", gap:3, marginTop:5 }}>
            {pos?<ArrowUpRight size={13} color={T.success}/>:<ArrowDownRight size={13} color={T.danger}/>}
            <span style={{ fontSize:11, color:pos?T.success:T.danger, fontWeight:700 }}>{change}% vs last month</span>
          </div>
        )}
      </div>
      <div style={{ background:color+"18", borderRadius:10, padding:10 }}>
        <Icon size={20} color={color}/>
      </div>
    </div>
  </Card>
);

/* ─────────────────────────────────────────────────────────────
   PRODUCT CARD (reusable, responsive)
───────────────────────────────────────────────────────────── */
const ProductCard = ({ p, onView, onAdd, userCoords, compact=false }) => {
  const dist   = userCoords && p.lat ? haversine(userCoords.lat, userCoords.lng, p.lat, p.lng) : null;
  const status = stockStatus(p);
  const isOut  = status === "out";

  return (
    <Card onClick={()=>onView(p)} style={{ height:"100%", opacity:isOut ? 0.88 : 1 }}>
      {/* ── Product image area ── */}
      <div style={{ background:T.alt, height:compact?110:148, display:"flex", alignItems:"center",
        justifyContent:"center", fontSize:compact?56:68, position:"relative" }}>
        {p.img}

        {/* Discount badge */}
        {p.discount>0 && !isOut && (
          <span style={{ position:"absolute", top:8, left:8, background:T.red, color:"#fff",
            fontSize:10, fontWeight:900, padding:"2px 8px", borderRadius:10 }}>
            -{p.discount}%
          </span>
        )}

        {/* Verified seller badge */}
        {p.verified && !isOut && (
          <span style={{ position:"absolute", top:8, right:8, background:T.sky, color:"#fff",
            fontSize:9, fontWeight:900, padding:"2px 6px", borderRadius:10 }}>
            ✓ Verified
          </span>
        )}

        {/* ── OUT OF STOCK overlay ── */}
        {isOut && (
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.55)",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4 }}>
            <span style={{ background:"#B71C1C", color:"#fff", fontSize:11, fontWeight:900,
              padding:"4px 12px", borderRadius:20, letterSpacing:0.5 }}>OUT OF STOCK</span>
          </div>
        )}

        {/* Low stock ribbon */}
        {status === "low" && (
          <span style={{ position:"absolute", bottom:8, left:8, background:"#E65100", color:"#fff",
            fontSize:9, fontWeight:900, padding:"2px 8px", borderRadius:10 }}>
            🔥 Only {p.stock} left!
          </span>
        )}

        {/* Distance badge */}
        {dist !== null && !isOut && (
          <span style={{ position:"absolute", bottom:8, right:8, background:"rgba(0,0,0,0.65)",
            color:"#fff", fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:10,
            display:"flex", alignItems:"center", gap:3 }}>
            <MapPin size={8}/> {fmtDist(dist)}
          </span>
        )}
      </div>

      {/* ── Product info ── */}
      <div style={{ padding:compact?"10px 12px":"14px 16px" }}>
        <div style={{ fontSize:10, color:T.green, fontWeight:700 }}>{p.location}</div>
        <div style={{ fontWeight:700, fontSize:compact?13:14, color:T.text, margin:"3px 0", lineHeight:1.3 }}>{p.name}</div>
        {!compact && <div style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:11, color:T.textMid, marginBottom:4 }}>{p.np}</div>}
        <Stars rating={p.rating} reviews={compact?null:p.reviews}/>
        {!compact && <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>by {p.seller}</div>}

        {/* Price row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginTop:compact?6:10 }}>
          <div>
            {isOut ? (
              <span style={{ fontSize:13, color:T.textMuted, fontStyle:"italic" }}>Unavailable</span>
            ) : (
              <>
                <span style={{ fontSize:compact?15:17, fontWeight:900, color:T.green,
                  fontFamily:"'Tiro Devanagari Sanskrit',serif" }}>{npr(fp(p))}</span>
                <span style={{ fontSize:10, color:T.textMuted }}>/{p.unit}</span>
                {p.discount>0 && <div style={{ fontSize:10, color:T.textMuted, textDecoration:"line-through" }}>{npr(p.price)}</div>}
              </>
            )}
          </div>

          {/* Add / Notify button */}
          {isOut ? (
            <button
              onClick={e=>{ e.stopPropagation(); }}
              style={{ padding:"6px 10px", fontSize:11, fontWeight:700, border:`1.5px solid ${T.border}`,
                borderRadius:9, background:T.alt, color:T.textMuted, cursor:"default", fontFamily:"'Hind',sans-serif" }}>
              🔔 Notify
            </button>
          ) : (
            <Btn variant="primary" size="sm"
              onClick={e=>{ e.stopPropagation(); onAdd(p); }}
              style={{ padding:"6px 12px", fontSize:12 }}>
              <Plus size={13}/> Add
            </Btn>
          )}
        </div>

        {/* Stock badge + payment badges */}
        {!compact && (
          <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:6 }}>
            <StockBadge p={p}/>
            <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
              {p.esewa  && <PayBadge label="eSewa"  color={T.esewa}/>}
              {p.khalti && <PayBadge label="Khalti" color={T.khalti}/>}
              {p.cod    && <PayBadge label="COD"    color={T.cod}/>}
              {p.mobile && <PayBadge label="Mobile" color={T.ime}/>}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
const Navbar = ({ user, cart, nav, logout, activeCat, setActiveCat, onSearch }) => {
  const bp = useBreakpoint();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const catRef = useRef(null);

  const handleSearch = (val) => {
    setQ(val);
    onSearch(val);
  };

  const handleCat = (id) => {
    setActiveCat(id);
    nav("products");
    setMenuOpen(false);
  };

  /* Scroll active chip into view */
  useEffect(() => {
    if (!catRef.current) return;
    const el = catRef.current.querySelector("[data-active='true']");
    if (el) el.scrollIntoView({ behavior:"smooth", inline:"center", block:"nearest" });
  }, [activeCat]);

  return (
    <nav style={{ position:"sticky", top:0, zIndex:300, background:T.dark }}>
      {/* Promo strip – hidden on mobile */}
      {bp !== "sm" && (
        <div style={{ background:T.red, padding:"4px 16px", display:"flex", justifyContent:"space-between" }}>
          <span style={{ color:"rgba(255,255,255,0.85)", fontSize:11 }}>🚚 Free delivery above रू 2,000 | eSewa & Khalti accepted</span>
          <span style={{ color:"rgba(255,255,255,0.7)",  fontSize:11 }}>📞 1660-01-88888 | Mon–Sat 8AM–6PM</span>
        </div>
      )}

      {/* Main bar */}
      <div style={{ display:"flex", alignItems:"center", padding:bp==="sm"?"10px 12px":"12px 24px", gap:bp==="sm"?8:16 }}>
        {/* Logo */}
        <div onClick={()=>nav("home")} style={{ cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ background:T.green, borderRadius:9, padding:"5px 8px" }}><Sprout size={20} color="#fff"/></div>
          <div>
            <div style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:bp==="sm"?17:20, color:"#fff", fontWeight:700, lineHeight:1 }}>हरियो बजार</div>
            {bp!=="sm" && <div style={{ color:T.saffronLight, fontSize:9, letterSpacing:2, fontWeight:600 }}>HARIYO BAZAAR</div>}
          </div>
        </div>

        {/* Search bar */}
        <div style={{ flex:1, position:"relative", maxWidth:bp==="sm"?"100%":560 }}>
          <input
            value={q}
            onChange={e=>handleSearch(e.target.value)}
            onKeyDown={e=>{ if(e.key==="Enter" && q.trim()) nav("products"); }}
            placeholder={bp==="sm"?"Search...":"खोज्नुहोस् — seeds, vegetables, tools..."}
            style={{ width:"100%", padding:"10px 40px 10px 14px", background:"#1C2A12",
              color:"#fff", border:`1.5px solid ${T.greenLight}`, borderRadius:10,
              fontSize:13, outline:"none", fontFamily:"'Hind',sans-serif" }}
          />
          <Search size={15} color={T.greenLight}
            style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", cursor:"pointer" }}
            onClick={()=>{ if(q.trim()) nav("products"); }}/>
        </div>

        {/* Desktop actions */}
        {bp !== "sm" && (
          <div style={{ display:"flex", gap:6, alignItems:"center", flexShrink:0 }}>
            {user ? (
              <>
                <button onClick={()=>nav("cart")}
                  style={{ background:T.green, border:"none", cursor:"pointer", color:"#fff",
                    padding:"8px 14px", borderRadius:8, display:"flex", alignItems:"center",
                    gap:6, position:"relative" }}>
                  <ShoppingCart size={17}/>
                  <span style={{ fontSize:13, fontFamily:"'Hind',sans-serif" }}>Cart</span>
                  {cart.length>0 && (
                    <span style={{ background:T.saffron, color:"#fff", borderRadius:"50%",
                      width:17, height:17, fontSize:10, fontWeight:900, display:"flex",
                      alignItems:"center", justifyContent:"center", position:"absolute", top:2, right:2 }}>
                      {cart.reduce((s,i)=>s+i.qty,0)}
                    </span>
                  )}
                </button>
                <div onClick={()=>nav(user.role==="admin"?"admin":user.role==="seller"?"seller":"orders")}
                  style={{ display:"flex", alignItems:"center", gap:7, background:"#1C2A12",
                    borderRadius:8, padding:"8px 12px", cursor:"pointer" }}>
                  <div style={{ width:26, height:26, borderRadius:"50%", background:T.red,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:"#fff", fontWeight:900, fontSize:12 }}>{user.name[0]}</div>
                  <span style={{ color:"#fff", fontSize:13, fontFamily:"'Hind',sans-serif" }}>
                    {user.name.split(" ")[0]}
                  </span>
                </div>
                <button onClick={logout}
                  style={{ background:"none", border:"none", cursor:"pointer", color:T.textMuted }}>
                  <LogOut size={15}/>
                </button>
              </>
            ) : (
              <>
                <Btn variant="ghost" onClick={()=>nav("login")} style={{ color:"#fff", borderColor:T.greenLight }} size="sm">Login</Btn>
                <Btn variant="accent" onClick={()=>nav("register")} size="sm">Register</Btn>
              </>
            )}
          </div>
        )}

        {/* Mobile hamburger */}
        {bp==="sm" && (
          <div style={{ display:"flex", gap:6, flexShrink:0 }}>
            {user && (
              <button onClick={()=>nav("cart")}
                style={{ background:T.green, border:"none", cursor:"pointer", color:"#fff",
                  padding:"7px 10px", borderRadius:8, position:"relative" }}>
                <ShoppingCart size={17}/>
                {cart.length>0 && (
                  <span style={{ background:T.saffron, color:"#fff", borderRadius:"50%",
                    width:15, height:15, fontSize:9, fontWeight:900, display:"flex",
                    alignItems:"center", justifyContent:"center", position:"absolute", top:1, right:1 }}>
                    {cart.reduce((s,i)=>s+i.qty,0)}
                  </span>
                )}
              </button>
            )}
            <button onClick={()=>setMenuOpen(!menuOpen)}
              style={{ background:"#1C2A12", border:"none", cursor:"pointer", color:"#fff",
                padding:"7px 10px", borderRadius:8 }}>
              <Menu size={18}/>
            </button>
          </div>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {bp==="sm" && menuOpen && (
        <div style={{ background:"#1C2A12", borderTop:`1px solid ${T.greenDark}`, padding:"12px 16px" }}>
          {user ? (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <div style={{ color:"#fff", fontSize:13, fontFamily:"'Hind',sans-serif" }}>
                👤 {user.name}
              </div>
              <button onClick={()=>{ nav(user.role==="admin"?"admin":user.role==="seller"?"seller":"orders"); setMenuOpen(false); }}
                style={{ background:T.green, border:"none", borderRadius:8, padding:"8px 12px",
                  color:"#fff", fontSize:13, fontFamily:"'Hind',sans-serif", cursor:"pointer", textAlign:"left" }}>
                {user.role==="admin"?"Admin Dashboard":user.role==="seller"?"Seller Dashboard":"My Orders"}
              </button>
              <button onClick={()=>{ logout(); setMenuOpen(false); }}
                style={{ background:"none", border:`1px solid ${T.border}`, borderRadius:8,
                  padding:"8px 12px", color:"#fff", fontSize:13, fontFamily:"'Hind',sans-serif", cursor:"pointer", textAlign:"left" }}>
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display:"flex", gap:8 }}>
              <Btn variant="ghost" onClick={()=>{ nav("login"); setMenuOpen(false); }} style={{ color:"#fff", borderColor:T.greenLight, flex:1, justifyContent:"center" }} size="sm">Login</Btn>
              <Btn variant="accent" onClick={()=>{ nav("register"); setMenuOpen(false); }} style={{ flex:1, justifyContent:"center" }} size="sm">Register</Btn>
            </div>
          )}
        </div>
      )}

      {/* Category bar — always visible, horizontally scrollable, no visible scrollbar */}
      <div ref={catRef}
        style={{ display:"flex", gap:6, padding:"8px 16px 10px",
          overflowX:"auto", WebkitOverflowScrolling:"touch", scrollBehavior:"smooth",
          msOverflowStyle:"none", scrollbarWidth:"none" }}>
        {/* All categories chip */}
        {[{ id:"all", name:"All Products", icon:"🏪" }, ...CATEGORIES].map(c => {
          const active = activeCat === c.id;
          return (
            <button key={c.id} data-active={active}
              onClick={()=>handleCat(c.id)}
              style={{ flexShrink:0, whiteSpace:"nowrap", display:"flex", alignItems:"center",
                gap:5, padding:"5px 14px", borderRadius:20, border:"none", cursor:"pointer",
                fontSize:12, fontFamily:"'Hind',sans-serif", fontWeight:active?700:500,
                background:active?T.green:"rgba(255,255,255,0.07)",
                color:active?"#fff":"#A5C4A0",
                boxShadow:active?`0 2px 8px ${T.green}50`:"none",
                transition:"all 0.15s" }}>
              <span style={{ fontSize:14 }}>{c.icon}</span>
              {c.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────────── */
const HomePage = ({ nav, addCart, setActiveCat }) => {
  const bp = useBreakpoint();
  const timer = useTimer();
  const [season, setSeason] = useState(Object.keys(SEASONAL)[2]);
  const trending  = PRODUCTS.filter(p => p.trending);
  const flashSale = PRODUCTS.filter(p => p.flash);

  const navCat = id => { setActiveCat(id); nav("products"); };

  return (
    <div style={{ background:T.surface, minHeight:"100vh" }}>
      {/* ── HERO ── */}
      <div style={{
        background:`linear-gradient(135deg, ${T.dark} 0%, #0D2B18 55%, #1A4A2E 100%)`,
        padding:bp==="sm"?"36px 20px":"60px 48px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        gap:24, position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", top:-80, right:-80, width:300, height:300, borderRadius:"50%", background:"rgba(255,255,255,0.025)", pointerEvents:"none" }}/>
        <div style={{ maxWidth:580, position:"relative" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:7,
            background:"rgba(212,112,10,0.18)", border:"1px solid rgba(212,112,10,0.4)",
            borderRadius:20, padding:"5px 14px", marginBottom:16 }}>
            <Zap size={13} color={T.saffronLight}/>
            <span style={{ color:T.saffronLight, fontSize:12, fontWeight:700 }}>🇳🇵 Nepal's #1 Agricultural Marketplace</span>
          </div>
          <h1 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:bp==="sm"?32:50,
            fontWeight:700, color:"#fff", lineHeight:1.2, marginBottom:14 }}>
            किसानको भरोसा,<br/>
            <span style={{ color:T.saffronLight }}>हरियो बजार</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.6)", fontSize:bp==="sm"?13:15,
            lineHeight:1.7, fontFamily:"'Hind',sans-serif", marginBottom:24 }}>
            Buy seeds, fertilizers, tools & fresh produce directly from verified Nepali farmers.
            eSewa · Khalti · Mobile Banking · COD accepted.
          </p>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <Btn variant="accent" size={bp==="sm"?"md":"lg"} onClick={()=>nav("products")}>
              <ShoppingBag size={16}/> किनमेल गर्नुहोस्
            </Btn>
            <Btn size={bp==="sm"?"md":"lg"} onClick={()=>nav("register")}
              style={{ background:"rgba(255,255,255,0.1)", color:"#fff", border:"1px solid rgba(255,255,255,0.2)" }}>
              <Leaf size={16}/> बिक्रेता बन्नुहोस्
            </Btn>
          </div>
          {/* Stats */}
          <div style={{ display:"flex", gap:bp==="sm"?16:28, marginTop:28, flexWrap:"wrap" }}>
            {[["89K+","Buyers"],["1.2K+","Sellers"],["24+","Products"],["77 Districts","Coverage"]].map(([v,l])=>(
              <div key={l}>
                <div style={{ color:T.saffronLight, fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:bp==="sm"?18:22, fontWeight:700 }}>{v}</div>
                <div style={{ color:"rgba(255,255,255,0.5)", fontSize:10 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        {bp !== "sm" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, flexShrink:0 }}>
            {["🌾","🍎","🧪","🐄","💧","🌿"].map((e,i)=>(
              <div key={i} style={{ width:88, height:88, background:"rgba(255,255,255,0.06)",
                borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:40, border:"1px solid rgba(255,255,255,0.08)" }}>{e}</div>
            ))}
          </div>
        )}
      </div>

      {/* ── PAYMENT STRIP ── */}
      <div style={{ background:T.card, borderBottom:`1px solid ${T.borderLight}`,
        padding:bp==="sm"?"10px 16px":"12px 48px", overflowX:"auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, minWidth:"max-content" }}>
          <span style={{ fontSize:12, fontWeight:700, color:T.textMid, flexShrink:0 }}>भुक्तानी:</span>
          {[{icon:"💚",label:"eSewa",color:T.esewa},{icon:"💜",label:"Khalti",color:T.khalti},
            {icon:"🔵",label:"IME Pay",color:T.ime},{icon:"🏦",label:"ConnectIPS",color:"#0A5C78"},
            {icon:"📱",label:"Mobile Banking",color:"#1A5276"},{icon:"💵",label:"COD",color:T.cod}
          ].map(pm=>(
            <div key={pm.label} style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 10px",
              borderRadius:8, border:`1px solid ${pm.color}30`, background:pm.color+"09", flexShrink:0 }}>
              <span style={{ fontSize:14 }}>{pm.icon}</span>
              <span style={{ fontSize:11, fontWeight:700, color:pm.color }}>{pm.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FLASH SALE ── */}
      {flashSale.length>0 && (
        <div style={{ margin:bp==="sm"?"20px 16px 0":"28px 48px 0",
          background:`linear-gradient(135deg, ${T.red}, ${T.redDark})`,
          borderRadius:20, padding:bp==="sm"?"16px":"20px 24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:8 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <Flame size={24} color="#FFA500"/>
              <div>
                <div style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:bp==="sm"?17:20, color:"#fff", fontWeight:700 }}>Flash Sale!</div>
                <div style={{ color:"rgba(255,255,255,0.7)", fontSize:12, fontFamily:"'Hind',sans-serif" }}>जल्दी गर्नुहोस्!</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ color:"rgba(255,255,255,0.8)", fontSize:12 }}>समाप्त:</span>
              {timer.split(":").map((v,i)=>(
                <span key={i} style={{ display:"flex", gap:2, alignItems:"center" }}>
                  <span style={{ background:"rgba(0,0,0,0.35)", color:"#fff", borderRadius:5,
                    padding:"2px 7px", fontFamily:"monospace", fontSize:16, fontWeight:900 }}>{v}</span>
                  {i<2 && <span style={{ color:"rgba(255,255,255,0.8)", fontWeight:900 }}>:</span>}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display:"grid",
            gridTemplateColumns:bp==="sm"?`repeat(${flashSale.length},.1fr)`:`repeat(${Math.min(flashSale.length,4)},1fr)`,
            gap:12, overflowX:bp==="sm"?"auto":"visible" }}>
            {flashSale.map(p=>(
              <div key={p.id} onClick={()=>nav("product",p)}
                style={{ background:"rgba(255,255,255,0.1)", borderRadius:14, padding:12,
                  cursor:"pointer", border:"1px solid rgba(255,255,255,0.15)",
                  minWidth:bp==="sm"?140:"auto", flexShrink:0, transition:"background 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.18)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
                <div style={{ fontSize:44, textAlign:"center", marginBottom:8 }}>{p.img}</div>
                <div style={{ color:"#fff", fontSize:13, fontWeight:700, fontFamily:"'Hind',sans-serif" }}>{p.name}</div>
                <div style={{ display:"flex", gap:6, alignItems:"center", marginTop:6, flexWrap:"wrap" }}>
                  <span style={{ color:T.saffronLight, fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:16, fontWeight:900 }}>{npr(fp(p))}</span>
                  <span style={{ color:"rgba(255,255,255,0.5)", textDecoration:"line-through", fontSize:12 }}>{npr(p.price)}</span>
                  <span style={{ background:"#FFA500", color:"#000", fontSize:10, fontWeight:900, borderRadius:4, padding:"1px 5px" }}>-{p.discount}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CATEGORIES GRID ── */}
      <div style={{ padding:bp==="sm"?"24px 16px 0":"40px 48px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div>
            <h2 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:bp==="sm"?20:26, fontWeight:700, color:T.text }}>वर्गहरू</h2>
            <div style={{ fontSize:12, color:T.textMuted }}>Shop by Category</div>
          </div>
          <Btn variant="ghost" size="sm" onClick={()=>nav("products")}>View All <ArrowRight size={13}/></Btn>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:bp==="sm"?"repeat(4,1fr)":bp==="md"?"repeat(4,1fr)":"repeat(8,1fr)", gap:10 }}>
          {CATEGORIES.map(c=>(
            <div key={c.id} onClick={()=>navCat(c.id)}
              style={{ background:T.card, borderRadius:14, border:`1px solid ${T.borderLight}`,
                padding:bp==="sm"?"12px 8px":"18px 14px", textAlign:"center", cursor:"pointer",
                transition:"all 0.2s", boxShadow:"0 2px 8px rgba(42,92,69,0.06)" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 20px ${T.green}18`; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 8px rgba(42,92,69,0.06)"; }}>
              <div style={{ fontSize:bp==="sm"?26:34, marginBottom:5 }}>{c.icon}</div>
              <div style={{ fontWeight:700, color:T.text, fontSize:bp==="sm"?10:12 }}>{c.name}</div>
              <div style={{ fontSize:9, color:T.textMuted }}>{c.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRENDING ── */}
      <div style={{ padding:bp==="sm"?"24px 16px 0":"40px 48px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <TrendingUp size={20} color={T.red}/>
            <div>
              <h2 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:bp==="sm"?20:26, fontWeight:700, color:T.text }}>Trending in Nepal 🇳🇵</h2>
              <div style={{ fontSize:12, color:T.textMuted }}>नेपालमा सबैभन्दा धेरै माग</div>
            </div>
          </div>
          <Btn variant="ghost" size="sm" onClick={()=>nav("products")}>All <ArrowRight size={13}/></Btn>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:bp==="sm"?"repeat(2,1fr)":bp==="md"?"repeat(3,1fr)":"repeat(4,1fr)", gap:16 }}>
          {trending.map(p=>(
            <ProductCard key={p.id} p={p} onView={d=>nav("product",d)} onAdd={addCart}/>
          ))}
        </div>
      </div>

      {/* ── SEASONAL ── */}
      <div style={{ padding:bp==="sm"?"24px 16px 0":"40px 48px 0" }}>
        <div style={{ background:`linear-gradient(135deg, ${T.green}, ${T.greenLight})`,
          borderRadius:20, padding:bp==="sm"?"20px 16px":"28px 32px" }}>
          <h2 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:bp==="sm"?18:22, fontWeight:700, color:"#fff", marginBottom:4 }}>
            🗓️ Seasonal Recommendations
          </h2>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:12, marginBottom:16 }}>मौसम अनुसार खेती सुझाव</p>
          <div style={{ display:"flex", gap:8, marginBottom:16, overflowX:"auto", flexWrap:bp==="sm"?"nowrap":"wrap" }}>
            {Object.keys(SEASONAL).map(s=>(
              <button key={s} onClick={()=>setSeason(s)}
                style={{ padding:"6px 14px", borderRadius:10, border:"none", cursor:"pointer",
                  fontFamily:"'Hind',sans-serif", fontSize:12, fontWeight:700, flexShrink:0,
                  background:season===s?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.1)",
                  color:season===s?"#fff":"rgba(255,255,255,0.6)", transition:"all 0.15s" }}>
                {s}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {SEASONAL[season].map(item=>(
              <div key={item} style={{ background:"rgba(255,255,255,0.15)", borderRadius:10,
                padding:"8px 14px", display:"flex", alignItems:"center", gap:7 }}>
                <Leaf size={13} color={T.saffronLight}/>
                <span style={{ color:"#fff", fontSize:12, fontFamily:"'Hind',sans-serif", fontWeight:600 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{ background:T.dark, padding:bp==="sm"?"28px 16px":"40px 48px",
        marginTop:40, display:"grid",
        gridTemplateColumns:bp==="sm"?"repeat(2,1fr)":"repeat(4,1fr)", gap:20 }}>
        {[
          { icon:Truck,      title:"Fast Delivery",    np:"छिटो डेलिभरी",    text:"77 जिल्लामा डेलिभरी" },
          { icon:Shield,     title:"Verified Sellers", np:"प्रमाणित बिक्रेता", text:"KYC verified farmers" },
          { icon:Smartphone, title:"Digital Payment",  np:"डिजिटल भुक्तानी", text:"eSewa · Khalti · Mobile" },
          { icon:Award,      title:"Quality Assured",  np:"गुणस्तर ग्यारेन्टी", text:"100% quality guarantee" },
        ].map(({icon:Icon,title,np,text})=>(
          <div key={title} style={{ textAlign:"center" }}>
            <div style={{ background:"rgba(255,255,255,0.07)", borderRadius:12, padding:14, display:"inline-flex", marginBottom:12 }}>
              <Icon size={24} color={T.saffronLight}/>
            </div>
            <div style={{ color:"#fff", fontWeight:700, fontSize:14, marginBottom:2 }}>{title}</div>
            <div style={{ color:T.saffronLight, fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:11, marginBottom:3 }}>{np}</div>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11 }}>{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PRODUCTS PAGE  ← COMPLETELY REWRITTEN & FIXED
───────────────────────────────────────────────────────────── */
const ProductsPage = ({ nav, addCart, activeCat, setActiveCat, globalSearch }) => {
  const bp = useBreakpoint();
  const geo = useGeo();

  /* Local filter state */
  const [sort,   setSort]   = useState("trending");
  const [zone,   setZone]   = useState("all");
  const [search, setSearch] = useState(globalSearch || "");
  const [showFilters, setShowFilters] = useState(false);

  /* Sync search from navbar */
  useEffect(() => { setSearch(globalSearch || ""); }, [globalSearch]);

  /* Enrich products with distance when GPS available */
  const enriched = PRODUCTS.map(p => ({
    ...p,
    _dist: geo.coords ? haversine(geo.coords.lat, geo.coords.lng, p.lat, p.lng) : null,
  }));

  /* ── FILTER LOGIC — the critical part ── */
  const filtered = enriched.filter(p => {
    /* 1. Category: match activeCat or show all */
    const okCat = activeCat === "all" || p.cat === activeCat;

    /* 2. Zone filter */
    const okZone = zone === "all" || p.zone === zone;

    /* 3. Search: check name, Nepali name, seller, location, tags */
    const q = search.toLowerCase().trim();
    const okSearch = !q
      || p.name.toLowerCase().includes(q)
      || p.np.includes(q)
      || p.seller.toLowerCase().includes(q)
      || p.location.toLowerCase().includes(q)
      || p.tags.some(t => t.toLowerCase().includes(q))
      || p.desc.toLowerCase().includes(q);

    return okCat && okZone && okSearch;
  });

  /* ── SORT ── */
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price_asc")  return fp(a) - fp(b);
    if (sort === "price_desc") return fp(b) - fp(a);
    if (sort === "rating")     return b.rating - a.rating;
    if (sort === "nearby" && geo.coords) return (a._dist??9999) - (b._dist??9999);
    /* trending default: trending first, then by rating */
    if (b.trending !== a.trending) return (b.trending?1:0) - (a.trending?1:0);
    return b.rating - a.rating;
  });

  /* Nearby = 4 closest products */
  const nearby = geo.coords
    ? [...enriched].sort((a,b)=>(a._dist??9999)-(b._dist??9999)).slice(0,4)
    : [];

  /* ── SIDEBAR (desktop) / DRAWER (mobile) ── */
  const FilterPanel = () => (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      {/* Category */}
      <div>
        <div style={{ fontSize:11, fontWeight:700, color:T.textMuted, letterSpacing:1,
          textTransform:"uppercase", marginBottom:8 }}>Category</div>
        {[{id:"all",name:"All Products",icon:"🏪",count:PRODUCTS.length},...CATEGORIES].map(c=>(
          <div key={c.id} onClick={()=>{ setActiveCat(c.id); if(bp==="sm") setShowFilters(false); }}
            style={{ padding:"8px 10px", borderRadius:8, cursor:"pointer", marginBottom:2, fontSize:13,
              display:"flex", justifyContent:"space-between", alignItems:"center", fontFamily:"'Hind',sans-serif",
              background:activeCat===c.id?T.green:"transparent",
              color:activeCat===c.id?"#fff":T.text, fontWeight:activeCat===c.id?700:400,
              transition:"all 0.15s" }}>
            <span>{c.icon} {c.name}</span>
            <span style={{ fontSize:10, opacity:0.65 }}>{c.count}</span>
          </div>
        ))}
      </div>

      {/* Zone */}
      <div>
        <div style={{ fontSize:11, fontWeight:700, color:T.textMuted, letterSpacing:1,
          textTransform:"uppercase", marginBottom:8 }}>Zone</div>
        {["all","Terai","Mid-Hill","Remote Hill","Mountain","Urban"].map(z=>(
          <div key={z} onClick={()=>{ setZone(z); if(bp==="sm") setShowFilters(false); }}
            style={{ padding:"7px 10px", borderRadius:8, cursor:"pointer", marginBottom:2, fontSize:13,
              fontFamily:"'Hind',sans-serif", transition:"all 0.15s",
              background:zone===z?T.saffron+"18":"transparent",
              color:zone===z?T.saffron:T.text, fontWeight:zone===z?700:400 }}>
            {z==="all"?"All Zones":z}
          </div>
        ))}
      </div>

      {/* Geolocation panel */}
      <div style={{ background:geo.coords?T.greenPale:T.alt,
        border:`1px solid ${geo.coords?T.green+"40":T.borderLight}`, borderRadius:12, padding:14 }}>
        <div style={{ fontSize:11, fontWeight:700, color:T.textMuted, letterSpacing:1,
          textTransform:"uppercase", marginBottom:10 }}>📍 Nearby Farmers</div>
        {geo.coords ? (
          <div>
            <div style={{ fontSize:12, color:T.success, fontWeight:700, fontFamily:"'Hind',sans-serif" }}>
              ✓ Location detected
            </div>
            <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>
              {geo.coords.lat.toFixed(3)}°N, {geo.coords.lng.toFixed(3)}°E
            </div>
            <button onClick={()=>setSort("nearby")}
              style={{ marginTop:8, width:"100%", padding:"6px 10px", border:`1px solid ${T.green}`,
                borderRadius:8, background:sort==="nearby"?T.green:"transparent",
                color:sort==="nearby"?"#fff":T.green, fontSize:12, fontWeight:700,
                cursor:"pointer", fontFamily:"'Hind',sans-serif", transition:"all 0.15s" }}>
              {sort==="nearby"?"✓ Sorted by distance":"Sort by nearest"}
            </button>
          </div>
        ) : geo.denied ? (
          <div style={{ fontSize:12, color:T.danger, fontFamily:"'Hind',sans-serif" }}>
            Permission denied. Enable location in browser settings.
          </div>
        ) : geo.loading ? (
          <div style={{ fontSize:12, color:T.textMuted, fontFamily:"'Hind',sans-serif" }}>
            📡 Detecting location...
          </div>
        ) : (
          <div>
            <div style={{ fontSize:11, color:T.textMuted, fontFamily:"'Hind',sans-serif", marginBottom:8 }}>
              Find fresh produce from farmers nearest to you.
            </div>
            <button onClick={geo.request}
              style={{ width:"100%", padding:"8px 10px", border:"none", borderRadius:8,
                background:T.green, color:"#fff", fontSize:12, fontWeight:700,
                cursor:"pointer", fontFamily:"'Hind',sans-serif" }}>
              📍 Detect My Location
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ background:T.surface, minHeight:"100vh" }}>
      <div style={{ display:"flex" }}>

        {/* ── DESKTOP SIDEBAR ── */}
        {bp !== "sm" && (
          <aside style={{ width:240, background:T.card, borderRight:`1px solid ${T.borderLight}`,
            padding:"22px 16px", flexShrink:0, alignSelf:"flex-start",
            position:"sticky", top:0, maxHeight:"100vh", overflowY:"auto" }}>
            <div style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:17, fontWeight:700,
              marginBottom:18, color:T.text }}>फिल्टर / Filters</div>
            <FilterPanel/>
          </aside>
        )}

        {/* ── MAIN ── */}
        <main style={{ flex:1, padding:bp==="sm"?"16px":"22px 28px", minWidth:0 }}>

          {/* Mobile filter toggle */}
          {bp==="sm" && (
            <div style={{ marginBottom:14 }}>
              <button onClick={()=>setShowFilters(!showFilters)}
                style={{ display:"flex", alignItems:"center", gap:7, padding:"8px 14px",
                  border:`1.5px solid ${T.border}`, borderRadius:10, background:T.card,
                  cursor:"pointer", fontSize:13, fontFamily:"'Hind',sans-serif", color:T.text }}>
                <SlidersHorizontal size={15}/> Filters & Category
                {(activeCat!=="all"||zone!=="all") && (
                  <span style={{ background:T.green, color:"#fff", borderRadius:"50%",
                    width:18, height:18, fontSize:10, fontWeight:900, display:"flex",
                    alignItems:"center", justifyContent:"center" }}>!</span>
                )}
              </button>
              {showFilters && (
                <div style={{ background:T.card, border:`1px solid ${T.borderLight}`,
                  borderRadius:14, padding:16, marginTop:10 }}>
                  <FilterPanel/>
                </div>
              )}
            </div>
          )}

          {/* Header row */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
            marginBottom:12, flexWrap:"wrap", gap:8 }}>
            <div>
              <h1 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif",
                fontSize:bp==="sm"?18:22, fontWeight:700, color:T.text }}>
                {activeCat==="all" ? "सबै उत्पादनहरू" : CATEGORIES.find(c=>c.id===activeCat)?.name}
              </h1>
              <div style={{ fontSize:12, color:T.textMuted }}>
                {sorted.length} products found
                {search && ` for "${search}"`}
                {sort==="nearby" && geo.coords && " · sorted by distance"}
              </div>
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              {bp!=="sm" && (
                <div style={{ position:"relative" }}>
                  <input value={search} onChange={e=>setSearch(e.target.value)}
                    placeholder="Search here..."
                    style={{ padding:"8px 34px 8px 12px", border:`1.5px solid ${T.border}`,
                      borderRadius:10, fontSize:13, fontFamily:"'Hind',sans-serif",
                      color:T.text, background:T.card, outline:"none", width:200 }}
                    onFocus={e=>e.target.style.borderColor=T.green}
                    onBlur={e=>e.target.style.borderColor=T.border}/>
                  <Search size={14} color={T.textMuted}
                    style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)" }}/>
                </div>
              )}
              <select value={sort} onChange={e=>setSort(e.target.value)}
                style={{ padding:"8px 12px", border:`1.5px solid ${T.border}`, borderRadius:10,
                  fontSize:13, fontFamily:"'Hind',sans-serif", color:T.text,
                  background:T.card, outline:"none" }}>
                <option value="trending">Trending</option>
                <option value="price_asc">Price ↑</option>
                <option value="price_desc">Price ↓</option>
                <option value="rating">Top Rated</option>
                <option value="nearby">{geo.coords?"📍 Nearest":"📍 Near (enable GPS)"}</option>
              </select>
            </div>
          </div>

          {/* Mobile quick search */}
          {bp==="sm" && (
            <div style={{ position:"relative", marginBottom:12 }}>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search products..."
                style={{ width:"100%", padding:"9px 34px 9px 12px", border:`1.5px solid ${T.border}`,
                  borderRadius:10, fontSize:13, fontFamily:"'Hind',sans-serif",
                  color:T.text, background:T.card, outline:"none" }}
                onFocus={e=>e.target.style.borderColor=T.green}
                onBlur={e=>e.target.style.borderColor=T.border}/>
              {search && (
                <X size={14} color={T.textMuted} style={{ position:"absolute", right:10, top:"50%",
                  transform:"translateY(-50%)", cursor:"pointer" }}
                  onClick={()=>setSearch("")}/>
              )}
            </div>
          )}

          {/* ── NEARBY FARMERS SECTION ── */}
          {geo.coords && nearby.length>0 && (
            <div style={{ marginBottom:28 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <div style={{ background:T.green, borderRadius:9, padding:"7px 9px", display:"flex" }}>
                  <Navigation size={16} color="#fff"/>
                </div>
                <div>
                  <div style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:bp==="sm"?16:18,
                    fontWeight:700, color:T.text }}>नजिकका किसानहरू</div>
                  <div style={{ fontSize:11, color:T.textMuted }}>Nearest farmers from your location</div>
                </div>
              </div>
              <div style={{ display:"grid",
                gridTemplateColumns:bp==="sm"?"repeat(2,1fr)":"repeat(4,1fr)", gap:12 }}>
                {nearby.map(p=>(
                  <ProductCard key={p.id} p={p} onView={d=>nav("product",d)}
                    onAdd={addCart} userCoords={geo.coords} compact/>
                ))}
              </div>
              <div style={{ height:1, background:T.borderLight, margin:"24px 0 8px" }}/>
            </div>
          )}

          {/* ── GPS CTA (if not detected) ── */}
          {!geo.coords && !geo.denied && !geo.loading && (
            <div style={{ background:T.greenPale, border:`1px solid ${T.green}30`,
              borderRadius:12, padding:"12px 16px", marginBottom:16,
              display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <MapPin size={18} color={T.green}/>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:T.text, fontFamily:"'Hind',sans-serif" }}>Find farmers near you</div>
                  <div style={{ fontSize:11, color:T.textMuted }}>नजिकका किसानहरू खोज्न लोकेसन अनुमति दिनुहोस्</div>
                </div>
              </div>
              <Btn variant="primary" size="sm" onClick={geo.request}>
                <Navigation size={13}/> Detect Location
              </Btn>
            </div>
          )}

          {/* ── PRODUCT GRID ── */}
          {sorted.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px 20px" }}>
              <div style={{ fontSize:64 }}>🔍</div>
              <h3 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:20,
                color:T.text, marginTop:16, marginBottom:8 }}>
                कुनै उत्पादन भेटिएन
              </h3>
              <p style={{ color:T.textMuted, fontSize:13, marginBottom:20 }}>
                No products match "<strong>{search || activeCat}</strong>".
                Try a different search or clear filters.
              </p>
              <Btn variant="ghost" onClick={()=>{ setSearch(""); setActiveCat("all"); setZone("all"); }}>
                Clear all filters
              </Btn>
            </div>
          ) : (
            <div style={{ display:"grid",
              gridTemplateColumns:bp==="sm"?"repeat(2,1fr)":bp==="md"?"repeat(2,1fr)":"repeat(3,1fr)",
              gap:bp==="sm"?12:18 }}>
              {sorted.map(p=>(
                <ProductCard key={p.id} p={p} onView={d=>nav("product",d)}
                  onAdd={addCart} userCoords={geo.coords}/>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   REVIEWS TAB  — Fully interactive
   ✅ Star rating picker (click to select 1–5 stars)
   ✅ Buyer submits text review + star rating
   ✅ Verified purchase badge
   ✅ Seller can reply to any review
   ✅ Helpful vote count
   ✅ Rating breakdown bar chart
   ✅ Sort by: Newest / Highest / Lowest / Helpful
───────────────────────────────────────────────────────────── */
const INITIAL_REVIEWS = [
  { id:1, name:"Ram Bahadur T.",  rating:5, text:"धेरै राम्रो! eSewa बाट भुक्तानी सजिलो। छिटो डेलिभरी।",                        date:"2081-01-15", verified:true,  helpful:12, sellerReply:null },
  { id:2, name:"Sunita Gurung",   rating:4, text:"Good quality product. Delivered on time to Pokhara. Will order again.",         date:"2081-01-10", verified:true,  helpful:8,  sellerReply:"Thank you Sunita ji! We are glad you liked it. 🙏" },
  { id:3, name:"Hari Yadav",      rating:5, text:"Best price in the market. COD option is very convenient for our village.",      date:"2081-01-05", verified:false, helpful:5,  sellerReply:null },
  { id:4, name:"Kamala Devi",     rating:3, text:"Product is okay but packaging was slightly damaged. Quality itself is fine.",   date:"2081-01-02", verified:true,  helpful:3,  sellerReply:"We sincerely apologize for the packaging issue. We have improved our packing process. 🙏" },
  { id:5, name:"Bikram Thapa",    rating:5, text:"एकदम राम्रो उत्पादन! खेतमा राम्रो नतिजा देखिन थाल्यो। सिफारिस गर्छु।",     date:"2080-12-28", verified:true,  helpful:15, sellerReply:null },
];

const StarPicker = ({ value, onChange, size=24 }) => (
  <div style={{ display:"flex", gap:4 }}>
    {[1,2,3,4,5].map(n=>(
      <span key={n}
        onClick={()=>onChange(n)}
        style={{ fontSize:size, cursor:"pointer", color:n<=value?T.gold:"#D0C0B0",
          transition:"color 0.1s, transform 0.1s", display:"inline-block" }}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.2)"}
        onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
        ★
      </span>
    ))}
  </div>
);

const ReviewsTab = ({ product:p }) => {
  const bp = useBreakpoint();

  /* ── Reviews state ── */
  const [reviews,    setReviews]    = useState(INITIAL_REVIEWS);
  const [sortBy,     setSortBy]     = useState("newest");
  const [replyingTo, setReplyingTo] = useState(null);   // review id
  const [replyText,  setReplyText]  = useState("");

  /* ── New review form ── */
  const [newRating,  setNewRating]  = useState(0);
  const [newText,    setNewText]    = useState("");
  const [newName,    setNewName]    = useState("");
  const [formError,  setFormError]  = useState("");
  const [submitted,  setSubmitted]  = useState(false);
  const [hovRating,  setHovRating]  = useState(0);     // hover state for picker

  /* ── Sorted reviews ── */
  const sorted = [...reviews].sort((a,b)=>{
    if (sortBy==="newest")  return b.id - a.id;
    if (sortBy==="highest") return b.rating - a.rating;
    if (sortBy==="lowest")  return a.rating - b.rating;
    if (sortBy==="helpful") return b.helpful - a.helpful;
    return 0;
  });

  /* ── Rating breakdown ── */
  const breakdown = [5,4,3,2,1].map(n=>({
    star:n,
    count:reviews.filter(r=>r.rating===n).length,
    pct: reviews.length ? Math.round(reviews.filter(r=>r.rating===n).length/reviews.length*100) : 0,
  }));
  const avgRating = reviews.length
    ? (reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1)
    : "0.0";

  /* ── Submit review ── */
  const submitReview = () => {
    if (!newName.trim()) { setFormError("Please enter your name."); return; }
    if (newRating === 0) { setFormError("Please select a star rating."); return; }
    if (!newText.trim() || newText.trim().length < 10) { setFormError("Please write at least 10 characters."); return; }
    const review = {
      id:        Date.now(),
      name:      newName.trim(),
      rating:    newRating,
      text:      newText.trim(),
      date:      "2081-01-" + String(new Date().getDate()).padStart(2,"0"),
      verified:  false,
      helpful:   0,
      sellerReply: null,
    };
    setReviews(prev => [review, ...prev]);
    setNewRating(0); setNewText(""); setNewName(""); setFormError("");
    setSubmitted(true);
    setTimeout(()=>setSubmitted(false), 4000);
  };

  /* ── Mark helpful ── */
  const markHelpful = id => {
    setReviews(prev=>prev.map(r=>r.id===id?{...r,helpful:r.helpful+1}:r));
  };

  /* ── Seller reply ── */
  const submitReply = (reviewId) => {
    if (!replyText.trim()) return;
    setReviews(prev=>prev.map(r=>
      r.id===reviewId ? {...r, sellerReply:replyText.trim()} : r
    ));
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <div>
      {/* ── Header: avg rating + breakdown ── */}
      <div style={{ display:"grid", gridTemplateColumns:bp==="sm"?"1fr":"200px 1fr",
        gap:20, marginBottom:28 }}>
        {/* Big avg */}
        <Card style={{ padding:20, textAlign:"center" }}>
          <div style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif",
            fontSize:56, fontWeight:900, color:T.green, lineHeight:1 }}>{avgRating}</div>
          <div style={{ display:"flex", justifyContent:"center", marginTop:4 }}>
            <StarPicker value={Math.round(+avgRating)} onChange={()=>{}} size={20}/>
          </div>
          <div style={{ fontSize:12, color:T.textMuted, marginTop:6 }}>
            {reviews.length} review{reviews.length!==1?"s":""}
          </div>
        </Card>

        {/* Bar breakdown */}
        <Card style={{ padding:20 }}>
          {breakdown.map(b=>(
            <div key={b.star} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
              <span style={{ fontSize:12, color:T.textMuted, width:28, textAlign:"right",
                flexShrink:0 }}>{b.star}★</span>
              <div style={{ flex:1, background:T.alt, borderRadius:6, height:10 }}>
                <div style={{ background:b.star>=4?T.success:b.star===3?T.warning:T.danger,
                  height:10, borderRadius:6, width:`${b.pct}%`,
                  transition:"width 0.4s ease" }}/>
              </div>
              <span style={{ fontSize:11, color:T.textMuted, width:28, flexShrink:0 }}>
                {b.count}
              </span>
            </div>
          ))}
        </Card>
      </div>

      {/* ── Sort + count ── */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
        marginBottom:16, flexWrap:"wrap", gap:10 }}>
        <div style={{ fontSize:13, fontWeight:700, color:T.text }}>
          {reviews.length} Customer Reviews
        </div>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
          style={{ padding:"7px 12px", border:`1.5px solid ${T.border}`, borderRadius:9,
            fontSize:12, fontFamily:"'Hind',sans-serif", color:T.text, background:T.card, outline:"none" }}>
          <option value="newest">Newest First</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {/* ── Review cards ── */}
      {sorted.map(rv=>(
        <Card key={rv.id} style={{ padding:bp==="sm"?16:20, marginBottom:14 }}>
          {/* Header row */}
          <div style={{ display:"flex", justifyContent:"space-between",
            alignItems:"flex-start", flexWrap:"wrap", gap:8 }}>
            <div style={{ display:"flex", gap:12, alignItems:"center" }}>
              <div style={{ width:38, height:38, borderRadius:"50%", background:T.green,
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"#fff", fontWeight:900, fontSize:14, flexShrink:0 }}>{rv.name[0]}</div>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap" }}>
                  <span style={{ fontWeight:800, fontSize:14, color:T.text }}>{rv.name}</span>
                  {rv.verified && (
                    <span style={{ fontSize:10, color:T.sky, background:T.skyLight,
                      borderRadius:4, padding:"2px 7px", fontWeight:700 }}>
                      ✓ Verified Purchase
                    </span>
                  )}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:3 }}>
                  <StarPicker value={rv.rating} onChange={()=>{}} size={15}/>
                  <span style={{ fontSize:11, color:T.textMuted }}>{rv.date} BS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Review text */}
          <p style={{ fontSize:13, color:T.text, marginTop:12, lineHeight:1.7,
            fontFamily:"'Hind',sans-serif" }}>{rv.text}</p>

          {/* Helpful + Seller reply button */}
          <div style={{ display:"flex", gap:10, marginTop:12, alignItems:"center",
            flexWrap:"wrap" }}>
            <button onClick={()=>markHelpful(rv.id)}
              style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 12px",
                border:`1px solid ${T.borderLight}`, borderRadius:8, background:T.card,
                cursor:"pointer", fontSize:12, color:T.textMuted, fontFamily:"'Hind',sans-serif",
                transition:"all 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=T.green}
              onMouseLeave={e=>e.currentTarget.style.borderColor=T.borderLight}>
              👍 Helpful ({rv.helpful})
            </button>
            {/* Seller reply toggle — visible to seller role */}
            {!rv.sellerReply && (
              <button onClick={()=>{ setReplyingTo(replyingTo===rv.id?null:rv.id); setReplyText(""); }}
                style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 12px",
                  border:`1px solid ${T.green}50`, borderRadius:8, background:T.greenPale,
                  cursor:"pointer", fontSize:12, color:T.green, fontFamily:"'Hind',sans-serif" }}>
                💬 Seller Reply
              </button>
            )}
          </div>

          {/* Seller reply input box */}
          {replyingTo===rv.id && !rv.sellerReply && (
            <div style={{ marginTop:14, background:T.greenPale, borderRadius:12,
              padding:14, border:`1px solid ${T.green}30` }}>
              <div style={{ fontSize:11, fontWeight:700, color:T.green, marginBottom:8 }}>
                Reply as Seller:
              </div>
              <textarea value={replyText} onChange={e=>setReplyText(e.target.value)}
                placeholder="Write your reply to this customer..."
                style={{ width:"100%", padding:"9px 12px", border:`1.5px solid ${T.green}40`,
                  borderRadius:9, fontSize:13, fontFamily:"'Hind',sans-serif",
                  minHeight:70, resize:"vertical", outline:"none", background:T.card }}/>
              <div style={{ display:"flex", gap:8, marginTop:10 }}>
                <Btn variant="primary" size="sm" onClick={()=>submitReply(rv.id)}
                  disabled={!replyText.trim()}>
                  <Check size={13}/> Post Reply
                </Btn>
                <Btn variant="secondary" size="sm"
                  onClick={()=>{ setReplyingTo(null); setReplyText(""); }}>
                  Cancel
                </Btn>
              </div>
            </div>
          )}

          {/* Existing seller reply */}
          {rv.sellerReply && (
            <div style={{ marginTop:14, background:T.greenPale, borderRadius:12,
              padding:"12px 16px", border:`1px solid ${T.green}30`,
              borderLeft:`4px solid ${T.green}` }}>
              <div style={{ fontSize:11, fontWeight:800, color:T.green, marginBottom:6,
                display:"flex", alignItems:"center", gap:6 }}>
                <span>👨‍🌾</span> Seller Response
              </div>
              <p style={{ fontSize:13, color:T.textMid, lineHeight:1.6,
                fontFamily:"'Hind',sans-serif" }}>{rv.sellerReply}</p>
              {/* Edit seller reply */}
              {replyingTo===`edit-${rv.id}` ? (
                <div style={{ marginTop:10 }}>
                  <textarea value={replyText} onChange={e=>setReplyText(e.target.value)}
                    style={{ width:"100%", padding:"8px 11px",
                      border:`1.5px solid ${T.green}40`, borderRadius:8, fontSize:12,
                      fontFamily:"'Hind',sans-serif", minHeight:60, resize:"vertical", outline:"none" }}/>
                  <div style={{ display:"flex", gap:7, marginTop:8 }}>
                    <Btn variant="primary" size="sm"
                      onClick={()=>{ setReviews(prev=>prev.map(r=>r.id===rv.id?{...r,sellerReply:replyText.trim()}:r)); setReplyingTo(null); setReplyText(""); }}>
                      <Check size={12}/> Update
                    </Btn>
                    <Btn variant="secondary" size="sm" onClick={()=>setReplyingTo(null)}>Cancel</Btn>
                  </div>
                </div>
              ) : (
                <button onClick={()=>{ setReplyingTo(`edit-${rv.id}`); setReplyText(rv.sellerReply); }}
                  style={{ fontSize:11, color:T.green, background:"none", border:"none",
                    cursor:"pointer", marginTop:6, textDecoration:"underline" }}>
                  Edit reply
                </button>
              )}
            </div>
          )}
        </Card>
      ))}

      {/* ── Write a review form ── */}
      <Card style={{ padding:bp==="sm"?16:24, marginTop:24,
        border:`1.5px solid ${T.green}30` }}>
        <h3 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:18,
          fontWeight:700, color:T.text, marginBottom:4 }}>
          समीक्षा लेख्नुहोस्
        </h3>
        <p style={{ fontSize:12, color:T.textMuted, marginBottom:18 }}>
          Write a Review for {p.name}
        </p>

        {/* Success banner */}
        {submitted && (
          <div style={{ background:"#E8F5E9", border:"1.5px solid #81C784", borderRadius:10,
            padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
            <Check size={16} color={T.success}/>
            <span style={{ fontSize:13, fontWeight:700, color:T.success }}>
              Review submitted! Thank you for your feedback. 🙏
            </span>
          </div>
        )}

        <div style={{ display:"grid", gridTemplateColumns:bp==="sm"?"1fr":"1fr 1fr",
          gap:14, marginBottom:14 }}>
          {/* Name */}
          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            <label style={{ fontSize:12, fontWeight:700, color:T.text }}>Your Name *</label>
            <input value={newName} onChange={e=>{ setNewName(e.target.value); setFormError(""); }}
              placeholder="e.g. Ram Bahadur Thapa"
              style={{ padding:"10px 13px", border:`1.5px solid ${T.border}`, borderRadius:10,
                fontSize:13, fontFamily:"'Hind',sans-serif", color:T.text, outline:"none" }}
              onFocus={e=>e.target.style.borderColor=T.green}
              onBlur={e=>e.target.style.borderColor=T.border}/>
          </div>

          {/* Star picker */}
          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            <label style={{ fontSize:12, fontWeight:700, color:T.text }}>Your Rating *</label>
            <div style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 0" }}>
              {[1,2,3,4,5].map(n=>(
                <span key={n}
                  onClick={()=>{ setNewRating(n); setFormError(""); }}
                  onMouseEnter={()=>setHovRating(n)}
                  onMouseLeave={()=>setHovRating(0)}
                  style={{ fontSize:34, cursor:"pointer",
                    color:(hovRating||newRating)>=n?T.gold:"#D0C0B0",
                    transition:"color 0.1s, transform 0.15s",
                    transform:(hovRating||newRating)>=n?"scale(1.15)":"scale(1)",
                    display:"inline-block" }}>
                  ★
                </span>
              ))}
              {newRating > 0 && (
                <span style={{ fontSize:12, color:T.textMuted, marginLeft:6 }}>
                  {["","Terrible","Poor","Okay","Good","Excellent!"][newRating]}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Review text */}
        <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:14 }}>
          <label style={{ fontSize:12, fontWeight:700, color:T.text }}>Your Review *</label>
          <textarea value={newText}
            onChange={e=>{ setNewText(e.target.value); setFormError(""); }}
            placeholder="Share your experience — quality, delivery, value for money… (minimum 10 characters)"
            style={{ width:"100%", padding:"10px 13px",
              border:`1.5px solid ${T.border}`, borderRadius:10,
              fontSize:13, fontFamily:"'Hind',sans-serif",
              minHeight:90, resize:"vertical", outline:"none" }}
            onFocus={e=>e.target.style.borderColor=T.green}
            onBlur={e=>e.target.style.borderColor=T.border}/>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:T.textMuted }}>
            <span>{newText.length}/500 characters</span>
            <span>{Math.max(0, 10-newText.trim().length)} more needed</span>
          </div>
        </div>

        {/* Error */}
        {formError && (
          <div style={{ background:"#FFEBEE", border:"1px solid #EF9A9A", borderRadius:8,
            padding:"8px 12px", marginBottom:12, fontSize:12, color:T.danger, fontWeight:700 }}>
            ⚠ {formError}
          </div>
        )}

        <Btn variant="primary" size="lg" onClick={submitReview}>
          <Check size={15}/> Submit Review
        </Btn>
      </Card>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PRODUCT DETAIL
───────────────────────────────────────────────────────────── */
const ProductDetail = ({ product:p, nav, addCart }) => {
  const bp = useBreakpoint();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("overview");
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  if (!p) return (
    <div style={{ padding:40, textAlign:"center" }}>
      <p>Product not found. <button onClick={()=>nav("products")} style={{ color:T.green, background:"none", border:"none", cursor:"pointer", fontWeight:700 }}>← Go back</button></p>
    </div>
  );

  const status = stockStatus(p);
  const isOut  = status === "out";

  const getAI = async () => {
    setAiLoading(true);
    const result = await callClaude(
      `You are a Nepal agricultural price prediction AI.
Product: ${p.name} (${p.np})
Category: ${CATEGORIES.find(c=>c.id===p.cat)?.name}
Current Price: NPR ${p.price}/${p.unit}
Discount: ${p.discount}%  Final price: NPR ${fp(p)}
Region: ${p.location}  Zone: ${p.zone}
Demand: ${p.demand}  Season: ${p.season}  Stock: ${p.stock}
Consider Nepal market purchasing power and seasonal patterns.
Respond ONLY with valid JSON, no markdown, no explanation outside JSON:
{"predictedPrice":number,"confidence":number,"trend":"rising|falling|stable","reasoning":"max 2 sentences","priceRange":{"min":number,"max":number},"recommendation":"1 short sentence for the seller"}`,
      {
        predictedPrice: Math.round(fp(p) * 1.1),
        confidence: 72,
        trend: "stable",
        reasoning: `${p.name} is in ${p.demand} demand in Nepal. Market prices are expected to stay near current levels.`,
        priceRange: { min: Math.round(fp(p)*0.88), max: Math.round(fp(p)*1.22) },
        recommendation: "Price near market average for best sales volume.",
      }
    );
    setAiResult(result);
    setAiLoading(false);
  };

  const tabs = ["overview","price","ai","specs","reviews"];

  return (
    <div style={{ background:T.surface, minHeight:"100vh", padding:bp==="sm"?"16px":"28px 48px" }}>
      <button onClick={()=>nav("products")}
        style={{ background:"none", border:"none", cursor:"pointer", color:T.green,
          fontWeight:700, fontSize:13, marginBottom:16, display:"flex", alignItems:"center", gap:5,
          fontFamily:"'Hind',sans-serif" }}>
        <ChevronLeft size={16}/> उत्पादनहरूमा फर्कनुहोस्
      </button>

      <div style={{ display:"grid", gridTemplateColumns:bp==="sm"?"1fr":"1fr 1fr", gap:bp==="sm"?20:40 }}>
        {/* Left */}
        <div>
          <div style={{ background:T.card, border:`1px solid ${T.borderLight}`, borderRadius:20,
            height:bp==="sm"?220:300, display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:bp==="sm"?100:140, marginBottom:12 }}>
            {p.img}
          </div>
          <Card style={{ padding:16 }}>
            <div style={{ display:"flex", gap:12, alignItems:"center" }}>
              <div style={{ width:44, height:44, borderRadius:10, background:T.green,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>👨‍🌾</div>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:T.text }}>{p.seller} {p.verified&&<span style={{ color:T.sky, fontSize:11 }}>✓</span>}</div>
                <div style={{ fontSize:11, color:T.textMuted }}><MapPin size={10}/> {p.location} · {p.zone}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right */}
        <div>
          <div style={{ fontSize:11, color:T.green, fontWeight:700, marginBottom:6 }}>
            {CATEGORIES.find(c=>c.id===p.cat)?.name} · {p.location}
          </div>
          <h1 style={{ fontFamily:"'Hind',sans-serif", fontSize:bp==="sm"?20:28,
            fontWeight:900, color:T.text, marginBottom:4 }}>{p.name}</h1>
          <div style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:14,
            color:T.textMid, marginBottom:10 }}>{p.np}</div>
          <Stars rating={p.rating} reviews={p.reviews}/>

          {/* Price */}
          <div style={{ display:"flex", alignItems:"baseline", gap:8, margin:"16px 0 8px" }}>
            <span style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif",
              fontSize:bp==="sm"?28:36, fontWeight:900, color:T.green }}>{npr(fp(p))}</span>
            <span style={{ fontSize:13, color:T.textMuted }}>/{p.unit}</span>
            {p.discount>0 && (
              <>
                <span style={{ fontSize:15, color:T.textMuted, textDecoration:"line-through" }}>{npr(p.price)}</span>
                <span style={{ background:T.red, color:"#fff", fontSize:12, fontWeight:900,
                  borderRadius:6, padding:"2px 8px" }}>-{p.discount}% Save {npr(p.price-fp(p))}</span>
              </>
            )}
          </div>
          {/* Stock status */}
          <div style={{ marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
            <StockBadge p={p}/>
            {status==="low" && (
              <span style={{ fontSize:12, color:T.warning, fontWeight:600 }}>
                ⚡ Hurry! Only {p.stock} {p.unit}s left
              </span>
            )}
          </div>
          {/* Tags */}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
            {p.tags.map(t=>(
              <span key={t} style={{ background:T.greenPale, color:T.green, fontSize:10,
                fontWeight:700, padding:"3px 9px", borderRadius:20, border:`1px solid ${T.green}30` }}>#{t}</span>
            ))}
          </div>

          <p style={{ fontSize:13, color:T.textMuted, lineHeight:1.7, marginBottom:18 }}>{p.desc}</p>

          {/* Spec grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:18 }}>
            {[["Season",p.season],["Demand",p.demand],["Delivery",p.delivery],["Zone",p.zone]].map(([k,v])=>(
              <div key={k} style={{ background:T.alt, borderRadius:10, padding:"10px 12px" }}>
                <div style={{ fontSize:10, color:T.textMuted }}>{k}</div>
                <div style={{ fontWeight:700, color:T.text, fontSize:13 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Qty + Cart */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, flexWrap:"wrap" }}>
            {!isOut && (
              <div style={{ display:"flex", border:`1.5px solid ${T.border}`, borderRadius:10, overflow:"hidden" }}>
                <button onClick={()=>setQty(Math.max(1,qty-1))}
                  style={{ padding:"9px 14px", border:"none", background:T.card, cursor:"pointer", fontSize:18 }}>−</button>
                <span style={{ padding:"9px 18px", fontWeight:900, fontSize:16 }}>{qty}</span>
                <button onClick={()=>setQty(Math.min(p.stock,qty+1))}
                  style={{ padding:"9px 14px", border:"none", background:T.card, cursor:"pointer", fontSize:18 }}>+</button>
              </div>
            )}
            {isOut ? (
              <div style={{ flex:1 }}>
                <div style={{ background:"#FFCDD2", border:"1.5px solid #EF9A9A", borderRadius:12,
                  padding:"14px 20px", textAlign:"center" }}>
                  <div style={{ fontSize:14, fontWeight:800, color:"#B71C1C", marginBottom:4 }}>
                    ❌ Currently Out of Stock
                  </div>
                  <div style={{ fontSize:12, color:"#C62828", marginBottom:12 }}>
                    This product is temporarily unavailable. Get notified when restocked.
                  </div>
                  <button style={{ background:"#B71C1C", color:"#fff", border:"none", borderRadius:9,
                    padding:"10px 24px", fontSize:13, fontWeight:700, cursor:"pointer",
                    fontFamily:"'Hind',sans-serif", display:"inline-flex", alignItems:"center", gap:7 }}>
                    🔔 Notify Me When Available
                  </button>
                </div>
              </div>
            ) : (
              <Btn variant="primary" size="lg" onClick={()=>addCart(p,qty)}
                style={{ flex:1, justifyContent:"center" }}>
                <ShoppingCart size={17}/> कार्टमा थप्नुहोस्
              </Btn>
            )}
          </div>

          {/* Payment methods */}
          <div style={{ background:T.card, borderRadius:12, padding:14, border:`1px solid ${T.borderLight}` }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.textMid, marginBottom:8 }}>भुक्तानी विधिहरू</div>
            <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
              {[p.esewa&&{l:"eSewa",c:T.esewa,i:"💚"}, p.khalti&&{l:"Khalti",c:T.khalti,i:"💜"},
                p.mobile&&{l:"Mobile",c:T.ime,i:"📱"}, p.cod&&{l:"COD",c:T.cod,i:"💵"},
                {l:"Card",c:"#635BFF",i:"💳"}].filter(Boolean).map(x=>(
                <div key={x.l} style={{ display:"flex", alignItems:"center", gap:4, padding:"4px 10px",
                  borderRadius:8, border:`1.5px solid ${x.c}40`, background:x.c+"10" }}>
                  <span style={{ fontSize:13 }}>{x.i}</span>
                  <span style={{ fontSize:11, fontWeight:700, color:x.c }}>{x.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginTop:36 }}>
        <div style={{ display:"flex", borderBottom:`2px solid ${T.borderLight}`,
          marginBottom:24, overflowX:"auto", gap:0 }}>
          {tabs.map(t=>(
            <button key={t} onClick={()=>setTab(t)}
              style={{ padding:"10px 18px", border:"none", background:"none", cursor:"pointer",
                fontFamily:"'Hind',sans-serif", fontSize:13, fontWeight:tab===t?700:500,
                color:tab===t?T.green:T.textMuted, borderBottom:`2px solid ${tab===t?T.green:"transparent"}`,
                marginBottom:-2, whiteSpace:"nowrap", transition:"all 0.15s" }}>
              {t==="ai"?"AI Prediction 🤖":t.charAt(0).toUpperCase()+t.slice(1).replace("_"," ")}
            </button>
          ))}
        </div>

        {tab==="overview" && (
          <div style={{ display:"grid", gridTemplateColumns:bp==="sm"?"1fr":"1fr 1fr", gap:16 }}>
            <Card style={{ padding:20 }}>
              <h4 style={{ fontWeight:700, marginBottom:14, color:T.text }}>Features</h4>
              {p.features.map((f,i)=>(
                <div key={i} style={{ display:"flex", gap:8, padding:"7px 0", borderBottom:`1px solid ${T.borderLight}` }}>
                  <Check size={14} color={T.green} style={{ marginTop:2, flexShrink:0 }}/>
                  <span style={{ fontSize:13, color:T.text }}>{f}</span>
                </div>
              ))}
            </Card>
            <Card style={{ padding:20 }}>
              <h4 style={{ fontWeight:700, marginBottom:14, color:T.text }}>Delivery Info</h4>
              {[["Delivery Time",p.delivery],["COD Available",p.cod?"Yes ✓":"No"],
                ["eSewa",p.esewa?"Yes ✓":"No"],["Khalti",p.khalti?"Yes ✓":"No"],
                ["Season",p.season],["Zone",p.zone]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0",
                  borderBottom:`1px solid ${T.borderLight}`, fontSize:13 }}>
                  <span style={{ color:T.textMuted }}>{k}</span>
                  <span style={{ fontWeight:700, color:T.text }}>{v}</span>
                </div>
              ))}
            </Card>
          </div>
        )}

        {tab==="price" && (
          <Card style={{ padding:20 }}>
            <h3 style={{ fontWeight:700, marginBottom:16, color:T.text }}>Price History (NPR)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={PRICE_HISTORY}>
                <defs>
                  <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={T.green} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={T.green} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={T.borderLight}/>
                <XAxis dataKey="m" fontSize={11}/>
                <YAxis fontSize={11} tickFormatter={v=>`रू${v}`}/>
                <Tooltip formatter={v=>[`रू ${v}`,"Price"]}/>
                <Area type="monotone" dataKey="tomato" stroke={T.green} fill="url(#pg)" strokeWidth={2} name="Price"/>
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        )}

        {tab==="ai" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
              marginBottom:20, flexWrap:"wrap", gap:12 }}>
              <div>
                <h3 style={{ fontWeight:700, color:T.text, fontSize:18 }}>🤖 AI Price Prediction</h3>
                <p style={{ color:T.textMuted, fontSize:12 }}>Nepal market analysis by Claude AI</p>
              </div>
              <Btn variant="accent" onClick={getAI} disabled={aiLoading}>
                <Zap size={14}/>{aiLoading?"Analysing...":"Get AI Prediction"}
              </Btn>
            </div>
            {!aiResult && !aiLoading && (
              <div style={{ textAlign:"center", padding:40, background:T.card,
                borderRadius:16, border:`1px solid ${T.borderLight}` }}>
                <div style={{ fontSize:56, marginBottom:14 }}>🤖</div>
                <h4 style={{ color:T.text, marginBottom:8 }}>AI मूल्य विश्लेषण</h4>
                <p style={{ color:T.textMuted, fontSize:13 }}>Click "Get AI Prediction" for Nepal market price analysis.</p>
              </div>
            )}
            {aiLoading && (
              <div style={{ textAlign:"center", padding:40 }}>
                <div style={{ fontSize:44, animation:"spin 1s linear infinite", display:"inline-block" }}>⚙️</div>
                <p style={{ color:T.textMuted, marginTop:12 }}>Analysing Nepal market...</p>
              </div>
            )}
            {aiResult && (
              <div style={{ display:"grid", gridTemplateColumns:bp==="sm"?"1fr":"1fr 1fr 1fr", gap:14 }}>
                <Card style={{ padding:18 }}>
                  <div style={{ fontSize:11, color:T.textMuted, marginBottom:5 }}>Predicted Price</div>
                  <div style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:28, fontWeight:900, color:T.green }}>{npr(aiResult.predictedPrice)}</div>
                  <div style={{ fontSize:11, color:T.textMuted }}>vs current {npr(p.price)}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:8 }}>
                    {aiResult.trend==="rising"?<ArrowUpRight size={14} color={T.success}/>:aiResult.trend==="falling"?<ArrowDownRight size={14} color={T.danger}/>:<Activity size={14} color={T.sky}/>}
                    <span style={{ fontSize:12, fontWeight:700, color:aiResult.trend==="rising"?T.success:aiResult.trend==="falling"?T.danger:T.sky }}>Price {aiResult.trend}</span>
                  </div>
                </Card>
                <Card style={{ padding:18 }}>
                  <div style={{ fontSize:11, color:T.textMuted, marginBottom:5 }}>Confidence</div>
                  <div style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:28, fontWeight:900, color:T.saffron }}>{aiResult.confidence}%</div>
                  <div style={{ background:T.alt, borderRadius:6, height:7, marginTop:10 }}>
                    <div style={{ background:T.saffron, height:7, borderRadius:6, width:`${aiResult.confidence}%` }}/>
                  </div>
                </Card>
                <Card style={{ padding:18 }}>
                  <div style={{ fontSize:11, color:T.textMuted, marginBottom:5 }}>Range</div>
                  <div style={{ fontWeight:700, color:T.text, fontSize:15 }}>{npr(aiResult.priceRange.min)} – {npr(aiResult.priceRange.max)}</div>
                  <div style={{ fontSize:11, color:T.textMuted, marginTop:4 }}>Expected market range</div>
                </Card>
                <Card style={{ padding:18, gridColumn:bp==="sm"?"span 1":"span 2" }}>
                  <div style={{ fontSize:11, color:T.textMuted, fontWeight:700, marginBottom:8 }}>Analysis</div>
                  <p style={{ fontSize:13, color:T.text, lineHeight:1.7 }}>{aiResult.reasoning}</p>
                  <div style={{ marginTop:10, background:T.greenPale, borderRadius:8, padding:"10px 12px", borderLeft:`3px solid ${T.green}` }}>
                    <div style={{ fontSize:10, color:T.green, fontWeight:700, marginBottom:3 }}>RECOMMENDATION</div>
                    <div style={{ fontSize:12, color:T.text }}>{aiResult.recommendation}</div>
                  </div>
                </Card>
                <Card style={{ padding:18 }}>
                  <div style={{ fontSize:11, color:T.textMuted, fontWeight:700, marginBottom:8 }}>Inputs</div>
                  {[["Season",p.season],["Demand",p.demand],["Zone",p.zone]].map(([k,v])=>(
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:12, padding:"5px 0", borderTop:`1px solid ${T.borderLight}`, marginTop:4 }}>
                      <span style={{ color:T.textMuted }}>{k}</span>
                      <span style={{ fontWeight:700 }}>{v}</span>
                    </div>
                  ))}
                </Card>
              </div>
            )}
          </div>
        )}

        {tab==="specs" && (
          <Card style={{ padding:22 }}>
            {Object.entries(p.specs).map(([k,v])=>(
              <div key={k} style={{ display:"flex", padding:"10px 0", borderBottom:`1px solid ${T.borderLight}`, fontSize:13 }}>
                <span style={{ color:T.textMuted, minWidth:180 }}>{k}</span>
                <span style={{ fontWeight:700, color:T.text }}>{v}</span>
              </div>
            ))}
          </Card>
        )}

        {tab==="reviews" && (
          <ReviewsTab product={p} user={null}/>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   CART
───────────────────────────────────────────────────────────── */
const CartPage = ({ cart, setCart, nav }) => {
  const bp = useBreakpoint();
  const total = cart.reduce((s,i)=>s+fp(i)*i.qty, 0);
  const delivery = total>2000?0:150;
  const upd = (id,d) => setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const rem = id => setCart(c=>c.filter(i=>i.id!==id));

  if (!cart.length) return (
    <div style={{ minHeight:"100vh", background:T.surface, display:"flex", alignItems:"center",
      justifyContent:"center", flexDirection:"column", gap:14, padding:20 }}>
      <div style={{ fontSize:72 }}>🛒</div>
      <h2 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:22, color:T.text }}>कार्ट खाली छ</h2>
      <Btn variant="primary" onClick={()=>nav("products")}>किनमेल गर्नुहोस्</Btn>
    </div>
  );

  return (
    <div style={{ background:T.surface, minHeight:"100vh", padding:bp==="sm"?"16px":"28px 48px" }}>
      <h1 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:bp==="sm"?20:26,
        fontWeight:700, color:T.text, marginBottom:22 }}>मेरो कार्ट ({cart.length})</h1>
      <div style={{ display:"grid", gridTemplateColumns:bp==="sm"?"1fr":"1fr 340px", gap:20 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {cart.map(item=>(
            <Card key={item.id} style={{ padding:bp==="sm"?14:18 }}>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ width:bp==="sm"?60:72, height:bp==="sm"?60:72, background:T.alt,
                  borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:bp==="sm"?28:34, flexShrink:0 }}>{item.img}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:700, fontSize:bp==="sm"?13:15, color:T.text,
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.name}</div>
                  <div style={{ fontSize:11, color:T.textMuted }}>by {item.seller}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:T.green, fontFamily:"'Tiro Devanagari Sanskrit',serif" }}>{npr(fp(item))}/{item.unit}</div>
                </div>
                <div style={{ display:"flex", flexDirection:bp==="sm"?"column":"row",
                  alignItems:bp==="sm"?"flex-end":"center", gap:8 }}>
                  <div style={{ display:"flex", border:`1.5px solid ${T.border}`,
                    borderRadius:8, overflow:"hidden" }}>
                    <button onClick={()=>upd(item.id,-1)} style={{ padding:"5px 10px", border:"none", background:T.card, cursor:"pointer", fontSize:16 }}>−</button>
                    <span style={{ padding:"5px 12px", fontWeight:900 }}>{item.qty}</span>
                    <button onClick={()=>upd(item.id,1)} style={{ padding:"5px 10px", border:"none", background:T.card, cursor:"pointer", fontSize:16 }}>+</button>
                  </div>
                  <div style={{ fontWeight:900, fontSize:14, color:T.text, whiteSpace:"nowrap" }}>{npr(fp(item)*item.qty)}</div>
                  <button onClick={()=>rem(item.id)} style={{ border:"none", background:"none", cursor:"pointer", color:T.danger }}>
                    <X size={16}/>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Card style={{ padding:20, alignSelf:"start", position:bp==="sm"?"static":"sticky", top:90 }}>
          <h3 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:17, fontWeight:700, color:T.text, marginBottom:16 }}>अर्डर सारांश</h3>
          {[["Subtotal",npr(total)],["Delivery",delivery===0?"FREE":npr(delivery)],["VAT (13%)",npr(Math.round(total*0.13))]].map(([k,v])=>(
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0",
              borderBottom:`1px solid ${T.borderLight}`, fontSize:13 }}>
              <span style={{ color:T.textMuted }}>{k}</span>
              <span style={{ fontWeight:700, color:k==="Delivery"&&delivery===0?T.success:T.text }}>{v}</span>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 0", fontSize:16, fontWeight:900 }}>
            <span>Total</span>
            <span style={{ color:T.green, fontFamily:"'Tiro Devanagari Sanskrit',serif" }}>{npr(total+delivery+Math.round(total*0.13))}</span>
          </div>
          {delivery>0 && <div style={{ fontSize:11, color:T.success, marginBottom:12 }}>Add {npr(2000-total)} more for free delivery!</div>}
          <Btn variant="primary" size="lg" onClick={()=>nav("checkout")} style={{ width:"100%", justifyContent:"center" }}>
            <CreditCard size={16}/> Checkout
          </Btn>
        </Card>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   CHECKOUT
───────────────────────────────────────────────────────────── */
const CheckoutPage = ({ cart, nav, onDone }) => {
  const bp = useBreakpoint();
  const [step, setStep] = useState(1);
  const [pay, setPay] = useState("esewa");
  const [addr, setAddr] = useState({ name:"", phone:"", district:"", street:"" });
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const total = cart.reduce((s,i)=>s+fp(i)*i.qty,0);
  const PAYS = [
    {id:"esewa",label:"eSewa",icon:"💚",color:T.esewa,desc:"Nepal's most popular wallet"},
    {id:"khalti",label:"Khalti",icon:"💜",color:T.khalti,desc:"Fast mobile payment"},
    {id:"ime",label:"IME Pay",icon:"🔵",color:T.ime,desc:"IME Digital wallet"},
    {id:"mobile",label:"Mobile Banking",icon:"📱",color:"#1A5276",desc:"NIC Asia, Nabil, Himalayan Bank"},
    {id:"cod",label:"Cash on Delivery",icon:"💵",color:T.cod,desc:"Pay when you receive"},
    {id:"stripe",label:"Card (Stripe)",icon:"💳",color:"#635BFF",desc:"Visa / Mastercard"},
  ];

  const handlePay = async () => {
    setProcessing(true);
    await new Promise(r=>setTimeout(r,2000));
    setProcessing(false); setDone(true);
    setTimeout(()=>{ onDone(); nav("orders"); }, 1500);
  };

  if (done) return (
    <div style={{ minHeight:"100vh", background:T.surface, display:"flex", alignItems:"center",
      justifyContent:"center", flexDirection:"column", gap:14 }}>
      <div style={{ width:72, height:72, borderRadius:"50%", background:T.success,
        display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Check size={36} color="#fff"/>
      </div>
      <h2 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:24, color:T.text }}>अर्डर सफल भयो!</h2>
      <p style={{ color:T.textMuted }}>SMS confirmation will be sent to your mobile.</p>
    </div>
  );

  return (
    <div style={{ background:T.surface, minHeight:"100vh", padding:bp==="sm"?"16px":"28px 48px" }}>
      <h1 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:bp==="sm"?20:26, fontWeight:700, color:T.text, marginBottom:22 }}>Checkout — भुक्तानी</h1>

      {/* Steps */}
      <div style={{ display:"flex", alignItems:"center", marginBottom:28 }}>
        {[["1","Delivery"],["2","Payment"],["3","Confirm"]].map(([n,l],i)=>(
          <div key={n} style={{ display:"flex", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <div style={{ width:30, height:30, borderRadius:"50%",
                background:step>=Number(n)?T.green:T.border, color:step>=Number(n)?"#fff":T.textMuted,
                display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:13 }}>{n}</div>
              {bp!=="sm" && <span style={{ fontSize:13, fontWeight:step===Number(n)?700:400, color:step>=Number(n)?T.text:T.textMuted }}>{l}</span>}
            </div>
            {i<2 && <div style={{ width:bp==="sm"?20:40, height:2, background:step>Number(n)?T.green:T.border, margin:"0 10px" }}/>}
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:bp==="sm"?"1fr":"1fr 320px", gap:20 }}>
        <div>
          {step===1 && (
            <Card style={{ padding:22 }}>
              <h3 style={{ fontWeight:700, fontSize:16, marginBottom:18, color:T.text }}>डेलिभरी ठेगाना</h3>
              <div style={{ display:"grid", gridTemplateColumns:bp==="sm"?"1fr":"1fr 1fr", gap:14 }}>
                <Input label="Full Name" value={addr.name} onChange={v=>setAddr(a=>({...a,name:v}))} placeholder="Ram Bahadur Thapa"/>
                <Input label="Phone" value={addr.phone} onChange={v=>setAddr(a=>({...a,phone:v}))} placeholder="98XXXXXXXX"/>
                <Select label="District" value={addr.district} onChange={v=>setAddr(a=>({...a,district:v}))}
                  options={["","Kathmandu","Lalitpur","Bhaktapur","Pokhara","Chitwan","Butwal","Biratnagar","Birgunj"].map(d=>({v:d,l:d||"-- Select --"}))}/>
                <Input label="Street / Ward" value={addr.street} onChange={v=>setAddr(a=>({...a,street:v}))} placeholder="Ward No., Tole"/>
              </div>
              <Btn variant="primary" style={{ marginTop:18 }} onClick={()=>setStep(2)}>Continue <ArrowRight size={15}/></Btn>
            </Card>
          )}
          {step===2 && (
            <Card style={{ padding:22 }}>
              <h3 style={{ fontWeight:700, fontSize:16, marginBottom:18, color:T.text }}>भुक्तानी विधि</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {PAYS.map(pm=>(
                  <div key={pm.id} onClick={()=>setPay(pm.id)}
                    style={{ padding:"14px 18px", borderRadius:12, cursor:"pointer", display:"flex", gap:12, alignItems:"center",
                      border:`2px solid ${pay===pm.id?pm.color:T.border}`,
                      background:pay===pm.id?pm.color+"0D":T.card, transition:"all 0.15s" }}>
                    <span style={{ fontSize:22 }}>{pm.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, color:T.text }}>{pm.label}</div>
                      <div style={{ fontSize:12, color:T.textMuted }}>{pm.desc}</div>
                    </div>
                    <div style={{ width:18, height:18, borderRadius:"50%",
                      border:`2px solid ${pay===pm.id?pm.color:T.border}`,
                      background:pay===pm.id?pm.color:"transparent",
                      display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {pay===pm.id && <div style={{ width:7, height:7, borderRadius:"50%", background:"#fff" }}/>}
                    </div>
                  </div>
                ))}
              </div>
              {pay==="stripe" && (
                <div style={{ marginTop:14, background:T.alt, borderRadius:12, padding:16 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.textMuted, marginBottom:10 }}>TEST CARD</div>
                  <div style={{ display:"grid", gap:10 }}>
                    <Input label="Card Number" value="4242 4242 4242 4242" onChange={()=>{}}/>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                      <Input label="Expiry" value="12/28" onChange={()=>{}}/>
                      <Input label="CVV" value="123" onChange={()=>{}}/>
                    </div>
                  </div>
                </div>
              )}
              <div style={{ display:"flex", gap:10, marginTop:18 }}>
                <Btn variant="secondary" onClick={()=>setStep(1)}>← Back</Btn>
                <Btn variant="primary" onClick={()=>setStep(3)}>Review Order <ArrowRight size={15}/></Btn>
              </div>
            </Card>
          )}
          {step===3 && (
            <Card style={{ padding:22 }}>
              <h3 style={{ fontWeight:700, fontSize:16, marginBottom:18, color:T.text }}>Order Confirmation</h3>
              {cart.map(item=>(
                <div key={item.id} style={{ display:"flex", gap:10, padding:"10px 0", borderBottom:`1px solid ${T.borderLight}` }}>
                  <span style={{ fontSize:26 }}>{item.img}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:13 }}>{item.name}</div>
                    <div style={{ fontSize:11, color:T.textMuted }}>Qty: {item.qty}</div>
                  </div>
                  <div style={{ fontWeight:900 }}>{npr(fp(item)*item.qty)}</div>
                </div>
              ))}
              <div style={{ margin:"16px 0", padding:14, background:T.alt, borderRadius:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontWeight:900, fontSize:15 }}>
                  <span>Total</span>
                  <span style={{ color:T.green, fontFamily:"'Tiro Devanagari Sanskrit',serif" }}>{npr(total)}</span>
                </div>
                <div style={{ fontSize:12, color:T.textMuted, marginTop:4 }}>Payment: {PAYS.find(x=>x.id===pay)?.label}</div>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <Btn variant="secondary" onClick={()=>setStep(2)}>← Back</Btn>
                <Btn variant="success" onClick={handlePay} disabled={processing} style={{ flex:1, justifyContent:"center" }}>
                  {processing?"⏳ Processing...":<><Check size={15}/> Confirm — {npr(total)}</>}
                </Btn>
              </div>
            </Card>
          )}
        </div>

        {/* Summary */}
        <Card style={{ padding:18, alignSelf:"start" }}>
          <h4 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:15, fontWeight:700, marginBottom:14, color:T.text }}>Summary</h4>
          {cart.map(i=>(
            <div key={i.id} style={{ display:"flex", justifyContent:"space-between", fontSize:12, padding:"5px 0" }}>
              <span style={{ color:T.textMuted }}>{i.name} × {i.qty}</span>
              <span style={{ fontWeight:700 }}>{npr(fp(i)*i.qty)}</span>
            </div>
          ))}
          <div style={{ borderTop:`2px solid ${T.border}`, marginTop:10, paddingTop:10,
            display:"flex", justifyContent:"space-between", fontWeight:900, fontSize:15 }}>
            <span>Total</span>
            <span style={{ color:T.green, fontFamily:"'Tiro Devanagari Sanskrit',serif" }}>{npr(total)}</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   ORDERS
───────────────────────────────────────────────────────────── */
const OrdersPage = () => {
  const bp = useBreakpoint();
  return (
    <div style={{ background:T.surface, minHeight:"100vh", padding:bp==="sm"?"16px":"28px 48px" }}>
      <h1 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:bp==="sm"?20:26, fontWeight:700, color:T.text, marginBottom:22 }}>मेरा अर्डरहरू</h1>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {ORDERS_DEMO.map(o=>(
          <Card key={o.id} style={{ padding:bp==="sm"?16:22 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10 }}>
              <div style={{ display:"flex", gap:12 }}>
                <div style={{ width:48, height:48, background:T.alt, borderRadius:10,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>📦</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:T.text }}>{o.product}</div>
                  <div style={{ fontSize:11, color:T.textMuted }}>#{o.id} · {o.date} BS · {o.pay}</div>
                  <div style={{ fontSize:16, fontWeight:900, color:T.green, fontFamily:"'Tiro Devanagari Sanskrit',serif" }}>{npr(o.amount)}</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <Badge status={o.status}/>
              </div>
            </div>
            {/* Progress */}
            <div style={{ marginTop:16, display:"flex" }}>
              {["Pending","Processing","Shipped","Delivered"].map((s,i)=>{
                const idx = ["Pending","Processing","Shipped","Delivered"].indexOf(o.status);
                const done = i<=idx;
                return (
                  <div key={s} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:i===0?"flex-start":i===3?"flex-end":"center" }}>
                    <div style={{ display:"flex", alignItems:"center", width:"100%" }}>
                      {i>0 && <div style={{ flex:1, height:3, background:done?T.green:T.border }}/>}
                      <div style={{ width:18, height:18, borderRadius:"50%", background:done?T.green:T.border,
                        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        {done && <Check size={10} color="#fff"/>}
                      </div>
                      {i<3 && <div style={{ flex:1, height:3, background:i<idx?T.green:T.border }}/>}
                    </div>
                    <div style={{ fontSize:9, color:done?T.green:T.textMuted, marginTop:4, fontWeight:done?700:400 }}>{s}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   SELLER DASHBOARD HELPERS — defined OUTSIDE the component
   so React never sees them as "new" types on re-render.
   This fixes the "one letter allowed" bug: FRow defined inside
   a component causes unmount/remount on every keystroke because
   React treats inline component definitions as new types.
───────────────────────────────────────────────────────────── */
const SD_BLANK = {
  name:"", np:"", price:"", discount:"0", stock:"",
  unit:"kg", cat:"fv", desc:"", season:"All Season",
  demand:"Medium", zone:"Terai",
};

const SD_INITIAL_PRODUCTS = PRODUCTS.filter(p => [1,2,3,12,19,23].includes(p.id));

/* Reusable form-row with label + optional error — OUTSIDE component */
const FRow = ({ label, error, span, bp, children }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:5,
    gridColumn: bp!=="sm" && span===2 ? "span 2" : "span 1" }}>
    <label style={{ fontSize:12, fontWeight:700, color:T.text }}>{label}</label>
    {children}
    {error && <span style={{ fontSize:11, color:T.danger, fontWeight:600 }}>⚠ {error}</span>}
  </div>
);

/* Input style helper — pure function, safe outside */
const sdInputStyle = (err) => ({
  padding:"10px 13px",
  border:`1.5px solid ${err ? T.danger : T.border}`,
  borderRadius:10, fontSize:14,
  fontFamily:"'Hind',sans-serif",
  color:T.text, outline:"none",
  width:"100%", background:T.card,
});

const sdSelectStyle = {
  padding:"10px 13px",
  border:`1.5px solid ${T.border}`,
  borderRadius:10, fontSize:14,
  fontFamily:"'Hind',sans-serif",
  color:T.text, background:T.card, outline:"none",
};

/* Tab definitions — constant, never needs to be inside component */
const SD_TABS = [
  { id:"overview",  l:"Overview",    icon:BarChart2   },
  { id:"products",  l:"My Products", icon:Package     },
  { id:"orders",    l:"Orders",      icon:ShoppingBag },
  { id:"add",       l:"Add Product", icon:Plus        },
  { id:"analytics", l:"Analytics",   icon:TrendingUp  },
];

/* ─────────────────────────────────────────────────────────────
   SELLER DASHBOARD  (fully rewritten)
   ✅ Real sellerProducts state  — add / remove persists in session
   ✅ Add Product form with validation + live preview
   ✅ Remove button with confirm step
   ✅ Toggle stock (restock / mark out-of-stock)
   ✅ AI price via callClaude() — correct headers included
   ✅ StockBadge shown in table
───────────────────────────────────────────────────────────── */
const SellerDash = ({ user }) => {
  const bp = useBreakpoint();
  const [tab, setTab] = useState("overview");

  /* ── Real product state — uses EXTERNAL constant so it never re-initialises ── */
  const [sellerProducts, setSellerProducts] = useState(SD_INITIAL_PRODUCTS);
  const [deleteConfirm,  setDeleteConfirm]  = useState(null);

  /* ── Add-product form — uses EXTERNAL BLANK constant ── */
  const [form,       setForm]       = useState(SD_BLANK);
  const [formErr,    setFormErr]    = useState({});
  const [addSuccess, setAddSuccess] = useState(false);

  /* ── AI price ── */
  const [aiPrice,   setAiPrice]   = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  /* ── setF: update one form field and clear its error ── */
  const setF = useCallback((key, val) => {
    setForm(f => ({...f, [key]:val}));
    setFormErr(e => ({...e, [key]:""}));
  }, []);

  /* ── AI price suggestion ── */
  const getAIPrice = async () => {
    if (!form.name.trim()) { setFormErr(e=>({...e,name:"Enter product name first"})); return; }
    setAiLoading(true);
    const result = await callClaude(
      `Nepal agricultural marketplace. Suggest optimal selling price for:
Product: ${form.name}  Category: ${CATEGORIES.find(c=>c.id===form.cat)?.name}
Stock: ${form.stock||100} ${form.unit}  Season: ${form.season}
Demand: ${form.demand}  Zone: ${form.zone}
Respond ONLY valid JSON no markdown:
{"suggestedPrice":number,"minPrice":number,"maxPrice":number,"confidence":number,"reasoning":"1 concise sentence","trend":"rising|stable|falling"}`,
      { suggestedPrice:450, minPrice:360, maxPrice:560, confidence:68,
        reasoning:"Based on current Nepal market demand and seasonal patterns.", trend:"stable" }
    );
    setAiPrice(result);
    if (result?.suggestedPrice) setF("price", String(result.suggestedPrice));
    setAiLoading(false);
  };

  /* ── Form validation ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim())                e.name  = "Product name is required";
    if (!form.price || +form.price <= 0)  e.price = "Enter a valid price";
    if (form.stock==="" || +form.stock<0) e.stock = "Enter stock quantity (0 or more)";
    if (!form.desc.trim())                e.desc  = "Description is required";
    setFormErr(e);
    return Object.keys(e).length === 0;
  };

  /* ── Add product ── */
  const handleAdd = () => {
    if (!validate()) return;
    const catIcons = { fv:"🥦", sp:"🌱", fp:"🧪", ft:"🔧", la:"🐄", ir:"💧", aa:"🧺", or:"🌿" };
    const p = {
      id:        Date.now(),
      name:      form.name.trim(),
      np:        form.np.trim() || form.name.trim(),
      cat:       form.cat,
      price:     +form.price,
      discount:  +form.discount || 0,
      stock:     +form.stock,
      unit:      form.unit,
      seller:    user?.name || "My Farm",
      verified:  true,
      location:  "Nepal",
      zone:      form.zone,
      rating:    0, reviews:0,
      delivery:  "3–5 days",
      cod:true, esewa:true, khalti:true, mobile:true,
      demand:    form.demand,
      season:    form.season,
      tags:      [form.cat],
      desc:      form.desc.trim(),
      features:  ["Farm fresh","Quality guaranteed"],
      specs:     { Category: CATEGORIES.find(c=>c.id===form.cat)?.name, Unit: form.unit },
      img:       catIcons[form.cat] || "🌾",
      trending:false, flash:false,
      lat:27.70, lng:85.32,
      outOfStock: +form.stock === 0,
      isNew: true,
    };
    setSellerProducts(prev => [p, ...prev]);
    setForm(SD_BLANK);
    setAiPrice(null);
    setFormErr({});
    setAddSuccess(true);
    setTimeout(() => setAddSuccess(false), 4000);
    setTab("products");
  };

  /* ── Remove product ── */
  const handleRemove = id => {
    setSellerProducts(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
  };

  /* ── Toggle out-of-stock ── */
  const toggleStock = id => {
    setSellerProducts(prev => prev.map(p =>
      p.id === id
        ? { ...p, outOfStock: !p.outOfStock, stock: p.outOfStock ? 100 : 0 }
        : p
    ));
  };

  /* stock counts for overview cards */
  const inCnt  = sellerProducts.filter(p => stockStatus(p)==="in").length;
  const lowCnt = sellerProducts.filter(p => stockStatus(p)==="low").length;
  const outCnt = sellerProducts.filter(p => stockStatus(p)==="out").length;

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:T.surface }}>

      {/* ── SIDEBAR ── */}
      <aside style={{ width:bp==="sm"?0:215, background:T.dark,
        padding:bp==="sm"?0:"22px 14px", flexShrink:0, overflow:"hidden" }}>
        {bp!=="sm" && (
          <>
            <div style={{ color:T.saffronLight, fontFamily:"'Tiro Devanagari Sanskrit',serif",
              fontSize:15, fontWeight:700, marginBottom:22, padding:"0 6px" }}>बिक्रेता प्यानल</div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20,
              padding:10, background:"rgba(255,255,255,0.06)", borderRadius:10 }}>
              <div style={{ width:34, height:34, borderRadius:"50%", background:T.green,
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"#fff", fontWeight:900, fontSize:15 }}>
                {user?.name?.[0]||"S"}
              </div>
              <div>
                <div style={{ color:"#fff", fontSize:12, fontWeight:700 }}>{user?.name||"Seller"}</div>
                <div style={{ color:T.saffronLight, fontSize:10 }}>✓ Verified Seller</div>
              </div>
            </div>
            {SD_TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"10px 12px",
                  border:"none", borderRadius:10, cursor:"pointer", marginBottom:3,
                  fontFamily:"'Hind',sans-serif", fontSize:13, textAlign:"left",
                  fontWeight: tab===t.id ? 700 : 400,
                  background: tab===t.id ? T.green : "transparent",
                  color:      tab===t.id ? "#fff" : "rgba(255,255,255,0.5)" }}>
                <t.icon size={15}/>{t.l}
                {t.id==="products" && sellerProducts.length > 0 && (
                  <span style={{ marginLeft:"auto", background:"rgba(255,255,255,0.2)", borderRadius:10,
                    padding:"1px 8px", fontSize:11, fontWeight:900 }}>
                    {sellerProducts.length}
                  </span>
                )}
              </button>
            ))}
          </>
        )}
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex:1, padding:bp==="sm"?"16px":"24px 30px", minWidth:0 }}>

        {/* Mobile tab strip */}
        {bp==="sm" && (
          <div style={{ display:"flex", gap:6, overflowX:"auto", marginBottom:16,
            paddingBottom:4, scrollbarWidth:"none" }}>
            {SD_TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                style={{ flexShrink:0, padding:"7px 14px", border:"none", borderRadius:20,
                  cursor:"pointer", fontSize:12, fontFamily:"'Hind',sans-serif", fontWeight:700,
                  background:tab===t.id?T.green:T.alt, color:tab===t.id?"#fff":T.text }}>
                {t.l}
              </button>
            ))}
          </div>
        )}

        {/* ══ OVERVIEW ══════════════════════════════════════════ */}
        {tab==="overview" && (
          <div>
            <h1 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif",
              fontSize:bp==="sm"?20:24, fontWeight:700, color:T.text, marginBottom:20 }}>
              Dashboard
            </h1>

            {/* KPI cards */}
            <div style={{ display:"grid",
              gridTemplateColumns:bp==="sm"?"repeat(2,1fr)":"repeat(4,1fr)",
              gap:12, marginBottom:20 }}>
              <Metric title="Revenue"       value="रू 1,84,500" change="22.4" pos icon={DollarSign} color={T.success}/>
              <Metric title="Orders"        value="342"         change="14.2" pos icon={ShoppingBag} color={T.sky}/>
              <Metric title="Products"      value={sellerProducts.length}     icon={Package}    color={T.green}/>
              <Metric title="Avg Rating"    value="4.7 ★"       change="1.8"  pos icon={Star}       color={T.gold}/>
            </div>

            {/* Stock overview */}
            <div style={{ display:"grid",
              gridTemplateColumns:bp==="sm"?"repeat(3,1fr)":"repeat(3,1fr)",
              gap:12, marginBottom:20 }}>
              {[
                { l:"In Stock",     n:inCnt,  c:T.success, bg:"#E8F5E9" },
                { l:"Low Stock",    n:lowCnt, c:T.warning, bg:"#FFF3E0" },
                { l:"Out of Stock", n:outCnt, c:T.danger,  bg:"#FFEBEE" },
              ].map(s=>(
                <div key={s.l} style={{ background:s.bg, border:`1px solid ${s.c}30`,
                  borderRadius:12, padding:"14px 18px" }}>
                  <div style={{ fontSize:11, color:s.c, fontWeight:700, marginBottom:4 }}>{s.l}</div>
                  <div style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif",
                    fontSize:28, fontWeight:900, color:s.c }}>{s.n}</div>
                  <div style={{ fontSize:11, color:T.textMuted }}>products</div>
                </div>
              ))}
            </div>

            {/* Revenue chart */}
            <Card style={{ padding:20 }}>
              <h3 style={{ fontWeight:700, fontSize:15, marginBottom:14, color:T.text }}>Monthly Revenue (NPR)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={MONTHLY_SALES}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.borderLight}/>
                  <XAxis dataKey="m" fontSize={11}/>
                  <YAxis fontSize={11} tickFormatter={v=>`${(v/100000).toFixed(0)}L`}/>
                  <Tooltip formatter={v=>[npr(v),"Revenue"]}/>
                  <Bar dataKey="rev" fill={T.green} radius={[5,5,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {/* ══ MY PRODUCTS ═══════════════════════════════════════ */}
        {tab==="products" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
              marginBottom:20, flexWrap:"wrap", gap:10 }}>
              <div>
                <h1 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif",
                  fontSize:bp==="sm"?20:24, fontWeight:700, color:T.text }}>My Products</h1>
                <div style={{ fontSize:12, color:T.textMuted, marginTop:2 }}>
                  {sellerProducts.length} product{sellerProducts.length!==1?"s":""} listed
                </div>
              </div>
              <Btn variant="primary" size="sm" onClick={()=>setTab("add")}>
                <Plus size={14}/> Add New Product
              </Btn>
            </div>

            {/* Success toast inline */}
            {addSuccess && (
              <div style={{ background:"#E8F5E9", border:"1.5px solid #81C784", borderRadius:12,
                padding:"12px 16px", marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
                <Check size={18} color={T.success}/>
                <span style={{ fontSize:13, fontWeight:700, color:T.success }}>
                  Product listed successfully! Visible in marketplace.
                </span>
              </div>
            )}

            {sellerProducts.length === 0 ? (
              <div style={{ textAlign:"center", padding:"56px 20px", background:T.card,
                borderRadius:16, border:`1px solid ${T.borderLight}` }}>
                <div style={{ fontSize:60, marginBottom:12 }}>📦</div>
                <h3 style={{ color:T.text, marginBottom:8, fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:20 }}>
                  No products yet
                </h3>
                <p style={{ color:T.textMuted, fontSize:13, marginBottom:18 }}>
                  Add your first product to start selling on Hariyo Bazaar!
                </p>
                <Btn variant="primary" onClick={()=>setTab("add")}><Plus size={14}/> Add First Product</Btn>
              </div>
            ) : (
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", minWidth:620 }}>
                  <thead>
                    <tr style={{ background:T.alt }}>
                      {["Product","Category","Price","Stock Status","Rating","Actions"].map(h=>(
                        <th key={h} style={{ padding:"10px 12px", textAlign:"left", fontSize:11,
                          fontWeight:700, color:T.textMuted, borderBottom:`1px solid ${T.border}`,
                          whiteSpace:"nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sellerProducts.map(p => {
                      const st = stockStatus(p);
                      return (
                        <tr key={p.id}
                          style={{ borderBottom:`1px solid ${T.borderLight}`,
                            background: p.isNew ? "#F0FAF4" : T.card }}>

                          {/* Product */}
                          <td style={{ padding:"12px 12px" }}>
                            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                              <span style={{ fontSize:24, flexShrink:0 }}>{p.img}</span>
                              <div>
                                <div style={{ fontWeight:700, fontSize:13, color:T.text,
                                  maxWidth:180, overflow:"hidden", textOverflow:"ellipsis",
                                  whiteSpace:"nowrap" }}>{p.name}</div>
                                {p.isNew && (
                                  <span style={{ fontSize:9, background:T.green, color:"#fff",
                                    borderRadius:4, padding:"1px 6px", fontWeight:900 }}>NEW</span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td style={{ padding:"12px", fontSize:12, color:T.textMuted, whiteSpace:"nowrap" }}>
                            {CATEGORIES.find(c=>c.id===p.cat)?.icon} {CATEGORIES.find(c=>c.id===p.cat)?.name}
                          </td>

                          {/* Price */}
                          <td style={{ padding:"12px", whiteSpace:"nowrap" }}>
                            <div style={{ fontWeight:800, color:T.green, fontSize:13 }}>{npr(fp(p))}</div>
                            {p.discount>0 && (
                              <div style={{ fontSize:10, color:T.textMuted, textDecoration:"line-through" }}>
                                {npr(p.price)}
                              </div>
                            )}
                          </td>

                          {/* Stock status */}
                          <td style={{ padding:"12px" }}>
                            <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                              <StockBadge p={p}/>
                              <div style={{ fontSize:10, color:T.textMuted }}>
                                {p.stock} {p.unit}{p.stock!==1?"s":""}
                              </div>
                            </div>
                          </td>

                          {/* Rating */}
                          <td style={{ padding:"12px" }}>
                            {p.reviews > 0
                              ? <Stars rating={p.rating} reviews={null}/>
                              : <span style={{ fontSize:11, color:T.textMuted }}>No reviews</span>
                            }
                          </td>

                          {/* Actions */}
                          <td style={{ padding:"12px" }}>
                            {deleteConfirm===p.id ? (
                              /* Confirm delete */
                              <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                                <span style={{ fontSize:11, color:T.danger, fontWeight:700, whiteSpace:"nowrap" }}>
                                  Sure?
                                </span>
                                <button onClick={()=>handleRemove(p.id)}
                                  style={{ padding:"4px 10px", border:"none", borderRadius:7,
                                    background:T.danger, color:"#fff", cursor:"pointer",
                                    fontSize:11, fontWeight:900, fontFamily:"'Hind',sans-serif" }}>
                                  Delete
                                </button>
                                <button onClick={()=>setDeleteConfirm(null)}
                                  style={{ padding:"4px 8px", border:`1px solid ${T.border}`,
                                    borderRadius:7, background:T.card, cursor:"pointer",
                                    fontSize:11, color:T.text, fontFamily:"'Hind',sans-serif" }}>
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div style={{ display:"flex", gap:5, alignItems:"center", flexWrap:"wrap" }}>
                                {/* Toggle stock */}
                                <button onClick={()=>toggleStock(p.id)}
                                  title={st==="out"?"Mark as In Stock":"Mark as Out of Stock"}
                                  style={{ padding:"4px 9px",
                                    border:`1px solid ${st==="out" ? T.success : T.warning}`,
                                    borderRadius:7, background:T.card, cursor:"pointer",
                                    fontSize:11, fontWeight:700, fontFamily:"'Hind',sans-serif",
                                    color: st==="out" ? T.success : T.warning,
                                    whiteSpace:"nowrap" }}>
                                  {st==="out" ? "↑ Restock" : "⊗ Out"}
                                </button>
                                {/* Delete */}
                                <button onClick={()=>setDeleteConfirm(p.id)}
                                  title="Remove product"
                                  style={{ padding:"5px 8px", border:"none", background:"none",
                                    cursor:"pointer", color:T.danger, display:"flex", alignItems:"center" }}>
                                  <Trash2 size={15}/>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ══ ORDERS ════════════════════════════════════════════ */}
        {tab==="orders" && (
          <div>
            <h1 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif",
              fontSize:bp==="sm"?20:24, fontWeight:700, color:T.text, marginBottom:20 }}>
              Orders
            </h1>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", minWidth:480 }}>
                <thead>
                  <tr style={{ background:T.alt }}>
                    {["Order ID","Product","Amount","Payment","Status"].map(h=>(
                      <th key={h} style={{ padding:"10px 12px", textAlign:"left", fontSize:11,
                        fontWeight:700, color:T.textMuted, borderBottom:`1px solid ${T.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ORDERS_DEMO.map(o=>(
                    <tr key={o.id} style={{ borderBottom:`1px solid ${T.borderLight}` }}>
                      <td style={{ padding:"12px", fontSize:12, fontWeight:700, color:T.green }}>{o.id}</td>
                      <td style={{ padding:"12px", fontSize:12 }}>{o.product}</td>
                      <td style={{ padding:"12px", fontWeight:700, color:T.success }}>{npr(o.amount)}</td>
                      <td style={{ padding:"12px", fontSize:12 }}>{o.pay}</td>
                      <td style={{ padding:"12px" }}><Badge status={o.status}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══ ADD PRODUCT ═══════════════════════════════════════ */}
        {tab==="add" && (
          <div style={{ maxWidth:720 }}>
            <h1 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif",
              fontSize:bp==="sm"?20:24, fontWeight:700, color:T.text, marginBottom:20 }}>
              नयाँ उत्पादन थप्नुहोस्
            </h1>

            <Card style={{ padding:bp==="sm"?16:28 }}>
              <div style={{ display:"grid",
                gridTemplateColumns:bp==="sm"?"1fr":"1fr 1fr",
                gap:16, marginBottom:20 }}>

                {/* Name EN */}
                <FRow label="Product Name (English) *" error={formErr.name} bp={bp}>
                  <input value={form.name}
                    onChange={e=>setF("name",e.target.value)}
                    placeholder="e.g. Organic Tomatoes"
                    style={sdInputStyle(formErr.name)}
                    onFocus={e=>e.target.style.borderColor=T.green}
                    onBlur={e=>e.target.style.borderColor=formErr.name?T.danger:T.border}/>
                </FRow>

                {/* Name NP */}
                <FRow label="उत्पादन नाम (नेपाली)" bp={bp}>
                  <input value={form.np}
                    onChange={e=>setF("np",e.target.value)}
                    placeholder="जस्तै: जैविक गोलभेडा"
                    style={sdInputStyle(false)}/>
                </FRow>

                {/* Category */}
                <FRow label="Category *" bp={bp}>
                  <select value={form.cat} onChange={e=>setF("cat",e.target.value)} style={sdSelectStyle}>
                    {CATEGORIES.map(c=>(
                      <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </FRow>

                {/* Unit */}
                <FRow label="Unit *" bp={bp}>
                  <select value={form.unit} onChange={e=>setF("unit",e.target.value)} style={sdSelectStyle}>
                    {["kg","gram","liter","piece","dozen","bundle","bag","set","50kg bag","kit"].map(u=>(
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </FRow>

                {/* Stock */}
                <FRow label="Stock Quantity *" error={formErr.stock} bp={bp}>
                  <input type="number" min="0" value={form.stock}
                    onChange={e=>setF("stock",e.target.value)}
                    placeholder="e.g. 500"
                    style={sdInputStyle(formErr.stock)}
                    onFocus={e=>e.target.style.borderColor=T.green}
                    onBlur={e=>e.target.style.borderColor=formErr.stock?T.danger:T.border}/>
                </FRow>

                {/* Discount */}
                <FRow label="Discount (%)" bp={bp}>
                  <input type="number" min="0" max="80" value={form.discount}
                    onChange={e=>setF("discount",e.target.value)}
                    placeholder="0"
                    style={sdInputStyle(false)}/>
                </FRow>

                {/* Price + AI btn — full width */}
                <FRow label="Price (NPR रू) *" error={formErr.price} span={2} bp={bp}>
                  <div style={{ display:"flex", gap:10, alignItems:"flex-start", flexWrap:"wrap" }}>
                    <input type="number" min="1" value={form.price}
                      onChange={e=>setF("price",e.target.value)}
                      placeholder="e.g. 450"
                      style={{ ...sdInputStyle(formErr.price), flex:1, minWidth:130 }}
                      onFocus={e=>e.target.style.borderColor=T.green}
                      onBlur={e=>e.target.style.borderColor=formErr.price?T.danger:T.border}/>
                    <Btn variant="accent" size="sm" onClick={getAIPrice}
                      disabled={aiLoading||!form.name.trim()}
                      style={{ whiteSpace:"nowrap", flexShrink:0 }}>
                      <Zap size={13}/>
                      {aiLoading ? "⏳ Getting price…" : "🤖 AI Suggest Price"}
                    </Btn>
                  </div>
                </FRow>

                {/* Demand */}
                <FRow label="Demand Level" bp={bp}>
                  <select value={form.demand} onChange={e=>setF("demand",e.target.value)} style={sdSelectStyle}>
                    {["Very High","High","Medium","Low"].map(d=>(
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </FRow>

                {/* Season */}
                <FRow label="Season" bp={bp}>
                  <select value={form.season} onChange={e=>setF("season",e.target.value)} style={sdSelectStyle}>
                    {["All Season","Kharif","Rabi","Spring","Summer","Monsoon","Winter","Post-Monsoon"].map(s=>(
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </FRow>

                {/* Zone */}
                <FRow label="Zone" bp={bp}>
                  <select value={form.zone} onChange={e=>setF("zone",e.target.value)} style={sdSelectStyle}>
                    {["Terai","Mid-Hill","Remote Hill","Mountain","Urban"].map(z=>(
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </FRow>

              </div>

              {/* Description — full width */}
              <FRow label="Product Description *" error={formErr.desc} span={2} bp={bp}>
                <textarea value={form.desc}
                  onChange={e=>setF("desc",e.target.value)}
                  placeholder="Describe your product — origin, quality, uses, how it's grown…"
                  style={{ ...sdInputStyle(formErr.desc), minHeight:90, resize:"vertical",
                    border:`1.5px solid ${formErr.desc ? T.danger : T.border}` }}/>
              </FRow>

              {/* ── AI PRICE RESULT ── */}
              {aiPrice && (
                <div style={{ background:T.greenPale, border:`1px solid ${T.green}40`,
                  borderRadius:14, padding:18, marginTop:18 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                    <Zap size={16} color={T.saffron}/>
                    <span style={{ fontWeight:800, fontSize:14, color:T.text }}>
                      🤖 AI Price Recommendation
                    </span>
                    <span style={{ fontSize:10, background:T.green, color:"#fff",
                      borderRadius:4, padding:"2px 7px", fontWeight:800 }}>
                      Applied ✓
                    </span>
                  </div>
                  <div style={{ display:"grid",
                    gridTemplateColumns:bp==="sm"?"repeat(2,1fr)":"repeat(4,1fr)",
                    gap:10, marginBottom:12 }}>
                    {[
                      ["Suggested", `रू ${aiPrice.suggestedPrice}`, T.green],
                      ["Min",       `रू ${aiPrice.minPrice}`,       T.textMuted],
                      ["Max",       `रू ${aiPrice.maxPrice}`,       T.saffron],
                      ["Confidence",`${aiPrice.confidence}%`,       T.sky],
                    ].map(([l,v,c])=>(
                      <div key={l} style={{ background:T.card, borderRadius:10,
                        padding:"10px 12px", textAlign:"center",
                        border:`1px solid ${T.borderLight}` }}>
                        <div style={{ fontSize:10, color:T.textMuted, marginBottom:4 }}>{l}</div>
                        <div style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif",
                          fontSize:17, fontWeight:900, color:c }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background:T.card, borderRadius:9, padding:"10px 14px",
                    border:`1px solid ${T.borderLight}`,
                    display:"flex", gap:10, alignItems:"flex-start" }}>
                    <span style={{ fontSize:16, flexShrink:0 }}>
                      {aiPrice.trend==="rising"?"📈":aiPrice.trend==="falling"?"📉":"➡️"}
                    </span>
                    <div>
                      <div style={{ fontSize:11, fontWeight:700, color:T.green, marginBottom:2 }}>
                        Trend: {aiPrice.trend?.toUpperCase()}
                      </div>
                      <div style={{ fontSize:12, color:T.textMid }}>{aiPrice.reasoning}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LIVE PRICE PREVIEW ── */}
              {form.name && form.price && (
                <div style={{ background:T.alt, borderRadius:12, padding:"14px 18px",
                  marginTop:18, border:`1px solid ${T.borderLight}`,
                  display:"flex", gap:14, alignItems:"center", flexWrap:"wrap" }}>
                  <div style={{ fontSize:36 }}>
                    {{fv:"🥦",sp:"🌱",fp:"🧪",ft:"🔧",la:"🐄",ir:"💧",aa:"🧺",or:"🌿"}[form.cat]||"🌾"}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:700, fontSize:15, color:T.text,
                      overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {form.name}
                    </div>
                    <div style={{ fontSize:12, color:T.textMuted }}>
                      {CATEGORIES.find(c=>c.id===form.cat)?.name} · {form.zone} · {form.season}
                    </div>
                    <div style={{ display:"flex", gap:6, marginTop:4 }}>
                      <StockBadge p={{ stock:+form.stock||0, outOfStock:+form.stock===0 }}/>
                    </div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif",
                      fontSize:22, fontWeight:900, color:T.green }}>
                      {npr(Math.round(+form.price*(1 - (+form.discount||0)/100)))}
                    </div>
                    {+form.discount > 0 && (
                      <div style={{ fontSize:11, color:T.textMuted, textDecoration:"line-through" }}>
                        {npr(+form.price)}
                      </div>
                    )}
                    <div style={{ fontSize:11, color:T.textMuted }}>/{form.unit}</div>
                  </div>
                </div>
              )}

              {/* ── SUBMIT ── */}
              <div style={{ display:"flex", gap:12, marginTop:22, flexWrap:"wrap" }}>
                <Btn variant="primary" size="lg" onClick={handleAdd}>
                  <Check size={16}/> List Product
                </Btn>
                <Btn variant="secondary" size="lg"
                  onClick={()=>{ setForm(SD_BLANK); setAiPrice(null); setFormErr({}); }}>
                  <RefreshCw size={14}/> Reset
                </Btn>
              </div>
            </Card>
          </div>
        )}

        {/* ══ ANALYTICS ═════════════════════════════════════════ */}
        {tab==="analytics" && (
          <div>
            <h1 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif",
              fontSize:bp==="sm"?20:24, fontWeight:700, color:T.text, marginBottom:20 }}>
              Price Analytics
            </h1>
            <Card style={{ padding:20 }}>
              <h3 style={{ fontWeight:700, fontSize:15, marginBottom:14, color:T.text }}>
                Nepal Crop Price Trends (NPR)
              </h3>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={PRICE_HISTORY}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.borderLight}/>
                  <XAxis dataKey="m" fontSize={11}/>
                  <YAxis fontSize={11} tickFormatter={v=>`रू${v}`}/>
                  <Tooltip formatter={v=>[`रू ${v}`,""]}/>
                  <Legend/>
                  <Line type="monotone" dataKey="tomato" stroke="#E74C3C" strokeWidth={2} name="Tomato" dot={false}/>
                  <Line type="monotone" dataKey="apple"  stroke="#F39C12" strokeWidth={2} name="Apple"  dot={false}/>
                  <Line type="monotone" dataKey="rice"   stroke={T.green}  strokeWidth={2} name="Rice"   dot={false}/>
                  <Line type="monotone" dataKey="wheat"  stroke={T.sky}    strokeWidth={2} name="Wheat"  dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

      </main>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   ADMIN DASHBOARD  — FIXED
   ✅ USERS_MOCK → useState  → suspend / activate works
   ✅ SELLERS_MOCK → useState → approve / reject works
   ✅ Confirmation dialogs before destructive actions
   ✅ Toast feedback on each action
───────────────────────────────────────────────────────────── */
const AdminDash = () => {
  const bp = useBreakpoint();
  const [tab, setTab] = useState("overview");

  /* ── Users state — real React state so actions persist ── */
  const [users, setUsers] = useState([
    { id:1, name:"Ram Bahadur Thapa", email:"ram@example.com",  role:"Buyer",  zone:"Mid-Hill",  status:"Active",           orders:23  },
    { id:2, name:"Ilam Tea Estate",   email:"ilam@tea.np",      role:"Seller", zone:"East Hill", status:"Approved",          orders:156 },
    { id:3, name:"Sunita Gurung",     email:"sunita@ex.com",    role:"Buyer",  zone:"Mountain",  status:"Active",           orders:7   },
    { id:4, name:"Jumla Organic Co.", email:"jumla@co.np",      role:"Seller", zone:"Remote",    status:"Pending_Approval",  orders:0   },
    { id:5, name:"Hari Yadav",        email:"hari@ex.com",      role:"Buyer",  zone:"Terai",     status:"Active",           orders:41  },
    { id:6, name:"Chitwan Veggie Farm",email:"cvf@farm.np",     role:"Seller", zone:"Terai",     status:"Approved",          orders:88  },
    { id:7, name:"Nirmala Shrestha",  email:"nirmala@ex.com",   role:"Buyer",  zone:"Urban",     status:"Suspended",         orders:2   },
  ]);

  /* ── Sellers pending approval — each has userId linking to users table ── */
  const [sellers, setSellers] = useState([
    { id:"s1", userId:4, name:"Jumla Organic Co-op",  owner:"Hari Rokaya",     district:"Jumla",         province:"Karnali", type:"Cooperative",  docs:["Citizenship","Registration","Bank"],  applied:"2081-01-18", status:"Pending" },
    { id:"s2", userId:8, name:"Sindhu Agro Farm",     owner:"Ramila Shrestha", district:"Sindhupalchok", province:"Bagmati", type:"Individual",   docs:["Citizenship","Bank"],                 applied:"2081-01-20", status:"Pending" },
    { id:"s3", userId:9, name:"Mustang Apple House",  owner:"Tenzing Gurung",  district:"Mustang",       province:"Gandaki", type:"Individual",   docs:["Citizenship","Farm Registration"],    applied:"2081-01-22", status:"Pending" },
  ]);

  /* ── Inline toast for admin actions ── */
  const [adminToast, setAdminToast] = useState(null);
  const showAdminToast = (msg, type="success") => {
    setAdminToast({msg,type});
    setTimeout(()=>setAdminToast(null), 3000);
  };

  /* ── Confirm dialog state ── */
  const [confirmAction, setConfirmAction] = useState(null);
  // confirmAction = { type:"suspend"|"activate"|"delete", userId, label }

  /* ── User actions ── */
  const handleUserAction = (userId, action) => {
    if (action === "suspend" || action === "activate") {
      setUsers(prev => prev.map(u =>
        u.id === userId
          ? { ...u, status: action === "suspend" ? "Suspended" : "Active" }
          : u
      ));
      showAdminToast(
        `User ${action === "suspend" ? "suspended" : "activated"} successfully.`,
        action === "suspend" ? "warn" : "success"
      );
    }
    setConfirmAction(null);
  };

  /* ── Seller approval actions ── */
  const handleSellerApproval = (sellerId, action) => {
    const seller = sellers.find(s => s.id === sellerId);

    /* 1. Update seller's own status */
    setSellers(prev => prev.map(s =>
      s.id === sellerId
        ? { ...s, status: action === "approve" ? "Approved" : "Rejected" }
        : s
    ));

    /* 2. Sync matching user row by userId (reliable) OR add them if not in table */
    if (action === "approve" && seller) {
      setUsers(prev => {
        const exists = prev.some(u => u.id === seller.userId);
        if (exists) {
          /* Update existing user's status */
          return prev.map(u =>
            u.id === seller.userId
              ? { ...u, status: "Approved" }
              : u
          );
        } else {
          /* User not in table yet — add them as Approved */
          return [...prev, {
            id:     seller.userId,
            name:   seller.name,
            email:  seller.name.toLowerCase().replace(/\s+/g,"")+".np@hariyo.np",
            role:   "Seller",
            zone:   seller.province,
            status: "Approved",
            orders: 0,
          }];
        }
      });
    } else if (action === "reject" && seller) {
      setUsers(prev => prev.map(u =>
        u.id === seller.userId
          ? { ...u, status: "Suspended" }
          : u
      ));
    }

    showAdminToast(
      action === "approve"
        ? `✅ Seller approved! ${seller?.name} can now list products.`
        : `❌ Application rejected.`,
      action === "approve" ? "success" : "warn"
    );
  };

  const tabs = [
    {id:"overview", l:"Analytics",   icon:BarChart2},
    {id:"users",    l:"Users",        icon:Users},
    {id:"orders",   l:"Transactions", icon:DollarSign},
    {id:"sellers",  l:"Approvals",    icon:Check,
      badge: sellers.filter(s=>s.status==="Pending").length },
  ];

  /* ── Status badge colors ── */
  const statusStyle = st => ({
    Active:           ["#E8F5E9","#2E7D32"],
    Approved:         ["#E8F5E9","#2E7D32"],
    Suspended:        ["#FFEBEE","#C62828"],
    Pending_Approval: ["#FFF3E0","#E65100"],
    Pending:          ["#FFF3E0","#E65100"],
    Rejected:         ["#FFEBEE","#C62828"],
  }[st] || ["#EEE","#333"]);

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:T.surface }}>

      {/* ── Sidebar ── */}
      <aside style={{ width:bp==="sm"?0:210, background:T.dark,
        padding:bp==="sm"?0:"22px 12px", flexShrink:0, overflow:"hidden" }}>
        {bp!=="sm" && (
          <>
            <div style={{ color:T.red, fontFamily:"'Tiro Devanagari Sanskrit',serif",
              fontSize:15, fontWeight:700, marginBottom:24, padding:"0 6px" }}>Admin Panel</div>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:9,
                  padding:"10px 12px", border:"none", borderRadius:10, cursor:"pointer",
                  marginBottom:3, fontFamily:"'Hind',sans-serif", fontSize:13, textAlign:"left",
                  fontWeight:tab===t.id?700:400,
                  background:tab===t.id?T.red:"transparent",
                  color:tab===t.id?"#fff":"rgba(255,255,255,0.5)" }}>
                <t.icon size={15}/>{t.l}
                {t.badge>0 && (
                  <span style={{ marginLeft:"auto", background:T.saffron, color:"#fff",
                    borderRadius:10, padding:"1px 7px", fontSize:11, fontWeight:900 }}>
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </>
        )}
      </aside>

      {/* ── Main ── */}
      <main style={{ flex:1, padding:bp==="sm"?"16px":"24px 28px", position:"relative" }}>

        {/* Inline toast */}
        {adminToast && (
          <div style={{ position:"fixed", top:80, right:20, zIndex:5000,
            background:adminToast.type==="success"?T.success:adminToast.type==="warn"?"#E65100":T.danger,
            color:"#fff", padding:"11px 18px", borderRadius:10, fontSize:13, fontWeight:700,
            boxShadow:"0 6px 20px rgba(0,0,0,0.2)", display:"flex", alignItems:"center", gap:8,
            animation:"slideUp 0.3s ease" }}>
            <Check size={14}/> {adminToast.msg}
          </div>
        )}

        {/* Confirm dialog overlay */}
        {confirmAction && (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)",
            zIndex:4000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
            <div style={{ background:T.card, borderRadius:16, padding:"28px 32px",
              maxWidth:400, width:"100%", textAlign:"center",
              boxShadow:"0 24px 64px rgba(0,0,0,0.3)" }}>
              <div style={{ fontSize:44, marginBottom:14 }}>
                {confirmAction.type==="suspend"?"🔒":"✅"}
              </div>
              <h3 style={{ fontFamily:"'Hind',sans-serif", fontWeight:800, fontSize:17,
                color:T.text, marginBottom:8 }}>
                {confirmAction.type==="suspend"?"Suspend User?":"Activate User?"}
              </h3>
              <p style={{ color:T.textMuted, fontSize:13, marginBottom:22 }}>
                {confirmAction.type==="suspend"
                  ? `"${confirmAction.label}" will be suspended and cannot log in.`
                  : `"${confirmAction.label}" will be reactivated.`}
              </p>
              <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
                <Btn variant="secondary" onClick={()=>setConfirmAction(null)}>Cancel</Btn>
                <Btn
                  variant={confirmAction.type==="suspend"?"danger":"success"}
                  onClick={()=>handleUserAction(confirmAction.userId, confirmAction.type)}>
                  <Check size={14}/>
                  {confirmAction.type==="suspend"?"Yes, Suspend":"Yes, Activate"}
                </Btn>
              </div>
            </div>
          </div>
        )}

        {/* Mobile tab strip */}
        {bp==="sm" && (
          <div style={{ display:"flex", gap:6, overflowX:"auto", marginBottom:16 }}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                style={{ flexShrink:0, padding:"7px 14px", border:"none", borderRadius:20,
                  cursor:"pointer", fontSize:12, fontFamily:"'Hind',sans-serif", fontWeight:700,
                  background:tab===t.id?T.red:T.alt, color:tab===t.id?"#fff":T.text,
                  display:"flex", alignItems:"center", gap:5 }}>
                {t.l}
                {t.badge>0 && (
                  <span style={{ background:T.saffron, color:"#fff", borderRadius:"50%",
                    width:16, height:16, fontSize:9, fontWeight:900, display:"flex",
                    alignItems:"center", justifyContent:"center" }}>{t.badge}</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* ══ OVERVIEW ══ */}
        {tab==="overview" && (
          <div>
            <h1 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif",
              fontSize:bp==="sm"?20:24, fontWeight:700, color:T.text, marginBottom:20 }}>
              Platform Analytics
            </h1>
            <div style={{ display:"grid",
              gridTemplateColumns:bp==="sm"?"repeat(2,1fr)":"repeat(4,1fr)",
              gap:12, marginBottom:22 }}>
              <Metric title="Total Revenue" value="रू 1.84 Cr" change="31.4" pos icon={DollarSign} color={T.success}/>
              <Metric title="Total Orders"  value="14,823"     change="24.8" pos icon={ShoppingBag} color={T.sky}/>
              <Metric title="Active Users"  value="89,340"     change="42.1" pos icon={Users}       color={T.green}/>
              <Metric title="Sellers"       value="1,240"      change="18.7" pos icon={Leaf}        color={T.saffron}/>
            </div>
            <div style={{ display:"grid",
              gridTemplateColumns:bp==="sm"?"1fr":"2fr 1fr", gap:16, marginBottom:16 }}>
              <Card style={{ padding:20 }}>
                <h3 style={{ fontWeight:700, fontSize:15, marginBottom:14, color:T.text }}>Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={MONTHLY_SALES}>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.borderLight}/>
                    <XAxis dataKey="m" fontSize={11}/>
                    <YAxis fontSize={11} tickFormatter={v=>`${(v/100000).toFixed(1)}L`}/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="rev" stroke={T.green} strokeWidth={2.5} dot={false} name="Revenue"/>
                  </LineChart>
                </ResponsiveContainer>
              </Card>
              <Card style={{ padding:20 }}>
                <h3 style={{ fontWeight:700, fontSize:15, marginBottom:14, color:T.text }}>Category Demand</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={CATEGORIES} layout="vertical">
                    <XAxis type="number" fontSize={10}/>
                    <YAxis type="category" dataKey="name" fontSize={10} width={90}/>
                    <Tooltip/>
                    <Bar dataKey="count" fill={T.greenLight} radius={[0,5,5,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <Card style={{ padding:20 }}>
              <h3 style={{ fontWeight:700, fontSize:15, marginBottom:16, color:T.text }}>Payment Method Split</h3>
              <div style={{ display:"grid",
                gridTemplateColumns:bp==="sm"?"repeat(2,1fr)":"repeat(5,1fr)", gap:12 }}>
                {[["eSewa",T.esewa,"💚",38],["Khalti",T.khalti,"💜",27],
                  ["COD",T.cod,"💵",22],["Mobile",T.ime,"📱",9],["Card","#635BFF","💳",4]
                ].map(([n,c,i,pct])=>(
                  <div key={n} style={{ textAlign:"center", padding:14, borderRadius:12,
                    background:c+"08", border:`1px solid ${c}20` }}>
                    <div style={{ fontSize:24, marginBottom:4 }}>{i}</div>
                    <div style={{ fontWeight:900, fontSize:20, color:c }}>{pct}%</div>
                    <div style={{ fontSize:11, color:T.textMuted }}>{n}</div>
                    <div style={{ background:T.borderLight, borderRadius:5, height:5, marginTop:6 }}>
                      <div style={{ background:c, height:5, borderRadius:5, width:`${pct}%` }}/>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ══ USER MANAGEMENT ══ */}
        {tab==="users" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
              marginBottom:20, flexWrap:"wrap", gap:10 }}>
              <div>
                <h1 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif",
                  fontSize:bp==="sm"?20:24, fontWeight:700, color:T.text }}>User Management</h1>
                <div style={{ fontSize:12, color:T.textMuted, marginTop:2 }}>
                  {users.length} users · {users.filter(u=>u.status==="Active"||u.status==="Approved").length} active ·{" "}
                  {users.filter(u=>u.status==="Suspended").length} suspended
                </div>
              </div>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", minWidth:560 }}>
                <thead>
                  <tr style={{ background:T.alt }}>
                    {["User","Role","Zone","Orders","Status","Actions"].map(h=>(
                      <th key={h} style={{ padding:"10px 12px", textAlign:"left", fontSize:11,
                        fontWeight:700, color:T.textMuted, borderBottom:`1px solid ${T.border}`,
                        whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map(u=>{
                    const [bg,fg] = statusStyle(u.status);
                    const isActive   = u.status==="Active" || u.status==="Approved";
                    const isSuspended = u.status==="Suspended";
                    const isPending   = u.status==="Pending_Approval";
                    return (
                      <tr key={u.id} style={{ borderBottom:`1px solid ${T.borderLight}`,
                        background: isSuspended ? "#FFF5F5" : T.card }}>
                        {/* Name */}
                        <td style={{ padding:"12px" }}>
                          <div style={{ display:"flex", gap:9, alignItems:"center" }}>
                            <div style={{ width:32, height:32, borderRadius:"50%",
                              background: isSuspended ? T.textMuted : T.green,
                              display:"flex", alignItems:"center", justifyContent:"center",
                              color:"#fff", fontWeight:900, fontSize:13 }}>{u.name[0]}</div>
                            <div>
                              <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{u.name}</div>
                              <div style={{ fontSize:11, color:T.textMuted }}>{u.email}</div>
                            </div>
                          </div>
                        </td>
                        {/* Role */}
                        <td style={{ padding:"12px" }}>
                          <span style={{ background:u.role==="Seller"?T.green+"22":T.sky+"22",
                            color:u.role==="Seller"?T.green:T.sky, fontSize:11, fontWeight:700,
                            padding:"2px 9px", borderRadius:10 }}>{u.role}</span>
                        </td>
                        <td style={{ padding:"12px", fontSize:12, color:T.textMuted }}>{u.zone}</td>
                        <td style={{ padding:"12px", fontSize:13, fontWeight:700 }}>{u.orders}</td>
                        {/* Status */}
                        <td style={{ padding:"12px" }}>
                          <span style={{ background:bg, color:fg, fontSize:11, fontWeight:700,
                            padding:"3px 10px", borderRadius:20 }}>
                            {u.status.replace("_"," ")}
                          </span>
                        </td>
                        {/* Actions */}
                        <td style={{ padding:"12px" }}>
                          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                            {isActive && (
                              <button
                                onClick={()=>setConfirmAction({type:"suspend", userId:u.id, label:u.name})}
                                style={{ padding:"5px 12px", border:`1px solid ${T.danger}`,
                                  borderRadius:7, background:T.card, cursor:"pointer",
                                  fontSize:11, fontWeight:700, color:T.danger,
                                  fontFamily:"'Hind',sans-serif", transition:"all 0.15s" }}
                                onMouseEnter={e=>{e.currentTarget.style.background=T.danger; e.currentTarget.style.color="#fff";}}
                                onMouseLeave={e=>{e.currentTarget.style.background=T.card; e.currentTarget.style.color=T.danger;}}>
                                🔒 Suspend
                              </button>
                            )}
                            {isSuspended && (
                              <button
                                onClick={()=>setConfirmAction({type:"activate", userId:u.id, label:u.name})}
                                style={{ padding:"5px 12px", border:`1px solid ${T.success}`,
                                  borderRadius:7, background:T.card, cursor:"pointer",
                                  fontSize:11, fontWeight:700, color:T.success,
                                  fontFamily:"'Hind',sans-serif", transition:"all 0.15s" }}
                                onMouseEnter={e=>{e.currentTarget.style.background=T.success; e.currentTarget.style.color="#fff";}}
                                onMouseLeave={e=>{e.currentTarget.style.background=T.card; e.currentTarget.style.color=T.success;}}>
                                ✅ Activate
                              </button>
                            )}
                            {isPending && (
                              <span style={{ fontSize:11, color:T.warning, fontStyle:"italic" }}>
                                Awaiting approval
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══ TRANSACTIONS ══ */}
        {tab==="orders" && (
          <div>
            <h1 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif",
              fontSize:bp==="sm"?20:24, fontWeight:700, color:T.text, marginBottom:20 }}>
              Transactions
            </h1>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", minWidth:500 }}>
                <thead><tr style={{ background:T.alt }}>
                  {["Order","Product","Buyer","Amount","Payment","Status"].map(h=>(
                    <th key={h} style={{ padding:"10px 12px", textAlign:"left", fontSize:11,
                      fontWeight:700, color:T.textMuted, borderBottom:`1px solid ${T.border}` }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>{ORDERS_DEMO.map(o=>(
                  <tr key={o.id} style={{ borderBottom:`1px solid ${T.borderLight}` }}>
                    <td style={{ padding:"12px", fontWeight:700, fontSize:12, color:T.green }}>{o.id}</td>
                    <td style={{ padding:"12px", fontSize:12 }}>{o.product}</td>
                    <td style={{ padding:"12px", fontSize:12, color:T.textMuted }}>{o.buyer}</td>
                    <td style={{ padding:"12px", fontWeight:700, color:T.success }}>{npr(o.amount)}</td>
                    <td style={{ padding:"12px", fontSize:12 }}>{o.pay}</td>
                    <td style={{ padding:"12px" }}><Badge status={o.status}/></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══ SELLER APPROVALS ══ */}
        {tab==="sellers" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
              marginBottom:20, flexWrap:"wrap", gap:10 }}>
              <div>
                <h1 style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif",
                  fontSize:bp==="sm"?20:24, fontWeight:700, color:T.text }}>Seller Approvals</h1>
                <div style={{ fontSize:12, color:T.textMuted, marginTop:2 }}>
                  {sellers.filter(s=>s.status==="Pending").length} pending ·{" "}
                  {sellers.filter(s=>s.status==="Approved").length} approved ·{" "}
                  {sellers.filter(s=>s.status==="Rejected").length} rejected
                </div>
              </div>
            </div>

            {sellers.map(s=>{
              const isPending  = s.status==="Pending";
              const isApproved = s.status==="Approved";
              const isRejected = s.status==="Rejected";
              return (
                <Card key={s.id} style={{ padding:bp==="sm"?16:22, marginBottom:14,
                  border:`1.5px solid ${isPending?T.warning+"50":isApproved?T.success+"50":T.danger+"50"}`,
                  background: isApproved?"#F0FAF4":isRejected?"#FFF5F5":T.card }}>
                  <div style={{ display:"flex", justifyContent:"space-between",
                    flexWrap:"wrap", gap:12 }}>
                    {/* Seller info */}
                    <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                      <div style={{ width:50, height:50, borderRadius:12,
                        background:isApproved?T.green:isRejected?T.textMuted:T.saffron+"22",
                        display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>
                        👨‍🌾
                      </div>
                      <div>
                        <div style={{ fontWeight:800, fontSize:15, color:T.text }}>{s.name}</div>
                        <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>
                          Owner: {s.owner} · {s.district}, {s.province}
                        </div>
                        <div style={{ fontSize:11, color:T.textMuted }}>
                          Type: {s.type} · Applied: {s.applied} BS
                        </div>
                      </div>
                    </div>

                    {/* Status + action buttons */}
                    <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
                      {/* Current status badge */}
                      <span style={{
                        background: isPending?"#FFF3E0":isApproved?"#E8F5E9":"#FFEBEE",
                        color:       isPending?T.warning:isApproved?T.success:T.danger,
                        fontSize:11, fontWeight:800, padding:"4px 12px", borderRadius:20 }}>
                        {isPending?"⏳ Pending Approval":isApproved?"✅ Approved":"❌ Rejected"}
                      </span>

                      {/* Action buttons — only show when pending */}
                      {isPending && (
                        <>
                          <button
                            onClick={()=>handleSellerApproval(s.id,"approve")}
                            style={{ display:"flex", alignItems:"center", gap:6,
                              padding:"8px 18px", border:"none", borderRadius:9,
                              background:T.success, color:"#fff", cursor:"pointer",
                              fontSize:13, fontWeight:700, fontFamily:"'Hind',sans-serif",
                              boxShadow:`0 3px 10px ${T.success}40`, transition:"all 0.2s" }}
                            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
                            onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                            <Check size={14}/> Approve
                          </button>
                          <button
                            onClick={()=>handleSellerApproval(s.id,"reject")}
                            style={{ display:"flex", alignItems:"center", gap:6,
                              padding:"8px 18px", border:"none", borderRadius:9,
                              background:T.danger, color:"#fff", cursor:"pointer",
                              fontSize:13, fontWeight:700, fontFamily:"'Hind',sans-serif",
                              boxShadow:`0 3px 10px ${T.danger}30`, transition:"all 0.2s" }}
                            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
                            onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                            <X size={14}/> Reject
                          </button>
                        </>
                      )}

                      {/* Undo button for approved/rejected */}
                      {!isPending && (
                        <button
                          onClick={()=>setSellers(prev=>prev.map(sl=>
                            sl.id===s.id?{...sl,status:"Pending"}:sl
                          ))}
                          style={{ padding:"6px 12px", border:`1px solid ${T.border}`,
                            borderRadius:8, background:T.card, cursor:"pointer",
                            fontSize:11, color:T.textMuted, fontFamily:"'Hind',sans-serif" }}>
                          ↩ Undo
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Document checklist */}
                  <div style={{ display:"flex", gap:8, marginTop:14, flexWrap:"wrap" }}>
                    {["Citizenship","Registration","Bank","Farm Certificate"].map(doc=>{
                      const submitted = s.docs.includes(doc);
                      return (
                        <div key={doc} style={{ background:submitted?T.greenPale:T.alt,
                          border:`1px solid ${submitted?T.green+"40":T.border}`,
                          borderRadius:8, padding:"6px 12px",
                          display:"flex", gap:6, alignItems:"center" }}>
                          {submitted
                            ? <Check size={12} color={T.success}/>
                            : <X size={12} color={T.textMuted}/>}
                          <span style={{ fontSize:12, color:submitted?T.text:T.textMuted }}>
                            {doc}
                          </span>
                          {!submitted && (
                            <span style={{ fontSize:10, color:T.warning, fontWeight:700 }}>
                              Missing
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   AUTH
───────────────────────────────────────────────────────────── */
const AuthPage = ({ mode, onLogin, nav }) => {
  const bp = useBreakpoint();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("buyer@hariyo.np");
  const [pass, setPass] = useState("password");
  const [role, setRole] = useState("buyer");
  const isLogin = mode==="login";

  const DEMO = [
    { label:"🛒 Buyer (Ram Bahadur)", email:"buyer@hariyo.np", name:"Ram Bahadur Thapa", role:"buyer" },
    { label:"👨‍🌾 Seller (Ilam Tea Estate)", email:"seller@hariyo.np", name:"Ilam Tea Estate", role:"seller" },
    { label:"🏛️ Admin", email:"admin@hariyo.np", name:"Admin User", role:"admin" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(135deg, ${T.dark}, #0D2B18)`,
      display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ width:"100%", maxWidth:420, background:T.card, borderRadius:20,
        overflow:"hidden", boxShadow:"0 24px 64px rgba(0,0,0,0.3)" }}>
        <div style={{ background:`linear-gradient(135deg, ${T.green}, ${T.greenLight})`,
          padding:"24px 28px", textAlign:"center" }}>
          <div style={{ fontFamily:"'Tiro Devanagari Sanskrit',serif", fontSize:32, color:"#fff", fontWeight:700 }}>हरियो बजार</div>
          <div style={{ color:"rgba(255,255,255,0.7)", fontSize:13, marginTop:4 }}>
            {isLogin?"स्वागत छ! Welcome back":"नयाँ खाता — Create Account"}
          </div>
        </div>
        <div style={{ padding:"22px 24px" }}>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, color:T.textMuted, fontWeight:700, marginBottom:8, letterSpacing:1 }}>QUICK DEMO LOGIN</div>
            {DEMO.map(d=>(
              <button key={d.role} onClick={()=>onLogin(d)}
                style={{ width:"100%", padding:"9px 14px", border:`1.5px solid ${T.borderLight}`,
                  borderRadius:10, background:T.alt, cursor:"pointer", fontSize:13, color:T.text,
                  textAlign:"left", display:"flex", justifyContent:"space-between", alignItems:"center",
                  fontFamily:"'Hind',sans-serif", marginBottom:7 }}>
                <span>{d.label}</span>
                <span style={{ fontSize:11, color:T.green, fontWeight:700 }}>Login →</span>
              </button>
            ))}
          </div>
          <div style={{ borderTop:`1px solid ${T.borderLight}`, paddingTop:16, display:"flex", flexDirection:"column", gap:12 }}>
            {!isLogin && <Input label="Full Name" value={name} onChange={setName} placeholder="Your name"/>}
            <Input label="Email" value={email} onChange={setEmail} type="email"/>
            <Input label="Password" value={pass} onChange={setPass} type="password"/>
            {!isLogin && <Select label="Register as" value={role} onChange={setRole}
              options={[{v:"buyer",l:"🛒 Buyer"},{v:"seller",l:"👨‍🌾 Farmer / Seller"}]}/>}
            <Btn variant="primary" size="lg" onClick={()=>onLogin({name:name||"Ram Bahadur",email,role})}
              style={{ width:"100%", justifyContent:"center", marginTop:4 }}>
              {isLogin?"लगइन गर्नुहोस्":"खाता बनाउनुहोस्"}
            </Btn>
          </div>
          <div style={{ textAlign:"center", marginTop:14, fontSize:13, color:T.textMuted }}>
            {isLogin?"खाता छैन? ":"पहिले नै खाता छ? "}
            <span onClick={()=>nav(isLogin?"register":"login")}
              style={{ color:T.green, fontWeight:700, cursor:"pointer" }}>
              {isLogin?"Register":"Login"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────────────────── */
export default function App() {
  const [page,       setPage]       = useState("home");
  const [pageData,   setPageData]   = useState(null);
  const [user,       setUser]       = useState(null);
  const [cart,       setCart]       = useState([]);
  const [toast,      setToast]      = useState(null);
  const [activeCat,  setActiveCat]  = useState("all");
  const [globalSearch, setGlobalSearch] = useState("");

  const showToast = (msg, type="success") => {
    setToast({msg,type});
    setTimeout(()=>setToast(null),3000);
  };

  const nav = (to, data=null) => {
    setPage(to);
    setPageData(data);
    window.scrollTo(0,0);
  };

  const addCart = (p, qty=1) => {
    if (stockStatus(p) === "out") {
      showToast(`${p.name} is out of stock!`, "error");
      return;
    }
    setCart(c => {
      const ex = c.find(i=>i.id===p.id);
      if (ex) return c.map(i=>i.id===p.id?{...i,qty:i.qty+qty}:i);
      return [...c, {...p, qty}];
    });
    showToast(`${p.name} कार्टमा थपियो!`);
  };

  const login = u => {
    setUser(u);
    showToast(`स्वागत छ, ${u.name.split(" ")[0]}!`);
    if (u.role==="admin") nav("admin");
    else if (u.role==="seller") nav("seller");
    else nav("home");
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setActiveCat("all");
    setGlobalSearch("");
    nav("home");
    showToast("लगआउट सफल भयो।");
  };

  /* When category changes from Navbar while already on products, re-render */
  const handleCatChange = id => {
    setActiveCat(id);
    if (page !== "products") nav("products");
  };

  const handleSearch = val => {
    setGlobalSearch(val);
    if (val.trim() && page !== "products") nav("products");
  };

  const noNav = page==="login" || page==="register";

  return (
    <div style={{ fontFamily:"'Hind',sans-serif", background:T.surface, minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Sanskrit:ital@0;1&family=Hind:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Hind',sans-serif; }
        /* Hide scrollbar on category strip */
        nav div[class]::-webkit-scrollbar { display:none; }
        /* General thin scrollbar */
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:#f0ede8; }
        ::-webkit-scrollbar-thumb { background:${T.green}; border-radius:4px; }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slideUp { from{transform:translateY(50px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        /* Table width fix */
        table { border-collapse: collapse; }
        /* Mobile: tap targets */
        button, a { -webkit-tap-highlight-color: transparent; }
        /* Prevent horizontal overflow on mobile */
        body { overflow-x: hidden; }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", bottom:20, right:16, left:16, maxWidth:360, margin:"0 auto",
          zIndex:9999, background:toast.type==="success"?T.success:T.danger, color:"#fff",
          padding:"12px 18px", borderRadius:12, fontSize:13, fontWeight:700,
          boxShadow:"0 8px 28px rgba(0,0,0,0.2)", display:"flex", alignItems:"center",
          gap:8, animation:"slideUp 0.3s ease" }}>
          <Check size={15}/> {toast.msg}
        </div>
      )}

      {noNav ? (
        <AuthPage mode={page} onLogin={login} nav={nav}/>
      ) : (
        <>
          <Navbar
            user={user} cart={cart} nav={nav} logout={logout}
            activeCat={activeCat} setActiveCat={handleCatChange}
            onSearch={handleSearch}
          />
          <div style={{ animation:"fadeIn 0.2s ease" }}>
            {page==="home"     && <HomePage nav={nav} addCart={addCart} setActiveCat={handleCatChange}/>}
            {page==="products" && (
              <ProductsPage nav={nav} addCart={addCart}
                activeCat={activeCat} setActiveCat={setActiveCat}
                globalSearch={globalSearch}/>
            )}
            {page==="product"  && <ProductDetail product={pageData} nav={nav} addCart={addCart}/>}
            {page==="cart"     && <CartPage cart={cart} setCart={setCart} nav={nav}/>}
            {page==="checkout" && <CheckoutPage cart={cart} nav={nav} onDone={()=>setCart([])}/>}
            {page==="orders"   && <OrdersPage/>}
            {page==="seller"   && <SellerDash user={user}/>}
            {page==="admin"    && <AdminDash/>}
          </div>
        </>
      )}
    </div>
  );
}
