/* =========================================================
   FINANCE FORWARD — CFO SIMULATION
   GAME ENGINE
   ========================================================= */


/* =========================================================
   1. COMPANY STATE
   ========================================================= */

const company = {

    cash: 2.1,
    revenue: 12.4,
    grossMargin: 34,
    debt: 1.8,

    liquidity: 68,
    profitability: 61,
    growth: 82,
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

    /*
       Hidden variables that allow earlier
       decisions to influence later events.
    */

    salesCapacity: 0,
    employeeMorale: 70,
    customerConcentration: 30,
    operationalEfficiency: 50,
    marketPosition: 50,

    /*
       Used for final evaluation.
    */

    aggressiveChoices: 0,
    balancedChoices: 0,
    conservativeChoices: 0

};


/* =========================================================
   2. SCENARIOS
   ========================================================= */

const scenarios = [

    /* -----------------------------------------------------
       ROUND 1
    ----------------------------------------------------- */

    {
        title: "How aggressively will you grow?",

        category: "LIQUIDITY · GROWTH",

        description:
            "Your sales team believes Nova can increase revenue by 20% next year if you expand the sales team now.",

        information: [
            ["REQUIRED INVESTMENT", "$750K"],
            ["EXPECTED REVENUE GROWTH", "+20%"],
            ["CURRENT CASH", "$2.1M"]
        ],

        choices: [

            {
                id: "aggressive",

                title: "Invest aggressively",

                description:
                    "Spend the $750K and build the sales team immediately.",

                effects: {
                    cash: -0.75,
                    revenue: 1.2,
                    liquidity: -8,
                    profitability: -2,
                    growth: 8,
                    risk: 6,

                    salesCapacity: 20,

                    financialPerformance: 2,
                    liquidityManagement: -5,
                    riskManagement: -5,
                    strategicThinking: 7,
                    capitalAllocation: 5
                }
            },

            {
                id: "balanced",

                title: "Take a balanced approach",

                description:
                    "Invest $400K now and evaluate performance before expanding further.",

                effects: {
                    cash: -0.40,
                    revenue: 0.75,
                    liquidity: -3,
                    profitability: 1,
                    growth: 5,
                    risk: 2,

                    salesCapacity: 10,

                    financialPerformance: 5,
                    liquidityManagement: 5,
                    riskManagement: 4,
                    strategicThinking: 6,
                    capitalAllocation: 7
                }
            },

            {
                id: "conservative",

                title: "Protect liquidity",

                description:
                    "Delay the expansion and preserve cash until demand is more certain.",

                effects: {
                    cash: 0,
                    revenue: 0.25,
                    liquidity: 6,
                    profitability: 4,
                    growth: -4,
                    risk: -6,

                    financialPerformance: 4,
                    liquidityManagement: 8,
                    riskManagement: 7,
                    strategicThinking: 2,
                    capitalAllocation: 3
                }
            }

        ]
    },


    /* -----------------------------------------------------
       ROUND 2
    ----------------------------------------------------- */

    {
        title: "Your team is running out of capacity.",

        category: "HIRING · OPERATIONS",

        description:
            "Customer demand is increasing, but your current employees are approaching capacity. Your COO recommends hiring before service quality declines.",

        information: [
            ["HIRING COST", "$300K"],
            ["EXPECTED CAPACITY", "+15%"],
            ["CURRENT MORALE", "70"]
        ],

        choices: [

            {
                id: "aggressive",

                title: "Hire ahead of demand",

                description:
                    "Build capacity now so Nova can continue growing without operational bottlenecks.",

                effects: {
                    cash: -0.30,
                    liquidity: -3,
                    profitability: -1,
                    growth: 5,
                    risk: 3,

                    employeeMorale: 8,
                    operationalEfficiency: 8,

                    financialPerformance: 2,
                    liquidityManagement: -2,
                    riskManagement: -2,
                    strategicThinking: 6,
                    capitalAllocation: 4
                }
            },

            {
                id: "balanced",

                title: "Hire selectively",

                description:
                    "Fill only the most critical positions while monitoring demand.",

                effects: {
                    cash: -0.15,
                    liquidity: -1,
                    profitability: 1,
                    growth: 3,
                    risk: 1,

                    employeeMorale: 4,
                    operationalEfficiency: 5,

                    financialPerformance: 4,
                    liquidityManagement: 4,
                    riskManagement: 4,
                    strategicThinking: 5,
                    capitalAllocation: 6
                }
            },

            {
                id: "conservative",

                title: "Freeze hiring",

                description:
                    "Maintain the current team and accept slower growth while preserving cash.",

                effects: {
                    cash: 0,
                    liquidity: 4,
                    profitability: 3,
                    growth: -2,
                    risk: 2,

                    employeeMorale: -5,
                    operationalEfficiency: -4,

                    financialPerformance: 3,
                    liquidityManagement: 7,
                    riskManagement: 6,
                    strategicThinking: 2,
                    capitalAllocation: 3
                }
            }

        ]
    },


    /* -----------------------------------------------------
       ROUND 3
    ----------------------------------------------------- */

    {
        title: "Inventory is tying up your cash.",

        category: "WORKING CAPITAL",

        description:
            "Nova's rapid growth has increased inventory requirements. Your operations team wants to build a larger inventory buffer.",

        information: [
            ["ADDITIONAL INVENTORY", "$500K"],
            ["STOCKOUT RISK", "Moderate"],
            ["CASH AVAILABLE", "Current"]
        ],

        choices: [

            {
                id: "aggressive",

                title: "Build a large inventory buffer",

                description:
                    "Accept the cash cost to minimize stockouts and maximize sales availability.",

                effects: {
                    cash: -0.50,
                    liquidity: -7,
                    growth: 5,
                    risk: 3,
                    operationalEfficiency: 5,

                    financialPerformance: 2,
                    liquidityManagement: -5,
                    riskManagement: -2,
                    strategicThinking: 5,
                    capitalAllocation: 4
                }
            },

            {
                id: "balanced",

                title: "Maintain a moderate buffer",

                description:
                    "Increase inventory enough to protect service levels without overcommitting cash.",

                effects: {
                    cash: -0.25,
                    liquidity: -2,
                    growth: 3,
                    risk: 0,
                    operationalEfficiency: 4,

                    financialPerformance: 5,
                    liquidityManagement: 5,
                    riskManagement: 5,
                    strategicThinking: 6,
                    capitalAllocation: 6
                }
            },

            {
                id: "conservative",

                title: "Minimize inventory",

                description:
                    "Keep inventory lean and preserve cash, accepting a higher chance of stockouts.",

                effects: {
                    cash: 0,
                    liquidity: 5,
                    growth: -3,
                    risk: 2,
                    operationalEfficiency: -3,

                    financialPerformance: 4,
                    liquidityManagement: 8,
                    riskManagement: 5,
                    strategicThinking: 3,
                    capitalAllocation: 4
                }
            }

        ]
    },


    /* -----------------------------------------------------
       ROUND 4
    ----------------------------------------------------- */

    {
        title: "Your pricing strategy is under review.",

        category: "PRICING · PROFITABILITY",

        description:
            "Nova's competitors are discounting heavily. Your sales team wants to lower prices to accelerate customer acquisition.",

        information: [
            ["CURRENT MARGIN", "34%"],
            ["COMPETITOR DISCOUNT", "10%"],
            ["CUSTOMER GROWTH POTENTIAL", "High"]
        ],

        choices: [

            {
                id: "aggressive",

                title: "Cut prices significantly",

                description:
                    "Prioritize market share and customer acquisition over short-term margin.",

                effects: {
                    revenue: 1.0,
                    grossMargin: -4,
                    profitability: -3,
                    growth: 8,
                    risk: 4,

                    marketPosition: 10,

                    financialPerformance: -2,
                    liquidityManagement: -1,
                    riskManagement: -2,
                    strategicThinking: 7,
                    capitalAllocation: 3
                }
            },

            {
                id: "balanced",

                title: "Offer targeted discounts",

                description:
                    "Use selective promotions without permanently lowering prices.",

                effects: {
                    revenue: 0.7,
                    grossMargin: -1,
                    profitability: 1,
                    growth: 5,
                    risk: 1,

                    marketPosition: 6,

                    financialPerformance: 5,
                    liquidityManagement: 4,
                    riskManagement: 5,
                    strategicThinking: 7,
                    capitalAllocation: 5
                }
            },

            {
                id: "conservative",

                title: "Protect pricing",

                description:
                    "Maintain margins and compete primarily through product value.",

                effects: {
                    revenue: 0.3,
                    grossMargin: 2,
                    profitability: 4,
                    growth: -2,
                    risk: -2,

                    marketPosition: 2,

                    financialPerformance: 7,
                    liquidityManagement: 6,
                    riskManagement: 6,
                    strategicThinking: 4,
                    capitalAllocation: 5
                }
            }

        ]
    },


    /* -----------------------------------------------------
       ROUND 5
    ----------------------------------------------------- */

    {
        title: "Marketing wants a larger budget.",

        category: "GROWTH · CAPITAL ALLOCATION",

        description:
            "The marketing team believes an additional campaign could significantly increase customer acquisition.",

        information: [
            ["CAMPAIGN COST", "$450K"],
            ["EXPECTED CUSTOMER GROWTH", "+18%"],
            ["PAYBACK PERIOD", "8–14 months"]
        ],

        choices: [

            {
                id: "aggressive",

                title: "Fund the full campaign",

                description:
                    "Commit the entire budget and pursue rapid customer acquisition.",

                effects: {
                    cash: -0.45,
                    revenue: 1.1,
                    liquidity: -5,
                    profitability: -1,
                    growth: 7,
                    risk: 4,

                    financialPerformance: 2,
                    liquidityManagement: -3,
                    riskManagement: -2,
                    strategicThinking: 7,
                    capitalAllocation: 8
                }
            },

            {
                id: "balanced",

                title: "Run a pilot campaign",

                description:
                    "Fund a smaller campaign and scale only if the results justify it.",

                effects: {
                    cash: -0.20,
                    revenue: 0.6,
                    liquidity: -2,
                    profitability: 1,
                    growth: 4,
                    risk: 1,

                    financialPerformance: 5,
                    liquidityManagement: 5,
                    riskManagement: 6,
                    strategicThinking: 7,
                    capitalAllocation: 8
                }
            },

            {
                id: "conservative",

                title: "Keep the current budget",

                description:
                    "Avoid additional spending until the return on existing marketing becomes clearer.",

                effects: {
                    liquidity: 3,
                    profitability: 3,
                    growth: -2,
                    risk: -2,

                    financialPerformance: 5,
                    liquidityManagement: 7,
                    riskManagement: 7,
                    strategicThinking: 3,
                    capitalAllocation: 5
                }
            }

        ]
    }

];


