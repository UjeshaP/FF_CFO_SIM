/* =========================================================
   FINANCE FORWARD — CFO SIMULATION
   Core Game Engine
   ========================================================= */


/* ---------------------------------------------------------
   COMPANY STATE
   --------------------------------------------------------- */

const company = {

    // Financials
    cash: 2.1,
    revenue: 12.4,
    grossMargin: 34,
    debt: 1.8,

    // Performance scores
    liquidity: 68,
    profitability: 61,
    growth: 82,
    risk: 38,

    // CFO capability scores
    financialPerformance: 60,
    liquidityManagement: 60,
    riskManagement: 60,
    strategicThinking: 60,
    capitalAllocation: 60,
    ethics: 60,

    // Simulation tracking
    round: 1,
    totalRounds: 15,

    // Decision history
    decisions: []

};


/* ---------------------------------------------------------
   SCREEN NAVIGATION - updated again
   --------------------------------------------------------- */

function showScreen(screenId, preserveScroll = false) {

    const target = document.getElementById(screenId);

    if (!target) {
        console.error("Screen not found:", screenId);
        return;
    }

    /*
       Remember where the user currently is.

       This is important when a decision updates content
       while the user is already partway down the page.
    */
    const currentScroll = window.scrollY;


    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });


    target.classList.add("active");


    /*
       If this is a dynamic update, restore the exact
       viewport position after the DOM has updated.

       Example:
       User is at 850px down the page
       → clicks something
       → dashboard updates
       → remains around 850px instead of jumping to 0.
    */

    if (preserveScroll) {

        requestAnimationFrame(() => {

            window.scrollTo({
                top: currentScroll,
                left: 0,
                behavior: "auto"
            });

        });

    }

}

/* ---------------------------------------------------------
   UPDATE DASHBOARD
   --------------------------------------------------------- */

function updateDashboard() {

    // Financial KPIs

    document.getElementById("cash-value").textContent =
        `$${company.cash.toFixed(1)}M`;

    document.getElementById("revenue-value").textContent =
        `$${company.revenue.toFixed(1)}M`;

    document.getElementById("margin-value").textContent =
        `${Math.round(company.grossMargin)}%`;

    document.getElementById("debt-value").textContent =
        `$${company.debt.toFixed(1)}M`;


    // Health bars

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


    // Update round indicator

    const roundIndicator =
        document.querySelector(".round-indicator strong");

    const roundSubtitle =
        document.querySelector(".round-indicator span");

    if (roundIndicator) {

        roundIndicator.textContent =
            `ROUND ${String(company.round).padStart(2, "0")} / ${company.totalRounds}`;

    }

    if (roundSubtitle) {

        const quarter =
            Math.ceil(company.round / 4);

        roundSubtitle.textContent =
            `Year 1 · Q${quarter}`;

    }


    // Update progress dots

    const dots =
        document.querySelectorAll(".round-progress span");

    dots.forEach((dot, index) => {

        if (index < company.round) {
            dot.style.background = "#741d2b";
        } else {
            dot.style.background = "#d8cbb9";
        }

    });

}


/* ---------------------------------------------------------
   HEALTH BAR HELPER
   --------------------------------------------------------- */

function updateHealthBar(id, value) {

    const bar = document.getElementById(id);

    if (!bar) return;


    // Keep values between 0 and 100

    value = Math.max(
        0,
        Math.min(100, value)
    );


    bar.style.width = `${value}%`;


    // Find the number next to the bar

    const row = bar.closest(".health-row");

    if (row) {

        const number = row.querySelector("strong");

        if (number) {
            number.textContent =
                Math.round(value);
        }

    }

}


/* ---------------------------------------------------------
   DECISION ENGINE
   --------------------------------------------------------- */

