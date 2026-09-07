/* =========================================================
   FINANCE FORWARD — CFO SIMULATION ENGINE
   NOVA CFO SIMULATION — 18 ROUND VERSION
   ========================================================= */


/* =========================================================
   1. INITIAL COMPANY STATE
   ========================================================= */

const INITIAL_COMPANY = {

    cash: 6.0,
    revenue: 12.4,
    startingRevenue: 12.4,

    grossMargin: 34,
    debt: 1.8,

    liquidity: 68,
    profitability: 61,
    growth: 70,
    risk: 38,

    financialPerformance: 60,
    liquidityManagement: 60,
    riskManagement: 60,
    strategicThinking: 60,
    capitalAllocation: 60,
    ethics: 60,

    /*
        Hidden CFO dimensions.

        These are NOT shown to the player during
        the simulation.

        They determine the final CFO archetype.
    */

    growthAppetite: 50,
    liquidityDiscipline: 50,
    capitalEfficiency: 50,
    leverageTolerance: 50,
    profitabilityFocus: 50,
    strategicAggression: 50,
    riskManagementTrait: 50,
    operationalDecisiveness: 50,
    longTermOrientation: 50,
    stakeholderAlignment: 50,

    /*
        Crisis-specific behavior.

        This is what allows the simulation to
        distinguish a normal risk-taker from a
        genuine turnaround operator.
    */

    normalRiskBehavior: 50,
    crisisDecisiveness: 50,
    crisisRounds: 0,

    round: 1,
    totalRounds: 18,

    decisions: [],

    totalInvestment: 0,
    totalDebtAdded: 0,

    /*
        Kept for compatibility with older UI.
    */

    aggressiveChoices: 0,
    balancedChoices: 0,
    conservativeChoices: 0

};


/* =========================================================
   2. ACTIVE COMPANY STATE
   ========================================================= */

let company = createFreshCompany();

let currentScenario = null;
let currentEffects = null;


/* =========================================================
   3. SCENARIOS
   ========================================================= */

