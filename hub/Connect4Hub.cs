using Microsoft.AspNetCore.SignalR;

namespace Boardgame.hub
{
    public class Connect4Hub: GameHub
    {
        static Dictionary<string, string> currentTurn = new();

        public async Task CreateRoom(string roomCode)
        {
            CreateRoomBase(roomCode);
            await JoinRoom(roomCode);
        }

        public async Task JoinRoom(string roomCode)
        {
            bool joined = await JoinRoomBase(roomCode);
            if (!joined) return;

            string role = rooms[roomCode].Count == 1 ? "red" : "yellow";
            playerRoles[Context.ConnectionId] = role;

            await Clients.Caller.SendAsync("SetRole", role);

            if (rooms[roomCode].Count == 2)
            {
                currentTurn[roomCode] = "red";
                await Clients.Group(roomCode).SendAsync("StartGame");
            }
        }

        public async Task SendMove(string roomCode, int column)
        {
            if (!currentTurn.ContainsKey(roomCode)) return;

            string player = playerRoles[Context.ConnectionId];
            if (currentTurn[roomCode] != player) return;

            await Clients.Group(roomCode)
                .SendAsync("ReceiveMove", new { col = column, player });

            currentTurn[roomCode] = player == "red" ? "yellow" : "red";
        }
    }
}
