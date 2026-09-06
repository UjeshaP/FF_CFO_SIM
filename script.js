* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: #f4f3ef;
    color: #171717;
}

.landing {
    min-height: 100vh;
    padding: 32px 5vw;
    display: flex;
    flex-direction: column;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #c9c8c3;
    padding-bottom: 18px;
}

.logo {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 2px;
}

.version {
    font-size: 11px;
    letter-spacing: 1.5px;
    color: #777;
}

.hero {
    max-width: 900px;
    margin: auto 0;
    padding: 80px 0;
}

.eyebrow {
    font-size: 12px;
    letter-spacing: 2px;
    font-weight: 700;
    margin-bottom: 25px;
}

h1 {
    font-size: clamp(55px, 8vw, 110px);
    line-height: 0.92;
    letter-spacing: -5px;
    font-weight: 700;
    margin-bottom: 35px;
}

h1 span {
    color: #777;
}

.intro {
    max-width: 520px;
    font-size: 18px;
    line-height: 1.6;
    color: #555;
    margin-bottom: 40px;
}

.start-button {
    border: none;
    background: #171717;
    color: white;
    padding: 18px 25px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.5px;
    cursor: pointer;
    display: flex;
    gap: 35px;
    align-items: center;
    transition: 0.2s;
}

.start-button:hover {
    transform: translateX(5px);
}

.start-button span {
    font-size: 20px;
}

.stats-preview {
    border-top: 1px solid #c9c8c3;
    padding-top: 20px;
    display: flex;
    gap: 80px;
}

.stats-preview div {
    display: flex;
    flex-direction: column;
    gap: 7px;
}

.stats-preview span {
    font-size: 10px;
    letter-spacing: 1.5px;
    color: #777;
}

.stats-preview strong {
    font-size: 12px;
    letter-spacing: 0.5px;
}

@media (max-width: 700px) {

    .landing {
        padding: 25px;
    }

    h1 {
        letter-spacing: -3px;
    }

    .stats-preview {
        gap: 25px;
        flex-wrap: wrap;
    }

}