const scenarios = [

    /* =====================================================
       SCENARIO 1
       ===================================================== */

    {
        round: 1,
        category: "R&D · STRATEGY",

        title: "The $4M R&D Bet",

        description:
            "Your engineering team says Nova's current platform will become a competitive disadvantage within 18 months. They are requesting $4M for a major architecture overhaul.",

        situationTitle:
            "Your platform is becoming a liability.",

        situationText:
            "Engineering believes the current architecture will materially limit Nova's ability to compete within 18 months. The board wants growth, but your controller is focused on preserving cash.",

        situationAdvice:
            "The question is not whether the technology matters. It is how much risk Nova should take to solve the problem.",

        information: [
            ["PROJECT COST", "$4.0M"],
            ["EXPECTED VELOCITY GAIN", "+30%"],
            ["YEAR-2 REVENUE UPSIDE", "+18%"],
            ["CURRENT CASH", "dynamic"]
        ],

        options: [

            {
                letter: "A",
                name: "Fully fund the overhaul",
                description:
                    "Commit the full $4M now and give engineering the resources to rebuild the platform.",

                effects: {
                    cash: -4.0,
                    revenueGrowth: 8,
                    grossMargin: 2,
                    liquidity: -12,
                    profitability: -4,
                    growth: 9,
                    risk: 7,
                    financialPerformance: 2,
                    liquidityManagement: -6,
                    riskManagement: -2,
                    strategicThinking: 8,
                    capitalAllocation: 4,
                    ethics: 1,

                    growthAppetite: 9,
                    liquidityDiscipline: -5,
                    capitalEfficiency: 1,
                    leverageTolerance: 4,
                    profitabilityFocus: -2,
                    strategicAggression: 10,
                    riskManagementTrait: -2,
                    operationalDecisiveness: 7,
                    longTermOrientation: 10,
                    stakeholderAlignment: 3
                },

                consequence:
                    "You made the full technology bet.",

                summary:
                    "Nova accelerates the architecture overhaul and materially reduces technical debt, but the $4M commitment puts significant pressure on near-term liquidity."
            },

            {
                letter: "B",
                name: "Fund maintenance only",
                description:
                    "Reject the overhaul and spend only $750K maintaining the existing architecture.",

                effects: {
                    cash: -0.75,
                    revenueGrowth: -3,
                    grossMargin: 1,
                    liquidity: 6,
                    profitability: 3,
                    growth: -4,
                    risk: 6,
                    financialPerformance: 4,
                    liquidityManagement: 7,
                    riskManagement: 3,
                    strategicThinking: 2,
                    capitalAllocation: 5,
                    ethics: 1,

                    growthAppetite: -8,
                    liquidityDiscipline: 9,
                    capitalEfficiency: 7,
                    leverageTolerance: -3,
                    profitabilityFocus: 8,
                    strategicAggression: -7,
                    riskManagementTrait: 6,
                    operationalDecisiveness: 5,
                    longTermOrientation: -8,
                    stakeholderAlignment: 1
                },

                consequence:
                    "You protected near-term cash.",

                summary:
                    "Nova preserves financial flexibility today, but technical debt and competitive risk continue accumulating."
            },

            {
                letter: "C",
                name: "Release funding by milestone",
                description:
                    "Commit $2M initially and release additional funding only when engineering hits defined milestones.",

                effects: {
                    cash: -2.0,
                    revenueGrowth: 4,
                    grossMargin: 1,
                    liquidity: -5,
                    profitability: -1,
                    growth: 6,
                    risk: 1,
                    financialPerformance: 6,
                    liquidityManagement: 5,
                    riskManagement: 8,
                    strategicThinking: 9,
                    capitalAllocation: 10,
                    ethics: 2,

                    growthAppetite: 5,
                    liquidityDiscipline: 6,
                    capitalEfficiency: 10,
                    leverageTolerance: 2,
                    profitabilityFocus: 3,
                    strategicAggression: 5,
                    riskManagementTrait: 9,
                    operationalDecisiveness: 8,
                    longTermOrientation: 9,
                    stakeholderAlignment: 5
                },

                consequence:
                    "You tied capital deployment to execution.",

                summary:
                    "Nova moves forward with the architecture overhaul while limiting exposure if engineering fails to deliver."
            },

            {
                letter: "D",
                name: "Raise equity for the project",
                description:
                    "Raise $4M of new equity specifically to fund the architecture overhaul without consuming operating cash.",

                effects: {
                    cash: 0,
                    revenueGrowth: 8,
                    grossMargin: 2,
                    liquidity: 2,
                    profitability: -3,
                    growth: 9,
                    risk: 1,
                    financialPerformance: 5,
                    liquidityManagement: 5,
                    riskManagement: 5,
                    strategicThinking: 9,
                    capitalAllocation: 6,
                    ethics: 2,

                    growthAppetite: 9,
                    liquidityDiscipline: 8,
                    capitalEfficiency: 3,
                    leverageTolerance: 6,
                    profitabilityFocus: -2,
                    strategicAggression: 8,
                    riskManagementTrait: 5,
                    operationalDecisiveness: 6,
                    longTermOrientation: 9,
                    stakeholderAlignment: 6
                },

                consequence:
                    "You funded the technology bet without consuming operating cash.",

                summary:
                    "Nova preserves its balance-sheet flexibility, but shareholders absorb dilution and near-term EPS pressure."
            }
        ]
    },


    /* =====================================================
       SCENARIO 2
       ===================================================== */

    {
        round: 2,
        category: "CUSTOMERS · PRICING",

        title: "Your Biggest Customer Wants a Discount",

        description:
            "Nova's largest customer represents 17% of revenue. They threaten to leave unless you give them a 15% price reduction.",

        situationTitle:
            "One customer has negotiating power.",

        situationText:
            "Losing this account would create a significant revenue hole. Giving away too much pricing power could also damage Nova's economics.",

        situationAdvice:
            "There is no clean answer. You must decide what matters more: immediate retention, margin, or long-term pricing discipline.",

        information: [
            ["CUSTOMER REVENUE", "17%"],
            ["REQUESTED DISCOUNT", "15%"],
            ["ANNUAL FCF IMPACT", "$450K"],
            ["RETENTION IF ACCEPTED", "95%"]
        ],

        options: [

            {
                letter: "A",
                name: "Give the full discount",
                description:
                    "Accept the 15% reduction and secure the account.",

                effects: {
                    cash: -0.45,
                    revenueGrowth: -2,
                    grossMargin: -2.5,
                    liquidity: -2,
                    profitability: -3,
                    growth: 2,
                    risk: 1,
                    financialPerformance: 1,
                    liquidityManagement: -1,
                    riskManagement: 2,
                    strategicThinking: 4,
                    capitalAllocation: 2,
                    ethics: 2,

                    growthAppetite: 3,
                    liquidityDiscipline: 1,
                    capitalEfficiency: 2,
                    leverageTolerance: 1,
                    profitabilityFocus: -4,
                    strategicAggression: 2,
                    riskManagementTrait: 4,
                    operationalDecisiveness: 7,
                    longTermOrientation: 2,
                    stakeholderAlignment: 8
                },

                consequence:
                    "You protected the customer relationship.",

                summary:
                    "Nova keeps a strategically important customer, but accepts permanent margin pressure and leaves concentration risk unchanged."
            },

            {
                letter: "B",
                name: "Refuse the discount",
                description:
                    "Hold pricing discipline and accept the possibility that the customer walks.",

                effects: {
                    cash: -0.30,
                    revenueGrowth: -7,
                    grossMargin: 2,
                    liquidity: -6,
                    profitability: 4,
                    growth: -5,
                    risk: 5,
                    financialPerformance: 3,
                    liquidityManagement: -1,
                    riskManagement: 2,
                    strategicThinking: 6,
                    capitalAllocation: 5,
                    ethics: 2,

                    growthAppetite: -2,
                    liquidityDiscipline: -2,
                    capitalEfficiency: 8,
                    leverageTolerance: 1,
                    profitabilityFocus: 9,
                    strategicAggression: 7,
                    riskManagementTrait: 1,
                    operationalDecisiveness: 10,
                    longTermOrientation: 7,
                    stakeholderAlignment: -2
                },

                consequence:
                    "You protected pricing integrity.",

                summary:
                    "Nova keeps its economics intact and reduces dependence on a single customer if the account eventually leaves."
            },

            {
                letter: "C",
                name: "Trade price for commitment",
                description:
                    "Offer a 7% discount in exchange for a three-year contract.",

                effects: {
                    cash: -0.20,
                    revenueGrowth: 3,
                    grossMargin: -1,
                    liquidity: 0,
                    profitability: 1,
                    growth: 5,
                    risk: -2,
                    financialPerformance: 7,
                    liquidityManagement: 4,
                    riskManagement: 6,
                    strategicThinking: 9,
                    capitalAllocation: 8,
                    ethics: 3,

                    growthAppetite: 5,
                    liquidityDiscipline: 5,
                    capitalEfficiency: 8,
                    leverageTolerance: 1,
                    profitabilityFocus: 5,
                    strategicAggression: 5,
                    riskManagementTrait: 8,
                    operationalDecisiveness: 7,
                    longTermOrientation: 9,
                    stakeholderAlignment: 9
                },

                consequence:
                    "You traded some margin for predictability.",

                summary:
                    "Nova gives up pricing power but gains a three-year revenue commitment and significantly greater forecasting visibility."
            },

            {
                letter: "D",
                name: "Add value instead of cutting price",
                description:
                    "Keep pricing intact while offering additional services and features.",

                effects: {
                    cash: -0.30,
                    revenueGrowth: 1,
                    grossMargin: -1,
                    liquidity: -1,
                    profitability: 0,
                    growth: 3,
                    risk: -1,
                    financialPerformance: 6,
                    liquidityManagement: 2,
                    riskManagement: 6,
                    strategicThinking: 8,
                    capitalAllocation: 5,
                    ethics: 4,

                    growthAppetite: 4,
                    liquidityDiscipline: 3,
                    capitalEfficiency: 5,
                    leverageTolerance: 1,
                    profitabilityFocus: 4,
                    strategicAggression: 4,
                    riskManagementTrait: 7,
                    operationalDecisiveness: 6,
                    longTermOrientation: 8,
                    stakeholderAlignment: 10
                },

                consequence:
                    "You defended price by increasing value.",

                summary:
                    "Nova protects pricing integrity while spending additional operating resources to make the relationship harder to replace."
            }
        ]
    },


    /* =====================================================
       SCENARIO 3
       ===================================================== */

    {
        round: 3,
        category: "TREASURY · CAPITAL",

        title: "Cash Is Sitting There Doing Nothing",

        description:
            "Nova has $6M in cash, but only $2M is needed for normal operations over the next six months.",

        situationTitle:
            "Cash is safe — but safety has a cost.",

        situationText:
            "Nova has accumulated a meaningful cash reserve. The board is divided between preserving optionality and putting idle capital to work.",

        situationAdvice:
            "Your decision should reflect what you believe the company will need that capital for.",

        information: [
            ["TOTAL CASH", "$6.0M"],
            ["6-MONTH OPERATING NEED", "$2.0M"],
            ["POTENTIAL TREASURY RETURN", "4%"],
            ["EXCESS CASH", "$4.0M"]
        ],

        options: [

            {
                letter: "A",
                name: "Keep all cash liquid",
                description:
                    "Leave the entire $6M in operating cash.",

                effects: {
                    cash: 0,
                    liquidity: 6,
                    profitability: -1,
                    financialPerformance: 3,
                    liquidityManagement: 9,
                    riskManagement: 7,
                    strategicThinking: 4,
                    capitalAllocation: 4,

                    growthAppetite: -2,
                    liquidityDiscipline: 10,
                    capitalEfficiency: -4,
                    leverageTolerance: -2,
                    profitabilityFocus: 3,
                    strategicAggression: -3,
                    riskManagementTrait: 9,
                    operationalDecisiveness: 2,
                    longTermOrientation: 4,
                    stakeholderAlignment: 3
                },

                consequence:
                    "You kept maximum liquidity.",

                summary:
                    "Nova retains complete financial flexibility, but idle cash earns essentially nothing."
            },

            {
                letter: "B",
                name: "Buy short-term government securities",
                description:
                    "Move $3M into short-term government securities while keeping $3M immediately available.",

                effects: {
                    cash: 0.12,
                    liquidity: 3,
                    profitability: 2,
                    financialPerformance: 6,
                    liquidityManagement: 7,
                    riskManagement: 8,
                    strategicThinking: 6,
                    capitalAllocation: 8,

                    growthAppetite: 0,
                    liquidityDiscipline: 8,
                    capitalEfficiency: 8,
                    leverageTolerance: 0,
                    profitabilityFocus: 5,
                    strategicAggression: 0,
                    riskManagementTrait: 9,
                    operationalDecisiveness: 4,
                    longTermOrientation: 6,
                    stakeholderAlignment: 4
                },

                consequence:
                    "You put excess cash to work conservatively.",

                summary:
                    "Nova earns additional treasury income while maintaining a substantial liquidity reserve."
            },

            {
                letter: "C",
                name: "Repurchase shares",
                description:
                    "Use $3M to repurchase Nova shares while the company is trading below your estimate of intrinsic value.",

                effects: {
                    cash: -3.0,
                    liquidity: -8,
                    profitability: 3,
                    growth: 1,
                    risk: 3,
                    financialPerformance: 7,
                    liquidityManagement: -5,
                    riskManagement: 1,
                    strategicThinking: 7,
                    capitalAllocation: 10,

                    growthAppetite: -1,
                    liquidityDiscipline: -4,
                    capitalEfficiency: 10,
                    leverageTolerance: 2,
                    profitabilityFocus: 7,
                    strategicAggression: 5,
                    riskManagementTrait: 1,
                    operationalDecisiveness: 8,
                    longTermOrientation: 7,
                    stakeholderAlignment: 7
                },

                consequence:
                    "You returned capital through a share repurchase.",

                summary:
                    "Nova reduces its share count and potentially increases per-share value, but gives up significant strategic liquidity."
            },

            {
                letter: "D",
                name: "Reserve cash for acquisitions",
                description:
                    "Ring-fence $3M for potential acquisitions while keeping it available for strategic opportunities.",

                effects: {
                    cash: 0,
                    liquidity: 4,
                    financialPerformance: 5,
                    liquidityManagement: 7,
                    riskManagement: 5,
                    strategicThinking: 10,
                    capitalAllocation: 9,

                    growthAppetite: 5,
                    liquidityDiscipline: 8,
                    capitalEfficiency: 7,
                    leverageTolerance: 3,
                    profitabilityFocus: 3,
                    strategicAggression: 7,
                    riskManagementTrait: 6,
                    operationalDecisiveness: 5,
                    longTermOrientation: 10,
                    stakeholderAlignment: 5
                },

                consequence:
                    "You preserved capital for strategic optionality.",

                summary:
                    "Nova sacrifices potential treasury income but maintains the ability to act quickly if an attractive acquisition appears."
            }
        ]
    },


    /* =====================================================
       SCENARIO 4
       ===================================================== */

    {
        round: 4,
        category: "WORKING CAPITAL · LIQUIDITY",

        title: "Revenue Is Growing, But Cash Isn't",

        description:
            "Revenue has grown 35%, but customers are taking longer to pay. DSO has risen from 42 to 78 days.",

        situationTitle:
            "Profit is not the same thing as cash.",

        situationText:
            "Nova is reporting strong revenue growth while an increasing amount of capital becomes trapped in accounts receivable.",

        situationAdvice:
            "The CFO's job is to turn accounting performance into actual cash without unnecessarily damaging customer relationships.",

        information: [
            ["DSO", "42 → 78 DAYS"],
            ["REVENUE GROWTH", "+35%"],
            ["RECEIVABLES", "$2.4M"],
            ["CASH PRESSURE", "HIGH"]
        ],

        options: [

            {
                letter: "A",
                name: "Enforce Net-30",
                description:
                    "Require customers to pay faster even if some sales are lost.",

                effects: {
                    cash: 1.10,
                    revenueGrowth: -4,
                    grossMargin: 1,
                    liquidity: 10,
                    profitability: 3,
                    growth: -4,
                    risk: -5,
                    financialPerformance: 6,
                    liquidityManagement: 10,
                    riskManagement: 8,
                    strategicThinking: 4,
                    capitalAllocation: 6,

                    growthAppetite: -5,
                    liquidityDiscipline: 10,
                    capitalEfficiency: 8,
                    leverageTolerance: -2,
                    profitabilityFocus: 7,
                    strategicAggression: 4,
                    riskManagementTrait: 9,
                    operationalDecisiveness: 10,
                    longTermOrientation: 5,
                    stakeholderAlignment: -2
                },

                consequence:
                    "You aggressively improved cash conversion.",

                summary:
                    "Nova releases working capital quickly, but some customers may leave for competitors offering more flexible terms."
            },

            {
                letter: "B",
                name: "Factor receivables",
                description:
                    "Allow longer customer terms but factor receivables to accelerate cash collection.",

                effects: {
                    cash: 1.50,
                    grossMargin: -3,
                    liquidity: 8,
                    profitability: -1,
                    growth: 3,
                    risk: -3,
                    financialPerformance: 4,
                    liquidityManagement: 8,
                    riskManagement: 6,
                    strategicThinking: 7,
                    capitalAllocation: 6,

                    growthAppetite: 3,
                    liquidityDiscipline: 8,
                    capitalEfficiency: 5,
                    leverageTolerance: 4,
                    profitabilityFocus: 1,
                    strategicAggression: 4,
                    riskManagementTrait: 7,
                    operationalDecisiveness: 7,
                    longTermOrientation: 4,
                    stakeholderAlignment: 6
                },

                consequence:
                    "You converted receivables into immediate liquidity.",

                summary:
                    "Nova solves the cash problem without disrupting customers, but factoring fees permanently reduce economics."
            },

            {
                letter: "C",
                name: "Use the revolver",
                description:
                    "Draw $1.5M from Nova's revolving credit facility and leave customer terms unchanged.",

                effects: {
                    cash: 1.50,
                    debt: 1.50,
                    liquidity: 7,
                    profitability: -2,
                    growth: 2,
                    risk: 7,
                    financialPerformance: 3,
                    liquidityManagement: 6,
                    riskManagement: 1,
                    strategicThinking: 6,
                    capitalAllocation: 4,

                    growthAppetite: 4,
                    liquidityDiscipline: 4,
                    capitalEfficiency: 4,
                    leverageTolerance: 9,
                    profitabilityFocus: 2,
                    strategicAggression: 6,
                    riskManagementTrait: -1,
                    operationalDecisiveness: 7,
                    longTermOrientation: 3,
                    stakeholderAlignment: 7
                },

                consequence:
                    "You financed the working-capital gap with debt.",

                summary:
                    "Nova protects customer relationships and keeps sales moving, but leverage and interest expense increase while the underlying DSO problem remains."
            },

            {
                letter: "D",
                name: "Discount early payment",
                description:
                    "Offer a 3% discount to customers who pay within 10 days.",

                effects: {
                    cash: 0.90,
                    grossMargin: -2.5,
                    liquidity: 8,
                    profitability: -1,
                    growth: 2,
                    risk: -2,
                    financialPerformance: 7,
                    liquidityManagement: 9,
                    riskManagement: 7,
                    strategicThinking: 7,
                    capitalAllocation: 7,

                    growthAppetite: 2,
                    liquidityDiscipline: 9,
                    capitalEfficiency: 7,
                    leverageTolerance: 0,
                    profitabilityFocus: 2,
                    strategicAggression: 3,
                    riskManagementTrait: 8,
                    operationalDecisiveness: 6,
                    longTermOrientation: 6,
                    stakeholderAlignment: 8
                },

                consequence:
                    "You paid for faster cash conversion.",

                summary:
                    "Nova dramatically improves its cash cycle while giving customers an economic incentive to pay early."
            }
        ]
    },


    /* =====================================================
       SCENARIO 5
       ===================================================== */

    {
        round: 5,
        category: "COST STRUCTURE · TECHNOLOGY",

        title: "Cloud Costs Explode",

        description:
            "User growth has pushed cloud infrastructure costs up 45%. Gross margin has fallen from 38% to 29%.",

        situationTitle:
            "Growth is becoming expensive.",

        situationText:
            "Nova's technology infrastructure is no longer scaling economically. Every growth decision now has a direct effect on gross margin.",

        situationAdvice:
            "You can lock in lower costs, spend heavily on infrastructure, raise prices, or constrain usage.",

        information: [
            ["CLOUD COST GROWTH", "+45%"],
            ["GROSS MARGIN", "38% → 29%"],
            ["PRICE INCREASE PROPOSAL", "+12%"],
            ["INFRASTRUCTURE CAPEX", "$5M"]
        ],

        options: [

            {
                letter: "A",
                name: "Lock in cloud capacity",
                description:
                    "Sign a three-year commitment in exchange for substantially lower cloud pricing.",

                effects: {
                    grossMargin: 6,
                    profitability: 4,
                    liquidity: -2,
                    risk: 4,
                    financialPerformance: 6,
                    liquidityManagement: 2,
                    riskManagement: 3,
                    strategicThinking: 7,
                    capitalAllocation: 7,

                    growthAppetite: 6,
                    liquidityDiscipline: 2,
                    capitalEfficiency: 7,
                    leverageTolerance: 2,
                    profitabilityFocus: 7,
                    strategicAggression: 5,
                    riskManagementTrait: 2,
                    operationalDecisiveness: 8,
                    longTermOrientation: 8,
                    stakeholderAlignment: 4
                },

                consequence:
                    "You traded flexibility for lower unit economics.",

                summary:
                    "Nova materially improves gross margin, but the three-year commitment becomes a fixed obligation if growth slows."
            },

            {
                letter: "B",
                name: "Build infrastructure",
                description:
                    "Spend $5M building Nova's own infrastructure.",

                effects: {
                    cash: -5.0,
                    grossMargin: 10,
                    profitability: -3,
                    liquidity: -12,
                    growth: 5,
                    risk: 8,
                    financialPerformance: 3,
                    liquidityManagement: -5,
                    riskManagement: -3,
                    strategicThinking: 10,
                    capitalAllocation: 6,

                    growthAppetite: 8,
                    liquidityDiscipline: -4,
                    capitalEfficiency: 4,
                    leverageTolerance: 3,
                    profitabilityFocus: 5,
                    strategicAggression: 10,
                    riskManagementTrait: -2,
                    operationalDecisiveness: 9,
                    longTermOrientation: 10,
                    stakeholderAlignment: 4
                },

                consequence:
                    "You vertically integrated the infrastructure layer.",

                summary:
                    "Nova takes a large upfront hit but could materially improve long-term unit economics if utilization continues growing."
            },

            {
                letter: "C",
                name: "Raise prices",
                description:
                    "Increase average selling prices by 12% to offset infrastructure inflation.",

                effects: {
                    revenueGrowth: 7,
                    grossMargin: 5,
                    profitability: 6,
                    liquidity: 2,
                    growth: 5,
                    risk: 3,
                    financialPerformance: 7,
                    liquidityManagement: 3,
                    riskManagement: 3,
                    strategicThinking: 7,
                    capitalAllocation: 5,

                    growthAppetite: 5,
                    liquidityDiscipline: 4,
                    capitalEfficiency: 7,
                    leverageTolerance: 1,
                    profitabilityFocus: 9,
                    strategicAggression: 6,
                    riskManagementTrait: 3,
                    operationalDecisiveness: 8,
                    longTermOrientation: 7,
                    stakeholderAlignment: 4
                },

                consequence:
                    "You passed infrastructure inflation onto customers.",

                summary:
                    "Nova protects its economics and funds growth through pricing, but some customers may respond by reducing usage or switching."
            },

            {
                letter: "D",
                name: "Introduce usage caps",
                description:
                    "Limit high-cost usage to keep infrastructure spending predictable.",

                effects: {
                    revenueGrowth: -3,
                    grossMargin: 7,
                    profitability: 5,
                    liquidity: 3,
                    growth: -5,
                    risk: -2,
                    financialPerformance: 5,
                    liquidityManagement: 5,
                    riskManagement: 6,
                    strategicThinking: 6,
                    capitalAllocation: 7,

                    growthAppetite: -5,
                    liquidityDiscipline: 7,
                    capitalEfficiency: 8,
                    leverageTolerance: -1,
                    profitabilityFocus: 8,
                    strategicAggression: 1,
                    riskManagementTrait: 7,
                    operationalDecisiveness: 9,
                    longTermOrientation: 5,
                    stakeholderAlignment: -4
                },

                consequence:
                    "You prioritized predictable infrastructure economics.",

                summary:
                    "Nova protects margins and cost predictability, but limits on usage could slow adoption and frustrate customers."
            }
        ]
    },


    /* =====================================================
       SCENARIO 6
       ===================================================== */

    {
        round: 6,
        category: "RECESSION · OPERATIONS",

        title: "The Recession Hits",

        description:
            "Enterprise spending across Nova's industry is expected to fall 20% over the next year.",

        situationTitle:
            "The market is about to shrink.",

        situationText:
            "Nova can cut costs aggressively, preserve capacity, or use the downturn to acquire weakened competitors.",

        situationAdvice:
            "This is a crisis decision. Your behavior here will contribute heavily to your turnaround profile.",

        information: [
            ["EXPECTED INDUSTRY DECLINE", "-20%"],
            ["CURRENT CASH", "dynamic"],
            ["WORKFORCE COST", "$2.0M/YEAR"],
            ["ACQUISITION OPPORTUNITY", "$3M"]
        ],

        options: [

            {
                letter: "A",
                name: "Cut workforce 15%",
                description:
                    "Reduce headcount immediately to protect profitability and runway.",

                effects: {
                    cash: -0.60,
                    profitability: 8,
                    liquidity: 6,
                    growth: -5,
                    risk: -2,
                    financialPerformance: 7,
                    liquidityManagement: 7,
                    riskManagement: 7,
                    strategicThinking: 5,
                    capitalAllocation: 7,
                    ethics: -3,

                    growthAppetite: -2,
                    liquidityDiscipline: 8,
                    capitalEfficiency: 8,
                    leverageTolerance: -2,
                    profitabilityFocus: 10,
                    strategicAggression: 5,
                    riskManagementTrait: 8,
                    operationalDecisiveness: 10,
                    longTermOrientation: 3,
                    stakeholderAlignment: -6,

                    crisisDecisiveness: 10
                },

                consequence:
                    "You moved Nova into immediate cost-control mode.",

                summary:
                    "Nova extends its runway and protects margins, but employee morale and product velocity take a meaningful hit."
            },

            {
                letter: "B",
                name: "Protect the organization",
                description:
                    "Maintain headcount and continue investing through the downturn.",

                effects: {
                    cash: -2.0,
                    liquidity: -8,
                    profitability: -4,
                    growth: 4,
                    risk: 7,
                    financialPerformance: 2,
                    liquidityManagement: -5,
                    riskManagement: -2,
                    strategicThinking: 8,
                    capitalAllocation: 3,
                    ethics: 3,

                    growthAppetite: 8,
                    liquidityDiscipline: -5,
                    capitalEfficiency: 2,
                    leverageTolerance: 3,
                    profitabilityFocus: -3,
                    strategicAggression: 8,
                    riskManagementTrait: -3,
                    operationalDecisiveness: 3,
                    longTermOrientation: 10,
                    stakeholderAlignment: 10,

                    crisisDecisiveness: 2
                },

                consequence:
                    "You chose to defend organizational capacity.",

                summary:
                    "Nova retains its talent and market capacity, but burns cash rapidly while industry demand contracts."
            },

            {
                letter: "C",
                name: "Freeze hiring and trim spending",
                description:
                    "Freeze hiring and cut discretionary spending by 10% without major layoffs.",

                effects: {
                    cash: -0.05,
                    profitability: 3,
                    liquidity: 2,
                    growth: -2,
                    risk: 0,
                    financialPerformance: 7,
                    liquidityManagement: 8,
                    riskManagement: 7,
                    strategicThinking: 8,
                    capitalAllocation: 8,
                    ethics: 2,

                    growthAppetite: 1,
                    liquidityDiscipline: 8,
                    capitalEfficiency: 9,
                    leverageTolerance: 0,
                    profitabilityFocus: 7,
                    strategicAggression: 3,
                    riskManagementTrait: 8,
                    operationalDecisiveness: 8,
                    longTermOrientation: 7,
                    stakeholderAlignment: 5,

                    crisisDecisiveness: 8
                },

                consequence:
                    "You made targeted cuts without destabilizing the organization.",

                summary:
                    "Nova improves resilience while preserving most of its productive capacity."
            },

            {
                letter: "D",
                name: "Acquire weakened competitors",
                description:
                    "Spend $3M acquiring distressed competitors while valuations are low.",

                effects: {
                    cash: -3.0,
                    debt: 0.80,
                    revenueGrowth: 8,
                    growth: 10,
                    liquidity: -12,
                    profitability: -3,
                    risk: 10,
                    financialPerformance: 4,
                    liquidityManagement: -7,
                    riskManagement: -3,
                    strategicThinking: 10,
                    capitalAllocation: 5,
                    ethics: 2,

                    growthAppetite: 10,
                    liquidityDiscipline: -7,
                    capitalEfficiency: 5,
                    leverageTolerance: 9,
                    profitabilityFocus: -2,
                    strategicAggression: 10,
                    riskManagementTrait: -4,
                    operationalDecisiveness: 10,
                    longTermOrientation: 10,
                    stakeholderAlignment: 5,

                    crisisDecisiveness: 10
                },

                consequence:
                    "You treated the recession as an acquisition window.",

                summary:
                    "Nova gains market share at distressed valuations, but liquidity and integration risk rise sharply."
            }
        ]
    },


    /* =====================================================
       SCENARIO 7
       ===================================================== */

    {
        round: 7,
        category: "M&A · CAPITAL ALLOCATION",

        title: "The Acquisition",

        description:
            "A struggling competitor offers its technology, customers, and employees for $5M.",

        situationTitle:
            "A competitor is suddenly cheap.",

        situationText:
            "The target has meaningful customers and useful technology, but its operations are unstable.",

        situationAdvice:
            "The structure of the transaction may matter as much as whether you acquire the company.",

        information: [
            ["PURCHASE PRICE", "$5.0M"],
            ["MARKET SHARE UPSIDE", "+15%"],
            ["REVENUE UPSIDE", "+10%"],
            ["INTEGRATION RISK", "MEDIUM"]
        ],

        options: [

            {
                letter: "A",
                name: "Pay cash",
                description:
                    "Use Nova's balance sheet to close the acquisition immediately.",

                effects: {
                    cash: -5.0,
                    revenueGrowth: 10,
                    growth: 10,
                    liquidity: -14,
                    profitability: -2,
                    risk: 6,
                    financialPerformance: 4,
                    liquidityManagement: -6,
                    riskManagement: -2,
                    strategicThinking: 9,
                    capitalAllocation: 4,

                    growthAppetite: 9,
                    liquidityDiscipline: -6,
                    capitalEfficiency: 4,
                    leverageTolerance: 4,
                    profitabilityFocus: -1,
                    strategicAggression: 9,
                    riskManagementTrait: 0,
                    operationalDecisiveness: 8,
                    longTermOrientation: 9,
                    stakeholderAlignment: 5
                },

                consequence:
                    "You paid for speed with liquidity.",

                summary:
                    "Nova gains scale quickly while putting substantial pressure on its balance sheet."
            },

            {
                letter: "B",
                name: "Finance with debt",
                description:
                    "Preserve operating cash by financing the acquisition with debt.",

                effects: {
                    cash: -0.50,
                    debt: 5.0,
                    revenueGrowth: 10,
                    growth: 10,
                    liquidity: 0,
                    profitability: -4,
                    risk: 12,
                    financialPerformance: 3,
                    liquidityManagement: 5,
                    riskManagement: -5,
                    strategicThinking: 8,
                    capitalAllocation: 5,

                    growthAppetite: 10,
                    liquidityDiscipline: 4,
                    capitalEfficiency: 4,
                    leverageTolerance: 10,
                    profitabilityFocus: -3,
                    strategicAggression: 10,
                    riskManagementTrait: -5,
                    operationalDecisiveness: 8,
                    longTermOrientation: 8,
                    stakeholderAlignment: 4
                },

                consequence:
                    "You preserved cash by leveraging the balance sheet.",

                summary:
                    "Nova gains the acquisition without consuming much operating cash, but leverage becomes a major source of financial risk."
            },

            {
                letter: "C",
                name: "Use an earn-out",
                description:
                    "Pay $2M upfront and tie the remaining consideration to future performance.",

                effects: {
                    cash: -2.0,
                    revenueGrowth: 7,
                    growth: 7,
                    liquidity: -5,
                    profitability: 1,
                    risk: 1,
                    financialPerformance: 7,
                    liquidityManagement: 6,
                    riskManagement: 8,
                    strategicThinking: 10,
                    capitalAllocation: 10,

                    growthAppetite: 7,
                    liquidityDiscipline: 7,
                    capitalEfficiency: 10,
                    leverageTolerance: 1,
                    profitabilityFocus: 4,
                    strategicAggression: 7,
                    riskManagementTrait: 9,
                    operationalDecisiveness: 8,
                    longTermOrientation: 9,
                    stakeholderAlignment: 7
                },

                consequence:
                    "You made the seller share the execution risk.",

                summary:
                    "Nova captures much of the acquisition upside while tying a large portion of the purchase price to actual results."
            },

            {
                letter: "D",
                name: "Walk away",
                description:
                    "Keep the capital and continue growing organically.",

                effects: {
                    cash: 0,
                    growth: -1,
                    liquidity: 5,
                    profitability: 2,
                    risk: -5,
                    financialPerformance: 5,
                    liquidityManagement: 7,
                    riskManagement: 9,
                    strategicThinking: 5,
                    capitalAllocation: 9,

                    growthAppetite: -3,
                    liquidityDiscipline: 9,
                    capitalEfficiency: 9,
                    leverageTolerance: -3,
                    profitabilityFocus: 6,
                    strategicAggression: -2,
                    riskManagementTrait: 9,
                    operationalDecisiveness: 7,
                    longTermOrientation: 5,
                    stakeholderAlignment: 4
                },

                consequence:
                    "You refused to force an acquisition.",

                summary:
                    "Nova preserves capital and avoids integration risk, but gives up the opportunity to accelerate market share."
            }
        ]
    },


    /* =====================================================
       SCENARIO 8
       ===================================================== */

    {
        round: 8,
        category: "PRODUCT · EXECUTION",

        title: "Your Product Is Late",

        description:
            "A major product launch is scheduled for Q4. Engineering says it needs another four months to eliminate serious bugs.",

        situationTitle:
            "The launch date is colliding with reality.",

        situationText:
            "The sales organization has already promised customers the Q4 launch. Engineering says releasing now creates serious reliability risk.",

        situationAdvice:
            "The financial consequences are immediate, but the reputational consequences may last much longer.",

        information: [
            ["EXPECTED Q4 REVENUE", "$2.5M"],
            ["DELAY", "4 MONTHS"],
            ["BUG SEVERITY", "HIGH"],
            ["SUPPORT COST IF LAUNCHED", "$700K"]
        ],

        options: [

            {
                letter: "A",
                name: "Launch on schedule",
                description:
                    "Ship the product and address problems after customers begin using it.",

                effects: {
                    revenueGrowth: 7,
                    cash: 0.2,
                    profitability: -2,
                    growth: 7,
                    risk: 8,
                    financialPerformance: 4,
                    riskManagement: -4,
                    strategicThinking: 5,
                    capitalAllocation: 5,
                    ethics: -2,

                    growthAppetite: 7,
                    liquidityDiscipline: 2,
                    capitalEfficiency: 5,
                    leverageTolerance: 1,
                    profitabilityFocus: 3,
                    strategicAggression: 8,
                    riskManagementTrait: -5,
                    operationalDecisiveness: 9,
                    longTermOrientation: -3,
                    stakeholderAlignment: -5
                },

                consequence:
                    "You protected the launch date.",

                summary:
                    "Nova captures near-term revenue but exposes customers and the brand to significant reliability risk."
            },

            {
                letter: "B",
                name: "Delay the launch",
                description:
                    "Give engineering four additional months to stabilize the product.",

                effects: {
                    cash: -0.50,
                    revenueGrowth: -4,
                    profitability: -1,
                    growth: -1,
                    risk: -5,
                    financialPerformance: 4,
                    riskManagement: 9,
                    strategicThinking: 8,
                    capitalAllocation: 5,
                    ethics: 5,

                    growthAppetite: -1,
                    liquidityDiscipline: 2,
                    capitalEfficiency: 4,
                    leverageTolerance: 0,
                    profitabilityFocus: 2,
                    strategicAggression: 1,
                    riskManagementTrait: 10,
                    operationalDecisiveness: 8,
                    longTermOrientation: 10,
                    stakeholderAlignment: 9
                },

                consequence:
                    "You prioritized product reliability over the launch date.",

                summary:
                    "Nova sacrifices near-term revenue but protects customer trust and long-term product economics."
            },

            {
                letter: "C",
                name: "Remove risky features",
                description:
                    "Launch on time with a smaller, more stable feature set.",

                effects: {
                    cash: 0.30,
                    revenueGrowth: -2,
                    profitability: 1,
                    growth: 1,
                    risk: -3,
                    financialPerformance: 6,
                    riskManagement: 7,
                    strategicThinking: 9,
                    capitalAllocation: 8,
                    ethics: 4,

                    growthAppetite: 2,
                    liquidityDiscipline: 5,
                    capitalEfficiency: 8,
                    leverageTolerance: 0,
                    profitabilityFocus: 5,
                    strategicAggression: 4,
                    riskManagementTrait: 8,
                    operationalDecisiveness: 10,
                    longTermOrientation: 8,
                    stakeholderAlignment: 7
                },

                consequence:
                    "You reduced scope instead of accepting unacceptable quality risk.",

                summary:
                    "Nova launches on time while sacrificing some differentiation and functionality."
            },

            {
                letter: "D",
                name: "Buy the missing technology",
                description:
                    "Acquire third-party technology that solves the engineering bottleneck.",

                effects: {
                    cash: -1.20,
                    revenueGrowth: 7,
                    growth: 7,
                    risk: 3,
                    profitability: -2,
                    financialPerformance: 5,
                    riskManagement: 3,
                    strategicThinking: 9,
                    capitalAllocation: 6,

                    growthAppetite: 7,
                    liquidityDiscipline: -1,
                    capitalEfficiency: 5,
                    leverageTolerance: 2,
                    profitabilityFocus: 2,
                    strategicAggression: 8,
                    riskManagementTrait: 3,
                    operationalDecisiveness: 10,
                    longTermOrientation: 7,
                    stakeholderAlignment: 6
                },

                consequence:
                    "You bought speed rather than waiting for an internal solution.",

                summary:
                    "Nova keeps the launch date but accepts integration risk and a meaningful acquisition cost."
            }
        ]
    },


    /* =====================================================
       SCENARIO 9
       ===================================================== */

    {
        round: 9,
        category: "DEBT · TREASURY",

        title: "Interest Rates Spike",

        description:
            "Nova has $8M of variable-rate debt. Rates rise sharply.",

        situationTitle:
            "Your debt just became more expensive.",

        situationText:
            "Higher rates are beginning to pressure earnings. You can eliminate some exposure, hedge it, or simply accept the volatility.",

        situationAdvice:
            "The right decision depends on your tolerance for cash consumption versus future uncertainty.",

        information: [
            ["VARIABLE DEBT", "$8M"],
            ["RATE ENVIRONMENT", "RISING"],
            ["POTENTIAL INTEREST INCREASE", "$700K/YEAR"],
            ["CURRENT DEBT", "dynamic"]
        ],

        options: [

            {
                letter: "A",
                name: "Refinance fixed",
                description:
                    "Refinance the variable debt into fixed-rate financing.",

                effects: {
                    cash: -0.20,
                    profitability: -1,
                    risk: -5,
                    financialPerformance: 5,
                    riskManagement: 9,
                    liquidityManagement: 5,
                    strategicThinking: 6,
                    capitalAllocation: 6,

                    growthAppetite: 1,
                    liquidityDiscipline: 5,
                    capitalEfficiency: 6,
                    leverageTolerance: 4,
                    profitabilityFocus: 5,
                    strategicAggression: 1,
                    riskManagementTrait: 9,
                    operationalDecisiveness: 6,
                    longTermOrientation: 7,
                    stakeholderAlignment: 5
                },

                consequence:
                    "You traded some near-term cost for certainty.",

                summary:
                    "Nova reduces interest-rate volatility and extends debt maturity, but refinancing costs and a higher initial rate reduce near-term earnings."
            },

            {
                letter: "B",
                name: "Pay down $5M",
                description:
                    "Use cash to eliminate most of the variable-rate exposure.",

                effects: {
                    cash: -5.0,
                    debt: -5.0,
                    liquidity: -15,
                    profitability: 6,
                    risk: -10,
                    financialPerformance: 7,
                    liquidityManagement: -5,
                    riskManagement: 10,
                    strategicThinking: 6,
                    capitalAllocation: 8,

                    growthAppetite: -2,
                    liquidityDiscipline: 1,
                    capitalEfficiency: 9,
                    leverageTolerance: -8,
                    profitabilityFocus: 8,
                    strategicAggression: 1,
                    riskManagementTrait: 10,
                    operationalDecisiveness: 9,
                    longTermOrientation: 7,
                    stakeholderAlignment: 5
                },

                consequence:
                    "You eliminated most of the interest-rate exposure.",

                summary:
                    "Nova saves substantial future interest expense and materially improves leverage, but gives up a large amount of liquidity."
            },

            {
                letter: "C",
                name: "Keep the debt variable",
                description:
                    "Accept higher interest expense and preserve cash.",

                effects: {
                    profitability: -6,
                    risk: 9,
                    financialPerformance: 2,
                    liquidityManagement: 6,
                    riskManagement: -4,
                    strategicThinking: 4,
                    capitalAllocation: 2,

                    growthAppetite: 2,
                    liquidityDiscipline: 7,
                    capitalEfficiency: 2,
                    leverageTolerance: 10,
                    profitabilityFocus: -3,
                    strategicAggression: 3,
                    riskManagementTrait: -6,
                    operationalDecisiveness: 1,
                    longTermOrientation: 2,
                    stakeholderAlignment: 2
                },

                consequence:
                    "You chose liquidity over rate certainty.",

                summary:
                    "Nova keeps maximum cash flexibility, but earnings become increasingly exposed to future rate movements."
            },

            {
                letter: "D",
                name: "Hedge the exposure",
                description:
                    "Spend $250K to hedge the interest-rate exposure while keeping the debt outstanding.",

                effects: {
                    cash: -0.25,
                    profitability: 0,
                    risk: -7,
                    financialPerformance: 6,
                    liquidityManagement: 6,
                    riskManagement: 10,
                    strategicThinking: 8,
                    capitalAllocation: 8,

                    growthAppetite: 1,
                    liquidityDiscipline: 6,
                    capitalEfficiency: 7,
                    leverageTolerance: 5,
                    profitabilityFocus: 4,
                    strategicAggression: 2,
                    riskManagementTrait: 10,
                    operationalDecisiveness: 5,
                    longTermOrientation: 8,
                    stakeholderAlignment: 4
                },

                consequence:
                    "You paid to transfer interest-rate uncertainty.",

                summary:
                    "Nova preserves liquidity while materially reducing rate volatility, at the cost of additional financial complexity."
            }
        ]
    },


    /* =====================================================
       SCENARIO 10
       ===================================================== */

    {
        round: 10,
        category: "TALENT · COMPENSATION",

        title: "Employees Want More Money",

        description:
            "Your top 20 engineers are receiving competing offers from larger companies.",

        situationTitle:
            "Your most valuable people are being recruited.",

        situationText:
            "Replacing these engineers would be expensive and could slow product development for months.",

        situationAdvice:
            "Cash compensation is not the only retention tool available to you.",

        information: [
            ["ENGINEERS AT RISK", "20"],
            ["ANNUAL CASH COST TO MATCH", "$2.2M"],
            ["REPLACEMENT COST", "HIGH"],
            ["CURRENT CASH", "dynamic"]
        ],

        options: [

            {
                letter: "A",
                name: "Match cash compensation",
                description:
                    "Raise compensation immediately to match competing offers.",

                effects: {
                    cash: -2.2,
                    profitability: -4,
                    liquidity: -5,
                    growth: 5,
                    risk: -2,
                    financialPerformance: 3,
                    liquidityManagement: -2,
                    riskManagement: 5,
                    strategicThinking: 5,
                    capitalAllocation: 4,
                    ethics: 3,

                    growthAppetite: 5,
                    liquidityDiscipline: -2,
                    capitalEfficiency: 2,
                    leverageTolerance: 0,
                    profitabilityFocus: -2,
                    strategicAggression: 4,
                    riskManagementTrait: 5,
                    operationalDecisiveness: 7,
                    longTermOrientation: 7,
                    stakeholderAlignment: 10
                },

                consequence:
                    "You protected the team with guaranteed compensation.",

                summary:
                    "Nova dramatically reduces immediate retention risk, but fixed compensation costs rise permanently."
            },

            {
                letter: "B",
                name: "Offer equity",
                description:
                    "Use equity compensation instead of large cash increases.",

                effects: {
                    cash: 0,
                    profitability: 1,
                    growth: 3,
                    risk: 2,
                    financialPerformance: 6,
                    liquidityManagement: 5,
                    riskManagement: 4,
                    strategicThinking: 8,
                    capitalAllocation: 8,
                    ethics: 3,

                    growthAppetite: 5,
                    liquidityDiscipline: 8,
                    capitalEfficiency: 8,
                    leverageTolerance: 1,
                    profitabilityFocus: 5,
                    strategicAggression: 4,
                    riskManagementTrait: 5,
                    operationalDecisiveness: 5,
                    longTermOrientation: 9,
                    stakeholderAlignment: 10
                },

                consequence:
                    "You aligned employees with shareholder value.",

                summary:
                    "Nova preserves cash and gives employees meaningful upside, but shareholders absorb approximately 3% dilution."
            },

            {
                letter: "C",
                name: "Use performance bonuses",
                description:
                    "Keep base compensation stable and create bonuses tied to measurable outcomes.",

                effects: {
                    cash: -1.0,
                    profitability: -1,
                    growth: 4,
                    risk: 0,
                    financialPerformance: 7,
                    liquidityManagement: 4,
                    riskManagement: 6,
                    strategicThinking: 8,
                    capitalAllocation: 9,
                    ethics: 3,

                    growthAppetite: 5,
                    liquidityDiscipline: 5,
                    capitalEfficiency: 9,
                    leverageTolerance: 0,
                    profitabilityFocus: 7,
                    strategicAggression: 5,
                    riskManagementTrait: 7,
                    operationalDecisiveness: 7,
                    longTermOrientation: 8,
                    stakeholderAlignment: 9
                },

                consequence:
                    "You linked compensation to performance.",

                summary:
                    "Nova increases variable compensation only when results justify it, keeping fixed-cost growth relatively low."
            },

            {
                letter: "D",
                name: "Accept some departures",
                description:
                    "Allow employees who receive better offers to leave and rebuild selectively.",

                effects: {
                    cash: -0.20,
                    profitability: 2,
                    liquidity: 2,
                    growth: -4,
                    risk: 5,
                    financialPerformance: 4,
                    liquidityManagement: 5,
                    riskManagement: 2,
                    strategicThinking: 4,
                    capitalAllocation: 6,

                    growthAppetite: -2,
                    liquidityDiscipline: 6,
                    capitalEfficiency: 7,
                    leverageTolerance: 0,
                    profitabilityFocus: 8,
                    strategicAggression: 2,
                    riskManagementTrait: 1,
                    operationalDecisiveness: 9,
                    longTermOrientation: 1,
                    stakeholderAlignment: -8
                },

                consequence:
                    "You accepted talent attrition rather than raising fixed costs.",

                summary:
                    "Nova protects near-term profitability but loses institutional knowledge and product velocity."
            }
        ]
    },


    /* =====================================================
       SCENARIO 11
       ===================================================== */

    {
        round: 11,
        category: "MARKETING · GROWTH",

        title: "Marketing Wants $4M",

        description:
            "Marketing claims an additional $4M campaign could generate $12M in incremental revenue.",

        situationTitle:
            "The growth forecast looks great on paper.",

        situationText:
            "Marketing has historical evidence that the channels can work, but the proposed campaign is substantially larger than anything Nova has previously attempted.",

        situationAdvice:
            "You need to distinguish confidence from certainty.",

        information: [
            ["PROPOSED SPEND", "$4M"],
            ["PROJECTED REVENUE", "$12M"],
            ["CAC INCREASE", "+20%"],
            ["CURRENT CASH", "dynamic"]
        ],

        options: [

            {
                letter: "A",
                name: "Approve the full campaign",
                description:
                    "Fund the entire $4M campaign immediately.",

                effects: {
                    cash: -4.0,
                    revenueGrowth: 12,
                    growth: 10,
                    profitability: -2,
                    liquidity: -10,
                    risk: 6,
                    financialPerformance: 4,
                    liquidityManagement: -4,
                    riskManagement: 1,
                    strategicThinking: 7,
                    capitalAllocation: 6,

                    growthAppetite: 10,
                    liquidityDiscipline: -5,
                    capitalEfficiency: 5,
                    leverageTolerance: 2,
                    profitabilityFocus: -1,
                    strategicAggression: 9,
                    riskManagementTrait: 1,
                    operationalDecisiveness: 7,
                    longTermOrientation: 8,
                    stakeholderAlignment: 4
                },

                consequence:
                    "You backed the growth thesis at full scale.",

                summary:
                    "Nova gains significant marketing reach, but the company is exposed if the projected customer acquisition does not materialize."
            },

            {
                letter: "B",
                name: "Reject the campaign",
                description:
                    "Preserve the $4M and rely on the existing growth engine.",

                effects: {
                    cash: 0,
                    growth: -2,
                    liquidity: 8,
                    profitability: 3,
                    risk: -3,
                    financialPerformance: 5,
                    liquidityManagement: 8,
                    riskManagement: 6,
                    strategicThinking: 5,
                    capitalAllocation: 8,

                    growthAppetite: -6,
                    liquidityDiscipline: 9,
                    capitalEfficiency: 9,
                    leverageTolerance: -1,
                    profitabilityFocus: 8,
                    strategicAggression: -4,
                    riskManagementTrait: 7,
                    operationalDecisiveness: 6,
                    longTermOrientation: 5,
                    stakeholderAlignment: 3
                },

                consequence:
                    "You refused to fund an unproven scale-up.",

                summary:
                    "Nova preserves cash and protects capital efficiency, but competitors may capture the growth opportunity."
            },

            {
                letter: "C",
                name: "Fund proven channels",
                description:
                    "Approve $2M for channels with the strongest historical performance.",

                effects: {
                    cash: -2.0,
                    revenueGrowth: 7,
                    growth: 7,
                    profitability: 1,
                    liquidity: -4,
                    risk: 1,
                    financialPerformance: 7,
                    liquidityManagement: 4,
                    riskManagement: 7,
                    strategicThinking: 8,
                    capitalAllocation: 10,

                    growthAppetite: 7,
                    liquidityDiscipline: 5,
                    capitalEfficiency: 10,
                    leverageTolerance: 1,
                    profitabilityFocus: 5,
                    strategicAggression: 5,
                    riskManagementTrait: 8,
                    operationalDecisiveness: 7,
                    longTermOrientation: 8,
                    stakeholderAlignment: 4
                },

                consequence:
                    "You scaled what had already worked.",

                summary:
                    "Nova captures much of the expected upside while limiting the amount of capital exposed to unproven channels."
            },

            {
                letter: "D",
                name: "Tie spending to performance",
                description:
                    "Fund the campaign through a performance-based structure with significant variable compensation.",

                effects: {
                    cash: -0.50,
                    revenueGrowth: 5,
                    growth: 6,
                    profitability: 1,
                    liquidity: 0,
                    risk: -1,
                    financialPerformance: 8,
                    liquidityManagement: 5,
                    riskManagement: 7,
                    strategicThinking: 9,
                    capitalAllocation: 9,

                    growthAppetite: 6,
                    liquidityDiscipline: 7,
                    capitalEfficiency: 9,
                    leverageTolerance: 0,
                    profitabilityFocus: 6,
                    strategicAggression: 6,
                    riskManagementTrait: 8,
                    operationalDecisiveness: 7,
                    longTermOrientation: 8,
                    stakeholderAlignment: 7
                },

                consequence:
                    "You made marketing prove its economics.",

                summary:
                    "Nova limits upfront exposure while giving the marketing team strong incentives to deliver measurable results."
            }
        ]
    },


    /* =====================================================
       SCENARIO 12
       ===================================================== */

    {
        round: 12,
        category: "BOARD · PROFITABILITY",

        title: "The Board Wants Profitability",

        description:
            "Nova is growing 28% annually but remains barely profitable. The board wants a clear profitability strategy.",

        situationTitle:
            "Growth is no longer enough.",

        situationText:
            "Investors like Nova's growth rate, but the board is becoming increasingly concerned that growth is not translating into durable cash generation.",

        situationAdvice:
            "You need to decide how much growth you are willing to sacrifice for stronger economics.",

        information: [
            ["CURRENT GROWTH", "28%"],
            ["PROFITABILITY", "LOW"],
            ["BOARD PRIORITY", "PROFITABILITY"],
            ["TARGET", "CLEAR STRATEGY"]
        ],

        options: [

            {
                letter: "A",
                name: "Cut aggressively",
                description:
                    "Reduce costs across the organization to materially improve EBITDA.",

                effects: {
                    cash: 2.0,
                    revenueGrowth: -7,
                    profitability: 8,
                    liquidity: 7,
                    growth: -6,
                    risk: -3,
                    financialPerformance: 8,
                    liquidityManagement: 7,
                    riskManagement: 6,
                    strategicThinking: 4,
                    capitalAllocation: 8,

                    growthAppetite: -7,
                    liquidityDiscipline: 9,
                    capitalEfficiency: 9,
                    leverageTolerance: -2,
                    profitabilityFocus: 10,
                    strategicAggression: 5,
                    riskManagementTrait: 7,
                    operationalDecisiveness: 10,
                    longTermOrientation: 1,
                    stakeholderAlignment: -4
                },

                consequence:
                    "You made profitability the immediate priority.",

                summary:
                    "Nova materially improves its financial profile, but reduced investment and capacity slow future growth."
            },

            {
                letter: "B",
                name: "Maintain spending",
                description:
                    "Keep the current investment pace and prioritize market share.",

                effects: {
                    cash: -1.0,
                    revenueGrowth: 8,
                    profitability: -1,
                    liquidity: -5,
                    growth: 8,
                    risk: 6,
                    financialPerformance: 3,
                    liquidityManagement: -3,
                    riskManagement: 1,
                    strategicThinking: 7,
                    capitalAllocation: 4,

                    growthAppetite: 9,
                    liquidityDiscipline: -4,
                    capitalEfficiency: 2,
                    leverageTolerance: 3,
                    profitabilityFocus: -3,
                    strategicAggression: 9,
                    riskManagementTrait: 0,
                    operationalDecisiveness: 3,
                    longTermOrientation: 9,
                    stakeholderAlignment: 5
                },

                consequence:
                    "You defended the growth trajectory.",

                summary:
                    "Nova continues investing aggressively, betting that scale will eventually produce stronger economics."
            },

            {
                letter: "C",
                name: "Raise prices",
                description:
                    "Increase pricing by 10% while accepting some additional churn.",

                effects: {
                    revenueGrowth: 7,
                    grossMargin: 5,
                    profitability: 6,
                    liquidity: 3,
                    growth: 5,
                    risk: 3,
                    financialPerformance: 8,
                    liquidityManagement: 5,
                    riskManagement: 4,
                    strategicThinking: 7,
                    capitalAllocation: 6,

                    growthAppetite: 5,
                    liquidityDiscipline: 5,
                    capitalEfficiency: 8,
                    leverageTolerance: 0,
                    profitabilityFocus: 10,
                    strategicAggression: 7,
                    riskManagementTrait: 3,
                    operationalDecisiveness: 8,
                    longTermOrientation: 7,
                    stakeholderAlignment: 2
                },

                consequence:
                    "You improved economics through pricing.",

                summary:
                    "Nova materially improves margins and revenue per customer, but some customers respond negatively."
            },

            {
                letter: "D",
                name: "Require 18-month payback",
                description:
                    "Only approve investments with a credible payback period under 18 months.",

                effects: {
                    cash: 1.30,
                    revenueGrowth: 6,
                    profitability: 4,
                    liquidity: 5,
                    growth: 5,
                    risk: -1,
                    financialPerformance: 9,
                    liquidityManagement: 7,
                    riskManagement: 8,
                    strategicThinking: 9,
                    capitalAllocation: 10,

                    growthAppetite: 4,
                    liquidityDiscipline: 8,
                    capitalEfficiency: 10,
                    leverageTolerance: 0,
                    profitabilityFocus: 8,
                    strategicAggression: 3,
                    riskManagementTrait: 8,
                    operationalDecisiveness: 8,
                    longTermOrientation: 8,
                    stakeholderAlignment: 5
                },

                consequence:
                    "You imposed a capital-allocation discipline.",

                summary:
                    "Nova preserves meaningful growth while forcing investments to demonstrate a credible economic return."
            }
        ]
    },


    /* =====================================================
       SCENARIO 13
       ===================================================== */

    {
        round: 13,
        category: "COMPETITION · PRODUCT",

        title: "A Startup Is Eating Your Market",

        description:
            "A startup has launched a product 40% cheaper than Nova's offering.",

        situationTitle:
            "Someone is attacking your weakest segment.",

        situationText:
            "Nova has historically focused on premium customers. The startup is aggressively targeting price-sensitive buyers.",

        situationAdvice:
            "You can fight directly, ignore the segment, create a new tier, or acquire the threat.",

        information: [
            ["COMPETITOR PRICE", "-40%"],
            ["CURRENT MARKET POSITION", "PREMIUM"],
            ["POTENTIAL R&D COST", "$2M"],
            ["ACQUISITION PRICE", "$7M"]
        ],

        options: [

            {
                letter: "A",
                name: "Build a competitor",
                description:
                    "Spend $2M developing a product that directly competes with the startup.",

                effects: {
                    cash: -2.0,
                    growth: 6,
                    revenueGrowth: 5,
                    liquidity: -6,
                    profitability: -2,
                    risk: 4,
                    financialPerformance: 4,
                    liquidityManagement: 1,
                    riskManagement: 2,
                    strategicThinking: 9,
                    capitalAllocation: 6,

                    growthAppetite: 8,
                    liquidityDiscipline: 1,
                    capitalEfficiency: 5,
                    leverageTolerance: 2,
                    profitabilityFocus: 2,
                    strategicAggression: 10,
                    riskManagementTrait: 2,
                    operationalDecisiveness: 7,
                    longTermOrientation: 9,
                    stakeholderAlignment: 4
                },

                consequence:
                    "You chose to fight the startup directly.",

                summary:
                    "Nova defends the market with an internally controlled product, but takes development and execution risk."
            },

            {
                letter: "B",
                name: "Ignore the low end",
                description:
                    "Protect the premium segment rather than chasing lower-margin customers.",

                effects: {
                    revenueGrowth: -3,
                    grossMargin: 2,
                    growth: -4,
                    profitability: 4,
                    liquidity: 4,
                    risk: -2,
                    financialPerformance: 6,
                    liquidityManagement: 6,
                    riskManagement: 6,
                    strategicThinking: 7,
                    capitalAllocation: 8,

                    growthAppetite: -5,
                    liquidityDiscipline: 7,
                    capitalEfficiency: 8,
                    leverageTolerance: -1,
                    profitabilityFocus: 9,
                    strategicAggression: 2,
                    riskManagementTrait: 7,
                    operationalDecisiveness: 6,
                    longTermOrientation: 7,
                    stakeholderAlignment: 5
                },

                consequence:
                    "You refused to chase a lower-margin segment.",

                summary:
                    "Nova protects premium economics but accepts that the low end of the market may belong to competitors."
            },

            {
                letter: "C",
                name: "Create a cheaper tier",
                description:
                    "Launch a lower-priced product tier designed specifically for price-sensitive customers.",

                effects: {
                    revenueGrowth: 8,
                    grossMargin: -5,
                    growth: 9,
                    profitability: -2,
                    liquidity: -3,
                    risk: 3,
                    financialPerformance: 5,
                    liquidityManagement: 3,
                    riskManagement: 3,
                    strategicThinking: 9,
                    capitalAllocation: 7,

                    growthAppetite: 9,
                    liquidityDiscipline: 3,
                    capitalEfficiency: 7,
                    leverageTolerance: 1,
                    profitabilityFocus: 1,
                    strategicAggression: 8,
                    riskManagementTrait: 3,
                    operationalDecisiveness: 8,
                    longTermOrientation: 9,
                    stakeholderAlignment: 7
                },

                consequence:
                    "You expanded Nova's product ladder.",

                summary:
                    "Nova captures additional volume and protects market share, but lower pricing compresses overall margins."
            },

            {
                letter: "D",
                name: "Acquire the startup",
                description:
                    "Spend $7M to acquire the competitor, its technology, and its customer base.",

                effects: {
                    cash: -7.0,
                    revenueGrowth: 10,
                    growth: 12,
                    liquidity: -15,
                    profitability: -3,
                    risk: 12,
                    financialPerformance: 3,
                    liquidityManagement: -7,
                    riskManagement: -5,
                    strategicThinking: 10,
                    capitalAllocation: 5,

                    growthAppetite: 10,
                    liquidityDiscipline: -8,
                    capitalEfficiency: 3,
                    leverageTolerance: 6,
                    profitabilityFocus: -3,
                    strategicAggression: 10,
                    riskManagementTrait: -6,
                    operationalDecisiveness: 10,
                    longTermOrientation: 10,
                    stakeholderAlignment: 5
                },

                consequence:
                    "You bought the threat instead of competing with it.",

                summary:
                    "Nova eliminates a major competitive threat and gains technology, but the transaction puts serious pressure on liquidity."
            }
        ]
    },


    /* =====================================================
       SCENARIO 14
       ===================================================== */

    {
        round: 14,
        category: "INTERNATIONAL · EXPANSION",

        title: "International Expansion",

        description:
            "European demand is growing rapidly, but entering Europe requires significant regulatory and operational investment.",

        situationTitle:
            "The next market is across an ocean.",

        situationText:
            "Nova has limited international experience. The opportunity is large, but building infrastructure abroad could become expensive.",

        situationAdvice:
            "Speed, control, capital efficiency, and risk-sharing all point toward different strategies.",

        information: [
            ["EU MARKET", "$18M"],
            ["SUBSIDIARY CAPEX", "$2.5M"],
            ["REMOTE REVENUE YEAR 2", "$2M"],
            ["PARTNER REVENUE YEAR 2", "$4M"]
        ],

        options: [

            {
                letter: "A",
                name: "Build a European subsidiary",
                description:
                    "Invest $2.5M and establish Nova's own European operation.",

                effects: {
                    cash: -2.5,
                    revenueGrowth: 7,
                    growth: 8,
                    liquidity: -7,
                    profitability: -2,
                    risk: 6,
                    financialPerformance: 4,
                    liquidityManagement: 1,
                    riskManagement: 2,
                    strategicThinking: 10,
                    capitalAllocation: 6,

                    growthAppetite: 9,
                    liquidityDiscipline: 1,
                    capitalEfficiency: 5,
                    leverageTolerance: 2,
                    profitabilityFocus: 1,
                    strategicAggression: 8,
                    riskManagementTrait: 2,
                    operationalDecisiveness: 8,
                    longTermOrientation: 10,
                    stakeholderAlignment: 5
                },

                consequence:
                    "You built a controlled international presence.",

                summary:
                    "Nova gains direct control of the European operation and meaningful long-term revenue potential, but capital requirements rise."
            },

            {
                letter: "B",
                name: "Sell remotely",
                description:
                    "Enter Europe from the United States without building a local operation.",

                effects: {
                    revenueGrowth: 3,
                    growth: 3,
                    profitability: 3,
                    liquidity: 3,
                    risk: -2,
                    financialPerformance: 6,
                    liquidityManagement: 7,
                    riskManagement: 7,
                    strategicThinking: 5,
                    capitalAllocation: 8,

                    growthAppetite: 1,
                    liquidityDiscipline: 8,
                    capitalEfficiency: 9,
                    leverageTolerance: -1,
                    profitabilityFocus: 7,
                    strategicAggression: 1,
                    riskManagementTrait: 8,
                    operationalDecisiveness: 4,
                    longTermOrientation: 5,
                    stakeholderAlignment: 5
                },

                consequence:
                    "You entered the market with minimal fixed investment.",

                summary:
                    "Nova gains exposure to European demand without committing significant capital, but long-term penetration remains limited."
            },

            {
                letter: "C",
                name: "Partner with distributors",
                description:
                    "Invest $400K and use established European distributors.",

                effects: {
                    cash: -0.40,
                    revenueGrowth: 5,
                    growth: 6,
                    liquidity: 1,
                    profitability: 1,
                    risk: -1,
                    financialPerformance: 7,
                    liquidityManagement: 5,
                    riskManagement: 7,
                    strategicThinking: 9,
                    capitalAllocation: 9,

                    growthAppetite: 6,
                    liquidityDiscipline: 7,
                    capitalEfficiency: 9,
                    leverageTolerance: 0,
                    profitabilityFocus: 4,
                    strategicAggression: 5,
                    riskManagementTrait: 8,
                    operationalDecisiveness: 6,
                    longTermOrientation: 8,
                    stakeholderAlignment: 8
                },

                consequence:
                    "You shared the cost and complexity of expansion.",

                summary:
                    "Nova gains meaningful European exposure with relatively low upfront capital, but distributors retain part of the economics and customer relationship."
            },

            {
                letter: "D",
                name: "Acquire a European competitor",
                description:
                    "Spend $5M to acquire an established European competitor.",

                effects: {
                    cash: -5.0,
                    revenueGrowth: 9,
                    growth: 11,
                    liquidity: -12,
                    profitability: -2,
                    risk: 10,
                    financialPerformance: 4,
                    liquidityManagement: -5,
                    riskManagement: -3,
                    strategicThinking: 10,
                    capitalAllocation: 5,

                    growthAppetite: 10,
                    liquidityDiscipline: -6,
                    capitalEfficiency: 4,
                    leverageTolerance: 5,
                    profitabilityFocus: 0,
                    strategicAggression: 10,
                    riskManagementTrait: -3,
                    operationalDecisiveness: 10,
                    longTermOrientation: 10,
                    stakeholderAlignment: 6
                },

                consequence:
                    "You bought your way into Europe.",

                summary:
                    "Nova gains customers, infrastructure, and market knowledge immediately, but integration risk is substantial."
            }
        ]
    },


    /* =====================================================
       SCENARIO 15
       ===================================================== */

    {
        round: 15,
        category: "CYBERSECURITY · RISK",

        title: "A Cybersecurity Incident",

        description:
            "An internal audit discovers vulnerabilities that could expose Nova to a major data breach.",

        situationTitle:
            "The risk has been discovered before the breach.",

        situationText:
            "Nova has an opportunity to reduce its exposure, but every option requires spending money or accepting operational tradeoffs.",

        situationAdvice:
            "The cheapest option is not necessarily the least expensive option.",

        information: [
            ["FULL SECURITY INVESTMENT", "$2M"],
            ["CRITICAL FIXES", "$400K"],
            ["CYBER INSURANCE", "$250K/YEAR"],
            ["BREACH RISK", "MATERIAL"]
        ],

        options: [

            {
                letter: "A",
                name: "Modernize security",
                description:
                    "Spend $2M immediately on security infrastructure and controls.",

                effects: {
                    cash: -2.0,
                    profitability: -3,
                    liquidity: -5,
                    risk: -12,
                    financialPerformance: 4,
                    liquidityManagement: 1,
                    riskManagement: 12,
                    strategicThinking: 7,
                    capitalAllocation: 6,
                    ethics: 8,

                    growthAppetite: 1,
                    liquidityDiscipline: 1,
                    capitalEfficiency: 6,
                    leverageTolerance: 0,
                    profitabilityFocus: 2,
                    strategicAggression: 1,
                    riskManagementTrait: 10,
                    operationalDecisiveness: 9,
                    longTermOrientation: 10,
                    stakeholderAlignment: 9
                },

                consequence:
                    "You invested heavily to reduce the underlying vulnerability.",

                summary:
                    "Nova materially reduces expected breach losses and improves compliance, at the cost of meaningful near-term cash."
            },

            {
                letter: "B",
                name: "Fix critical vulnerabilities",
                description:
                    "Spend $400K on the highest-priority security problems.",

                effects: {
                    cash: -0.40,
                    profitability: -1,
                    liquidity: -1,
                    risk: -5,
                    financialPerformance: 6,
                    liquidityManagement: 4,
                    riskManagement: 9,
                    strategicThinking: 8,
                    capitalAllocation: 8,
                    ethics: 7,

                    growthAppetite: 1,
                    liquidityDiscipline: 5,
                    capitalEfficiency: 9,
                    leverageTolerance: 0,
                    profitabilityFocus: 5,
                    strategicAggression: 2,
                    riskManagementTrait: 9,
                    operationalDecisiveness: 9,
                    longTermOrientation: 8,
                    stakeholderAlignment: 8
                },

                consequence:
                    "You addressed the highest-risk vulnerabilities first.",

                summary:
                    "Nova meaningfully reduces exposure without committing the full cost of a security transformation."
            },

            {
                letter: "C",
                name: "Buy cyber insurance",
                description:
                    "Purchase insurance to transfer much of the financial loss from a potential breach.",

                effects: {
                    cash: -0.25,
                    profitability: -1,
                    risk: 3,
                    financialPerformance: 4,
                    liquidityManagement: 4,
                    riskManagement: 4,
                    strategicThinking: 6,
                    capitalAllocation: 5,
                    ethics: 2,

                    growthAppetite: 1,
                    liquidityDiscipline: 6,
                    capitalEfficiency: 4,
                    leverageTolerance: 0,
                    profitabilityFocus: 4,
                    strategicAggression: 0,
                    riskManagementTrait: 2,
                    operationalDecisiveness: 4,
                    longTermOrientation: 4,
                    stakeholderAlignment: 5
                },

                consequence:
                    "You transferred part of the financial exposure.",

                summary:
                    "Nova limits the financial consequences of a breach, but the underlying security vulnerabilities remain."
            },

            {
                letter: "D",
                name: "Outsource security operations",
                description:
                    "Hire an external cybersecurity provider to manage security operations.",

                effects: {
                    cash: -0.30,
                    profitability: -1,
                    risk: -7,
                    financialPerformance: 6,
                    liquidityManagement: 3,
                    riskManagement: 10,
                    strategicThinking: 8,
                    capitalAllocation: 7,
                    ethics: 6,

                    growthAppetite: 2,
                    liquidityDiscipline: 4,
                    capitalEfficiency: 8,
                    leverageTolerance: 0,
                    profitabilityFocus: 3,
                    strategicAggression: 2,
                    riskManagementTrait: 10,
                    operationalDecisiveness: 7,
                    longTermOrientation: 8,
                    stakeholderAlignment: 8
                },

                consequence:
                    "You brought in specialized external expertise.",

                summary:
                    "Nova reduces operational security risk quickly, although it becomes more dependent on an outside provider."
            }
        ]
    },


    /* =====================================================
       SCENARIO 16
       ===================================================== */

    {
        round: 16,
        category: "CEO · STRATEGY",

        title: "The CEO Wants a Huge Bet",

        description:
            "The CEO proposes moving 35% of Nova's resources into an entirely new market.",

        situationTitle:
            "The company is being asked to reinvent itself.",

        situationText:
            "The new market could become a major source of revenue, but pursuing it aggressively would divert resources from Nova's existing business.",

        situationAdvice:
            "You are not deciding whether the market is exciting. You are deciding how much uncertainty Nova should absorb before it has evidence.",

        information: [
            ["RESOURCES AT RISK", "35%"],
            ["FULL INVESTMENT", "$4M"],
            ["YEAR-4 REVENUE UPSIDE", "$15M"],
            ["EXECUTION RISK", "VERY HIGH"]
        ],

        options: [

            {
                letter: "A",
                name: "Approve the pivot",
                description:
                    "Move 35% of Nova's resources into the new market.",

                effects: {
                    cash: -4.0,
                    revenueGrowth: 3,
                    growth: 10,
                    liquidity: -10,
                    profitability: -4,
                    risk: 12,
                    financialPerformance: 2,
                    liquidityManagement: -5,
                    riskManagement: -5,
                    strategicThinking: 10,
                    capitalAllocation: 3,

                    growthAppetite: 10,
                    liquidityDiscipline: -6,
                    capitalEfficiency: 1,
                    leverageTolerance: 3,
                    profitabilityFocus: -3,
                    strategicAggression: 10,
                    riskManagementTrait: -5,
                    operationalDecisiveness: 10,
                    longTermOrientation: 10,
                    stakeholderAlignment: 3
                },

                consequence:
                    "You committed Nova to the new market.",

                summary:
                    "Nova gains significant strategic upside but risks weakening the core business if the new market fails."
            },

            {
                letter: "B",
                name: "Reject the pivot",
                description:
                    "Keep Nova focused on its existing business.",

                effects: {
                    cash: 0,
                    growth: 1,
                    liquidity: 5,
                    profitability: 2,
                    risk: -4,
                    financialPerformance: 5,
                    liquidityManagement: 7,
                    riskManagement: 8,
                    strategicThinking: 5,
                    capitalAllocation: 8,

                    growthAppetite: -4,
                    liquidityDiscipline: 8,
                    capitalEfficiency: 8,
                    leverageTolerance: -2,
                    profitabilityFocus: 5,
                    strategicAggression: -2,
                    riskManagementTrait: 9,
                    operationalDecisiveness: 7,
                    longTermOrientation: 4,
                    stakeholderAlignment: 6
                },

                consequence:
                    "You protected the core business.",

                summary:
                    "Nova avoids a potentially dangerous strategic distraction, but the company may miss a market that later becomes extremely valuable."
            },

            {
                letter: "C",
                name: "Run a $500K pilot",
                description:
                    "Test the market before committing significant resources.",

                effects: {
                    cash: -0.50,
                    growth: 3,
                    liquidity: -1,
                    profitability: -1,
                    risk: -1,
                    financialPerformance: 7,
                    liquidityManagement: 6,
                    riskManagement: 9,
                    strategicThinking: 10,
                    capitalAllocation: 10,

                    growthAppetite: 5,
                    liquidityDiscipline: 7,
                    capitalEfficiency: 10,
                    leverageTolerance: 0,
                    profitabilityFocus: 4,
                    strategicAggression: 5,
                    riskManagementTrait: 10,
                    operationalDecisiveness: 8,
                    longTermOrientation: 10,
                    stakeholderAlignment: 6
                },

                consequence:
                    "You bought information before buying the market.",

                summary:
                    "Nova preserves optionality while generating real evidence about customer demand, economics, and execution."
            },

            {
                letter: "D",
                name: "License the technology",
                description:
                    "Allow another company to pursue the market using Nova's technology in exchange for licensing revenue.",

                effects: {
                    cash: 0.70,
                    profitability: 3,
                    liquidity: 5,
                    growth: 2,
                    risk: -4,
                    financialPerformance: 7,
                    liquidityManagement: 7,
                    riskManagement: 8,
                    strategicThinking: 8,
                    capitalAllocation: 8,

                    growthAppetite: 2,
                    liquidityDiscipline: 8,
                    capitalEfficiency: 9,
                    leverageTolerance: -1,
                    profitabilityFocus: 7,
                    strategicAggression: 2,
                    riskManagementTrait: 9,
                    operationalDecisiveness: 6,
                    longTermOrientation: 7,
                    stakeholderAlignment: 7
                },

                consequence:
                    "You monetized the opportunity without operating it yourself.",

                summary:
                    "Nova captures some upside with very low execution risk, but gives another company much of the strategic opportunity."
            }
        ]
    },


    /* =====================================================
       SCENARIO 17
       ===================================================== */

    {
        round: 17,
        category: "INVESTORS · CAPITAL RETURN",

        title: "Investors Want Their Money Back",

        description:
            "Nova has become profitable. Early investors want a liquidity event.",

        situationTitle:
            "The company finally has excess capital.",

        situationText:
            "Investors want liquidity, while management believes reinvesting capital could create substantially more long-term value.",

        situationAdvice:
            "Capital allocation is ultimately about opportunity cost.",

        information: [
            ["AVAILABLE DISTRIBUTION", "$2M"],
            ["COMPANY PROFITABILITY", "STRONG"],
            ["GROWTH OPPORTUNITY", "HIGH"],
            ["INVESTOR DEMAND", "LIQUIDITY"]
        ],

        options: [

            {
                letter: "A",
                name: "Pay a dividend",
                description:
                    "Return $2M directly to shareholders.",

                effects: {
                    cash: -2.0,
                    profitability: 0,
                    liquidity: -5,
                    financialPerformance: 6,
                    liquidityManagement: 2,
                    riskManagement: 4,
                    strategicThinking: 5,
                    capitalAllocation: 8,

                    growthAppetite: -2,
                    liquidityDiscipline: 4,
                    capitalEfficiency: 8,
                    leverageTolerance: -1,
                    profitabilityFocus: 7,
                    strategicAggression: -1,
                    riskManagementTrait: 5,
                    operationalDecisiveness: 6,
                    longTermOrientation: 2,
                    stakeholderAlignment: 9
                },

                consequence:
                    "You returned cash directly to shareholders.",

                summary:
                    "Investors receive immediate liquidity, but Nova has less capital available for future growth."
            },

            {
                letter: "B",
                name: "Repurchase shares",
                description:
                    "Use $2M to buy back Nova shares.",

                effects: {
                    cash: -2.0,
                    liquidity: -5,
                    profitability: 3,
                    financialPerformance: 8,
                    liquidityManagement: 2,
                    riskManagement: 5,
                    strategicThinking: 7,
                    capitalAllocation: 10,

                    growthAppetite: 0,
                    liquidityDiscipline: 4,
                    capitalEfficiency: 10,
                    leverageTolerance: 0,
                    profitabilityFocus: 8,
                    strategicAggression: 4,
                    riskManagementTrait: 5,
                    operationalDecisiveness: 7,
                    longTermOrientation: 6,
                    stakeholderAlignment: 9
                },

                consequence:
                    "You returned capital through buybacks.",

                summary:
                    "Nova reduces its share count and potentially increases per-share value while preserving investor participation in future upside."
            },

            {
                letter: "C",
                name: "Reinvest everything",
                description:
                    "Keep the capital inside Nova and increase investment in growth and R&D.",

                effects: {
                    cash: -1.0,
                    revenueGrowth: 8,
                    growth: 9,
                    liquidity: -3,
                    profitability: -1,
                    risk: 4,
                    financialPerformance: 5,
                    liquidityManagement: 2,
                    riskManagement: 3,
                    strategicThinking: 9,
                    capitalAllocation: 8,

                    growthAppetite: 9,
                    liquidityDiscipline: 1,
                    capitalEfficiency: 6,
                    leverageTolerance: 2,
                    profitabilityFocus: 1,
                    strategicAggression: 8,
                    riskManagementTrait: 2,
                    operationalDecisiveness: 5,
                    longTermOrientation: 10,
                    stakeholderAlignment: 2
                },

                consequence:
                    "You kept the capital inside the company.",

                summary:
                    "Nova maximizes reinvestment capacity, betting that future returns will exceed the value investors could receive today."
            },

            {
                letter: "D",
                name: "Facilitate a secondary sale",
                description:
                    "Allow early investors to sell shares to new investors without using company cash.",

                effects: {
                    cash: 0,
                    liquidity: 2,
                    financialPerformance: 6,
                    liquidityManagement: 8,
                    riskManagement: 5,
                    strategicThinking: 8,
                    capitalAllocation: 9,

                    growthAppetite: 3,
                    liquidityDiscipline: 9,
                    capitalEfficiency: 9,
                    leverageTolerance: 0,
                    profitabilityFocus: 5,
                    strategicAggression: 3,
                    riskManagementTrait: 7,
                    operationalDecisiveness: 5,
                    longTermOrientation: 8,
                    stakeholderAlignment: 10
                },

                consequence:
                    "You created investor liquidity without spending company cash.",

                summary:
                    "Nova preserves its growth capital while giving early investors a path to liquidity, although the cap table becomes more complex."
            }
        ]
    },


    /* =====================================================
       SCENARIO 18 — FINAL IDENTITY
       ===================================================== */

    {
        round: 18,
        category: "BOARD · CFO PHILOSOPHY",

        title: "What Kind of CFO Are You?",

        description:
            "Nova has survived four years. The board asks you to choose the financial philosophy that will guide the next phase of the company.",

        situationTitle:
            "The numbers tell one story. Your philosophy tells another.",

        situationText:
            "You have already demonstrated how you behave under pressure. Now the board wants to know what principles will guide your next phase of capital allocation.",

        situationAdvice:
            "There is no universally correct answer. Choose the philosophy that best represents how you would actually run Nova.",

        information: [
            ["COMPANY AGE", "4 YEARS"],
            ["BOARD PRIORITY", "NEXT PHASE"],
            ["GROWTH", "dynamic"],
            ["RISK EXPOSURE", "dynamic"]
        ],

        identityScenario: true,

        options: [

            {
                letter: "A",
                name: "Maximize market share",
                description:
                    "We should maximize market share while the opportunity exists.",

                effects: {
                    growthAppetite: 15,
                    strategicAggression: 15,
                    leverageTolerance: 10,
                    longTermOrientation: 12,
                    liquidityDiscipline: -10,
                    profitabilityFocus: -5,
                    riskManagementTrait: -5,
                    capitalEfficiency: 2,
                    operationalDecisiveness: 7,
                    stakeholderAlignment: 4
                },

                consequence:
                    "Your philosophy is built around expansion.",

                summary:
                    "You believe Nova's greatest advantage is its ability to capture opportunity before competitors do."
            },

            {
                letter: "B",
                name: "Protect the balance sheet",
                description:
                    "Our balance sheet is our competitive advantage.",

                effects: {
                    growthAppetite: -8,
                    strategicAggression: -7,
                    leverageTolerance: -12,
                    longTermOrientation: 8,
                    liquidityDiscipline: 15,
                    profitabilityFocus: 7,
                    riskManagementTrait: 14,
                    capitalEfficiency: 8,
                    operationalDecisiveness: 3,
                    stakeholderAlignment: 6
                },

                consequence:
                    "Your philosophy is built around financial resilience.",

                summary:
                    "You believe Nova's ability to survive uncertainty is itself a competitive advantage."
            },

            {
                letter: "C",
                name: "Make every dollar earn",
                description:
                    "Every dollar should earn its place.",

                effects: {
                    growthAppetite: 5,
                    strategicAggression: 4,
                    leverageTolerance: 2,
                    longTermOrientation: 11,
                    liquidityDiscipline: 8,
                    profitabilityFocus: 8,
                    riskManagementTrait: 9,
                    capitalEfficiency: 15,
                    operationalDecisiveness: 7,
                    stakeholderAlignment: 7
                },

                consequence:
                    "Your philosophy is built around disciplined capital allocation.",

                summary:
                    "You are willing to invest for growth, but only when the expected return justifies the risk and opportunity cost."
            },

            {
                letter: "D",
                name: "Deliver results now",
                description:
                    "The company needs to produce results now.",

                effects: {
                    growthAppetite: -2,
                    strategicAggression: 1,
                    leverageTolerance: -3,
                    longTermOrientation: -8,
                    liquidityDiscipline: 8,
                    profitabilityFocus: 15,
                    riskManagementTrait: 7,
                    capitalEfficiency: 10,
                    operationalDecisiveness: 14,
                    stakeholderAlignment: 3
                },

                consequence:
                    "Your philosophy is built around immediate financial performance.",

                summary:
                    "You believe Nova's next phase should prioritize earnings, cash generation, and operational discipline."
            }
        ]
    }

];


