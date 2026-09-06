/* =========================================================
   FINANCE FORWARD — CFO SIMULATION ENGINE
   ========================================================= */


/* =========================================================
   1. INITIAL COMPANY STATE
   ========================================================= */

const INITIAL_COMPANY = {

    cash: 2.1,
    revenue: 12.4,
    startingRevenue: 12.4,

    grossMargin: 34,
    debt: 1.8,

    liquidity: 68,
    profitability: 61,
    growth: 82,

    // IMPORTANT:
    // Higher risk = MORE risk exposure.
    risk: 38,

    financialPerformance: 60,
    liquidityManagement: 60,
    riskManagement: 60,
    strategicThinking: 60,
    capitalAllocation: 60,
    ethics: 60,

    round: 1,
    totalRounds: 15,

    decisions: [],

    totalInvestment: 0,
    totalDebtAdded: 0,

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

    {
        round: 1,
        category: "LIQUIDITY · GROWTH",

        title: "How aggressively will you grow?",

        description:
            "Your sales team believes the company can increase revenue by 20% next year if you expand the sales team now.",

        situationTitle:
            "Growth is putting pressure on your cash.",

        situationText:
            "Revenue has grown 31% over the last year, but the company is spending faster than cash is coming in.",

        situationAdvice:
            "Your CEO wants to accelerate growth. Your controller is warning that liquidity could become a problem within six months.",

        information: [
            ["REQUIRED INVESTMENT", "$750K"],
            ["EXPECTED REVENUE GROWTH", "+20%"],
            ["CURRENT CASH", "dynamic"]
        ],

        options: [
            {
                letter: "A",
                name: "Invest aggressively",
                description:
                    "Spend the $750K and build the sales team immediately.",

                effects: {
                    cash: -0.75,
                    revenueGrowth: 10,
                    grossMargin: -1,
                    liquidity: -8,
                    profitability: -2,
                    growth: 8,
                    risk: 6,
                    financialPerformance: 2,
                    liquidityManagement: -5,
                    riskManagement: -5,
                    strategicThinking: 7,
                    capitalAllocation: 5,
                    ethics: 0
                },

                consequence:
                    "You chose to accelerate growth.",

                summary:
                    "Nova now has a larger sales capacity, but the investment puts additional pressure on liquidity."
            },

            {
                letter: "B",
                name: "Take a balanced approach",
                description:
                    "Invest $400K now and evaluate performance before expanding further.",

                effects: {
                    cash: -0.40,
                    revenueGrowth: 6,
                    grossMargin: 0,
                    liquidity: -3,
                    profitability: 1,
                    growth: 5,
                    risk: 2,
                    financialPerformance: 5,
                    liquidityManagement: 5,
                    riskManagement: 4,
                    strategicThinking: 6,
                    capitalAllocation: 7,
                    ethics: 0
                },

                consequence:
                    "You chose a measured expansion.",

                summary:
                    "Nova gains additional sales capacity while preserving a meaningful liquidity buffer."
            },

            {
                letter: "C",
                name: "Protect liquidity",
                description:
                    "Delay the expansion and preserve cash until demand is more certain.",

                effects: {
                    cash: 0,
                    revenueGrowth: 2,
                    grossMargin: 1,
                    liquidity: 6,
                    profitability: 4,
                    growth: -4,
                    risk: -6,
                    financialPerformance: 4,
                    liquidityManagement: 8,
                    riskManagement: 7,
                    strategicThinking: 2,
                    capitalAllocation: 3,
                    ethics: 0
                },

                consequence:
                    "You chose to protect liquidity.",

                summary:
                    "Nova gives up some potential growth in exchange for a stronger financial cushion."
            }
        ]
    },


    {
        round: 2,
        category: "WORKING CAPITAL · CASH",

        title: "Customers are taking longer to pay.",

        description:
            "Accounts receivable has increased sharply. The sales team wants to offer customers even longer payment terms to close more deals.",

        situationTitle:
            "Revenue looks strong. Cash conversion does not.",

        situationText:
            "Several major customers are pushing for 60–90 day payment terms.",

        situationAdvice:
            "Your controller warns that accounting profit will not help if Nova cannot collect its cash.",

        information: [
            ["CURRENT DSO", "47 DAYS"],
            ["PROPOSED TERMS", "90 DAYS"],
            ["RECEIVABLES", "$2.4M"]
        ],

        options: [

            {
                letter: "A",
                name: "Accept longer terms",
                description:
                    "Give strategic customers 90-day payment terms to maximize sales.",

                effects: {
                    cash: -0.35,
                    revenueGrowth: 7,
                    liquidity: -7,
                    profitability: 1,
                    growth: 5,
                    risk: 6,
                    financialPerformance: 2,
                    liquidityManagement: -6,
                    riskManagement: -3,
                    strategicThinking: 6,
                    capitalAllocation: 1,
                    ethics: 1
                },

                consequence:
                    "You prioritized sales over cash conversion.",

                summary:
                    "Revenue opportunities increase, but more of Nova's capital becomes trapped in receivables."
            },

            {
                letter: "B",
                name: "Segment customer terms",
                description:
                    "Offer flexible terms only to customers with strong payment histories.",

                effects: {
                    cash: -0.10,
                    revenueGrowth: 4,
                    liquidity: 3,
                    profitability: 2,
                    growth: 3,
                    risk: 1,
                    financialPerformance: 5,
                    liquidityManagement: 7,
                    riskManagement: 5,
                    strategicThinking: 7,
                    capitalAllocation: 5,
                    ethics: 1
                },

                consequence:
                    "You segmented your working-capital policy.",

                summary:
                    "Nova keeps strategic customers happy without exposing the entire receivables book to excessive collection risk."
            },

            {
                letter: "C",
                name: "Tighten payment terms",
                description:
                    "Require faster payment from customers, even if some sales are lost.",

                effects: {
                    cash: 0.20,
                    revenueGrowth: 1,
                    liquidity: 8,
                    profitability: 3,
                    growth: -2,
                    risk: -4,
                    financialPerformance: 4,
                    liquidityManagement: 9,
                    riskManagement: 7,
                    strategicThinking: 2,
                    capitalAllocation: 5,
                    ethics: 1
                },

                consequence:
                    "You prioritized cash conversion.",

                summary:
                    "Nova becomes more financially resilient, although some customers may choose competitors with more generous terms."
            }
        ]
    },


    {
        round: 3,
        category: "COSTS · PROFITABILITY",

        title: "Your margins are being squeezed.",

        description:
            "Supplier costs have increased 9%. The operations team has identified several ways to reduce expenses, but some require upfront investment.",

        situationTitle:
            "Revenue is growing faster than profit.",

        situationText:
            "Input costs are rising while competitors are keeping prices relatively stable.",

        situationAdvice:
            "The board wants to protect margins without damaging customer demand.",

        information: [
            ["SUPPLIER COST INCREASE", "+9%"],
            ["CURRENT GROSS MARGIN", "34%"],
            ["EFFICIENCY INVESTMENT", "$300K"]
        ],

        options: [

            {
                letter: "A",
                name: "Invest in automation",
                description:
                    "Spend $300K now to reduce long-term operating costs.",

                effects: {
                    cash: -0.30,
                    revenueGrowth: 2,
                    grossMargin: 3,
                    liquidity: -2,
                    profitability: 7,
                    growth: 2,
                    risk: 1,
                    financialPerformance: 6,
                    liquidityManagement: 1,
                    riskManagement: 3,
                    strategicThinking: 7,
                    capitalAllocation: 8,
                    ethics: 1
                },

                consequence:
                    "You invested in efficiency.",

                summary:
                    "The upfront cost reduces cash today, but Nova's cost structure becomes stronger."
            },

            {
                letter: "B",
                name: "Negotiate with suppliers",
                description:
                    "Renegotiate contracts before committing capital to new technology.",

                effects: {
                    cash: -0.05,
                    revenueGrowth: 1,
                    grossMargin: 2,
                    liquidity: 2,
                    profitability: 5,
                    growth: 1,
                    risk: 0,
                    financialPerformance: 5,
                    liquidityManagement: 5,
                    riskManagement: 4,
                    strategicThinking: 6,
                    capitalAllocation: 6,
                    ethics: 1
                },

                consequence:
                    "You negotiated before spending.",

                summary:
                    "Nova improves margins without committing heavily to a long-term technology investment."
            },

            {
                letter: "C",
                name: "Raise prices",
                description:
                    "Pass some supplier cost increases onto customers.",

                effects: {
                    cash: 0,
                    revenueGrowth: -2,
                    grossMargin: 4,
                    liquidity: 1,
                    profitability: 5,
                    growth: -1,
                    risk: 2,
                    financialPerformance: 5,
                    liquidityManagement: 3,
                    riskManagement: 3,
                    strategicThinking: 5,
                    capitalAllocation: 3,
                    ethics: 0
                },

                consequence:
                    "You protected the margin through pricing.",

                summary:
                    "Nova preserves profitability, but higher prices could reduce demand."
            }
        ]
    },


    {
        round: 4,
        category: "CAPITAL · DEBT",

        title: "The board wants more runway.",

        description:
            "Nova can secure a new revolving credit facility before it actually needs the cash. The facility would provide flexibility but increase leverage.",

        situationTitle:
            "Cash is healthy — but uncertainty is rising.",

        situationText:
            "Management expects another period of heavy investment over the next two quarters.",

        situationAdvice:
            "Your job is to decide whether financial flexibility is worth the cost of additional debt.",

        information: [
            ["CREDIT FACILITY", "$2.0M"],
            ["INTEREST RATE", "8.5%"],
            ["CURRENT DEBT", "dynamic"]
        ],

        options: [

            {
                letter: "A",
                name: "Secure the full facility",
                description:
                    "Borrow aggressively and keep the additional cash available.",

                effects: {
                    cash: 1.50,
                    debt: 1.50,
                    revenueGrowth: 2,
                    liquidity: 10,
                    profitability: -3,
                    growth: 3,
                    risk: 8,
                    financialPerformance: 2,
                    liquidityManagement: 5,
                    riskManagement: -3,
                    strategicThinking: 5,
                    capitalAllocation: 4,
                    ethics: 1
                },

                consequence:
                    "You increased financial flexibility.",

                summary:
                    "Nova gains substantial liquidity, but interest expense and leverage increase."
            },

            {
                letter: "B",
                name: "Secure a smaller facility",
                description:
                    "Establish $1M of additional borrowing capacity as a safety net.",

                effects: {
                    cash: 0.75,
                    debt: 0.75,
                    revenueGrowth: 1,
                    liquidity: 5,
                    profitability: -1,
                    growth: 1,
                    risk: 4,
                    financialPerformance: 4,
                    liquidityManagement: 6,
                    riskManagement: 3,
                    strategicThinking: 7,
                    capitalAllocation: 7,
                    ethics: 1
                },

                consequence:
                    "You created a controlled liquidity buffer.",

                summary:
                    "Nova gains financing flexibility without taking on the full leverage burden."
            },

            {
                letter: "C",
                name: "Remain debt-free",
                description:
                    "Do not borrow. Fund future investments entirely from operations.",

                effects: {
                    cash: 0,
                    revenueGrowth: -1,
                    liquidity: -2,
                    profitability: 2,
                    growth: -2,
                    risk: -5,
                    financialPerformance: 3,
                    liquidityManagement: 7,
                    riskManagement: 8,
                    strategicThinking: 3,
                    capitalAllocation: 6,
                    ethics: 1
                },

                consequence:
                    "You rejected additional leverage.",

                summary:
                    "Nova remains financially conservative but has less flexibility if growth opportunities appear."
            }
        ]
    },


    {
        round: 5,
        category: "HIRING · OPERATIONS",

        title: "Your team is becoming a bottleneck.",

        description:
            "Customer growth has outpaced the operations team. Hiring now could improve service quality, but personnel costs are largely fixed.",

        situationTitle:
            "Growth is beginning to strain execution.",

        situationText:
            "Customer complaints have increased as order volume rises.",

        situationAdvice:
            "Your COO wants to hire before service quality becomes a serious problem.",

        information: [
            ["NEW HIRES", "18"],
            ["ANNUAL COST", "$420K"],
            ["CUSTOMER RETENTION", "91%"]
        ],

        options: [

            {
                letter: "A",
                name: "Hire ahead of demand",
                description:
                    "Build the team now so operations can handle future growth.",

                effects: {
                    cash: -0.35,
                    revenueGrowth: 5,
                    liquidity: -3,
                    profitability: -1,
                    growth: 6,
                    risk: -1,
                    financialPerformance: 3,
                    liquidityManagement: -1,
                    riskManagement: 3,
                    strategicThinking: 8,
                    capitalAllocation: 4,
                    ethics: 4
                },

                consequence:
                    "You invested ahead of demand.",

                summary:
                    "Nova gains operational capacity and protects customer experience, but fixed costs rise."
            },

            {
                letter: "B",
                name: "Hire selectively",
                description:
                    "Add only the highest-priority roles and monitor workload.",

                effects: {
                    cash: -0.18,
                    revenueGrowth: 3,
                    liquidity: 0,
                    profitability: 1,
                    growth: 4,
                    risk: -1,
                    financialPerformance: 5,
                    liquidityManagement: 4,
                    riskManagement: 5,
                    strategicThinking: 7,
                    capitalAllocation: 7,
                    ethics: 3
                },

                consequence:
                    "You expanded the team selectively.",

                summary:
                    "Nova gains critical capacity without locking itself into excessive fixed costs."
            },

            {
                letter: "C",
                name: "Freeze hiring",
                description:
                    "Ask the existing team to absorb the increased workload.",

                effects: {
                    cash: 0.15,
                    revenueGrowth: 0,
                    liquidity: 4,
                    profitability: 3,
                    growth: -3,
                    risk: 4,
                    financialPerformance: 4,
                    liquidityManagement: 6,
                    riskManagement: -2,
                    strategicThinking: 2,
                    capitalAllocation: 5,
                    ethics: -2
                },

                consequence:
                    "You froze hiring to protect cash.",

                summary:
                    "Nova preserves near-term profitability, but employee strain and service risk increase."
            }
        ]
    },


    {
        round: 6,
        category: "PRICING · DEMAND",

        title: "A competitor just cut prices.",

        description:
            "Your largest competitor has reduced prices by 12%. The marketing team wants Nova to respond immediately.",

        situationTitle:
            "A price war could be starting.",

        situationText:
            "Nova currently competes on reliability and service rather than price.",

        situationAdvice:
            "A price cut could increase volume, but it would directly pressure gross margin.",

        information: [
            ["COMPETITOR PRICE CUT", "-12%"],
            ["NOVA MARGIN", "dynamic"],
            ["CUSTOMER PRICE SENSITIVITY", "MEDIUM"]
        ],

        options: [

            {
                letter: "A",
                name: "Match the price cut",
                description:
                    "Reduce prices across the product line to defend market share.",

                effects: {
                    cash: -0.10,
                    revenueGrowth: 8,
                    grossMargin: -4,
                    liquidity: -1,
                    profitability: -5,
                    growth: 8,
                    risk: 5,
                    financialPerformance: -1,
                    liquidityManagement: 0,
                    riskManagement: -2,
                    strategicThinking: 4,
                    capitalAllocation: 2,
                    ethics: 1
                },

                consequence:
                    "You entered the price battle.",

                summary:
                    "Nova protects volume and market share, but every dollar of revenue now generates less margin."
            },

            {
                letter: "B",
                name: "Targeted discounts",
                description:
                    "Use selective discounts rather than cutting prices for everyone.",

                effects: {
                    cash: -0.05,
                    revenueGrowth: 5,
                    grossMargin: -1,
                    liquidity: 0,
                    profitability: 1,
                    growth: 5,
                    risk: 2,
                    financialPerformance: 5,
                    liquidityManagement: 2,
                    riskManagement: 4,
                    strategicThinking: 8,
                    capitalAllocation: 5,
                    ethics: 1
                },

                consequence:
                    "You used pricing selectively.",

                summary:
                    "Nova responds to competitive pressure while preserving most of its pricing power."
            },

            {
                letter: "C",
                name: "Hold your price",
                description:
                    "Keep prices stable and compete through product quality and service.",

                effects: {
                    cash: 0,
                    revenueGrowth: 1,
                    grossMargin: 2,
                    liquidity: 2,
                    profitability: 4,
                    growth: -1,
                    risk: 1,
                    financialPerformance: 4,
                    liquidityManagement: 3,
                    riskManagement: 4,
                    strategicThinking: 6,
                    capitalAllocation: 2,
                    ethics: 1
                },

                consequence:
                    "You refused to enter the price war.",

                summary:
                    "Nova protects margins but accepts the possibility of losing some price-sensitive customers."
            }
        ]
    },


    {
        round: 7,
        category: "TECHNOLOGY · INVESTMENT",

        title: "The board wants an AI upgrade.",

        description:
            "A new technology platform could automate customer support and forecasting. It requires significant upfront investment.",

        situationTitle:
            "Technology could reshape Nova's cost structure.",

        situationText:
            "The proposal promises efficiency gains, but the projected benefits are uncertain.",

        situationAdvice:
            "Your CFO judgment must distinguish a compelling business case from technology hype.",

        information: [
            ["UPFRONT COST", "$600K"],
            ["EXPECTED SAVINGS", "$250K/YEAR"],
            ["PAYBACK", "2–4 YEARS"]
        ],

        options: [

            {
                letter: "A",
                name: "Fund the full project",
                description:
                    "Commit the full investment and transform operations.",

                effects: {
                    cash: -0.60,
                    revenueGrowth: 3,
                    grossMargin: 3,
                    liquidity: -5,
                    profitability: 4,
                    growth: 4,
                    risk: 3,
                    financialPerformance: 5,
                    liquidityManagement: -2,
                    riskManagement: 1,
                    strategicThinking: 9,
                    capitalAllocation: 8,
                    ethics: 2
                },

                consequence:
                    "You made a major technology investment.",

                summary:
                    "Nova takes meaningful short-term financial risk in exchange for potential long-term efficiency."
            },

            {
                letter: "B",
                name: "Run a pilot",
                description:
                    "Invest $150K in a limited pilot before committing further capital.",

                effects: {
                    cash: -0.15,
                    revenueGrowth: 1,
                    grossMargin: 1,
                    liquidity: 1,
                    profitability: 2,
                    growth: 2,
                    risk: 0,
                    financialPerformance: 5,
                    liquidityManagement: 5,
                    riskManagement: 7,
                    strategicThinking: 9,
                    capitalAllocation: 9,
                    ethics: 2
                },

                consequence:
                    "You tested the technology before scaling it.",

                summary:
                    "Nova preserves optionality while generating real evidence about whether the technology works."
            },

            {
                letter: "C",
                name: "Reject the investment",
                description:
                    "Keep capital focused on proven business priorities.",

                effects: {
                    cash: 0,
                    revenueGrowth: 0,
                    grossMargin: 0,
                    liquidity: 3,
                    profitability: 2,
                    growth: -2,
                    risk: -2,
                    financialPerformance: 3,
                    liquidityManagement: 5,
                    riskManagement: 5,
                    strategicThinking: 1,
                    capitalAllocation: 6,
                    ethics: 2
                },

                consequence:
                    "You avoided an uncertain technology bet.",

                summary:
                    "Nova protects capital but may miss an opportunity to improve its cost structure."
            }
        ]
    },


    {
        round: 8,
        category: "ACQUISITION · STRATEGY",

        title: "An acquisition opportunity appears.",

        description:
            "A smaller competitor is available at an attractive valuation. Acquiring it could accelerate Nova's expansion into a new market.",

        situationTitle:
            "Growth or discipline?",

        situationText:
            "The acquisition would be Nova's largest strategic investment yet.",

        situationAdvice:
            "The target has strong technology but inconsistent profitability.",

        information: [
            ["PURCHASE PRICE", "$2.4M"],
            ["TARGET REVENUE", "$3.1M"],
            ["TARGET MARGIN", "21%"]
        ],

        options: [

            {
                letter: "A",
                name: "Acquire immediately",
                description:
                    "Use cash and financing to close the deal quickly.",

                effects: {
                    cash: -1.20,
                    debt: 0.80,
                    revenueGrowth: 13,
                    grossMargin: -1,
                    liquidity: -12,
                    profitability: -3,
                    growth: 12,
                    risk: 10,
                    financialPerformance: 3,
                    liquidityManagement: -5,
                    riskManagement: -5,
                    strategicThinking: 10,
                    capitalAllocation: 3,
                    ethics: 2
                },

                consequence:
                    "You pursued transformational growth.",

                summary:
                    "Nova gains significant scale but becomes more leveraged and exposed to integration risk."
            },

            {
                letter: "B",
                name: "Negotiate a staged deal",
                description:
                    "Structure the acquisition around milestones and performance targets.",

                effects: {
                    cash: -0.55,
                    debt: 0.30,
                    revenueGrowth: 8,
                    grossMargin: 0,
                    liquidity: -5,
                    profitability: 1,
                    growth: 8,
                    risk: 3,
                    financialPerformance: 6,
                    liquidityManagement: 5,
                    riskManagement: 7,
                    strategicThinking: 10,
                    capitalAllocation: 9,
                    ethics: 2
                },

                consequence:
                    "You structured the acquisition around performance.",

                summary:
                    "Nova captures much of the strategic upside while limiting downside through a staged transaction."
            },

            {
                letter: "C",
                name: "Walk away",
                description:
                    "Reject the acquisition and focus on organic growth.",

                effects: {
                    cash: 0,
                    revenueGrowth: 1,
                    liquidity: 4,
                    profitability: 2,
                    growth: -2,
                    risk: -5,
                    financialPerformance: 4,
                    liquidityManagement: 6,
                    riskManagement: 8,
                    strategicThinking: 4,
                    capitalAllocation: 8,
                    ethics: 2
                },

                consequence:
                    "You chose organic growth.",

                summary:
                    "Nova preserves financial flexibility and avoids integration risk."
            }
        ]
    },


    {
        round: 9,
        category: "ETHICS · GOVERNANCE",

        title: "A reporting issue reaches your desk.",

        description:
            "A senior executive suggests recognizing several customer contracts early to make quarterly results look stronger.",

        situationTitle:
            "The numbers can be improved — but should they?",

        situationText:
            "The practice would make the quarter look significantly better.",

        situationAdvice:
            "Your controller believes the proposed accounting treatment is aggressive and potentially misleading.",

        information: [
            ["POTENTIAL REVENUE SHIFT", "$900K"],
            ["QUARTERLY TARGET", "AT RISK"],
            ["BOARD REVIEW", "NEXT MONTH"]
        ],

        options: [

            {
                letter: "A",
                name: "Approve the treatment",
                description:
                    "Recognize the revenue now to avoid missing the target.",

                effects: {
                    cash: 0,
                    revenueGrowth: 5,
                    profitability: 5,
                    liquidity: 0,
                    growth: 3,
                    risk: 12,
                    financialPerformance: 2,
                    liquidityManagement: 0,
                    riskManagement: -8,
                    strategicThinking: -3,
                    capitalAllocation: 0,
                    ethics: -20
                },

                consequence:
                    "You prioritized the short-term result.",

                summary:
                    "The quarter looks stronger, but the decision materially increases governance and reporting risk."
            },

            {
                letter: "B",
                name: "Escalate for review",
                description:
                    "Ask the controller and audit committee to review the treatment before recording it.",

                effects: {
                    cash: 0,
                    revenueGrowth: 0,
                    profitability: 0,
                    liquidity: 1,
                    growth: 0,
                    risk: -4,
                    financialPerformance: 4,
                    liquidityManagement: 2,
                    riskManagement: 9,
                    strategicThinking: 7,
                    capitalAllocation: 2,
                    ethics: 10
                },

                consequence:
                    "You escalated the accounting issue.",

                summary:
                    "The immediate result may be less impressive, but Nova's reporting process becomes more credible."
            },

            {
                letter: "C",
                name: "Reject the treatment",
                description:
                    "Refuse to recognize revenue that does not meet the appropriate criteria.",

                effects: {
                    cash: 0,
                    revenueGrowth: -1,
                    profitability: -1,
                    liquidity: 1,
                    growth: -1,
                    risk: -7,
                    financialPerformance: 3,
                    liquidityManagement: 2,
                    riskManagement: 10,
                    strategicThinking: 6,
                    capitalAllocation: 1,
                    ethics: 15
                },

                consequence:
                    "You protected reporting integrity.",

                summary:
                    "Nova may miss the short-term target, but you protect the credibility of the company's financial statements."
            }
        ]
    },


    {
        round: 10,
        category: "MARKET · GROWTH",

        title: "Nova can enter a new market.",

        description:
            "International expansion could materially increase Nova's addressable market, but regulatory and operational complexity would rise.",

        situationTitle:
            "The next growth opportunity is outside your comfort zone.",

        situationText:
            "The market opportunity is attractive, but Nova has limited international experience.",

        situationAdvice:
            "The board wants a recommendation based on expected return, not excitement.",

        information: [
            ["MARKET SIZE", "$18M"],
            ["ENTRY COST", "$500K"],
            ["EXPECTED PAYBACK", "24 MONTHS"]
        ],

        options: [

            {
                letter: "A",
                name: "Launch nationally",
                description:
                    "Commit the full investment and enter the market aggressively.",

                effects: {
                    cash: -0.50,
                    revenueGrowth: 10,
                    liquidity: -5,
                    profitability: -2,
                    growth: 10,
                    risk: 8,
                    financialPerformance: 2,
                    liquidityManagement: -2,
                    riskManagement: -3,
                    strategicThinking: 9,
                    capitalAllocation: 4,
                    ethics: 1
                },

                consequence:
                    "You entered the new market aggressively.",

                summary:
                    "Nova gains access to a large growth opportunity, but execution and regulatory risks rise."
            },

            {
                letter: "B",
                name: "Pilot one region",
                description:
                    "Test the market with a limited launch before expanding.",

                effects: {
                    cash: -0.18,
                    revenueGrowth: 4,
                    liquidity: 1,
                    profitability: 1,
                    growth: 5,
                    risk: 1,
                    financialPerformance: 5,
                    liquidityManagement: 5,
                    riskManagement: 7,
                    strategicThinking: 9,
                    capitalAllocation: 8,
                    ethics: 1
                },

                consequence:
                    "You tested the market before scaling.",

                summary:
                    "Nova gains real market information while limiting the amount of capital at risk."
            },

            {
                letter: "C",
                name: "Stay focused",
                description:
                    "Reject international expansion and strengthen the existing business.",

                effects: {
                    cash: 0,
                    revenueGrowth: 1,
                    liquidity: 4,
                    profitability: 3,
                    growth: -2,
                    risk: -4,
                    financialPerformance: 4,
                    liquidityManagement: 6,
                    riskManagement: 7,
                    strategicThinking: 4,
                    capitalAllocation: 7,
                    ethics: 1
                },

                consequence:
                    "You prioritized depth over expansion.",

                summary:
                    "Nova strengthens its existing market rather than taking on a new operational challenge."
            }
        ]
    },


    {
        round: 11,
        category: "SUPPLY CHAIN · RISK",

        title: "Your largest supplier is struggling.",

        description:
            "A key supplier has warned that production delays are possible. Switching suppliers would be expensive but would reduce concentration risk.",

        situationTitle:
            "Efficiency has created concentration risk.",

        situationText:
            "Nova currently relies on one supplier for 62% of a critical component.",

        situationAdvice:
            "A disruption could affect revenue for several months.",

        information: [
            ["SUPPLIER CONCENTRATION", "62%"],
            ["ALTERNATIVE SUPPLIER", "AVAILABLE"],
            ["SWITCHING COST", "$280K"]
        ],

        options: [

            {
                letter: "A",
                name: "Dual-source immediately",
                description:
                    "Pay the switching cost to establish a second supplier.",

                effects: {
                    cash: -0.28,
                    revenueGrowth: 2,
                    grossMargin: -1,
                    liquidity: -2,
                    profitability: 1,
                    growth: 2,
                    risk: -10,
                    financialPerformance: 5,
                    liquidityManagement: 2,
                    riskManagement: 12,
                    strategicThinking: 8,
                    capitalAllocation: 6,
                    ethics: 2
                },

                consequence:
                    "You reduced supply-chain concentration.",

                summary:
                    "Nova accepts a near-term cost to materially reduce the risk of a future disruption."
            },

            {
                letter: "B",
                name: "Build a contingency plan",
                description:
                    "Keep the current supplier while securing emergency backup capacity.",

                effects: {
                    cash: -0.08,
                    revenueGrowth: 1,
                    liquidity: 1,
                    profitability: 1,
                    growth: 1,
                    risk: -5,
                    financialPerformance: 5,
                    liquidityManagement: 4,
                    riskManagement: 9,
                    strategicThinking: 8,
                    capitalAllocation: 6,
                    ethics: 2
                },

                consequence:
                    "You created a contingency plan.",

                summary:
                    "Nova reduces some exposure without immediately paying the full cost of changing suppliers."
            },

            {
                letter: "C",
                name: "Stay with the supplier",
                description:
                    "Accept the concentration risk because the existing supplier is cheaper.",

                effects: {
                    cash: 0.05,
                    revenueGrowth: 1,
                    grossMargin: 1,
                    liquidity: 2,
                    profitability: 2,
                    growth: 1,
                    risk: 8,
                    financialPerformance: 4,
                    liquidityManagement: 3,
                    riskManagement: -5,
                    strategicThinking: 1,
                    capitalAllocation: 5,
                    ethics: 1
                },

                consequence:
                    "You prioritized efficiency over diversification.",

                summary:
                    "Nova preserves margins today but remains vulnerable to a supply disruption."
            }
        ]
    },


    {
        round: 12,
        category: "CAPITAL ALLOCATION",

        title: "You have excess cash — for now.",

        description:
            "Nova has accumulated additional cash. The board wants to return capital, but management sees several reinvestment opportunities.",

        situationTitle:
            "Cash can create value — or simply sit idle.",

        situationText:
            "Your decision will signal how you think about capital allocation.",

        situationAdvice:
            "The correct answer depends on expected returns, not simply the size of the cash balance.",

        information: [
            ["AVAILABLE CASH", "dynamic"],
            ["REINVESTMENT OPTIONS", "3"],
            ["TARGET RETURN", "12%+"]
        ],

        options: [

            {
                letter: "A",
                name: "Reinvest aggressively",
                description:
                    "Put most excess cash back into growth initiatives.",

                effects: {
                    cash: -0.65,
                    revenueGrowth: 9,
                    liquidity: -7,
                    profitability: 3,
                    growth: 9,
                    risk: 5,
                    financialPerformance: 5,
                    liquidityManagement: -4,
                    riskManagement: -1,
                    strategicThinking: 8,
                    capitalAllocation: 7,
                    ethics: 1
                },

                consequence:
                    "You recycled capital into growth.",

                summary:
                    "Nova retains its growth trajectory but gives up some financial flexibility."
            },

            {
                letter: "B",
                name: "Split the capital",
                description:
                    "Reinvest part of the cash while retaining a meaningful reserve.",

                effects: {
                    cash: -0.30,
                    revenueGrowth: 5,
                    liquidity: -2,
                    profitability: 2,
                    growth: 5,
                    risk: 2,
                    financialPerformance: 7,
                    liquidityManagement: 7,
                    riskManagement: 5,
                    strategicThinking: 8,
                    capitalAllocation: 10,
                    ethics: 1
                },

                consequence:
                    "You divided capital between growth and resilience.",

                summary:
                    "Nova invests in future returns without sacrificing its ability to absorb a shock."
            },

            {
                letter: "C",
                name: "Build the cash reserve",
                description:
                    "Keep excess cash on the balance sheet until better opportunities appear.",

                effects: {
                    cash: 0.10,
                    revenueGrowth: 1,
                    liquidity: 7,
                    profitability: 1,
                    growth: -2,
                    risk: -5,
                    financialPerformance: 4,
                    liquidityManagement: 9,
                    riskManagement: 8,
                    strategicThinking: 4,
                    capitalAllocation: 7,
                    ethics: 1
                },

                consequence:
                    "You prioritized financial optionality.",

                summary:
                    "Nova becomes highly resilient, although some potential returns remain unrealized."
            }
        ]
    },


    {
        round: 13,
        category: "REPUTATION · CUSTOMERS",

        title: "A product problem goes public.",

        description:
            "A quality issue has affected a small but visible group of customers. The marketing team wants to minimize the problem publicly.",

        situationTitle:
            "Trust has become a financial variable.",

        situationText:
            "The direct financial cost is manageable, but mishandling the issue could damage customer retention.",

        situationAdvice:
            "You must balance the cost of remediation against the long-term value of trust.",

        information: [
            ["AFFECTED CUSTOMERS", "3.2%"],
            ["REMEDIATION COST", "$180K"],
            ["RETENTION AT RISK", "HIGH"]
        ],

        options: [

            {
                letter: "A",
                name: "Full remediation",
                description:
                    "Refund affected customers and publicly acknowledge the issue.",

                effects: {
                    cash: -0.18,
                    revenueGrowth: 3,
                    liquidity: -1,
                    profitability: -1,
                    growth: 3,
                    risk: -5,
                    financialPerformance: 4,
                    liquidityManagement: 2,
                    riskManagement: 7,
                    strategicThinking: 7,
                    capitalAllocation: 4,
                    ethics: 12
                },

                consequence:
                    "You invested in customer trust.",

                summary:
                    "The immediate financial cost is real, but Nova strengthens its reputation and reduces long-term retention risk."
            },

            {
                letter: "B",
                name: "Targeted remediation",
                description:
                    "Compensate affected customers while limiting broader costs.",

                effects: {
                    cash: -0.08,
                    revenueGrowth: 2,
                    liquidity: 1,
                    profitability: 0,
                    growth: 2,
                    risk: -2,
                    financialPerformance: 6,
                    liquidityManagement: 4,
                    riskManagement: 6,
                    strategicThinking: 7,
                    capitalAllocation: 6,
                    ethics: 8
                },

                consequence:
                    "You used a targeted customer response.",

                summary:
                    "Nova addresses the core problem while controlling the cost of remediation."
            },

            {
                letter: "C",
                name: "Minimize the response",
                description:
                    "Handle complaints individually and avoid a broad public response.",

                effects: {
                    cash: 0.05,
                    revenueGrowth: -2,
                    liquidity: 2,
                    profitability: 2,
                    growth: -3,
                    risk: 8,
                    financialPerformance: 3,
                    liquidityManagement: 3,
                    riskManagement: -5,
                    strategicThinking: 1,
                    capitalAllocation: 5,
                    ethics: -10
                },

                consequence:
                    "You minimized the immediate cost.",

                summary:
                    "Nova saves money today, but reputational and retention risks increase."
            }
        ]
    },


    {
        round: 14,
        category: "RECESSION · RESILIENCE",

        title: "The economy is slowing.",

        description:
            "Macroeconomic indicators suggest demand may weaken over the next two quarters.",

        situationTitle:
            "Your growth strategy is about to be tested.",

        situationText:
            "Nova has strong demand today, but management expects a softer environment.",

        situationAdvice:
            "You can either prepare for a downturn or continue betting on growth.",

        information: [
            ["ECONOMIC OUTLOOK", "SLOWDOWN"],
            ["DEMAND FORECAST", "-8%"],
            ["CURRENT CASH", "dynamic"]
        ],

        options: [

            {
                letter: "A",
                name: "Continue investing",
                description:
                    "Use the slowdown as an opportunity to gain market share.",

                effects: {
                    cash: -0.45,
                    revenueGrowth: 5,
                    liquidity: -6,
                    profitability: -2,
                    growth: 6,
                    risk: 8,
                    financialPerformance: 2,
                    liquidityManagement: -5,
                    riskManagement: -3,
                    strategicThinking: 8,
                    capitalAllocation: 5,
                    ethics: 1
                },

                consequence:
                    "You treated the slowdown as an opportunity.",

                summary:
                    "Nova may emerge stronger if demand rebounds, but the strategy increases downside exposure."
            },

            {
                letter: "B",
                name: "Moderate spending",
                description:
                    "Continue essential investments while slowing discretionary spending.",

                effects: {
                    cash: -0.10,
                    revenueGrowth: 2,
                    liquidity: 3,
                    profitability: 2,
                    growth: 2,
                    risk: 0,
                    financialPerformance: 7,
                    liquidityManagement: 8,
                    riskManagement: 7,
                    strategicThinking: 8,
                    capitalAllocation: 8,
                    ethics: 1
                },

                consequence:
                    "You prepared without panicking.",

                summary:
                    "Nova preserves flexibility while continuing to invest in the most valuable opportunities."
            },

            {
                letter: "C",
                name: "Cut aggressively",
                description:
                    "Reduce discretionary spending immediately to maximize cash preservation.",

                effects: {
                    cash: 0.35,
                    revenueGrowth: -3,
                    liquidity: 8,
                    profitability: 4,
                    growth: -5,
                    risk: -4,
                    financialPerformance: 5,
                    liquidityManagement: 10,
                    riskManagement: 8,
                    strategicThinking: 3,
                    capitalAllocation: 7,
                    ethics: -2
                },

                consequence:
                    "You shifted Nova into defensive mode.",

                summary:
                    "Nova becomes highly resilient, but aggressive cost cutting could weaken future growth."
            }
        ]
    },


    {
        round: 15,
        category: "BOARD · FINAL STRATEGY",

        title: "The board asks for your final strategy.",

        description:
            "After twelve months of decisions, Nova's board wants your recommendation for the next stage of the company's development.",

        situationTitle:
            "Everything now comes down to your strategy.",

        situationText:
            "You have seen how growth, liquidity, risk, profitability, and ethics interact.",

        situationAdvice:
            "There is no universally correct answer. The board wants to understand what tradeoffs you are willing to make.",

        information: [
            ["ENDING CASH", "dynamic"],
            ["REVENUE", "dynamic"],
            ["RISK EXPOSURE", "dynamic"]
        ],

        options: [

            {
                letter: "A",
                name: "Double down on growth",
                description:
                    "Use Nova's position to aggressively pursue expansion.",

                effects: {
                    cash: -0.35,
                    revenueGrowth: 10,
                    liquidity: -5,
                    profitability: 1,
                    growth: 10,
                    risk: 6,
                    financialPerformance: 5,
                    liquidityManagement: -2,
                    riskManagement: -2,
                    strategicThinking: 10,
                    capitalAllocation: 7,
                    ethics: 1
                },

                consequence:
                    "You committed Nova to an ambitious growth strategy.",

                summary:
                    "Your final recommendation prioritizes scale and market opportunity over maximum financial conservatism."
            },

            {
                letter: "B",
                name: "Balance growth and resilience",
                description:
                    "Continue investing while preserving sufficient liquidity for uncertainty.",

                effects: {
                    cash: -0.10,
                    revenueGrowth: 5,
                    liquidity: 2,
                    profitability: 3,
                    growth: 5,
                    risk: 0,
                    financialPerformance: 9,
                    liquidityManagement: 9,
                    riskManagement: 8,
                    strategicThinking: 10,
                    capitalAllocation: 10,
                    ethics: 2
                },

                consequence:
                    "You chose a balanced long-term strategy.",

                summary:
                    "Your recommendation protects Nova's financial resilience without abandoning its growth opportunity."
            },

            {
                letter: "C",
                name: "Prioritize resilience",
                description:
                    "Build a highly defensive balance sheet before pursuing additional growth.",

                effects: {
                    cash: 0.20,
                    revenueGrowth: 1,
                    liquidity: 9,
                    profitability: 4,
                    growth: -3,
                    risk: -7,
                    financialPerformance: 7,
                    liquidityManagement: 10,
                    riskManagement: 10,
                    strategicThinking: 6,
                    capitalAllocation: 8,
                    ethics: 2
                },

                consequence:
                    "You made resilience the company's priority.",

                summary:
                    "Nova enters its next chapter with substantial financial protection, although growth may slow."
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

function showScreen(screenId, preserveScroll = false) {

    const target = document.getElementById(screenId);

    if (!target) {
        console.error("Screen not found:", screenId);
        return;
    }

    const currentScroll = window.scrollY;

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    target.classList.add("active");

    if (preserveScroll) {

        requestAnimationFrame(() => {

            window.scrollTo({
                top: currentScroll,
                left: 0,
                behavior: "auto"
            });

        });

    } else {

        requestAnimationFrame(() => {

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto"
            });

        });

    }

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
   7. GET CURRENT SCENARIO
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


    /*
        Situation information
    */

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


    /*
        Decision options
    */

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
        Clone effects so we can modify them
        based on current company conditions.
    */

    let effects = {
        ...option.effects
    };


    /*
        Dynamic consequences

        If liquidity is already low, aggressive
        decisions become more dangerous.

        If cash is extremely low, investments
        become even more damaging.
    */

    if (
        company.liquidity < 30 &&
        effects.cash < 0
    ) {

        effects.cash *= 1.20;

        effects.liquidity -= 3;

        effects.risk += 3;

    }


    /*
        Strong liquidity gives the company
        more room to take calculated risks.
    */

    if (
        company.liquidity > 75 &&
        effects.cash < 0
    ) {

        effects.liquidity += 1;

        effects.risk -= 1;

    }


    /*
        Low profitability makes additional
        margin pressure more dangerous.
    */

    if (
        company.profitability < 40 &&
        effects.profitability < 0
    ) {

        effects.risk += 2;

    }


    /*
        Debt makes borrowing decisions more risky.
    */

    if (
        company.debt > 3.5 &&
        effects.debt > 0
    ) {

        effects.risk += 5;

        effects.riskManagement -= 3;

    }


    /*
        Save the effects before showing
        the consequence screen.
    */

    currentEffects = effects;


    /*
        Apply financial changes.
    */

    applyEffects(effects);


    /*
        Track decision style.
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
        Display consequences.
    */

    showConsequences(
        option.consequence,
        option.summary
    );

}


/* =========================================================
   11. APPLY EFFECTS
   ========================================================= */

function applyEffects(effects) {

    company.cash += effects.cash || 0;

    company.revenue +=
        (company.revenue * ((effects.revenueGrowth || 0) / 100));

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
        Track capital usage.
    */

    if ((effects.cash || 0) < 0) {

        company.totalInvestment +=
            Math.abs(effects.cash);

    }

    if ((effects.debt || 0) > 0) {

        company.totalDebtAdded +=
            effects.debt;

    }


    /*
        Prevent impossible values.
    */

    company.cash =
        Math.max(0.05, company.cash);

    company.revenue =
        Math.max(0, company.revenue);

    company.grossMargin =
        clamp(company.grossMargin, 5, 70);

    company.debt =
        Math.max(0, company.debt);

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
        Very low cash creates automatic pressure.

        This makes the simulation state-dependent
        rather than simply adding numbers.
    */

    if (company.cash < 0.75) {

        company.liquidity =
            clamp(company.liquidity - 8);

        company.risk =
            clamp(company.risk + 7);

        company.profitability =
            clamp(company.profitability - 4);

    }


    /*
        Excessive debt creates additional risk.
    */

    if (company.debt > 4.5) {

        company.risk =
            clamp(company.risk + 6);

        company.profitability =
            clamp(company.profitability - 3);

    }


    /*
        Very strong liquidity reduces risk.
    */

    if (company.liquidity > 85) {

        company.risk =
            clamp(company.risk - 2);

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


    /*
        Cash
    */

    const cashChange =
        effects.cash || 0;

    document.getElementById(
        "cash-impact"
    ).textContent =
        formatMoneyChange(cashChange);


    /*
        Revenue
    */

    const revenueChange =
        effects.revenueGrowth || 0;

    document.getElementById(
        "revenue-impact"
    ).textContent =
        formatPercentChange(revenueChange);


    /*
        Risk
    */

    const riskChange =
        effects.risk || 0;

    document.getElementById(
        "risk-impact"
    ).textContent =
        formatNumberChange(riskChange);


    /*
        Strategic thinking
    */

    const strategyChange =
        effects.strategicThinking || 0;

    document.getElementById(
        "strategy-impact"
    ).textContent =
        formatNumberChange(strategyChange);


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

    /*
        Financial KPIs
    */

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


    /*
        Health bars
    */

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


    /*
        Round indicator
    */

    document.getElementById(
        "round-indicator"
    ).textContent =
        `ROUND ${String(company.round).padStart(2, "0")} / ${company.totalRounds}`;


    /*
        Four quarters per year.
    */

    const quarter =
        ((company.round - 1) % 4) + 1;

    const year =
        Math.ceil(company.round / 4);


    document.getElementById(
        "round-subtitle"
    ).textContent =
        `Year ${year} · Q${quarter}`;


    /*
        Current situation
    */

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


    /*
        Progress dots
    */

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
        bar.closest(".health-row");


    if (row) {

        const number =
            row.querySelector("strong");

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
            document.createElement("span");


        if (i < company.round) {

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

    /*
        Final cash
    */

    document.getElementById(
        "final-cash"
    ).textContent =
        `$${company.cash.toFixed(1)}M`;


    /*
        Revenue growth
    */

    const growth =
        (
            (company.revenue -
                company.startingRevenue)
            /
            company.startingRevenue
        ) * 100;


    document.getElementById(
        "final-growth"
    ).textContent =
        `${growth >= 0 ? "+" : ""}${Math.round(growth)}%`;


    /*
        Profitability
    */

    document.getElementById(
        "final-profitability"
    ).textContent =
        Math.round(
            company.profitability
        );


    /*
        Debt status
    */

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


    /*
        Capability scores
    */

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


    /*
        Determine profile.
    */

    determineCFOProfile();


    /*
        Generate personalized development feedback.
    */

    generateDevelopmentFeedback();

}


/* =========================================================
   18. CFO PROFILE
   ========================================================= */

function determineCFOProfile() {

    let profile =
        "THE BALANCED STRATEGIST";

    let description =
        "You consistently balanced growth, financial resilience, and long-term strategy.";


    const growth =
        company.strategicThinking;

    const risk =
        company.riskManagement;

    const liquidity =
        company.liquidityManagement;

    const capital =
        company.capitalAllocation;


    /*
        Growth Strategist
    */

    if (

        company.aggressiveChoices >= 7 &&

        growth >= 70 &&

        company.growth >= 75

    ) {

        profile =
            "THE GROWTH STRATEGIST";

        description =
            "You consistently prioritized expansion and long-term growth, accepting greater financial risk to build Nova's competitive position.";

    }


    /*
        Risk Manager
    */

    else if (

        company.conservativeChoices >= 7 &&

        risk >= 75 &&

        liquidity >= 75

    ) {

        profile =
            "THE RISK MANAGER";

        description =
            "You consistently protected liquidity and reduced downside exposure, even when doing so meant sacrificing some growth opportunities.";

    }


    /*
        Capital Allocator
    */

    else if (

        capital >= 80 &&

        company.financialPerformance >= 70

    ) {

        profile =
            "THE CAPITAL ALLOCATOR";

        description =
            "You demonstrated a strong ability to direct limited financial resources toward opportunities with attractive expected value.";

    }


    /*
        Ethical CFO
    */

    else if (

        company.ethics >= 85 &&

        company.riskManagement >= 75

    ) {

        profile =
            "THE STEWARDSHIP CFO";

        description =
            "You treated financial performance as only one part of your responsibility, placing strong emphasis on governance, trust, and sustainable decision-making.";

    }


    /*
        Balanced Strategist
    */

    else {

        profile =
            "THE BALANCED STRATEGIST";

        description =
            "You generally balanced growth, profitability, liquidity, risk, and long-term strategy rather than optimizing for a single objective.";

    }


    document.getElementById(
        "cfo-profile"
    ).textContent =
        profile;


    document.getElementById(
        "cfo-description"
    ).textContent =
        description;

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
        company.liquidityManagement < 65
    ) {

        feedback.push(
            "Your liquidity decisions could be more disciplined. You frequently committed cash before ensuring that Nova had enough operating runway."
        );

    }

    else if (
        company.liquidityManagement > 82
    ) {

        feedback.push(
            "Liquidity management was one of your strongest capabilities. You consistently protected Nova's ability to fund operations and absorb shocks."
        );

    }


    /*
        Risk
    */

    if (
        company.risk > 65
    ) {

        feedback.push(
            "Your strategy accumulated significant risk exposure. Several of your decisions prioritized upside while leaving Nova more vulnerable to adverse events."
        );

    }

    else if (
        company.risk < 30
    ) {

        feedback.push(
            "You kept risk exposure unusually low. Your next development opportunity may be learning when taking calculated risk creates more value than preserving certainty."
        );

    }


    /*
        Capital allocation
    */

    if (
        company.capitalAllocation >= 82
    ) {

        feedback.push(
            "Your capital allocation decisions were consistently strong, particularly when you compared optionality, expected return, and downside exposure."
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
            "Your decisions were relatively balanced. The biggest opportunity is continuing to improve how you connect short-term financial decisions with Nova's long-term strategy."
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
        `Aggressive decisions: ${company.aggressiveChoices}\n` +
        `Balanced decisions: ${company.balancedChoices}\n` +
        `Conservative decisions: ${company.conservativeChoices}`
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

    if (value === 0) {
        return "$0";
    }

    const absolute =
        Math.abs(value);


    const amount =
        absolute >= 1
            ? `$${absolute.toFixed(1)}M`
            : `$${Math.round(absolute * 1000)}K`;


    return value > 0
        ? `+${amount}`
        : `-${amount}`;

}


function formatPercentChange(value) {

    if (value === 0) {
        return "0%";
    }

    return value > 0
        ? `+${Math.round(value)}%`
        : `${Math.round(value)}%`;

}


function formatNumberChange(value) {

    if (value === 0) {
        return "0";
    }

    return value > 0
        ? `+${Math.round(value)}`
        : `${Math.round(value)}`;

}


/* =========================================================
   22. CLAMP
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
   23. INITIALIZATION
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
   24. GLOBAL FUNCTIONS
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
    "FINANCE FORWARD — SIMULATION ENGINE LOADED"
);