function makeDecision(decision) {

    let effects = {};


    /* -----------------------------------------------------
       DECISION A — AGGRESSIVE
       ----------------------------------------------------- */

    if (decision === "aggressive") {

        effects = {

            cash: -0.75,

            revenue: +1.2,

            grossMargin: -1,

            liquidity: -8,

            profitability: -2,

            growth: +8,

            risk: -6,

            financialPerformance: +2,

            liquidityManagement: -5,

            riskManagement: -5,

            strategicThinking: +7,

            capitalAllocation: +5,

            ethics: 0,

            cashImpact: "-$750K",
            revenueImpact: "+10%",
            riskImpact: "+6 risk",
            strategyImpact: "+7"

        };

        showConsequences(
            "You chose to accelerate growth.",
            "Nova now has a larger sales capacity, but the investment puts additional pressure on liquidity."
        );

    }


    /* -----------------------------------------------------
       DECISION B — BALANCED
       ----------------------------------------------------- */

    else if (decision === "balanced") {

        effects = {

            cash: -0.40,

            revenue: +0.75,

            grossMargin: 0,

            liquidity: -3,

            profitability: +1,

            growth: +5,

            risk: +2,

            financialPerformance: +5,

            liquidityManagement: +5,

            riskManagement: +4,

            strategicThinking: +6,

            capitalAllocation: +7,

            ethics: 0,

            cashImpact: "-$400K",
            revenueImpact: "+6%",
            riskImpact: "+2 risk",
            strategyImpact: "+6"

        };

        showConsequences(
            "You chose a measured expansion.",
            "Nova gains additional sales capacity while preserving a meaningful liquidity buffer."
        );

    }


    /* -----------------------------------------------------
       DECISION C — CONSERVATIVE
       ----------------------------------------------------- */

    else if (decision === "conservative") {

        effects = {

            cash: 0,

            revenue: +0.25,

            grossMargin: +1,

            liquidity: +6,

            profitability: +4,

            growth: -4,

            risk: +6,

            financialPerformance: +4,

            liquidityManagement: +8,

            riskManagement: +7,

            strategicThinking: +2,

            capitalAllocation: +3,

            ethics: 0,

            cashImpact: "$0",
            revenueImpact: "+2%",
            riskImpact: "-6 risk",
            strategyImpact: "+2"

        };

        showConsequences(
            "You chose to protect liquidity.",
            "Nova gives up some potential growth in exchange for a stronger financial cushion."
        );

    }


    // Apply effects

    applyEffects(effects);


    // Save decision

    company.decisions.push({
        round: company.round,
        choice: decision,
        effects: effects
    });


    // Update dashboard

    updateDashboard();

}


/* ---------------------------------------------------------
   APPLY DECISION EFFECTS
   --------------------------------------------------------- */

function applyEffects(effects) {

    company.cash += effects.cash;

    company.revenue += effects.revenue;

    company.grossMargin += effects.grossMargin;

    company.liquidity += effects.liquidity;

    company.profitability += effects.profitability;

    company.growth += effects.growth;

    company.risk += effects.risk;


    company.financialPerformance +=
        effects.financialPerformance;

    company.liquidityManagement +=
        effects.liquidityManagement;

    company.riskManagement +=
        effects.riskManagement;

    company.strategicThinking +=
        effects.strategicThinking;

    company.capitalAllocation +=
        effects.capitalAllocation;

    company.ethics +=
        effects.ethics;


    // Keep scores between 0 and 100

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

}


/* ---------------------------------------------------------
   LIMIT VALUES
   --------------------------------------------------------- */

function clamp(value) {

    return Math.max(
        0,
        Math.min(100, value)
    );

}


/* ---------------------------------------------------------
   CONSEQUENCE SCREEN
   --------------------------------------------------------- */