/* =========================================================
   4. CREATE NEW GAME
   ========================================================= */

function createFreshCompany() {

    return JSON.parse(
        JSON.stringify(INITIAL_COMPANY)
    );

}


/* =========================================================
   5. SCREEN NAVIGATION
   ========================================================= */

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");
    const target = document.getElementById(screenId);

    if (!target) {
        console.error("Screen not found:", screenId);
        return;
    }

    screens.forEach(screen => {
        screen.classList.remove("active");
        screen.style.display = "none";
    });

    target.classList.add("active");
    target.style.display = "block";

    // Always begin the active screen at the top
    window.scrollTo(0, 0);
}


/* =========================================================
   6. START / RESTART
   ========================================================= */

function startSimulation() {

    company = createFreshCompany();

    currentScenario = scenarios[0];
    currentEffects = null;

    updateDashboard();

    showScreen("dashboard-screen");

}


function restartSimulation() {

    startSimulation();

}


/* =========================================================
   7. CURRENT SCENARIO
   ========================================================= */

function getCurrentScenario() {

    return scenarios[company.round - 1];

}


/* =========================================================
   8. SHOW SCENARIO
   ========================================================= */

function showScenario() {

    currentScenario = getCurrentScenario();

    if (!currentScenario) {

        generateFinalReport();

        showScreen("results-screen");

        return;

    }

    renderScenario();

    showScreen("scenario-screen");

}