/* =========================================================
   4. TEMPORARY SCENARIO GENERATION
   ========================================================= */

/*
   For now we only need the first five scenarios
   fully written.

   Rounds 6–15 can be added using exactly the same
   structure.

   This means we're building the ENGINE first rather
   than hard-coding 15 giant screens into HTML.
*/


/* =========================================================
   5. LOAD CURRENT SCENARIO
   ========================================================= */

function loadScenario() {

    const scenario = scenarios[company.round - 1];

    if (!scenario) {

        generateFinalReport();

        showScreen("results-screen");

        return;
    }


    document.querySelector(
        "#scenario-screen .scenario-meta span:first-child"
    ).textContent =
        `ROUND ${String(company.round).padStart(2, "0")} / ${company.totalRounds}`;


    document.querySelector(
        "#scenario-screen .scenario-meta span:last-child"
    ).textContent =
        scenario.category;


    document.querySelector(
        "#scenario-screen .scenario-header h2"
    ).textContent =
        scenario.title;


    document.querySelector(
        "#scenario-screen .scenario-header p"
    ).textContent =
        scenario.description;


    /*
       Update information cards.
    */

    const infoPanel =
        document.querySelector(".information-panel");

    infoPanel.innerHTML = "";

    scenario.information.forEach(info => {

        const div = document.createElement("div");

        div.innerHTML = `
            <span>${info[0]}</span>
            <strong>${info[1]}</strong>
        `;

        infoPanel.appendChild(div);

    });


    /*
       Update choices.
    */

    const options =
        document.querySelector(".decision-options");

    options.innerHTML = "";

    scenario.choices.forEach((choice, index) => {

        const button =
            document.createElement("button");

        button.className = "decision-card";

        button.onclick = () =>
            makeDecision(choice.id);

        button.innerHTML = `
            <span class="option-letter">
                ${String.fromCharCode(65 + index)}
            </span>

            <div>
                <strong>${choice.title}</strong>

                <p>
                    ${choice.description}
                </p>
            </div>
        `;

        options.appendChild(button);

    });

}


