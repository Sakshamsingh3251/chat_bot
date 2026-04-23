// ======================================
// TAB SWITCHING
// ======================================

const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

navBtns.forEach(btn => {

    btn.addEventListener('click', () => {

        const tabName = btn.getAttribute('data-tab');

        // Remove active class
        navBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));

        // Add active class
        btn.classList.add('active');

        const activeTab = document.getElementById(tabName);

        if (activeTab) {
            activeTab.classList.add('active');
        }
    });
});

// ======================================
// CHATBOT ELEMENTS
// ======================================

const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const messagesBox = document.getElementById("messagesBox");
const sendBtn = document.getElementById("sendBtn");
const typingIndicator = document.getElementById("typingIndicator");

// ======================================
// ADD MESSAGE FUNCTION
// ======================================

function addMessage(text, className) {

    const messageDiv = document.createElement("div");

    messageDiv.className = `message ${className}`;

    const contentDiv = document.createElement("div");

    contentDiv.className = "message-content";

    const p = document.createElement("p");

    p.textContent = text;

    contentDiv.appendChild(p);

    messageDiv.appendChild(contentDiv);

    messagesBox.appendChild(messageDiv);

    messagesBox.scrollTop = messagesBox.scrollHeight;
}

// ======================================
// SHOW TYPING
// ======================================

function showTypingIndicator() {

    if (typingIndicator) {

        typingIndicator.style.display = "flex";

        messagesBox.scrollTop = messagesBox.scrollHeight;
    }
}

// ======================================
// HIDE TYPING
// ======================================

function hideTypingIndicator() {

    if (typingIndicator) {

        typingIndicator.style.display = "none";
    }
}

// ======================================
// CHAT SUBMIT
// ======================================

chatForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const message = userInput.value.trim();

    if (!message) return;

    // USER MESSAGE
    addMessage(message, "user-message");

    // CLEAR INPUT
    userInput.value = "";

    // SHOW TYPING
    showTypingIndicator();

    // DISABLE BUTTON
    sendBtn.disabled = true;

    try {

        const response = await fetch("chatbot.php", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                action: "chat",
                message: message
            })
        });

        const data = await response.json();

        console.log("CHAT RESPONSE:", data);

        if (data.success) {

            addMessage(data.response, "bot-message");

        } else {

            let errorMessage = "Error: ";

            errorMessage += data.error || "Unknown error";

            if (data.debug_response) {

                errorMessage += "\n\n";

                errorMessage += JSON.stringify(
                    data.debug_response,
                    null,
                    2
                );
            }

            addMessage(errorMessage, "bot-message");
        }

    } catch (error) {

        console.error(error);

        addMessage(
            "Server connection error",
            "bot-message"
        );

    } finally {

        hideTypingIndicator();

        sendBtn.disabled = false;

        userInput.focus();
    }
});

// ======================================
// NEWS FUNCTIONALITY
// ======================================

const generateNewsBtn = document.getElementById("generateNewsBtn");
const newsContainer = document.getElementById("newsContainer");

if (generateNewsBtn) {

    generateNewsBtn.addEventListener("click", async () => {

        generateNewsBtn.disabled = true;

        newsContainer.innerHTML = `
            <p class="placeholder">
                Loading news...
            </p>
        `;

        try {

            const response = await fetch("chatbot.php", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    action: "news"
                })
            });

            const data = await response.json();

            console.log("NEWS RESPONSE:", data);

            if (data.success) {

                displayCards(data.items, newsContainer);

            } else {

                newsContainer.innerHTML = `
                    <p class="placeholder">
                        ${data.error || "Failed to fetch news"}
                    </p>
                `;
            }

        } catch (error) {

            console.error(error);

            newsContainer.innerHTML = `
                <p class="placeholder">
                    Server connection error
                </p>
            `;
        }

        generateNewsBtn.disabled = false;
    });
}

// ======================================
// FACTS FUNCTIONALITY
// ======================================

const generateFactsBtn = document.getElementById("generateFactsBtn");
const factsContainer = document.getElementById("factsContainer");

if (generateFactsBtn) {

    generateFactsBtn.addEventListener("click", async () => {

        generateFactsBtn.disabled = true;

        factsContainer.innerHTML = `
            <p class="placeholder">
                Loading fun facts...
            </p>
        `;

        try {

            const response = await fetch("chatbot.php", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    action: "facts"
                })
            });

            const data = await response.json();

            console.log("FACTS RESPONSE:", data);

            if (data.success) {

                displayCards(data.items, factsContainer);

            } else {

                factsContainer.innerHTML = `
                    <p class="placeholder">
                        ${data.error || "Failed to fetch facts"}
                    </p>
                `;
            }

        } catch (error) {

            console.error(error);

            factsContainer.innerHTML = `
                <p class="placeholder">
                    Server connection error
                </p>
            `;
        }

        generateFactsBtn.disabled = false;
    });
}

// ======================================
// DISPLAY CARDS
// ======================================

function displayCards(items, container) {

    container.innerHTML = "";

    if (!items || items.length === 0) {

        container.innerHTML = `
            <p class="placeholder">
                No data found
            </p>
        `;

        return;
    }

    items.forEach((item, index) => {

        const card = document.createElement("div");

        card.className = "card";

        // NUMBER
        const numberDiv = document.createElement("div");

        numberDiv.className = "card-number";

        numberDiv.textContent = index + 1;

        // TITLE
        const titleDiv = document.createElement("div");

        titleDiv.className = "card-title";

        titleDiv.textContent =
            item.title ||
            item.headline ||
            "No Title";

        // CONTENT
        const contentDiv = document.createElement("div");

        contentDiv.className = "card-content";

        contentDiv.textContent =
            item.content ||
            item.description ||
            "No Content";

        // APPEND
        card.appendChild(numberDiv);
        card.appendChild(titleDiv);
        card.appendChild(contentDiv);

        container.appendChild(card);
    });
}

// ======================================
// AUTO FOCUS
// ======================================

window.addEventListener("load", () => {

    if (userInput) {
        userInput.focus();
    }
});