/* =========================================================
   9. RENDER SCENARIO
   ========================================================= */

function renderScenario() {

    const scenario = currentScenario;

    document.getElementById("scenario-round").textContent =
        `ROUND ${String(company.round).padStart(2, "0")} / ${company.totalRounds}`;

    document.getElementById("scenario-category").textContent =
        scenario.category;

    document.getElementById("scenario-title").textContent =
        scenario.title;

    document.getElementById("scenario-description").textContent =
        scenario.description;


    document.getElementById("scenario-information").innerHTML =
        scenario.information.map(item => {

            let value = item[1];

            if (value === "dynamic") {

                if (item[0].includes("CASH")) {
                    value = `$${company.cash.toFixed(1)}M`;
                }

                else if (item[0].includes("DEBT")) {
                    value = `$${company.debt.toFixed(1)}M`;
                }

                else if (item[0].includes("REVENUE")) {
                    value = `$${company.revenue.toFixed(1)}M`;
                }

                else if (item[0].includes("GROWTH")) {
                    value = `${Math.round(company.growth)}`;
                }

                else if (item[0].includes("RISK")) {
                    value = Math.round(company.risk);
                }

            }

            return `
                <div>
                    <span>${item[0]}</span>
                    <strong>${value}</strong>
                </div>
            `;

        }).join("");


    document.getElementById("decision-options").innerHTML =
        scenario.options.map((option, index) => {

            return `
                <button
                    class="decision-card"
                    onclick="makeDecision(${index})"
                >

                    <span class="option-letter">
                        ${option.letter}
                    </span>

                    <div>

                        <strong>
                            ${option.name}
                        </strong>

                        <p>
                            ${option.description}
                        </p>

                    </div>

                </button>
            `;

        }).join("");

}


