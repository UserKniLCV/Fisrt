handlers.getPlayerDataList = function (args, context) {
    // Set up the API request parameters
    var request = {
        PlayFabIds: null,
        Keys: ["Coins"]
    };

    // Set the headers for the API request
    var headers = {
        "Content-Type": "application/json",
        "X-PlayFabSDK-Version": "1.0.0",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,X-PlayFabSDK-Version",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS"
    };

    // Call the API to get the list of players
    server.HttpRequest(
        "https://B6E0C.playfabapi.com/CloudScript/ExecuteFunction",
        "POST",
        JSON.stringify({ FunctionName: "getPlayerDataList", FunctionParameter: args }),
        headers,
        function (error, result) {
            if (error) {
                // Return an error message if the API call failed
                return { error: error };
            } else {
                // Return the response as JSON
                return JSON.parse(result.response);
            }
        }
    );
};
