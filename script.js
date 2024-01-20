// script.js

function sendMessage() {
    const userInput = document.getElementById("user-input");
    const userMessage = userInput.value;
    userInput.value = ""; // Clear the input field
    userInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default Enter key behavior
    
            const userMessage = userInput.value.trim(); // Trim to remove leading/trailing white space
    
            if (userMessage.length > 0) {
                sendMessage();
                userInput.value = ""; // Clear the input field after sending the message
            }
        }
    });

    // Append the user's message to the chat
    appendUserMessage(userMessage);

    setTimeout(() => {
        simulateBotResponse(userMessage); 
        appendBotMessage(botResponse);
	scrollToBottom();
    }, 1000);
}

function sanitizeInput(input) {
    // Define a regular expression to match special characters
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/g;

    // Use the replace method to remove special characters from the input
    const sanitizedInput = input.replace(specialCharsRegex, '');

    return sanitizedInput;
}



function simulateBotResponse(userMessage) {
    const botMessageDiv = document.createElement("div");
    botMessageDiv.className = "message bot-message";
    const botResponse = generateBotResponse(userMessage);
    botMessageDiv.innerHTML = `<p>Bot: ${botResponse}</p>`;
    const messageContainer = document.getElementById("message-container");
    messageContainer.appendChild(botMessageDiv);
    scrollToBottom();
}


 // Define an array of objects where each object contains an array of possible questions and a single response.
const faqData = [
    {
        questions: ["hello", "hi"],
        response: "Hello, how can I help you?"
    },
    {
        questions: ["weather"],
        response: "The weather is sunny and 25 degrees Celsius."
    },
    {
        questions: ["what is blockchain technology","what is blockchain technology?"],
        response: "Blockchain is a distributed ledger technology that records transactions across a network of computers. Each transaction is added to a chain of blocks, making it secure and resistant to tampering. It is best known for being the underlying technology behind cryptocurrencies like Bitcoin."
    },
    {
        questions: ["what is big data"],
        response: "Big data refers to vast amounts of structured and unstructured data that organizations collect. It's analyzed to extract insights, trends, and patterns, enabling data-driven decision-making. Industries like healthcare, finance, marketing, and logistics use big data to improve operations, customer experiences, and innovation."
    },
    {
        questions: ["how does machine learning work"],
        response: "Machine learning is a subset of artificial intelligence that allows computers to learn and make predictions without being explicitly programmed. It works by training models on large datasets, identifying patterns, and making decisions based on those patterns."
    },
    {
        questions: ["tell me about the Internet of Things (IoT),what is iot,what is IOT"],
        response: "The Internet of Things (IoT) refers to a network of interconnected physical devices, vehicles, buildings, and other objects that collect and exchange data. These devices are equipped with sensors, software, and network connectivity, enabling them to interact and make intelligent decisions."
    },
    {
        questions: ["how can I improve my programming skills"],
        response: "To improve your programming skills, you can practice coding regularly, work on personal projects, read books and documentation, participate in online courses, and seek guidance from experienced programmers. Continuous learning and hands-on experience are key."
    },
    {
        questions: ["which programming languages are in high demand"],
        response: "Currently, programming languages like Python, JavaScript, Java, and C++ are in high demand. The choice of language depends on your specific interests and career goals."
    },
    {
        questions: ["what is artificial intelligence","what is ai"],
        response: "Artificial intelligence is a field of computer science that focuses on creating machines and software capable of intelligent behavior. AI systems can perform tasks that typically require human intelligence, such as problem-solving, language understanding, and decision-making."
    },
    {
        questions: ["what is cloud computing"],
        response: "Cloud computing is a technology that allows users to access and use computing resources (such as servers, storage, databases, networking, software, and more) over the internet. It provides scalability, flexibility, and cost-efficiency for businesses and individuals."
    },
    {
        questions: ["what is virtual reality","what is vr"],
        response: "Virtual reality is a technology that creates a simulated environment in which users can interact with computer-generated 3D objects. It often involves the use of headsets and controllers to immerse users in a digital world."
    },
    {
        questions: ["tell me about Elon Musk"],
        response: "Elon Musk is a billionaire entrepreneur known for founding SpaceX, Tesla, Inc., and other companies. He's a visionary figure in space exploration and electric vehicles, with a focus on sustainable energy and the colonization of Mars."
    },
    {
        questions: ["what is the capital of France"],
        response: "The capital of France is Paris."
    },
    {
        questions: ["what is the largest planet in our solar system"],
        response: "The largest planet in our solar system is Jupiter."
    },
    {
        questions: ["what is the role of IT in business"],
        response: "IT plays a critical role in streamlining business processes, improving efficiency, enabling communication, and providing tools for data analysis and decision-making."
    },
    {
        questions: ["what is the currency of Japan"],
        response: "The currency of Japan is the Japanese Yen (JPY)."
    },
    {
        questions: ["what is the national animal of Australia"],
        response: "The national animal of Australia is the Kangaroo."
    },
    {
        questions: ["what is data encryption"],
        response: " Data encryption is the process of converting data into a secure, unreadable format using cryptographic algorithms. It helps protect data from unauthorized access during storage and transmission."
    },
    {
        questions: ["what is the main component of the Earth's atmosphere"],
        response: "The main component of the Earth's atmosphere is nitrogen, which makes up about 78% of the atmosphere."
    },
    {
        questions: ["who is the current President of the United States"],
        response: "As of my last knowledge update in 2022, the President of the United States is Joe Biden."
    },
    {
        questions: ["what is a computer network?"],
        response: "A computer network is a set of interconnected devices that can share data and resources, facilitating communication and information exchange."
    },
    {
        questions: ["what is a firewall "],
        response: "A firewall controls network traffic based on security rules, serving as a barrier between trusted internal networks and untrusted external networks."
        
    },
    {
        questions: ["what is a computer virus in IT?"],
        response: "A computer virus is malicious software that infects and compromises computer systems, potentially causing data loss and system damage."
        
    },
    {
        questions: ["what is a data breach in IT?"],
        response: "A data breach is the unauthorized access or disclosure of sensitive data, often resulting from security vulnerabilities or cyberattacks."
    },
    {   
        questions: ["why is JavaScript important in a speech bot?"],
        response: "JavaScript handles the logic and functionality of the speech bot, enabling speech recognition, processing user requests, and generating spoken responses."
    
    },
    {
        questions: ["what is database "],
        response: " A database is a structured collection of data organized for efficient retrieval and manipulation. It's commonly used to store and manage large amounts of information"
        
    },
    {
        questions: ["what is a data scientist in IT"],
        response: "A data scientist is a professional who uses data analysis, machine learning, and statistical techniques to extract insights and knowledge from large and complex datasets. They help organizations make data-driven decisions."
        
    },
    {
        questions: ["what is a server"],
        response: ": A server is a specialized computer or software system that provides services, resources, or data to other computers, known as clients, over a network. It can serve various purposes, such as hosting websites, managing email, or storing files."
    },
    {
        questions: ["what is a digital signature in cryptography","What is a digital signature"],
        response: "A digital signature is a cryptographic technique that verifies the authenticity and integrity of a digital message or document, providing proof of the sender's identity."
    },
        
    {
        questions: ["what is a hash function in cryptography?"],
        response: "A hash function is a one-way mathematical function that converts data into a fixed-size string of characters, known as a hash value. It's used for data verification and password storage."
        
    },

    // You can continue to add more questions and responses as needed.
];


function generateBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase(); // Convert user input to lowercase for case-insensitivity
    console.log("User Message:", userMessage); // Debugging line

    for (const faq of faqData) {
        for (const question of faq.questions) {
            console.log("Checking question:", question); // Debugging line
            if (userMessage.includes(question.toLowerCase())) { // Convert question to lowercase for case-insensitivity
                console.log("Matched question:", question); // Debugging line
                const response = faq.response;
                console.log("Bot Response:", response); // Debugging line
                return response;
            }
        }
    }

    // Default response for unrecognized input
    return "I'm sorry, I didn't understand that. Please ask another question.";
}







function appendUserMessage(message) {
    const messageContainer = document.getElementById("message-container");
    const userMessageDiv = document.createElement("div");
    userMessageDiv.className = "message user-message";
    userMessageDiv.innerHTML = `<p>User: ${message}</p>`;
    messageContainer.appendChild(userMessageDiv);
}

function appendBotMessage(message) {
    const messageContainer = document.getElementById("message-container");
    const botMessageDiv = document.createElement("div");
    botMessageDiv.className = "message bot-message";
    botMessageDiv.innerHTML = `<p>Bot: ${message}</p>`;
    messageContainer.appendChild(botMessageDiv);
}


function startVoiceInput() {
    const recognition = new webkitSpeechRecognition();

    // Configure recognition settings
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // Set the recognition language (e.g., English)

    // Start voice recognition
    recognition.start();

    // Handle recognized speech
    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        const userInput = document.getElementById('user-input');
        userInput.value = result;
        sendMessage(); 
    };

    // Handle recognition errors
    recognition.onerror = (event) => {
        console.error('Recognition error:', event.error);
    };

}


function speakBotResponse() {
    const messageContainer = document.getElementById("message-container");
    const botMessages = messageContainer.querySelectorAll(".message.bot-message p");
    
    
    const latestBotResponse = botMessages[botMessages.length - 1].innerText.replace("Bot: ", "");

    if (latestBotResponse) {
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(latestBotResponse);
        
        // Configure voice settings 
        const voices = speechSynthesis.getVoices();
        utterance.voice = voices[0]; 

        speechSynthesis.speak(utterance);
    }
}



function scrollToBottom() {
    const messageContainer = document.getElementById("message-container");
    messageContainer.scrollTop = messageContainer.scrollHeight;
}