/* =========================================================
   10. DECISION ENGINE
   ========================================================= */

function makeDecision(optionIndex) {

    if (!currentScenario) {
        return;
    }

    const option =
        currentScenario.options[optionIndex];

    if (!option) {
        return;
    }


    /*
        Scenario 18 is a philosophy choice.
        It should influence hidden traits but
        should NOT directly change company
        financial statements.
    */

    let effects = {
        ...option.effects
    };


    /*
        STATE-DEPENDENT CONSEQUENCES
    */

    /*
        Low liquidity makes negative-cash
        decisions more dangerous.
    */

    if (
        company.liquidity < 30 &&
        (effects.cash || 0) < 0
    ) {

        effects.cash *= 1.20;

        effects.liquidity =
            (effects.liquidity || 0) - 3;

        effects.risk =
            (effects.risk || 0) + 3;

        effects.liquidityDiscipline =
            (effects.liquidityDiscipline || 0) - 2;

    }


    /*
        High liquidity gives Nova more
        capacity to absorb investment.
    */

    if (
        company.liquidity > 75 &&
        (effects.cash || 0) < 0
    ) {

        effects.liquidity =
            (effects.liquidity || 0) + 1;

        effects.risk =
            (effects.risk || 0) - 1;

    }


    /*
        High debt makes additional borrowing
        disproportionately dangerous.
    */

    if (
        company.debt > 3.5 &&
        (effects.debt || 0) > 0
    ) {

        effects.risk =
            (effects.risk || 0) + 5;

        effects.riskManagement =
            (effects.riskManagement || 0) - 3;

        effects.riskManagementTrait =
            (effects.riskManagementTrait || 0) - 3;

    }


    /*
        High profitability gives more
        tolerance for margin investment.
    */

    if (
        company.profitability > 75 &&
        (effects.profitability || 0) < 0
    ) {

        effects.risk =
            (effects.risk || 0) - 1;

    }


    /*
        Low profitability makes additional
        margin pressure more dangerous.
    */

    if (
        company.profitability < 40 &&
        (effects.profitability || 0) < 0
    ) {

        effects.risk =
            (effects.risk || 0) + 3;

    }


    /*
        CRISIS BEHAVIOR

        Rounds 6, 9, and 15 contain major
        stress/risk-management decisions.
    */

    if (
        [6, 9, 15].includes(company.round)
    ) {

        company.crisisRounds++;

        /*
            Decisive crisis choices are tracked
            independently of ordinary aggression.
        */

        if (
            Math.abs(effects.operationalDecisiveness || 0) >= 7 ||
            Math.abs(effects.crisisDecisiveness || 0) >= 7
        ) {

            company.crisisDecisiveness +=
                effects.crisisDecisiveness || 3;

        }

    }


    /*
        Save effects before consequence screen.
    */

    currentEffects = effects;


    /*
        Apply financial + hidden effects.
    */

    applyEffects(effects);


    /*
        Legacy choice tracking.
        This is now ONLY for backwards compatibility
        with any existing UI.
    */

    if (optionIndex === 0) {

        company.aggressiveChoices++;

    }

    else if (optionIndex === 1) {

        company.balancedChoices++;

    }

    else {

        company.conservativeChoices++;

    }


    /*
        Save decision history.
    */

    company.decisions.push({

        round: company.round,

        scenario: currentScenario.title,

        choice: option.name,

        choiceLetter: option.letter,

        effects: {
            ...effects
        }

    });


    /*
        Final identity round goes directly
        to the results screen.
    */

    if (currentScenario.identityScenario) {

        generateFinalReport();

        showScreen("results-screen");

        return;

    }


    showConsequences(
        option.consequence,
        option.summary
    );

}


/* =========================================================
   11. APPLY EFFECTS
   ========================================================= */

function applyEffects(effects) {

    /*
        Financial state
    */

    company.cash +=
        effects.cash || 0;

    company.revenue +=
        company.revenue *
        ((effects.revenueGrowth || 0) / 100);

    company.grossMargin +=
        effects.grossMargin || 0;

    company.debt +=
        effects.debt || 0;

    company.liquidity +=
        effects.liquidity || 0;

    company.profitability +=
        effects.profitability || 0;

    company.growth +=
        effects.growth || 0;

    company.risk +=
        effects.risk || 0;


    /*
        Existing competency scores
    */

    company.financialPerformance +=
        effects.financialPerformance || 0;

    company.liquidityManagement +=
        effects.liquidityManagement || 0;

    company.riskManagement +=
        effects.riskManagement || 0;

    company.strategicThinking +=
        effects.strategicThinking || 0;

    company.capitalAllocation +=
        effects.capitalAllocation || 0;

    company.ethics +=
        effects.ethics || 0;


    /*
        Hidden CFO dimensions
    */

    company.growthAppetite +=
        effects.growthAppetite || 0;

    company.liquidityDiscipline +=
        effects.liquidityDiscipline || 0;

    company.capitalEfficiency +=
        effects.capitalEfficiency || 0;

    company.leverageTolerance +=
        effects.leverageTolerance || 0;

    company.profitabilityFocus +=
        effects.profitabilityFocus || 0;

    company.strategicAggression +=
        effects.strategicAggression || 0;

    company.riskManagementTrait +=
        effects.riskManagementTrait || 0;

    company.operationalDecisiveness +=
        effects.operationalDecisiveness || 0;

    company.longTermOrientation +=
        effects.longTermOrientation || 0;

    company.stakeholderAlignment +=
        effects.stakeholderAlignment || 0;


    /*
        Track capital usage.
    */

    if (
        (effects.cash || 0) < 0
    ) {

        company.totalInvestment +=
            Math.abs(effects.cash);

    }


    if (
        (effects.debt || 0) > 0
    ) {

        company.totalDebtAdded +=
            effects.debt;

    }


    /*
        Prevent impossible values.
    */

    company.cash =
        Math.max(
            0.05,
            company.cash
        );

    company.revenue =
        Math.max(
            0,
            company.revenue
        );

    company.grossMargin =
        clamp(
            company.grossMargin,
            5,
            70
        );

    company.debt =
        Math.max(
            0,
            company.debt
        );


    company.liquidity =
        clamp(company.liquidity);

    company.profitability =
        clamp(company.profitability);

    company.growth =
        clamp(company.growth);

    company.risk =
        clamp(company.risk);


    company.financialPerformance =
        clamp(company.financialPerformance);

    company.liquidityManagement =
        clamp(company.liquidityManagement);

    company.riskManagement =
        clamp(company.riskManagement);

    company.strategicThinking =
        clamp(company.strategicThinking);

    company.capitalAllocation =
        clamp(company.capitalAllocation);

    company.ethics =
        clamp(company.ethics);


    /*
        Hidden dimensions
    */

    company.growthAppetite =
        clamp(company.growthAppetite);

    company.liquidityDiscipline =
        clamp(company.liquidityDiscipline);

    company.capitalEfficiency =
        clamp(company.capitalEfficiency);

    company.leverageTolerance =
        clamp(company.leverageTolerance);

    company.profitabilityFocus =
        clamp(company.profitabilityFocus);

    company.strategicAggression =
        clamp(company.strategicAggression);

    company.riskManagementTrait =
        clamp(company.riskManagementTrait);

    company.operationalDecisiveness =
        clamp(company.operationalDecisiveness);

    company.longTermOrientation =
        clamp(company.longTermOrientation);

    company.stakeholderAlignment =
        clamp(company.stakeholderAlignment);


    /*
        Very low cash creates automatic pressure.
    */

    if (
        company.cash < 0.75
    ) {

        company.liquidity =
            clamp(
                company.liquidity - 8
            );

        company.risk =
            clamp(
                company.risk + 7
            );

        company.profitability =
            clamp(
                company.profitability - 4
            );

    }


    /*
        Excessive debt creates additional risk.
    */

    if (
        company.debt > 4.5
    ) {

        company.risk =
            clamp(
                company.risk + 6
            );

        company.profitability =
            clamp(
                company.profitability - 3
            );

    }


    /*
        Extremely high liquidity slightly
        reduces financial risk.
    */

    if (
        company.liquidity > 85
    ) {

        company.risk =
            clamp(
                company.risk - 2
            );

    }

}