function showConsequences(title, summary) {

    document.querySelector(
        "#consequence-screen h2"
    ).textContent = title;


    document.getElementById(
        "consequence-summary"
    ).textContent = summary;


    const latestDecision =
        company.decisions[company.decisions.length - 1];

    /*
       latestDecision may not exist yet because the
       decision is pushed after this function runs.

       So we instead calculate the displayed values
       from the current choice.
    */


    // The most recent effects are temporarily stored
    // by makeDecision below.

    if (window.currentEffects) {

        document.getElementById(
            "cash-impact"
        ).textContent =
            window.currentEffects.cashImpact;


        document.getElementById(
            "revenue-impact"
        ).textContent =
            window.currentEffects.revenueImpact;


        document.getElementById(
            "risk-impact"
        ).textContent =
            window.currentEffects.riskImpact;


        document.getElementById(
            "strategy-impact"
        ).textContent =
            window.currentEffects.strategyImpact;

    }


    showScreen("consequence-screen");

}


/* ---------------------------------------------------------
   CONTINUE AFTER CONSEQUENCE
   --------------------------------------------------------- */

function continueSimulation() {

    /*
       For now, return to the dashboard.

       Later this function will:
       1. Advance the round
       2. Generate the next scenario
       3. Update the scenario text
       4. Increase difficulty
       5. Eventually trigger the final CFO report
    */


    if (company.round < company.totalRounds) {

        company.round++;

        updateDashboard();

        showScreen("dashboard-screen");

    }

    else {

        generateFinalReport();

        showScreen("results-screen");

    }

}


/* ---------------------------------------------------------
   FINAL CFO REPORT
   --------------------------------------------------------- */

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
        Math.round(company.profitability);


    // Debt classification

    let debtStatus = "Low";

    if (company.debt > 3.5) {
        debtStatus = "High";
    }

    else if (company.debt > 2.5) {
        debtStatus = "Moderate";
    }


    document.getElementById(
        "final-debt"
    ).textContent = debtStatus;


    // Capability scores

    const scoreRows =
        document.querySelectorAll(
            ".score-row strong"
        );


    const scores = [

        company.financialPerformance,

        company.liquidityManagement,

        company.riskManagement,

        company.strategicThinking,

        company.capitalAllocation,

        company.ethics

    ];


    scoreRows.forEach((row, index) => {

        if (scores[index] !== undefined) {

            row.textContent =
                Math.round(scores[index]);

        }

    });


    // Determine CFO profile

    determineCFOProfile();

}


/* ---------------------------------------------------------
   CFO PROFILE
   --------------------------------------------------------- */

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
       Growth-oriented CFO
    */

    if (
        growth >= 75 &&
        capital >= 70 &&
        liquidity < 65
    ) {

        profile =
            "THE GROWTH STRATEGIST";

        description =
            "You consistently prioritized expansion and long-term growth, accepting greater financial risk to build the company.";

    }


    /*
       Risk-averse CFO
    */

    else if (
        risk >= 75 &&
        liquidity >= 75 &&
        growth < 65
    ) {

        profile =
            "THE RISK MANAGER";

        description =
            "You consistently protected liquidity and reduced downside risk, even when doing so meant sacrificing some growth opportunities.";

    }


    /*
       Capital allocator
    */

    else if (
        capital >= 80 &&
        company.financialPerformance >= 70
    ) {

        profile =
            "THE CAPITAL ALLOCATOR";

        description =
            "You demonstrated a strong ability to direct limited financial resources toward the opportunities with the greatest expected value.";

    }


    /*
       Balanced strategist
    */

    else {

        profile =
            "THE BALANCED STRATEGIST";

        description =
            "You generally balanced growth, profitability, liquidity, and risk rather than optimizing for a single financial objective.";

    }


    document.getElementById(
        "cfo-profile"
    ).textContent = profile;


    document.getElementById(
        "cfo-description"
    ).textContent = description;

}


/* ---------------------------------------------------------
   INITIALIZE GAME
   --------------------------------------------------------- */

function initializeGame() {

    updateDashboard();

}


/* ---------------------------------------------------------
   START GAME
   --------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeGame();

    }
);
//addition
document.addEventListener("DOMContentLoaded", function () {
    updateDashboard();
});

window.showScreen = showScreen;
window.makeDecision = makeDecision;
window.continueSimulation = continueSimulation;

console.log("FINANCE FORWARD JS LOADED");
console.log("showScreen exists:", typeof showScreen);
