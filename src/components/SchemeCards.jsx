import React from 'react';

const SchemeCards = () => {
    const schemes = [
        {
            title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
            description: "Direct income support of ₹6,000/year provided in three ₹2,000 instalments via DBT to small and marginal farmers.",
            eligibility: [
                "Cultivable land-holder farmer families (up to 2 hectares).",
                "Exclusions: income-tax payers, pensioners receiving ≥ ₹10,000/month (unless lower-level staff), and professionals (e.g., doctors, lawyers)."
            ],
            documents: [
                "Aadhaar (e-KYC)",
                "Bank account details",
                "Proof of land ownership"
            ],
            benefit: "₹6,000/year, disbursed in three instalments of ₹2,000 each.",
            applink: "https://pmkisan.gov.in/",
            vidlink: "https://www.youtube.com/watch?v=jT3f_yDQPnc"
        },
        {
            title: "National Agriculture Market (e-NAM)",
            description: "Unified electronic trading platform linking regulated markets (APMC/RMC) across India to facilitate transparent price discovery, broaden market access, and streamline payments.",
            eligibility: [
                "Requires State/UT-level reforms in APMC laws, approval of DPR by State-level Sanctioning Committee, integration of local mandis."
            ],
            documents: [
                "DPRs",
                "Proof of APMC Act reforms (single license, etc.)",
                "Infrastructure readiness details"
            ],
            benefit: "Free provision of e-NAM software, Up to ₹30 lakh per selected mandi for hardware, internet, assaying equipment, One year of Mandi Analyst support provided free.",
            applink: "https://www.enam.gov.in/web/",
            vidlink: "https://www.youtube.com/watch?v=jUot57Sbl9g"
        },
        {
            title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            description: "Affordable, government-backed crop insurance covering yield losses from pre-sowing to post-harvest due to natural calamities, pests, and diseases.",
            eligibility: [
                "All farmers (small, marginal, large, tenant, sharecroppers) growing notified crops in notified areas."
            ],
            documents: [
                "Aadhaar",
                "Land ownership records (RoR/LPC)",
                "Bank passbook",
                "Sowing certificate (where applicable)",
                "Self-declaration"
            ],
            benefit: "Nominal premium: Kharif 2%, Rabi 1.5%, annual commercial/horticultural 5%. Govt subsidizes the rest; offers comprehensive risk coverage.",
            applink: "https://odfr.agristack.gov.in/farmer-registry-od/#/",
            vidlink: "https://www.youtube.com/watch?v=ppumGoPKWjA"
        },
        {
            title: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
            description: "Launched in 2015 to enhance irrigation infrastructure and water-use efficiency through precision irrigation and watershed development.",
            eligibility: [
                "Farmers benefiting from govt irrigation infrastructure projects."
            ],
            documents: [
                "Land records",
                "KYC",
                "Resolution of project area"
            ],
            benefit: "Financial support for irrigation projects; specific subsidies depend on scheme component.",
            applink: "https://pmksy.nic.in/pmksysub/PMKSY/Login-orr.aspx",
            vidlink: "https://www.youtube.com/watch?v=CwjzNawJHLs"
        },
        {
            title: "National Food Security Mission (NFSM)",
            description: "Initiated in 2007 to boost production of rice, wheat, and pulses through high-yielding seeds, tech guidance, soil & water management.",
            eligibility: [
                "Farmers cultivating rice, wheat, or pulses in designated areas."
            ],
            documents: [
                "Proof of cultivation (landholding, cropping pattern)",
                "Seed procurement records",
                "Agricultural input usage records"
            ],
            benefit: "Access to high-yield variety seeds, technical guidance improving yields and reducing import dependency.",
            applink: "https://www.nfsm.gov.in/",
            vidlink: "https://www.youtube.com/watch?v=OQ6vGmqxc6I"
        },
        {
            title: "Kisan Credit Card (KCC)",
            description: "A credit facility offering timely and affordable loans for agricultural and allied needs, valid up to 5 years and extendable.",
            eligibility: [
                "Small, marginal, tenant farmers, oral lessees, sharecroppers, SHGs and JLGs."
            ],
            documents: [
                "Aadhaar (KYC)",
                "Land records",
                "ID proof (e.g., Voter ID)",
                "Address proof",
                "Cropped acreage",
                "Photos",
                "Bank account/passbook"
            ],
            benefit: "Interest subvention (~2%) and prompt repayment incentive (~3%), Accident insurance cover: ₹50,000 for death/permanent disability; ₹25,000 for other risks.",
            applink: "",
            vidlink: "https://www.youtube.com/watch?v=79uGBtYLvAE"
        },
        {
            title: "PM-KUSUM (Solar Irrigation Scheme)",
            description: "Promotes solar-powered irrigation pumps to enhance farmers' income and reduce reliance on diesel/electricity.",
            eligibility: [
                "Farmers or groups (Panchayats, Cooperatives) installing solar irrigation pumps."
            ],
            documents: [
                "Not explicitly detailed—likely project proposals, land details, KYC"
            ],
            benefit: "60% subsidy by Centre, 30% as loan, 10% farmer contribution. Option to sell surplus power back to the grid.",
            applink: "",
            vidlink: ""
        },
        {
            title: "Rashtriya Krishi Vikas Yojana (RKVY)",
            description: "Centrally Sponsored Scheme supporting state-driven agriculture and allied projects—covering crop diversification, infrastructure, innovation, and capacity building.",
            eligibility: [
                "Applicable to all States and UTs preparing State/District Agricultural Plans, spending on agriculture, focusing on marginalized farmers."
            ],
            documents: [
                "Project DPRs",
                "Utilization Certificates (UCs) and performance reports",
                "Bank account (for transfers)"
            ],
            benefit: "Funding shared 60:40 between Centre and State (90:10 in NE/hilly states; 100% in UTs), Grants up to ₹5 lakh for agripreneurs and ₹25 lakh for R-ABI incubatees.",
            applink: "",
            vidlink: ""
        },
        {
            title: "Soil Health Card Scheme (SHC)",
            description: "Launched in February 2015, provides crop-wise recommendations of fertilizers and nutrients based on soil testing to improve productivity.",
            eligibility: [
                "All farmers, including landowners and tenant farmers."
            ],
            documents: [
                "Identity proof (Aadhaar card, Voter ID)",
                "Land ownership or tenancy proof",
                "Passport-size photograph"
            ],
            benefit: "Government covers soil sample collection, testing, and card generation; tailored fertilizer recommendations at no cost.",
            applink: "",
            vidlink: ""
        },
        
        {
            title: "Blue Revolution",
            description: "Fisheries and aquaculture development initiative to expand fish production, improve fisher communities’ livelihood, and promote sustainable practices.",
            eligibility: [
                "Fisherfolk, aquaculture farmers, cooperatives, relevant stakeholders in fisheries production."
            ],
            documents: [
                "Proof of activity (fishing, aquaculture)",
                "Membership in fisheries institutions",
                "Land or water body use documents",
                "Technical capability"
            ],
            benefit: "Support includes infrastructure, technology transfer, fish seed production, sustainable practices; enhances income and growth.",
            applink: "",
            vidlink: ""
        }
    ];

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white/30 rounded-xl backdrop-blur-md">
            <h1 className="text-2xl font-bold text-center mb-6">Agricultural Schemes</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schemes.map((scheme, index) => (
                    <div key={index} className="bg-white rounded shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <h2 className="text-xl font-semibold mb-3">{scheme.title}</h2>

                        <p className="mb-3 text-gray-700">{scheme.description}</p>

                        <div className="mb-3">
                            <h3 className="font-semibold">Eligibility Criteria:</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {scheme.eligibility.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-3">
                            <h3 className="font-semibold">Required Documents:</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {scheme.documents.map((doc, idx) => (
                                    <li key={idx}>{doc}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold">Subsidy / Benefit:</h3>
                            <p className="text-gray-700">{scheme.benefit}</p>
                        </div>
                        <div className='flex gap-6 justify-center'>
                            <button
                                className="bg-[#4CAF50] hover:bg-[#FFC107] hover:text-[#212121] font-semibold text-white px-4 py-2 rounded-xl transition-all duration-300"
                                onClick={() => window.open(scheme.applink, "_blank")}
                            >
                                Apply Now
                            </button>
                            <button
                                className="bg-[#4CAF50] hover:bg-[#FFC107] hover:text-[#212121] font-semibold text-white px-4 py-2 rounded-xl transition-all duration-300"
                                onClick={() => window.open(scheme.vidlink, "_blank")}
                            >
                                How to Apply
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SchemeCards;