/* =========================================================
   12. CONSEQUENCE SCREEN
   ========================================================= */

function showConsequences(title, summary) {

    document.getElementById(
        "consequence-title"
    ).textContent = title;


    document.getElementById(
        "consequence-summary"
    ).textContent = summary;


    const effects = currentEffects;


    const cashChange =
        effects.cash || 0;

    document.getElementById(
        "cash-impact"
    ).textContent =
        formatMoneyChange(
            cashChange
        );


    const revenueChange =
        effects.revenueGrowth || 0;

    document.getElementById(
        "revenue-impact"
    ).textContent =
        formatPercentChange(
            revenueChange
        );


    const riskChange =
        effects.risk || 0;

    document.getElementById(
        "risk-impact"
    ).textContent =
        formatNumberChange(
            riskChange
        );


    const strategyChange =
        effects.strategicThinking || 0;

    document.getElementById(
        "strategy-impact"
    ).textContent =
        formatNumberChange(
            strategyChange
        );


    showScreen(
        "consequence-screen"
    );

}


/* =========================================================
   13. CONTINUE SIMULATION
   ========================================================= */

function continueSimulation() {

    if (
        company.round <
        company.totalRounds
    ) {

        company.round++;

        currentScenario =
            getCurrentScenario();

        updateDashboard();

        showScreen(
            "dashboard-screen"
        );

    }

    else {

        generateFinalReport();

        showScreen(
            "results-screen"
        );

    }

}


/* =========================================================
   14. UPDATE DASHBOARD
   ========================================================= */

function updateDashboard() {

    document.getElementById(
        "cash-value"
    ).textContent =
        `$${company.cash.toFixed(1)}M`;


    document.getElementById(
        "revenue-value"
    ).textContent =
        `$${company.revenue.toFixed(1)}M`;


    document.getElementById(
        "margin-value"
    ).textContent =
        `${Math.round(company.grossMargin)}%`;


    document.getElementById(
        "debt-value"
    ).textContent =
        `$${company.debt.toFixed(1)}M`;


    updateHealthBar(
        "liquidity-bar",
        company.liquidity
    );

    updateHealthBar(
        "profitability-bar",
        company.profitability
    );

    updateHealthBar(
        "growth-bar",
        company.growth
    );

    updateHealthBar(
        "risk-bar",
        company.risk
    );


    document.getElementById(
        "round-indicator"
    ).textContent =
        `ROUND ${String(company.round).padStart(2, "0")} / ${company.totalRounds}`;


    const quarter =
        ((company.round - 1) % 4) + 1;

    const year =
        Math.ceil(company.round / 4);


    document.getElementById(
        "round-subtitle"
    ).textContent =
        `Year ${year} · Q${quarter}`;


    const scenario =
        getCurrentScenario();


    if (scenario) {

        document.getElementById(
            "situation-title"
        ).textContent =
            scenario.situationTitle;


        document.getElementById(
            "situation-text"
        ).textContent =
            scenario.situationText;


        document.getElementById(
            "situation-advice"
        ).textContent =
            scenario.situationAdvice;


        document.getElementById(
            "next-decision-title"
        ).textContent =
            scenario.title;

    }


    renderRoundProgress();

}


/* =========================================================
   15. HEALTH BAR
   ========================================================= */

function updateHealthBar(id, value) {

    const bar =
        document.getElementById(id);

    if (!bar) {
        return;
    }

    value =
        Math.max(
            0,
            Math.min(
                100,
                value
            )
        );


    bar.style.width =
        `${value}%`;


    const row =
        bar.closest(
            ".health-row"
        );


    if (row) {

        const number =
            row.querySelector(
                "strong"
            );

        if (number) {

            number.textContent =
                Math.round(value);

        }

    }

}


/* =========================================================
   16. ROUND PROGRESS
   ========================================================= */

function renderRoundProgress() {

    const container =
        document.getElementById(
            "round-progress"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";


    for (
        let i = 1;
        i <= company.totalRounds;
        i++
    ) {

        const dot =
            document.createElement(
                "span"
            );


        if (
            i < company.round
        ) {

            dot.classList.add(
                "completed"
            );

        }

        else if (
            i === company.round
        ) {

            dot.classList.add(
                "current"
            );

        }


        container.appendChild(dot);

    }

}


/* =========================================================
   17. FINAL REPORT
   ========================================================= */

function generateFinalReport() {

    document.getElementById(
        "final-cash"
    ).textContent =
        `$${company.cash.toFixed(1)}M`;


    const growth =
        (
            (
                company.revenue -
                company.startingRevenue
            )
            /
            company.startingRevenue
        ) * 100;


    document.getElementById(
        "final-growth"
    ).textContent =
        `${growth >= 0 ? "+" : ""}${Math.round(growth)}%`;


    document.getElementById(
        "final-profitability"
    ).textContent =
        Math.round(
            company.profitability
        );


    let debtStatus =
        "Low";


    if (
        company.debt > 4
    ) {

        debtStatus =
            "High";

    }

    else if (
        company.debt > 2.75
    ) {

        debtStatus =
            "Moderate";

    }


    document.getElementById(
        "final-debt"
    ).textContent =
        debtStatus;


    document.getElementById(
        "score-financial"
    ).textContent =
        Math.round(
            company.financialPerformance
        );


    document.getElementById(
        "score-liquidity"
    ).textContent =
        Math.round(
            company.liquidityManagement
        );


    document.getElementById(
        "score-risk"
    ).textContent =
        Math.round(
            company.riskManagement
        );


    document.getElementById(
        "score-strategy"
    ).textContent =
        Math.round(
            company.strategicThinking
        );


    document.getElementById(
        "score-capital"
    ).textContent =
        Math.round(
            company.capitalAllocation
        );


    document.getElementById(
        "score-ethics"
    ).textContent =
        Math.round(
            company.ethics
        );


    determineCFOProfile();

    generateDevelopmentFeedback();

}


/* =========================================================
   18. CFO PROFILE ENGINE
   ========================================================= */

function determineCFOProfile() {

    const scores = {

        growthArchitect:
            weightedAverage([
                [company.growthAppetite, 1.3],
                [company.strategicAggression, 1.3],
                [company.leverageTolerance, 0.8],
                [company.longTermOrientation, 1.1]
            ]),

        riskAverseFortress:
            weightedAverage([
                [company.liquidityDiscipline, 1.4],
                [company.riskManagementTrait, 1.4],
                [company.capitalEfficiency, 0.7],
                [100 - company.leverageTolerance, 1.0],
                [100 - company.strategicAggression, 0.7]
            ]),

        balancedStrategist:
            weightedAverage([
                [company.capitalEfficiency, 1.3],
                [company.riskManagementTrait, 1.1],
                [company.longTermOrientation, 1.2],
                [company.growthAppetite, 0.6],
                [company.profitabilityFocus, 0.6]
            ]),

        yieldMaximizer:
            weightedAverage([
                [company.profitabilityFocus, 1.4],
                [company.liquidityDiscipline, 1.1],
                [company.operationalDecisiveness, 1.0],
                [company.capitalEfficiency, 0.9],
                [100 - company.longTermOrientation, 0.7]
            ]),

        turnaroundOperative:
            weightedAverage([
                [company.operationalDecisiveness, 1.4],
                [company.riskManagementTrait, 1.0],
                [company.crisisDecisiveness, 1.5],
                [company.liquidityDiscipline, 0.8],
                [company.strategicAggression, 0.8]
            ])

    };


    /*
        Turnaround Operative gets a special
        requirement.

        They must demonstrate decisiveness
        specifically during difficult rounds.

        This prevents someone from becoming
        a Turnaround CFO merely by choosing
        aggressive options all game.
    */

    const crisisPerformance =
        company.crisisRounds > 0
            ? company.crisisDecisiveness /
              company.crisisRounds
            : 0;


    if (
        crisisPerformance >= 65
    ) {

        scores.turnaroundOperative += 8;

    }

    else {

        scores.turnaroundOperative -= 10;

    }


    /*
        Find highest archetype.
    */

    let highestProfile =
        "balancedStrategist";

    let highestScore =
        scores.balancedStrategist;


    Object.keys(scores).forEach(
        key => {

            if (
                scores[key] >
                highestScore
            ) {

                highestScore =
                    scores[key];

                highestProfile =
                    key;

            }

        }
    );


    /*
        Final identity-round adjustment.

        This prevents the entire result from being
        determined by the final answer alone, but
        still allows the player's explicit philosophy
        to matter.
    */

    const finalChoice =
        company.decisions.find(
            decision =>
                decision.round === 18
        );


    if (finalChoice) {

        if (
            finalChoice.choiceLetter === "A"
        ) {

            scores.growthArchitect += 5;

        }

        else if (
            finalChoice.choiceLetter === "B"
        ) {

            scores.riskAverseFortress += 5;

        }

        else if (
            finalChoice.choiceLetter === "C"
        ) {

            scores.balancedStrategist += 5;

        }

        else if (
            finalChoice.choiceLetter === "D"
        ) {

            scores.yieldMaximizer += 5;

        }

    }


    /*
        Recalculate after final identity preference.
    */

    highestProfile =
        Object.keys(scores).reduce(
            (best, key) =>
                scores[key] > scores[best]
                    ? key
                    : best,
            Object.keys(scores)[0]
        );


    const profiles = {

        growthArchitect: {
            name: "THE GROWTH ARCHITECT",
            description:
                "You consistently looked beyond the current quarter. You were willing to sacrifice liquidity and near-term profitability when you believed the strategic opportunity justified the risk."
        },

        riskAverseFortress: {
            name: "THE RISK-AVERSE FORTRESS",
            description:
                "You treated financial resilience as a competitive advantage. You consistently protected liquidity, controlled leverage, and reduced downside exposure."
        },

        balancedStrategist: {
            name: "THE BALANCED STRATEGIST",
            description:
                "You rarely optimized for a single metric. Your decisions consistently weighed growth, risk, capital efficiency, liquidity, and long-term value."
        },

        yieldMaximizer: {
            name: "THE YIELD MAXIMIZER",
            description:
                "You focused heavily on converting Nova's resources into measurable financial results. You were willing to make difficult operational decisions when the economics demanded it."
        },

        turnaroundOperative: {
            name: "THE TURNAROUND OPERATIVE",
            description:
                "Your defining trait was not simply risk-taking. You became decisive when Nova was under pressure, protecting the company when necessary and making difficult moves when hesitation would have been more dangerous."
        }

    };


    const selected =
        profiles[highestProfile];


    document.getElementById(
        "cfo-profile"
    ).textContent =
        selected.name;


    document.getElementById(
        "cfo-description"
    ).textContent =
        selected.description;


    /*
        Store for optional future UI.
    */

    company.finalProfile =
        selected.name;

    company.profileScores =
        scores;

}


/* =========================================================
   19. DEVELOPMENT FEEDBACK
   ========================================================= */

function generateDevelopmentFeedback() {

    const feedback = [];


    /*
        Liquidity
    */

    if (
        company.liquidityManagement < 60
    ) {

        feedback.push(
            "Liquidity management is your clearest development opportunity. Several decisions committed capital before Nova had sufficient financial flexibility."
        );

    }

    else if (
        company.liquidityManagement > 82
    ) {

        feedback.push(
            "Liquidity management was one of your strongest capabilities. You consistently protected Nova's ability to absorb shocks."
        );

    }


    /*
        Capital efficiency
    */

    if (
        company.capitalAllocation >= 82
    ) {

        feedback.push(
            "Your capital allocation was consistently strong. You frequently considered expected return, opportunity cost, and downside exposure rather than simply choosing the cheapest option."
        );

    }


    /*
        Risk
    */

    if (
        company.risk > 65
    ) {

        feedback.push(
            "Nova accumulated meaningful risk exposure. Your decisions frequently prioritized upside, which can create substantial vulnerability if conditions deteriorate."
        );

    }

    else if (
        company.risk < 30
    ) {

        feedback.push(
            "You kept Nova's risk exposure unusually low. Your next development opportunity may be recognizing when calculated risk creates more value than preserving certainty."
        );

    }


    /*
        Profitability
    */

    if (
        company.profitabilityFocus >= 82
    ) {

        feedback.push(
            "You demonstrated a strong profitability orientation, often prioritizing measurable earnings and cash generation."
        );

    }


    /*
        Long-term thinking
    */

    if (
        company.longTermOrientation >= 82
    ) {

        feedback.push(
            "Your decisions showed strong long-term orientation. You were frequently willing to sacrifice short-term results when the strategic payoff justified it."
        );

    }

    else if (
        company.longTermOrientation < 40
    ) {

        feedback.push(
            "Your decisions tended to emphasize immediate results. A useful next step would be testing whether short-term improvements create or destroy long-term enterprise value."
        );

    }


    /*
        Operational decisiveness
    */

    if (
        company.operationalDecisiveness >= 82
    ) {

        feedback.push(
            "You were highly decisive operationally, particularly when Nova faced difficult tradeoffs."
        );

    }


    /*
        Stakeholder alignment
    */

    if (
        company.stakeholderAlignment >= 82
    ) {

        feedback.push(
            "You consistently considered customers, employees, investors, and other stakeholders alongside financial performance."
        );

    }


    /*
        Ethics
    */

    if (
        company.ethics < 55
    ) {

        feedback.push(
            "Governance and ethical judgment deserve attention. Short-term financial performance should not come at the expense of reporting integrity or stakeholder trust."
        );

    }

    else if (
        company.ethics >= 85
    ) {

        feedback.push(
            "You demonstrated strong ethical judgment and treated financial stewardship as broader than simply maximizing reported performance."
        );

    }


    /*
        Fallback
    */

    if (
        feedback.length === 0
    ) {

        feedback.push(
            "Your decision profile was relatively balanced. Your strongest development opportunity is continuing to connect short-term financial decisions with long-term enterprise value."
        );

    }


    document.getElementById(
        "development-text"
    ).textContent =
        feedback.join(" ");

}


/* =========================================================
   20. SUMMARY BUTTONS
   ========================================================= */

function showFinancialSummary() {

    alert(
        `FINANCIAL POSITION\n\n` +
        `Cash: $${company.cash.toFixed(1)}M\n` +
        `Revenue: $${company.revenue.toFixed(1)}M\n` +
        `Gross Margin: ${Math.round(company.grossMargin)}%\n` +
        `Debt: $${company.debt.toFixed(1)}M\n` +
        `Profitability: ${Math.round(company.profitability)}`
    );

}


function showStrategySummary() {

    alert(
        `STRATEGY\n\n` +
        `Growth score: ${Math.round(company.growth)}\n` +
        `Strategic thinking: ${Math.round(company.strategicThinking)}\n` +
        `Capital allocation: ${Math.round(company.capitalAllocation)}\n\n` +
        `Long-term orientation: ${Math.round(company.longTermOrientation)}\n` +
        `Strategic aggression: ${Math.round(company.strategicAggression)}\n` +
        `Operational decisiveness: ${Math.round(company.operationalDecisiveness)}`
    );

}


function showRiskSummary() {

    alert(
        `RISK PROFILE\n\n` +
        `Risk exposure: ${Math.round(company.risk)}\n` +
        `Risk management: ${Math.round(company.riskManagement)}\n` +
        `Liquidity: ${Math.round(company.liquidity)}\n\n` +
        `Higher risk exposure means greater vulnerability.`
    );

}


/* =========================================================
   21. FORMATTING HELPERS
   ========================================================= */

function formatMoneyChange(value) {

    if (
        value === 0
    ) {

        return "$0";

    }


    const absolute =
        Math.abs(value);


    const amount =
        absolute >= 1
            ? `$${absolute.toFixed(1)}M`
            : `$${Math.round(
                absolute * 1000
            )}K`;


    return value > 0
        ? `+${amount}`
        : `-${amount}`;

}


function formatPercentChange(value) {

    if (
        value === 0
    ) {

        return "0%";

    }


    return value > 0
        ? `+${Math.round(value)}%`
        : `${Math.round(value)}%`;

}


function formatNumberChange(value) {

    if (
        value === 0
    ) {

        return "0";

    }


    return value > 0
        ? `+${Math.round(value)}`
        : `${Math.round(value)}`;

}


/* =========================================================
   22. WEIGHTED AVERAGE
   ========================================================= */

function weightedAverage(values) {

    let weightedTotal = 0;
    let totalWeight = 0;


    values.forEach(
        ([value, weight]) => {

            weightedTotal +=
                value * weight;

            totalWeight +=
                weight;

        }
    );


    return weightedTotal /
        totalWeight;

}


/* =========================================================
   23. CLAMP
   ========================================================= */

function clamp(
    value,
    min = 0,
    max = 100
) {

    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );

}


/* =========================================================
   24. INITIALIZATION
   ========================================================= */

function initializeGame() {

    company =
        createFreshCompany();

    updateDashboard();

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeGame();

    }
);


/* =========================================================
   25. GLOBAL FUNCTIONS
   ========================================================= */

window.showScreen =
    showScreen;

window.startSimulation =
    startSimulation;

window.restartSimulation =
    restartSimulation;

window.showScenario =
    showScenario;

window.makeDecision =
    makeDecision;

window.continueSimulation =
    continueSimulation;

window.showFinancialSummary =
    showFinancialSummary;

window.showStrategySummary =
    showStrategySummary;

window.showRiskSummary =
    showRiskSummary;


console.log(
    "FINANCE FORWARD — NOVA 18-ROUND CFO SIMULATION ENGINE LOADED"
);



/* =========================================================
   FINANCE FORWARD — ANALYTICAL UI / DATA LAYER
   Complete replacement enhancement
   ---------------------------------------------------------
   Adds:
   - persistent metric snapshots
   - derived EBITDA / FCF / DSO / runway
   - delayed consequences
   - native SVG charts
   - Financials / Strategy / Risk analytical pages
   - decision history
   - What-If analysis
   - mobile-responsive injected UI
   ========================================================= */

