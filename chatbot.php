<?php

header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);

/*
|--------------------------------------------------------------------------
| YOUR GROQ API KEY
|--------------------------------------------------------------------------
*/

$apiKey = "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";

/*
|--------------------------------------------------------------------------
| GROQ API URL
|--------------------------------------------------------------------------
*/

$groqUrl = "https://api.groq.com/openai/v1/chat/completions";

/*
|--------------------------------------------------------------------------
| GET JSON INPUT
|--------------------------------------------------------------------------
*/

$input = json_decode(file_get_contents("php://input"), true);

$action = $input['action'] ?? '';

if (!$action) {

    echo json_encode([
        "success" => false,
        "error" => "No action specified"
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| SWITCH ACTIONS
|--------------------------------------------------------------------------
*/

switch ($action) {

    case "chat":

        $message = trim($input['message'] ?? '');

        if ($message == '') {

            echo json_encode([
                "success" => false,
                "error" => "Empty message"
            ]);

            exit;
        }

        handleChat($message, $apiKey, $groqUrl);

        break;

    case "news":

        handleNews($apiKey, $groqUrl);

        break;

    case "facts":

        handleFacts($apiKey, $groqUrl);

        break;

    default:

        echo json_encode([
            "success" => false,
            "error" => "Unknown action"
        ]);
}

/*
|--------------------------------------------------------------------------
| CHAT FUNCTION
|--------------------------------------------------------------------------
*/

function handleChat($message, $apiKey, $groqUrl)
{
    $payload = [

        "model" => "llama-3.1-8b-instant",

        "messages" => [

            [
                "role" => "system",
                "content" => "You are a helpful AI assistant."
            ],

            [
                "role" => "user",
                "content" => $message
            ]
        ],

        "temperature" => 0.7,
        "max_tokens" => 1024
    ];

    $response = callGroqAPI($groqUrl, $payload, $apiKey);

    if (isset($response['choices'][0]['message']['content'])) {

        $reply = $response['choices'][0]['message']['content'];

        echo json_encode([
            "success" => true,
            "response" => $reply
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "error" => "Invalid API response",
            "debug_response" => $response
        ]);
    }
}

/*
|--------------------------------------------------------------------------
| NEWS FUNCTION
|--------------------------------------------------------------------------
*/

function handleNews($apiKey, $groqUrl)
{
    $prompt = '
Generate exactly 3 tech news headlines.

Return ONLY valid JSON array like this:

[
  {
    "headline": "Headline here",
    "description": "Description here"
  }
]
';

    $payload = [

        "model" => "llama-3.1-8b-instant",

        "messages" => [

            [
                "role" => "user",
                "content" => $prompt
            ]
        ],

        "temperature" => 0.7,
        "max_tokens" => 800
    ];

    $response = callGroqAPI($groqUrl, $payload, $apiKey);

    if (isset($response['choices'][0]['message']['content'])) {

        $text = $response['choices'][0]['message']['content'];

        $jsonText = extractJSON($text);

        $items = json_decode($jsonText, true);

        if ($items) {

            echo json_encode([
                "success" => true,
                "items" => $items
            ]);

        } else {

            echo json_encode([
                "success" => false,
                "error" => "Invalid JSON format",
                "raw_response" => $text
            ]);
        }

    } else {

        echo json_encode([
            "success" => false,
            "error" => "Failed to fetch news",
            "debug_response" => $response
        ]);
    }
}

/*
|--------------------------------------------------------------------------
| FACTS FUNCTION
|--------------------------------------------------------------------------
*/

function handleFacts($apiKey, $groqUrl)
{
    $prompt = '
Generate exactly 3 fun facts.

Return ONLY valid JSON array like this:

[
  {
    "title": "Fact title",
    "content": "Fact content"
  }
]
';

    $payload = [

        "model" => "llama-3.1-8b-instant",

        "messages" => [

            [
                "role" => "user",
                "content" => $prompt
            ]
        ],

        "temperature" => 0.8,
        "max_tokens" => 800
    ];

    $response = callGroqAPI($groqUrl, $payload, $apiKey);

    if (isset($response['choices'][0]['message']['content'])) {

        $text = $response['choices'][0]['message']['content'];

        $jsonText = extractJSON($text);

        $items = json_decode($jsonText, true);

        if ($items) {

            echo json_encode([
                "success" => true,
                "items" => $items
            ]);

        } else {

            echo json_encode([
                "success" => false,
                "error" => "Invalid JSON format",
                "raw_response" => $text
            ]);
        }

    } else {

        echo json_encode([
            "success" => false,
            "error" => "Failed to fetch facts",
            "debug_response" => $response
        ]);
    }
}

/*
|--------------------------------------------------------------------------
| CALL GROQ API
|--------------------------------------------------------------------------
*/

function callGroqAPI($url, $payload, $apiKey)
{
    $ch = curl_init($url);

    curl_setopt_array($ch, [

        CURLOPT_RETURNTRANSFER => true,

        CURLOPT_POST => true,

        CURLOPT_POSTFIELDS => json_encode($payload),

        CURLOPT_HTTPHEADER => [

            "Content-Type: application/json",
            "Authorization: Bearer " . $apiKey
        ],

        CURLOPT_TIMEOUT => 30
    ]);

    $response = curl_exec($ch);

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    $curlError = curl_error($ch);

    curl_close($ch);

    if ($curlError) {

        return [
            "curl_error" => $curlError
        ];
    }

    $decoded = json_decode($response, true);

    if ($httpCode != 200) {

        return [
            "http_code" => $httpCode,
            "api_response" => $decoded
        ];
    }

    return $decoded;
}

/*
|--------------------------------------------------------------------------
| EXTRACT JSON
|--------------------------------------------------------------------------
*/

function extractJSON($text)
{
    if (preg_match('/\\[.*\\]/s', $text, $matches)) {
        return $matches[0];
    }

    if (preg_match('/\\{.*\\}/s', $text, $matches)) {
        return $matches[0];
    }

    return $text;
}

?>