/* =========================================================
   6. SCREEN NAVIGATION
   ========================================================= */

function showScreen(screenId, preserveScroll = false) {

    const target =
        document.getElementById(screenId);

    if (!target) return;


    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    target.classList.add("active");


    /*
       Real screen transitions start at the top.

       Dynamic dashboard updates can preserve scroll.
    */

    if (!preserveScroll) {

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
   7. MAKE DECISION
   ========================================================= */

function makeDecision(decisionId) {

    const scenario =
        scenarios[company.round - 1];

    if (!scenario) return;


    const choice =
        scenario.choices.find(
            option => option.id === decisionId
        );

    if (!choice) return;


    /*
       Track decision style.
    */

    if (decisionId === "aggressive")
        company.aggressiveChoices++;

    if (decisionId === "balanced")
        company.balancedChoices++;

    if (decisionId === "conservative")
        company.conservativeChoices++;


    /*
       Apply the effects.
    */

    applyEffects(choice.effects);


    /*
       Save decision history.
    */

    company.decisions.push({

        round: company.round,

        scenario: scenario.title,

        choice: choice.title,

        decisionType: decisionId,

        effects: choice.effects

    });


    /*
       Calculate consequences AFTER the effects
       are applied.
    */

    showConsequences(
        scenario,
        choice
    );

}


/* =========================================================
   8. APPLY EFFECTS
   ========================================================= */

function applyEffects(effects) {

    Object.keys(effects).forEach(key => {

        if (
            key in company &&
            typeof company[key] === "number"
        ) {

            company[key] += effects[key];

        }

    });


    /*
       Keep financial health scores in bounds.
    */

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
       Keep company-specific variables sensible.
    */

    company.employeeMorale =
        clamp(company.employeeMorale);

    company.operationalEfficiency =
        clamp(company.operationalEfficiency);

    company.marketPosition =
        clamp(company.marketPosition);

    company.customerConcentration =
        clamp(company.customerConcentration);

}


/* =========================================================
   9. CLAMP
   ========================================================= */

function clamp(value) {

    return Math.max(
        0,
        Math.min(100, value)
    );

}


/* =========================================================
   10. CONSEQUENCES
   ========================================================= */

function showConsequences(
    scenario,
    choice
) {

    document.querySelector(
        "#consequence-screen h2"
    ).textContent =
        choice.title;


    document.getElementById(
        "consequence-summary"
    ).textContent =
        generateConsequence(choice);


    /*
       Calculate visible impact values directly
       from the choice.
    */

    const effects =
        choice.effects;


    document.getElementById(
        "cash-impact"
    ).textContent =
        formatMoneyImpact(effects.cash);


    document.getElementById(
        "revenue-impact"
    ).textContent =
        formatPercentImpact(effects.revenue);


    document.getElementById(
        "risk-impact"
    ).textContent =
        formatRiskImpact(effects.risk);


    document.getElementById(
        "strategy-impact"
    ).textContent =
        formatScoreImpact(
            effects.strategicThinking
        );


    showScreen(
        "consequence-screen"
    );

}


/* =========================================================
   11. CONSEQUENCE TEXT
   ========================================================= */

function generateConsequence(choice) {

    if (choice.id === "aggressive") {

        return "You prioritized growth and accepted greater financial exposure. Nova gains momentum, but the decision places additional pressure on the company's financial resilience.";

    }

    if (choice.id === "balanced") {

        return "You pursued the opportunity while limiting downside exposure. Nova gains additional capacity without committing excessive resources.";

    }

    return "You prioritized financial resilience. Nova sacrifices some potential growth, but preserves flexibility and reduces downside exposure.";

}


/* =========================================================
   12. FORMAT IMPACTS
   ========================================================= */

function formatMoneyImpact(value) {

    if (value === undefined)
        return "—";

    if (value === 0)
        return "$0";

    return value > 0
        ? `+$${Math.abs(value * 1000).toFixed(0)}K`
        : `-$${Math.abs(value * 1000).toFixed(0)}K`;

}


function formatPercentImpact(value) {

    if (value === undefined)
        return "—";

    if (value === 0)
        return "0%";

    return value > 0
        ? `+${Math.round((value / 12.4) * 100)}%`
        : `-${Math.round((Math.abs(value) / 12.4) * 100)}%`;

}


function formatRiskImpact(value) {

    if (value === undefined)
        return "—";

    if (value === 0)
        return "0";

    /*
       Higher risk = worse.
    */

    return value > 0
        ? `+${value} exposure`
        : `${value} exposure`;

}


function formatScoreImpact(value) {

    if (value === undefined)
        return "—";

    if (value === 0)
        return "0";

    return value > 0
        ? `+${value}`
        : `${value}`;

}


/* =========================================================
   13. CONTINUE
   ========================================================= */

function continueSimulation() {

    if (
        company.round >=
        company.totalRounds
    ) {

        generateFinalReport();

        showScreen("results-screen");

        return;
    }


    company.round++;


    updateDashboard();


    loadScenario();


    showScreen("dashboard-screen");

}


/* =========================================================
   14. DASHBOARD
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
        100 - company.risk
    );


    const roundIndicator =
        document.querySelector(
            ".round-indicator strong"
        );


    const roundSubtitle =
        document.querySelector(
            ".round-indicator span"
        );


    if (roundIndicator) {

        roundIndicator.textContent =
            `ROUND ${String(company.round).padStart(2, "0")} / ${company.totalRounds}`;

    }


    if (roundSubtitle) {

        const year =
            Math.ceil(company.round / 5);

        const decision =
            ((company.round - 1) % 5) + 1;

        roundSubtitle.textContent =
            `Year ${year} · Decision ${decision}/5`;

    }


    /*
       Progress dots.
    */

    const dots =
        document.querySelectorAll(
            ".round-progress span"
        );


    dots.forEach((dot, index) => {

        dot.style.background =
            index < company.round
                ? "#741d2b"
                : "#d8cbb9";

    });

}


/* =========================================================
   15. HEALTH BAR
   ========================================================= */

function updateHealthBar(id, value) {

    const bar =
        document.getElementById(id);

    if (!bar) return;


    value = clamp(value);


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
   16. FINAL REPORT
   ========================================================= */

function generateFinalReport() {

    document.getElementById(
        "final-cash"
    ).textContent =
        `$${company.cash.toFixed(1)}M`;


    document.getElementById(
        "final-growth"
    ).textContent =
        `+${Math.round(
            ((company.revenue - 12.4) / 12.4) * 100
        )}%`;


    document.getElementById(
        "final-profitability"
    ).textContent =
        Math.round(
            company.profitability
        );


    let debtStatus = "Low";

    if (company.debt > 3.5)
        debtStatus = "High";

    else if (company.debt > 2.5)
        debtStatus = "Moderate";


    document.getElementById(
        "final-debt"
    ).textContent =
        debtStatus;


    const scores = [

        company.financialPerformance,
        company.liquidityManagement,
        company.riskManagement,
        company.strategicThinking,
        company.capitalAllocation,
        company.ethics

    ];


    document
        .querySelectorAll(".score-row strong")
        .forEach((row, index) => {

            row.textContent =
                Math.round(scores[index]);

        });


    determineCFOProfile();

}


/* =========================================================
   17. CFO PROFILE
   ========================================================= */

function determineCFOProfile() {

    let profile =
        "THE BALANCED STRATEGIST";

    let description =
        "You generally balanced growth, profitability, liquidity, and risk rather than optimizing for a single objective.";


    /*
       Growth strategist
    */

    if (
        company.aggressiveChoices >= 8 &&
        company.strategicThinking >= 75
    ) {

        profile =
            "THE GROWTH STRATEGIST";

        description =
            "You consistently prioritized expansion and market opportunity, accepting greater financial exposure to build Nova's long-term position.";

    }


    /*
       Risk manager
    */

    else if (
        company.conservativeChoices >= 8 &&
        company.liquidityManagement >= 75
    ) {

        profile =
            "THE RISK MANAGER";

        description =
            "You consistently protected liquidity and reduced downside exposure, even when doing so meant sacrificing some growth opportunities.";

    }


    /*
       Capital allocator
    */

    else if (
        company.capitalAllocation >= 80 &&
        company.financialPerformance >= 75
    ) {

        profile =
            "THE CAPITAL ALLOCATOR";

        description =
            "You demonstrated a strong ability to direct limited financial resources toward opportunities with the greatest expected value.";

    }


    /*
       Balanced strategist
    */

    else {

        profile =
            "THE BALANCED STRATEGIST";

        description =
            "You generally balanced growth, profitability, liquidity, and risk while adapting your strategy to changing circumstances.";

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
   18. INITIALIZATION
   ========================================================= */

function initializeGame() {

    updateDashboard();

    loadScenario();

}


document.addEventListener(
    "DOMContentLoaded",
    initializeGame
);


/* =========================================================
   19. GLOBAL FUNCTIONS
   ========================================================= */

window.showScreen =
    showScreen;

window.makeDecision =
    makeDecision;

window.continueSimulation =
    continueSimulation;


console.log(
    "FINANCE FORWARD — GAME ENGINE LOADED"
);