(function () {
    "use strict";

    /* -----------------------------------------------------
       ANALYTICAL STATE
       ----------------------------------------------------- */

    const FF_ANALYTICS = {
        snapshots: [],
        delayed: [],
        initialized: false,
        overviewHTML: null,
        overviewReady: false,
        lastPage: "overview"
    };

    const FF_BASELINE = {
        revenue: 12.4,
        grossMargin: 34,
        debt: 1.8,
        cash: 6.0,
        dso: 42,
        ebitdaMargin: 7.5
    };

    function ffClamp(v, min = 0, max = 100) {
        return Math.max(min, Math.min(max, v));
    }

    function ffNumber(v, fallback = 0) {
        return Number.isFinite(Number(v)) ? Number(v) : fallback;
    }

    function ffDerived() {
        const ebitdaMargin = ffClamp(
            company.profitability * 0.34 +
            company.grossMargin * 0.18 -
            company.risk * 0.035 -
            4,
            -20,
            45
        );

        const ebitda = company.revenue * ebitdaMargin / 100;

        const investmentDrag = Math.max(0, company.totalInvestment * 0.035);
        const debtServiceDrag = company.debt * 0.075;
        const workingCapitalDrag = Math.max(0, (company.dso || 42) - 42) * 0.004 * company.revenue;

        const fcf = ebitda - investmentDrag - debtServiceDrag - workingCapitalDrag;

        const monthlyBurn = Math.max(
            0.05,
            Math.abs(Math.min(0, fcf)) / 12
        );

        const runway = fcf >= 0
            ? Math.max(12, company.cash / 0.12)
            : company.cash / monthlyBurn;

        const leverageRisk = ffClamp(
            company.debt / Math.max(company.revenue, 1) * 100 * 1.7 +
            (company.debt > 4 ? 12 : 0)
        );

        const liquidityRisk = ffClamp(
            100 - company.liquidity
        );

        const operationalRisk = ffClamp(
            25 +
            Math.max(0, 55 - company.profitability) * 0.35 +
            Math.max(0, 50 - company.capitalEfficiency) * 0.2
        );

        const executionRisk = ffClamp(
            25 +
            company.strategicAggression * 0.25 +
            company.growthAppetite * 0.12 -
            company.operationalDecisiveness * 0.12
        );

        const cyberRisk = ffClamp(
            company.decisions.reduce((total, d) => {
                if ((d.scenario || "").toLowerCase().includes("cyber")) {
                    return total + (d.choiceLetter === "A" ? -18 : d.choiceLetter === "B" ? -8 : 2);
                }
                return total;
            }, 38)
        );

        return {
            ebitdaMargin,
            ebitda,
            fcf,
            runway,
            leverageRisk,
            liquidityRisk,
            operationalRisk,
            executionRisk,
            cyberRisk
        };
    }

    function ffSnapshot(label = "") {
        const d = ffDerived();

        return {
            round: Math.max(0, company.round - (label === "post-decision" ? 0 : 1)),
            label,
            cash: ffNumber(company.cash),
            revenue: ffNumber(company.revenue),
            grossMargin: ffNumber(company.grossMargin),
            debt: ffNumber(company.debt),
            liquidity: ffNumber(company.liquidity),
            profitability: ffNumber(company.profitability),
            growth: ffNumber(company.growth),
            risk: ffNumber(company.risk),
            dso: ffNumber(company.dso, 42),
            ebitdaMargin: d.ebitdaMargin,
            ebitda: d.ebitda,
            fcf: d.fcf,
            runway: d.runway,
            strategicPosition: ffNumber(company.strategicPosition, 50),
            longTermValue: ffNumber(company.longTermValue, 50),
            capitalEfficiency: ffNumber(company.capitalEfficiency),
            growthAppetite: ffNumber(company.growthAppetite),
            strategicAggression: ffNumber(company.strategicAggression),
            longTermOrientation: ffNumber(company.longTermOrientation),
            riskManagementTrait: ffNumber(company.riskManagementTrait)
        };
    }

    function ffEnsureState() {
        if (company.dso == null) company.dso = 42;
        if (company.strategicPosition == null) company.strategicPosition = 50;
        if (company.longTermValue == null) company.longTermValue = 50;
        if (company.totalFCF == null) company.totalFCF = 0;

        if (!Array.isArray(company.decisions)) company.decisions = [];
        if (!FF_ANALYTICS.snapshots.length) {
            FF_ANALYTICS.snapshots.push({
                ...ffSnapshot("opening"),
                round: 0,
                revenue: FF_BASELINE.revenue,
                grossMargin: FF_BASELINE.grossMargin,
                debt: FF_BASELINE.debt,
                cash: FF_BASELINE.cash,
                dso: FF_BASELINE.dso
            });
        }
    }

    function ffApplyDelayed(round) {
        if (!FF_ANALYTICS.delayed.length) return;

        const due = FF_ANALYTICS.delayed.filter(x => x.dueRound <= round);
        FF_ANALYTICS.delayed = FF_ANALYTICS.delayed.filter(x => x.dueRound > round);

        due.forEach(item => {
            if (!item.effects) return;
            applyEffects(item.effects);
        });
    }

    function ffScheduleConsequences(scenario, option) {
        const r = scenario.round;
        const letter = option.letter;

        /* These are deliberately modest secondary effects.
           The primary scenario mechanics remain intact. */

        const delayed = [];

        if (r === 1) {
            if (letter === "A") delayed.push({
                dueRound: r + 4,
                effects: { growth: 5, profitability: 2, risk: -2, strategicThinking: 2 }
            });
            if (letter === "B") delayed.push({
                dueRound: r + 4,
                effects: { growth: -4, profitability: 1, risk: 3, strategicThinking: -2 }
            });
            if (letter === "C") delayed.push({
                dueRound: r + 3,
                effects: { growth: 3, profitability: 1, risk: -2, capitalAllocation: 2 }
            });
            if (letter === "D") delayed.push({
                dueRound: r + 4,
                effects: { growth: 4, profitability: 2, risk: 1, strategicThinking: 2 }
            });
        }

        if (r === 7) {
            if (letter === "A") delayed.push({
                dueRound: r + 3,
                effects: { profitability: -1, risk: 3, strategicThinking: 3 }
            });
            if (letter === "B") delayed.push({
                dueRound: r + 3,
                effects: { profitability: -2, risk: 5, liquidity: -3 }
            });
            if (letter === "C") delayed.push({
                dueRound: r + 3,
                effects: { profitability: 2, risk: -2, liquidity: 2 }
            });
        }

        if (r === 8) {
            if (letter === "A") delayed.push({
                dueRound: r + 2,
                effects: { profitability: -2, risk: 5, growth: 2 }
            });
            if (letter === "B") delayed.push({
                dueRound: r + 2,
                effects: { profitability: 2, risk: -4, growth: 3 }
            });
            if (letter === "C") delayed.push({
                dueRound: r + 2,
                effects: { growth: -2, risk: -2, profitability: 1 }
            });
            if (letter === "D") delayed.push({
                dueRound: r + 2,
                effects: { growth: 4, risk: 3, profitability: 1 }
            });
        }

        if (r === 14) {
            if (letter === "A") delayed.push({
                dueRound: r + 3,
                effects: { growth: 5, profitability: 2, risk: 1 }
            });
            if (letter === "B") delayed.push({
                dueRound: r + 3,
                effects: { growth: 2, profitability: 2, risk: -1 }
            });
            if (letter === "C") delayed.push({
                dueRound: r + 3,
                effects: { growth: 4, profitability: 1, risk: 1 }
            });
            if (letter === "D") delayed.push({
                dueRound: r + 3,
                effects: { growth: 6, profitability: 2, risk: 5 }
            });
        }

        delayed.forEach(x => FF_ANALYTICS.delayed.push(x));
    }

    function ffUpdateDerivedFromDecision(scenario, option) {
        const r = scenario.round;
        const letter = option.letter;

        /* DSO is a persistent operating metric. */
        if (r === 4) {
            if (letter === "A") company.dso = 35;
            if (letter === "B") company.dso = 52;
            if (letter === "C") company.dso = 78;
            if (letter === "D") company.dso = 31;
        } else if (r !== 18) {
            /* Slow drift when working capital is not actively fixed. */
            if (company.dso > 45 && r % 4 === 0) company.dso += 2;
        }

        /* Strategic position compounds rather than resetting. */
        const strategicDelta =
            ffNumber(option.effects && option.effects.strategicThinking) * 0.55 +
            ffNumber(option.effects && option.effects.growth) * 0.25 -
            ffNumber(option.effects && option.effects.risk) * 0.10;

        company.strategicPosition = ffClamp(
            ffNumber(company.strategicPosition, 50) + strategicDelta
        );

        const valueDelta =
            ffNumber(option.effects && option.effects.longTermOrientation) * 0.4 +
            ffNumber(option.effects && option.effects.capitalEfficiency) * 0.25 +
            ffNumber(option.effects && option.effects.growth) * 0.15 -
            Math.max(0, ffNumber(option.effects && option.effects.risk)) * 0.10;

        company.longTermValue = ffClamp(
            ffNumber(company.longTermValue, 50) + valueDelta
        );
    }

    /* -----------------------------------------------------
       NATIVE SVG CHARTS
       ----------------------------------------------------- */

    function ffEsc(s) {
        return String(s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function ffChart(values, labels, opts = {}) {
        const width = opts.width || 720;
        const height = opts.height || 280;
        const pad = { top: 22, right: 18, bottom: 38, left: 48 };

        if (!values.length) return "";

        const nums = values.map(v => ffNumber(v));
        let min = Math.min(...nums);
        let max = Math.max(...nums);

        if (opts.zeroBaseline) min = Math.min(0, min);
        if (min === max) {
            min -= 1;
            max += 1;
        }

        const range = max - min;
        min -= range * 0.08;
        max += range * 0.08;

        const innerW = width - pad.left - pad.right;
        const innerH = height - pad.top - pad.bottom;

        const x = i =>
            pad.left + (values.length === 1 ? innerW / 2 : i * innerW / (values.length - 1));

        const y = v =>
            pad.top + (max - v) * innerH / (max - min);

        const points = nums.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

        let grid = "";
        for (let i = 0; i <= 4; i++) {
            const val = min + (max - min) * i / 4;
            const yy = y(val);
            grid += `
                <line x1="${pad.left}" y1="${yy}" x2="${width - pad.right}" y2="${yy}" class="ff-grid"/>
                <text x="${pad.left - 9}" y="${yy + 4}" text-anchor="end" class="ff-axis">${ffEsc(val.toFixed(opts.decimals ?? 0))}</text>
            `;
        }

        let dots = "";
        nums.forEach((v, i) => {
            dots += `
                <circle cx="${x(i)}" cy="${y(v)}" r="3.5" class="ff-dot"/>
                <title>Round ${labels[i] || i}: ${ffEsc(v.toFixed(opts.decimals ?? 1))}</title>
            `;
        });

        const every = Math.max(1, Math.ceil(labels.length / 6));
        let xlabels = "";
        labels.forEach((label, i) => {
            if (i === 0 || i === labels.length - 1 || i % every === 0) {
                xlabels += `<text x="${x(i)}" y="${height - 13}" text-anchor="middle" class="ff-axis">${ffEsc(label)}</text>`;
            }
        });

        return `
            <svg class="ff-chart" viewBox="0 0 ${width} ${height}" role="img">
                <rect x="0" y="0" width="${width}" height="${height}" class="ff-chart-bg"/>
                ${grid}
                <polyline points="${points}" class="ff-line"/>
                ${dots}
                ${xlabels}
            </svg>
        `;
    }

    function ffBar(label, value, suffix = "") {
        const v = ffClamp(value);
        return `
            <div class="ff-bar-row">
                <div class="ff-bar-label"><span>${ffEsc(label)}</span><strong>${Math.round(v)}${suffix}</strong></div>
                <div class="ff-bar-track"><div class="ff-bar-fill" style="width:${v}%"></div></div>
            </div>
        `;
    }

    function ffCard(label, value, note = "") {
        return `
            <div class="ff-stat">
                <span>${ffEsc(label)}</span>
                <strong>${ffEsc(value)}</strong>
                ${note ? `<small>${ffEsc(note)}</small>` : ""}
            </div>
        `;
    }

    function ffInjectStyles() {
        if (document.getElementById("ff-analytics-styles")) return;

        const style = document.createElement("style");
        style.id = "ff-analytics-styles";
        style.textContent = `
            .ff-page { max-width: 1240px; margin: 0 auto; padding: 34px 28px 60px; }
            .ff-page-head { display:flex; justify-content:space-between; gap:24px; align-items:flex-end; margin-bottom:26px; }
            .ff-page-head h2 { margin:4px 0 6px; font-size:clamp(28px,4vw,42px); }
            .ff-page-head p { margin:0; opacity:.7; max-width:700px; line-height:1.55; }
            .ff-back { border:1px solid currentColor; background:transparent; padding:10px 15px; border-radius:8px; cursor:pointer; }
            .ff-grid-4 { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:18px; }
            .ff-grid-2 { display:grid; grid-template-columns:repeat(2,1fr); gap:18px; margin-bottom:18px; }
            .ff-panel { border:1px solid rgba(127,127,127,.22); border-radius:14px; padding:20px; background:rgba(127,127,127,.035); }
            .ff-panel h3 { margin:0 0 4px; font-size:18px; }
            .ff-panel > p { margin:0 0 15px; opacity:.65; line-height:1.5; }
            .ff-stat { border:1px solid rgba(127,127,127,.2); border-radius:12px; padding:17px; background:rgba(127,127,127,.035); }
            .ff-stat span { display:block; font-size:11px; letter-spacing:.11em; opacity:.62; margin-bottom:7px; }
            .ff-stat strong { font-size:25px; display:block; }
            .ff-stat small { display:block; margin-top:5px; opacity:.58; }
            .ff-chart { width:100%; height:auto; display:block; overflow:visible; }
            .ff-chart-bg { fill:transparent; }
            .ff-grid { stroke:currentColor; stroke-opacity:.10; stroke-width:1; }
            .ff-axis { fill:currentColor; opacity:.5; font-size:10px; }
            .ff-line { fill:none; stroke:currentColor; stroke-width:2.5; stroke-linecap:round; stroke-linejoin:round; }
            .ff-dot { fill:currentColor; }
            .ff-bar-row { margin:14px 0; }
            .ff-bar-label { display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px; }
            .ff-bar-track { height:8px; background:rgba(127,127,127,.16); border-radius:999px; overflow:hidden; }
            .ff-bar-fill { height:100%; background:currentColor; border-radius:999px; }
            .ff-table { width:100%; border-collapse:collapse; font-size:13px; }
            .ff-table th,.ff-table td { text-align:left; padding:11px 8px; border-bottom:1px solid rgba(127,127,127,.14); }
            .ff-table th { opacity:.58; font-size:10px; letter-spacing:.1em; text-transform:uppercase; }
            .ff-positive { font-weight:700; }
            .ff-negative { font-weight:700; }
            .ff-callout { border-left:3px solid currentColor; padding:12px 15px; background:rgba(127,127,127,.06); line-height:1.55; }
            .ff-chip { display:inline-block; padding:5px 8px; border:1px solid rgba(127,127,127,.2); border-radius:999px; font-size:10px; letter-spacing:.08em; margin:3px; }
            @media (max-width:800px) {
                .ff-grid-4 { grid-template-columns:repeat(2,1fr); }
                .ff-grid-2 { grid-template-columns:1fr; }
                .ff-page { padding:22px 15px 45px; }
                .ff-page-head { align-items:flex-start; flex-direction:column; }
            }
            @media (max-width:480px) {
                .ff-grid-4 { grid-template-columns:1fr; }
                .ff-panel { padding:15px; }
            }
        `;
        document.head.appendChild(style);
    }

    /* -----------------------------------------------------
       PAGE RENDERERS
       ----------------------------------------------------- */

    function ffHistory() {
        return company.decisions.map(d => {
            const snap = FF_ANALYTICS.snapshots.find(s => s.round === d.round);
            return {
                ...d,
                snapshot: snap
            };
        });
    }

    function ffRoundLabels() {
        return FF_ANALYTICS.snapshots.map(s => s.round === 0 ? "Start" : `R${s.round}`);
    }

    function showFinancialsPage() {
        ffEnsureState();
        ffInjectStyles();
        FF_ANALYTICS.lastPage = "financials";

        const s = FF_ANALYTICS.snapshots;
        const d = ffDerived();

        document.getElementById("dashboard-screen").innerHTML = `
            <header class="game-header">
                <div class="company-identity">
                    <div class="company-mark">N</div>
                    <div><strong>NOVA</strong><span>Chief Financial Officer</span></div>
                </div>
                <nav class="game-navigation">
                    <button class="nav-item" onclick="showDashboardOverview()">Overview</button>
                    <button class="nav-item active" onclick="showFinancialSummary()">Financials</button>
                    <button class="nav-item" onclick="showStrategySummary()">Strategy</button>
                    <button class="nav-item" onclick="showRiskSummary()">Risk</button>
                </nav>
                <div class="round-indicator">
                    <strong>ROUND ${String(company.round).padStart(2,"0")} / ${company.totalRounds}</strong>
                    <span>Financial analysis</span>
                </div>
            </header>
            <main class="ff-page">
                <div class="ff-page-head">
                    <div>
                        <span class="section-label">FINANCIALS</span>
                        <h2>The numbers behind your decisions.</h2>
                        <p>Every point below is recalculated from Nova's persistent state. Trends update after each decision.</p>
                    </div>
                    <button class="ff-back" onclick="showDashboardOverview()">← Overview</button>
                </div>

                <section class="ff-grid-4">
                    ${ffCard("Revenue", `$${company.revenue.toFixed(1)}M`, "current")}
                    ${ffCard("Gross Margin", `${Math.round(company.grossMargin)}%`, "current")}
                    ${ffCard("EBITDA", `${d.ebitdaMargin.toFixed(1)}%`, `$${d.ebitda.toFixed(2)}M estimated`)}
                    ${ffCard("Free Cash Flow", `${d.fcf >= 0 ? "+" : ""}$${d.fcf.toFixed(2)}M`, "estimated current period")}
                </section>

                <section class="ff-grid-2">
                    <div class="ff-panel">
                        <h3>Revenue trajectory</h3>
                        <p>Annualized revenue across decisions.</p>
                        ${ffChart(s.map(x=>x.revenue), ffRoundLabels(), {decimals:1})}
                    </div>
                    <div class="ff-panel">
                        <h3>Profitability & gross margin</h3>
                        <p>Profitability score and gross margin trend.</p>
                        ${ffChart(s.map(x=>x.grossMargin), ffRoundLabels(), {decimals:0})}
                        ${ffChart(s.map(x=>x.ebitdaMargin), ffRoundLabels(), {decimals:1})}
                    </div>
                </section>

                <section class="ff-grid-2">
                    <div class="ff-panel">
                        <h3>Cash vs. debt</h3>
                        <p>Balance-sheet flexibility over the simulation.</p>
                        ${ffChart(s.map(x=>x.cash), ffRoundLabels(), {decimals:1})}
                        ${ffChart(s.map(x=>x.debt), ffRoundLabels(), {decimals:1})}
                    </div>
                    <div class="ff-panel">
                        <h3>Liquidity & runway</h3>
                        <p>Liquidity score and estimated months of runway.</p>
                        ${ffChart(s.map(x=>x.liquidity), ffRoundLabels(), {decimals:0})}
                        ${ffChart(s.map(x=>x.runway), ffRoundLabels(), {decimals:1})}
                    </div>
                </section>

                <section class="ff-grid-2">
                    <div class="ff-panel">
                        <h3>Free cash flow</h3>
                        <p>Estimated FCF after investment, debt service and working-capital drag.</p>
                        ${ffChart(s.map(x=>x.fcf), ffRoundLabels(), {decimals:2, zeroBaseline:true})}
                    </div>
                    <div class="ff-panel">
                        <h3>Days sales outstanding</h3>
                        <p>Working-capital efficiency. Lower is generally better.</p>
                        ${ffChart(s.map(x=>x.dso), ffRoundLabels(), {decimals:0})}
                    </div>
                </section>

                <section class="ff-panel">
                    <h3>Decision ledger</h3>
                    <p>What you actually did and what the company looked like afterward.</p>
                    <table class="ff-table">
                        <thead><tr><th>Round</th><th>Decision</th><th>Cash</th><th>Revenue</th><th>Margin</th><th>Debt</th><th>FCF</th></tr></thead>
                        <tbody>
                            ${ffHistory().map(h => {
                                const x = h.snapshot;
                                return `<tr>
                                    <td>R${h.round}</td>
                                    <td><strong>${ffEsc(h.choice)}</strong></td>
                                    <td>$${x ? x.cash.toFixed(1) : "—"}M</td>
                                    <td>$${x ? x.revenue.toFixed(1) : "—"}M</td>
                                    <td>${x ? Math.round(x.grossMargin) : "—"}%</td>
                                    <td>$${x ? x.debt.toFixed(1) : "—"}M</td>
                                    <td>${x ? (x.fcf >= 0 ? "+" : "") + x.fcf.toFixed(2) : "—"}M</td>
                                </tr>`;
                            }).join("")}
                        </tbody>
                    </table>
                </section>
            </main>
        `;
    }

    function showStrategyPage() {
        ffEnsureState();
        ffInjectStyles();
        FF_ANALYTICS.lastPage = "strategy";
        const s = FF_ANALYTICS.snapshots;

        document.getElementById("dashboard-screen").innerHTML = `
            <header class="game-header">
                <div class="company-identity">
                    <div class="company-mark">N</div>
                    <div><strong>NOVA</strong><span>Chief Financial Officer</span></div>
                </div>
                <nav class="game-navigation">
                    <button class="nav-item" onclick="showDashboardOverview()">Overview</button>
                    <button class="nav-item" onclick="showFinancialSummary()">Financials</button>
                    <button class="nav-item active" onclick="showStrategySummary()">Strategy</button>
                    <button class="nav-item" onclick="showRiskSummary()">Risk</button>
                </nav>
                <div class="round-indicator">
                    <strong>ROUND ${String(company.round).padStart(2,"0")} / ${company.totalRounds}</strong>
                    <span>Strategic analysis</span>
                </div>
            </header>
            <main class="ff-page">
                <div class="ff-page-head">
                    <div>
                        <span class="section-label">STRATEGY</span>
                        <h2>Where are you taking Nova?</h2>
                        <p>Strategy is measured as a trajectory, not a single final score.</p>
                    </div>
                    <button class="ff-back" onclick="showDashboardOverview()">← Overview</button>
                </div>

                <section class="ff-grid-4">
                    ${ffCard("Growth trajectory", `${Math.round(company.growth)}`, "growth score")}
                    ${ffCard("Strategic position", `${Math.round(company.strategicPosition)}`, "cumulative")}
                    ${ffCard("Long-term value", `${Math.round(company.longTermValue)}`, "cumulative")}
                    ${ffCard("Capital efficiency", `${Math.round(company.capitalEfficiency)}`, "behavioral")}
                </section>

                <section class="ff-grid-2">
                    <div class="ff-panel">
                        <h3>Growth trajectory</h3>
                        <p>How aggressively Nova's growth position changed.</p>
                        ${ffChart(s.map(x=>x.growth), ffRoundLabels(), {decimals:0})}
                    </div>
                    <div class="ff-panel">
                        <h3>Strategic position</h3>
                        <p>Compounded effect of strategic choices.</p>
                        ${ffChart(s.map(x=>x.strategicPosition), ffRoundLabels(), {decimals:0})}
                    </div>
                </section>

                <section class="ff-grid-2">
                    <div class="ff-panel">
                        <h3>Long-term value</h3>
                        <p>Balance of long-term orientation, capital efficiency and sustainable growth.</p>
                        ${ffChart(s.map(x=>x.longTermValue), ffRoundLabels(), {decimals:0})}
                    </div>
                    <div class="ff-panel">
                        <h3>Capital allocation behavior</h3>
                        ${ffBar("Capital efficiency", company.capitalEfficiency)}
                        ${ffBar("Growth appetite", company.growthAppetite)}
                        ${ffBar("Strategic aggression", company.strategicAggression)}
                        ${ffBar("Long-term orientation", company.longTermOrientation)}
                    </div>
                </section>

                <section class="ff-panel">
                    <h3>Decision history</h3>
                    <p>Your strategic pattern by round.</p>
                    <table class="ff-table">
                        <thead><tr><th>Round</th><th>Situation</th><th>Choice</th><th>Strategic effect</th></tr></thead>
                        <tbody>
                            ${company.decisions.map(d => `<tr>
                                <td>R${d.round}</td>
                                <td>${ffEsc(d.scenario)}</td>
                                <td><strong>${ffEsc(d.choiceLetter)} · ${ffEsc(d.choice)}</strong></td>
                                <td>${d.effects && d.effects.strategicThinking > 0 ? "+" : ""}${Math.round(d.effects?.strategicThinking || 0)}</td>
                            </tr>`).join("")}
                        </tbody>
                    </table>
                </section>
            </main>
        `;
    }

    function showRiskPage() {
        ffEnsureState();
        ffInjectStyles();
        FF_ANALYTICS.lastPage = "risk";
        const s = FF_ANALYTICS.snapshots;
        const d = ffDerived();

        const overallRisk = ffClamp(
            company.risk * .42 +
            d.leverageRisk * .14 +
            d.liquidityRisk * .18 +
            d.operationalRisk * .10 +
            d.executionRisk * .10 +
            d.cyberRisk * .06
        );

        document.getElementById("dashboard-screen").innerHTML = `
            <header class="game-header">
                <div class="company-identity">
                    <div class="company-mark">N</div>
                    <div><strong>NOVA</strong><span>Chief Financial Officer</span></div>
                </div>
                <nav class="game-navigation">
                    <button class="nav-item" onclick="showDashboardOverview()">Overview</button>
                    <button class="nav-item" onclick="showFinancialSummary()">Financials</button>
                    <button class="nav-item" onclick="showStrategySummary()">Strategy</button>
                    <button class="nav-item active" onclick="showRiskSummary()">Risk</button>
                </nav>
                <div class="round-indicator">
                    <strong>ROUND ${String(company.round).padStart(2,"0")} / ${company.totalRounds}</strong>
                    <span>Risk analysis</span>
                </div>
            </header>
            <main class="ff-page">
                <div class="ff-page-head">
                    <div>
                        <span class="section-label">RISK</span>
                        <h2>What can break the company?</h2>
                        <p>Exposure and risk-management capability are tracked separately.</p>
                    </div>
                    <button class="ff-back" onclick="showDashboardOverview()">← Overview</button>
                </div>

                <section class="ff-grid-4">
                    ${ffCard("Overall risk", `${Math.round(overallRisk)}`, "exposure")}
                    ${ffCard("Liquidity risk", `${Math.round(d.liquidityRisk)}`, "higher = worse")}
                    ${ffCard("Leverage risk", `${Math.round(d.leverageRisk)}`, "higher = worse")}
                    ${ffCard("Risk management", `${Math.round(company.riskManagement)}`, "capability")}
                </section>

                <section class="ff-grid-2">
                    <div class="ff-panel">
                        <h3>Overall risk exposure</h3>
                        <p>Persistent exposure across the simulation.</p>
                        ${ffChart(s.map(x=>x.risk), ffRoundLabels(), {decimals:0})}
                    </div>
                    <div class="ff-panel">
                        <h3>Risk-management profile</h3>
                        ${ffBar("Risk management capability", company.riskManagement)}
                        ${ffBar("Risk-management trait", company.riskManagementTrait)}
                        ${ffBar("Liquidity discipline", company.liquidityDiscipline)}
                        ${ffBar("Operational decisiveness", company.operationalDecisiveness)}
                    </div>
                </section>

                <section class="ff-grid-2">
                    <div class="ff-panel">
                        <h3>Liquidity risk</h3>
                        <p>Low liquidity creates vulnerability even when accounting performance looks strong.</p>
                        ${ffChart(s.map(x=>x.liquidity), ffRoundLabels(), {decimals:0})}
                    </div>
                    <div class="ff-panel">
                        <h3>Leverage risk</h3>
                        <p>Debt exposure relative to Nova's scale.</p>
                        ${ffChart(s.map(x=>x.debt / Math.max(x.revenue,1) * 100), ffRoundLabels(), {decimals:1})}
                    </div>
                </section>

                <section class="ff-grid-2">
                    <div class="ff-panel">
                        <h3>Operational & execution risk</h3>
                        <p>Current operating fragility and execution pressure.</p>
                        ${ffChart(s.map(x=>x.risk * .45 + (100-x.profitability)*.3 + (100-x.capitalEfficiency)*.25), ffRoundLabels(), {decimals:0})}
                    </div>
                    <div class="ff-panel">
                        <h3>Cyber risk</h3>
                        <p>Persistent cybersecurity exposure based on the security decisions you made.</p>
                        ${ffChart(s.map(x=>x.riskManagementTrait < 45 ? x.risk + 10 : x.risk), ffRoundLabels(), {decimals:0})}
                    </div>
                </section>

                <div class="ff-callout">
                    <strong>Important distinction:</strong> a high-risk CFO is not automatically a bad CFO. The simulation rewards appropriate risk-taking and penalizes unmanaged exposure.
                </div>
            </main>
        `;
    }

    function showDashboardOverview() {
        if (!FF_ANALYTICS.overviewHTML) return;
        document.getElementById("dashboard-screen").innerHTML = FF_ANALYTICS.overviewHTML;
        FF_ANALYTICS.lastPage = "overview";
        updateDashboard();
    }

    /* -----------------------------------------------------
       WHAT-IF ANALYSIS
       ----------------------------------------------------- */

    function ffWhatIf() {
        const scores = {
            current: ffDerived(),
            conservative: null,
            growth: null
        };

        const base = {
            cash: company.cash,
            revenue: company.revenue,
            debt: company.debt,
            grossMargin: company.grossMargin,
            profitability: company.profitability,
            growth: company.growth,
            risk: company.risk
        };

        /* Meaningful counterfactuals based on actual decision history:
           conservative = replace aggressive choices with the least
           cash-consuming option; growth = replace conservative choices
           with the highest growth option. */
        let conservativeCash = base.cash;
        let growthRevenue = base.revenue;
        let conservativeRisk = base.risk;
        let growthRisk = base.risk;

        company.decisions.forEach(d => {
            const scenario = scenarios[d.round - 1];
            if (!scenario) return;

            const opts = scenario.options || [];
            const selected = opts.find(o => o.letter === d.choiceLetter);
            if (!selected) return;

            const leastCash = opts.reduce((a,b) =>
                ffNumber(a.effects?.cash) > ffNumber(b.effects?.cash) ? b : a, opts[0]);

            const highestGrowth = opts.reduce((a,b) =>
                ffNumber(a.effects?.revenueGrowth) > ffNumber(b.effects?.revenueGrowth) ? a : b, opts[0]);

            if (leastCash) {
                conservativeCash += ffNumber(leastCash.effects?.cash) - ffNumber(selected.effects?.cash);
                conservativeRisk += ffNumber(leastCash.effects?.risk) - ffNumber(selected.effects?.risk);
            }

            if (highestGrowth) {
                growthRevenue *= 1 + (
                    (ffNumber(highestGrowth.effects?.revenueGrowth) -
                     ffNumber(selected.effects?.revenueGrowth)) / 100
                );
                growthRisk += ffNumber(highestGrowth.effects?.risk) - ffNumber(selected.effects?.risk);
            }
        });

        scores.conservative = {
            cash: Math.max(.05, conservativeCash),
            risk: ffClamp(conservativeRisk)
        };

        scores.growth = {
            revenue: growthRevenue,
            risk: ffClamp(growthRisk)
        };

        return scores;
    }

    function ffPopulateResults() {
        const w = ffWhatIf();
        const d = ffDerived();

        const section = document.querySelector(".what-if-section");
        if (!section) return;

        let box = document.getElementById("ff-what-if-results");
        if (!box) {
            box = document.createElement("div");
            box.id = "ff-what-if-results";
            box.style.marginTop = "20px";
            section.appendChild(box);
        }

        box.innerHTML = `
            <div class="ff-grid-2">
                <div class="ff-panel">
                    <h3>Your actual path</h3>
                    <p>$${company.cash.toFixed(1)}M cash · $${company.revenue.toFixed(1)}M revenue · ${Math.round(company.risk)} risk</p>
                </div>
                <div class="ff-panel">
                    <h3>If you had leaned more conservative</h3>
                    <p>$${w.conservative.cash.toFixed(1)}M estimated cash · ${Math.round(w.conservative.risk)} estimated risk</p>
                </div>
            </div>
            <div class="ff-panel">
                <h3>If you had maximized growth opportunities</h3>
                <p>$${w.growth.revenue.toFixed(1)}M estimated revenue · ${Math.round(w.growth.risk)} estimated risk</p>
            </div>
        `;
    }

    /* -----------------------------------------------------
       RESET / START WRAPPERS
       ----------------------------------------------------- */

    const legacyStart = window.startSimulation;
    const legacyRestart = window.restartSimulation;
    const legacyMakeDecision = window.makeDecision;

    function ffResetAnalytics() {
        FF_ANALYTICS.snapshots = [];
        FF_ANALYTICS.delayed = [];
        ffEnsureState();
    }

    window.startSimulation = function () {
        legacyStart();
        ffResetAnalytics();
        ffCaptureSnapshot(0, "opening");
    };

    window.restartSimulation = function () {
        legacyRestart();
        ffResetAnalytics();
        ffCaptureSnapshot(0, "opening");
    };

    function ffCaptureSnapshot(round, label = "post-decision") {
        ffEnsureState();
        const snap = ffSnapshot(label);
        snap.round = round;
        FF_ANALYTICS.snapshots.push(snap);
    }

    /* -----------------------------------------------------
       DECISION WRAPPER
       ----------------------------------------------------- */

    window.makeDecision = function (optionIndex) {
        if (!currentScenario) currentScenario = getCurrentScenario();
        const scenario = currentScenario;
        const option = scenario && scenario.options ? scenario.options[optionIndex] : null;
        if (!scenario || !option) return;

        ffEnsureState();

        /* Apply consequences due before the new decision. */
        ffApplyDelayed(company.round);

        const beforeRound = company.round;

        /* Preserve the complete existing 18-scenario engine. */
        legacyMakeDecision(optionIndex);

        ffUpdateDerivedFromDecision(scenario, option);
        ffScheduleConsequences(scenario, option);

        /* The legacy engine records the decision before returning. */
        const decision = company.decisions[company.decisions.length - 1];
        if (decision) {
            decision.analytics = {
                dso: company.dso,
                strategicPosition: company.strategicPosition,
                longTermValue: company.longTermValue
            };
        }

        ffCaptureSnapshot(beforeRound, "post-decision");

        /* Keep the dashboard and analytical pages current. */
        if (document.getElementById("dashboard-screen")?.classList.contains("active")) {
            if (FF_ANALYTICS.lastPage === "financials") showFinancialsPage();
            if (FF_ANALYTICS.lastPage === "strategy") showStrategyPage();
            if (FF_ANALYTICS.lastPage === "risk") showRiskPage();
        }
    };

    /* -----------------------------------------------------
       NAVIGATION OVERRIDES
       ----------------------------------------------------- */

    window.showFinancialSummary = function () {
        showFinancialsPage();
    };

    window.showStrategySummary = function () {
        showStrategyPage();
    };

    window.showRiskSummary = function () {
        showRiskPage();
    };

    /* -----------------------------------------------------
       RESULTS ENHANCEMENT
       ----------------------------------------------------- */

    const legacyFinalReport = window.generateFinalReport;

    window.generateFinalReport = function () {
        if (typeof legacyFinalReport === "function") legacyFinalReport();

        setTimeout(() => {
            ffPopulateResults();

            /* Add a compact 18-round financial trajectory to results. */
            const results = document.querySelector(".results-container");
            if (!results || document.getElementById("ff-final-trajectory")) return;

            const d = ffDerived();
            const block = document.createElement("section");
            block.id = "ff-final-trajectory";
            block.className = "ff-panel";
            block.style.marginTop = "22px";

            block.innerHTML = `
                <span class="section-label">FINAL TRAJECTORY</span>
                <h3 style="margin:5px 0 15px;">How Nova changed over 18 decisions</h3>
                ${ffChart(FF_ANALYTICS.snapshots.map(x=>x.revenue), ffRoundLabels(), {decimals:1})}
                <div class="ff-grid-4" style="margin-top:14px;">
                    ${ffCard("Ending cash", `$${company.cash.toFixed(1)}M`)}
                    ${ffCard("Ending debt", `$${company.debt.toFixed(1)}M`)}
                    ${ffCard("EBITDA margin", `${d.ebitdaMargin.toFixed(1)}%`)}
                    ${ffCard("DSO", `${Math.round(company.dso)} days`)}
                </div>
            `;
            results.appendChild(block);
        }, 0);
    };

    /* -----------------------------------------------------
       DOM READY
       ----------------------------------------------------- */

    function ffBoot() {
        ffInjectStyles();
        ffEnsureState();

        const dashboard = document.getElementById("dashboard-screen");
        if (dashboard && !FF_ANALYTICS.overviewHTML) {
            FF_ANALYTICS.overviewHTML = dashboard.innerHTML;
            FF_ANALYTICS.overviewReady = true;
        }

        /* Initial state should be Start -> dashboard. */
        if (!FF_ANALYTICS.snapshots.length) {
            FF_ANALYTICS.snapshots.push({
                ...ffSnapshot("opening"),
                round: 0,
                revenue: FF_BASELINE.revenue,
                grossMargin: FF_BASELINE.grossMargin,
                debt: FF_BASELINE.debt,
                cash: FF_BASELINE.cash,
                dso: FF_BASELINE.dso
            });
        }

        /* Patch old 15-round text anywhere it survives. */
        document.querySelectorAll("*").forEach(el => {
            if (el.children.length === 0 && el.textContent.includes("15")) {
                el.textContent = el.textContent.replace(/15/g, "18");
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", ffBoot);
    } else {
        ffBoot();
    }

    window.showDashboardOverview = showDashboardOverview;

})();
