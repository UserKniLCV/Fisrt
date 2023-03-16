// Load the PlayFab API module
var PlayFab = require("PlayFab");

// Define the Cloud Script function
handlers.getPlayerDataList = function (args, context) {
    // Set up the API request parameters
    var request = {
        PlayFabId: null,
        Keys: null
    };

    // Call the API to get the list of players
    PlayFab.server.GetAllUsers({}, function (error, result) {
        if (error) {
            // Return an error message if the API call failed
            return { error: error };
        } else {
            // Map the PlayFab IDs of the players to an array
            var playFabIds = result.data.Users.map(function (user) {
                return user.PlayFabId;
            });

            // Set the PlayFab IDs and data keys for the next API request
            request.PlayFabId = playFabIds;
            request.Keys = ["Player Data"];

            // Call the API to get the player data
            PlayFab.server.GetUserData(request, function (error, result) {
                if (error) {
                    // Return an error message if the API call failed
                    return { error: error };
                } else {
                    // Create an object to store the player data
                    var playerDataList = {};

                    // Loop through the player data and add it to the object
                    for (var playFabId in result.data.Data) {
                        if (result.data.Data.hasOwnProperty(playFabId)) {
                            playerDataList[playFabId] = result.data.Data[playFabId]["Player Data"].Value;
                        }
                    }

                    // Return the list of player data as JSON
                    return { playerDataList: playerDataList };
                }
            });
        }
    });
};